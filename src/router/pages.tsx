import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import SuspenseLoader from "src/components/Shared/SuspenseLoader";

//@ts-ignore
const Loader = (Component) => (props) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

const Home = Loader(lazy(() => import("src/content/pages/Home")));
const Member = Loader(lazy(() => import("src/content/pages/Member")))

const pageRoutes = [
  {
    path: "/",
    element: <Navigate to="home" replace />
  },
  {
    path: "home",
    element: <Home />
  },
  {
    path: "member/:memberId",
    element: <Member/>
  }
];

export default pageRoutes;
