import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async syncUser(supabaseUser: any): Promise<User> {
        const { userId, email } = supabaseUser; // Extracted from JWT

        // Check if user exists
        let user = await this.usersRepository.findOne({
            where: { supabase_uid: userId },
            relations: ['shop'],
        });

        if (!user) {
            // Create new user
            user = this.usersRepository.create({
                supabase_uid: userId,
                // We might want to set email if we stored it, but currently User entity doesn't have email.
                // Assuming we rely on Supabase for auth/email.
                // We can store a placeholder name if available.
            });
            await this.usersRepository.save(user);
        }

        return user;
    }

    async findOne(id: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id }, relations: ['shop'] });
    }

    async findOneBySupabaseId(uid: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { supabase_uid: uid }, relations: ['shop'] });
    }
}
