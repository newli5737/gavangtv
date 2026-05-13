import { Link } from "react-router";
import { motion } from "motion/react";
import { Play, Radio, Users } from "lucide-react";
import { useMatches } from "@/app/hooks/useMatches";

export function LivePage() {
  const { matches, loading } = useMatches("LIVE");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-3 h-3 bg-live rounded-full animate-pulse" />
          <h1 className="text-3xl font-bold">Trận đấu trực tiếp</h1>
          {!loading && (
            <span className="px-3 py-1 bg-live/20 border border-live rounded-full text-sm text-live font-semibold">
              {matches.length} trận
            </span>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-glass-bg border border-glass-border rounded-xl p-6 animate-pulse h-48" />
            ))}
          </div>
        ) : matches.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-20 bg-glass-bg border border-glass-border rounded-xl">
            <Radio className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Hiện không có trận nào đang diễn ra</h2>
            <p className="text-muted-foreground">Hãy quay lại sau hoặc xem lịch thi đấu sắp tới</p>
            <Link to="/fixtures" className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-semibold">
              Xem lịch thi đấu
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match, i) => (
              <motion.div key={match.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link to={`/watch/${match.slug}`}>
                  <div className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-xl p-6 hover:border-primary/50 transition-all group cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span>{match.leagueIcon}</span>
                        <span className="text-sm text-muted-foreground">{match.league}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 px-2 py-1 bg-live/20 border border-live rounded-full">
                          <div className="w-1.5 h-1.5 bg-live rounded-full animate-pulse" />
                          <span className="text-xs text-live font-semibold">TRỰC TIẾP</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{match.minute}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div className="text-center flex-1">
                        <div className="text-3xl mb-2">{match.homeIcon}</div>
                        <div className="text-sm font-semibold">{match.homeTeam}</div>
                      </div>
                      <div className="text-center px-4">
                        <div className="text-3xl font-bold">{match.homeScore} - {match.awayScore}</div>
                      </div>
                      <div className="text-center flex-1">
                        <div className="text-3xl mb-2">{match.awayIcon}</div>
                        <div className="text-sm font-semibold">{match.awayTeam}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="w-3 h-3" />
                        <span>{match.fakeViews.toLocaleString()} đang xem</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-4 h-4" fill="currentColor" /> Xem ngay
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
