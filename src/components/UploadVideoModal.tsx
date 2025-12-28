import React, { useState, useRef } from 'react';
import { X, Upload, Image as ImageIcon, Film } from 'lucide-react';
import { publishVideo } from "../api/video.api";

interface UploadVideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUploadSuccess?: () => void;
}

export default function UploadVideoModal({ isOpen, onClose, onUploadSuccess }: UploadVideoModalProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    // Refs for hidden file inputs
    const videoInputRef = useRef<HTMLInputElement>(null);
    const thumbnailInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setVideoFile(e.target.files[0]);
        }
    };

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setThumbnailFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !videoFile || !thumbnailFile) return;

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("videoFile", videoFile);
            formData.append("thumbnail", thumbnailFile);

            await publishVideo(formData);

            // Reset and close
            setTitle('');
            setDescription('');
            setVideoFile(null);
            setThumbnailFile(null);
            if (onUploadSuccess) onUploadSuccess();
            onClose();
        } catch (error) {
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={!isUploading ? onClose : undefined}></div>

            <div className="bg-gray-900 w-full max-w-lg rounded-2xl p-6 shadow-2xl ring-1 ring-white/10 relative z-10 flex flex-col max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white text-xl font-bold">Upload Video</h2>
                    <button
                        onClick={onClose}
                        disabled={isUploading}
                        className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Video File Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Video File</label>
                        <div
                            onClick={() => videoInputRef.current?.click()}
                            className={`
                        border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors
                        ${videoFile ? 'border-purple-500 bg-purple-500/10' : 'border-gray-700 hover:border-gray-500 bg-black/40'}
                    `}
                        >
                            <input
                                type="file"
                                ref={videoInputRef}
                                onChange={handleVideoChange}
                                accept="video/*"
                                className="hidden"
                            />
                            {videoFile ? (
                                <div className="text-center">
                                    <Film className="w-10 h-10 text-purple-400 mx-auto mb-2" />
                                    <p className="text-sm text-white font-medium truncate max-w-[200px]">{videoFile.name}</p>
                                    <p className="text-xs text-green-400 mt-1">Selected</p>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <Upload className="w-10 h-10 text-gray-500 mx-auto mb-2" />
                                    <p className="text-sm text-gray-400">Click to upload video</p>
                                    <p className="text-xs text-gray-600 mt-1">MP4, WebM (Max 500MB)</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Thumbnail File Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Thumbnail</label>
                        <div
                            onClick={() => thumbnailInputRef.current?.click()}
                            className={`
                        border-2 border-dashed rounded-xl p-4 flex items-center justify-center cursor-pointer transition-colors
                        ${thumbnailFile ? 'border-purple-500 bg-purple-500/10' : 'border-gray-700 hover:border-gray-500 bg-black/40'}
                    `}
                        >
                            <input
                                type="file"
                                ref={thumbnailInputRef}
                                onChange={handleThumbnailChange}
                                accept="image/*"
                                className="hidden"
                            />
                            {thumbnailFile ? (
                                <div className="flex items-center gap-3">
                                    <ImageIcon className="w-5 h-5 text-purple-400" />
                                    <span className="text-sm text-white truncate">{thumbnailFile.name}</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-gray-400">
                                    <ImageIcon className="w-5 h-5" />
                                    <span className="text-sm">Upload Thumbnail</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Video title"
                            className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-600"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Tell viewers about your video"
                            rows={4}
                            className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-600 resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isUploading || !title || !videoFile || !thumbnailFile}
                        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-800 disabled:text-gray-500 text-white font-bold py-3 rounded-xl text-sm transition-all"
                    >
                        {isUploading ? 'Uploading...' : 'Upload Video'}
                    </button>

                </form>
            </div>
        </div>
    );
}
