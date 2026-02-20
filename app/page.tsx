"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from './supabase'; 

export default function Home() {
  const [url, setUrl] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState<any[]>([]); // New state for the analytics table

  // 1. Function to fetch all links from Supabase
  const fetchLinks = async () => {
    const { data, error } = await supabase
      .from('links')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setLinks(data);
  };

  // 2. Run fetchLinks automatically when the page loads
  useEffect(() => {
    fetchLinks();
  }, []);

  const generateLink = async () => {
    if (!url) return alert("Please enter a URL first!");
    setLoading(true);
    const randomCode = Math.random().toString(36).substring(7);
    
    const { error } = await supabase
      .from('links') 
      .insert([{ original_url: url, short_code: randomCode }]);

    if (error) {
      alert("Error saving to database.");
    } else {
      const newLink = `${window.location.origin}/ref/${randomCode}`;
      setReferralLink(newLink);
      fetchLinks(); // Refresh the table automatically!
      setUrl(""); // Clear the input
    }
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-12 bg-gray-50 text-black">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl border border-gray-100 mb-8">
        <h1 className="text-3xl font-extrabold mb-2 text-blue-600">SimpleRef</h1>
        <p className="text-gray-500 mb-8 text-sm">Create and track your referral links instantly.</p>
        
        <div className="flex gap-2">
          <input 
            type="text" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste a long URL..." 
            className="flex-1 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button 
            onClick={generateLink}
            disabled={loading}
            className="bg-blue-600 text-white font-bold px-6 rounded-xl hover:bg-blue-700 disabled:bg-blue-300 transition-all"
          >
            {loading ? "..." : "Generate"}
          </button>
        </div>

        {referralLink && (
          <div className="mt-4 p-4 bg-green-50 border border-green-100 rounded-xl">
            <p className="text-xs text-green-800 font-bold mb-1">Link Generated!</p>
            <code className="text-sm text-green-700">{referralLink}</code>
          </div>
        )}
      </div>

      {/* 3. THE ANALYTICS TABLE */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gray-50 p-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-700">Your Analytics</h2>
        </div>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-gray-50">
              <th className="p-4 font-semibold">Short Code</th>
              <th className="p-4 font-semibold">Destination</th>
              <th className="p-4 font-semibold text-right">Clicks</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => (
              <tr key={link.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                <td className="p-4 font-mono text-blue-600">/ref/{link.short_code}</td>
                <td className="p-4 text-gray-600 truncate max-w-[200px]">{link.original_url}</td>
                <td className="p-4 text-right font-bold text-gray-900">{link.click_count || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}