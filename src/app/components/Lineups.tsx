import { motion } from "motion/react";
import * as Tabs from "@radix-ui/react-tabs";

const homeLineup = [
  { number: 1, name: "De Gea", position: "GK" },
  { number: 2, name: "Wan-Bissaka", position: "RB" },
  { number: 5, name: "Maguire", position: "CB" },
  { number: 6, name: "Varane", position: "CB" },
  { number: 23, name: "Shaw", position: "LB" },
  { number: 18, name: "Casemiro", position: "CDM", yellow: true },
  { number: 8, name: "Fernandes", position: "CAM" },
  { number: 14, name: "Eriksen", position: "CM" },
  { number: 25, name: "Sancho", position: "RW" },
  { number: 9, name: "Martial", position: "ST", goal: true },
  { number: 10, name: "Rashford", position: "LW", goal: true },
];

const awayLineup = [
  { number: 1, name: "Kepa", position: "GK" },
  { number: 24, name: "James", position: "RB" },
  { number: 6, name: "Silva", position: "CB", yellow: true },
  { number: 26, name: "Koulibaly", position: "CB" },
  { number: 21, name: "Chilwell", position: "LB" },
  { number: 7, name: "Kante", position: "CDM", yellow: true },
  { number: 5, name: "Fernandez", position: "CM" },
  { number: 19, name: "Mount", position: "CAM" },
  { number: 17, name: "Sterling", position: "RW", goal: true },
  { number: 15, name: "Jackson", position: "ST" },
  { number: 20, name: "Palmer", position: "LW" },
];

const homeBench = [
  { number: 22, name: "Heaton", position: "GK" },
  { number: 12, name: "Malacia", position: "LB" },
  { number: 19, name: "Lindelof", position: "CB" },
  { number: 39, name: "McTominay", position: "CDM" },
  { number: 17, name: "Fred", position: "CM" },
];

const awayBench = [
  { number: 13, name: "Arrizabalaga", position: "GK" },
  { number: 14, name: "Chalobah", position: "CB" },
  { number: 12, name: "Loftus-Cheek", position: "CM" },
  { number: 29, name: "Havertz", position: "CAM", subbed: true },
  { number: 10, name: "Pulisic", position: "RW" },
];

function LineupList({ players, title }: { players: typeof homeLineup; title: string }) {
  return (
    <div>
      <h4 className="text-sm font-semibold mb-3 text-muted-foreground">{title}</h4>
      <div className="space-y-2">
        {players.map((player, index) => (
          <motion.div
            key={player.number}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            className={`flex items-center gap-3 p-2 rounded-lg ${
              player.subbed ? "opacity-50" : "hover:bg-secondary/30"
            } transition-colors`}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-xs font-bold">
              {player.number}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold">{player.name}</div>
              <div className="text-xs text-muted-foreground">{player.position}</div>
            </div>
            <div className="flex items-center gap-1">
              {player.goal && <span className="text-lg">⚽</span>}
              {player.yellow && <span className="text-sm">🟨</span>}
              {player.subbed && <span className="text-sm">↓</span>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function Lineups() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-xl p-6 sticky top-24"
    >
      <h3 className="text-xl font-semibold mb-6">Lineups</h3>

      <Tabs.Root defaultValue="home" className="w-full">
        <Tabs.List className="flex gap-2 mb-6 bg-secondary/30 p-1 rounded-lg">
          <Tabs.Trigger
            value="home"
            className="flex-1 px-4 py-2 text-sm font-semibold rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white transition-all"
          >
            Man United
          </Tabs.Trigger>
          <Tabs.Trigger
            value="away"
            className="flex-1 px-4 py-2 text-sm font-semibold rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all"
          >
            Chelsea
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="home" className="space-y-6">
          <LineupList players={homeLineup} title="Starting XI" />
          <LineupList players={homeBench} title="Substitutes" />
        </Tabs.Content>

        <Tabs.Content value="away" className="space-y-6">
          <LineupList players={awayLineup} title="Starting XI" />
          <LineupList players={awayBench} title="Substitutes" />
        </Tabs.Content>
      </Tabs.Root>
    </motion.div>
  );
}
