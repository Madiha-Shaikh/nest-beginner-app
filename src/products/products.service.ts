import { Injectable, NotFoundException } from '@nestjs/common';
import { createProductDTO } from './dto/create-product.dto';
import { Product } from './product.model';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ProductsService {
  products: Product[] = [];
  getAllProducts(): Product[] {
    return this.products;
  }

  getProductById(productId: string) {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }

  insertProduct(body: createProductDTO): Product {
    const newProduct = new Product(
      Math.random().toString(),
      body?.title,
      body?.description,
      body?.price,
    );
    this.products.push(newProduct);
    return newProduct;
  }

  updateProductById(productId: string, body: createProductDTO) {
    const [product, index] = this.findProduct(productId);
    const updatedProduct = { ...product };
    if (body?.title) {
      updatedProduct.title = body?.title;
    }
    if (body?.description) {
      updatedProduct.description = body?.description;
    }
    if (body?.price) {
      updatedProduct.price = body?.price;
    }
    this.products[index] = updatedProduct;
    return updatedProduct
  }

  deleteProduct(prodId: string) {
    const [_, index] = this.findProduct(prodId);
    this.products.splice(index, 1);
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(prod => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return [product, productIndex];
  }
}
