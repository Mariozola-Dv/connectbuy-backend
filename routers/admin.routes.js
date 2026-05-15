import express from "express";
import prisma from "../prismaClient.js";

const router = express.Router();

/**
 * 📊 ESTATÍSTICAS DO SISTEMA
 */
router.get("/stats", async (req, res) => {
  try {
    const users = await prisma.user.count();
    const products = await prisma.product.count();

    res.json({
      users,
      products
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar stats" });
  }
});

/**
 * 👤 LISTA DE USUÁRIOS
 */
router.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

/**
 * 🛍 PRODUTOS
 */
router.get("/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        user: true
      }
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});

export default router;