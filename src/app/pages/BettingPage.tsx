import { motion } from "motion/react";
import { TrendingUp } from "lucide-react";

const odds = [
  { id: 1, league: "Premier League", icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", home: "Man United", away: "Chelsea", homeOdd: 2.10, drawOdd: 3.40, awayOdd: 3.20, time: "20:00 - 15/05" },
  { id: 2, league: "La Liga", icon: "🇪🇸", home: "Barcelona", away: "Real Madrid", homeOdd: 2.50, drawOdd: 3.20, awayOdd: 2.80, time: "22:00 - 15/05" },
  { id: 3, league: "Serie A", icon: "🇮🇹", home: "AC Milan", away: "Juventus", homeOdd: 2.30, drawOdd: 3.10, awayOdd: 3.00, time: "01:45 - 16/05" },
  { id: 4, league: "Champions League", icon: "⭐", home: "Man City", away: "Inter Milan", homeOdd: 1.85, drawOdd: 3.60, awayOdd: 4.00, time: "02:00 - 16/05" },
  { id: 5, league: "Premier League", icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", home: "Liverpool", away: "Arsenal", homeOdd: 2.40, drawOdd: 3.30, awayOdd: 2.90, time: "23:30 - 16/05" },
  { id: 6, league: "Bundesliga", icon: "🇩🇪", home: "Bayern Munich", away: "Dortmund", homeOdd: 1.65, drawOdd: 3.80, awayOdd: 4.50, time: "20:30 - 17/05" },
  { id: 7, league: "Ligue 1", icon: "🇫🇷", home: "PSG", away: "Marseille", homeOdd: 1.45, drawOdd: 4.20, awayOdd: 6.00, time: "02:00 - 18/05" },
  { id: 8, league: "V-League", icon: "🇻🇳", home: "Hà Nội FC", away: "HAGL", homeOdd: 1.90, drawOdd: 3.40, awayOdd: 3.80, time: "19:15 - 18/05" },
];

function OddButton({ value, label }: { value: number; label: string }) {
  const color = value < 2.0 ? "text-green-400" : value < 3.0 ? "text-yellow-400" : "text-red-400";
  return (
    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center px-5 py-3 bg-secondary/50 border border-glass-border rounded-xl hover:border-primary/50 hover:bg-primary/10 transition-all min-w-[80px]">
      <span className="text-xs text-muted-foreground mb-1">{label}</span>
      <span className={`text-lg font-bold ${color}`}>{value.toFixed(2)}</span>
    </motion.button>
  );
}

export function BettingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="w-7 h-7 text-primary" />
          <h1 className="text-3xl font-bold">Tỷ lệ kèo</h1>
        </div>

        <div className="bg-glass-bg border border-glass-border rounded-xl p-4 mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <span>⚠️</span>
          <span>Tỷ lệ kèo chỉ mang tính chất tham khảo. GavangTV không khuyến khích cá cược.</span>
        </div>

        <div className="space-y-4">
          {odds.map((match, i) => (
            <motion.div key={match.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
              className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-xl p-6 hover:border-primary/30 transition-all">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4 min-w-[200px]">
                  <div className="flex items-center gap-2">
                    <span>{match.icon}</span>
                    <span className="text-xs text-muted-foreground">{match.league}</span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-secondary/50 rounded">{match.time}</span>
                </div>
                <div className="flex items-center gap-6 flex-1 justify-center">
                  <span className="font-semibold text-sm min-w-[120px] text-right">{match.home}</span>
                  <div className="flex items-center gap-3">
                    <OddButton value={match.homeOdd} label="1" />
                    <OddButton value={match.drawOdd} label="X" />
                    <OddButton value={match.awayOdd} label="2" />
                  </div>
                  <span className="font-semibold text-sm min-w-[120px]">{match.away}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
