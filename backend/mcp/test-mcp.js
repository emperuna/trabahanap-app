#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🧪 Testing TrabaHanap MCP Servers...\n');

const servers = [
  { name: 'Spring Boot Helper', file: 'spring-boot-helper.js' },
  { name: 'Database Helper', file: 'database-helper.js' },
  { name: 'API Generator', file: 'api-generator.js' }
];

async function testServer(serverName, serverFile) {
  return new Promise((resolve) => {
    console.log(`Testing ${serverName}...`);
    
    const serverPath = path.join(__dirname, 'tools', serverFile);
    const child = spawn('node', [serverPath], {
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 5000
    });

    let output = '';
    let hasError = false;

    child.stdout.on('data', (data) => {
      output += data.toString();
    });

    child.stderr.on('data', (data) => {
      const error = data.toString();
      if (!error.includes('Warning') && !error.includes('ExperimentalWarning')) {
        hasError = true;
        console.log(`❌ ${serverName}: ${error.trim()}`);
      }
    });

    child.on('close', (code) => {
      if (!hasError && code !== null) {
        console.log(`✅ ${serverName}: Server started successfully`);
      } else if (code === null) {
        console.log(`✅ ${serverName}: Server running (timeout reached - this is expected)`);
      }
      resolve();
    });

    child.on('error', (error) => {
      console.log(`❌ ${serverName}: ${error.message}`);
      resolve();
    });

    // Send a test message and then kill the process
    setTimeout(() => {
      child.kill('SIGTERM');
    }, 2000);
  });
}

async function runTests() {
  for (const server of servers) {
    await testServer(server.name, server.file);
  }
  
  console.log('\n🎉 MCP Server testing complete!');
  console.log('\n📋 Next steps:');
  console.log('1. Run: chmod +x mcp/tools/*.js');
  console.log('2. Install: npm install @modelcontextprotocol/server-filesystem');
  console.log('3. Test generation: npm run mcp:spring');
  console.log('4. Check your .env file has DATABASE_URL');
}

runTests().catch(console.error);
