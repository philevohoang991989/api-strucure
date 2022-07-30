import { Request, Response } from "express";
import {
  listCustomer,
  createCustomer,
  getCustomer,
} from "../../services/customer/customer";

export const ListCustomer = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await listCustomer(req, res);
  } catch (e) {
    return next(e);
  }
};
export const CreateCustomer = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await createCustomer(req, res);
  } catch (e) {
    return next(e);
  }
};
export const GetCustomer = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await getCustomer(Number(req.params.id), res);
  } catch (e) {
    return next(e);
  }
};
