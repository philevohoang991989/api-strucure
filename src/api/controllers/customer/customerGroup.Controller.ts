import { Request, Response } from "express";
import {
  listCustomerGroup,
} from "../../services/customer/customerGroup";

export const ListCustomerGroup = async (req: Request, res: Response, next: Function) => {
  try {
    await listCustomerGroup(req, res);
  } catch (e) {
    return next(e);
  }
};