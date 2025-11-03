import { NextRequest, NextResponse } from 'next/server';

import * as bcrypt from 'bcryptjs';
import { PrismaClient } from '@/lib/generated/prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, password, role } = body;

  
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email dan password harus diisi' },
        { status: 400 }
      );
    }

  
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const user = await prisma.user.create({
      data: {
        email,
        name: name || null,
        password: hashedPassword,
        role: role || 'user',
        isactive: true,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isactive: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        message: 'Registrasi berhasil',
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat registrasi' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
