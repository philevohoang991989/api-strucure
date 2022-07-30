import { Request, Response } from "express";
import {
  listLanguage,
  createLanguage,
  updateLanguage,
  deleteLanguage,
} from "../../services/admin/language";

export const ListLanguage = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await listLanguage(req, res);
  } catch (e) {
    return next(e);
  }
};
export const CreateLanguage = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await createLanguage(req, res);
  } catch (e) {
    return next(e);
  }
};

export const UpdateLanguage = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await updateLanguage(req, res);
  } catch (e) {
    return next(e);
  }
};

export const DeleteLanguage = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await deleteLanguage(req, res);
  } catch (e) {
    return next(e);
  }
};
