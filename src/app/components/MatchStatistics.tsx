import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

const stats = [
  { label: "Kiểm soát bóng", home: 58, away: 42 },
  { label: "Sút", home: 15, away: 9 },
  { label: "Sút trúng đích", home: 7, away: 4 },
  { label: "Phạt góc", home: 6, away: 3 },
  { label: "Phạm lỗi", home: 8, away: 11 },
  { label: "Việt vị", home: 2, away: 5 },
  { label: "Thẻ vàng", home: 2, away: 3 },
  { label: "Thẻ đỏ", home: 0, away: 0 },
];

const possessionData = [
  { name: "Man United", value: 58 },
  { name: "Chelsea", value: 42 },
];

export function MatchStatistics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-xl p-6"
    >
      <h3 className="text-xl font-semibold mb-6">Thống kê trận đấu</h3>

      <div className="mb-8">
        <h4 className="text-sm font-semibold mb-4 text-center text-muted-foreground">Kiểm soát bóng</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={possessionData} layout="vertical">
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis type="category" dataKey="name" width={100} tick={{ fill: '#9ca3af', fontSize: 12 }} />
            <Bar dataKey="value" radius={[0, 8, 8, 0]}>
              {possessionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? "url(#gradientPrimary)" : "#3b82f6"} />
              ))}
            </Bar>
            <defs>
              <linearGradient id="gradientPrimary" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ff5722" />
                <stop offset="100%" stopColor="#ff6b35" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
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
                  animate={{ width: `${(stat.home / (stat.home + stat.away)) * 100}%` }}
                  transition={{ duration: 0.8, delay: index * 0.05 }}
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                />
              </div>
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden flex justify-end">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(stat.away / (stat.home + stat.away)) * 100}%` }}
                  transition={{ duration: 0.8, delay: index * 0.05 }}
                  className="h-full bg-gradient-to-l from-blue-500 to-blue-600 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <div className="text-center flex-1">
            <div className="text-2xl font-bold text-primary mb-1">65%</div>
            <div className="text-xs text-muted-foreground">Chính xác chuyền</div>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center flex-1">
            <div className="text-2xl font-bold text-primary mb-1">892</div>
            <div className="text-xs text-muted-foreground">Tổng chuyền</div>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center flex-1">
            <div className="text-2xl font-bold text-primary mb-1">23.4km</div>
            <div className="text-xs text-muted-foreground">Quãng đường</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
