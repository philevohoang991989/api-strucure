import { Request, Response } from "express";
import { getManager } from "typeorm";
import { httpStatusCodes } from "../../../helpers";
import { CustomerGroup } from "../../../models/EntityCustomer/customerGroupModal";
import { CreateValidation } from "../../../validations/customer/customerGroup/create.validation";

export const listCustomerGroup = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(CustomerGroup);

  const list = await repository.find();

  return res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data: list,
  });
};
export const createCustomerGroup = async (req: Request, res: Response) => {
  const body = req.body;
  const repository = getManager().getRepository(CustomerGroup);
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

export const updateCustomerGroup = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(CustomerGroup);
  const { error } = CreateValidation.validate(req.body);

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

export const deleteCustomerGroup = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(CustomerGroup);

  const data = await repository.findOneBy({ id: Number(req.params.id) });
  await repository
    .createQueryBuilder()
    .softDelete()
    .from(CustomerGroup)
    .where("id = :id", { id: Number(req.params.id) })
    .execute();
  // .remove(data);

  res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data: {},
  });
};
