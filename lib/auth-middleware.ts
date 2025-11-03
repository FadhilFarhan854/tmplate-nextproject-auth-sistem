import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, JWTPayload } from '@/lib/jwt';

export function authMiddleware(request: NextRequest) {
  // Ambil token dari cookie atau header
  const tokenFromCookie = request.cookies.get('token')?.value;
  const tokenFromHeader = request.headers.get('authorization')?.replace('Bearer ', '');
  
  const token = tokenFromCookie || tokenFromHeader;

  if (!token) {
    return NextResponse.json(
      { error: 'Token tidak ditemukan. Silakan login terlebih dahulu' },
      { status: 401 }
    );
  }

  // Verifikasi token
  const decoded = verifyToken(token);

  if (!decoded) {
    return NextResponse.json(
      { error: 'Token tidak valid atau sudah kadaluarsa' },
      { status: 401 }
    );
  }

  // Return decoded token untuk digunakan di route
  return decoded;
}

export function requireAuth(
  handler: (request: NextRequest, user: JWTPayload) => Promise<NextResponse>
) {
  return async (request: NextRequest) => {
    const authResult = authMiddleware(request);

    // Jika authResult adalah NextResponse (error), return error
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    // Jika valid, lanjutkan ke handler dengan user data
    return handler(request, authResult);
  };
}
