import { z } from "zod";

export const userSchemaRequest = z.object({
  email: z.string().email().min(1).max(100),
  username: z.string().min(1).max(50),
  password: z.string().min(1).max(50),
  first_name: z.string().min(1).max(50),
  last_name: z.string().min(1).max(50),
});

export const userSchemaResponse = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
});

export const userSchemaWithPasswordResponse = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
  first_name: z.string(),
  last_name: z.string(),
});

export const usersListDtoResponse = z.array(userSchemaResponse);

export type IUserRequest = z.infer<typeof userSchemaRequest>;
export type IUserResponse = z.infer<typeof userSchemaResponse>;
export type IUserWithPasswordResponse = z.infer<
  typeof userSchemaWithPasswordResponse
>;
export type IUsersListResponse = z.infer<typeof usersListDtoResponse>;
