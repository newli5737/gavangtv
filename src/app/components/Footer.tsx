import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-glass-bg border-t border-glass-border backdrop-blur-xl mt-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="GavangTV" className="w-8 h-8 rounded-lg" />
              <span className="font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                GavangTV
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Điểm đến tối ưu của bạn cho tỷ số bóng đá trực tiếp, phát sóng và thống kê trận đấu.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/#live" className="hover:text-primary transition-colors">Trực tiếp</a></li>
              <li><a href="/#fixtures" className="hover:text-primary transition-colors">Lịch thi đấu</a></li>
              <li><a href="/#standings" className="hover:text-primary transition-colors">Bảng xếp hạng</a></li>
              <li><a href="/#highlights" className="hover:text-primary transition-colors">Highlights</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Pháp lý</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/terms" className="hover:text-primary transition-colors">Điều khoản dịch vụ</a></li>
              <li><a href="/privacy" className="hover:text-primary transition-colors">Chính sách bảo mật</a></li>
              <li><a href="/dmca" className="hover:text-primary transition-colors">DMCA</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors">Liên hệ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Theo dõi</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary/50 hover:bg-primary transition-colors flex items-center justify-center group">
                <Facebook className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary/50 hover:bg-primary transition-colors flex items-center justify-center group">
                <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary/50 hover:bg-primary transition-colors flex items-center justify-center group">
                <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary/50 hover:bg-primary transition-colors flex items-center justify-center group">
                <Youtube className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-glass-border text-center text-sm text-muted-foreground">
          <p>&copy; 2026 GavangTV. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
