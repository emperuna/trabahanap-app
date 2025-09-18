#!/usr/bin/env node

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');

console.log('Testing MCP SDK with correct pattern...');

async function runTests() {
  try {
    console.log('1. Creating server with tools capability...');
    
    const server = new Server({
      name: 'test-server',
      version: '1.0.0'
    }, {
      capabilities: {
        tools: {}
      }
    });
    
    console.log('✅ Server created successfully');

    console.log('2. Looking for handler-related methods...');
    const proto = Object.getPrototypeOf(server);
    const methods = Object.getOwnPropertyNames(proto);
    
    // Check for any method that might be used to handle requests
    const handlerMethods = methods.filter(m => 
      m.includes('handler') || 
      m.includes('Handler') ||
      m.includes('request') ||
      m.includes('Request') ||
      m === '_oninitialize'
    );
    
    console.log('Handler-related methods:', handlerMethods);
    
    console.log('3. Checking if _oninitialize is the key...');
    if (typeof server._oninitialize === 'function') {
      console.log('✅ _oninitialize exists - this might be where we set up handlers');
    }

    console.log('4. Trying to set up handlers the right way...');
    
    // Override the _oninitialize method to set up our tools
    server._oninitialize = async () => {
      console.log('🔄 _oninitialize called!');
      return {
        protocolVersion: '1.0.0',
        capabilities: {
          tools: {
            listTools: async () => {
              console.log('📋 listTools called!');
              return {
                tools: [
                  {
                    name: 'test_tool',
                    description: 'A test tool',
                    inputSchema: {
                      type: 'object',
                      properties: {}
                    }
                  }
                ]
              };
            },
            callTool: async (name, args) => {
              console.log(`🔧 callTool called with name: ${name}`);
              return {
                content: [{
                  type: 'text',
                  text: 'Test tool response'
                }]
              };
            }
          }
        }
      };
    };
    
    console.log('5. Creating transport and connecting...');
    const transport = new StdioServerTransport();
    
    // Connect the server to the transport
    await server.connect(transport);
    console.log('✅ Server connected and running!');
    
    // Keep it running for a bit
    setTimeout(() => {
      console.log('Shutting down test server...');
      process.exit(0);
    }, 2000);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

// Run the tests
runTests();
