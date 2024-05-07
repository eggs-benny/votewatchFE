// Routes
import baseRoutes from "./base";
import pageRoutes from "./pages";

const router = [
  {
    path: "*",
    children: baseRoutes
  },
  {
    path: "/",
    children: pageRoutes
  }
];

export default router;
