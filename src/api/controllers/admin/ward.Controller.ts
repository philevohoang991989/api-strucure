import { Request, Response } from "express";
import {
  listWard,
  createWard,
  updateWard,
  deleteWard,
} from "../../services/admin/ward";

export const ListWard = async (req: Request, res: Response, next: Function) => {
  try {
    await listWard(req, res);
  } catch (e) {
    return next(e);
  }
};
export const CreateWard = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await createWard(req, res);
  } catch (e) {
    return next(e);
  }
};
export const UpdateWard = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await updateWard(req, res);
  } catch (e) {
    return next(e);
  }
};
export const DeleteWard = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await deleteWard(req, res);
  } catch (e) {
    return next(e);
  }
};
