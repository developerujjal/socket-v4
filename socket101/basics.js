const express = require('express');
const app = express();
const { createServer } = require('http');
const { Server } = require('socket.io');

app.use(express.static(__dirname + '/public'));

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true,
    },
});


io.on('connection', (socket) => {
    console.log(socket.id+ ' has connected');

    socket.emit('messageFromServer', {data: 'Hello from server'});

    socket.on('messageFromClient', (data) => {
        console.log(data)
    });
})




httpServer.listen(3000, () => {
    console.log('Server is running on port 3000');
})