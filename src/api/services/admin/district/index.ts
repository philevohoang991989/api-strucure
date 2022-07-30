import { Request, Response } from "express";
import { getManager } from "typeorm";
import { httpStatusCodes } from "../../../helpers";
import { District } from "../../../models/EntityAdmin/districtModal";
import { CreateDistrictValidation } from "../../../validations/admin/district/create.validation";
import { EditDistrictValidation } from "../../../validations//admin/district/edit.validation";

export const listDistrict = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(District);

  const list = await repository.find({
    relations: ["country_id"],
  });

  return res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data: list,
  });
};
export const createDistrict = async (req, res?: Response) => {
  const body = req.body;
  const repository = getManager().getRepository(District);

  const { error } = CreateDistrictValidation.validate(body);

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
    country_id: {
      id: body.country_id,
    },
  });
  // const data = await repository.save(body);

  return res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data,
  });
};
export const updateDistrict = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(District);
  const { error } = EditDistrictValidation.validate(req.body);

  if (error) {
    return res.status(httpStatusCodes.BAD_REQUEST).send(error.details);
  }

  delete req.body["id"];
  delete req.body["country_id"];

  await repository.update(req.params.id, req.body);

  const data = await repository.findOneBy({ id: Number(req.params.id) });

  res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data,
  });
};
export const deleteDistrict = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(District);

  const data = await repository.findOneBy({ id: Number(req.params.id) });

  await repository
    .createQueryBuilder()
    .softDelete()
    .from(District)
    .where("id = :id", { id: Number(req.params.id) })
    .execute();

  res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data: {},
  });
};
