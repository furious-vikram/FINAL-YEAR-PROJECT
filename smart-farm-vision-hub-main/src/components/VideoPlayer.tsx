import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

interface VideoPlayerProps {
  videoUrl?: string;
  posterUrl?: string;
  title?: string;
}

const VideoPlayer = ({ 
  videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  posterUrl,
  title = "Smart Agriculture Demo Video"
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const handlePlayPause = () => {
    const video = document.getElementById('demo-video') as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMute = () => {
    const video = document.getElementById('demo-video') as HTMLVideoElement;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    const video = document.getElementById('demo-video') as HTMLVideoElement;
    if (video && video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-black rounded-lg overflow-hidden shadow-2xl">
      {/* Video Element */}
      <div 
        className="relative aspect-video group"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          id="demo-video"
          className="w-full h-full object-cover"
          poster={posterUrl}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onClick={handlePlayPause}
        >
          <source src={videoUrl} type="video/mp4" />
          <track kind="captions" srcLang="en" label="English" />
          Your browser does not support the video tag.
        </video>
        
        {/* Play Button Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Button
              onClick={handlePlayPause}
              size="lg"
              className="w-20 h-20 rounded-full bg-white/90 hover:bg-white text-primary hover:scale-110 transition-all duration-300"
            >
              <Play className="h-8 w-8 ml-1" />
            </Button>
          </div>
        )}
        
        {/* Controls */}
        {showControls && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  onClick={handlePlayPause}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                
                <Button
                  onClick={handleMute}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
              
              <Button
                onClick={handleFullscreen}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Video Title */}
      <div className="p-4 bg-white">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Learn how Smart Agriculture transforms farming operations
        </p>
      </div>
    </div>
  );
};

export default VideoPlayer;