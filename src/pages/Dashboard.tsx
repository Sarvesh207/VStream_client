import {
  Edit2,
  Eye,
  Heart,
  Plus,
  Trash2,
  Users
} from "lucide-react";
import { useState } from "react";
import UploadVideoModal from "../components/UploadVideoModal";

interface DashboardVideo {
  id: string;
  title: string;
  thumbnail: string;
  status: "Published" | "Unpublished";
  likes: number;
  dislikes: number;
  dateUploaded: string;
}

export default function Dashboard() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [videos, setVideos] = useState<DashboardVideo[]>([
    {
      id: "1",
      title: "Cardi B - WAP feat. Megan Thee Stallion [Official Video]",
      thumbnail:
        "https://images.unsplash.com/photo-1619983081593-e431bd73ea91?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      status: "Published",
      likes: 367,
      dislikes: 4767,
      dateUploaded: "9/23/16",
    },
    {
      id: "2",
      title: "H.E.R. - Damage (Official Video)",
      thumbnail:
        "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      status: "Unpublished",
      likes: 367,
      dislikes: 4767,
      dateUploaded: "8/15/17",
    },
    {
      id: "3",
      title: "Queen - Bohemian Rhapsody (Official Video Remastered)",
      thumbnail:
        "https://images.unsplash.com/photo-1516280440614-6697288d5d38?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      status: "Published",
      likes: 367,
      dislikes: 4767,
      dateUploaded: "5/27/15",
    },
    {
      id: "4",
      title: "88RISING - Midsummer Madness ft. Joji, Rich Brian",
      thumbnail:
        "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      status: "Published",
      likes: 367,
      dislikes: 4767,
      dateUploaded: "9/4/12",
    },
    {
      id: "5",
      title: "Ariana Grande - positions",
      thumbnail:
        "https://images.unsplash.com/photo-1514525253440-b393452e3383?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      status: "Unpublished",
      likes: 367,
      dislikes: 4767,
      dateUploaded: "12/4/17",
    },
  ]);

  const toggleStatus = (id: string) => {
    setVideos(
      videos.map((v) =>
        v.id === id
          ? {
              ...v,
              status: v.status === "Published" ? "Unpublished" : "Published",
            }
          : v
      )
    );
  };

  const deleteVideo = (id: string) => {
    if (confirm("Are you sure you want to delete this video?")) {
      setVideos(videos.filter((v) => v.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-1">Welcome back, Olivia</h1>
          <p className="text-gray-400 text-sm">
            Track, manage and forecast your customers and orders.
          </p>
        </div>
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center gap-2 bg-[#a855f7] hover:bg-[#9333ea] text-white px-5 py-2.5 rounded-lg font-medium transition-colors w-fit"
        >
          <Plus size={20} />
          Upload Video
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Total Views */}
        <div className="bg-black border border-gray-800 p-6 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
            <Eye className="text-purple-400 w-5 h-5" />
          </div>
          <p className="text-gray-400 text-sm mb-1">Total Views</p>
          <h2 className="text-3xl font-bold">221,234</h2>
        </div>

        {/* Total Followers */}
        <div className="bg-black border border-gray-800 p-6 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
            <Users className="text-blue-400 w-5 h-5" />
          </div>
          <p className="text-gray-400 text-sm mb-1">Total Followers</p>
          <h2 className="text-3xl font-bold">4,053</h2>
        </div>

        {/* Total Likes */}
        <div className="bg-black border border-gray-800 p-6 rounded-xl relative overflow-hidden">
          <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center mb-4">
            <Heart className="text-pink-400 w-5 h-5" />
          </div>
          <p className="text-gray-400 text-sm mb-1">Total Likes</p>
          <h2 className="text-3xl font-bold">63,021</h2>

          {/* Decorative r circle from image */}
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-8 border-gray-800/50 flex items-center justify-center">
            <span className="text-gray-700 font-bold text-4xl">r</span>
          </div>
        </div>
      </div>

      {/* Video Table */}
      <div className="border border-gray-800 rounded-xl overflow-hidden bg-black">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Uploaded</th>
                <th className="p-4 font-medium">Rating</th>
                <th className="p-4 font-medium">Date uploaded</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {videos.map((video) => (
                <tr
                  key={video.id}
                  className="group hover:bg-gray-900/50 transition-colors"
                >
                  {/* Toggle Switch Column */}
                  <td className="p-4">
                    <button
                      onClick={() => toggleStatus(video.id)}
                      className={`w-11 h-6 rounded-full relative transition-colors duration-200 ease-in-out ${
                        video.status === "Published"
                          ? "bg-purple-600"
                          : "bg-gray-600"
                      }`}
                    >
                      <span
                        className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                          video.status === "Published"
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </td>

                  {/* Status Badge Column */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs border ${
                        video.status === "Published"
                          ? "border-green-500/30 text-green-400 bg-green-500/10"
                          : "border-orange-500/30 text-orange-400 bg-orange-500/10"
                      }`}
                    >
                      {video.status}
                    </span>
                  </td>

                  {/* Uploaded Video Info */}
                  <td className="p-4">
                    <div className="flex items-center gap-3 min-w-[240px]">
                      <img
                        src={video.thumbnail}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium text-white truncate max-w-[200px]">
                        {video.title}
                      </span>
                    </div>
                  </td>

                  {/* Rating */}
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-xs bg-gray-900 w-fit px-2 py-1 rounded">
                      <span className="text-green-400">
                        {video.likes} likes
                      </span>
                      <span className="text-gray-600">|</span>
                      <span className="text-red-400">
                        {video.dislikes} Dislikes
                      </span>
                    </div>
                  </td>

                  {/* Date Uploaded */}
                  <td className="p-4 text-sm text-gray-400 whitespace-nowrap">
                    {video.dateUploaded}
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => deleteVideo(video.id)}
                        className="text-gray-500 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button className="text-gray-500 hover:text-white transition-colors p-1">
                        <Edit2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UploadVideoModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
}
