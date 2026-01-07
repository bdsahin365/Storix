import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../users/users.entity';

@Injectable()
export class SuperadminGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user; // Populated by SupabaseStrategy

        if (!user) {
            throw new ForbiddenException('User not authenticated');
        }

        if (user.role === UserRole.SUPERADMIN) {
            // Superadmin bypasses shop scoping rules, but we must log this access in a real interceptor.
            // For now, we simply allow access.
            return true;
        }

        throw new ForbiddenException('Access denied: Superadmin only');
    }
}
