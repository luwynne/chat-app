  
        //creating app, server and passing the app to the server
        let app = require('express')();

        let http = require('http').Server(app);
        
        let io = require('socket.io')(http);
        //passing the request and response
        app.get('/', (req, res) => {
            res.sendFile(__dirname + '/index.html');
        })
        
        io.on('connection', (socket) => {
            io.emit('noOfConnections', Object.keys(io.sockets.connected).length)
        
        
            socket.on('disconnect', () => {
                console.log('disconnected')
                io.emit('noOfConnections', Object.keys(io.sockets.connected).length)
            })
        
        
        //just like we listened to the disconnet event, we havr to listen to the Created as well
            socket.on('chat-message', (msg) => {
                //this is for emitting to yourself
                // io.emit('Created',(data))
                //this will broadcast to other but me
                socket.broadcast.emit('chat-message', msg)
            })
            socket.on('joined', (name) => {
                socket.broadcast.emit('joined', name)
            })
            socket.on('leaved', (name) => {
                socket.broadcast.emit('leaved', name)
            })
        
            socket.on('typing', (data) => {
                socket.broadcast.emit('typing', data)
            })
            socket.on('stoptyping', () => {
                socket.broadcast.emit('stoptyping')
            })
        
        
        })
        
        http.listen(3000, () => {
            console.log('Server is started at http://localhost:3000')
        })        