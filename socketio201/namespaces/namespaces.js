const express = require('express');
const app = express();
const { createServer } = require('http');
const { join } = require('path');
const { Server } = require('socket.io');

// app.use(express.static(__dirname, + 'public'))

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, './public/namespaces.html'))
})

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true,
    },
});


io.of("/").on('connection', (socket) => {

    console.log(socket.id+ ' has connected');
    socket.join('chat');

    io.of('/').to('chat').emit('welcomeToChatRoom', {});
    // io.of('/').to('chat').to('chat2').to('adminchat').emit('welcomeToChatRoom', {});

    io.of('/admin').emit('joininNs', {});

    socket.on('messageToServer', (data) => {
        // console.log(data)

        // Emits an event to all connected clients 
        io.of("/").emit('newMessageToClient', data)
        // io.emit('newMessageToClient', data)
    })

});


io.of('/admin').on('connection', (socket) => {
    console.log(socket.id + 'has joined /admin')
    io.of('/admin').emit('something', {})
});




httpServer.listen(5000, () => {
    console.log('Server is running on port 5000');
});