import { z } from "zod";

export const productSchemaRequest = z.object({
  title: z.string().min(1),
  price: z.number().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  image: z
    .string()
    .optional()
    .default("https://placehold.co/600x400?text=Product\nImage"),
});

export const productSchemaResponse = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string(),
});

export const productsListSchemaResponse = z.object({
  page: z.number().default(1),
  page_previous: z.string().or(z.null()),
  page_next: z.string().or(z.null()),
  products: z.array(productSchemaResponse),
});

export type IProductRequest = z.infer<typeof productSchemaRequest>;
export type IProductResponse = z.infer<typeof productSchemaResponse>;
export type IProductsListResponse = z.infer<typeof productsListSchemaResponse>;
