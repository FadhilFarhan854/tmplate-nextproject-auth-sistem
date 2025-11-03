import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma/client';   
import * as bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/jwt';


const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validasi input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email dan password harus diisi' },
        { status: 400 }
      );
    }

    // Cari user berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    // Cek apakah user aktif
    if (!user.isactive) {
      return NextResponse.json(
        { error: 'Akun Anda tidak aktif. Silakan hubungi administrator' },
        { status: 403 }
      );
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      isactive: user.isactive,
    });

    // Hapus password dari response
    const { password: _, ...userWithoutPassword } = user;

    // Set token di cookie (httpOnly untuk keamanan)
    const response = NextResponse.json(
      {
        message: 'Login berhasil',
        user: userWithoutPassword,
        token,
      },
      { status: 200 }
    );

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 hari
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat login' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
