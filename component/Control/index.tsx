const Control = ({ muted, playing, toggleAudio, toggleVideo }: { muted: any, playing: any, toggleAudio: any, toggleVideo: any }) => {

    return (
        <div className="flex flex-row">
            {muted ? <button onClick={toggleAudio}>Unmute</button> : <button onClick={toggleAudio}>Mute</button>}
            {playing ? <button onClick={toggleVideo}>Stop</button> : <button onClick={toggleVideo}>Play</button>}
        </div>
    )
}

export default Control;