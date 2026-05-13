import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Clock, User, TrendingUp, Share2, Bookmark } from "lucide-react";
import { articles } from "./NewsPage";

export function NewsDetailPage() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p className="text-muted-foreground text-lg">Không tìm thấy bài viết</p>
        <Link to="/news" className="text-primary hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Quay lại tin tức
        </Link>
      </div>
    );
  }

  // Related articles (same category, excluding current)
  const related = articles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero image */}
      <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <Link to="/news" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Quay lại tin tức
          </Link>
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${article.categoryColor}`}>{article.category}</span>
            {article.trending && (
              <>
                <TrendingUp className="w-4 h-4 text-live" />
                <span className="text-xs text-live font-semibold">Đang hot</span>
              </>
            )}
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-4xl font-bold mb-4 leading-tight"
          >
            {article.title}
          </motion.h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" /> {article.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {article.date}
            </span>
            <span>{article.readTime} đọc</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Action bar */}
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-glass-border">
            <button className="flex items-center gap-2 px-4 py-2 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors text-sm">
              <Share2 className="w-4 h-4" /> Chia sẻ
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors text-sm">
              <Bookmark className="w-4 h-4" /> Lưu bài
            </button>
          </div>

          {/* Excerpt */}
          <p className="text-lg text-foreground font-medium mb-6 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Article body */}
          <div className="prose prose-invert max-w-none">
            {article.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-5 text-base">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap mt-10 pt-6 border-t border-glass-border">
            <span className="text-sm text-muted-foreground">Tags:</span>
            <span className="px-3 py-1 bg-secondary/50 rounded-full text-xs">{article.category}</span>
            <span className="px-3 py-1 bg-secondary/50 rounded-full text-xs">Bóng đá</span>
            <span className="px-3 py-1 bg-secondary/50 rounded-full text-xs">Tin nóng</span>
          </div>
        </motion.div>

        {/* Related articles */}
        {related.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12"
          >
            <h2 className="text-xl font-bold mb-6">Tin tức liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((a) => (
                <Link key={a.id} to={`/news/${a.slug}`}>
                  <div className="bg-glass-bg border border-glass-border rounded-xl overflow-hidden hover:border-primary/50 transition-all group cursor-pointer h-full">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={a.image}
                        alt={a.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                    <div className="p-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${a.categoryColor}`}>{a.category}</span>
                      <h3 className="font-semibold text-sm mt-2 line-clamp-2 group-hover:text-primary transition-colors">{a.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                        <Clock className="w-3 h-3" /> {a.date}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
