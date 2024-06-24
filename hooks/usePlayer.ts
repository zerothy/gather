import { useState } from "react"
import { useSocket } from "@/context/socket"
import { cloneDeep } from "lodash"

const usePlayer = (myId: any, roomId: any) => {
    const socket = useSocket()
    const [players, setPlayers] = useState<any>({})
    const playersCopy = cloneDeep(players)

    const playerHighlighted = playersCopy[myId]
    delete playersCopy[myId]

    const nonHighlightedPlayers = playersCopy

    const toggleAudio = () => {
        console.log("I toggled my audio")
        setPlayers((prev: any) => {
            const copy = cloneDeep(prev)
            copy[myId].muted = !copy[myId].muted
            return {...copy}
        })
        socket.emit('user-toggle-audio', myId, roomId, (response: any) => {
            console.log('Acknowledgement from server for toggleAudio:', response);
        });
    }

    const toggleVideo = () => {
        console.log("I toggled my video")
        setPlayers((prev: any) => {
            const copy = cloneDeep(prev)
            copy[myId].playing = !copy[myId].playing
            return {...copy}
        })
        socket.emit('user-toggle-video', myId, roomId, (response: any) => {
            console.log('Acknowledgement from server for toggleVideo:', response);
        });
    }

    return { players, setPlayers, toggleAudio, toggleVideo, playerHighlighted, nonHighlightedPlayers}
}

export default usePlayer;