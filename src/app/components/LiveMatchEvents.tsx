import { motion } from "motion/react";
import type { MatchEvent } from "@/types";

interface Props {
  events: MatchEvent[];
  homeTeam: string;
  awayTeam: string;
}

export function LiveMatchEvents({ events, homeTeam, awayTeam }: Props) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-6">Sự kiện trận đấu</h3>
      <div className="space-y-4">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-start gap-4 p-4 rounded-lg ${
              event.type === "goal"
                ? "bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30"
                : "bg-secondary/30"
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
              event.type === "goal" ? "bg-gradient-to-br from-primary to-accent" :
              event.type === "yellow" ? "bg-yellow-500" :
              event.type === "red" ? "bg-red-600" :
              event.type === "halftime" ? "bg-secondary" :
              "bg-muted"
            }`}>
              {event.type === "goal" && "⚽"}
              {event.type === "yellow" && "🟨"}
              {event.type === "red" && "🟥"}
              {event.type === "substitution" && "🔄"}
              {event.type === "halftime" && "⏸️"}
              {event.type === "kickoff" && "⚡"}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`font-bold ${event.type === "goal" ? "text-primary" : "text-foreground"}`}>
                  {event.time}
                </span>
                {event.type === "goal" && (
                  <span className="px-2 py-0.5 bg-gradient-to-r from-primary to-accent rounded-full text-xs text-white font-semibold">BÀN THẮNG</span>
                )}
              </div>
              <p className="text-sm text-foreground/90">{event.description}</p>
              {event.player && (
                <p className="text-xs text-muted-foreground mt-1">
                  {event.team === "home" ? homeTeam : awayTeam} • {event.player}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
