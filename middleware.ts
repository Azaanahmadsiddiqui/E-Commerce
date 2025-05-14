import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const idToken = request.cookies.get('idToken')?.value 
  const { pathname } = request.nextUrl

  const isLoggedIn = !!idToken


  if (isLoggedIn && ['/Login', '/SignUp', '/forgotPassword', '/otp', '/newPassword'].includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url)) 
  }

  if (!isLoggedIn && ['/account', '/checkout'].includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url)) 
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/Login', '/SignUp', '/forgotPassword', '/otp', '/newPassword'],
}