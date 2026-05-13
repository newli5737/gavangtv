import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { MatchDetailPage } from "./pages/MatchDetailPage";
import { LivestreamPage } from "./pages/LivestreamPage";
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
