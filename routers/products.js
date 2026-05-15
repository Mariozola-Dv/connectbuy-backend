import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

/* 🔥 CRIAR PRODUTO */
router.post("/", async (req, res) => {
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
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
});

/* 🔥 LISTAR PRODUTOS */
router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});

export default router;

console.log("🔥 PRODUCTS ROUTE CARREGADA");