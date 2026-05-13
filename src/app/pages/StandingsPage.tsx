import { motion } from "motion/react";
import { BarChart3 } from "lucide-react";
import { TeamLogo } from "../components/TeamLogo";

const leagues = [
  {
    name: "Premier League", icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    teams: [
      { pos: 1, name: "Arsenal", played: 36, won: 26, drawn: 6, lost: 4, gf: 85, ga: 28, pts: 84 },
      { pos: 2, name: "Man City", played: 36, won: 25, drawn: 7, lost: 4, gf: 90, ga: 35, pts: 82 },
      { pos: 3, name: "Liverpool", played: 36, won: 24, drawn: 8, lost: 4, gf: 80, ga: 38, pts: 80 },
      { pos: 4, name: "Chelsea", played: 36, won: 20, drawn: 6, lost: 10, gf: 68, ga: 45, pts: 66 },
      { pos: 5, name: "Man United", played: 36, won: 18, drawn: 5, lost: 13, gf: 55, ga: 52, pts: 59 },
      { pos: 6, name: "Tottenham", played: 36, won: 17, drawn: 6, lost: 13, gf: 65, ga: 55, pts: 57 },
      { pos: 7, name: "Newcastle", played: 36, won: 16, drawn: 6, lost: 14, gf: 58, ga: 50, pts: 54 },
      { pos: 8, name: "Aston Villa", played: 36, won: 15, drawn: 7, lost: 14, gf: 52, ga: 48, pts: 52 },
    ],
  },
  {
    name: "La Liga", icon: "🇪🇸",
    teams: [
      { pos: 1, name: "Real Madrid", played: 36, won: 27, drawn: 5, lost: 4, gf: 82, ga: 25, pts: 86 },
      { pos: 2, name: "Barcelona", played: 36, won: 25, drawn: 7, lost: 4, gf: 88, ga: 38, pts: 82 },
      { pos: 3, name: "Atletico Madrid", played: 36, won: 22, drawn: 8, lost: 6, gf: 65, ga: 35, pts: 74 },
      { pos: 4, name: "Athletic Bilbao", played: 36, won: 18, drawn: 9, lost: 9, gf: 55, ga: 38, pts: 63 },
      { pos: 5, name: "Villarreal", played: 36, won: 16, drawn: 10, lost: 10, gf: 60, ga: 48, pts: 58 },
    ],
  },
];

export function StandingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <BarChart3 className="w-7 h-7 text-primary" />
          <h1 className="text-3xl font-bold">Bảng xếp hạng</h1>
        </div>

        <div className="space-y-8">
          {leagues.map((league, li) => (
            <motion.div key={league.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: li * 0.1 }}
              className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-xl overflow-hidden">
              <div className="p-5 border-b border-glass-border flex items-center gap-3">
                <span className="text-xl">{league.icon}</span>
                <h2 className="text-lg font-bold">{league.name}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-glass-border text-xs text-muted-foreground">
                      <th className="p-3 text-left w-12">#</th>
                      <th className="p-3 text-left">Đội</th>
                      <th className="p-3 text-center">Trận</th>
                      <th className="p-3 text-center">Thắng</th>
                      <th className="p-3 text-center">Hòa</th>
                      <th className="p-3 text-center">Thua</th>
                      <th className="p-3 text-center">BT</th>
                      <th className="p-3 text-center">BN</th>
                      <th className="p-3 text-center">HS</th>
                      <th className="p-3 text-center font-bold">Điểm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {league.teams.map((team, ti) => (
                      <motion.tr key={team.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: li * 0.1 + ti * 0.03 }}
                        className={`border-b border-glass-border/30 hover:bg-secondary/20 transition-colors ${
                          team.pos <= 4 ? "" : ""
                        }`}>
                        <td className="p-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            team.pos === 1 ? "bg-gradient-to-br from-primary to-accent text-white" :
                            team.pos <= 4 ? "bg-primary/20 text-primary" :
                            "bg-secondary/50 text-muted-foreground"
                          }`}>{team.pos}</span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <TeamLogo teamName={team.name} className="w-6 h-6" />
                            <span className="font-semibold text-sm">{team.name}</span>
                          </div>
                        </td>
                        <td className="p-3 text-center text-sm">{team.played}</td>
                        <td className="p-3 text-center text-sm text-green-400">{team.won}</td>
                        <td className="p-3 text-center text-sm text-yellow-400">{team.drawn}</td>
                        <td className="p-3 text-center text-sm text-red-400">{team.lost}</td>
                        <td className="p-3 text-center text-sm">{team.gf}</td>
                        <td className="p-3 text-center text-sm">{team.ga}</td>
                        <td className="p-3 text-center text-sm">{team.gf - team.ga > 0 ? "+" : ""}{team.gf - team.ga}</td>
                        <td className="p-3 text-center font-bold text-primary">{team.pts}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
