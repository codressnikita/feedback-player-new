"use client";

import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { Volume2, VolumeX, Pause, Play, RefreshCcw } from "lucide-react"; // Added icons for Play, Pause, and Reload

export default function Page() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  // Fetch feedbacks from the server
  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(
        "https://feedback-server-rose.vercel.app/feedback"
      );
      setFeedbacks(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch videos:",
        error.response?.data || error.message
      );
    }
  };

  // Move to the next video on end
  const handleVideoEnd = () => {
    setRetryCount(0); // Reset retries for the next video
    setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbacks.length);
  };

  const handleError = () => {
    if (retryCount < 100) {
      setRetryCount((prev) => prev + 1);
      setTimeout(() => setIsPlaying(true), 2000); // Retry after 2 seconds
    } else {
      alert("Failed to play the video after 100 attempts.");
    }
  };

  // Start playback after video URL changes or after retry
  useEffect(() => {
    setIsPlaying(false); // Reset playing state
    if (feedbacks[currentIndex]?.videoUrl) {
      const playTimeout = setTimeout(() => setIsPlaying(true), 2000);
      return () => clearTimeout(playTimeout); // Clean up timeout
    }
  }, [feedbacks, currentIndex]);

  // Fetch feedbacks initially and periodically
  useEffect(() => {
    fetchFeedbacks();
    const interval = setInterval(fetchFeedbacks, 15 * 60 * 1000); // Refresh every 15 minute
    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  const { name, rating, videoUrl } = feedbacks[currentIndex] || {};

  // Render stars for ratings
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <span
          key={index}
          className={`text-xl ${
            index < rating ? "text-yellow-500" : "text-gray-400"
          }`}
        >
          ★
        </span>
      ));
  };

  return (
    <div className="flex flex-col h-[100vh] bg-gradient-to-b from-gray-800 via-gray-900 to-black">
      <div className="h-[100px] w-full flex items-center justify-between px-4 bg-gray-800 text-white">
        {/* Name and Video Count */}
        <div className="text-lg font-bold">
          {name || "Loading..."}{" "}
          <span className="text-gray-500 text-base text-light">
            ({currentIndex + 1}/{feedbacks.length})
          </span>
        </div>

        {/* Centered Stars */}
        <div className="flex flex-grow justify-center items-center">
          {rating ? renderStars(rating) : "Fetching ratings..."}
        </div>

        {/* Buttons Stack to the Right */}
        <div className="flex space-x-2">
          {/* Volume Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full"
            aria-label="Toggle Volume"
          >
            {isMuted ? (
              <VolumeX className="text-white w-6 h-6" />
            ) : (
              <Volume2 className="text-white w-6 h-6" />
            )}
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="text-white w-6 h-6" />
            ) : (
              <Play className="text-white w-6 h-6" />
            )}
          </button>

          {/* Reload Button */}
          <button
            onClick={fetchFeedbacks}
            className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full"
            aria-label="Reload Video"
          >
            <RefreshCcw className="text-white w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Video Player */}
      <div className="flex-grow flex items-center justify-center bg-gray-900">
        {videoUrl ? (
          <div className="relative max-h-[70%] max-w-[70%] rounded-lg overflow-hidden border-4 border-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 shadow-2xl shadow-gray-800 p-2 bg-gradient-to-t from-gray-900 to-transparent">
            <ReactPlayer
              url={videoUrl}
              playing={isPlaying}
              muted={isMuted}
              controls={false}
              onEnded={handleVideoEnd}
              onError={handleError}
              width="100%"
              height="100%"
              preload="metadata"
            />
          </div>
        ) : (
          <div className="text-white">Loading video...</div>
        )}
      </div>
    </div>
  );
}
