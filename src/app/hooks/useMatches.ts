import { useState, useEffect, useCallback } from "react";
import type { Match, Comment } from "@/types";

const API = "";

export function useMatches(status?: string) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMatches = useCallback(async () => {
    try {
      const url = status ? `${API}/api/matches?status=${status}` : `${API}/api/matches`;
      const res = await fetch(url);
      const data = await res.json();
      setMatches(data);
    } catch (err) {
      console.error("Failed to fetch matches:", err);
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => { fetchMatches(); }, [fetchMatches]);

  return { matches, loading, refetch: fetchMatches };
}

export function useMatch(slug: string | undefined) {
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`${API}/api/matches/${slug}`)
      .then((r) => r.json())
      .then(setMatch)
      .catch(() => setMatch(null))
      .finally(() => setLoading(false));
  }, [slug]);

  return { match, loading };
}

export function useMatchComments(slug: string | undefined) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    if (!slug) return;
    try {
      const res = await fetch(`${API}/api/matches/${slug}/comments`);
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => { fetchComments(); }, [fetchComments]);

  const sendComment = async (username: string, message: string) => {
    try {
      await fetch(`${API}/api/matches/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, message }),
      });
      await fetchComments();
    } catch (err) {
      console.error("Failed to send comment:", err);
    }
  };

  return { comments, loading, sendComment, refetch: fetchComments };
}
