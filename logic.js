"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.thisLogic = thisLogic;
var http_1 = require("http");
var ws_1 = require("ws");
function thisLogic() {
    var server = (0, http_1.createServer)();
    var wsLibrary = new ws_1.WebSocketServer({ server: server });
    var connectedClientsArray = new Set();
    wsLibrary.on("connection", function (thisConnectedWss) {
        connectedClientsArray.add(thisConnectedWss);
        thisConnectedWss.on("message", function (thisMessage) {
            connectedClientsArray.forEach(function (thisForEachClient) {
                var sameClient = thisForEachClient === thisConnectedWss;
                var closedClient = thisForEachClient.readyState === ws_1.WebSocket.CLOSED;
                if (sameClient || closedClient)
                    return;
                thisForEachClient.send(thisMessage);
            });
        });
        thisConnectedWss.on("close", function () {
            connectedClientsArray.delete(thisConnectedWss);
        });
    });
    var PORT = process.env.PORT || 8080;
    server.listen(PORT, function () {
        console.log("\uD83D\uDE80 WebSocket server in ascolto PORTA ".concat(PORT));
    });
}
