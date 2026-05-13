import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "@/app/hooks/useAuth";
import { useEffect } from "react";
import { LayoutDashboard, Trophy, LogOut } from "lucide-react";
import { motion } from "motion/react";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Tổng quan", path: "/admin", icon: LayoutDashboard },
  { label: "Trận đấu", path: "/admin/matches", icon: Trophy },
];

export function AdminLayout() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) navigate("/admin/login");
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const handleLogout = () => { logout(); navigate("/admin/login"); };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-glass-bg border-r border-glass-border backdrop-blur-xl flex flex-col fixed h-full z-30">
        <div className="p-5 border-b border-glass-border">
          <Link to="/admin" className="flex items-center gap-3">
            <img src={logo} alt="GavangTV" className="w-10 h-10 rounded-lg" />
            <div>
              <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                GavangTV
              </span>
              <span className="block text-xs text-muted-foreground">Quản trị</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path !== "/admin" && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-glass-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all w-full"
          >
            <LogOut className="w-5 h-5" />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="p-6 lg:p-8"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}
