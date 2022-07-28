import { Request, Response } from "express";
import _ from "lodash";
import { getManager } from "typeorm";
import { httpStatusCodes } from "../../helpers";
import { UserGroup } from "../../models/EntityAdmin/userGroupModal";
import { CreateValidation } from "../../validations/UserGroup/create.validation";

export const listUserGroup = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(UserGroup);

  const list = await repository.find();

  return res.send({
    message: "success",
    status: 200,
    data: list,
  });
};

export const createUserGroup = async (req: Request, res: Response) => {

  const body = req.body;
  const repository = getManager().getRepository(UserGroup);
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

export const updateUserGroup = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(UserGroup);

  delete req.body["id"];

  await repository.update(req.params.id, req.body);

  const data = await repository.findOneBy({ id: Number(req.params.id) });

  res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data,
  });
};
export const deleteUserGroup = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(UserGroup);

  const data = await repository.findOneBy({ id: Number(req.params.id) });
  if (data.permission.length > 0) {
    return res.status(httpStatusCodes.NOT_FOUND).send({
      status: httpStatusCodes.NOT_FOUND,
      message: "Permission not empty",
    });
  }

  await repository
    .createQueryBuilder()
    .softDelete()
    .from(UserGroup)
    .where("id = :id", { id: Number(req.params.id) })
    .execute();
  // .remove(data);

  res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data: {},
  });
};
