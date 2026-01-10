import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { ShopsService } from '../shops.service';

@Injectable()
export class OwnerGuard implements CanActivate {
    constructor(private shopsService: ShopsService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user; // Populated by JwtAuthGuard

        if (!user || !user.userId) {
            console.log('OwnerGuard: No user or userId in request', user);
            return false;
        }

        console.log('OwnerGuard: Check started for user', user.userId);

        const shopAndUser = await this.shopsService.getShopAndUser(user.userId);

        if (!shopAndUser || !shopAndUser.user) {
            console.log('OwnerGuard: User/Shop fetch returned null for', user.userId);
            throw new ForbiddenException('User not found');
        }

        if (shopAndUser.user.role !== 'OWNER') {
            console.log('OwnerGuard: Role mismatch, expected OWNER, got', shopAndUser.user.role);
            throw new ForbiddenException('Access denied: Owners only');
        }

        // Attach shop to request for convenience
        request.shop = shopAndUser.shop;
        console.log('OwnerGuard: Access granted');

        return true;
    }
}
