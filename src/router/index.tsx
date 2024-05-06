import BaseLayout from "src/layouts/BaseLayout";

// Routes
import baseRoutes from "./base";
import pageRoutes from "./pages";

const router = [
  {
    path: "*",
    element: <BaseLayout />,
    children: baseRoutes
  },
  {
    path: "/",
    children: pageRoutes
  }
];

export default router;
