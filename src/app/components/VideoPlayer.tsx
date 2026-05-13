import { motion } from "motion/react";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Radio } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import Hls from "hls.js";
import type { Match } from "@/types";
import { TeamLogo } from "./TeamLogo";

// Use relative path — in production the API domain serves HLS
const HLS_URL = "/hls/stream.m3u8";

export function VideoPlayer({ match }: { match?: Match }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // start muted for autoplay
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // Build the HLS source URL — try API server first, fallback to same origin
  const getHlsUrl = useCallback(() => {
    // In production, nginx serves /hls/ on the same domain
    // In dev, proxy through Express API server
    if (window.location.hostname === "localhost") {
      return `http://localhost:3001${HLS_URL}`;
    }
    return HLS_URL; // same-origin — nginx serves it
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hlsUrl = getHlsUrl();

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
      });
      hlsRef.current = hls;
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.muted = true; // required for autoplay
        video.play().catch(() => {});
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });

      return () => {
        hls.destroy();
        hlsRef.current = null;
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari native HLS
      video.src = hlsUrl;
      video.addEventListener("loadedmetadata", () => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }, [getHlsUrl]);

  // Time update handler
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
        setCurrentTime(formatTime(video.currentTime));
        setDuration(formatTime(video.duration));
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      await el.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 3000);
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full aspect-video bg-black rounded-xl overflow-hidden group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* HLS Video Element — loop enabled */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain bg-black"
        playsInline
        loop
        autoPlay
        muted
      />

      {/* Live badge + minute */}
      <div className={`absolute top-4 left-4 flex items-center gap-2 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-70"}`}>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-live/90 backdrop-blur-sm rounded-full">
          <Radio className="w-3 h-3 text-white animate-pulse" />
          <span className="text-xs text-white font-semibold">TRỰC TIẾP</span>
        </div>
        <div className="px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full text-xs text-white font-semibold">
          {match?.minute || "—"}
        </div>
      </div>

      {/* Quality badge */}
      <div className={`absolute top-4 right-4 flex items-center gap-2 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-70"}`}>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-xs text-white font-semibold">HD</span>
        </div>
      </div>

      {/* Center play/pause (click to toggle) */}
      <div
        className="absolute inset-0 flex items-center justify-center cursor-pointer"
        onClick={togglePlay}
      >
        <div className={`transition-opacity duration-300 ${!isPlaying || showControls ? "opacity-100" : "opacity-0"}`}>
          {!isPlaying && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/50 flex items-center justify-center"
            >
              <Play className="w-10 h-10 text-white ml-1" fill="white" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom controls */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}>
        {/* Progress bar */}
        <div
          className="mb-3 cursor-pointer group/progress"
          onClick={handleProgressClick}
        >
          <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden group-hover/progress:h-2 transition-all">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors">
              {isPlaying ? <Pause className="w-5 h-5 text-white" fill="white" /> : <Play className="w-5 h-5 text-white ml-0.5" fill="white" />}
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={toggleMute}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors">
              {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
            </motion.button>
            <span className="text-sm text-white font-semibold">
              {currentTime} / {duration}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={toggleFullscreen}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors">
              {isFullscreen ? <Minimize className="w-5 h-5 text-white" /> : <Maximize className="w-5 h-5 text-white" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Score overlay (bottom center, above controls) */}
      {match && (
        <div className={`absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-6 px-6 py-3 bg-black/60 backdrop-blur-md rounded-2xl transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-70"}`}>
          <div className="flex items-center gap-2">
            <TeamLogo teamName={match.homeTeam} fallbackIcon={match.homeIcon} className="w-8 h-8" />
            <span className="text-sm font-semibold text-white">{match.homeTeam}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-white">{match.homeScore}</span>
            <span className="text-xl text-white/50">-</span>
            <span className="text-3xl font-bold text-white">{match.awayScore}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">{match.awayTeam}</span>
            <TeamLogo teamName={match.awayTeam} fallbackIcon={match.awayIcon} className="w-8 h-8" />
          </div>
        </div>
      )}
    </motion.div>
  );
}
