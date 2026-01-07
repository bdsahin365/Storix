import { Controller, Post, Body, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SalesService } from './sales.service';
import { UsersService } from '../users/users.service';

@Controller('sales')
@UseGuards(AuthGuard('jwt'))
export class SalesController {
    constructor(
        private readonly salesService: SalesService,
        private readonly usersService: UsersService
    ) { }

    @Post()
    async createSale(@Body() dto: any, @Req() req: any) {
        const user = await this.usersService.findOneBySupabaseId(req.user.userId);
        if (!user || !user.shop_id) throw new UnauthorizedException('User/Shop not found');
        return this.salesService.createSale(user.shop_id, dto);
    }
}
