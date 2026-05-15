import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";





const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

/* 🔥 TESTE BASE */
app.get("/", (req, res) => {
  res.send("ConnectBuy API is running 🚀");
});

/* 🔥 CRIAR PRODUTO */
app.post("/api/products", async (req, res) => {
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
});

/* 🔥 LISTAR PRODUTOS (AGORA VAI FUNCIONAR) */
app.get("/api/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
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

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});



app.get("/api/admin/stats", async (req, res) => {
  try {
    const users = await prisma.user.count();
    const products = await prisma.product.count();

    res.json({
      users,
      products
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao buscar stats admin" });
  }
});




/* SERVER */
app.listen(3000, () => {
  console.log("🔥 Server running on port 3000");
});

console.log("🔥 ESTE SERVER ESTÁ ATIVO");


