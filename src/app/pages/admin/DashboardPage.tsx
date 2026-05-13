import { useAdminStats, useAdminMatches } from "@/app/hooks/useAdmin";
import { motion } from "motion/react";
import { Trophy, Radio, Eye, MessageCircle } from "lucide-react";
import { Link } from "react-router";

const iconMap = [
  { icon: Trophy, color: "from-primary to-accent" },
  { icon: Radio, color: "from-red-500 to-red-600" },
  { icon: Eye, color: "from-blue-500 to-blue-600" },
  { icon: MessageCircle, color: "from-green-500 to-green-600" },
];

export function DashboardPage() {
  const { stats } = useAdminStats();
  const { matches } = useAdminMatches();

  const statCards = stats ? [
    { label: "Tổng trận đấu", value: stats.totalMatches },
    { label: "Đang trực tiếp", value: stats.liveMatches },
    { label: "Tổng lượt xem", value: stats.totalViews.toLocaleString() },
    { label: "Tổng bình luận", value: stats.totalComments },
  ] : [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Tổng quan</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => {
          const Icon = iconMap[i].icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${iconMap[i].color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Matches */}
      <div className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Trận đấu gần đây</h2>
          <Link to="/admin/matches" className="text-sm text-primary hover:underline">Xem tất cả →</Link>
        </div>
        <div className="space-y-3">
          {matches.slice(0, 5).map((match) => (
            <div key={match.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-lg">{match.leagueIcon}</span>
                <div>
                  <div className="text-sm font-semibold">{match.homeTeam} vs {match.awayTeam}</div>
                  <div className="text-xs text-muted-foreground">{match.league}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold">{match.homeScore} - {match.awayScore}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  match.status === "LIVE" ? "bg-live/20 text-live" :
                  match.status === "UPCOMING" ? "bg-blue-500/20 text-blue-400" :
                  match.status === "FINISHED" ? "bg-muted text-muted-foreground" :
                  "bg-destructive/20 text-destructive"
                }`}>
                  {match.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
