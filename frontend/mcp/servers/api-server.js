import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class APIMCPServer {
  constructor(name, version) {
    this.name = name;
    this.version = version;
  }

  getAPIEndpoints() {
    return {
      jobs: {
        'GET /api/jobs': {
          description: 'List all job postings with optional filters',
          query: 'search, location, category, salary_min, salary_max, page, limit',
          response: 'Array of job objects with pagination'
        },
        'POST /api/jobs': {
          description: 'Create a new job posting (employer only)',
          body: 'title, description, company, location, salary, requirements',
          response: 'Created job object'
        },
        'GET /api/jobs/:id': {
          description: 'Get detailed information about a specific job',
          params: 'id (job ID)',
          response: 'Complete job object with company details'
        },
        'PUT /api/jobs/:id': {
          description: 'Update job posting (employer only)',
          body: 'Any job fields to update',
          response: 'Updated job object'
        },
        'DELETE /api/jobs/:id': {
          description: 'Delete job posting (employer only)',
          response: 'Success message'
        }
      },
      applications: {
        'POST /api/applications': {
          description: 'Submit a job application',
          body: 'jobId, userId, coverLetter, resumeUrl',
          response: 'Application object with status'
        },
        'GET /api/applications/user/:userId': {
          description: 'Get all applications for a user',
          response: 'Array of applications with job details'
        },
        'GET /api/applications/job/:jobId': {
          description: 'Get all applications for a job (employer only)',
          response: 'Array of applications with user details'
        },
        'PUT /api/applications/:id/status': {
          description: 'Update application status (employer only)',
          body: 'status (pending, accepted, rejected)',
          response: 'Updated application'
        }
      },
      users: {
        'POST /api/auth/register': {
          description: 'Register new user account',
          body: 'email, password, firstName, lastName, userType',
          response: 'User object and JWT token'
        },
        'POST /api/auth/login': {
          description: 'User login',
          body: 'email, password',
          response: 'User object and JWT token'
        },
        'GET /api/users/profile': {
          description: 'Get current user profile',
          headers: 'Authorization: Bearer <token>',
          response: 'Complete user profile'
        },
        'PUT /api/users/profile': {
          description: 'Update user profile',
          body: 'Profile fields to update',
          response: 'Updated user profile'
        }
      },
      search: {
        'GET /api/search': {
          description: 'Advanced job search with filters',
          query: 'q, location, category, company, salary_range, job_type',
          response: 'Filtered job results with facets'
        },
        'GET /api/search/suggestions': {
          description: 'Get search suggestions',
          query: 'q (partial query)',
          response: 'Array of search suggestions'
        }
      }
    };
  }

  getDataModels() {
    return {
      Job: {
        id: 'string (UUID)',
        title: 'string',
        description: 'text',
        company: 'string',
        location: 'string',
        salary: 'number',
        salaryType: 'hourly | monthly | yearly',
        jobType: 'full-time | part-time | contract | remote',
        category: 'string',
        requirements: 'string[]',
        benefits: 'string[]',
        postedBy: 'string (user ID)',
        createdAt: 'Date',
        updatedAt: 'Date',
        expiresAt: 'Date',
        status: 'active | paused | closed'
      },
      User: {
        id: 'string (UUID)',
        email: 'string (unique)',
        firstName: 'string',
        lastName: 'string',
        userType: 'job_seeker | employer',
        profile: 'UserProfile',
        createdAt: 'Date',
        updatedAt: 'Date'
      },
      Application: {
        id: 'string (UUID)',
        jobId: 'string (Job ID)',
        userId: 'string (User ID)',
        coverLetter: 'text',
        resumeUrl: 'string',
        status: 'pending | reviewing | accepted | rejected',
        submittedAt: 'Date',
        updatedAt: 'Date'
      },
      UserProfile: {
        skills: 'string[]',
        experience: 'number (years)',
        education: 'string',
        bio: 'text',
        portfolioUrl: 'string',
        linkedinUrl: 'string',
        resumeUrl: 'string'
      }
    };
  }

  getAPIPatterns() {
    return {
      authentication: {
        'JWT Bearer Token': 'Authorization: Bearer <token>',
        'Login Required': 'Most endpoints require authentication',
        'Role Based': 'Some endpoints are employer-only'
      },
      errorHandling: {
        400: 'Bad Request - Invalid input data',
        401: 'Unauthorized - Missing or invalid token',
        403: 'Forbidden - Insufficient permissions',
        404: 'Not Found - Resource does not exist',
        409: 'Conflict - Resource already exists',
        422: 'Unprocessable Entity - Validation errors',
        500: 'Internal Server Error - Server error'
      },
      pagination: {
        'Query Parameters': 'page, limit, offset',
        'Response Format': '{ data: [], total: number, page: number, totalPages: number }',
        'Default Limit': '20 items per page'
      }
    };
  }

  handleRequest(method, params = {}) {
    switch (method) {
      case 'initialize':
        return {
          capabilities: {
            resources: { subscribe: true, listChanged: true },
            tools: { listChanged: true }
          },
          serverInfo: {
            name: this.name,
            version: "1.0.0"
          }
        };

      case 'resources/list':
        return {
          resources: [
            {
              uri: "api://endpoints",
              name: "API Endpoints",
              description: "All available API endpoints for TrabaHanap app"
            },
            {
              uri: "api://models",
              name: "Data Models",
              description: "Database models and their schemas"
            },
            {
              uri: "api://patterns",
              name: "API Patterns",
              description: "Authentication, error handling, and pagination patterns"
            }
          ]
        };

      case 'resources/read':
        return this.readResource(params.uri);

      case 'tools/list':
        return {
          tools: [
            {
              name: "generate_api_client",
              description: "Generate API client functions for frontend",
              inputSchema: {
                type: "object",
                properties: {
                  endpoint: { 
                    type: "string", 
                    enum: ["jobs", "applications", "users", "search"] 
                  },
                  withTypes: { type: "boolean", default: true },
                  withErrorHandling: { type: "boolean", default: true }
                }
              }
            },
            {
              name: "generate_api_hook",
              description: "Generate React hook for API calls",
              inputSchema: {
                type: "object",
                properties: {
                  hookType: {
                    type: "string",
                    enum: ["useJobs", "useJobDetails", "useApplications", "useAuth"]
                  },
                  withCache: { type: "boolean", default: true }
                }
              }
            }
          ]
        };

      default:
        throw new Error(`Method '${method}' not found`);
    }
  }

  readResource(uri) {
    if (!uri) {
      throw new Error('URI parameter is required');
    }

    if (uri.startsWith('api://')) {
      const resource = uri.replace('api://', '');
      
      switch (resource) {
        case 'endpoints':
          return {
            contents: [{
              uri: uri,
              mimeType: "application/json",
              text: JSON.stringify(this.getAPIEndpoints(), null, 2)
            }]
          };
        
        case 'models':
          return {
            contents: [{
              uri: uri,
              mimeType: "application/json",
              text: JSON.stringify(this.getDataModels(), null, 2)
            }]
          };
        
        case 'patterns':
          return {
            contents: [{
              uri: uri,
              mimeType: "application/json",
              text: JSON.stringify(this.getAPIPatterns(), null, 2)
            }]
          };
        
        default:
          throw new Error(`Unknown API resource: ${resource}`);
      }
    }

    throw new Error(`Unsupported URI scheme: ${uri}`);
  }

  start() {
    console.error("TrabaHanap API MCP Server running");
    
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (data) => {
      try {
        const lines = data.trim().split('\n');
        
        for (const line of lines) {
          if (line.trim()) {
            const request = JSON.parse(line);
            
            try {
              const result = this.handleRequest(request.method, request.params);
              const response = {
                jsonrpc: "2.0",
                id: request.id,
                result: result
              };
              console.log(JSON.stringify(response));
            } catch (methodError) {
              const errorResponse = {
                jsonrpc: "2.0",
                id: request.id,
                error: {
                  code: -32601,
                  message: methodError.message
                }
              };
              console.log(JSON.stringify(errorResponse));
            }
          }
        }
      } catch (parseError) {
        const errorResponse = {
          jsonrpc: "2.0",
          id: null,
          error: {
            code: -32700,
            message: `Parse error: ${parseError.message}`
          }
        };
        console.log(JSON.stringify(errorResponse));
      }
    });
  }
}

const server = new APIMCPServer("trabahanap-api-mcp-server", "1.0.0");
server.start();