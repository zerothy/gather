import React, { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext<any>(null);

export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
}

export const SocketProvider = (props: any) => {
    const { children } = props;
    const [socket, setSocket] = useState<any>(null);

    useEffect(() => {
        const connection = io("https://gather-black.vercel.app/");
        console.log('socket connected', connection);
        setSocket(connection);
    }, []);

    socket?.on('connect_error', async (err: Error) => {
        console.log('Error establishing socket', err)
        await fetch('/api/socket')
    })

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}