import { motion } from "motion/react";
import * as Progress from "@radix-ui/react-progress";

const stats = [
  { label: "Ball Possession", home: 58, away: 42 },
  { label: "Shots on Target", home: 7, away: 4 },
  { label: "Corners", home: 6, away: 3 },
  { label: "Fouls", home: 8, away: 11 },
];

export function LiveMatchStats() {
  return (
    <div className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl p-6 max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold mb-6 text-center">Live Match Statistics</h3>
      <div className="space-y-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="font-semibold">{stat.home}</span>
              <span className="text-muted-foreground">{stat.label}</span>
              <span className="font-semibold">{stat.away}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.home}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                />
              </div>
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden flex justify-end">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.away}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  className="h-full bg-gradient-to-l from-blue-500 to-blue-600 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
