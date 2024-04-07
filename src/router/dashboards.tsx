import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import SuspenseLoader from "src/components/Shared/SuspenseLoader";

const Loader = (Component) => (props) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

const Home = Loader(lazy(() => import("src/content/pages/Home")));

const dashboardsRoutes = [
  {
    path: "/",
    element: <Navigate to="home" replace />
  },
  {
    path: "home",
    element: <Home />
  }
];

export default dashboardsRoutes;