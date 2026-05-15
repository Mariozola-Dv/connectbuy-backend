import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    return this.prisma.profile.findUnique({
      where: { userId },
      include: { user: true },
    });
  }

  async updateProfile(userId: string, data: any) {
    return this.prisma.profile.upsert({
      where: { userId },

      create: {
        userId,
        fullName: data.fullName || "",
        imageUrl: data.imageUrl || "",
        bio: data.bio || "",
        gender: data.gender || "",
        birthdate: data.birthdate ? new Date(data.birthdate) : null,
      },

      update: {
        fullName: data.fullName || "",
        imageUrl: data.imageUrl || "",
        bio: data.bio || "",
        gender: data.gender || "",
        birthdate: data.birthdate ? new Date(data.birthdate) : null,
      },
    });
  }
}