import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { AdminGateway } from "./admin.gateway";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [AdminController],
  providers: [AdminService, AdminGateway, PrismaService],
})
export class AdminModule {}