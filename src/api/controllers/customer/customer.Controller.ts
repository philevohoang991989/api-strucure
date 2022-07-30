import { Request, Response } from "express";
import {
  listCustomer,
  createCustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer,
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
export const UpdateCustomer = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await updateCustomer(req, res);
  } catch (e) {
    return next(e);
  }
};
export const DeleteCustomer = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await deleteCustomer(req, res);
  } catch (e) {
    return next(e);
  }
};
