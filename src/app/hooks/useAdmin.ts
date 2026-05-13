import { useState, useEffect, useCallback } from "react";
import { getAuthHeaders } from "./useAuth";
import type { Match, Comment, MatchEvent, AdminStats } from "@/types";

const API = "";

export function useAdminStats() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/admin/stats`, { headers: getAuthHeaders() });
      if (res.ok) setStats(await res.json());
    } catch {}
  }, []);
  useEffect(() => { fetchStats(); }, [fetchStats]);
  return { stats, refetch: fetchStats };
}

export function useAdminMatches(status?: string) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMatches = useCallback(async () => {
    try {
      const url = status ? `${API}/api/admin/matches?status=${status}` : `${API}/api/admin/matches`;
      const res = await fetch(url, { headers: getAuthHeaders() });
      if (res.ok) setMatches(await res.json());
    } catch {} finally { setLoading(false); }
  }, [status]);

  useEffect(() => { fetchMatches(); }, [fetchMatches]);

  const deleteMatch = async (id: number) => {
    await fetch(`${API}/api/admin/matches/${id}`, { method: "DELETE", headers: getAuthHeaders() });
    await fetchMatches();
  };

  return { matches, loading, refetch: fetchMatches, deleteMatch };
}

export function useAdminMatch(id: string | undefined) {
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    fetch(`${API}/api/admin/matches/${id}`, { headers: getAuthHeaders() })
      .then((r) => r.json()).then(setMatch).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  const saveMatch = async (data: Partial<Match>) => {
    const url = id ? `${API}/api/admin/matches/${id}` : `${API}/api/admin/matches`;
    const method = id ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: getAuthHeaders(), body: JSON.stringify(data) });
    return res.json();
  };

  return { match, loading, saveMatch };
}

export function useAdminViews(matchId: number | undefined) {
  const updateViews = async (fakeViews: number) => {
    if (!matchId) return;
    await fetch(`${API}/api/admin/matches/${matchId}/views`, {
      method: "PATCH", headers: getAuthHeaders(), body: JSON.stringify({ fakeViews }),
    });
  };
  return { updateViews };
}

export function useAdminComments(matchId: number | undefined) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    if (!matchId) return;
    try {
      const res = await fetch(`${API}/api/admin/matches/${matchId}/comments`, { headers: getAuthHeaders() });
      if (res.ok) setComments(await res.json());
    } catch {} finally { setLoading(false); }
  }, [matchId]);

  useEffect(() => { fetchComments(); }, [fetchComments]);

  const addComment = async (data: { username: string; message: string; isVerified?: boolean }) => {
    if (!matchId) return;
    await fetch(`${API}/api/admin/matches/${matchId}/comments`, {
      method: "POST", headers: getAuthHeaders(), body: JSON.stringify(data),
    });
    await fetchComments();
  };

  const deleteComment = async (commentId: number) => {
    await fetch(`${API}/api/admin/comments/${commentId}`, { method: "DELETE", headers: getAuthHeaders() });
    await fetchComments();
  };

  return { comments, loading, addComment, deleteComment, refetch: fetchComments };
}

export function useAdminEvents(matchId: number | undefined) {
  const addEvent = async (data: Partial<MatchEvent>) => {
    if (!matchId) return;
    await fetch(`${API}/api/admin/matches/${matchId}/events`, {
      method: "POST", headers: getAuthHeaders(), body: JSON.stringify(data),
    });
  };

  const deleteEvent = async (eventId: number) => {
    await fetch(`${API}/api/admin/events/${eventId}`, { method: "DELETE", headers: getAuthHeaders() });
  };

  return { addEvent, deleteEvent };
}
