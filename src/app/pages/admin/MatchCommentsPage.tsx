import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAdminMatch, useAdminViews, useAdminComments } from "@/app/hooks/useAdmin";
import { motion } from "motion/react";
import { ArrowLeft, Eye, Send, Trash2, UserCheck, Bot, Plus } from "lucide-react";

export function MatchCommentsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { match, loading } = useAdminMatch(id);
  const { updateViews } = useAdminViews(match?.id);
  const { comments, addComment, deleteComment } = useAdminComments(match?.id);

  const [fakeViews, setFakeViews] = useState(0);
  const [viewsSaved, setViewsSaved] = useState(false);
  const [newComment, setNewComment] = useState({ username: "", message: "", isVerified: false });
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkComments, setBulkComments] = useState("");

  useEffect(() => {
    if (match) setFakeViews(match.fakeViews);
  }, [match]);

  const handleSaveViews = async () => {
    await updateViews(fakeViews);
    setViewsSaved(true);
    setTimeout(() => setViewsSaved(false), 2000);
  };

  const handleAddComment = async () => {
    if (!newComment.username || !newComment.message) return;
    await addComment(newComment);
    setNewComment({ username: "", message: "", isVerified: false });
  };

  const handleBulkAdd = async () => {
    const lines = bulkComments.split("\n").filter((l) => l.trim());
    for (const line of lines) {
      const [username, ...msgParts] = line.split(":");
      if (username && msgParts.length) {
        await addComment({ username: username.trim(), message: msgParts.join(":").trim() });
      }
    }
    setBulkComments("");
    setBulkMode(false);
  };

  if (loading) return <div className="p-12 text-center text-muted-foreground">Đang tải...</div>;
  if (!match) return <div className="p-12 text-center text-muted-foreground">Không tìm thấy trận đấu</div>;

  return (
    <div className="max-w-4xl">
      <button onClick={() => navigate("/admin/matches")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
      </button>

      <h1 className="text-3xl font-bold mb-2">Bình luận & Lượt xem</h1>
      <p className="text-muted-foreground mb-8">
        {match.leagueIcon} {match.homeTeam} {match.homeScore} - {match.awayScore} {match.awayTeam}
      </p>

      {/* Views Controller */}
      <div className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Quản lý lượt xem</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-xs text-muted-foreground mb-1">Lượt xem ảo (hiển thị cho người dùng)</label>
            <input
              type="number"
              value={fakeViews}
              onChange={(e) => setFakeViews(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2.5 bg-secondary/50 border border-glass-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex items-end gap-3">
            <div className="text-center px-4 py-2 bg-secondary/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">{fakeViews.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Hiển thị</div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={handleSaveViews}
              className="px-5 py-2.5 bg-gradient-to-r from-primary to-accent rounded-xl text-white text-sm font-semibold shadow-lg shadow-primary/30"
            >
              {viewsSaved ? "✓ Đã lưu" : "Lưu"}
            </motion.button>
          </div>
        </div>
        {/* Quick buttons */}
        <div className="flex gap-2 mt-3">
          {[100, 500, 1000, 5000, 10000].map((n) => (
            <button key={n} onClick={() => setFakeViews((v) => v + n)}
              className="px-3 py-1 bg-secondary/50 rounded-lg text-xs font-medium hover:bg-secondary transition-colors">
              +{n.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Add Comment */}
      <div className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Thêm bình luận ảo</h2>
          <button onClick={() => setBulkMode(!bulkMode)}
            className="flex items-center gap-1 px-3 py-1.5 bg-secondary/50 rounded-lg text-xs font-medium hover:bg-secondary transition-colors">
            <Plus className="w-3 h-3" /> {bulkMode ? "Thêm từng cái" : "Thêm nhiều"}
          </button>
        </div>

        {bulkMode ? (
          <div>
            <p className="text-xs text-muted-foreground mb-2">Định dạng: tên: nội dung (mỗi dòng một bình luận)</p>
            <textarea
              value={bulkComments}
              onChange={(e) => setBulkComments(e.target.value)}
              rows={5}
              className="w-full px-4 py-2.5 bg-secondary/50 border border-glass-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              placeholder={"Fan_01: Great goal! 🔥\nViewer_99: Amazing match"}
            />
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={handleBulkAdd}
              className="mt-3 flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primary to-accent rounded-xl text-white text-sm font-semibold shadow-lg shadow-primary/30">
              <Send className="w-4 h-4" /> Thêm tất cả
            </motion.button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex gap-3">
              <input value={newComment.username} onChange={(e) => setNewComment({ ...newComment, username: e.target.value })}
                className="w-40 px-4 py-2.5 bg-secondary/50 border border-glass-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Tên người dùng" />
              <input value={newComment.message} onChange={(e) => setNewComment({ ...newComment, message: e.target.value })}
                className="flex-1 px-4 py-2.5 bg-secondary/50 border border-glass-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Nội dung bình luận..."
                onKeyDown={(e) => e.key === "Enter" && handleAddComment()} />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={newComment.isVerified}
                  onChange={(e) => setNewComment({ ...newComment, isVerified: e.target.checked })}
                  className="w-4 h-4 rounded accent-primary" />
                <span className="text-sm text-muted-foreground">Badge xác minh ✓</span>
              </label>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={handleAddComment}
                className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primary to-accent rounded-xl text-white text-sm font-semibold shadow-lg shadow-primary/30">
                <Send className="w-4 h-4" /> Thêm bình luận
              </motion.button>
            </div>
          </div>
        )}
      </div>

      {/* Comments List */}
      <div className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Bình luận ({comments.length})</h2>
        <div className="space-y-2">
          {comments.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Chưa có bình luận nào</p>
          ) : (
            comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start justify-between p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-xs font-bold mt-0.5">
                    {comment.username[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold">{comment.username}</span>
                      {comment.isVerified && <span className="text-xs text-primary">✓</span>}
                      {comment.isFake ? (
                        <span className="flex items-center gap-1 px-1.5 py-0.5 bg-accent/20 rounded text-xs text-accent">
                          <Bot className="w-3 h-3" /> ẢO
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-1.5 py-0.5 bg-green-500/20 rounded text-xs text-green-400">
                          <UserCheck className="w-3 h-3" /> THẬT
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-foreground/80">{comment.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(comment.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <button onClick={() => deleteComment(comment.id)}
                  className="p-1.5 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
