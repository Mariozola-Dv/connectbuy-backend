import { Controller, Get, Post, Req, Body, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Req() req: any) {
    return this.profileService.getProfile(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  updateProfile(@Req() req: any, @Body() body: any) {
    return this.profileService.updateProfile(req.user.userId, body);
  }
}