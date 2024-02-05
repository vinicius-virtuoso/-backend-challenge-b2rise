import { Products } from "@/app/entities/products-entity";
import {
  IProductRequest,
  IProductResponse,
} from "@/app/interfaces/products-interfaces";
import { ProductsRepository } from "@/app/repositories/products-repository";
import { TestProductsMapper } from "../mappers/products-mapper";
import { error } from "console";

export let productsMemory: IProductResponse[] = [];
export class InMemoryProductsRepository implements ProductsRepository {
  products: IProductResponse[] = [];

  constructor() {
    this.products = productsMemory;
  }

  async create(data: Products): Promise<IProductResponse> {
    this.products.push(TestProductsMapper.toDatabase(data));
    return TestProductsMapper.toDomain(data);
  }

  async findById(id: string): Promise<IProductResponse | null> {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      return null;
    }
    return TestProductsMapper.toDomain(product);
  }

  async findByTitle(title: string): Promise<IProductResponse | null> {
    const product = this.products.find(
      (product) => product.title.toLowerCase() === title.toLowerCase()
    );
    if (!product) {
      return null;
    }
    return TestProductsMapper.toDomain(product);
  }

  async findByCategory(
    page: number,
    take: number,
    category: string
  ): Promise<[IProductResponse[], number]> {
    const productsList = this.products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );

    return [
      productsList.slice((page - 1) * take, (page - 1) * take + take),
      productsList.length,
    ];
  }

  async getAll(
    page: number,
    take: number,
    category: string,
    title: string,
    min_price: number,
    max_price: number
  ): Promise<[IProductResponse[], number]> {
    const productsList = this.products.filter((product) => {
      if (category === "undefined" && title === "undefined") {
        if (product.price >= min_price && product.price <= max_price) {
          return product;
        }
      }

      if (category !== "undefined" && title !== "undefined") {
        if (
          product.category.toLowerCase().includes(category.toLowerCase()) &&
          product.title.toLowerCase().includes(title.toLowerCase()) &&
          product.price >= min_price &&
          product.price <= max_price
        ) {
          return product;
        }
      }

      if (category !== "undefined") {
        if (
          product.category.toLowerCase().includes(category.toLowerCase()) &&
          product.price >= min_price &&
          product.price <= max_price
        ) {
          return product;
        }
      }

      if (title !== "undefined") {
        if (
          product.title.toLowerCase().includes(title.toLowerCase()) &&
          product.price >= min_price &&
          product.price <= max_price
        ) {
          return product;
        }
      }
    });

    return [
      productsList.slice((page - 1) * take, (page - 1) * take + take),
      productsList.length,
    ];
  }

  async update(productId: string, data: Partial<IProductRequest>) {
    const product = productsMemory.find((product) => product.id === productId);

    if (!product) {
      return null;
    }

    product.title = data.title ?? product.title;
    product.description = data.description ?? product.description;
    product.category = data.category ?? product.category;
    product.price = data.price ?? product.price;
    product.image = data.image ?? product.image;

    return TestProductsMapper.toDomain(product);
  }

  async delete(productId: string): Promise<void> {
    this.products = this.products.filter((product) => product.id !== productId);
  }
}
