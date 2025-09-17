// import { NextRequest, NextResponse } from "next/server";
// import { verifyAccessToken } from "../lib/jwt";
// // middleware.ts (or src/middleware.ts)


// // Map routes to minimum required role
// const protectedRoutes: Record<string, "ADMIN" | "TEACHER" | "USER"> = {
//   "/admin": "ADMIN",
//   "/teacher": "TEACHER",
//   "/student": "USER",
// };

// // Optional: simple role hierarchy
// const roleRank: Record<string, number> = { USER: 1, TEACHER: 2, ADMIN: 3 };

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // Find which protected prefix matches this path, if any
//   const matchedPrefix = Object.keys(protectedRoutes).find((route) =>
//     pathname.startsWith(route)
//   );
//   if (!matchedPrefix) {
//     return NextResponse.next();
//   }

//   const neededRole = protectedRoutes[matchedPrefix];

//   // Read token from cookie
//   const token = request.cookies.get("access_token")?.value;
//   if (!token) {
//     const loginUrl = new URL("/login", request.url);
//     loginUrl.searchParams.set("next", pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   // Verify token (must be Edge-safe & async)
//   let payload: any;
//   try {
//     payload = await verifyAccessToken(token); // ensure your function returns { role: "ADMIN" | "TEACHER" | "USER", ... }
//   } catch {
//     const loginUrl = new URL("/login", request.url);
//     loginUrl.searchParams.set("next", pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   if (!payload?.role) {
//     const loginUrl = new URL("/login", request.url);
//     loginUrl.searchParams.set("next", pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   const userRole = String(payload.role).toUpperCase();

//   // Choose ONE of the checks below:

//   // A) Strict equality (only exact role can access)
//   // if (userRole !== neededRole) {
//   //   return NextResponse.redirect(new URL("/unauthorized", request.url));
//   // }

//   // B) Hierarchy (ADMIN can access teacher/student; TEACHER can access student)
//   if ((roleRank[userRole] ?? 0) < (roleRank[neededRole] ?? 0)) {
//     return NextResponse.redirect(new URL("/unauthorized", request.url));
//   }

//   return NextResponse.next();
// }

// // Only protect these routes
// export const config = {
//   matcher: ["/admin/:path*", "/teacher/:path*", "/student/:path*"],
// };
