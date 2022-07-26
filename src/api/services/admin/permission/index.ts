import { Request, Response } from "express";
import _ from "lodash";
import { getManager } from "typeorm";
import { Permissions } from "../../../models/EntityAdmin/permissionsModal";
import { httpStatusCodes } from "../../../helpers";
import { CreateValidation } from "../../../validations/admin/Permissions/create.validation";

export const listPermission = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Permissions);

  const list = await repository.find();

  return res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data: list,
  });
};
export const createPermission = async (req: Request, res: Response) => {
  const body = req.body;
  const repository = getManager().getRepository(Permissions);
  const { error } = CreateValidation.validate(body);

  if (error) {
    return res.status(httpStatusCodes.BAD_REQUEST).send(error.details);
  }
  const name = await repository.findOneBy({ name: req.body.name });

  const type_error = name ? "Name" : "";

  if (type_error) {
    return res.status(httpStatusCodes.NOT_FOUND).send({
      status: httpStatusCodes.NOT_FOUND,
      message: `Name already exists`,
    });
  }

  const data = await repository.save(body);

  res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data: data,
  });
};
export const updatePermission = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Permissions);

  delete req.body["id"];

  await repository.update(req.params.id, req.body);

  const data = await repository.findOneBy({ id: Number(req.params.id) });

  res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data,
  });
};

export const deletePermission = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Permissions);

  const data = await repository.findOneBy({ id: Number(req.params.id) });

  await repository
    .createQueryBuilder()
    .softDelete()
    .from(Permissions)
    .where("id = :id", { id: Number(req.params.id) })
    .execute();

  res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data: {},
  });
};
