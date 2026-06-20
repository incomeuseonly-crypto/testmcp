// Quick test script for the MCP server
const body = JSON.stringify({
  jsonrpc: "2.0",
  id: 1,
  method: "initialize",
  params: {
    protocolVersion: "2025-03-26",
    capabilities: {},
    clientInfo: { name: "test-client", version: "1.0" },
  },
});

const res = await fetch("http://localhost:8787/mcp", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body,
});

const data = await res.json();
console.log("=== Initialize Response ===");
console.log(JSON.stringify(data, null, 2));

// Now list tools
const toolsBody = JSON.stringify({
  jsonrpc: "2.0",
  id: 2,
  method: "tools/list",
  params: {},
});

const res2 = await fetch("http://localhost:8787/mcp", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "mcp-session-id": res.headers.get("mcp-session-id") || "",
  },
  body: toolsBody,
});

const data2 = await res2.json();
console.log("\n=== Tools List ===");
console.log(JSON.stringify(data2, null, 2));

// Test add_todo
const addBody = JSON.stringify({
  jsonrpc: "2.0",
  id: 3,
  method: "tools/call",
  params: {
    name: "add_todo",
    arguments: { title: "Read a book" },
  },
});

const res3 = await fetch("http://localhost:8787/mcp", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "mcp-session-id": res.headers.get("mcp-session-id") || "",
  },
  body: addBody,
});

const data3 = await res3.json();
console.log("\n=== Add Todo Result ===");
console.log(JSON.stringify(data3, null, 2));
