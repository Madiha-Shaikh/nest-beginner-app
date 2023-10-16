import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { createProductDTO } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get() 
    getProducts() {
        return this.productsService.getAllProducts();
    }

    @Get(':id') 
    getProduct(@Param('id') id: string) {
        return this.productsService.getProductById(id);
    }

    @Post()
    createProduct(@Body() body: {title: string, description: string, price: number}) {
        return this.productsService.insertProduct(body);
    }

    @Patch(':id')
    updateProduct(@Param('id') id: string, @Body() body: {title: string, description: string, price: number}) {
        return this.productsService.updateProductById(id, body);
    }

    @Delete(':id')
    removeProduct(@Param('id') id: string) {
        this.productsService.deleteProduct(id);
        return null;
    }

}
