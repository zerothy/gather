import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();
    const [roomId, setRoomId] = useState<string>('');


    const generateRandomLetter = () => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        return alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    const generateCustomID = () => {
        const generateSection = (length: number) => {
            let section = '';
            for(let i = 0; i < length; i++){
                section += generateRandomLetter();
            }
            return section;
        }

        const id1 = generateSection(3);
        const id2 = generateSection(3);
        const id3 = generateSection(3);

        return `${id1}-${id2}-${id3}`;
    }

    const createAndJoinRoom = () => {
        const roomId = generateCustomID();
        router.push(`/room/${roomId}`);
    }

    const joinRoom = () => {
        if(!roomId){
            alert('Invalid Room ID');
            return;
        }
        
        router.push(`/room/${roomId}`);
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