import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import OpenAI from 'openai';

@Injectable()
export class VisionService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  constructor(private prisma: PrismaService) {}

  async analyzeImage(file: Express.Multer.File) {
    if (!file) {
      return {
        success: false,
        message: 'Imagem não enviada',
        products: [],
      };
    }

    const base64 = file.buffer.toString('base64');

    // 🧠 IA VISUAL
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `
Retorna APENAS palavras-chave curtas separadas por vírgula.
Exemplo:
iphone, apple, smartphone, mobile
              `,
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:${file.mimetype};base64,${base64}`,
              },
            },
          ],
        },
      ],
    });

    const raw =
      response.choices[0]?.message?.content?.toLowerCase() || '';

    // 🔥 limpeza inteligente
    const keywords = raw
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 2)
      .slice(0, 8);

    if (keywords.length === 0) {
      return {
        success: true,
        keywords: [],
        products: [],
      };
    }

    // 🔎 BUSCA MAIS INTELIGENTE
    const products = await this.prisma.product.findMany({
      where: {
        OR: keywords.flatMap((word) => [
          {
            title: {
              contains: word,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: word,
              mode: 'insensitive',
            },
          },
        ]),
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
      take: 20, // 🔥 evita vazio e melhora resultado
    });

    return {
      success: true,
      keywords,
      products,
    };
  }
}