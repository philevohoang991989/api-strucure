import { Request, Response } from "express";

import {
  listUser,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../services/user";

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

export const GetUser = async (req: Request, res: Response, next: Function) => {
  try {
    await getUser(Number(req.params.id), res);
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

export const DeleteUser = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    deleteUser(req, res);
  } catch (e) {
    return next(e);
  }
};
