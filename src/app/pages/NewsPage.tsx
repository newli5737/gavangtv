import { motion } from "motion/react";
import { Newspaper, Clock, TrendingUp } from "lucide-react";

const articles = [
  { id: 1, category: "Chuyển nhượng", title: "Man United sắp hoàn tất thương vụ bom tấn mùa hè 2026", excerpt: "Theo nguồn tin từ Sky Sports, Manchester United đã đạt được thỏa thuận cá nhân với ngôi sao người Brazil.", date: "13/05/2026", readTime: "5 phút", trending: true },
  { id: 2, category: "Premier League", title: "Arsenal giữ vững ngôi đầu sau chiến thắng kịch tính", excerpt: "Bàn thắng phút bù giờ của Saka giúp Arsenal vượt qua Aston Villa 2-1.", date: "13/05/2026", readTime: "3 phút", trending: true },
  { id: 3, category: "Champions League", title: "Bốc thăm bán kết Champions League: Cặp đấu hấp dẫn", excerpt: "UEFA đã tiến hành bốc thăm bán kết Champions League 2025/26.", date: "12/05/2026", readTime: "4 phút", trending: false },
  { id: 4, category: "La Liga", title: "Barcelona gia hạn hợp đồng với Lamine Yamal đến 2032", excerpt: "Thần đồng 18 tuổi chính thức gia hạn, trở thành cầu thủ lương cao nhất CLB.", date: "12/05/2026", readTime: "3 phút", trending: true },
  { id: 5, category: "Serie A", title: "Inter Milan vô địch Serie A lần thứ 3 liên tiếp", excerpt: "Chiến thắng 2-0 trước AC Milan giúp Inter đăng quang ngôi vô địch.", date: "11/05/2026", readTime: "6 phút", trending: false },
  { id: 6, category: "V-League", title: "Đội tuyển Việt Nam triệu tập cho vòng loại World Cup", excerpt: "HLV công bố danh sách 28 cầu thủ cho 2 trận đấu vòng loại.", date: "11/05/2026", readTime: "4 phút", trending: false },
];

export function NewsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Newspaper className="w-7 h-7 text-primary" />
          <h1 className="text-3xl font-bold">Tin tức</h1>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-glass-bg border border-glass-border rounded-xl overflow-hidden mb-8 cursor-pointer hover:border-primary/50 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="aspect-video lg:aspect-auto bg-gradient-to-br from-primary/20 via-secondary to-accent/20 flex items-center justify-center min-h-[280px]">
              <div className="text-8xl">⚽</div>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-semibold">{articles[0].category}</span>
                <TrendingUp className="w-4 h-4 text-live" />
                <span className="text-xs text-live font-semibold">Đang hot</span>
              </div>
              <h2 className="text-2xl font-bold mb-4">{articles[0].title}</h2>
              <p className="text-muted-foreground mb-4">{articles[0].excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{articles[0].date}</span>
                <span>{articles[0].readTime}</span>
              </div>
            </div>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(1).map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-glass-bg border border-glass-border rounded-xl overflow-hidden cursor-pointer hover:border-primary/50 transition-all group">
              <div className="aspect-video bg-gradient-to-br from-secondary to-background flex items-center justify-center">
                <Newspaper className="w-12 h-12 text-muted-foreground/30 group-hover:text-primary/50 transition-colors" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-secondary/50 rounded text-xs font-medium">{a.category}</span>
                  {a.trending && <TrendingUp className="w-3 h-3 text-live" />}
                </div>
                <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">{a.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{a.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" /><span>{a.date}</span><span>{a.readTime}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
