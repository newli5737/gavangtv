import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { Play, ArrowLeft } from "lucide-react";
import { useMatch } from "@/app/hooks/useMatches";
import { MatchStatistics } from "../components/MatchStatistics";
import { LiveMatchEvents } from "../components/LiveMatchEvents";
import { TeamLogo } from "../components/TeamLogo";

export function MatchDetailPage() {
  const { slug } = useParams();
  const { match, loading } = useMatch(slug);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Đang tải trận đấu...</div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p className="text-muted-foreground">Không tìm thấy trận đấu</p>
        <Link to="/" className="text-primary hover:underline">← Về trang chủ</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-secondary/50 to-background border-b border-glass-border">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Quay lại
          </Link>

          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <span className="text-xl">{match.leagueIcon}</span>
              </div>
              <span className="text-sm uppercase tracking-wider text-muted-foreground">{match.league}</span>
            </div>

            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-2">
                  <TeamLogo teamName={match.homeTeam} fallbackIcon={match.homeIcon} className="w-14 h-14" />
                </div>
                <h3 className="text-lg font-semibold">{match.homeTeam}</h3>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-5xl font-bold">{match.homeScore}</span>
                  <span className="text-3xl text-muted-foreground">-</span>
                  <span className="text-5xl font-bold">{match.awayScore}</span>
                </div>
                {match.status === "LIVE" && (
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-2 h-2 bg-live rounded-full animate-pulse" />
                    <span className="text-sm uppercase tracking-wider text-live font-semibold">Trực tiếp • {match.minute}</span>
                  </div>
                )}
                {match.status === "FINISHED" && <span className="text-sm text-muted-foreground">Kết thúc</span>}
                {match.status === "UPCOMING" && <span className="text-sm text-muted-foreground">Sắp diễn ra</span>}
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-2">
                  <TeamLogo teamName={match.awayTeam} fallbackIcon={match.awayIcon} className="w-14 h-14" />
                </div>
                <h3 className="text-lg font-semibold">{match.awayTeam}</h3>
              </div>
            </div>

            {match.hasStream && match.status === "LIVE" && (
              <Link to={`/watch/${match.slug}`}>
                <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 87, 34, 0.5)" }} whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-semibold shadow-lg shadow-primary/30">
                  <Play className="w-5 h-5" fill="white" /> Xem trực tiếp
                </motion.button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <MatchStatistics />
            {match.events && match.events.length > 0 && (
              <LiveMatchEvents events={match.events} homeTeam={match.homeTeam} awayTeam={match.awayTeam} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
