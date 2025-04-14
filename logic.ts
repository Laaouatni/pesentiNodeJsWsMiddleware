import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";

export function thisLogic() {
  const server = createServer();
  const wsLibrary = new WebSocketServer({ server });
  
  const connectedClientsArray = new Set<WebSocket>();
  
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
}

