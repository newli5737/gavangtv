import { Outlet } from "react-router";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { AdBanners } from "./AdBanners";

export function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <AdBanners />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
