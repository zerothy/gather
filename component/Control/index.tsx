const Control = ({ muted, playing, toggleAudio, toggleVideo, leaveRoom }: { muted: any, playing: any, toggleAudio: any, toggleVideo: any, leaveRoom: any }) => {

    return (
        <div className="flex flex-row">
            {muted ? <button onClick={toggleAudio}>Unmute</button> : <button onClick={toggleAudio}>Mute</button>}
            {playing ? <button onClick={toggleVideo}>Stop</button> : <button onClick={toggleVideo}>Play</button>}
            <button onClick={leaveRoom}>Leave Room</button>
        </div>
    )
}

export default Control;