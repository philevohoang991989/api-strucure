import { Request, Response } from "express";
import _ from "lodash";
import bcyptjs from "bcryptjs";
import { getManager, In } from "typeorm";
import { httpStatusCodes } from "../../helpers";
import { User } from "../../models/userModal";
import { UserGroup } from "../../models/userGroupModal";
import { UserPermission } from "../../models/userPermission.Modal";
import { createUserPermission } from "../../services/userPermission";
import { deleteUserPermission } from "../../services/userPermission";
import { CreateValidation } from "../../validations/user/create.validation";
import { createUserPermmiss } from "../../@types/global.type";

export const listUser = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User);

  const list = await repository.find({
    relations: ["group_id"],
  });

  return res.send({
    message: "success",
    status: 200,
    data: list,
  });
};

export const createUser = async (req: Request, res: Response) => {
  const { body } = req;
  const repository = getManager().getRepository(User);
  const repository_group = getManager().getRepository(UserGroup);
  const { error } = CreateValidation.validate(body);

  if (error) {
    return res.status(httpStatusCodes.BAD_REQUEST).send(error.details);
  }

  if (body.password !== body.password_confirm) {
    return res.status(httpStatusCodes.BAD_REQUEST).send({
      message: "Password's do not match",
    });
  }

  const username = await repository.findOneBy({ username: req.body.username });
  const email = await repository.findOneBy({ email: req.body.email });

  const type_error = username ? "Username" : email ? "Email" : "";

  if (type_error) {
    return res.send({
      status: httpStatusCodes.NOT_FOUND,
      message: `${type_error} already exists`,
    });
  }

  const item = await repository_group.findOneBy({ id: req.body.group_id });

  const { password, ...user } = await repository.save({
    username: body.username,
    password: await bcyptjs.hash(body.password, 10),
    avatar: body.avatar,
    full_name: body.full_name,
    email: body.email,
    status: body.status,
    role: item.name,
    phone: body.phone,
    group_id: {
      id: body.group_id,
    },
  });

  const userId: number = (
    await repository.findOneBy({ username: req.body.username })
  ).id;

  item.permission.map((item) => {
    const bodyPost: createUserPermmiss = {
      permission_id: Number(item),
      user_id: userId,
    };
    createUserPermission(bodyPost, res);
  });

  res.send({
    message: "success",
    status: 200,
    data: user,
  });
};
export const updateUser = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User);
  const repository_group = getManager().getRepository(UserGroup);
  const table_user_permis = getManager().getRepository(UserPermission);

  const itemGroupUser = await repository_group.findOneBy({
    id: req.body.group_id,
  });

  const _id = (await repository.findOneBy({ id: Number(req.params.id) })).id;

  const item = await table_user_permis.find({
    select: ["user_id"],
    where: { id: _id },
  });
  // // DELETE FROM `user_permission` WHERE user_id = 15
  console.log({ item });

  // delete req.body["id"];

  // await repository.update(req.params.id, req.body);

  // const data = await repository.findOneBy({ id: Number(req.params.id) });

  // res.send({
  //   message: "success",
  //   status: httpStatusCodes.OK,
  //   data,
  // });
};
