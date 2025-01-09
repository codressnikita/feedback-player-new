"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Volume2, VolumeX, Pause, Play, RefreshCcw } from "lucide-react";

export default function FeedbackCarousel() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(45);

  // Autoplay with muted by default for browser autoplay policies
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  // Track retries if a video fails
  const [retryCount, setRetryCount] = useState(0);

  const videoRef = useRef(null);
  const nextVideoRef = useRef(null);

  /**
   * Fetch feedbacks from the server, refreshing every 15 minutes.
   * Keep currentIndex if new data length is >= currentIndex.
   */
  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(
        "https://feedback-server-rose.vercel.app/feedback"
      );
      const newFeedbacks = response.data || [];

      if (newFeedbacks.length > 0) {
        // Clamp the currentIndex to the new data length
        setCurrentIndex((prevIndex) => prevIndex % newFeedbacks.length);
      } else {
        setCurrentIndex(0);
      }
      setFeedbacks(newFeedbacks);
    } catch (error) {
      console.error(
        "Failed to fetch videos:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchFeedbacks();
    const interval = setInterval(fetchFeedbacks, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  /**
   * Move to the next video, loop to the first if we're at the end.
   */
  const handleVideoEnd = () => {
    setRetryCount(0);
    setCurrentIndex((prev) => (prev + 1) % feedbacks.length);
  };

  /**
   * Retry a few times on error, then alert.
   */
  const handleVideoError = () => {
    if (retryCount < 5) {
      console.log("Retrying video playback...");
      setRetryCount((prev) => prev + 1);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.load();
          videoRef.current.play().catch(() => {});
        }
      }, 2000);
    } else {
      alert("Failed to play the video after multiple attempts.");
    }
  };

  /**
   * Preload the next video for smoother playback.
   */
  useEffect(() => {
    if (feedbacks.length > 0) {
      const nextIndex = (currentIndex + 1) % feedbacks.length;
      const nextUrl = feedbacks[nextIndex]?.videoUrl;
      if (nextVideoRef.current && nextUrl) {
        nextVideoRef.current.src = nextUrl;
        nextVideoRef.current.load();
      }
    }
  }, [feedbacks, currentIndex]);

  /**
   * Control isPlaying (play/pause).
   */
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          console.log("Autoplay might be blocked — user gesture needed");
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  /**
   * Renders stars for the rating.
   */
  const renderStars = (rating = 0) => {
    return Array(5)
      .fill(null)
      .map((_, idx) => (
        <span
          key={idx}
          className={`text-3xl ${
            idx < rating ? "text-yellow-400" : "text-gray-500"
          }`}
        >
          ★
        </span>
      ));
  };

  // If we have no feedback data, just show placeholders
  const { name, rating, videoUrl } = feedbacks[currentIndex] || {};

  return (
    <div className="w-screen h-screen flex flex-col bg-black text-white">
      {/* TOP SECTION (Name & Index in one line, plus rating below or inline) */}
      <div className="flex-none h-1/5 flex flex-col items-center justify-center p-4">
        {/* First line: Name (bold) and Index/Total (secondary) */}
        <div className="flex items-baseline space-x-4">
          <span className="text-4xl font-bold">{name || "Loading..."}</span>
          <span className="text-xl text-gray-400">
            (
            {feedbacks.length > 0
              ? `${currentIndex + 1} / ${feedbacks.length}`
              : "0 / 0"}
            )
          </span>
        </div>

        {/* Second line: Rating */}
        {rating ? (
          <div className="flex space-x-1 mt-2">{renderStars(rating)}</div>
        ) : (
          <div className="text-xl text-gray-500 mt-2">Fetching rating...</div>
        )}
      </div>

      {/* MIDDLE SECTION (Video fills entire area) */}
      <div className="flex-1 relative">
        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            muted={isMuted}
            autoPlay
            playsInline
            onEnded={handleVideoEnd}
            onError={handleVideoError}
            // Covers full width and height, cropping if aspect doesn't match
            className="absolute inset-0 w-full h-full object-fit bg-black"
            preload="auto"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-2xl">
            Loading video...
          </div>
        )}
      </div>

      {/* BOTTOM SECTION (Control Buttons) */}
      <div className="flex-none h-1/5 flex items-center justify-center space-x-8">
        {/* Mute/Unmute */}
        <button
          onClick={() => setIsMuted((prev) => !prev)}
          className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center"
          title="Toggle Mute"
        >
          {isMuted ? <VolumeX size={36} /> : <Volume2 size={36} />}
        </button>

        {/* Play/Pause */}
        <button
          onClick={() => setIsPlaying((prev) => !prev)}
          className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center"
          title="Play/Pause"
        >
          {isPlaying ? <Pause size={36} /> : <Play size={36} />}
        </button>

        {/* Refresh API */}
        <button
          onClick={fetchFeedbacks}
          className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center"
          title="Refresh API"
        >
          <RefreshCcw size={36} />
        </button>
      </div>

      {/* Hidden Preload Video */}
      <video ref={nextVideoRef} style={{ display: "none" }} preload="auto" />
    </div>
  );
}
