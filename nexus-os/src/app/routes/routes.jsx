/** @format */

import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "../layout/AppLayout";
import ClientLayout from "../layout/ClientLayout";
import PublicLayout from "../layout/PublicLayout";
import ProtectedRoute from "./ProtectedRoute";
import RoleGate from "./RoleGate";
import Spinner from "../../ui/Spinner";
import ErrorBoundary from "../../ui/ErrorBoundary";
import DevLayout from "../layout/DevLayout";
import NotFoundPage from "../../features/public-pages/NotFoundPage";

const HomePage = lazy(() => import("../../features/public-pages/HomePage"));
const ProjectRequestForm = lazy(
  () => import("../../features/public-pages/ProjectRequestForm"),
);
const Login = lazy(() => import("../../features/public-pages/Login"));
const SignupClientPage = lazy(
  () => import("../../features/public-pages/SignupClientPage"),
);
const SignupDeveloperPage = lazy(
  () => import("../../features/public-pages/SignupDeveloperPage"),
);
const AdminDashboard = lazy(
  () => import("../../features/admin-dashboard/AdminDashboard"),
);
const ProjectsBoard = lazy(
  () => import("../../features/projects/ProjectsBoard"),
);
const RequestsInbox = lazy(
  () => import("../../features/requests/RequestsInbox"),
);
const ClientsList = lazy(() => import("../../features/clients/ClientsList"));
const CandidatesList = lazy(
  () => import("../../features/candidates/CandidatesList"),
);
const ClientView = lazy(
  () => import("../../features/client-portal/ClientView"),
);
const DeveloperView = lazy(
  () => import("../../features/developer-portal/DeveloperView"),
);

const routes = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/request-project", element: <ProjectRequestForm /> },
      { path: "/login", element: <Login /> },
      { path: "signup/client", element: <SignupClientPage /> },
      { path: "signup/developer", element: <SignupDeveloperPage /> },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },

  {
    path: "/app",
    element: <ProtectedRoute />,
    children: [
      {
        element: <RoleGate allowedRoles={["admin"]} />,
        children: [
          {
            element: <AppLayout />,
            children: [
              { path: "admin", element: <AdminDashboard /> },
              { path: "projects", element: <ProjectsBoard /> },
              { path: "requests", element: <RequestsInbox /> },
              { path: "clients", element: <ClientsList /> },
              { path: "candidates", element: <CandidatesList /> },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "/client-dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        element: <RoleGate allowedRoles={["client"]} />,
        children: [
          {
            element: <ClientLayout />,
            children: [{ index: true, element: <ClientView /> }],
          },
        ],
      },
    ],
  },

  {
    path: "/dev-dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        element: <RoleGate allowedRoles={["developer"]} />,
        children: [
          {
            element: <DevLayout />,
            children: [{ index: true, element: <DeveloperView /> }],
          },
        ],
      },
    ],
  },
]);

export default function Router() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <RouterProvider router={routes} />
      </Suspense>
    </ErrorBoundary>
  );
}
