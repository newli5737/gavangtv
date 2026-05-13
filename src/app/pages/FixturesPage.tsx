import { Link } from "react-router";
import { motion } from "motion/react";
import { Calendar, Clock } from "lucide-react";
import { useMatches } from "@/app/hooks/useMatches";

export function FixturesPage() {
  const { matches, loading } = useMatches("UPCOMING");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Calendar className="w-7 h-7 text-primary" />
          <h1 className="text-3xl font-bold">Lịch thi đấu</h1>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-glass-bg border border-glass-border rounded-xl p-6 animate-pulse h-24" />
            ))}
          </div>
        ) : matches.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-20 bg-glass-bg border border-glass-border rounded-xl">
            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Chưa có lịch thi đấu</h2>
            <p className="text-muted-foreground">Lịch trận đấu sẽ được cập nhật sớm</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {matches.map((match, i) => (
              <motion.div key={match.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <Link to={`/match/${match.slug}`}>
                  <div className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-xl p-6 hover:border-primary/50 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center gap-2 min-w-[140px]">
                          <span>{match.leagueIcon}</span>
                          <span className="text-sm text-muted-foreground">{match.league}</span>
                        </div>
                        <div className="flex items-center gap-8 flex-1 justify-center">
                          <div className="flex items-center gap-3 min-w-[160px] justify-end">
                            <span className="font-semibold">{match.homeTeam}</span>
                            <span className="text-2xl">{match.homeIcon}</span>
                          </div>
                          <div className="px-4 py-2 bg-secondary/50 rounded-lg">
                            <span className="text-sm font-bold text-primary">VS</span>
                          </div>
                          <div className="flex items-center gap-3 min-w-[160px]">
                            <span className="text-2xl">{match.awayIcon}</span>
                            <span className="font-semibold">{match.awayTeam}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-[150px] justify-end">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(match.matchDate).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
