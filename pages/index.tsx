import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuid } from 'uuid';

export default function Home() {
    const router = useRouter();
    const [roomId, setRoomId] = useState<string>('');

    const createAndJoinRoom = () => {
        const roomId = uuid();
        router.push(`/${roomId}`);
    }

    const joinRoom = () => {
        if(!roomId){
            alert('Please enter a room ID');
            return;
        }
        router.push(`/${roomId}`);
    }

    return (
        <div className='flex flex-col'>
            <h1>Gather</h1>
            <div>
                <input type="text" placeholder='Enter Room ID' onChange={(e) => setRoomId(e?.target?.value)} />
                <button onClick={joinRoom} className='bg-red-200'>Join Room</button>
            </div>
            <div>
                <p>OR</p>
            </div>
            <div>
                <button onClick={createAndJoinRoom}>Create Room</button>
            </div>
        </div>
    )
}