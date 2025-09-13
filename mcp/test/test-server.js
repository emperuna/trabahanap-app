const { spawn } = require('child_process');
const path = require('path');

console.log('Testing MCP Server...');

const serverPath = path.join(__dirname, '../servers/chakra-server.js');
const server = spawn('node', [serverPath]);

server.stdout.on('data', (data) => {
  console.log(`✅ Server output: ${data}`);
});

server.stderr.on('data', (data) => {
  console.log(`🟡 Server ready: ${data}`);
  
  // Test request
  const testRequest = {
    jsonrpc: "2.0",
    id: 1,
    method: "resources/list",
    params: {}
  };
  
  server.stdin.write(JSON.stringify(testRequest) + '\n');
});

server.on('close', (code) => {
  console.log(`Server test completed with code ${code}`);
});

// Auto-stop after 5 seconds
setTimeout(() => {
  server.kill();
  process.exit(0);
}, 5000);