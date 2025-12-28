import { useRef, useState } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  MoreHorizontal,
  Bookmark,
} from "lucide-react";
import { useParams } from "react-router-dom";
import SaveToPlaylistModal from "../components/SaveToPlaylistModal";
import VideoJS from "../components/videoJSPlayer";
import useVideoById from "../hooks/useVideoById";
import { timeAgo } from "../utils/timeAgo";

export default function VideoDetail() {
  const { id } = useParams();
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);

  // React Query (video is already normalized)
  const { data: video, isLoading, isError } = useVideoById(id || "");

  const playerRef = useRef(null);

  if (isLoading) return <p>Loading video...</p>;
  if (isError || !video) return <p>Failed to load video</p>;

  const { title, videoFile, views, createdAt, description, owner } = video;

  const videoUrl = typeof videoFile === "string" ? videoFile : videoFile?.url;
  const ownerAvatar = typeof owner === "string" ? undefined : owner?.avatar?.url;
  const ownerUsername = typeof owner === "string" ? undefined : owner?.username;

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: videoUrl
      ? [
        {
          src: videoUrl,
          type: "application/x-mpegURL",
        },
      ]
      : [],
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;
  };

  const formatViews = (count = 0) => {
    if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
    if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
    return count;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LEFT SIDE */}
      <div className="lg:col-span-2">
        {/* Video Player */}
        <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
          <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        </div>

        {/* Video Info */}
        <div className="mt-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2 gap-4">
            {/* Channel */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img
                  src={ownerAvatar}
                  alt="Channel Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {ownerUsername}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    1.2M subscribers
                  </p>
                </div>
              </div>

              <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium dark:bg-white dark:text-black hover:opacity-80">
                Subscribe
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full">
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-l-full border-r">
                  <ThumbsUp size={20} />
                  <span className="text-sm font-medium">12K</span>
                </button>
                <button className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-full">
                  <ThumbsDown size={20} />
                </button>
              </div>

              <button className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <Share2 size={20} />
                <span className="text-sm font-medium">Share</span>
              </button>

              <button
                onClick={() => setIsPlaylistModalOpen(true)}
                className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Bookmark size={20} />
                <span className="text-sm font-medium">Save</span>
              </button>

              <button className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>

          <SaveToPlaylistModal
            isOpen={isPlaylistModalOpen}
            onClose={() => setIsPlaylistModalOpen(false)}
          />

          {/* Description */}
          <div className="mt-4 bg-gray-100 dark:bg-gray-800 p-3 rounded-xl text-sm">
            <div className="font-semibold mb-1">
              {formatViews(views)} views • {timeAgo(createdAt)}
            </div>
            <p className="text-gray-800 dark:text-gray-200">{description}</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (Recommended videos placeholder) */}
      <div className="hidden lg:block space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-2 cursor-pointer group">
            <div className="relative w-40 h-24 rounded-lg overflow-hidden">
              <img
                src={`https://picsum.photos/200/120?random=${i}`}
                alt="Thumbnail"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                10:0{i}
              </span>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2">
                Recommended Video {i}
              </h4>
              <p className="text-xs text-gray-500 mt-1">Channel Name</p>
              <p className="text-xs text-gray-500">50K views • 1 day ago</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
