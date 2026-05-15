import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { AppController } from './app.controller';

// 🔥 NOVO: ADMIN MODULE (NÃO APAGA NADA DO RESTO)
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ProfileModule,
    ProductsModule,

    // 🔥 ADICIONADO SEM AFETAR O RESTO
    AdminModule,
  ],
  controllers: [AppController],
})
export class AppModule {}