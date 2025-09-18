# TrabaHanap Backend MCP Servers

This directory contains Model Context Protocol (MCP) servers for enhanced Spring Boot development in the TrabaHanap job portal application.

## 🚀 Quick Start

### Run All MCP Servers + Spring Boot
```bash
cd backend
npm run dev:all-mcp
```

This will start:
- Spring Boot application (localhost:8080)
- Spring Boot Helper MCP server
- Database Helper MCP server (Neon)
- API Generator MCP server

### Run Individual MCP Servers
```bash
# Spring Boot code generation
npm run mcp:spring

# Neon database operations
npm run mcp:db

# API/DTO generation
npm run mcp:api

# Run all MCP servers only
npm run mcp:all

# Test all servers
npm run mcp:test
```

## 🛠 Available MCP Tools

### 1. Spring Boot Helper (`mcp:spring`)
**Generates complete CRUD operations for entities**

**Tools:**
- `generate_entity` - Create JPA entity with fields
- `generate_full_crud` - Generate Entity + Repository + Service + Controller

**Example Usage:**
```json
{
  "entityName": "job",
  "fields": [
    {"name": "title", "type": "string", "nullable": false},
    {"name": "description", "type": "text", "nullable": true},
    {"name": "salary", "type": "decimal", "nullable": true}
  ]
}
```

### 2. Database Helper (`mcp:db`)
**Connects to your Neon PostgreSQL database**

**Tools:**
- `list_tables` - List all database tables
- `describe_table` - Get table schema details
- `generate_entity_from_table` - Create JPA entity from existing table
- `create_migration` - Generate Flyway migration files
- `analyze_performance` - Database performance analysis

**Example Usage:**
```json
{
  "tableName": "users"
}
```

### 3. API Generator (`mcp:api`)
**Generates DTOs and enhanced controllers**

**Tools:**
- `generate_dtos` - Create Request/Response DTOs with validation
- `generate_enhanced_controller` - Generate controller with OpenAPI docs
- `setup_api_infrastructure` - Create OpenAPI config + exception handlers

**Example Usage:**
```json
{
  "entityName": "job",
  "fields": [
    {"name": "title", "type": "string", "required": true, "minLength": 3, "maxLength": 100},
    {"name": "email", "type": "string", "email": true}
  ]
}
```

## 📁 Generated Code Structure

```
src/main/java/com/trabahanap/
├── model/           # JPA Entities
├── repository/      # Spring Data Repositories
├── service/         # Business Logic Services
├── controller/      # REST Controllers
├── dto/            # Request/Response DTOs
├── config/         # OpenAPI Configuration
└── exception/      # Global Exception Handlers
```

## 🔧 Configuration

### Environment Variables
Make sure your `.env` file contains:
```env
DATABASE_URL=postgresql://username:password@host/database?sslmode=require
```

### MCP Configuration
See `config.json` for MCP server settings.

## 🧪 Testing

```bash
# Test all MCP servers
npm run mcp:test

# Should output:
# ✅ Spring Boot Helper: Server running
# ✅ Database Helper: Server running  
# ✅ API Generator: Server running
```

## 📝 Example Workflow

1. **Start development environment:**
   ```bash
   npm run dev:all-mcp
   ```

2. **Generate a new entity (e.g., Job):**
   - Use Spring Boot Helper to generate complete CRUD
   - Use API Generator to create DTOs and enhanced controller
   - Use Database Helper to create migration if needed

3. **Your generated code will be ready to use!**

## 🎯 TrabaHanap-Specific Features

- **Package Structure**: All generated code uses `com.trabahanap` package
- **Neon Integration**: Direct connection to your cloud PostgreSQL database
- **JWT Compatible**: Generated code works with your existing Spring Security setup
- **OpenAPI Ready**: Automatic Swagger documentation generation
- **React Integration**: CORS configured for frontend (localhost:5173)

## 🔍 Troubleshooting

### MCP Servers Not Starting
```bash
# Check if files are executable
chmod +x mcp/tools/*.js

# Verify dependencies
npm install
```

### Database Connection Issues
```bash
# Check your .env file has correct DATABASE_URL
# Test connection manually
```

### Generated Code Issues
- Ensure your Spring Boot app is not running when generating files
- Check file permissions in src/ directory
- Verify package structure matches `com.trabahanap`
