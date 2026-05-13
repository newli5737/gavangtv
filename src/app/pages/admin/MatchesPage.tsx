import { useState } from "react";
import { useAdminMatches } from "@/app/hooks/useAdmin";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Plus, Pencil, MessageCircle, Trash2, Eye } from "lucide-react";
import type { MatchStatus } from "@/types";

const statusTabs: { label: string; value: string }[] = [
  { label: "Tất cả", value: "ALL" },
  { label: "🔴 Trực tiếp", value: "LIVE" },
  { label: "📅 Sắp tới", value: "UPCOMING" },
  { label: "✅ Kết thúc", value: "FINISHED" },
];

export function MatchesPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [deleting, setDeleting] = useState<number | null>(null);
  const { matches, loading, deleteMatch } = useAdminMatches(activeTab !== "ALL" ? activeTab : undefined);

  const handleDelete = async (id: number) => {
    if (!confirm("Xóa trận đấu này?")) return;
    setDeleting(id);
    await deleteMatch(id);
    setDeleting(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Quản lý trận đấu</h1>
        <Link to="/admin/matches/new">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-semibold shadow-lg shadow-primary/30"
          >
            <Plus className="w-4 h-4" />
            Tạo trận mới
          </motion.button>
        </Link>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex gap-2 mb-6 bg-secondary/30 p-1 rounded-xl w-fit">
        {statusTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === tab.value
                ? "bg-gradient-to-r from-primary to-accent text-white"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Matches Table */}
      <div className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-muted-foreground">Đang tải...</div>
        ) : matches.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">Không có trận đấu nào</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-glass-border">
                <th className="text-left text-xs font-semibold text-muted-foreground p-4">TRẬN ĐẤU</th>
                <th className="text-center text-xs font-semibold text-muted-foreground p-4">TỈ SỐ</th>
                <th className="text-center text-xs font-semibold text-muted-foreground p-4">TRẠNG THÁI</th>
                <th className="text-center text-xs font-semibold text-muted-foreground p-4">LƯỢT XEM</th>
                <th className="text-center text-xs font-semibold text-muted-foreground p-4">BÌNH LUẬN</th>
                <th className="text-right text-xs font-semibold text-muted-foreground p-4">HÀNH ĐỘNG</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match, i) => (
                <motion.tr
                  key={match.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="border-b border-glass-border/50 hover:bg-secondary/20 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{match.leagueIcon}</span>
                      <div>
                        <div className="font-semibold text-sm">{match.homeTeam} vs {match.awayTeam}</div>
                        <div className="text-xs text-muted-foreground">{match.league} • {match.minute}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center font-bold">{match.homeScore} - {match.awayScore}</td>
                  <td className="p-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      match.status === "LIVE" ? "bg-live/20 text-live" :
                      match.status === "UPCOMING" ? "bg-blue-500/20 text-blue-400" :
                      match.status === "FINISHED" ? "bg-muted text-muted-foreground" :
                      "bg-destructive/20 text-destructive"
                    }`}>
                      {match.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1 text-sm">
                      <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                      {match.fakeViews.toLocaleString()}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1 text-sm">
                      <MessageCircle className="w-3.5 h-3.5 text-muted-foreground" />
                      {match._count?.comments || 0}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/matches/${match.id}/edit`}>
                        <button className="p-2 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors" title="Sửa">
                          <Pencil className="w-4 h-4" />
                        </button>
                      </Link>
                      <Link to={`/admin/matches/${match.id}/comments`}>
                        <button className="p-2 rounded-lg hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors" title="Bình luận & Lượt xem">
                          <MessageCircle className="w-4 h-4" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(match.id)}
                        disabled={deleting === match.id}
                        className="p-2 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
