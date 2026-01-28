import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("auth/login.tsx"),
  route("register", "./auth/register.tsx"),
  // layout("./auth/layout.tsx", [
  //   route("login", "./auth/login.tsx"),
  //   route("register", "./auth/register.tsx"),
  // ]),
] satisfies RouteConfig;
