import { Server } from 'socket.io';

const SocketHandler = (req: any, res: any) => {
    console.log('socket called');
    if(res.socket.server.io) {
        console.log('already connected');
    }else{
        const io = new Server(res.socket.server, {
            path: '/api/socket',
            wsEngine: ['ws', 'wss'],
            transports: ['websocket', 'polling'],
            cors: {
                origin: '*',
                methods: ['GET', 'POST']
            },
            allowEIO3: true
        });
        res.socket.server.io = io;
    
        io.on('connection', (socket) => {
            console.log('server is connected');

            socket.on('join-room', (roomId, userId) => {
                console.log(`User ${userId} joined room ${roomId}`);
                socket.join(roomId);
                socket.broadcast.to(roomId).emit('user-connected', userId);
            })

            socket.on('user-toggle-audio', (userId, roomId) => {
                console.log(`User ${userId} toggled audio in room ${roomId}`);
                socket.join(roomId);
                socket.broadcast.to(roomId).emit('user-toggle-audio', userId);
            })

            socket.on('user-toggle-video', (userId, roomId) => {
                console.log(`User ${userId} toggled video in room ${roomId}`);
                socket.join(roomId);
                socket.broadcast.to(roomId).emit('user-toggle-video', userId);
            })

            socket.on('user-leave-room', (userId, roomId) => {
                console.log(`User ${userId} left room ${roomId}`);
                socket.join(roomId);
                socket.broadcast.to(roomId).emit('user-leave-room', userId);
            })

            socket.on('disconnect', (userId, roomId) => {
                console.log('user disconnected');
                socket.join(roomId);
                socket.broadcast.to(roomId).emit('user-leave-room', userId);
            });
        });

        io.on('disconnect', (socket) => {
            console.log('server is disconnected');
        });
    }

    res.end();
}

export default SocketHandler;