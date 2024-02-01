import { z } from "zod";

export const authSchemaRequest = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const authSchemaResponse = z.object({
  access_token: z.string(),
});

export type IAuthRequest = z.infer<typeof authSchemaRequest>;
export type IAuthResponse = z.infer<typeof authSchemaResponse>;
