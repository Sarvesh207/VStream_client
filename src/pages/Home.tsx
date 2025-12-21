import React from 'react';
import { EllipsisVertical, CircleCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = ["All", "Gaming", "Music", "Live", "Computers", "Programming", "Podcasts", "News", "Sports", "Fashion", "Learning"];

const videos = [
    {
        id: 1,
        title: "Building a Multi-Million Dollar Developer Product | DhiWise",
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
        channel: "Arnau Ros",
        views: "100K Views",
        timestamp: "18 hours ago",
        duration: "14:20",
        verified: true,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
        id: 2,
        title: "How to Learn React | A React Roadmap 2024",
        thumbnail: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
        channel: "Yash Mittal",
        views: "240K Views",
        timestamp: "2 days ago",
        duration: "10:05",
        verified: false,
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
        id: 3,
        title: "Deno Just Got 2M npm Packages",
        thumbnail: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-1.2.1&auto=format&fit=crop&w=1506&q=80",
        channel: "TechDaily",
        views: "50K Views",
        timestamp: "5 hours ago",
        duration: "8:45",
        verified: true,
        avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
        id: 4,
        title: "Best Way to Learn Socket IO | Complex Chat App",
        thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
        channel: "CodeMasters",
        views: "890K Views",
        timestamp: "1 week ago",
        duration: "25:30",
        verified: true,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
        id: 5,
        title: "Google's IDX Unveiled: Exclusive First Look",
        thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
        channel: "Google Developers",
        views: "1.5M Views",
        timestamp: "3 days ago",
        duration: "12:15",
        verified: true,
        avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
        id: 6,
        title: "Terraform, Fig & FreeAPI | Updates",
        thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1528&q=80",
        channel: "DevOps Central",
        views: "34K Views",
        timestamp: "1 day ago",
        duration: "18:00",
        verified: false,
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
        id: 7,
        title: "Creating Cyberpunk 2077 Effects in Unreal",
        thumbnail: "https://images.unsplash.com/photo-1614728853970-15cf96a66b96?ixlib=rb-1.2.1&auto=format&fit=crop&w=1374&q=80",
        channel: "GameDev Guide",
        views: "200K Views",
        timestamp: "2 weeks ago",
        duration: "45:10",
        verified: true,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
        id: 8,
        title: "Flutter Dart Case Study by Engineering Team",
        thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1374&q=80",
        channel: "Flutter",
        views: "45K Views",
        timestamp: "4 days ago",
        duration: "22:45",
        verified: true,
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    }
];

export default function Home() {
    return (
        <div className="flex flex-col gap-6">
            {/* Categories */}
            <div className="flex gap-3 pb-2 overflow-x-auto scrollbar-hide">
                {categories.map((cat, i) => (
                    <button 
                        key={i} 
                        className={`px-4 py-1.5 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${
                            i === 0 
                            ? 'bg-white text-black' 
                            : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 gap-y-8 gap-x-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {videos.map((video) => (
                    <Link to={`/video/${video.id}`} key={video.id} className="group">
                        <div className="relative mb-3 overflow-hidden bg-gray-900 rounded-xl aspect-video">
                            <img 
                                src={video.thumbnail} 
                                alt={video.title} 
                                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute px-1.5 py-0.5 text-xs font-medium text-white bg-black bg-opacity-80 rounded bottom-2 right-2">
                                {video.duration}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <img 
                                src={video.avatar} 
                                alt={video.channel} 
                                className="object-cover rounded-full w-9 h-9"
                            />
                            <div>
                                <h3 className="mb-1 text-base font-semibold leading-tight text-white line-clamp-2 group-hover:text-blue-400">
                                    {video.title}
                                </h3>
                                <div className="flex items-center gap-1 text-sm text-gray-400">
                                    <span>{video.channel}</span>
                                    {video.verified && <CircleCheck className="w-3.5 h-3.5 text-gray-400 fill-current" />}
                                </div>
                                <div className="text-sm text-gray-400">
                                    {video.views} • {video.timestamp}
                                </div>
                            </div>
                            <button className="self-start ml-auto opacity-0 group-hover:opacity-100">
                                <EllipsisVertical className="w-5 h-5 text-gray-300" />
                            </button>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
