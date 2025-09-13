# TrabaHanap MCP Server

This folder contains the Model Context Protocol server for the TrabaHanap job search application.

## Structure

```
mcp/
├── servers/           # MCP server implementations
│   └── chakra-server.js
├── tools/            # Tool definitions and utilities
│   └── chakra-tools.js
├── config/           # Configuration files
│   └── servers.json
├── test/             # Test files
│   └── test-server.js
└── README.md
```

## Usage

```bash
# Start MCP server
npm run mcp:server

# Run app with MCP
npm run mcp:dev

# Test MCP server
npm run mcp:test
```

## Features

- Chakra UI component awareness
- Job-specific component generation
- Theme token understanding
- Project structure context
```