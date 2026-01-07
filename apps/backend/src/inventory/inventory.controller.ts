import { Controller, Post, Body, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InventoryService } from './inventory.service';
import { UsersService } from '../users/users.service';

@Controller('inventory')
@UseGuards(AuthGuard('jwt'))
export class InventoryController {
    constructor(
        private readonly inventoryService: InventoryService,
        private readonly usersService: UsersService
    ) { }

    @Post('stock-in')
    async stockIn(@Body() dto: any, @Req() req: any) {
        const user = await this.usersService.findOneBySupabaseId(req.user.userId);
        if (!user || !user.shop_id) throw new UnauthorizedException('User/Shop not found');
        return this.inventoryService.stockIn(user.shop_id, dto);
    }
}
