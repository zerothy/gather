import { useEffect, useRef, useState } from "react"

const useMediaStream = () => {
    const [state, setState] = useState<MediaStream | null>(null)
    const isStreamSet = useRef(false)

    useEffect(() => {
        if(isStreamSet.current) return;
        isStreamSet.current = true;

        (async function initStream(){
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                console.log('setting stream')
                setState(stream)
            } catch (error) {
                console.error('Error accessing media devices.', error)
            }
        })()
    }, [])

    return {
        stream: state
    }
}

export default useMediaStream;