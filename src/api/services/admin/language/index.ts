import { Request, Response } from "express";
import { getManager } from "typeorm";
import { httpStatusCodes } from "../../../helpers";
import { Language } from "../../../models/EntityAdmin/languageModal";
import { LanguageValidation } from "../../../validations/admin/language/create.validation";

export const listLanguage = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Language);

  const list = await repository.find();

  return res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data: list,
  });
};

export const createLanguage = async (req, res?: Response) => {
  const body = req.body;
  const repository = getManager().getRepository(Language);

  const { error } = LanguageValidation.validate(body);

  if (error) {
    return res.status(httpStatusCodes.BAD_REQUEST).send(error.details);
  }

  const name = await repository.findOneBy({ name: body.name });

  const type_error = name ? "Name" : "";

  if (type_error) {
    return res.status(httpStatusCodes.NOT_FOUND).send({
      status: httpStatusCodes.NOT_FOUND,
      message: `Name already exists`,
    });
  }
  const data = await repository.save(body);

  return res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data,
  });
};
export const updateLanguage = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Language);
  const { error } = LanguageValidation.validate(req.body);

  if (error) {
    return res.status(httpStatusCodes.BAD_REQUEST).send(error.details);
  }

  delete req.body["id"];

  await repository.update(req.params.id, req.body);

  const data = await repository.findOneBy({ id: Number(req.params.id) });

  res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data,
  });
};
export const deleteLanguage = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Language);

  const data = await repository.findOneBy({ id: Number(req.params.id) });

  await repository
    .createQueryBuilder()
    .softDelete()
    .from(Language)
    .where("id = :id", { id: Number(req.params.id) })
    .execute();

  res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data: {},
  });
};
