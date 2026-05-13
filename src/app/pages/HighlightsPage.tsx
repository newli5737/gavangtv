import { motion } from "motion/react";
import { Play, Clock, Eye } from "lucide-react";

const highlights = [
  { id: 1, title: "Man United 2-1 Chelsea | Tất cả bàn thắng & Highlights", league: "Premier League", icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", views: "1.2M", time: "10:24", date: "Hôm nay" },
  { id: 2, title: "Barcelona 3-2 Real Madrid | El Clasico Highlights", league: "La Liga", icon: "🇪🇸", views: "2.5M", time: "12:15", date: "Hôm nay" },
  { id: 3, title: "AC Milan 1-1 Juventus | Derby d'Italia", league: "Serie A", icon: "🇮🇹", views: "800K", time: "8:30", date: "Hôm nay" },
  { id: 4, title: "PSG 2-0 Marseille | Le Classique", league: "Ligue 1", icon: "🇫🇷", views: "650K", time: "9:45", date: "Hôm nay" },
  { id: 5, title: "Bayern Munich 4-1 Dortmund | Der Klassiker", league: "Bundesliga", icon: "🇩🇪", views: "1.8M", time: "11:20", date: "Hôm qua" },
  { id: 6, title: "Liverpool 3-0 Arsenal | Top 4 đại chiến", league: "Premier League", icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", views: "950K", time: "10:05", date: "Hôm qua" },
  { id: 7, title: "Inter Milan 2-1 Napoli | Cuộc rượt đuổi tỉ số", league: "Serie A", icon: "🇮🇹", views: "720K", time: "9:15", date: "2 ngày trước" },
  { id: 8, title: "Atletico Madrid 1-0 Sevilla | Bàn thắng phút cuối", league: "La Liga", icon: "🇪🇸", views: "450K", time: "7:30", date: "2 ngày trước" },
  { id: 9, title: "Tottenham 2-2 Newcastle | Kịch tính đến phút 90+5", league: "Premier League", icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", views: "680K", time: "10:50", date: "3 ngày trước" },
];

export function HighlightsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Play className="w-7 h-7 text-primary" fill="currentColor" />
          <h1 className="text-3xl font-bold">Highlights</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((hl, i) => (
            <motion.div key={hl.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-xl overflow-hidden group cursor-pointer hover:border-primary/50 transition-all">
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-secondary to-background overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl">{hl.icon}</div>
                </div>
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/50">
                    <Play className="w-8 h-8 text-white" fill="white" />
                  </div>
                </div>
                {/* Duration */}
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs text-white font-semibold">
                  {hl.time}
                </div>
              </div>
              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">{hl.title}</h3>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span>{hl.icon}</span>
                    <span>{hl.league}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{hl.views}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{hl.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
