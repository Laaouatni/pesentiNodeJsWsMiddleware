const { createServer } = require("node:http");
const { WebSocketServer, WebSocket } = require("ws");

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World\n");
});
const wsLibrary = new WebSocketServer({ server });

const connectedClientsArray = new Set();

wsLibrary.on("connection", (thisConnectedWss) => {
  connectedClientsArray.add(thisConnectedWss);

  thisConnectedWss.on("message", (thisMessage) => {
    connectedClientsArray.forEach((thisForEachClient) => {
      const sameClient = thisForEachClient === thisConnectedWss;
      const closedClient = thisForEachClient.readyState === WebSocket.CLOSED;
      if (sameClient || closedClient) return;

      thisForEachClient.send(thisMessage);
    });
  });

  thisConnectedWss.on("close", () => {
    connectedClientsArray.delete(thisConnectedWss);
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`🚀 WebSocket server in ascolto PORTA ${PORT}`);
});
