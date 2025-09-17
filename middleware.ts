// middleware.ts (root level) - Strict Role Separation
import { NextRequest, NextResponse } from "next/server";

// Define STRICT role-to-route mapping - each role can ONLY access their designated routes
const ROLE_ROUTES = {
  ADMIN: ['/admin'],
  TEACHER: ['/teacher'], 
  USER: ['/student'], // USER role for students
} as const;

// Routes that ALL authenticated users can access regardless of role
const SHARED_ROUTES = ['/dashboard', '/profile'];

// Routes that don't require authentication
const PUBLIC_ROUTES = ['/login', '/register', '/', '/about', '/contact', '/unauthorized'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  console.log('🚦 Middleware checking path:', pathname);
  
  // Allow public routes
  if (PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/'))) {
    console.log('🌐 Public route, allowing access');
    return NextResponse.next();
  }
  
  // Check if this is a protected route
  const isProtectedRoute = 
    pathname.startsWith('/admin') ||
    pathname.startsWith('/teacher') ||
    pathname.startsWith('/student') ||
    SHARED_ROUTES.some(route => pathname.startsWith(route));
  
  if (!isProtectedRoute) {
    console.log('🟢 Non-protected route, allowing access');
    return NextResponse.next();
  }
  
  console.log('🔒 Protected route accessed:', pathname);
  
  // Get the token from cookies
  const token = request.cookies.get('access_token')?.value;
  console.log('🍪 Token found:', token ? 'YES' : 'NO');
  
  if (!token) {
    console.log('❌ No token, redirecting to login');
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // Verify token and get user role
  try {
    const baseUrl = request.nextUrl.origin;
    const response = await fetch(`${baseUrl}/api/auth/me`, {
      method: 'GET',
      headers: {
        'Cookie': `access_token=${token}`,
        'Content-Type': 'application/json',
      },
      redirect: 'manual'
    });
    
    if (!response.ok) {
      console.log('❌ Auth check failed, status:', response.status);
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    const userData = await response.json();
    const user = userData.user;
    
    if (!user || !user.role) {
      console.log('❌ No user data, redirecting to login');
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    const userRole = user.role as keyof typeof ROLE_ROUTES;
    console.log('🎭 User role:', userRole, 'accessing:', pathname);
    
    // Check if user is accessing a shared route (allowed for all authenticated users)
    const isAccessingSharedRoute = SHARED_ROUTES.some(route => pathname.startsWith(route));
    
    if (isAccessingSharedRoute) {
      console.log('✅ Shared route access granted for role:', userRole);
      return NextResponse.next();
    }
    
    // Check if user is accessing their designated role-specific route
    const userAllowedRoutes = ROLE_ROUTES[userRole];
    const canAccessRoute = userAllowedRoutes?.some(allowedRoute => 
      pathname.startsWith(allowedRoute)
    );
    
    if (!canAccessRoute) {
      console.log(`❌ STRICT SEPARATION: Role ${userRole} cannot access ${pathname}`);
      console.log(`🔀 Allowed routes for ${userRole}:`, userAllowedRoutes);
      
      // Redirect to user's designated area
      const defaultRoute = getDefaultRouteForRole(userRole);
      console.log(`🔀 Redirecting ${userRole} to their designated area: ${defaultRoute}`);
      
      return NextResponse.redirect(new URL(defaultRoute, request.url));
    }
    
    console.log('✅ Role-specific access granted for:', userRole);
    return NextResponse.next();
    
  } catch (error) {
    console.log('❌ Auth check error:', error);
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }
}

function getDefaultRouteForRole(role: string): string {
  switch (role) {
    case 'ADMIN':
      return '/admin/dashboard';
    case 'TEACHER':
      return '/teacher/dashboard';
    case 'USER':
      return '/student/dashboard';
    default:
      return '/dashboard'; // Fallback to shared dashboard
  }
}

export const config = {
  matcher: [
    // Protect all role-specific routes with STRICT separation
    '/admin/:path*',
    '/teacher/:path*', 
    '/student/:path*',
    
    // Protect shared authenticated routes
    '/dashboard/:path*',
    '/profile/:path*',
  ],
};