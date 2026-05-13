import { motion } from "motion/react";

const h2hMatches = [
  { date: "Oct 2025", home: "Man United", homeScore: 1, awayScore: 1, away: "Chelsea", competition: "Premier League" },
  { date: "May 2025", home: "Chelsea", homeScore: 2, awayScore: 3, away: "Man United", competition: "Premier League" },
  { date: "Jan 2025", home: "Man United", homeScore: 2, awayScore: 0, away: "Chelsea", competition: "FA Cup" },
  { date: "Oct 2024", home: "Chelsea", homeScore: 1, awayScore: 1, away: "Man United", competition: "Premier League" },
  { date: "May 2024", home: "Man United", homeScore: 4, awayScore: 1, away: "Chelsea", competition: "Premier League" },
];

export function HeadToHead() {
  const wins = {
    home: h2hMatches.filter(m =>
      (m.home === "Man United" && m.homeScore > m.awayScore) ||
      (m.away === "Man United" && m.awayScore > m.homeScore)
    ).length,
    draws: h2hMatches.filter(m => m.homeScore === m.awayScore).length,
    away: h2hMatches.filter(m =>
      (m.home === "Chelsea" && m.homeScore > m.awayScore) ||
      (m.away === "Chelsea" && m.awayScore > m.homeScore)
    ).length,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-xl p-6"
    >
      <h3 className="text-xl font-semibold mb-6">Head to Head</h3>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-secondary/30 rounded-lg">
          <div className="text-3xl font-bold text-primary mb-1">{wins.home}</div>
          <div className="text-xs text-muted-foreground">Man United Wins</div>
        </div>
        <div className="text-center p-4 bg-secondary/30 rounded-lg">
          <div className="text-3xl font-bold text-muted-foreground mb-1">{wins.draws}</div>
          <div className="text-xs text-muted-foreground">Draws</div>
        </div>
        <div className="text-center p-4 bg-secondary/30 rounded-lg">
          <div className="text-3xl font-bold text-blue-500 mb-1">{wins.away}</div>
          <div className="text-xs text-muted-foreground">Chelsea Wins</div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-muted-foreground mb-3">Last 5 Meetings</h4>
        {h2hMatches.map((match, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">{match.date}</span>
              <span className="text-xs text-muted-foreground">{match.competition}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-1">
                <span className="text-sm font-semibold">{match.home}</span>
              </div>
              <div className="px-4 py-1 bg-background rounded font-bold text-sm">
                {match.homeScore} - {match.awayScore}
              </div>
              <div className="flex items-center gap-2 flex-1 justify-end">
                <span className="text-sm font-semibold">{match.away}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
