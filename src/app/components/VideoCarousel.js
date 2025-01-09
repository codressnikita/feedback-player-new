import Slider from "react-slick";

export default function VideoCarousel({
  feedbacks,
  isPlaying,
  isMuted,
  handleError,
  sliderSettings,
}) {
  return (
    <div className="flex-grow flex items-center justify-center bg-gray-900">
      <Slider {...sliderSettings}>
        {feedbacks.map(({ name, rating, videoUrl }, index) => (
          <div
            key={index}
            className="relative w-full max-w-[80%] max-h-[80%] rounded-lg overflow-hidden border-4 border-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 shadow-2xl shadow-gray-800 p-2 bg-gradient-to-t from-gray-900 to-transparent"
          >
            {videoUrl ? (
              <video
                src={videoUrl}
                controls={false}
                autoPlay={isPlaying}
                muted={isMuted}
                onError={handleError}
                width="100%"
                height="100%"
                preload="metadata"
              />
            ) : (
              <div className="text-white">Loading video...</div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
}
