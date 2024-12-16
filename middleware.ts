import { NextResponse } from 'next/server';
import { parse } from 'cookie';
import { jwtVerify } from 'jose'; 

export async function middleware(request: Request) {
  const cookies = parse(request.headers.get('cookie') || '');
  
  console.log('Cookies:', cookies);

  const token = cookies.token;

  if (!token) {
    console.log('No token found, redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET); 
    const { payload } = await jwtVerify(token, secret);

    console.log('Token verified:', payload);
    return NextResponse.next(); 
  } catch (error) {
    console.error('JWT verification failed:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/account', '/account/:path*', '/dashboard', '/dashboard/:path*'],
};
