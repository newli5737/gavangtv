import { motion } from "motion/react";
import { Clock, Trophy, Target, TrendingUp } from "lucide-react";
import type { Match } from "@/types";

export function Sidebar({ matches }: { matches: Match[] }) {
  const upcomingMatches = matches.filter((m) => m.status === "UPCOMING").slice(0, 3);
  const finishedMatches = matches.filter((m) => m.status === "FINISHED").slice(0, 3);
  const liveMatches = matches.filter((m) => m.status === "LIVE");

  // Trending: matches sorted by views
  const trending = [...matches].sort((a, b) => b.fakeViews - a.fakeViews).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Upcoming */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Sắp diễn ra</h3>
        </div>
        <div className="space-y-3">
          {upcomingMatches.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">Không có trận sắp diễn ra</p>
          ) : (
            upcomingMatches.map((match) => (
              <motion.div key={match.id} className="p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-primary font-semibold">
                    {new Date(match.matchDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  <span className="text-xs text-muted-foreground">{match.league}</span>
                </div>
                <div className="text-sm">
                  <div className="font-semibold">{match.homeTeam}</div>
                  <div className="text-muted-foreground text-xs">vs</div>
                  <div className="font-semibold">{match.awayTeam}</div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

      {/* Results */}
      {finishedMatches.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Kết quả</h3>
          </div>
          <div className="space-y-2">
            {finishedMatches.map((match) => (
              <div key={match.id} className="flex items-center justify-between p-2 hover:bg-secondary/30 rounded-lg transition-colors cursor-pointer">
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-sm font-semibold">{match.homeTeam}</span>
                </div>
                <div className="px-3 py-1 bg-background rounded font-bold text-sm">
                  {match.homeScore} - {match.awayScore}
                </div>
                <div className="flex items-center gap-2 flex-1 justify-end">
                  <span className="text-sm font-semibold">{match.awayTeam}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Trending */}
      {trending.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Trận đấu nổi bật</h3>
          </div>
          <div className="space-y-2">
            {trending.map((match) => (
              <div key={match.id} className="p-2 hover:bg-secondary/30 rounded-lg transition-colors cursor-pointer">
                <div className="text-sm font-semibold mb-1">{match.homeTeam} vs {match.awayTeam}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-live rounded-full" />
                  <span>{match.fakeViews.toLocaleString()} đang xem</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
