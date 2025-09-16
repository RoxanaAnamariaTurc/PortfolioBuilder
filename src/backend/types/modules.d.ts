/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "express" {
  export interface Request {
    [key: string]: any;
  }

  export interface Response {
    status: (code: number) => Response;
    json: (body: any) => Response;
    send?: (body: any) => Response;
  }

  export type NextFunction = (...args: any[]) => void;

  export interface Router {
    use: (...args: any[]) => Router;
    get: (...args: any[]) => Router;
    post: (...args: any[]) => Router;
    put: (...args: any[]) => Router;
    delete: (...args: any[]) => Router;
  }

  export interface ExpressApp {
    use: (...args: any[]) => ExpressApp;
    listen: (...args: any[]) => void;
  }

  export interface ExpressFactory {
    (): ExpressApp;
    json: () => any;
    static: (...args: any[]) => any;
  }

  const express: ExpressFactory;
  export default express;
  export function Router(): Router;
}

declare module "cors" {
  interface CorsOptions {
    origin?: any;
    credentials?: boolean;
  }
  type CorsMiddleware = (req: any, res: any, next: any) => void;
  export default function cors(options?: CorsOptions): CorsMiddleware;
}

declare module "path" {
  export function resolve(...segments: string[]): string;
}

declare module "dotenv" {
  export function config(): void;
}

declare module "multer" {
  interface MulterInstance {
    single: (field: string) => any;
  }
  interface Options {
    dest?: string;
  }
  export default function multer(options?: Options): MulterInstance;
}

declare module "bcrypt" {
  export function hash(data: string, saltRounds: number): Promise<string>;
  export function compare(data: string, encrypted: string): Promise<boolean>;
}

declare module "uuid" {
  export function v4(): string;
}

declare module "mongoose" {
  export class Schema<T = any> {
    constructor(definition?: any, options?: any);
  }

  export interface Document {
    _id: any;
    id: string;
    save: () => Promise<this>;
  }

  export namespace Types {
    type ObjectId = string;
  }

  export namespace Error {
    class ValidationError extends globalThis.Error {
      message: string;
    }
  }

  export interface Model<T = any> {
    findOne: (conditions: any) => Promise<T | null>;
    findById: (id: any) => Promise<T | null>;
    create: (doc: any) => Promise<T>;
  }

  export function model<T = any>(name: string, schema: Schema<T>): Model<T> & T;
  export const models: Record<string, any>;
  export function connect(uri: string): Promise<void>;
}

declare const process: {
  env: Record<string, string | undefined>;
  exit: (code?: number) => void;
};

declare const console: {
  log: (...args: any[]) => void;
  error: (...args: any[]) => void;
  warn: (...args: any[]) => void;
};

type Buffer = any;
