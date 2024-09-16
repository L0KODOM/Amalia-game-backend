import { NextResponse } from 'next/server';

export function middleware(req) {
  const res = NextResponse.next();

  res.headers.append('Access-Control-Allow-Credentials', 'true');
  res.headers.append('Access-Control-Allow-Origin', '*'); 
  res.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.headers.append('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token');

  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { headers: res.headers });
  }

  return res;
}

export const config = {
  matcher: ['/api/:path*'],  
};