import { z } from "zod";

export const adminSchemaRequest = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const adminSchemaResponse = z.object({
  username: z.string(),
});

export type IAdminRequest = z.infer<typeof adminSchemaRequest>;
export type IAdminResponse = z.infer<typeof adminSchemaResponse>;
