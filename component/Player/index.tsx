import ReactPlayer from "react-player";
import { useEffect, useRef } from "react";

const Player = ({ url, muted, playing }: { url: any, muted: any, playing: any }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.srcObject = url;
        }
    }, [url]);

    return (
        <div>
            {
                playing ? (
                    <ReactPlayer url={url} muted={muted} playing={playing} width="30%" height="30%" />
                ) : (
                    <div className="flex items-center justify-center w-[30%] h-[30%] bg-gray-800">
                        <p className="text-white">User is not streaming</p>
                    </div>
                )
            }
        </div>
    )
}

export default Player;