import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string, fullName: string) {
    const hash = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hash,
        profile: {
          create: {
            fullName,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
      },
    });

    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error('Credenciais inválidas');
    }

    const token = this.jwtService.sign({
      userId: user.id,
      email: user.email,
    });

    // 🔥 ISTO RESOLVE O TEU PROBLEMA
    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.profile?.fullName || null,
      },
    };
  }
}