import { useEffect, useRef, useState } from 'react'
import Peer from 'peerjs'
import peer from 'peerjs'

const usePeer = () => {
    const [peer, setPeer] = useState<Peer | null>(null)
    const [myId, setMyId] = useState<string>('')
    const isPeerSet = useRef(false)

    useEffect(() => {
        if(isPeerSet.current) return;
        isPeerSet.current = true;
        (async () => {
            const myPeer = new Peer()
            setPeer(peer)
            
            myPeer.on('open', (id) => {
                console.log('my peer id', id)
                setMyId(id)
            })
        })()
    }, [])

    return { peer, myId }
}

export default usePeer