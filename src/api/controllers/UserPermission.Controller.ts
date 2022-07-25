import { Request, Response } from "express";
import {
  listUserPermission,
  createUserPermission,
  deleteUserPermission,
} from "../services/userPermission";

export const ListUserPermission = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await listUserPermission(req, res);
  } catch (e) {
    return next(e);
  }
};

export const CreateUserPermission = async (
  req: Request,
  res: Response,
  next?: Function
) => {
  try {
    await createUserPermission(req.body, res);
  } catch (e) {
    return next(e);
  }
};

export const DeleteUserPermission = async (
  req: Request,
  res: Response,
  next?: Function
) => {
  try {
    await deleteUserPermission(Number(req.params.id), res);
  } catch (e) {
    return next(e);
  }
};
