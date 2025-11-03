import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Buat response untuk logout
    const response = NextResponse.json(
      { message: 'Logout berhasil' },
      { status: 200 }
    );

    // Hapus cookie token
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Hapus cookie dengan set maxAge ke 0
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat logout' },
      { status: 500 }
    );
  }
}
