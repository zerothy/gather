import { Server } from 'socket.io';

const SocketHandler = (req: any, res: any) => {
    console.log('socket called');
    if(res.socket.server.io) {
        console.log('already connected');
    }else{
        const io = new Server(res.socket.server, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST']
            },
        });
        res.socket.server.io = io;
    
        io.on('connection', (socket) => {
            console.log('server is connected');
        });
    }

    res.end();
}

export default SocketHandler;