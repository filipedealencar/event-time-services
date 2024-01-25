import jwt, { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { promisify } from "util";
import { User } from "../models/usersModel";

dotenv.config();

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>> | void> {
  const authHeader = req.headers.authorization;
  const menssageErroToken = "Error: You need to login to access the page!";

  if (!authHeader) {
    return res.status(400).json({
      error: true,
      message: menssageErroToken,
    });
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({
      valid: false,
      message: "Access denied. Token not provided",
    });
  }

  try {
    await new Promise<void>((resolve, reject) => {
      jwt.verify(
        token,
        process.env.SECRET_KEY as string,
        (err: jwt.VerifyErrors | null) => {
          if (err) {
            return reject(err);
          }
          resolve();
        }
      );
    });
    return next();
  } catch (err) {
    return res.status(403).json({
      valid: false,
      message: menssageErroToken,
    });
  }
}
