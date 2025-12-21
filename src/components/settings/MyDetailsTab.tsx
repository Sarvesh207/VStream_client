import React, { useState } from 'react';
import { Upload, Camera, Bold, Italic, Link as LinkIcon, List, AlertCircle } from 'lucide-react';
import { updateProfile, uploadImage } from '../../api/settings';

export default function MyDetailsTab() {
  const [loading, setLoading] = useState(false);
  const [headerImage, setHeaderImage] = useState("https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80");
  const [avatarImage, setAvatarImage] = useState("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80");

  const [formData, setFormData] = useState({
    firstName: 'Yash',
    lastName: 'Mittal',
    email: 'YashMittal@yahoo.com',
    username: 'vidplay.com/olivia',
    description: "I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development.",
    timezone: 'PST UTC-08:00'
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'cover') => {
    if (e.target.files && e.target.files[0]) {
        try {
            const url = await uploadImage(e.target.files[0], type);
            if (type === 'cover') setHeaderImage(url);
            else setAvatarImage(url);
        } catch (error) {
            console.error("Upload failed", error);
        }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
        await updateProfile(formData);
        // Show success notification (mock)
        alert("Profile updated successfully!");
    } catch (error) {
        alert("Failed to update profile");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
        {/* Header Image Section */}
        <div className="relative group">
            <div className="w-full h-48 md:h-64 rounded-xl overflow-hidden bg-gradient-to-r from-pink-500 via-orange-400 to-cyan-400 relative">
                <img src={headerImage} alt="Cover" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <label className="cursor-pointer bg-white/20 hover:bg-white/30 backdrop-blur-md p-3 rounded-full transition-all text-white">
                        <Camera size={24} />
                        <input type="file" className="hidden" onChange={(e) => handleImageUpload(e, 'cover')} accept="image/*" />
                    </label>
                </div>
            </div>

            {/* Profile Avatar & Info Overlay */}
            <div className="flex bg-black -mt-12 mx-4 md:ml-8 relative z-10 p-4 rounded-xl items-start gap-4 max-w-2xl">
                 <div className="relative shrink-0">
                    <img src={avatarImage} alt="Avatar" className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-black object-cover" />
                    <label className="absolute bottom-0 right-0 bg-white text-black p-1.5 rounded-full cursor-pointer hover:bg-gray-200 transition-colors shadow-lg border-2 border-black">
                        <Upload size={14} />
                        <input type="file" className="hidden" onChange={(e) => handleImageUpload(e, 'avatar')} accept="image/*" />
                    </label>
                 </div>
                 <div className="flex-1 pt-2 md:pt-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-xl font-bold text-white">Yash Mittal</h2>
                            <p className="text-gray-400 text-sm">@YashMittal</p>
                        </div>
                        <button className="hidden md:block bg-[#a855f7] hover:bg-[#9333ea] text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
                            View profile
                        </button>
                    </div>
                 </div>
            </div>
        </div>

        {/* Personal Info Form */}
        <div className="border border-gray-800 rounded-xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4 border-b border-gray-800 pb-6">
                <div className="md:w-1/3">
                    <h3 className="font-semibold text-white">Personal info</h3>
                    <p className="text-sm text-gray-400 mt-1">Update your photo and personal details.</p>
                </div>
                <div className="md:w-2/3 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-400 uppercase">First name</label>
                            <input 
                                name="firstName"
                                value={formData.firstName} 
                                onChange={handleChange}
                                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-1.5">
                             <label className="text-xs font-semibold text-gray-400 uppercase">Last name</label>
                            <input 
                                name="lastName"
                                value={formData.lastName} 
                                onChange={handleChange}
                                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400 uppercase">Email address</label>
                        <div className="relative">
                            <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            <input 
                                name="email"
                                value={formData.email} 
                                onChange={handleChange}
                                className="w-full bg-black border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Section */}
             <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="md:w-1/3">
                    <h3 className="font-semibold text-white">Profile</h3>
                    <p className="text-sm text-gray-400 mt-1">Update your portfolio and bio.</p>
                </div>
                <div className="md:w-2/3 space-y-4">
                     <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400 uppercase">Username</label>
                        <div className="flex rounded-lg overflow-hidden border border-gray-700 focus-within:ring-1 focus-within:ring-purple-500">
                            <span className="bg-gray-900 text-gray-400 px-3 py-2.5 text-sm border-r border-gray-700 select-none">vidplay.com/</span>
                            <input 
                                name="username"
                                value={formData.username.replace('vidplay.com/', '')} 
                                onChange={handleChange}
                                className="flex-1 bg-black px-3 py-2.5 text-white outline-none"
                            />
                        </div>
                    </div>

                     <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400 uppercase">Description</label>
                        <textarea 
                            name="description"
                            value={formData.description} 
                            onChange={handleChange}
                            rows={4}
                            className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                        />
                        <div className="flex justify-between items-center text-xs text-gray-500 pt-1">
                            <span className="flex gap-3">
                                <button><Bold size={14} /></button>
                                <button><Italic size={14} /></button>
                                <button><LinkIcon size={14} /></button>
                                <button><List size={14} /></button>
                            </span>
                            <span>275 characters left</span>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                         <label className="text-xs font-semibold text-gray-400 uppercase">Timezone</label>
                         <select 
                            name="timezone"
                            value={formData.timezone}
                            onChange={handleChange}
                            className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-purple-500 outline-none transition-all appearance-none"
                         >
                            <option>PST UTC-08:00</option>
                            <option>EST UTC-05:00</option>
                            <option>UTC +00:00</option>
                         </select>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                <button className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">Cancel</button>
                <button 
                    onClick={handleSubmit} 
                    disabled={loading}
                    className="px-4 py-2 bg-[#a855f7] hover:bg-[#9333ea] text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Save changes'}
                </button>
            </div>
        </div>
    </div>
  );
}

function MailIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    )
}
