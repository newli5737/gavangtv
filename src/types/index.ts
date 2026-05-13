export type MatchStatus = "UPCOMING" | "LIVE" | "FINISHED" | "CANCELLED";

export interface Match {
  id: number;
  slug: string;
  league: string;
  leagueIcon: string;
  homeTeam: string;
  homeIcon: string;
  homeScore: number;
  awayTeam: string;
  awayIcon: string;
  awayScore: number;
  minute: string;
  status: MatchStatus;
  hasStream: boolean;
  fakeViews: number;
  matchDate: string;
  createdAt: string;
  updatedAt: string;
  comments?: Comment[];
  events?: MatchEvent[];
  _count?: { comments: number; events: number };
}

export interface Comment {
  id: number;
  matchId: number;
  username: string;
  message: string;
  isVerified: boolean;
  isFake: boolean;
  createdAt: string;
}

export interface MatchEvent {
  id: number;
  matchId: number;
  time: string;
  type: string;
  team: string | null;
  player: string | null;
  description: string;
  createdAt: string;
}

export interface AdminStats {
  totalMatches: number;
  liveMatches: number;
  totalViews: number;
  totalComments: number;
}
