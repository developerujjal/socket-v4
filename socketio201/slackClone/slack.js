const express = require('express');
const app = express();
const { createServer } = require('http');
const { Server } = require('socket.io');
const namespaces = require('./data/namespaces');
const Room = require('./classes/Room');

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

// app.set('io', io);

//manufactured way to change an ns without building a huge UI!
app.get('/change-ns', (req, res) => {

    //update ns array
    namespaces[0].addRoom(new Room(0, 'Deleted Articles', 0));
    // let everyone know in this namespace, that it changed
    io.of(namespaces[0].endpoint).emit('nsChange', namespaces[0]);
    res.json(namespaces[0]) // or res.send()
});


io.on('connection', (socket) => {
    console.log(socket.id + ' has connected');

    socket.emit('nsList', namespaces);


});


namespaces.forEach((namespace) => {
    io.of(namespace.endpoint).on('connection', (socket) => {
        console.log(`${socket.id} has connected in ${namespace.endpoint}`)
    });
});




httpServer.listen(3000, () => {
    console.log('Server is running on port 3000');
})