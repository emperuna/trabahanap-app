#!/usr/bin/env node

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const fs = require('fs').promises;
const path = require('path');

class APIGenerator {
  constructor() {
    this.basePackage = 'com.trabahanap';
    this.srcPath = path.join(__dirname, '../../src/main/java/com/trabahanap');
  }

  // Generate DTO classes
  generateDTO(entityName, fields, type = 'request') {
    const className = this.capitalize(entityName);
    const dtoName = `${className}${type === 'request' ? 'Request' : 'Response'}DTO`;
    
    let fieldDefinitions = '';
    let gettersSetters = '';
    let imports = new Set(['java.time.LocalDateTime']);
    
    // Add validation imports for request DTOs
    if (type === 'request') {
      imports.add('jakarta.validation.constraints.*');
    }
    
    fields.forEach(field => {
      const fieldType = this.mapToJavaType(field.type);
      const fieldName = field.name;
      
      // Add specific imports
      if (fieldType.includes('BigDecimal')) imports.add('java.math.BigDecimal');
      if (fieldType.includes('LocalDate')) imports.add('java.time.LocalDate');
      
      // Field definition with validation for request DTOs
      if (type === 'request' && field.required) {
        fieldDefinitions += '    @NotNull(message = "' + fieldName + ' is required")\n';
        if (fieldType === 'String' && field.minLength) {
          fieldDefinitions += `    @Size(min = ${field.minLength}`;
          if (field.maxLength) {
            fieldDefinitions += `, max = ${field.maxLength}`;
          }
          fieldDefinitions += ', message = "' + fieldName + ' must be between ' + field.minLength;
          if (field.maxLength) {
            fieldDefinitions += ' and ' + field.maxLength;
          }
          fieldDefinitions += ' characters")\n';
        }
        if (fieldType === 'String' && field.email) {
          fieldDefinitions += '    @Email(message = "Invalid email format")\n';
        }
      }
      
      fieldDefinitions += `    private ${fieldType} ${fieldName};\n\n`;
      
      // Getter and Setter
      const capitalizedFieldName = this.capitalize(fieldName);
      gettersSetters += `    public ${fieldType} get${capitalizedFieldName}() {\n`;
      gettersSetters += `        return ${fieldName};\n    }\n\n`;
      gettersSetters += `    public void set${capitalizedFieldName}(${fieldType} ${fieldName}) {\n`;
      gettersSetters += `        this.${fieldName} = ${fieldName};\n    }\n\n`;
    });

    // Add timestamps for response DTOs
    if (type === 'response') {
      fieldDefinitions += '    private LocalDateTime createdAt;\n';
      fieldDefinitions += '    private LocalDateTime updatedAt;\n\n';
      
      gettersSetters += `    public LocalDateTime getCreatedAt() {\n        return createdAt;\n    }\n\n`;
      gettersSetters += `    public void setCreatedAt(LocalDateTime createdAt) {\n        this.createdAt = createdAt;\n    }\n\n`;
      gettersSetters += `    public LocalDateTime getUpdatedAt() {\n        return updatedAt;\n    }\n\n`;
      gettersSetters += `    public void setUpdatedAt(LocalDateTime updatedAt) {\n        this.updatedAt = updatedAt;\n    }\n\n`;
    }

    const importsStr = Array.from(imports).map(imp => `import ${imp};`).join('\n');
    
    return `package ${this.basePackage}.dto;

${importsStr}

public class ${dtoName} {
    private Long id;

${fieldDefinitions}    // Constructors
    public ${dtoName}() {}

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

${gettersSetters}}`;
  }

  // Generate enhanced controller with DTOs and validation
  generateEnhancedController(entityName, fields) {
    const className = this.capitalize(entityName);
    const endpoint = this.toKebabCase(entityName);
    
    return `package ${this.basePackage}.controller;

import ${this.basePackage}.dto.${className}RequestDTO;
import ${this.basePackage}.dto.${className}ResponseDTO;
import ${this.basePackage}.model.${className};
import ${this.basePackage}.service.${className}Service;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/${endpoint}")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "${className}", description = "${className} management API")
public class ${className}Controller {

    @Autowired
    private ${className}Service ${entityName.toLowerCase()}Service;

    @Operation(summary = "Get all ${entityName.toLowerCase()}s with pagination")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved ${entityName.toLowerCase()}s"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping
    public ResponseEntity<Page<${className}ResponseDTO>> getAll${className}s(
            @Parameter(description = "Pagination information") Pageable pageable) {
        Page<${className}> ${entityName.toLowerCase()}s = ${entityName.toLowerCase()}Service.findAll(pageable);
        Page<${className}ResponseDTO> response = ${entityName.toLowerCase()}s.map(this::convertToResponseDTO);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Get ${entityName.toLowerCase()} by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved ${entityName.toLowerCase()}"),
        @ApiResponse(responseCode = "404", description = "${className} not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<${className}ResponseDTO> get${className}ById(
            @Parameter(description = "ID of the ${entityName.toLowerCase()}", required = true) @PathVariable Long id) {
        return ${entityName.toLowerCase()}Service.findById(id)
                .map(this::convertToResponseDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Create new ${entityName.toLowerCase()}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Successfully created ${entityName.toLowerCase()}"),
        @ApiResponse(responseCode = "400", description = "Invalid input data")
    })
    @PostMapping
    public ResponseEntity<${className}ResponseDTO> create${className}(
            @Parameter(description = "${className} data", required = true) 
            @Valid @RequestBody ${className}RequestDTO requestDTO) {
        ${className} ${entityName.toLowerCase()} = convertToEntity(requestDTO);
        ${className} saved${className} = ${entityName.toLowerCase()}Service.save(${entityName.toLowerCase()});
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(convertToResponseDTO(saved${className}));
    }

    @Operation(summary = "Update ${entityName.toLowerCase()}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully updated ${entityName.toLowerCase()}"),
        @ApiResponse(responseCode = "404", description = "${className} not found"),
        @ApiResponse(responseCode = "400", description = "Invalid input data")
    })
    @PutMapping("/{id}")
    public ResponseEntity<${className}ResponseDTO> update${className}(
            @Parameter(description = "ID of the ${entityName.toLowerCase()}", required = true) @PathVariable Long id,
            @Parameter(description = "Updated ${entityName.toLowerCase()} data", required = true) 
            @Valid @RequestBody ${className}RequestDTO requestDTO) {
        try {
            ${className} ${entityName.toLowerCase()} = convertToEntity(requestDTO);
            ${entityName.toLowerCase()}.setId(id);
            ${className} updated${className} = ${entityName.toLowerCase()}Service.update(id, ${entityName.toLowerCase()});
            return ResponseEntity.ok(convertToResponseDTO(updated${className}));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Delete ${entityName.toLowerCase()}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Successfully deleted ${entityName.toLowerCase()}"),
        @ApiResponse(responseCode = "404", description = "${className} not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete${className}(
            @Parameter(description = "ID of the ${entityName.toLowerCase()}", required = true) @PathVariable Long id) {
        if (${entityName.toLowerCase()}Service.existsById(id)) {
            ${entityName.toLowerCase()}Service.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // DTO Conversion Methods
    private ${className}ResponseDTO convertToResponseDTO(${className} entity) {
        ${className}ResponseDTO dto = new ${className}ResponseDTO();
        dto.setId(entity.getId());
        ${fields.map(field => {
          const capitalizedName = this.capitalize(field.name);
          return `        dto.set${capitalizedName}(entity.get${capitalizedName}());`;
        }).join('\n')}
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }

    private ${className} convertToEntity(${className}RequestDTO dto) {
        ${className} entity = new ${className}();
        ${fields.map(field => {
          const capitalizedName = this.capitalize(field.name);
          return `        entity.set${capitalizedName}(dto.get${capitalizedName}());`;
        }).join('\n')}
        return entity;
    }
}`;
  }

  // Generate OpenAPI configuration
  generateOpenAPIConfig() {
    return `package ${this.basePackage}.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI trabahanapOpenAPI() {
        Server devServer = new Server();
        devServer.setUrl("http://localhost:8080");
        devServer.setDescription("Server URL in Development environment");

        Server prodServer = new Server();
        prodServer.setUrl("https://api.trabahanap.com");
        prodServer.setDescription("Server URL in Production environment");

        Contact contact = new Contact();
        contact.setEmail("support@trabahanap.com");
        contact.setName("TrabaHanap Support");
        contact.setUrl("https://www.trabahanap.com");

        License mitLicense = new License().name("MIT License").url("https://choosealicense.com/licenses/mit/");

        Info info = new Info()
                .title("TrabaHanap Job Portal API")
                .version("1.0")
                .contact(contact)
                .description("This API exposes endpoints for the TrabaHanap job portal application.")
                .termsOfService("https://www.trabahanap.com/terms")
                .license(mitLicense);

        return new OpenAPI().info(info).servers(List.of(devServer, prodServer));
    }
}`;
  }

  // Generate exception handler
  generateExceptionHandler() {
    return `package ${this.basePackage}.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, Object> response = new HashMap<>();
        Map<String, String> errors = new HashMap<>();
        
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        
        response.put("timestamp", LocalDateTime.now());
        response.put("status", HttpStatus.BAD_REQUEST.value());
        response.put("error", "Validation Failed");
        response.put("message", "Invalid input data");
        response.put("validationErrors", errors);
        
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> handleRuntimeException(RuntimeException ex) {
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now());
        response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        response.put("error", "Internal Server Error");
        response.put("message", ex.getMessage());
        
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}`;
  }

  // Utility methods
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
  name: 'api-generator',
  version: '1.0.0'
}, {
  capabilities: {
    tools: {}
  }
});

const generator = new APIGenerator();

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
                name: 'generate_dtos',
                description: 'Generate Request and Response DTOs for an entity',
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
                          required: { type: 'boolean', default: false },
                          minLength: { type: 'number' },
                          maxLength: { type: 'number' },
                          email: { type: 'boolean', default: false }
                        }
                      }
                    }
                  },
                  required: ['entityName', 'fields']
                }
              },
              {
                name: 'generate_enhanced_controller',
                description: 'Generate enhanced REST controller with DTOs, validation, and OpenAPI docs',
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
                          type: { type: 'string' }
                        }
                      }
                    }
                  },
                  required: ['entityName', 'fields']
                }
              },
              {
                name: 'setup_api_infrastructure',
                description: 'Generate OpenAPI config and global exception handler',
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
              case 'generate_dtos':
                const requestDTO = generator.generateDTO(args.entityName, args.fields, 'request');
                const responseDTO = generator.generateDTO(args.entityName, args.fields, 'response');
                
                const className = generator.capitalize(args.entityName);
                
                await generator.writeFile(
                  path.join(generator.srcPath, 'dto', `${className}RequestDTO.java`),
                  requestDTO
                );
                await generator.writeFile(
                  path.join(generator.srcPath, 'dto', `${className}ResponseDTO.java`),
                  responseDTO
                );

                return {
                  content: [
                    {
                      type: 'text',
                      text: `Generated DTOs for ${args.entityName}:\n- dto/${className}RequestDTO.java\n- dto/${className}ResponseDTO.java`
                    }
                  ]
                };

              case 'generate_enhanced_controller':
                const controller = generator.generateEnhancedController(args.entityName, args.fields);
                const controllerClassName = generator.capitalize(args.entityName);
                
                await generator.writeFile(
                  path.join(generator.srcPath, 'controller', `${controllerClassName}Controller.java`),
                  controller
                );

                return {
                  content: [
                    {
                      type: 'text',
                      text: `Generated enhanced controller: controller/${controllerClassName}Controller.java`
                    }
                  ]
                };

              case 'setup_api_infrastructure':
                const openAPIConfig = generator.generateOpenAPIConfig();
                const exceptionHandler = generator.generateExceptionHandler();
                
                await generator.writeFile(
                  path.join(generator.srcPath, 'config', 'OpenAPIConfig.java'),
                  openAPIConfig
                );
                await generator.writeFile(
                  path.join(generator.srcPath, 'exception', 'GlobalExceptionHandler.java'),
                  exceptionHandler
                );

                return {
                  content: [
                    {
                      type: 'text',
                      text: `Generated API infrastructure:\n- config/OpenAPIConfig.java\n- exception/GlobalExceptionHandler.java`
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