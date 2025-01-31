import React from 'react';
import { Heart, MessageSquare, Bookmark, Play } from 'lucide-react';

const ContentCard = ({ type, title, description, likes, comments, imageUrl }) => {
  return (
    <div className="w-[340px] rounded-3xl bg-white shadow-sm">
      <div className="relative">
        {/* Image container with proper aspect ratio */}
        <div className="aspect-[4/3] rounded-t-3xl overflow-hidden">
          <img 
            src={imageUrl || "/api/placeholder/400/300"} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Type Badge */}
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-[#f5e6d3] text-[#996b3d]">
          {type}
        </span>
        
        {/* Play Button */}
        <button className="absolute top-[40%] left-6 w-11 h-11 bg-white/90 rounded-full flex items-center justify-center">
          <Play className="w-6 h-6 text-blue-600 ml-1" />
        </button>
        
        {/* Audio Waveform */}
        <div className="absolute bottom-6 left-20 right-6">
          <div className="w-full h-8 flex items-center space-x-0.5">
            {[...Array(32)].map((_, i) => (
              <div 
                key={i}
                className="flex-1 bg-white/90 rounded-full"
                style={{ height: `${Math.random() * 100}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-base mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4">{description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-6">
            <button className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-500">{likes}</span>
            </button>
            <button className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-500">{comments}</span>
            </button>
          </div>
          <button>
            <Bookmark className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;