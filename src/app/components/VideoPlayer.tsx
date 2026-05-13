import { motion } from "motion/react";
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, Radio } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { Match } from "@/types";

export function VideoPlayer({ match }: { match?: Match }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full aspect-video bg-black rounded-xl overflow-hidden group"
    >
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1774916927099-5b0c72f2a683?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
        alt="Live match"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-live/90 backdrop-blur-sm rounded-full">
          <Radio className="w-3 h-3 text-white animate-pulse" />
          <span className="text-xs text-white font-semibold">TRỰC TIẾP</span>
        </div>
        <div className="px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full text-xs text-white font-semibold">
          {match?.minute || "—"}
        </div>
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-xs text-white font-semibold">HD</span>
        </div>
      </div>

      {/* Play/Pause overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <motion.button
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/50 flex items-center justify-center"
        >
          {isPlaying ? <Pause className="w-10 h-10 text-white" fill="white" /> : <Play className="w-10 h-10 text-white" fill="white" />}
        </motion.button>
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="mb-3">
          <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-accent w-3/4" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors">
              {isPlaying ? <Pause className="w-5 h-5 text-white" fill="white" /> : <Play className="w-5 h-5 text-white" fill="white" />}
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsMuted(!isMuted)}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors">
              {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
            </motion.button>
            <span className="text-sm text-white font-semibold">{match?.minute || "—"} / TRỰC TIẾP</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors">
              <Settings className="w-5 h-5 text-white" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors">
              <Maximize className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Score overlay */}
      {match && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-8 text-white">
          <div className="text-center">
            <div className="text-4xl mb-2">{match.homeIcon}</div>
            <div className="text-sm font-semibold">{match.homeTeam}</div>
            <div className="text-5xl font-bold">{match.homeScore}</div>
          </div>
          <div className="flex items-center">
            <div className="text-3xl text-white/50">-</div>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">{match.awayIcon}</div>
            <div className="text-sm font-semibold">{match.awayTeam}</div>
            <div className="text-5xl font-bold">{match.awayScore}</div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
