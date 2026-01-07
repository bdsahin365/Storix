import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) { }

    async create(createDto: any, shopId: string): Promise<Product> {
        const product = this.productsRepository.create({
            ...createDto,
            shop_id: shopId,
        } as Product);
        return this.productsRepository.save(product) as Promise<Product>;
    }

    async findAll(shopId: string): Promise<Product[]> {
        return this.productsRepository.find({
            where: { shop_id: shopId, is_active: true },
        });
    }

    async findOne(id: string, shopId: string): Promise<Product | null> {
        return this.productsRepository.findOne({
            where: { id, shop_id: shopId },
        });
    }
}
