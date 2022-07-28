import { Request, Response } from "express";

import {
  listUserGroup,
  createUserGroup,
  updateUserGroup,
  deleteUserGroup,
} from "../../services/admin/userGroup";

export const ListUserGroups = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await listUserGroup(req, res);
  } catch (e) {
    return next(e);
  }
};

export const CreateUserGroup = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await createUserGroup(req, res);
  } catch (e) {
    return next(e);
  }
};

export const UpdateUserGroup = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await updateUserGroup(req, res);
  } catch (e) {
    return next(e);
  }
};

export const DeleteUserGroup = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await deleteUserGroup(req, res);
  } catch (e) {
    return next(e);
  }
};
