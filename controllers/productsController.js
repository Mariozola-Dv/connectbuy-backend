import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 🔥 CRIAR PRODUTO
export const createProduct = async (req, res) => {
  try {
    const { title, price, description, imageUrl, userId } = req.body;

    const product = await prisma.product.create({
      data: {
        title,
        price: Number(price),
        description,
        imageUrl,
        userId,
      },
    });

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
};

// 🔥 LISTAR PRODUTOS (FEED)
export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
};