import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { PrismaClient } from '@/lib/generated/prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Ambil token dari cookie
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized - Token tidak ditemukan' },
        { status: 401 }
      );
    }

    // Verifikasi token
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized - Token tidak valid' },
        { status: 401 }
      );
    }

    // Ambil data user terbaru dari database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isactive: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User tidak ditemukan' },
        { status: 404 }
      );
    }

    if (!user.isactive) {
      return NextResponse.json(
        { error: 'Akun tidak aktif' },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { user },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get me error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data user' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
