import { NextFunction, Request, Response } from "express";
import { Schema } from "../validation/schema.js";

type ValidationSchemas = {
  body?: Schema<unknown>;
  params?: Schema<unknown>;
  query?: Schema<unknown>;
};

export const validateRequest = (schemas: ValidationSchemas) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body, "body");
      }
      if (schemas.params) {
        req.params = schemas.params.parse(req.params, "params") as Record<
          string,
          string
        >;
      }
      if (schemas.query) {
        req.query = schemas.query.parse(req.query, "query");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
