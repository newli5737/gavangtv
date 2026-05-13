import { Link, useLocation } from "react-router";
import { Search, User, Menu } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import logo from "@/assets/logo.png";

const menuItems = [
  { label: "Trang chủ", path: "/" },
  { label: "Trực tiếp", path: "/#live" },
  { label: "Lịch thi đấu", path: "/#fixtures" },
  { label: "Kết quả", path: "/#results" },
  { label: "Bảng xếp hạng", path: "/#standings" },
  { label: "Highlights", path: "/#highlights" },
  { label: "Tin tức", path: "/#news" },
  { label: "Tỷ lệ kèo", path: "/#betting" },
];

export function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-glass-bg border-b border-glass-border">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div whileHover={{ scale: 1.05 }}>
                <img src={logo} alt="GavangTV" className="w-10 h-10 rounded-lg" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                GavangTV
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <Search className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent rounded-lg text-white transition-all hover:shadow-lg hover:shadow-primary/50"
            >
              <User className="w-4 h-4" />
              <span className="text-sm">Đăng nhập</span>
            </motion.button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden border-t border-glass-border bg-glass-bg backdrop-blur-xl"
        >
          <div className="px-4 py-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-glass-border flex gap-2">
              <button className="flex-1 px-4 py-2 bg-secondary/50 rounded-lg text-sm">
                <Search className="w-4 h-4 mx-auto" />
              </button>
              <button className="flex-1 px-4 py-2 bg-gradient-to-r from-primary to-accent rounded-lg text-white text-sm">
                Đăng nhập
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
