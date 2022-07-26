import { Request, Response } from "express";
import { login, logout } from "../services/auth";

export const Login = async (req: Request, res: Response, next: Function) => {
  try {
    await login(req, res);
  } catch (e) {
    return next(e);
  }
};
export const Logout = async (req: Request, res: Response, next: Function) => {
  try {
    await logout(req, res);
  } catch (e) {
    return next(e);
  }
};
