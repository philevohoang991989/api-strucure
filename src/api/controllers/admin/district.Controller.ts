import { Request, Response } from "express";
import {
  listDistrict,
  createDistrict,
  updateDistrict,
  deleteDistrict,
} from "../../services/admin/district";

export const ListDistrict = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await listDistrict(req, res);
  } catch (e) {
    return next(e);
  }
};
export const CreateDistrict = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await createDistrict(req, res);
  } catch (e) {
    return next(e);
  }
};
export const UpdateDistrict = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await updateDistrict(req, res);
  } catch (e) {
    return next(e);
  }
};
export const DeleteDistrict = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await deleteDistrict(req, res);
  } catch (e) {
    return next(e);
  }
};
