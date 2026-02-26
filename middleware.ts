import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const token_forgot = req.cookies.get("token_forgot")?.value;
  const path = req.nextUrl.pathname;
  let role: string | undefined;

  if (token) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET_KEY),
      );
      role = payload.role as string;
    } catch {
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("token");
      return response;
    }
  }

  if (!token && !token_forgot) {
    if (!token && !token_forgot && path.startsWith("/forgot_repassword")) {
      return NextResponse.redirect(new URL("/forgot", req.url));
    }

    if (
      !token &&
      path != "/login" &&
      path != "/forgot" &&
      path != "/register"
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (token_forgot) {
    if (path === "/login" || path === "/forgot") {
      return NextResponse.redirect(new URL("/forgot_repassword", req.url));
    }

    if (path === "/forgot_repassword") {
      return NextResponse.next();
    }
  }

  if (token && !token_forgot) {
    if (
      path.startsWith("/dashboard") ||
      path.startsWith("/upload") ||
      path.startsWith("/user_manage") ||
      path.startsWith("/me") ||
      path.startsWith("/history")
    ) {
      if (role == "admin") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }
    if (token && (path.startsWith("/login") || path.startsWith("/forgot"))) {
      if (role == "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      } else {
        return NextResponse.redirect(new URL("/users/dashboard", req.url));
      }
    }
    if (token && path.startsWith("/users")) {
      if (role == "user") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/user_manage",
    "/upload",
    "/me",
    "/history",
    "/users/:path*",
    "/login",
    "/forgot",
    "/forgot_repassword",
  ],
};
