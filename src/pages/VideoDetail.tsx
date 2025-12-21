import React from 'react';
import { ThumbsUp, ThumbsDown, Share2, MoreHorizontal, User, Send, Bookmark } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import SaveToPlaylistModal from '../components/SaveToPlaylistModal';

export default function VideoDetail() {
  const { id } = useParams();
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        {/* Video Player Placeholder */}
        <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg relative">
            <div className="absolute inset-0 flex items-center justify-center text-white">
                <p>Video Player (ID: {id})</p>
            </div>
            {/* Emulate controls */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
               <div className="h-full w-1/3 bg-red-600"></div>
            </div>
        </div>

        {/* Video Info */}
        <div className="mt-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Building a Modern UI with React & Tailwind
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2 gap-4">
             <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <img 
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" 
                        alt="Channel Avatar" 
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">TechMaster</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">1.2M subscribers</p>
                    </div>
                </div>
                <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium dark:bg-white dark:text-black hover:opacity-80">
                    Subscribe
                </button>
             </div>

             <div className="flex items-center gap-2">
                <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full">
                    <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-l-full border-r border-gray-300 dark:border-gray-600">
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
          
          <div className="mt-4 bg-gray-100 dark:bg-gray-800 p-3 rounded-xl text-sm">
             <div className="font-semibold mb-1">120K views • 2 days ago</div>
             <p className="text-gray-800 dark:text-gray-200">
                In this video, we will learn how to build a modern user interface using React and Tailwind CSS. We'll cover component design, responsive layouts, and dark mode integration.
             </p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">245 Comments</h3>
            
            {/* Add Comment */}
            <div className="flex gap-4 mb-6">
                 <img 
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" 
                    alt="User" 
                    className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                    <input 
                        type="text" 
                        placeholder="Add a comment..." 
                        className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 focus:border-black dark:focus:border-white outline-none py-1 transition-colors text-black dark:text-white"
                    />
                    <div className="flex justify-end mt-2">
                        <button className="px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 mr-2 text-black dark:text-white">Cancel</button>
                         <button className="px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700">Comment</button>
                    </div>
                </div>
            </div>

            {/* Comment List */}
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4">
                         <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 font-bold shrink-0">
                            U{i}
                         </div>
                         <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-sm text-gray-900 dark:text-white">User {i}</span>
                                <span className="text-xs text-gray-500">2 hours ago</span>
                            </div>
                            <p className="text-sm text-gray-800 dark:text-gray-300">
                                This is a great tutorial! I really learned a lot about Tailwind's new features. Thanks for sharing.
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 dark:hover:text-gray-300">
                                    <ThumbsUp size={14} /> 12
                                </button>
                                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 dark:hover:text-gray-300">
                                    <ThumbsDown size={14} />
                                </button>
                                <button className="text-xs text-gray-500 font-medium hover:text-gray-800 dark:hover:text-gray-300">Reply</button>
                            </div>
                         </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Recommended Videos Sidebar */}
      <div className="hidden lg:block space-y-3">
         {[1, 2, 3, 4, 5, 6].map((i) => (
             <div key={i} className="flex gap-2 cursor-pointer group">
                <div className="relative w-40 h-24 shrink-0 rounded-lg overflow-hidden">
                     <img 
                        src={`https://images.unsplash.com/photo-${1600000000000 + i}?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80`}
                        alt="Thumbnail"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                     />
                     <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">10:0{i}</span>
                </div>
                <div>
                     <h4 className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        Top {i} Tips for React Developers in 2025
                     </h4>
                     <p className="text-xs text-gray-500 mt-1">Coding Channel</p>
                     <p className="text-xs text-gray-500">50K views • 1 day ago</p>
                </div>
             </div>
         ))}
      </div>
    </div>
  );
}
