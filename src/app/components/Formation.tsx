import { motion } from "motion/react";

const homeFormation = [
  { number: 1, name: "De Gea", position: { x: 50, y: 90 } },
  { number: 2, name: "Wan-Bissaka", position: { x: 80, y: 75 } },
  { number: 5, name: "Maguire", position: { x: 60, y: 75 } },
  { number: 6, name: "Varane", position: { x: 40, y: 75 } },
  { number: 23, name: "Shaw", position: { x: 20, y: 75 } },
  { number: 18, name: "Casemiro", position: { x: 50, y: 55 } },
  { number: 8, name: "Fernandes", position: { x: 70, y: 40 } },
  { number: 14, name: "Eriksen", position: { x: 30, y: 40 } },
  { number: 25, name: "Sancho", position: { x: 80, y: 20 } },
  { number: 9, name: "Martial", position: { x: 50, y: 15 } },
  { number: 10, name: "Rashford", position: { x: 20, y: 20 } },
];

export function Formation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-xl p-6"
    >
      <h3 className="text-xl font-semibold mb-6">Formation</h3>
      <div className="relative w-full aspect-[2/3] bg-gradient-to-b from-green-900/30 to-green-800/30 rounded-xl overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grass" patternUnits="userSpaceOnUse" width="4" height="4">
              <rect width="4" height="4" fill="rgba(34, 197, 94, 0.1)" />
              <path d="M 0 4 L 4 0" stroke="rgba(34, 197, 94, 0.2)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grass)" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
          <circle cx="50%" cy="50%" r="15%" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" />
          <circle cx="50%" cy="50%" r="2%" fill="rgba(255,255,255,0.3)" />
          <rect x="35%" y="0" width="30%" height="15%" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" />
          <rect x="40%" y="0" width="20%" height="7%" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" />
          <rect x="35%" y="85%" width="30%" height="15%" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" />
          <rect x="40%" y="93%" width="20%" height="7%" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" />
        </svg>

        <div className="absolute inset-0">
          {homeFormation.map((player, index) => (
            <motion.div
              key={player.number}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05, type: "spring" }}
              className="absolute"
              style={{
                left: `${player.position.x}%`,
                top: `${player.position.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="text-center group cursor-pointer">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-white flex items-center justify-center font-bold text-white text-sm shadow-lg mb-1"
                >
                  {player.number}
                </motion.div>
                <div className="bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {player.name}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-4 text-center text-sm text-muted-foreground">
        4-2-3-1 Formation
      </div>
    </motion.div>
  );
}
