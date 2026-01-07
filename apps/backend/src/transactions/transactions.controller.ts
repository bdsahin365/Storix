import { Controller, Post, Body, Get, Param, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TransactionsService } from './transactions.service';
import { UsersService } from '../users/users.service';
import { TransactionType } from './transactions.entity';

@Controller('transactions')
@UseGuards(AuthGuard('jwt'))
export class TransactionsController {
    constructor(
        private readonly transactionsService: TransactionsService,
        private readonly usersService: UsersService
    ) { }

    private async getShopId(req: any): Promise<string> {
        const user = await this.usersService.findOneBySupabaseId(req.user.userId);
        if (!user || !user.shop_id) throw new UnauthorizedException('User has no shop');
        return user.shop_id;
    }

    @Post('baki')
    async addBaki(@Body() body: any, @Req() req: any) {
        const shopId = await this.getShopId(req);
        // Body: { customerId, amount, note, metadata? }
        return this.transactionsService.create({ ...body, type: TransactionType.SALE }, shopId);
    }

    @Post('payment')
    async receivePayment(@Body() body: any, @Req() req: any) {
        const shopId = await this.getShopId(req);
        // Body: { customerId, amount, note, metadata? }
        return this.transactionsService.create({ ...body, type: TransactionType.PAYMENT }, shopId);
    }

    @Get('customer/:customerId')
    async getLedger(@Param('customerId') customerId: string, @Req() req: any) {
        const shopId = await this.getShopId(req);
        return this.transactionsService.findByCustomer(customerId, shopId);
    }
}
