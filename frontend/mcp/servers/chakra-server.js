import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class SimpleMCPServer {
  constructor(name, version) {
    this.name = name;
    this.version = version;
  }

  getChakraComponents() {
    return {
      layout: ['Box', 'Container', 'Flex', 'Grid', 'SimpleGrid', 'Stack', 'HStack', 'VStack'],
      forms: ['Button', 'Input', 'Select', 'Textarea', 'Checkbox', 'Radio', 'Switch'],
      dataDisplay: ['Badge', 'Card', 'Divider', 'List', 'Table', 'Tag', 'Avatar'],
      feedback: ['Alert', 'Progress', 'Skeleton', 'Spinner', 'Toast'],
      overlay: ['Modal', 'Drawer', 'Menu', 'Popover', 'Tooltip'],
      navigation: ['Breadcrumb', 'Link', 'Stepper'],
      typography: ['Text', 'Heading', 'Highlight']
    };
  }

  getChakraHooks() {
    return [
      'useColorMode', 'useColorModeValue', 'useDisclosure', 'useToast', 
      'useClipboard', 'useBoolean', 'useBreakpointValue'
    ];
  }

  getThemeTokens() {
    return {
      colors: {
        brand: "Custom brand colors for job site",
        gray: "50, 100, 200, 300, 400, 500, 600, 700, 800, 900",
        blue: "50, 100, 200, 300, 400, 500, 600, 700, 800, 900"
      },
      spacing: "0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64",
      sizes: "xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl",
      breakpoints: "sm: 30em, md: 48em, lg: 62em, xl: 80em"
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
              uri: "file://src/",
              name: "Source Code",
              description: "TrabaHanap app source code"
            },
            {
              uri: "chakra://components",
              name: "Chakra UI Components",
              description: "Available Chakra UI components by category"
            },
            {
              uri: "chakra://hooks", 
              name: "Chakra UI Hooks",
              description: "Available Chakra UI hooks"
            },
            {
              uri: "chakra://theme-tokens",
              name: "Theme Tokens", 
              description: "Chakra UI design tokens and theme structure"
            }
          ]
        };

      case 'resources/read':
        return this.readResource(params.uri);

      case 'tools/list':
        return {
          tools: [
            {
              name: "generate_job_card",
              description: "Generate a job listing card component using Chakra UI",
              inputSchema: {
                type: "object",
                properties: {
                  includeApplyButton: { type: "boolean", default: true },
                  cardVariant: { type: "string", enum: ["simple", "detailed", "compact"] }
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

    if (uri.startsWith('chakra://')) {
      const resource = uri.replace('chakra://', '');
      
      switch (resource) {
        case 'components':
          return {
            contents: [{
              uri: uri,
              mimeType: "application/json",
              text: JSON.stringify(this.getChakraComponents(), null, 2)
            }]
          };
        
        case 'hooks':
          return {
            contents: [{
              uri: uri,
              mimeType: "application/json", 
              text: JSON.stringify(this.getChakraHooks(), null, 2)
            }]
          };
        
        case 'theme-tokens':
          return {
            contents: [{
              uri: uri,
              mimeType: "application/json",
              text: JSON.stringify(this.getThemeTokens(), null, 2)
            }]
          };
        
        default:
          throw new Error(`Unknown Chakra resource: ${resource}`);
      }
    }
    
    if (uri.startsWith('file://')) {
      const filePath = uri.replace('file://', '');
      try {
        const fullPath = path.join(process.cwd(), filePath);
        const content = fs.readFileSync(fullPath, 'utf8');
        return {
          contents: [{
            uri: uri,
            mimeType: "text/plain",
            text: content
          }]
        };
      } catch (error) {
        throw new Error(`Failed to read file: ${error.message}`);
      }
    }
    
    throw new Error(`Unsupported URI scheme: ${uri}`);
  }

  start() {
    console.error("TrabaHanap Chakra-aware MCP Server running");
    
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

const server = new SimpleMCPServer("trabahanap-chakra-mcp-server", "1.0.0");
server.start();