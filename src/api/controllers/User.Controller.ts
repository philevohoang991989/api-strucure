import { Request, Response } from "express";

import { listUser, createUser, updateUser } from "../services/user";

export const ListUser = async (req: Request, res: Response, next: Function) => {
  try {
    await listUser(req, res);
  } catch (e) {
    return next(e);
  }
};

export const CreateUser = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await createUser(req, res);
  } catch (e) {
    return next(e);
  }
};

export const UpdateUser = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await updateUser(req, res);
  } catch (e) {
    return next(e);
  }
};
