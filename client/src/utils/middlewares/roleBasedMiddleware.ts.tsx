import { NextResponse } from "next/server";
import { 
  getAuthToken, 
  isTokenValid, 
  getUserRole,
} from "@/utils/auth/authutils";

export function middleware(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname;

  // Bypass middleware for static files
  if (path.startsWith("/_next")) return NextResponse.next();

  // 1. Token Validation
  if (!getAuthToken() || !isTokenValid()) {
    return NextResponse.redirect(new URL("/login", url.origin));
  }

  // 2. Role Validation
  const userRole = getUserRole();
  const protectedRoutes = [
    { path: "/admin", roles: ["admin"] },
    { path: "/talentdashboard", roles: ["user"] }
  ];

  const routeConfig = protectedRoutes.find(r => path.startsWith(r.path));
  if (routeConfig && !routeConfig.roles.includes(userRole!)) {
    return NextResponse.redirect(new URL("/unauthorized", url.origin));
  }

  // 3. Add Validation Cookie
  const response = NextResponse.next();
  response.cookies.set("auth-validated", "true", { sameSite: "lax" });
  
  return response;
}