import { Request, Response } from "express";
import {
  login,
  logout,
  updateInfo,
  updatePassword,
} from "../../services/customer/auth";

export const Login = async (req: Request, res: Response, next: Function) => {
  try {
    await login(req, res);
  } catch (e) {
    return next(e);
  }
};
export const UpdateInfo = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await updateInfo(req, res);
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
export const UpdatePassword = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await updatePassword(req, res);
  } catch (e) {
    return next(e);
  }
};
