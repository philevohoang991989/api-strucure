import { Request, Response } from "express";
import {
  listCustomerGroup,
  createCustomerGroup,
  updateCustomerGroup,
  deleteCustomerGroup,
} from "../../services/customer/customerGroup";

export const ListCustomerGroup = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await listCustomerGroup(req, res);
  } catch (e) {
    return next(e);
  }
};

export const CreateCustomerGroup = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await createCustomerGroup(req, res);
  } catch (e) {
    return next(e);
  }
};

export const UpdateCustomerGroup = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await updateCustomerGroup(req, res);
  } catch (e) {
    return next(e);
  }
};
export const DeleteCustomerGroup = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await deleteCustomerGroup(req, res);
  } catch (e) {
    return next(e);
  }
};
