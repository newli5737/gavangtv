import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Users, Loader2 } from "lucide-react";
import { useMatch, useMatchComments } from "@/app/hooks/useMatches";
import { VideoPlayer } from "../components/VideoPlayer";
import { LiveChat } from "../components/LiveChat";
import { LiveMatchEvents } from "../components/LiveMatchEvents";

export function LivestreamPage() {
  const { slug } = useParams();
  const { match, loading } = useMatch(slug);
  const { comments, sendComment, refetch } = useMatchComments(slug);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Đang tải...</div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p className="text-muted-foreground">Không tìm thấy trận đấu</p>
        <Link to="/" className="text-primary hover:underline">← Về trang chủ</Link>
      </div>
    );
  }

  // Show spinner if not live or no stream
  const showSpinner = match.status !== "LIVE" || !match.hasStream;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-glass-bg border-b border-glass-border">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> Quay lại
            </Link>
            <div className="flex items-center gap-4">
              {match.status === "LIVE" && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-live/20 border border-live rounded-full">
                  <div className="w-2 h-2 bg-live rounded-full animate-pulse" />
                  <span className="text-sm text-live font-semibold">TRỰC TIẾP</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span className="font-semibold">{match.fakeViews.toLocaleString()}</span>
                <span>đang xem</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            {showSpinner ? (
              <div className="w-full aspect-video bg-black rounded-xl flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-16 h-16 text-primary animate-spin" />
                <p className="text-muted-foreground text-lg">
                  {match.status === "UPCOMING" ? "Sắp phát sóng..." : "Đang kết nối..."}
                </p>
                <p className="text-muted-foreground text-sm">
                  {match.homeTeam} vs {match.awayTeam}
                </p>
              </div>
            ) : (
              <VideoPlayer match={match} />
            )}

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{match.leagueIcon}</span>
                    <span className="text-sm text-muted-foreground">{match.league}</span>
                  </div>
                  <h2 className="text-2xl font-bold">{match.homeTeam} vs {match.awayTeam}</h2>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-4 mb-1">
                    <span className="text-4xl font-bold">{match.homeScore}</span>
                    <span className="text-2xl text-muted-foreground">-</span>
                    <span className="text-4xl font-bold">{match.awayScore}</span>
                  </div>
                  <div className="text-sm text-live font-semibold">{match.minute}</div>
                </div>
              </div>
            </motion.div>

            {match.events && match.events.length > 0 && (
              <LiveMatchEvents events={match.events} homeTeam={match.homeTeam} awayTeam={match.awayTeam} />
            )}
          </div>

          <div className="lg:col-span-1">
            <LiveChat
              comments={comments}
              onSendComment={sendComment}
              viewCount={match.fakeViews}
              onRefresh={refetch}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
