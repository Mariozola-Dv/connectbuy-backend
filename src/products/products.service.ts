import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@Injectable()
export class ProductsService {

  async create(data: any) {
    const { title, price, description, imageUrl, userId } = data;

    // 🔥 validações
    if (!userId) {
      throw new BadRequestException("Você precisa fazer login");
    }

    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new BadRequestException("User não existe");
    }

    return prisma.product.create({
      data: {
        title,
        price: Number(price),
        description,
        imageUrl,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async findAll() {
    return prisma.product.findMany({
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}