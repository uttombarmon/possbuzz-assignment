import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./auth/login.tsx"),
  route("register", "./auth/register.tsx"),
  route("dashboard", "./dashboard/DashboardLayout.tsx", [
    index("./dashboard/dashboard.tsx"),
    // route("products", "./dashboard.tsx"),
  ]),
] satisfies RouteConfig;
