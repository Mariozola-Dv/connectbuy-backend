import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // 📊 STATS
  async getStats() {
    const users = await this.prisma.user.count();
    const products = await this.prisma.product.count();

    return { users, products };
  }

  // 👤 LIST USERS (com perfil)
  async getUsers() {
    return this.prisma.user.findMany({
      include: {
        profile: true,
      },
      orderBy: {
        id: "desc",
      },
    });
  }

  // 🗑 DELETE USER
  async deleteUser(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  // 🚫 BAN USER (REAL)
  async banUser(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: {
        isBanned: true,
      },
    });
  }

  // ✅ UNBAN USER (REAL)
  async unbanUser(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: {
        isBanned: false,
      },
    });
  }
}