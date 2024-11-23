import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSocket } from "@/context/socket";

import usePeer from "@/hooks/usePeer";
import useMediaStream from "@/hooks/useMediaStream";
import usePlayer from "@/hooks/usePlayer";

import Player from "@/component/Player";
import Control from "@/component/Control";

import { cloneDeep } from "lodash";

const Room = () => {
    const socket = useSocket();
    const { roomId } = useRouter().query;
    const { peer, myId } = usePeer();
    const { stream } = useMediaStream();
    const { players, setPlayers, toggleAudio, toggleVideo, playerHighlighted, nonHighlightedPlayers, leaveRoom } = usePlayer(myId, roomId, peer, stream);

    const [users, setUsers] = useState<any>([])

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            leaveRoom()
            event.preventDefault();

            event.returnValue = 'Are you sure you want to leave?';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [leaveRoom])

    useEffect(() => {
        if(!socket || !peer || !stream) return;
        
        const handleUserConnected = (newUser: any) => {
            console.log("New user connected with id", newUser)

            console.log('calling', newUser)
            const call = peer.call(newUser, stream)
            console.log('call:', call)

            call.on("stream", (userStream) => {
                console.log("Stream received from", newUser)

                setPlayers((prev: any = {}) => ({
                    ...prev,
                    [newUser]: {
                        url: userStream,
                        muted: false,
                        playing: true,
                    }
                }))
            })

            setUsers((prev: any) => ({
                ...prev,
                [newUser]: call
            }))
        } 
        socket.on('user-connected', handleUserConnected)

        return () => {
            socket.off('user-connected', handleUserConnected)
        }
    }, [peer, socket, stream, setPlayers])

    useEffect(() => {
        if(!socket) return
        const handleToggleAudio = (userId: any) => {
            console.log("Toggling audio for user", userId)
            setPlayers((prev: any) => {
                const copy = cloneDeep(prev)
                copy[userId].muted = !copy[userId].muted
                return { ...copy }
            })
        }
        
        const handleToggleVideo = (userId: any) => {
            console.log("Toggling video for user", userId)
            setPlayers((prev: any) => {
                const copy = cloneDeep(prev)
                copy[userId].playing = !copy[userId].playing
                return { ...copy }
            })
        }

        const handleUserLeaveRoom = (userId: any) => {
            console.log("User left room", userId)
            users[userId]?.close()
            setPlayers((prev: any) => {
                const copy = cloneDeep(prev)
                delete copy[userId]
                return { ...copy }
            })
        }

        socket.on('user-toggle-audio', handleToggleAudio)
        socket.on('user-toggle-video', handleToggleVideo)
        socket.on('user-leave-room', handleUserLeaveRoom)

        return () => {
            socket.off('user-toggle-audio', handleToggleAudio)
            socket.off('user-toggle-video', handleToggleVideo)
            socket.off('user-leave-room', handleUserLeaveRoom)
        }
    }, [socket, setPlayers, players, users])

    useEffect(() => {
        if(!peer || !stream) return;
        peer.on("call", (call) => {
            const { peer: callerId } = call

            console.log("Call received")
            call.answer(stream)

            call.on("stream", (userStream) => {
                console.log("Stream received from", callerId)

                setPlayers((prev: any = {}) => ({
                    ...prev,
                    [callerId]: {
                        url: userStream,
                        muted: false,
                        playing: true,
                    }
                }))

                setUsers((prev: any) => ({
                    ...prev,
                    [callerId]: call
                }))
            })
        })
    }, [peer, stream, setPlayers])

    useEffect(() => {
        if(!stream || !myId || !setPlayers) return;
        console.log("Stream changed", stream)
        setPlayers((prev: any = {}) => ({
            ...prev,
            [myId]: {
                url: stream,
                muted: false,
                playing: true,
            }
        }))
        console.log("Players", players)
    }, [myId, stream, setPlayers])

    return (
        <div className="flex flex-col">
            <div>
                {playerHighlighted && (
                    <Player url={playerHighlighted.url} muted={playerHighlighted.muted} playing={playerHighlighted.playing} />
                )}
            </div>

            <div>
                {Object.keys(nonHighlightedPlayers).map((playerId: any) => {
                    const { url, muted, playing } = nonHighlightedPlayers[playerId]

                    return <Player key={playerId} url={url} muted={muted} playing={playing} />
                    }
                )}
            </div>

            <Control muted={players[myId]?.muted} playing={players[myId]?.playing} toggleAudio={toggleAudio} toggleVideo={toggleVideo} leaveRoom={leaveRoom} />
        </div>
    )
}

export default Room;