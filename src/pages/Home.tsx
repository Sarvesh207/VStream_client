import { Link } from "react-router-dom";
import VideoCard from "../components/ui/VideoCard";
import useFeed from "../hooks/useFeed";
import type { Video } from "../api/types";

const categories = [
  "All",
  "Gaming",
  "Music",
  "Live",
  "Computers",
  "Programming",
  "Podcasts",
  "News",
  "Sports",
  "Fashion",
  "Learning",
];

export default function Home() {
  const { data, isLoading } = useFeed();

  console.log("VIdeos Data", data);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const videos = data?.pages.flatMap((page) => page.videos) ?? [];

  return (
    <div className="flex flex-col gap-6">
      {/* Categories */}
      <div className="flex gap-3 pb-2 overflow-x-auto scrollbar-hide">
        {categories.map((cat, i) => (
          <button
            key={i}
            className={`px-4 py-1.5 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${i === 0
                ? "bg-white text-black"
                : "bg-gray-900 text-gray-300 hover:bg-gray-800"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 gap-y-8 gap-x-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {videos &&
          videos.map((video: Video) => (
            <Link to={`/video/${video._id}`} key={video._id} className="group">
              <VideoCard video={video} />
            </Link>
          ))}
      </div>
    </div>
  );
}
