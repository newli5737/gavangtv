import { useState } from "react";

// football-data.org crests — publicly accessible, no API key needed
const TEAM_LOGOS: Record<string, string> = {
  // Premier League
  "Arsenal": "https://crests.football-data.org/57.png",
  "Aston Villa": "https://crests.football-data.org/58.png",
  "Chelsea": "https://crests.football-data.org/61.png",
  "Everton": "https://crests.football-data.org/62.png",
  "Liverpool": "https://crests.football-data.org/64.png",
  "Man City": "https://crests.football-data.org/65.png",
  "Manchester City": "https://crests.football-data.org/65.png",
  "Man United": "https://crests.football-data.org/66.png",
  "Manchester United": "https://crests.football-data.org/66.png",
  "Man Utd": "https://crests.football-data.org/66.png",
  "Newcastle": "https://crests.football-data.org/67.png",
  "Newcastle United": "https://crests.football-data.org/67.png",
  "Newcastle Utd": "https://crests.football-data.org/67.png",
  "Tottenham": "https://crests.football-data.org/73.png",
  "Tottenham Hotspur": "https://crests.football-data.org/73.png",
  "Spurs": "https://crests.football-data.org/73.png",
  "West Ham": "https://crests.football-data.org/563.png",
  "West Ham United": "https://crests.football-data.org/563.png",
  "Brighton": "https://crests.football-data.org/397.png",
  "Brighton & Hove Albion": "https://crests.football-data.org/397.png",
  "Wolverhampton": "https://crests.football-data.org/76.png",
  "Wolverhampton Wanderers": "https://crests.football-data.org/76.png",
  "Wolves": "https://crests.football-data.org/76.png",
  "Crystal Palace": "https://crests.football-data.org/354.png",
  "Fulham": "https://crests.football-data.org/63.png",
  "Bournemouth": "https://crests.football-data.org/1044.png",
  "AFC Bournemouth": "https://crests.football-data.org/1044.png",
  "Nottingham Forest": "https://crests.football-data.org/351.png",
  "Nott'm Forest": "https://crests.football-data.org/351.png",
  "Brentford": "https://crests.football-data.org/402.png",
  "Leicester": "https://crests.football-data.org/338.png",
  "Leicester City": "https://crests.football-data.org/338.png",
  "Southampton": "https://crests.football-data.org/340.png",
  "Ipswich": "https://crests.football-data.org/349.png",
  "Ipswich Town": "https://crests.football-data.org/349.png",
  "Burnley": "https://crests.football-data.org/328.png",
  "Luton": "https://crests.football-data.org/389.png",
  "Luton Town": "https://crests.football-data.org/389.png",
  "Sheffield United": "https://crests.football-data.org/356.png",
  "Sheffield Utd": "https://crests.football-data.org/356.png",
  "Leeds": "https://crests.football-data.org/341.png",
  "Leeds United": "https://crests.football-data.org/341.png",
  "West Brom": "https://crests.football-data.org/74.png",
  "West Bromwich": "https://crests.football-data.org/74.png",

  // La Liga
  "Barcelona": "https://crests.football-data.org/81.png",
  "FC Barcelona": "https://crests.football-data.org/81.png",
  "Barca": "https://crests.football-data.org/81.png",
  "Real Madrid": "https://crests.football-data.org/86.png",
  "Atletico Madrid": "https://crests.football-data.org/78.png",
  "Atlético Madrid": "https://crests.football-data.org/78.png",
  "Atletico": "https://crests.football-data.org/78.png",
  "Athletic Bilbao": "https://crests.football-data.org/77.png",
  "Athletic Club": "https://crests.football-data.org/77.png",
  "Sevilla": "https://crests.football-data.org/559.png",
  "Sevilla FC": "https://crests.football-data.org/559.png",
  "Real Sociedad": "https://crests.football-data.org/92.png",
  "Villarreal": "https://crests.football-data.org/94.png",
  "Villarreal CF": "https://crests.football-data.org/94.png",
  "Real Betis": "https://crests.football-data.org/90.png",
  "Betis": "https://crests.football-data.org/90.png",
  "Valencia": "https://crests.football-data.org/95.png",
  "Valencia CF": "https://crests.football-data.org/95.png",
  "Celta Vigo": "https://crests.football-data.org/558.png",
  "Celta": "https://crests.football-data.org/558.png",
  "Girona": "https://crests.football-data.org/298.png",
  "Girona FC": "https://crests.football-data.org/298.png",
  "Mallorca": "https://crests.football-data.org/89.png",
  "Getafe": "https://crests.football-data.org/82.png",
  "Osasuna": "https://crests.football-data.org/79.png",
  "Rayo Vallecano": "https://crests.football-data.org/87.png",
  "Las Palmas": "https://crests.football-data.org/275.png",
  "Alaves": "https://crests.football-data.org/263.png",
  "Cadiz": "https://crests.football-data.org/264.png",
  "Almeria": "https://crests.football-data.org/267.png",
  "Granada": "https://crests.football-data.org/83.png",
  "Espanyol": "https://crests.football-data.org/80.png",
  "Leganes": "https://crests.football-data.org/745.png",
  "Real Valladolid": "https://crests.football-data.org/250.png",

  // Serie A
  "AC Milan": "https://crests.football-data.org/98.png",
  "Milan": "https://crests.football-data.org/98.png",
  "Inter Milan": "https://crests.football-data.org/108.png",
  "Inter": "https://crests.football-data.org/108.png",
  "Internazionale": "https://crests.football-data.org/108.png",
  "Juventus": "https://crests.football-data.org/109.png",
  "Juve": "https://crests.football-data.org/109.png",
  "Napoli": "https://crests.football-data.org/113.png",
  "SSC Napoli": "https://crests.football-data.org/113.png",
  "AS Roma": "https://crests.football-data.org/100.png",
  "Roma": "https://crests.football-data.org/100.png",
  "Lazio": "https://crests.football-data.org/110.png",
  "SS Lazio": "https://crests.football-data.org/110.png",
  "Atalanta": "https://crests.football-data.org/102.png",
  "Fiorentina": "https://crests.football-data.org/99.png",
  "ACF Fiorentina": "https://crests.football-data.org/99.png",
  "Bologna": "https://crests.football-data.org/103.png",
  "Torino": "https://crests.football-data.org/586.png",
  "Monza": "https://crests.football-data.org/5911.png",
  "Udinese": "https://crests.football-data.org/115.png",
  "Sassuolo": "https://crests.football-data.org/471.png",
  "Empoli": "https://crests.football-data.org/4969.png",
  "Cagliari": "https://crests.football-data.org/104.png",
  "Genoa": "https://crests.football-data.org/107.png",
  "Lecce": "https://crests.football-data.org/5890.png",
  "Verona": "https://crests.football-data.org/450.png",
  "Hellas Verona": "https://crests.football-data.org/450.png",
  "Salernitana": "https://crests.football-data.org/455.png",
  "Frosinone": "https://crests.football-data.org/470.png",
  "Parma": "https://crests.football-data.org/112.png",
  "Como": "https://crests.football-data.org/1106.png",
  "Venezia": "https://crests.football-data.org/454.png",

  // Bundesliga
  "Bayern Munich": "https://crests.football-data.org/5.png",
  "Bayern": "https://crests.football-data.org/5.png",
  "FC Bayern Munich": "https://crests.football-data.org/5.png",
  "FC Bayern": "https://crests.football-data.org/5.png",
  "Dortmund": "https://crests.football-data.org/4.png",
  "Borussia Dortmund": "https://crests.football-data.org/4.png",
  "BVB": "https://crests.football-data.org/4.png",
  "RB Leipzig": "https://crests.football-data.org/721.png",
  "Leipzig": "https://crests.football-data.org/721.png",
  "Bayer Leverkusen": "https://crests.football-data.org/3.png",
  "Leverkusen": "https://crests.football-data.org/3.png",
  "Eintracht Frankfurt": "https://crests.football-data.org/19.png",
  "Frankfurt": "https://crests.football-data.org/19.png",
  "Union Berlin": "https://crests.football-data.org/7.png",
  "Freiburg": "https://crests.football-data.org/17.png",
  "SC Freiburg": "https://crests.football-data.org/17.png",
  "VfB Stuttgart": "https://crests.football-data.org/10.png",
  "Stuttgart": "https://crests.football-data.org/10.png",
  "Wolfsburg": "https://crests.football-data.org/11.png",
  "VfL Wolfsburg": "https://crests.football-data.org/11.png",
  "Borussia Monchengladbach": "https://crests.football-data.org/18.png",
  "Monchengladbach": "https://crests.football-data.org/18.png",
  "Gladbach": "https://crests.football-data.org/18.png",
  "Mainz": "https://crests.football-data.org/15.png",
  "Mainz 05": "https://crests.football-data.org/15.png",
  "Werder Bremen": "https://crests.football-data.org/12.png",
  "Bremen": "https://crests.football-data.org/12.png",
  "Hoffenheim": "https://crests.football-data.org/2.png",
  "TSG Hoffenheim": "https://crests.football-data.org/2.png",
  "Augsburg": "https://crests.football-data.org/16.png",
  "FC Augsburg": "https://crests.football-data.org/16.png",
  "Bochum": "https://crests.football-data.org/36.png",
  "VfL Bochum": "https://crests.football-data.org/36.png",
  "Heidenheim": "https://crests.football-data.org/44.png",
  "Darmstadt": "https://crests.football-data.org/55.png",
  "Koln": "https://crests.football-data.org/1.png",
  "FC Koln": "https://crests.football-data.org/1.png",
  "Cologne": "https://crests.football-data.org/1.png",
  "St. Pauli": "https://crests.football-data.org/20.png",
  "Holstein Kiel": "https://crests.football-data.org/720.png",

  // Ligue 1
  "PSG": "https://crests.football-data.org/524.png",
  "Paris Saint-Germain": "https://crests.football-data.org/524.png",
  "Paris SG": "https://crests.football-data.org/524.png",
  "Marseille": "https://crests.football-data.org/516.png",
  "Olympique Marseille": "https://crests.football-data.org/516.png",
  "OM": "https://crests.football-data.org/516.png",
  "Lyon": "https://crests.football-data.org/523.png",
  "Olympique Lyon": "https://crests.football-data.org/523.png",
  "Olympique Lyonnais": "https://crests.football-data.org/523.png",
  "OL": "https://crests.football-data.org/523.png",
  "Monaco": "https://crests.football-data.org/548.png",
  "AS Monaco": "https://crests.football-data.org/548.png",
  "Lille": "https://crests.football-data.org/521.png",
  "LOSC Lille": "https://crests.football-data.org/521.png",
  "Nice": "https://crests.football-data.org/522.png",
  "OGC Nice": "https://crests.football-data.org/522.png",
  "Lens": "https://crests.football-data.org/546.png",
  "RC Lens": "https://crests.football-data.org/546.png",
  "Rennes": "https://crests.football-data.org/529.png",
  "Stade Rennais": "https://crests.football-data.org/529.png",
  "Strasbourg": "https://crests.football-data.org/526.png",
  "RC Strasbourg": "https://crests.football-data.org/526.png",
  "Montpellier": "https://crests.football-data.org/518.png",
  "Nantes": "https://crests.football-data.org/543.png",
  "FC Nantes": "https://crests.football-data.org/543.png",
  "Toulouse": "https://crests.football-data.org/511.png",
  "Brest": "https://crests.football-data.org/512.png",
  "Stade Brestois": "https://crests.football-data.org/512.png",
  "Reims": "https://crests.football-data.org/547.png",
  "Stade de Reims": "https://crests.football-data.org/547.png",

  // Portuguese Liga
  "Porto": "https://crests.football-data.org/503.png",
  "FC Porto": "https://crests.football-data.org/503.png",
  "Benfica": "https://crests.football-data.org/1903.png",
  "SL Benfica": "https://crests.football-data.org/1903.png",
  "Sporting CP": "https://crests.football-data.org/498.png",
  "Sporting": "https://crests.football-data.org/498.png",
  "Sporting Lisbon": "https://crests.football-data.org/498.png",
  "Braga": "https://crests.football-data.org/5531.png",
  "SC Braga": "https://crests.football-data.org/5531.png",

  // Eredivisie
  "Ajax": "https://crests.football-data.org/678.png",
  "AFC Ajax": "https://crests.football-data.org/678.png",
  "PSV": "https://crests.football-data.org/674.png",
  "PSV Eindhoven": "https://crests.football-data.org/674.png",
  "Feyenoord": "https://crests.football-data.org/675.png",

  // Turkish Super Lig
  "Galatasaray": "https://crests.football-data.org/612.png",
  "Fenerbahce": "https://crests.football-data.org/611.png",
  "Fenerbahçe": "https://crests.football-data.org/611.png",
  "Besiktas": "https://crests.football-data.org/610.png",
  "Beşiktaş": "https://crests.football-data.org/610.png",
  "Trabzonspor": "https://crests.football-data.org/614.png",

  // Scottish Premiership
  "Celtic": "https://crests.football-data.org/732.png",
  "Rangers": "https://crests.football-data.org/738.png",

  // International
  "Vietnam": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/40px-Flag_of_Vietnam.svg.png",
  "Thailand": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_Thailand.svg/40px-Flag_of_Thailand.svg.png",
  "Indonesia": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/40px-Flag_of_Indonesia.svg.png",
  "Malaysia": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Flag_of_Malaysia.svg/40px-Flag_of_Malaysia.svg.png",
  "Philippines": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Flag_of_the_Philippines.svg/40px-Flag_of_the_Philippines.svg.png",
  "Singapore": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Singapore.svg/40px-Flag_of_Singapore.svg.png",
  "Myanmar": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Flag_of_Myanmar.svg/40px-Flag_of_Myanmar.svg.png",
  "Cambodia": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_Cambodia.svg/40px-Flag_of_Cambodia.svg.png",
};

// Build a normalized lookup map for fuzzy matching
const NORMALIZED_LOGOS: Record<string, string> = {};
for (const [key, url] of Object.entries(TEAM_LOGOS)) {
  NORMALIZED_LOGOS[key.toLowerCase().trim()] = url;
}

export function getTeamLogoUrl(teamName: string): string | null {
  if (!teamName) return null;

  const normalized = teamName.toLowerCase().trim();

  // 1. Exact match (case-insensitive)
  if (NORMALIZED_LOGOS[normalized]) {
    return NORMALIZED_LOGOS[normalized];
  }

  // 2. Try removing common suffixes like "FC", "CF", "SC"
  const withoutSuffix = normalized.replace(/\s+(fc|cf|sc|afc|ssc|acf)$/i, "").trim();
  if (NORMALIZED_LOGOS[withoutSuffix]) {
    return NORMALIZED_LOGOS[withoutSuffix];
  }

  // 3. Try removing common prefixes like "FC", "CF"
  const withoutPrefix = normalized.replace(/^(fc|cf|sc|afc)\s+/i, "").trim();
  if (NORMALIZED_LOGOS[withoutPrefix]) {
    return NORMALIZED_LOGOS[withoutPrefix];
  }

  // 4. Substring match — check if any key is contained in the team name or vice versa
  for (const [key, url] of Object.entries(NORMALIZED_LOGOS)) {
    if (key.length >= 4 && (normalized.includes(key) || key.includes(normalized))) {
      return url;
    }
  }

  return null;
}

interface TeamLogoProps {
  teamName: string;
  fallbackIcon?: string;
  className?: string;
}

export function TeamLogo({ teamName, fallbackIcon, className = "w-10 h-10" }: TeamLogoProps) {
  const logoUrl = getTeamLogoUrl(teamName);
  const [error, setError] = useState(false);

  if (logoUrl && !error) {
    return (
      <img
        src={logoUrl}
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
