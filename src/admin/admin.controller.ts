import { Controller, Get, Delete, Param, Patch } from "@nestjs/common";
import { AdminService } from "./admin.service";

@Controller("api/admin")
export class AdminController {
  constructor(private adminService: AdminService) {}

  // 📊 STATS
  @Get("stats")
  getStats() {
    return this.adminService.getStats();
  }

  // 👤 USERS LIST
  @Get("users")
  getUsers() {
    return this.adminService.getUsers();
  }

  // 🗑 DELETE USER
  @Delete("users/:id")
  deleteUser(@Param("id") id: string) {
    return this.adminService.deleteUser(id);
  }

  // 🚫 BAN USER
  @Patch("users/:id/ban")
  banUser(@Param("id") id: string) {
    return this.adminService.banUser(id);
  }

  // ✅ UNBAN USER
  @Patch("users/:id/unban")
  unbanUser(@Param("id") id: string) {
    return this.adminService.unbanUser(id);
  }
}