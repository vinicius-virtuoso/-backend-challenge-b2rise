import { AppError } from "@/app/error";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization;

  const token = authToken?.split(" ")[1];

  if (!token) {
    throw new AppError("Missing bearer token.", 401);
  }

  verify(token, String(process.env.SECRET_KEY), (err, decoded: any) => {
    if (err) {
      throw new AppError(err.message, 401);
    }
    req.user = {
      id: decoded.sub,
      username: decoded.username,
      is_admin: decoded.is_admin,
    };
    return next();
  });
};
