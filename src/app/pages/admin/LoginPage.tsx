import { useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import logo from "@/assets/logo.png";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const success = await login(username, password);
    setLoading(false);
    if (success) {
      navigate("/admin");
    } else {
      setError("Sai tên đăng nhập hoặc mật khẩu");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <img src={logo} alt="GavangTV" className="w-20 h-20 mx-auto mb-4 rounded-xl" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              GavangTV Admin
            </h1>
            <p className="text-sm text-muted-foreground mt-2">Đăng nhập để quản lý hệ thống</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-destructive/20 border border-destructive/50 rounded-lg text-sm text-destructive text-center">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-2">Tên đăng nhập</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-secondary/50 border border-glass-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="admin"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-secondary/50 border border-glass-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-semibold shadow-lg shadow-primary/30 disabled:opacity-50 transition-all"
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
