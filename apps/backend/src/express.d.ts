declare module "express-serve-static-core" {
  interface Request {
    context?: {
      user?: {
        uid: string;
        email: string;
      };
    };
  }
}

export {};