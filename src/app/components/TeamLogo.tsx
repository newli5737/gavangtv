import { useState, useEffect } from "react";

const cache: Record<string, string> = {};
const LS_KEY = "gavangtv_team_logos";

// Load from localStorage on init
try {
  const saved = localStorage.getItem(LS_KEY);
  if (saved) Object.assign(cache, JSON.parse(saved));
} catch {}

function saveCache() {
  try { localStorage.setItem(LS_KEY, JSON.stringify(cache)); } catch {}
}

// Alias map for common short names → full names TheSportsDB recognizes
const ALIASES: Record<string, string> = {
  "Man United": "Manchester United",
  "Man City": "Manchester City",
  "Inter Milan": "Inter",
  "Dortmund": "Borussia Dortmund",
  "AC Milan": "AC Milan",
  "PSG": "Paris Saint-Germain",
  "Bayern Munich": "FC Bayern Munich",
};

export function useTeamLogo(teamName: string | undefined): string | null {
  const [logo, setLogo] = useState<string | null>(teamName ? cache[teamName] || null : null);

  useEffect(() => {
    if (!teamName) return;
    if (cache[teamName]) { setLogo(cache[teamName]); return; }

    const searchName = ALIASES[teamName] || teamName;
    const url = `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(searchName)}`;

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (data.teams?.[0]?.strBadge) {
          const badge = data.teams[0].strBadge + "/preview";
          cache[teamName] = badge;
          saveCache();
          setLogo(badge);
        }
      })
      .catch(() => {});
  }, [teamName]);

  return logo;
}

interface TeamLogoProps {
  teamName: string;
  fallbackIcon?: string;
  className?: string;
}

export function TeamLogo({ teamName, fallbackIcon, className = "w-10 h-10" }: TeamLogoProps) {
  const logo = useTeamLogo(teamName);
  const [error, setError] = useState(false);

  if (logo && !error) {
    return (
      <img
        src={logo}
        alt={teamName}
        className={`${className} object-contain`}
        onError={() => setError(true)}
        loading="lazy"
      />
    );
  }

  if (fallbackIcon) {
    return <span className={className + " flex items-center justify-center text-2xl"}>{fallbackIcon}</span>;
  }

  return (
    <div className={`${className} rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-xs font-bold`}>
      {teamName.charAt(0)}
    </div>
  );
}
