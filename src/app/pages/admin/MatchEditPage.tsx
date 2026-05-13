import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAdminMatch } from "@/app/hooks/useAdmin";
import { motion } from "motion/react";
import { ArrowLeft, Save } from "lucide-react";

const STATUS_OPTIONS = ["UPCOMING", "LIVE", "FINISHED", "CANCELLED"];
const LEAGUE_PRESETS = [
  { label: "Premier League", icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { label: "La Liga", icon: "🇪🇸" },
  { label: "Serie A", icon: "🇮🇹" },
  { label: "Bundesliga", icon: "🇩🇪" },
  { label: "Ligue 1", icon: "🇫🇷" },
  { label: "Champions League", icon: "⭐" },
  { label: "V-League", icon: "🇻🇳" },
];

export function MatchEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;
  const { match, loading, saveMatch } = useAdminMatch(id);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    league: "", leagueIcon: "⚽",
    homeTeam: "", homeIcon: "🔴", homeScore: 0,
    awayTeam: "", awayIcon: "🔵", awayScore: 0,
    minute: "0'", status: "UPCOMING" as string,
    hasStream: false, matchDate: new Date().toISOString().slice(0, 16),
  });

  useEffect(() => {
    if (match) {
      setForm({
        league: match.league, leagueIcon: match.leagueIcon,
        homeTeam: match.homeTeam, homeIcon: match.homeIcon, homeScore: match.homeScore,
        awayTeam: match.awayTeam, awayIcon: match.awayIcon, awayScore: match.awayScore,
        minute: match.minute, status: match.status,
        hasStream: match.hasStream,
        matchDate: new Date(match.matchDate).toISOString().slice(0, 16),
      });
    }
  }, [match]);

  const handleSave = async () => {
    if (!form.homeTeam || !form.awayTeam || !form.league) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }
    setSaving(true);
    try {
      await saveMatch(form);
      navigate("/admin/matches");
    } catch {
      alert("Lỗi khi lưu trận đấu");
    }
    setSaving(false);
  };

  const setPresetLeague = (preset: typeof LEAGUE_PRESETS[0]) => {
    setForm((f) => ({ ...f, league: preset.label, leagueIcon: preset.icon }));
  };

  if (!isNew && loading) return <div className="p-12 text-center text-muted-foreground">Đang tải...</div>;

  return (
    <div className="max-w-3xl">
      <button onClick={() => navigate("/admin/matches")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Quay lại danh sách
      </button>

      <h1 className="text-3xl font-bold mb-8">{isNew ? "Tạo trận đấu" : "Sửa trận đấu"}</h1>

      <div className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-xl p-6 space-y-6">
        {/* League */}
        <div>
          <label className="block text-sm font-medium mb-2">Giải đấu</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {LEAGUE_PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => setPresetLeague(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  form.league === p.label ? "bg-primary/20 text-primary border border-primary/30" : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {p.icon} {p.label}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <input value={form.league} onChange={(e) => setForm({ ...form, league: e.target.value })}
              className="flex-1 px-4 py-2.5 bg-secondary/50 border border-glass-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Tên giải" />
            <input value={form.leagueIcon} onChange={(e) => setForm({ ...form, leagueIcon: e.target.value })}
              className="w-20 px-4 py-2.5 bg-secondary/50 border border-glass-border rounded-xl text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Biểu tượng" />
          </div>
        </div>

        {/* Teams */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Đội nhà</label>
            <input value={form.homeTeam} onChange={(e) => setForm({ ...form, homeTeam: e.target.value })}
              className="w-full px-4 py-2.5 bg-secondary/50 border border-glass-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Tên đội" />
            <div className="flex gap-2 mt-2">
              <input value={form.homeIcon} onChange={(e) => setForm({ ...form, homeIcon: e.target.value })}
                className="w-20 px-3 py-2 bg-secondary/50 border border-glass-border rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Icon" />
              <input type="number" value={form.homeScore} onChange={(e) => setForm({ ...form, homeScore: parseInt(e.target.value) || 0 })}
                className="w-20 px-3 py-2 bg-secondary/50 border border-glass-border rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Đội khách</label>
            <input value={form.awayTeam} onChange={(e) => setForm({ ...form, awayTeam: e.target.value })}
              className="w-full px-4 py-2.5 bg-secondary/50 border border-glass-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Tên đội" />
            <div className="flex gap-2 mt-2">
              <input value={form.awayIcon} onChange={(e) => setForm({ ...form, awayIcon: e.target.value })}
                className="w-20 px-3 py-2 bg-secondary/50 border border-glass-border rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Icon" />
              <input type="number" value={form.awayScore} onChange={(e) => setForm({ ...form, awayScore: parseInt(e.target.value) || 0 })}
                className="w-20 px-3 py-2 bg-secondary/50 border border-glass-border rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>
        </div>

        {/* Status, Minute, Stream, Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Trạng thái</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full px-4 py-2.5 bg-secondary/50 border border-glass-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phút</label>
            <input value={form.minute} onChange={(e) => setForm({ ...form, minute: e.target.value })}
              className="w-full px-4 py-2.5 bg-secondary/50 border border-glass-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="67'" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Ngày thi đấu</label>
            <input type="datetime-local" value={form.matchDate} onChange={(e) => setForm({ ...form, matchDate: e.target.value })}
              className="w-full px-4 py-2.5 bg-secondary/50 border border-glass-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-3 px-4 py-2.5 bg-secondary/50 border border-glass-border rounded-xl cursor-pointer w-full">
              <input type="checkbox" checked={form.hasStream} onChange={(e) => setForm({ ...form, hasStream: e.target.checked })}
                className="w-4 h-4 rounded accent-primary" />
              <span className="text-sm font-medium">Có phát sóng</span>
            </label>
          </div>
        </div>

        {/* Slug Preview */}
        {form.homeTeam && form.awayTeam && (
          <div className="p-3 bg-secondary/30 rounded-lg">
            <span className="text-xs text-muted-foreground">Xem trước đường dẫn: </span>
            <span className="text-xs font-mono text-primary">
              {form.homeTeam.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-vs-{form.awayTeam.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
            </span>
          </div>
        )}

        {/* Save */}
        <div className="flex justify-end gap-3 pt-4 border-t border-glass-border">
          <button onClick={() => navigate("/admin/matches")}
            className="px-6 py-2.5 bg-secondary/50 rounded-xl text-sm font-medium hover:bg-secondary transition-colors">Hủy</button>
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-semibold shadow-lg shadow-primary/30 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Đang lưu..." : isNew ? "Tạo trận đấu" : "Lưu thay đổi"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
