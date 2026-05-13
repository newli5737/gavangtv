import { Link } from "react-router";
import { motion } from "motion/react";
import { Trophy } from "lucide-react";
import { useMatches } from "@/app/hooks/useMatches";

export function ResultsPage() {
  const { matches, loading } = useMatches("FINISHED");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Trophy className="w-7 h-7 text-primary" />
          <h1 className="text-3xl font-bold">Kết quả</h1>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-glass-bg border border-glass-border rounded-xl p-6 animate-pulse h-24" />
            ))}
          </div>
        ) : matches.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-20 bg-glass-bg border border-glass-border rounded-xl">
            <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Chưa có kết quả</h2>
            <p className="text-muted-foreground">Kết quả các trận đấu sẽ xuất hiện ở đây</p>
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
                        <div className="flex items-center gap-6 flex-1 justify-center">
                          <div className="flex items-center gap-3 min-w-[160px] justify-end">
                            <span className={`font-semibold ${match.homeScore > match.awayScore ? "text-primary" : ""}`}>{match.homeTeam}</span>
                            <span className="text-2xl">{match.homeIcon}</span>
                          </div>
                          <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-lg">
                            <span className={`text-xl font-bold ${match.homeScore > match.awayScore ? "text-primary" : ""}`}>{match.homeScore}</span>
                            <span className="text-muted-foreground">-</span>
                            <span className={`text-xl font-bold ${match.awayScore > match.homeScore ? "text-primary" : ""}`}>{match.awayScore}</span>
                          </div>
                          <div className="flex items-center gap-3 min-w-[160px]">
                            <span className="text-2xl">{match.awayIcon}</span>
                            <span className={`font-semibold ${match.awayScore > match.homeScore ? "text-primary" : ""}`}>{match.awayTeam}</span>
                          </div>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground font-semibold min-w-[60px] text-center">
                        KT
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
