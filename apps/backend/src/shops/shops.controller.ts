import { Controller, Post, Body, UseGuards, Request, Get, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ShopsService } from './shops.service';

@Controller('shops')
export class ShopsController {
    constructor(private readonly shopsService: ShopsService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Req() req: any, @Body() body: any) {
        // Expect body: { name, address, phone, settings? }
        // req.user.userId is mapped from payload.sub in SupabaseStrategy
        return this.shopsService.create(body, req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    async getMyShop(@Req() req: any) {
        return this.shopsService.findMyShop(req.user.userId);
    }
}
