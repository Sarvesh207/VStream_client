import React, { useState } from 'react';
import { Edit2, Grid, List, CheckCircle, Play, Plus } from 'lucide-react';
import UploadVideoModal from '../components/UploadVideoModal';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('Videos');
  const [activeFilter, setActiveFilter] = useState('Previously uploaded');

  const tabs = ['Videos', 'Playlist', 'Tweets', 'Following'];
  const videoFilters = ['Previously uploaded', 'Oldest', 'Item'];

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const [videos, setVideos] = useState<any[]>([]); // Default to empty to show the requested UI
  /* 
  // Dummy data if needed later
  const dummyVideos = [
    {
      id: 1,
      title: "How to learn react | A React Roadmap",
      views: "100K Views",
      time: "18 hours ago",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    // ...
  ];
  */

  return (
    <div className="min-h-screen bg-black text-white w-full">
      {/* Banner */}
      <div className="w-full h-32 md:h-48 lg:h-64 bg-gradient-to-r from-pink-500 via-orange-400 to-cyan-400"></div>

      {/* Profile Header Info */}
      <div className="px-4 md:px-8 -mt-10 md:-mt-16 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6">
            
            {/* Avatar */}
            <div className="relative group">
                <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                    alt="Profile" 
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-black object-cover"
                />
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left mt-2 md:mt-0">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <h1 className="text-2xl md:text-3xl font-bold">Yash Mittal</h1>
                    <CheckCircle className="w-5 h-5 text-blue-500 hidden md:block" fill="currentColor" color="white" />
                </div>
                <p className="text-gray-400 mt-1">@YashMittal</p>
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-400 mt-1">
                    <span>600K Subscribers</span>
                    <span>•</span>
                    <span>220 Subscribed</span>
                </div>
            </div>

            {/* Edit Button */}
            <div className="mt-4 md:mt-0 mb-4 md:mb-6 shrink-0">
                <button className="flex items-center gap-2 px-6 py-2 bg-[#a855f7] hover:bg-[#9333ea] text-white font-medium rounded-lg transition-colors">
                    <Edit2 size={16} />
                    <span>Edit</span>
                </button>
            </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-800 px-4 md:px-8">
          <div className="flex items-center gap-6 md:gap-10 overflow-x-auto no-scrollbar">
              {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm md:text-base font-medium whitespace-nowrap relative px-2 transition-colors ${
                        activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                      {tab}
                      {activeTab === tab && (
                          <div className="absolute bottom-0 left-0 w-full h-1 bg-white rounded-t-full"></div>
                      )}
                  </button>
              ))}
          </div>
      </div>

      {/* Tab Content for Videos */}
      {activeTab === 'Videos' && (
          <div className="p-4 md:p-8">
            {/* Filters */}
            <div className="flex items-center gap-3 mb-6 overflow-x-auto no-scrollbar pb-2">
                {videoFilters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                            activeFilter === filter 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>


            {/* Empty State */}
            {videos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-4">
                        <Play className="w-8 h-8 text-purple-500 fill-current" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No videos uploaded</h3>
                    <p className="text-gray-400 max-w-sm mb-8">
                        Click to upload new video. You have yet to upload a video.
                    </p>
                    <button 
                        onClick={() => setIsUploadModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-[#a855f7] hover:bg-[#9333ea] text-white font-medium rounded-lg transition-colors"
                    >
                        <Plus size={20} />
                        <span>New video</span>
                    </button>
                </div>
            ) : (
                /* Video Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {videos.map((video) => (
                        <div key={video.id} className="group cursor-pointer">
                            <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                                <img 
                                    src={video.thumbnail} 
                                    alt={video.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                            </div>
                            <h3 className="font-semibold text-white leading-snug mb-1 line-clamp-2 group-hover:text-purple-400 transition-colors">
                                {video.title}
                            </h3>
                            <div className="text-xs text-gray-400">
                               {video.views} • {video.time}
                            </div>
                        </div>
                    ))}
                </div>
            )}
          </div>
      )}

      {/* Upload Modal */}
      <UploadVideoModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        onUploadSuccess={() => {
            // For demo purposes, we can add a dummy video just to show it works, 
            // or keep it empty. The user said "api integration i will do letter",
            // so we might not need to update the list yet.
            // But usually seeing a result is nice. I'll leave it empty unless requested.
            // Actually, let's refresh the list or something.
            console.log("Upload Success");
        }}
      />

      {/* Placeholder for other tabs */}
      {activeTab !== 'Videos' && (
          <div className="p-12 text-center text-gray-500">
              Content for {activeTab} tab
          </div>
      )}
    </div>
  );
}
