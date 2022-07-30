import { Request, Response } from "express";
import { getManager } from "typeorm";
import { httpStatusCodes } from "../../../helpers";
import { CustomerGroup } from "../../../models/EntityCustomer/customerGroupModal";

export const listCustomerGroup = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(CustomerGroup);

  const list = await repository.find();

  return res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data: list,
  });
};
