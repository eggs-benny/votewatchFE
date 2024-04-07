import { Suspense, lazy } from "react";
import { JSX } from "react/jsx-runtime";
import SuspenseLoader from "src/components/Shared/SuspenseLoader";

const Loader = (Component) => (props: JSX.IntrinsicAttributes) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Status
const Status404 = Loader(
  lazy(() => import("src/content/pages/Status/Status404"))
);

const baseRoutes = [
  {
    path: "*",
    element: <Status404 />
  }
];

export default baseRoutes;
