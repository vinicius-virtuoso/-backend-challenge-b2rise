import { z } from "zod";

export const adminSchemaRequest = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const adminSchemaResponse = z.object({
  id: z.string(),
  username: z.string(),
});

export const adminSchemaWithPasswordResponse = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
});

export type IAdminRequest = z.infer<typeof adminSchemaRequest>;
export type IAdminResponse = z.infer<typeof adminSchemaResponse>;
export type IAdminWithPasswordResponse = z.infer<
  typeof adminSchemaWithPasswordResponse
>;
