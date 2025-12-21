import React, { useState } from 'react';
import { updatePassword } from '../../api/settings';

export default function PasswordTab() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (formData.new !== formData.confirm) {
        alert("New passwords do not match.");
        return;
    }
    if (formData.new.length < 8) {
        alert("Password must be at least 8 characters.");
        return;
    }

    setLoading(true);
    try {
        await updatePassword(formData);
        alert("Password updated successfully!");
        setFormData({ current: '', new: '', confirm: '' });
    } catch (error) {
        alert("Failed to update password");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="border border-gray-800 rounded-xl p-6  animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between gap-4 border-b border-gray-800 pb-6 mb-6">
            <div className="md:w-1/3">
                <h3 className="font-semibold text-white">Password</h3>
                <p className="text-sm text-gray-400 mt-1">Please enter your current password to change your password.</p>
            </div>
            <div className="md:w-2/3 space-y-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase">Current password</label>
                    <input 
                        type="password"
                        name="current"
                        value={formData.current} 
                        onChange={handleChange}
                        className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-600 tracking-widest"
                        placeholder="••••••••"
                    />
                </div>
                <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-400 uppercase">New password</label>
                    <input 
                        type="password"
                        name="new"
                        value={formData.new} 
                        onChange={handleChange}
                        className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-600 tracking-widest"
                        placeholder="••••••••"
                    />
                    <p className="text-xs text-gray-500">Your new password must be more than 8 characters.</p>
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase">Confirm new password</label>
                    <input 
                        type="password"
                        name="confirm"
                        value={formData.confirm} 
                        onChange={handleChange}
                        className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-600 tracking-widest"
                        placeholder="••••••••"
                    />
                </div>
            </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
            <button className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">Cancel</button>
            <button 
                onClick={handleSubmit} 
                disabled={loading}
                className="px-4 py-2 bg-[#a855f7] hover:bg-[#9333ea] text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
                {loading ? 'Updating...' : 'Update password'}
            </button>
        </div>
    </div>
  );
}
