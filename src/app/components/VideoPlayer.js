"use client";

import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ videoUrl, handleVideoEnd }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setIsPlaying(false); // Reset playback state when videoUrl changes
    setRetryCount(0); // Reset retry count
    const playTimeout = setTimeout(() => {
      setIsPlaying(true); // Start playing after a delay
    }, 2000); // Wait for 2 seconds before attempting playback

    return () => clearTimeout(playTimeout); // Cleanup timeout on unmount or videoUrl change
  }, [videoUrl]);

  const handleError = () => {
    if (retryCount < 100) {
      setRetryCount((prev) => prev + 1);
      const retryTimeout = setTimeout(() => {
        setIsPlaying(true); // Retry playback
      }, 2000); // Wait for 2 seconds between retries
      return () => clearTimeout(retryTimeout);
    } else {
      alert("Failed to play the video after 100 attempts.");
    }
  };

  if (!videoUrl) {
    return null; // Don't render anything if videoUrl is undefined
  }

  return (
    <ReactPlayer
      url={videoUrl}
      playing={isPlaying}
      controls={false}
      onEnded={handleVideoEnd}
      onError={handleError}
      width="100%"
      height="80%"
      style={{ maxHeight: "80%" }}
    />
  );
};

export default VideoPlayer;
