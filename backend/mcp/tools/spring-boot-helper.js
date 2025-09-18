#!/usr/bin/env node

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const fs = require('fs').promises;
const path = require('path');

class SpringBootHelper {
  constructor() {
    this.basePackage = 'com.trabahanap';
    this.srcPath = path.join(__dirname, '../../src/main/java/com/trabahanap');
  }

  // Generate JPA Entity
  generateEntity(entityName, fields) {
    const className = this.capitalize(entityName);
    const tableName = this.toSnakeCase(entityName);
    
    let fieldDefinitions = '';
    let gettersSetters = '';
    
    fields.forEach(field => {
      const fieldType = this.mapToJavaType(field.type);
      const fieldName = field.name;
      const columnName = this.toSnakeCase(fieldName);
      
      // Field definition
      fieldDefinitions += `    @Column(name = "${columnName}")\n`;
      if (field.nullable === false) {
        fieldDefinitions += `    @NotNull\n`;
      }
      fieldDefinitions += `    private ${fieldType} ${fieldName};\n\n`;
      
      // Getter and Setter
      const capitalizedFieldName = this.capitalize(fieldName);
      gettersSetters += `    public ${fieldType} get${capitalizedFieldName}() {\n`;
      gettersSetters += `        return ${fieldName};\n    }\n\n`;
      gettersSetters += `    public void set${capitalizedFieldName}(${fieldType} ${fieldName}) {\n`;
      gettersSetters += `        this.${fieldName} = ${fieldName};\n    }\n\n`;
    });

    return `package ${this.basePackage}.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "${tableName}")
public class ${className} {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

${fieldDefinitions}    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at") 
    private LocalDateTime updatedAt;

    // Constructors
    public ${className}() {}

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

${gettersSetters}    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
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
        ${className} ${entityName.toLowerCase()} = (${className}) o;
        return Objects.equals(id, ${entityName.toLowerCase()}.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}`;
  }

  // Generate Repository
  generateRepository(entityName) {
    const className = this.capitalize(entityName);
    
    return `package ${this.basePackage}.repository;

import ${this.basePackage}.model.${className};
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ${className}Repository extends JpaRepository<${className}, Long> {
    
    // Custom query methods can be added here
    // Example: List<${className}> findByStatus(String status);
    
    @Query("SELECT e FROM ${className} e WHERE e.createdAt >= :startDate")
    List<${className}> findRecentEntries(@Param("startDate") java.time.LocalDateTime startDate);
}`;
  }

  // Generate Service
  generateService(entityName) {
    const className = this.capitalize(entityName);
    
    return `package ${this.basePackage}.service;

import ${this.basePackage}.model.${className};
import ${this.basePackage}.repository.${className}Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ${className}Service {

    @Autowired
    private ${className}Repository ${entityName.toLowerCase()}Repository;

    public List<${className}> findAll() {
        return ${entityName.toLowerCase()}Repository.findAll();
    }

    public Optional<${className}> findById(Long id) {
        return ${entityName.toLowerCase()}Repository.findById(id);
    }

    public ${className} save(${className} ${entityName.toLowerCase()}) {
        return ${entityName.toLowerCase()}Repository.save(${entityName.toLowerCase()});
    }

    public ${className} update(Long id, ${className} ${entityName.toLowerCase()}Details) {
        return ${entityName.toLowerCase()}Repository.findById(id)
                .map(existing${className} -> {
                    // Update fields here
                    // existing${className}.setField(${entityName.toLowerCase()}Details.getField());
                    return ${entityName.toLowerCase()}Repository.save(existing${className});
                })
                .orElseThrow(() -> new RuntimeException("${className} not found with id: " + id));
    }

    public void deleteById(Long id) {
        ${entityName.toLowerCase()}Repository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return ${entityName.toLowerCase()}Repository.existsById(id);
    }
}`;
  }

  // Generate REST Controller
  generateController(entityName) {
    const className = this.capitalize(entityName);
    const endpoint = this.toKebabCase(entityName);
    
    return `package ${this.basePackage}.controller;

import ${this.basePackage}.model.${className};
import ${this.basePackage}.service.${className}Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/${endpoint}")
@CrossOrigin(origins = "http://localhost:5173")
public class ${className}Controller {

    @Autowired
    private ${className}Service ${entityName.toLowerCase()}Service;

    @GetMapping
    public ResponseEntity<List<${className}>> getAll${className}s() {
        List<${className}> ${entityName.toLowerCase()}s = ${entityName.toLowerCase()}Service.findAll();
        return ResponseEntity.ok(${entityName.toLowerCase()}s);
    }

    @GetMapping("/{id}")
    public ResponseEntity<${className}> get${className}ById(@PathVariable Long id) {
        return ${entityName.toLowerCase()}Service.findById(id)
                .map(${entityName.toLowerCase()} -> ResponseEntity.ok(${entityName.toLowerCase()}))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<${className}> create${className}(@Valid @RequestBody ${className} ${entityName.toLowerCase()}) {
        ${className} saved${className} = ${entityName.toLowerCase()}Service.save(${entityName.toLowerCase()});
        return ResponseEntity.status(HttpStatus.CREATED).body(saved${className});
    }

    @PutMapping("/{id}")
    public ResponseEntity<${className}> update${className}(@PathVariable Long id, 
                                                          @Valid @RequestBody ${className} ${entityName.toLowerCase()}Details) {
        try {
            ${className} updated${className} = ${entityName.toLowerCase()}Service.update(id, ${entityName.toLowerCase()}Details);
            return ResponseEntity.ok(updated${className});
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete${className}(@PathVariable Long id) {
        if (${entityName.toLowerCase()}Service.existsById(id)) {
            ${entityName.toLowerCase()}Service.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}`;
  }

  // Utility methods
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  toSnakeCase(str) {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`).replace(/^_/, '');
  }

  toKebabCase(str) {
    return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`).replace(/^-/, '');
  }

  mapToJavaType(type) {
    const typeMap = {
      'string': 'String',
      'integer': 'Integer',
      'long': 'Long',
      'boolean': 'Boolean',
      'date': 'LocalDate',
      'datetime': 'LocalDateTime',
      'decimal': 'BigDecimal',
      'text': 'String'
    };
    return typeMap[type.toLowerCase()] || 'String';
  }

  async writeFile(filePath, content) {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, content);
  }
}

// MCP Server Setup
const server = new Server({
  name: 'spring-boot-helper',
  version: '1.0.0'
}, {
  capabilities: {
    tools: {}
  }
});

const helper = new SpringBootHelper();

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
                name: 'generate_entity',
                description: 'Generate a JPA entity class with fields',
                inputSchema: {
                  type: 'object',
                  properties: {
                    entityName: { type: 'string', description: 'Name of the entity' },
                    fields: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          name: { type: 'string' },
                          type: { type: 'string' },
                          nullable: { type: 'boolean', default: true }
                        }
                      }
                    }
                  },
                  required: ['entityName', 'fields']
                }
              },
              {
                name: 'generate_full_crud',
                description: 'Generate complete CRUD (Entity, Repository, Service, Controller)',
                inputSchema: {
                  type: 'object',
                  properties: {
                    entityName: { type: 'string', description: 'Name of the entity' },
                    fields: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          name: { type: 'string' },
                          type: { type: 'string' },
                          nullable: { type: 'boolean', default: true }
                        }
                      }
                    }
                  },
                  required: ['entityName', 'fields']
                }
              }
            ]
          };
        },
        callTool: async (name, args) => {
          try {
            switch (name) {
              case 'generate_entity':
                const entityContent = helper.generateEntity(args.entityName, args.fields);
                const entityPath = path.join(helper.srcPath, 'model', `${helper.capitalize(args.entityName)}.java`);
                await helper.writeFile(entityPath, entityContent);
                return {
                  content: [
                    {
                      type: 'text',
                      text: `Generated entity ${args.entityName} at ${entityPath}`
                    }
                  ]
                };

              case 'generate_full_crud':
                const entity = helper.generateEntity(args.entityName, args.fields);
                const repository = helper.generateRepository(args.entityName);
                const service = helper.generateService(args.entityName);
                const controller = helper.generateController(args.entityName);

                const className = helper.capitalize(args.entityName);
                
                await helper.writeFile(
                  path.join(helper.srcPath, 'model', `${className}.java`),
                  entity
                );
                await helper.writeFile(
                  path.join(helper.srcPath, 'repository', `${className}Repository.java`),
                  repository
                );
                await helper.writeFile(
                  path.join(helper.srcPath, 'service', `${className}Service.java`),
                  service
                );
                await helper.writeFile(
                  path.join(helper.srcPath, 'controller', `${className}Controller.java`),
                  controller
                );

                return {
                  content: [
                    {
                      type: 'text',
                      text: `Generated complete CRUD for ${args.entityName}:\n- Entity: model/${className}.java\n- Repository: repository/${className}Repository.java\n- Service: service/${className}Service.java\n- Controller: controller/${className}Controller.java`
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