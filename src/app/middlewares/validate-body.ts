import { ZodTypeAny } from "zod";
import { NextFunction, Request, Response } from "express";

export const validateBody =
  (schema: ZodTypeAny) =>
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);

    const validation = schema.parse(req.body);
    console.log(validation);

    req.body = validation;
    console.log(req.body);
    return next();
  };
