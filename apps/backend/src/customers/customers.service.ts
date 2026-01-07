import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customers.entity';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private customersRepository: Repository<Customer>,
    ) { }

    async create(createDto: any, shopId: string): Promise<Customer> {
        const customer = this.customersRepository.create({
            ...createDto,
            shop_id: shopId,
        } as Customer);
        return this.customersRepository.save(customer) as Promise<Customer>;
    }

    async findAll(shopId: string): Promise<Customer[]> {
        return this.customersRepository.find({
            where: { shop_id: shopId },
            order: { updated_at: 'DESC' },
        });
    }

    async findOne(id: string, shopId: string): Promise<Customer | null> {
        return this.customersRepository.findOne({
            where: { id, shop_id: shopId },
        });
    }
}
