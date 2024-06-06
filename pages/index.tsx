import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuid } from 'uuid';

export default function Home() {
    const router = useRouter();

    const createAndJoinRoom = () => {
        const roomId = uuid();
        router.push(`/${roomId}`);
    }

    return (
        <div>
            <h1>Gather</h1>
            <div>
                <input type="text" />
                <button>Join Room</button>
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