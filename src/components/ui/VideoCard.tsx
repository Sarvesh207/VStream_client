import { EllipsisVertical } from "lucide-react";
import type { Video } from "../../api/types";
import { timeAgo } from "../../utils/timeAgo";

function VideoCard({ video }: { video: Video }) {
  const thumbnail =
    typeof video.thumbnail === "string" ? video.thumbnail : video.thumbnail?.url;
  const owner = typeof video.owner === "string" ? null : video.owner;
  const avatar = owner?.avatar?.url;
  const username = owner?.username;
  const fullName = owner?.fullName;

  return (
    <>
      <div className="relative mb-3 overflow-hidden bg-gray-900 rounded-xl aspect-video">
        <img
          src={thumbnail}
          alt={video?.title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-2 right-2 rounded bg-black/60 backdrop-blur-sm px-1.5 py-0.5 text-xs font-medium text-white shadow-md">
          {video?.duration ?? "0:00"}
        </div>
      </div>
      <div className="flex gap-3">
        <img
          src={avatar}
          alt={username}
          className="object-cover rounded-full w-9 h-9"
        />
        <div>
          <h3 className="mb-1 text-base font-semibold leading-tight text-white line-clamp-2 group-hover:text-blue-400">
            {video?.title}
          </h3>
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <span>{fullName || username}</span>
            {/* 
            // verified not in Video type yet
            {video?.verified && (
              <CircleCheck className="w-3.5 h-3.5 text-gray-400 fill-current" />
            )} 
            */}
          </div>
          <div className="text-sm text-gray-400">
            {video.views} views • {timeAgo(video?.createdAt)}
          </div>
        </div>
        <button className="self-start ml-auto opacity-0 group-hover:opacity-100">
          <EllipsisVertical className="w-5 h-5 text-gray-300" />
        </button>
      </div>
    </>
  );
}

export default VideoCard;
