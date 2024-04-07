import BaseLayout from "src/layouts/BaseLayout";

// Routes
import baseRoutes from "./base";
import dashboardsRoutes from "./dashboards";

const router = [
  {
    path: "*",
    element: <BaseLayout />,
    children: baseRoutes,
  },
  {
    path: "/",
    children: [
      {
        path: "/",
        children: dashboardsRoutes,
      },
    ],
  },
];

export default router;
