import { Request, Response } from "express";
import { getManager } from "typeorm";
import { httpStatusCodes } from "../../../helpers";
import { UserPermission } from "../../../models/EntityAdmin/userPermission.Modal";
import { CreateValidation } from "../../../validations/admin/userPermission/create.validation";
import { createUserPermmiss } from "../../../@types/global.type";

export const listUserPermission = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(UserPermission);

  const list = await repository.find({
    relations: ["permission_id", "user_id"],
  });

  return res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data: list,
  });
};

export const createUserPermission = async (
  body: createUserPermmiss,
  res?: Response
) => {
  const repository = getManager().getRepository(UserPermission);

  const { error } = CreateValidation.validate(body);

  if (error) {
    return res.status(httpStatusCodes.BAD_REQUEST).send(error.details);
  }
  const data = await repository.save({
    permission_id: {
      id: body.permission_id,
    },
    user_id: {
      id: body.user_id,
    },
  });

  // res.send({
  //   message: "success",
  //   status: 200,
  //   data,
  // });
};
export const deleteUserPermission = async (_id: number, res: Response) => {
  const repository = getManager().getRepository(UserPermission);

  const data = await repository.findOneBy({ id: Number(_id) });

  await repository.remove(data);
  // .createQueryBuilder()
  // .softDelete()
  // .from(UserPermission)
  // .where("id = :id", { id: Number(req.params.id) })
  // .execute();

  // res.send({
  //   message: "success",
  //   status: httpStatusCodes.OK,
  //   data: {},
  // });
};
