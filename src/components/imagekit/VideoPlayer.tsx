
import React, { useRef } from "react";
import VideoJS from "../videoJSPlayer";

export default function VideoPlayer({ url, poster }: { url: string, poster: string }) {
    const playerRef = useRef(null);

    const handlePlayerReady = (player: any) => {
        playerRef.current = player;

        // Handle right click prevention on the video element itself
        player.on('contextmenu', (e: any) => {
            e.preventDefault();
        });
    };

    // Just use the raw URL without any HLS/ABR transformations
    const videoJsOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        poster: poster,
        sources: [{
            src: url,
            type: "video/mp4" // Assuming MP4 for standard uploads
        }],
        controlBar: {
            volumePanel: { inline: false }
        },
        userActions: {
            hotkeys: true
        }
    };

    return (
        <div
            className="w-full h-full"
            onContextMenu={(e) => e.preventDefault()}
        >
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
            <style>{`
                video::-internal-media-controls-download-button {
                    display: none;
                }
                video::-webkit-media-controls-enclosure {
                    overflow: hidden;
                }
            `}</style>
        </div>
    )
}