import { useBanners } from "@/app/hooks/useBanners";
import type { Banner } from "@/types";

// Default banners when no DB banners configured
const DEFAULT_LEFT: Banner[] = [
  { id: -1, position: "LEFT", imageUrl: "/banners/trai.png", linkUrl: "#", title: "Banner trái", isActive: true, sortOrder: 0, createdAt: "", updatedAt: "" },
];
const DEFAULT_RIGHT: Banner[] = [
  { id: -2, position: "RIGHT", imageUrl: "/banners/phai.png", linkUrl: "#", title: "Banner phải", isActive: true, sortOrder: 0, createdAt: "", updatedAt: "" },
];

function BannerColumn({ banners, side }: { banners: Banner[]; side: "left" | "right" }) {
  return (
    <div
      className={`hidden xl:flex flex-col gap-4 fixed top-1/2 -translate-y-1/2 z-20 ${
        side === "left" ? "left-2" : "right-2"
      }`}
      style={{ width: "160px" }}
    >
      {banners.map((banner) => (
        <a
          key={banner.id}
          href={banner.linkUrl || "#"}
          target={banner.linkUrl && banner.linkUrl !== "#" ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="block rounded-xl overflow-hidden border border-glass-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 group"
          title={banner.title}
        >
          <img
            src={banner.imageUrl}
            alt={banner.title || "Banner"}
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </a>
      ))}
    </div>
  );
}

export function AdBanners() {
  const { left, right } = useBanners();

  const leftBanners = left.length > 0 ? left : DEFAULT_LEFT;
  const rightBanners = right.length > 0 ? right : DEFAULT_RIGHT;

  return (
    <>
      <BannerColumn banners={leftBanners} side="left" />
      <BannerColumn banners={rightBanners} side="right" />
    </>
  );
}
