const WebSockets = require("ws");

const sockets = [];

const getSockets = () => socket;

const startP2PServer = server => {
    const wsServer = new WebSockets.Server({
        server
    });
    wsServer.on("connection", ws => {
        console.log(`Hello `);
    });
    console.log("Nomadcoin P2P Server Running");
};

const initSocketConnection = socket => {
    sockets.push(socket);
}

const connectToPeers = newPeer => {
    const ws = new WebSocket(newPeer);
    ws.on("open", () => {
        initSocketConnection(ws);
    });
};

module.exports = {
    startP2PServer,
    connectToPeers
};