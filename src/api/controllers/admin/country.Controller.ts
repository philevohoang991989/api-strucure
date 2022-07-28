import { Request, Response } from "express";
import {
  listCountry,
  createCountry,
  updateCountry,
  deleteCountry,
} from "../../services/admin/country";

export const ListCountry = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await listCountry(req, res);
  } catch (e) {
    return next(e);
  }
};
export const CreateCountry = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await createCountry(req, res);
  } catch (e) {
    return next(e);
  }
};
export const UpdateCountry = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await updateCountry(req, res);
  } catch (e) {
    return next(e);
  }
};
export const DeleteCountry = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await deleteCountry(req, res);
  } catch (e) {
    return next(e);
  }
};
