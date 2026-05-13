import { Link } from "react-router";
import { motion } from "motion/react";
import { Newspaper, Clock, TrendingUp, ArrowRight } from "lucide-react";

export interface NewsArticle {
  id: number;
  slug: string;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  trending: boolean;
  author: string;
}

export const articles: NewsArticle[] = [
  {
    id: 1,
    slug: "man-united-bom-tan-mua-he-2026",
    category: "Chuyển nhượng",
    categoryColor: "text-orange-400 bg-orange-400/15",
    title: "Man United sắp hoàn tất thương vụ bom tấn mùa hè 2026",
    excerpt: "Theo nguồn tin từ Sky Sports, Manchester United đã đạt được thỏa thuận cá nhân với ngôi sao người Brazil.",
    content: `Manchester United đang tiến rất gần đến việc hoàn tất một thương vụ chuyển nhượng bom tấn trong mùa hè 2026. Theo nguồn tin từ Sky Sports, câu lạc bộ đã đạt được thỏa thuận cá nhân với ngôi sao người Brazil, và hiện đang trong giai đoạn đàm phán cuối cùng với đội bóng chủ quản.

Thương vụ này được đánh giá là một trong những vụ chuyển nhượng lớn nhất trong lịch sử Premier League, với mức phí chuyển nhượng ước tính lên đến 120 triệu bảng Anh.

HLV trưởng của Man United đã bày tỏ mong muốn có được sự phục vụ của cầu thủ này từ đầu mùa giải trước, và giờ đây ước mơ đó sắp thành hiện thực. Ban lãnh đạo câu lạc bộ đã làm việc không mệt mỏi để đưa ngôi sao này về Old Trafford.

Cầu thủ dự kiến sẽ ký hợp đồng 5 năm với mức lương khoảng 350.000 bảng/tuần, trở thành cầu thủ được trả lương cao nhất trong lịch sử câu lạc bộ.`,
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=450&fit=crop",
    date: "13/05/2026",
    readTime: "5 phút",
    trending: true,
    author: "GavangTV Sport",
  },
  {
    id: 2,
    slug: "arsenal-giu-vung-ngoi-dau",
    category: "Premier League",
    categoryColor: "text-purple-400 bg-purple-400/15",
    title: "Arsenal giữ vững ngôi đầu sau chiến thắng kịch tính",
    excerpt: "Bàn thắng phút bù giờ của Saka giúp Arsenal vượt qua Aston Villa 2-1.",
    content: `Arsenal tiếp tục duy trì vị trí dẫn đầu bảng xếp hạng Premier League sau chiến thắng kịch tính 2-1 trước Aston Villa tại sân Emirates.

Trận đấu diễn ra vô cùng căng thẳng khi Aston Villa mở tỷ số ngay từ phút thứ 15 nhờ pha dứt điểm chính xác. Arsenal đã nỗ lực tấn công và gỡ hòa 1-1 ở phút 67 nhờ công của Martinelli.

Bàn thắng quyết định đến ở phút 90+3 khi Bukayo Saka tung ra cú sút xa tuyệt đẹp, đưa bóng bay vào góc cao khung thành, mang về 3 điểm quý giá cho đội chủ nhà.

Với kết quả này, Arsenal tạm thời bỏ xa đối thủ cạnh tranh 2 điểm với chỉ còn 2 vòng đấu nữa là kết thúc mùa giải.`,
    image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&h=450&fit=crop",
    date: "13/05/2026",
    readTime: "3 phút",
    trending: true,
    author: "GavangTV Sport",
  },
  {
    id: 3,
    slug: "boc-tham-ban-ket-champions-league",
    category: "Champions League",
    categoryColor: "text-blue-400 bg-blue-400/15",
    title: "Bốc thăm bán kết Champions League: Cặp đấu hấp dẫn",
    excerpt: "UEFA đã tiến hành bốc thăm bán kết Champions League 2025/26.",
    content: `UEFA đã chính thức tiến hành lễ bốc thăm bán kết Champions League 2025/26, tạo nên những cặp đấu vô cùng hấp dẫn và đáng chờ đợi.

Cặp đấu đầu tiên sẽ là cuộc đối đầu giữa Real Madrid và Bayern Munich - hai gã khổng lồ của bóng đá châu Âu. Đây là lần thứ 5 trong 10 năm qua hai đội gặp nhau ở vòng knock-out Champions League.

Cặp đấu còn lại là Arsenal vs Barcelona, hứa hẹn sẽ là một cuộc chiến chiến thuật đỉnh cao. Cả hai đội đều đang có phong độ ấn tượng trong mùa giải này.

Các trận lượt đi sẽ diễn ra vào ngày 29-30/04, và lượt về vào ngày 06-07/05. Trận chung kết sẽ được tổ chức tại Munich vào ngày 31/05.`,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=450&fit=crop",
    date: "12/05/2026",
    readTime: "4 phút",
    trending: false,
    author: "GavangTV Sport",
  },
  {
    id: 4,
    slug: "barcelona-gia-han-lamine-yamal",
    category: "La Liga",
    categoryColor: "text-yellow-400 bg-yellow-400/15",
    title: "Barcelona gia hạn hợp đồng với Lamine Yamal đến 2032",
    excerpt: "Thần đồng 18 tuổi chính thức gia hạn, trở thành cầu thủ lương cao nhất CLB.",
    content: `FC Barcelona đã chính thức công bố việc gia hạn hợp đồng dài hạn với thần đồng Lamine Yamal đến năm 2032, kèm theo điều khoản giải phóng hợp đồng lên đến 1 tỷ euro.

Cầu thủ 18 tuổi người Tây Ban Nha đã có một mùa giải đột phá tại Camp Nou, ghi được 15 bàn thắng và có 12 kiến tạo trên mọi đấu trường. Yamal cũng là cầu thủ trẻ nhất ghi hat-trick trong lịch sử Champions League.

Chủ tịch Barcelona phát biểu: "Lamine Yamal là tương lai của bóng đá thế giới. Việc gia hạn hợp đồng này cho thấy cam kết của cả hai bên trong việc xây dựng một kỷ nguyên mới cho câu lạc bộ."

Với hợp đồng mới, Yamal sẽ nhận mức lương khoảng 200.000 euro/tuần, trở thành cầu thủ được trả lương cao nhất tại Barcelona.`,
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=450&fit=crop",
    date: "12/05/2026",
    readTime: "3 phút",
    trending: true,
    author: "GavangTV Sport",
  },
  {
    id: 5,
    slug: "inter-milan-vo-dich-serie-a",
    category: "Serie A",
    categoryColor: "text-green-400 bg-green-400/15",
    title: "Inter Milan vô địch Serie A lần thứ 3 liên tiếp",
    excerpt: "Chiến thắng 2-0 trước AC Milan giúp Inter đăng quang ngôi vô địch.",
    content: `Inter Milan đã chính thức giành chức vô địch Serie A lần thứ 3 liên tiếp sau chiến thắng thuyết phục 2-0 trước đối thủ cùng thành phố AC Milan trong trận Derby della Madonnina.

Lautaro Martinez và Barella là hai người ghi bàn cho Inter trong trận đấu có ý nghĩa quyết định. Chiến thắng này giúp Inter không thể bị bắt kịp trên bảng xếp hạng khi mùa giải chỉ còn 3 vòng đấu.

Đây là lần đầu tiên kể từ thời kỳ hoàng kim của Juventus (2012-2020), một đội bóng Serie A đạt được thành tích 3 chức vô địch liên tiếp. HLV trưởng Inter đã ca ngợi tinh thần đồng đội và sự hy sinh của các cầu thủ suốt cả mùa giải.

San Siro rực rỡ trong sắc xanh-đen khi 80.000 CĐV ăn mừng danh hiệu lịch sử.`,
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=450&fit=crop",
    date: "11/05/2026",
    readTime: "6 phút",
    trending: false,
    author: "GavangTV Sport",
  },
  {
    id: 6,
    slug: "doi-tuyen-viet-nam-trieu-tap",
    category: "V-League",
    categoryColor: "text-red-400 bg-red-400/15",
    title: "Đội tuyển Việt Nam triệu tập cho vòng loại World Cup",
    excerpt: "HLV công bố danh sách 28 cầu thủ cho 2 trận đấu vòng loại.",
    content: `Huấn luyện viên trưởng đội tuyển quốc gia Việt Nam đã chính thức công bố danh sách 28 cầu thủ được triệu tập chuẩn bị cho 2 trận đấu quan trọng tại vòng loại World Cup 2026.

Đội tuyển Việt Nam sẽ lần lượt đối đầu với Indonesia trên sân nhà (ngày 20/05) và Thái Lan trên sân khách (ngày 25/05). Cả hai trận đấu đều mang tính quyết định cho cơ hội đi tiếp của đội tuyển.

Danh sách triệu tập có sự trở lại của một số trụ cột quan trọng sau chấn thương, cùng với 3 gương mặt mới từ giải V-League. HLV cho biết đội đã có sự chuẩn bị kỹ lưỡng và tự tin vào kế hoạch thi đấu.

Các cầu thủ sẽ tập trung tại Trung tâm đào tạo bóng đá Việt Nam từ ngày 15/05 để chuẩn bị cho các trận đấu sắp tới.`,
    image: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800&h=450&fit=crop",
    date: "11/05/2026",
    readTime: "4 phút",
    trending: false,
    author: "GavangTV Sport",
  },
];

export function NewsPage() {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Newspaper className="w-7 h-7 text-primary" />
          <h1 className="text-3xl font-bold">Tin tức</h1>
        </div>

        {/* Featured article */}
        <Link to={`/news/${featured.slug}`}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-glass-bg border border-glass-border rounded-xl overflow-hidden mb-8 cursor-pointer hover:border-primary/50 transition-all group">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-video lg:aspect-auto relative overflow-hidden min-h-[280px]">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${featured.categoryColor}`}>{featured.category}</span>
                  <TrendingUp className="w-4 h-4 text-live" />
                  <span className="text-xs text-live font-semibold">Đang hot</span>
                </div>
                <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{featured.title}</h2>
                <p className="text-muted-foreground mb-4">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.date}</span>
                    <span>{featured.readTime}</span>
                  </div>
                  <span className="flex items-center gap-1 text-sm text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Đọc thêm <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Article grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((a, i) => (
            <Link key={a.id} to={`/news/${a.slug}`}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-glass-bg border border-glass-border rounded-xl overflow-hidden cursor-pointer hover:border-primary/50 transition-all group h-full">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={a.image}
                    alt={a.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  {a.trending && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-live/90 rounded-full">
                      <TrendingUp className="w-3 h-3 text-white" />
                      <span className="text-xs text-white font-semibold">Hot</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${a.categoryColor}`}>{a.category}</span>
                  </div>
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">{a.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{a.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" /><span>{a.date}</span><span>{a.readTime}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
