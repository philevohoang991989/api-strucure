import { Request, Response } from "express";

import {
  listPermission,
  createPermission,
  updatePermission,
  deletePermission,
} from "../../services/admin/permission";

export const ListPermission = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await listPermission(req, res);
  } catch (e) {
    return next(e);
  }
};

export const CreatePermission = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await createPermission(req, res);
  } catch (e) {
    return next(e);
  }
};
export const UpdatePermission = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await updatePermission(req, res);
  } catch (e) {
    return next(e);
  }
};
export const DeletePermission = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await deletePermission(req, res);
  } catch (e) {
    return next(e);
  }
};
