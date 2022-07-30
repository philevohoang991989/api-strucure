import { Request, Response } from "express";
import { getManager } from "typeorm";
import { httpStatusCodes } from "../../../helpers";
import { Ward } from "../../../models/EntityAdmin/wardModal";
import { CreateWardValidation } from "../../../validations/admin/ward/create.validation";
import { EditWardValidation } from "../../../validations/admin/ward/edit.validation";

export const listWard = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Ward);

  const list = await repository.find({
    relations: ["district_id"],
  });

  return res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data: list,
  });
};
export const createWard = async (req, res?: Response) => {
  const body = req.body;
  const repository = getManager().getRepository(Ward);

  const { error } = CreateWardValidation.validate(body);

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
  const data = await repository.save({
    ...body,
    district_id: {
      id: body.district_id,
    },
  });
  // const data = await repository.save(body);

  return res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data,
  });
};
export const updateWard = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Ward);
  const { error } = EditWardValidation.validate(req.body);

  if (error) {
    return res.status(httpStatusCodes.BAD_REQUEST).send(error.details);
  }

  delete req.body["id"];
  delete req.body["district_id"];

  await repository.update(req.params.id, req.body);

  const data = await repository.findOneBy({ id: Number(req.params.id) });

  res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data,
  });
};
export const deleteWard = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Ward);

  const data = await repository.findOneBy({ id: Number(req.params.id) });

  await repository
    .createQueryBuilder()
    .softDelete()
    .from(Ward)
    .where("id = :id", { id: Number(req.params.id) })
    .execute();

  res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data: {},
  });
};
