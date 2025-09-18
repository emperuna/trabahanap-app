#!/usr/bin/env node

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { Client } = require('pg');
const fs = require('fs').promises;
const path = require('path');

class NeonDatabaseHelper {
  constructor() {
    this.connectionString = process.env.DATABASE_URL;
    this.migrationsPath = path.join(__dirname, '../../src/main/resources/db/migration');
  }

  async getClient() {
    const client = new Client({
      connectionString: this.connectionString,
      ssl: {
        rejectUnauthorized: false
      }
    });
    await client.connect();
    return client;
  }

  // Get all tables in the database
  async getTables() {
    const client = await this.getClient();
    try {
      const result = await client.query(`
        SELECT 
          table_name,
          table_schema,
          table_type
        FROM information_schema.tables 
        WHERE table_schema = 'public'
        ORDER BY table_name;
      `);
      return result.rows;
    } finally {
      await client.end();
    }
  }

  // Get table schema with columns
  async getTableSchema(tableName) {
    const client = await this.getClient();
    try {
      const result = await client.query(`
        SELECT 
          column_name,
          data_type,
          is_nullable,
          column_default,
          character_maximum_length,
          numeric_precision,
          numeric_scale
        FROM information_schema.columns 
        WHERE table_name = $1 AND table_schema = 'public'
        ORDER BY ordinal_position;
      `, [tableName]);
      return result.rows;
    } finally {
      await client.end();
    }
  }

  // Generate JPA Entity from existing table
  async generateEntityFromTable(tableName) {
    const schema = await this.getTableSchema(tableName);
    const className = this.toPascalCase(tableName);
    
    let fieldDefinitions = '';
    let gettersSetters = '';
    let imports = new Set(['jakarta.persistence.*', 'java.time.LocalDateTime', 'java.util.Objects']);
    
    schema.forEach(column => {
      const fieldName = this.toCamelCase(column.column_name);
      const javaType = this.mapPostgresToJava(column.data_type);
      
      // Add specific imports
      if (javaType.includes('BigDecimal')) imports.add('java.math.BigDecimal');
      if (javaType.includes('LocalDate')) imports.add('java.time.LocalDate');
      if (javaType.includes('LocalDateTime')) imports.add('java.time.LocalDateTime');
      
      // Skip id field as it's handled separately
      if (column.column_name === 'id') return;
      
      // Field definition
      fieldDefinitions += `    @Column(name = "${column.column_name}"`;
      if (column.character_maximum_length) {
        fieldDefinitions += `, length = ${column.character_maximum_length}`;
      }
      if (column.is_nullable === 'NO') {
        fieldDefinitions += `, nullable = false`;
        imports.add('jakarta.validation.constraints.NotNull');
      }
      fieldDefinitions += ')\n';
      
      if (column.is_nullable === 'NO' && !['created_at', 'updated_at'].includes(column.column_name)) {
        fieldDefinitions += '    @NotNull\n';
      }
      
      fieldDefinitions += `    private ${javaType} ${fieldName};\n\n`;
      
      // Getter and Setter
      const capitalizedFieldName = this.capitalize(fieldName);
      gettersSetters += `    public ${javaType} get${capitalizedFieldName}() {\n`;
      gettersSetters += `        return ${fieldName};\n    }\n\n`;
      gettersSetters += `    public void set${capitalizedFieldName}(${javaType} ${fieldName}) {\n`;
      gettersSetters += `        this.${fieldName} = ${fieldName};\n    }\n\n`;
    });

    const importsStr = Array.from(imports).map(imp => `import ${imp};`).join('\n');
    
    return `package com.trabahanap.model;

${importsStr}

@Entity
@Table(name = "${tableName}")
public class ${className} {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

${fieldDefinitions}    // Constructors
    public ${className}() {}

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

${gettersSetters}    @PrePersist
    protected void onCreate() {
        if (createdAt == null) createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ${className} ${tableName.toLowerCase()} = (${className}) o;
        return Objects.equals(id, ${tableName.toLowerCase()}.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}`;
  }

  // Generate Flyway migration
  async generateMigration(description, sqlContent) {
    const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
    const filename = `V${timestamp}__${description.replace(/\s+/g, '_').toLowerCase()}.sql`;
    const filePath = path.join(this.migrationsPath, filename);
    
    const migrationContent = `-- Migration: ${description}
-- Created: ${new Date().toISOString()}

${sqlContent}`;

    await fs.mkdir(this.migrationsPath, { recursive: true });
    await fs.writeFile(filePath, migrationContent);
    
    return { filename, filePath };
  }

  // Analyze database performance
  async analyzePerformance() {
    const client = await this.getClient();
    try {
      // Get slow queries
      const slowQueries = await client.query(`
        SELECT 
          query,
          calls,
          total_time,
          mean_time,
          rows
        FROM pg_stat_statements 
        WHERE mean_time > 100
        ORDER BY mean_time DESC 
        LIMIT 10;
      `);

      // Get table sizes
      const tableSizes = await client.query(`
        SELECT 
          schemaname,
          tablename,
          attname,
          n_distinct,
          correlation
        FROM pg_stats 
        WHERE schemaname = 'public'
        ORDER BY tablename, attname;
      `);

      return {
        slowQueries: slowQueries.rows,
        tableStats: tableSizes.rows
      };
    } catch (error) {
      // pg_stat_statements might not be enabled
      return {
        slowQueries: [],
        tableStats: [],
        note: 'pg_stat_statements extension not available'
      };
    } finally {
      await client.end();
    }
  }

  // Utility methods
  toPascalCase(str) {
    return str.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join('');
  }

  toCamelCase(str) {
    const pascal = this.toPascalCase(str);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  mapPostgresToJava(pgType) {
    const typeMap = {
      'bigint': 'Long',
      'integer': 'Integer',
      'smallint': 'Short',
      'decimal': 'BigDecimal',
      'numeric': 'BigDecimal',
      'real': 'Float',
      'double precision': 'Double',
      'varchar': 'String',
      'character varying': 'String',
      'text': 'String',
      'char': 'String',
      'character': 'String',
      'boolean': 'Boolean',
      'date': 'LocalDate',
      'timestamp': 'LocalDateTime',
      'timestamp without time zone': 'LocalDateTime',
      'timestamp with time zone': 'LocalDateTime',
      'time': 'LocalTime',
      'uuid': 'UUID'
    };
    return typeMap[pgType.toLowerCase()] || 'String';
  }
}

// MCP Server Setup
const server = new Server({
  name: 'neon-database-helper',
  version: '1.0.0'
}, {
  capabilities: {
    tools: {}
  }
});

const dbHelper = new NeonDatabaseHelper();

// Override _oninitialize to set up our tools
server._oninitialize = async () => {
  return {
    protocolVersion: '2024-11-05',
    capabilities: {
      tools: {
        listTools: async () => {
          return {
            tools: [
              {
                name: 'list_tables',
                description: 'List all tables in the Neon database',
                inputSchema: {
                  type: 'object',
                  properties: {},
                  required: []
                }
              },
              {
                name: 'describe_table',
                description: 'Get detailed schema information for a specific table',
                inputSchema: {
                  type: 'object',
                  properties: {
                    tableName: { type: 'string', description: 'Name of the table to describe' }
                  },
                  required: ['tableName']
                }
              },
              {
                name: 'generate_entity_from_table',
                description: 'Generate JPA entity from existing database table',
                inputSchema: {
                  type: 'object',
                  properties: {
                    tableName: { type: 'string', description: 'Name of the table' }
                  },
                  required: ['tableName']
                }
              },
              {
                name: 'create_migration',
                description: 'Create a new Flyway migration file',
                inputSchema: {
                  type: 'object',
                  properties: {
                    description: { type: 'string', description: 'Description of the migration' },
                    sql: { type: 'string', description: 'SQL content for the migration' }
                  },
                  required: ['description', 'sql']
                }
              },
              {
                name: 'analyze_performance',
                description: 'Analyze database performance and get optimization suggestions',
                inputSchema: {
                  type: 'object',
                  properties: {},
                  required: []
                }
              }
            ]
          };
        },
        callTool: async (name, args) => {
          try {
            switch (name) {
              case 'list_tables':
                const tables = await dbHelper.getTables();
                return {
                  content: [
                    {
                      type: 'text',
                      text: `Database Tables:\n${tables.map(t => `- ${t.table_name} (${t.table_type})`).join('\n')}`
                    }
                  ]
                };

              case 'describe_table':
                const schema = await dbHelper.getTableSchema(args.tableName);
                const schemaText = schema.map(col => 
                  `- ${col.column_name}: ${col.data_type}${col.character_maximum_length ? `(${col.character_maximum_length})` : ''} ${col.is_nullable === 'NO' ? 'NOT NULL' : 'NULL'}`
                ).join('\n');
                
                return {
                  content: [
                    {
                      type: 'text',
                      text: `Table: ${args.tableName}\nColumns:\n${schemaText}`
                    }
                  ]
                };

              case 'generate_entity_from_table':
                const entityContent = await dbHelper.generateEntityFromTable(args.tableName);
                const className = dbHelper.toPascalCase(args.tableName);
                const entityPath = path.join(__dirname, '../../src/main/java/com/trabahanap/model', `${className}.java`);
                
                await fs.mkdir(path.dirname(entityPath), { recursive: true });
                await fs.writeFile(entityPath, entityContent);
                
                return {
                  content: [
                    {
                      type: 'text',
                      text: `Generated JPA entity for table '${args.tableName}' at ${entityPath}`
                    }
                  ]
                };

              case 'create_migration':
                const migration = await dbHelper.generateMigration(args.description, args.sql);
                return {
                  content: [
                    {
                      type: 'text',
                      text: `Created migration: ${migration.filename} at ${migration.filePath}`
                    }
                  ]
                };

              case 'analyze_performance':
                const analysis = await dbHelper.analyzePerformance();
                let analysisText = 'Database Performance Analysis:\n\n';
                
                if (analysis.slowQueries.length > 0) {
                  analysisText += 'Slow Queries:\n';
                  analysis.slowQueries.forEach(q => {
                    analysisText += `- Query: ${q.query.substring(0, 100)}...\n`;
                    analysisText += `  Calls: ${q.calls}, Avg Time: ${q.mean_time}ms\n\n`;
                  });
                } else {
                  analysisText += 'No slow queries detected.\n\n';
                }
                
                if (analysis.note) {
                  analysisText += `Note: ${analysis.note}\n`;
                }
                
                return {
                  content: [
                    {
                      type: 'text',
                      text: analysisText
                    }
                  ]
                };

              default:
                throw new Error(`Unknown tool: ${name}`);
            }
          } catch (error) {
            return {
              content: [
                {
                  type: 'text',
                  text: `Error: ${error.message}`
                }
              ],
              isError: true
            };
          }
        }
      }
    }
  };
};

// Start server
const transport = new StdioServerTransport();
server.connect(transport);