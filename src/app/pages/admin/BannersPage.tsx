import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { Image, Plus, Trash2, ToggleLeft, ToggleRight, Save, ArrowUp, ArrowDown } from "lucide-react";
import { getAuthHeaders } from "@/app/hooks/useAuth";
import type { Banner, BannerPosition } from "@/types";

const API = "";

export function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  // Form state
  const [position, setPosition] = useState<BannerPosition>("LEFT");
  const [imageUrl, setImageUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [title, setTitle] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  const fetchBanners = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/admin/banners`, { headers: getAuthHeaders() });
      if (res.ok) setBanners(await res.json());
    } catch {} finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchBanners(); }, [fetchBanners]);

  const resetForm = () => {
    setEditId(null);
    setPosition("LEFT");
    setImageUrl("");
    setLinkUrl("");
    setTitle("");
    setSortOrder(0);
    setShowForm(false);
  };

  const handleEdit = (banner: Banner) => {
    setEditId(banner.id);
    setPosition(banner.position);
    setImageUrl(banner.imageUrl);
    setLinkUrl(banner.linkUrl);
    setTitle(banner.title);
    setSortOrder(banner.sortOrder);
    setShowForm(true);
  };

  const handleSave = async () => {
    const data = { position, imageUrl, linkUrl, title, sortOrder };
    const url = editId ? `${API}/api/admin/banners/${editId}` : `${API}/api/admin/banners`;
    const method = editId ? "PUT" : "POST";
    await fetch(url, { method, headers: getAuthHeaders(), body: JSON.stringify(data) });
    resetForm();
    fetchBanners();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Xóa banner này?")) return;
    await fetch(`${API}/api/admin/banners/${id}`, { method: "DELETE", headers: getAuthHeaders() });
    fetchBanners();
  };

  const handleToggle = async (banner: Banner) => {
    await fetch(`${API}/api/admin/banners/${banner.id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ isActive: !banner.isActive }),
    });
    fetchBanners();
  };

  const leftBanners = banners.filter((b) => b.position === "LEFT");
  const rightBanners = banners.filter((b) => b.position === "RIGHT");

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Image className="w-7 h-7 text-primary" />
          <h1 className="text-3xl font-bold">Quản lý Banner</h1>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all"
        >
          <Plus className="w-4 h-4" /> Thêm banner
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-glass-bg border border-glass-border rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">{editId ? "Sửa banner" : "Thêm banner mới"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Vị trí</label>
              <select value={position} onChange={(e) => setPosition(e.target.value as BannerPosition)}
                className="w-full px-3 py-2 bg-secondary/50 border border-glass-border rounded-lg text-sm">
                <option value="LEFT">Bên trái</option>
                <option value="RIGHT">Bên phải</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Thứ tự</label>
              <input type="number" value={sortOrder} onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-secondary/50 border border-glass-border rounded-lg text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-muted-foreground mb-1">URL ảnh</label>
              <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://... hoặc /banners/..."
                className="w-full px-3 py-2 bg-secondary/50 border border-glass-border rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Link khi click</label>
              <input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="https://..."
                className="w-full px-3 py-2 bg-secondary/50 border border-glass-border rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Tiêu đề</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Mô tả banner"
                className="w-full px-3 py-2 bg-secondary/50 border border-glass-border rounded-lg text-sm" />
            </div>
          </div>

          {/* Preview */}
          {imageUrl && (
            <div className="mt-4 p-4 bg-secondary/30 rounded-lg">
              <span className="text-xs text-muted-foreground mb-2 block">Xem trước:</span>
              <img src={imageUrl} alt="Preview" className="max-w-[160px] rounded-lg border border-glass-border" />
            </div>
          )}

          <div className="flex items-center gap-3 mt-4">
            <button onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-primary rounded-lg text-white text-sm font-semibold hover:bg-primary/80 transition-colors">
              <Save className="w-4 h-4" /> Lưu
            </button>
            <button onClick={resetForm}
              className="px-4 py-2 bg-secondary/50 rounded-lg text-sm hover:bg-secondary transition-colors">
              Hủy
            </button>
          </div>
        </motion.div>
      )}

      {/* Banner lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left banners */}
        <div className="bg-glass-bg border border-glass-border rounded-xl p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <ArrowUp className="w-4 h-4 text-primary rotate-[-90deg]" /> Banner trái
            <span className="text-xs text-muted-foreground">({leftBanners.length})</span>
          </h3>
          <div className="space-y-3">
            {leftBanners.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">Chưa có banner</p>}
            {leftBanners.map((b) => (
              <BannerItem key={b.id} banner={b} onEdit={handleEdit} onDelete={handleDelete} onToggle={handleToggle} />
            ))}
          </div>
        </div>

        {/* Right banners */}
        <div className="bg-glass-bg border border-glass-border rounded-xl p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            Banner phải <ArrowDown className="w-4 h-4 text-primary rotate-[-90deg]" />
            <span className="text-xs text-muted-foreground">({rightBanners.length})</span>
          </h3>
          <div className="space-y-3">
            {rightBanners.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">Chưa có banner</p>}
            {rightBanners.map((b) => (
              <BannerItem key={b.id} banner={b} onEdit={handleEdit} onDelete={handleDelete} onToggle={handleToggle} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BannerItem({ banner, onEdit, onDelete, onToggle }: {
  banner: Banner;
  onEdit: (b: Banner) => void;
  onDelete: (id: number) => void;
  onToggle: (b: Banner) => void;
}) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
      banner.isActive ? "bg-secondary/30 border-glass-border" : "bg-secondary/10 border-glass-border/30 opacity-50"
    }`}>
      <img src={banner.imageUrl} alt={banner.title} className="w-16 h-20 object-cover rounded-lg border border-glass-border" />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold truncate">{banner.title || "Không có tiêu đề"}</div>
        <div className="text-xs text-muted-foreground truncate">{banner.linkUrl || "Không có link"}</div>
        <div className="text-xs text-muted-foreground mt-1">Thứ tự: {banner.sortOrder}</div>
      </div>
      <div className="flex items-center gap-1">
        <button onClick={() => onToggle(banner)} className="p-2 rounded-lg hover:bg-secondary/50 transition-colors" title={banner.isActive ? "Tắt" : "Bật"}>
          {banner.isActive ? <ToggleRight className="w-5 h-5 text-green-400" /> : <ToggleLeft className="w-5 h-5 text-muted-foreground" />}
        </button>
        <button onClick={() => onEdit(banner)} className="p-2 rounded-lg hover:bg-secondary/50 transition-colors text-primary text-xs font-semibold">
          Sửa
        </button>
        <button onClick={() => onDelete(banner.id)} className="p-2 rounded-lg hover:bg-destructive/20 transition-colors">
          <Trash2 className="w-4 h-4 text-destructive" />
        </button>
      </div>
    </div>
  );
}
