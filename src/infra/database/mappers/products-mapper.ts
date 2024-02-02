import { Products as ProductsPrisma } from "@prisma/client";
import { Products as RawProducts } from "@app/entities/products-entity";
import {
  productSchemaRequest,
  productSchemaResponse,
} from "@/app/interfaces/products-interfaces";

export class PrismaProductsMapper {
  static toPrisma(product: RawProducts) {
    return productSchemaRequest.parse(product);
  }

  static toDomain(raw: ProductsPrisma) {
    return productSchemaResponse.parse(raw);
  }
}
