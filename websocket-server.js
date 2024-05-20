const dgram = require('dgram');
const WebSocket = require('ws');

const udpPort = 12345; // Port for UDP communication with Pd
const wsPort = 8080; // Port for WebSocket server

// Create UDP server
const udpServer = dgram.createSocket('udp4');

udpServer.on('listening', () => {
    const address = udpServer.address();
    console.log(`UDP server listening on ${address.address}:${address.port}`);
});

udpServer.on('message', (message, remote) => {
    console.log(`UDP message from ${remote.address}:${remote.port} - ${message}`);
    // Forward the message to all WebSocket clients
    wsServer.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message.toString());
        }
    });
});

udpServer.bind(udpPort);

// Create WebSocket server
const wsServer = new WebSocket.Server({ port: wsPort });

wsServer.on('connection', ws => {
    console.log('WebSocket connection established');
});

console.log(`WebSocket server listening on ws://localhost:${wsPort}`);
