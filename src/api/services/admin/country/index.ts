import { Request, Response } from "express";
import { getManager } from "typeorm";
import { httpStatusCodes } from "../../../helpers";
import { Country } from "../../../models/EntityAdmin/countryModal";
import { CreateValidation } from "../../../validations/admin/country/create.validation";

export const listCountry = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Country);

  const list = await repository.find();

  return res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data: list,
  });
};
export const createCountry = async (req, res?: Response) => {
  const body = req.body;
  const repository = getManager().getRepository(Country);

  const { error } = CreateValidation.validate(body);

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
export const updateCountry = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Country);
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

export const deleteCountry = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Country);

  const data = await repository.findOneBy({ id: Number(req.params.id) });

  await repository
    .createQueryBuilder()
    .softDelete()
    .from(Country)
    .where("id = :id", { id: Number(req.params.id) })
    .execute();

  res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data: {},
  });
};
