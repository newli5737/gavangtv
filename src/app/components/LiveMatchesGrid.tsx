import { motion } from "motion/react";
import { Play, BarChart3, Radio } from "lucide-react";
import { Link } from "react-router";
import type { Match } from "@/types";

export function LiveMatchesGrid({ matches, loading }: { matches: Match[]; loading?: boolean }) {
  if (loading) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 bg-live rounded-full animate-pulse" />
          <h2 className="text-2xl font-bold">Trận đấu trực tiếp</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-glass-bg border border-glass-border rounded-xl p-4 animate-pulse h-48" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-live rounded-full animate-pulse" />
          <h2 className="text-2xl font-bold">Trận đấu trực tiếp</h2>
        </div>
        <span className="text-sm text-muted-foreground">{matches.length} trận</span>
      </div>

      {matches.length === 0 ? (
        <div className="bg-glass-bg border border-glass-border rounded-xl p-12 text-center text-muted-foreground">
          Hiện không có trận đấu trực tiếp nào
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-xl p-4 hover:border-primary/50 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{match.leagueIcon}</span>
                  <span className="text-xs text-muted-foreground">{match.league}</span>
                </div>
                <div className="flex items-center gap-2">
                  {match.status === "LIVE" && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-live/20 border border-live rounded-full">
                      <div className="w-1.5 h-1.5 bg-live rounded-full animate-pulse" />
                      <span className="text-xs text-live font-semibold">TRỰC TIẾP</span>
                    </div>
                  )}
                  {match.hasStream && (
                    <div className="p-1.5 bg-primary/20 rounded-full">
                      <Radio className="w-3 h-3 text-primary" />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">{match.homeIcon}</span>
                    <span className="font-semibold">{match.homeTeam}</span>
                  </div>
                  <span className="text-2xl font-bold">{match.homeScore}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">{match.awayIcon}</span>
                    <span className="font-semibold">{match.awayTeam}</span>
                  </div>
                  <span className="text-2xl font-bold">{match.awayScore}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-glass-border">
                <span className="text-sm text-muted-foreground">{match.minute}</span>
                <div className="flex items-center gap-2">
                  {match.hasStream && (
                    <Link to={`/watch/${match.slug}`}>
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 bg-gradient-to-r from-primary to-accent rounded-lg text-white text-xs font-semibold flex items-center gap-1 shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
                        <Play className="w-3 h-3" fill="white" /> Xem
                      </motion.button>
                    </Link>
                  )}
                  <Link to={`/match/${match.slug}`}>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-secondary/50 rounded-lg text-xs font-semibold flex items-center gap-1 hover:bg-secondary transition-colors">
                      <BarChart3 className="w-3 h-3" /> Thống kê
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
