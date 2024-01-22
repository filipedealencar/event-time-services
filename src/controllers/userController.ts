import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/usersModel";

export class UserControllers {
  createUser = async (req: Request, res: Response) => {
    let data = req.body;
    data.password = await bcrypt.hash(data.password, 8);
    const user = new User(data);
    user
      .save()
      .then(() => {
        res.json({
          success: true,
          message: "User registered successfully",
        });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ success: false, message: `Failed to register user: ${err}` });
      });
  };

  userLogin = async (req: Request, res: Response) => {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).json({
        error: true,
        message: "Error: Incorrect username or password!",
      });
    }

    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).json({
        error: true,
        message: "Error: Incorrect username or password!",
      });
    }

    let token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      process.env.SECRET_KEY as string,
      {
        expiresIn: "1h", //1 hora
      }
    );

    return res.json({
      success: true,
      message: "Login successful!",
      token,
    });
  };
}
