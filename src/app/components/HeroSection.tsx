import { motion } from "motion/react";
import { Play, Info, TrendingUp } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { LiveMatchStats } from "./LiveMatchStats";
import { TeamLogo } from "./TeamLogo";
import type { Match } from "@/types";

export function HeroSection({ match, loading }: { match?: Match; loading?: boolean }) {
  if (loading || !match) {
    return (
      <div className="relative h-[600px] overflow-hidden flex items-center justify-center bg-gradient-to-b from-secondary/50 to-background">
        <div className="animate-pulse text-muted-foreground">Đang tải trận đấu nổi bật...</div>
      </div>
    );
  }

  return (
    <div className="relative h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1774916927099-5b0c72f2a683?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Stadium"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
      </div>

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center space-y-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <span className="text-2xl">{match.leagueIcon}</span>
            </div>
            <span className="text-sm uppercase tracking-wider text-muted-foreground">{match.league}</span>
          </div>

          <div className="flex items-center justify-center gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="text-center">
              <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-3">
                <TeamLogo teamName={match.homeTeam} fallbackIcon={match.homeIcon} className="w-16 h-16" />
              </div>
              <h3 className="text-xl font-semibold">{match.homeTeam}</h3>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="text-center">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-6xl font-bold">{match.homeScore}</span>
                <span className="text-4xl text-muted-foreground">-</span>
                <span className="text-6xl font-bold">{match.awayScore}</span>
              </div>
              {match.status === "LIVE" && (
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-2 h-2 bg-live rounded-full animate-pulse" />
                  <span className="text-sm uppercase tracking-wider text-live font-semibold">Trực tiếp • {match.minute}</span>
                </div>
              )}
              {match.status === "UPCOMING" && (
                <span className="text-sm text-muted-foreground">Sắp diễn ra</span>
              )}
              {match.status === "FINISHED" && (
                <span className="text-sm text-muted-foreground">Kết thúc</span>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="text-center">
              <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-3">
                <TeamLogo teamName={match.awayTeam} fallbackIcon={match.awayIcon} className="w-16 h-16" />
              </div>
              <h3 className="text-xl font-semibold">{match.awayTeam}</h3>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex items-center justify-center gap-4 flex-wrap">
            {match.hasStream && (
              <Link to={`/watch/${match.slug}`}>
                <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 87, 34, 0.5)" }} whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-semibold shadow-lg shadow-primary/30">
                  <Play className="w-5 h-5" fill="white" /> Xem trực tiếp
                </motion.button>
              </Link>
            )}
            <Link to={`/match/${match.slug}`}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 transition-colors">
                <Info className="w-5 h-5" /> Chi tiết trận đấu
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
