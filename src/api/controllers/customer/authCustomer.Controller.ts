import { Request, Response } from "express";
import {
  login,
  //   logout,
  //   updateInfo,
  //   updatePassword,
} from "../../services/customer/auth";

export const Login = async (req: Request, res: Response, next: Function) => {
  try {
    await login(req, res);
  } catch (e) {
    return next(e);
  }
};
