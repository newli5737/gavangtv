import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { MatchDetailPage } from "./pages/MatchDetailPage";
import { LivestreamPage } from "./pages/LivestreamPage";
import { LivePage } from "./pages/LivePage";
import { FixturesPage } from "./pages/FixturesPage";
import { ResultsPage } from "./pages/ResultsPage";
import { StandingsPage } from "./pages/StandingsPage";
import { HighlightsPage } from "./pages/HighlightsPage";
import { NewsPage } from "./pages/NewsPage";
import { NewsDetailPage } from "./pages/NewsDetailPage";
import { BettingPage } from "./pages/BettingPage";
import { Layout } from "./components/Layout";
import { LoginPage } from "./pages/admin/LoginPage";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { DashboardPage } from "./pages/admin/DashboardPage";
import { MatchesPage } from "./pages/admin/MatchesPage";
import { MatchEditPage } from "./pages/admin/MatchEditPage";
import { MatchCommentsPage } from "./pages/admin/MatchCommentsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "live", Component: LivePage },
      { path: "fixtures", Component: FixturesPage },
      { path: "results", Component: ResultsPage },
      { path: "standings", Component: StandingsPage },
      { path: "highlights", Component: HighlightsPage },
      { path: "news", Component: NewsPage },
      { path: "news/:slug", Component: NewsDetailPage },
      { path: "betting", Component: BettingPage },
      { path: "match/:slug", Component: MatchDetailPage },
      { path: "watch/:slug", Component: LivestreamPage },
    ],
  },
  { path: "admin/login", Component: LoginPage },
  {
    path: "admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "matches", Component: MatchesPage },
      { path: "matches/new", Component: MatchEditPage },
      { path: "matches/:id/edit", Component: MatchEditPage },
      { path: "matches/:id/comments", Component: MatchCommentsPage },
    ],
  },
]);
