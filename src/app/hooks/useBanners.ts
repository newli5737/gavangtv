import { useState, useEffect, useCallback } from "react";
import type { Banner } from "@/types";

const API = "";

export function useBanners() {
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    fetch(`${API}/api/banners`)
      .then((r) => r.json())
      .then(setBanners)
      .catch(() => {});
  }, []);

  const left = banners.filter((b) => b.position === "LEFT");
  const right = banners.filter((b) => b.position === "RIGHT");

  return { banners, left, right };
}
