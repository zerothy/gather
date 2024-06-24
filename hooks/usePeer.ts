import { useEffect, useRef, useState } from 'react'
import Peer from 'peerjs'

import { useSocket } from '@/context/socket'
import { useRouter } from 'next/router'

const usePeer = () => {
    const [peer, setPeer] = useState<Peer | null>(null)
    const [myId, setMyId] = useState<string>('')
    const isPeerSet = useRef(false)

    const socket = useSocket()
    const roomId = useRouter().query.roomId

    useEffect(() => {
        if(isPeerSet.current || !roomId || !socket) return;
        isPeerSet.current = true;
        let myPeer;
        (async () => {
            myPeer = new Peer()
            setPeer(myPeer)
            
            myPeer.on('open', (id) => {
                console.log('my peer id', id)
                setMyId(id)
                socket?.emit('join-room', roomId, id)
            })
        })()
    }, [roomId, socket])

    return { peer, myId }
}

export default usePeer