"use client";

import { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";

const VideoScroller = ({ feedbacks }) => {
  const [currentIndex, setCurrentIndex] = useState(3);

  const handleVideoEnd = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbacks.length);
  };

  const { name, rating, videoUrl } = feedbacks[currentIndex] || {};

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <span
          key={index}
          className={index < rating ? "text-yellow-500" : "text-gray-400"}
        >
          ★
        </span>
      ));
  };

  console.log(currentIndex, feedbacks, name, rating, videoUrl);

  return (
    <div className="overflow-hidden h-[calc(100vh)] flex flex-col items-center justify-center bg-gray-900 text-white">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">{name}</h1>
        <div className="flex justify-center">{renderStars(rating)}</div>
      </div>

      {/* Video */}
      {/* <video
        key={videoUrl} // Ensures the video reloads when the URL changes
        src={videoUrl}
        autoPlay
        onEnded={handleVideoEnd}
        className="w-full h-auto max-h-[80%]"
      /> */}
      <VideoPlayer videoUrl={videoUrl} handleVideoEnd={handleVideoEnd} />
    </div>
  );
};

export default VideoScroller;
