import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ReactMCPServer {
  constructor(name, version) {
    this.name = name;
    this.version = version;
  }

  getReactHooks() {
    return {
      basic: ['useState', 'useEffect', 'useContext', 'useReducer'],
      performance: ['useMemo', 'useCallback', 'memo'],
      custom: ['useLocalStorage', 'useDebounce', 'useFetch'],
      jobApp: ['useJobSearch', 'useApplications', 'useUserProfile']
    };
  }

  getComponentPatterns() {
    return {
      layout: ['Header', 'Footer', 'Sidebar', 'Layout'],
      jobListing: ['JobCard', 'JobList', 'JobDetails', 'JobFilters'],
      forms: ['SearchForm', 'ApplicationForm', 'LoginForm', 'ProfileForm'],
      ui: ['LoadingSpinner', 'ErrorBoundary', 'Modal', 'Toast'],
      pages: ['HomePage', 'JobsPage', 'JobDetailsPage', 'ProfilePage']
    };
  }

  getViteFeatures() {
    return {
      routing: {
        'src/pages/': 'Page components with React Router',
        'src/pages/HomePage.tsx': 'Home page component',
        'src/pages/JobsPage.tsx': 'Jobs listing page',
        'src/pages/JobDetailsPage.tsx': 'Job details page',
        'src/pages/ProfilePage.tsx': 'User profile page'
      },
      optimization: {
        'lazy': 'React.lazy() for code splitting',
        'Suspense': 'React Suspense for loading states',
        'dynamic imports': 'Dynamic imports with Vite'
      },
      development: {
        'HMR': 'Hot Module Replacement',
        'fast refresh': 'Fast refresh for React components',
        'env variables': 'VITE_ prefixed environment variables'
      }
    };
  }

  getBestPractices() {
    return {
      folderStructure: {
        'src/components/': 'Reusable UI components',
        'src/pages/': 'Page components',
        'src/hooks/': 'Custom React hooks',
        'src/utils/': 'Utility functions',
        'src/types/': 'TypeScript type definitions',
        'src/api/': 'API utility functions'
      },
      naming: {
        components: 'PascalCase (JobCard.tsx)',
        hooks: 'camelCase with use prefix (useJobSearch.ts)',
        files: 'kebab-case for non-components (job-utils.ts)'
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
              uri: "react://hooks",
              name: "React Hooks",
              description: "Available React hooks and custom hooks for job app"
            },
            {
              uri: "react://components",
              name: "Component Patterns",
              description: "Common component patterns for job search app"
            },
            {
              uri: "vite://features",
              name: "Vite Features",
              description: "Vite development and build features"
            },
            {
              uri: "react://best-practices",
              name: "Best Practices",
              description: "React and Vite best practices for job app"
            }
          ]
        };

      case 'resources/read':
        return this.readResource(params.uri);

      case 'tools/list':
        return {
          tools: [
            {
              name: "generate_job_component",
              description: "Generate a React component for job-related functionality",
              inputSchema: {
                type: "object",
                properties: {
                  componentType: { 
                    type: "string", 
                    enum: ["JobCard", "JobList", "SearchForm", "ApplicationForm", "JobFilters"] 
                  },
                  withHooks: { type: "boolean", default: true },
                  withTypescript: { type: "boolean", default: true }
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

    if (uri.startsWith('react://')) {
      const resource = uri.replace('react://', '');
      
      switch (resource) {
        case 'hooks':
          return {
            contents: [{
              uri: uri,
              mimeType: "application/json",
              text: JSON.stringify(this.getReactHooks(), null, 2)
            }]
          };
        
        case 'components':
          return {
            contents: [{
              uri: uri,
              mimeType: "application/json",
              text: JSON.stringify(this.getComponentPatterns(), null, 2)
            }]
          };
        
        case 'best-practices':
          return {
            contents: [{
              uri: uri,
              mimeType: "application/json",
              text: JSON.stringify(this.getBestPractices(), null, 2)
            }]
          };
        
        default:
          throw new Error(`Unknown React resource: ${resource}`);
      }
    }

    if (uri.startsWith('vite://')) {
      const resource = uri.replace('vite://', '');
      
      switch (resource) {
        case 'features':
          return {
            contents: [{
              uri: uri,
              mimeType: "application/json",
              text: JSON.stringify(this.getViteFeatures(), null, 2)
            }]
          };
        
        default:
          throw new Error(`Unknown Vite resource: ${resource}`);
      }
    }

    throw new Error(`Unsupported URI scheme: ${uri}`);
  }

  start() {
    console.error("TrabaHanap React/Next.js MCP Server running");
    
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

const server = new ReactMCPServer("trabahanap-react-mcp-server", "1.0.0");
server.start();