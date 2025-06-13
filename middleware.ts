
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


const protectedRoutes = ['/admin/dashboard', '/admin/blog']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value


  if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }


  return NextResponse.next()
}


export const config = {
  matcher: ['/admin/:path*', '/admin/:path*'], 
}
