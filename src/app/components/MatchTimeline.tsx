import { motion } from "motion/react";
import { Target, AlertCircle, ArrowRightLeft } from "lucide-react";

const events = [
  { time: "12'", type: "goal", team: "home", player: "Rashford", assist: "Fernandes" },
  { time: "28'", type: "yellow", team: "away", player: "Kante" },
  { time: "35'", type: "goal", team: "home", player: "Martial", assist: "Sancho" },
  { time: "45+2'", type: "yellow", team: "home", player: "Casemiro" },
  { time: "52'", type: "substitution", team: "away", playerOut: "Havertz", playerIn: "Pulisic" },
  { time: "61'", type: "goal", team: "away", player: "Sterling", assist: "Mount" },
  { time: "65'", type: "yellow", team: "away", player: "Silva" },
];

export function MatchTimeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-xl p-6"
    >
      <h3 className="text-xl font-semibold mb-6">Match Timeline</h3>
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

        <div className="space-y-6">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: event.team === "home" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-4 ${event.team === "home" ? "flex-row" : "flex-row-reverse"}`}
            >
              <div className={`flex-1 ${event.team === "home" ? "text-right" : "text-left"}`}>
                <div className="inline-block p-3 bg-secondary/50 rounded-lg">
                  <div className="text-sm font-semibold mb-1">
                    {event.type === "goal" && `⚽ ${event.player}`}
                    {event.type === "yellow" && `🟨 ${event.player}`}
                    {event.type === "substitution" && `🔄 ${event.playerOut} → ${event.playerIn}`}
                  </div>
                  {event.assist && (
                    <div className="text-xs text-muted-foreground">Assist: {event.assist}</div>
                  )}
                </div>
              </div>

              <div className="relative z-10">
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-xs ${
                  event.type === "goal"
                    ? "bg-gradient-to-br from-primary to-accent border-primary text-white"
                    : event.type === "yellow"
                    ? "bg-yellow-500 border-yellow-400 text-black"
                    : "bg-secondary border-border text-foreground"
                }`}>
                  {event.time}
                </div>
              </div>

              <div className="flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
