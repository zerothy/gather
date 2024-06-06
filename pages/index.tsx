import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useSocket } from '@/context/socket';

export default function Home() {
    const router = useRouter();
    const socket = useSocket();

    useEffect(() => {
        socket?.on('connect', () => {
            console.log(socket.id)
        })
    }, [socket])

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}