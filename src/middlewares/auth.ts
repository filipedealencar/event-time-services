import jwt, { JwtPayload } from "jsonwebtoken";
import { promisify } from "util";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const { verify } = jwt;

export async function eAdmin(
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
      error: true,
      message: "Access denied. Token not provided",
    });
  }

  try {
    const decode = await promisify<string, string, any>(verify)(
      token,
      process.env.SECRET_KEY as string
    );

    // if (!decode.permissions?.includes("admin")) {
    //   return res.status(403).json({
    //     error: true,
    //     message: "Error: You don't have permission to access this route!",
    //   });
    // }

    req.body.userId = decode.id;

    return next();
  } catch (err) {
    return res.status(403).json({
      error: true,
      message: menssageErroToken,
    });
  }
}
