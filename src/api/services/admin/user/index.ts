// import from lib
import { Request, Response } from "express";
import _ from "lodash";
import bcyptjs from "bcryptjs";
import { getManager } from "typeorm";

// import from file in project
import { httpStatusCodes, mapPermission } from "../../../helpers";
import { User } from "../../../models/EntityAdmin/userModal";
import { UserGroup } from "../../../models/EntityAdmin/userGroupModal";
import { UserPermission } from "../../../models/EntityAdmin/userPermission.Modal";
import {
  createUserPermission,
  deleteUserPermission,
} from "../userPermission";
import { CreateValidation } from "../../../validations/admin/user/create.validation";

export const listUser = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User);

  const page = Number(req.query.page) || 1;
  const page_size = Number(req.query.limit) || 10;

  const list = await repository.find({
    relations: ["group_id"],
    skip: (page - 1) * page_size,
    take: page_size,
  });

  return res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    page,
    page_size,
    data: list.map((user) => {
      const { password, ...data } = user;
      return data;
    }),
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
    return res.status(httpStatusCodes.NOT_FOUND).send({
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
    groupID: body.group_id,
    phone: body.phone,
    group_id: {
      id: body.group_id,
    },
  });

  const userId: number = (
    await repository.findOneBy({ username: req.body.username })
  ).id;

  /*   
    Create User Permission with array permission find from table user_permission
    item.permission:  Array map
    userId : id user edit
    createUserPermission: Function create user permission 
  */
  mapPermission(item.permission, userId, createUserPermission, res);

  res.status(httpStatusCodes.OK).send({
    message: "success",
    status: 200,
    data: user,
  });
};

export const getUser = async (_id: number, res: Response) => {
  const repository = getManager().getRepository(User);

  const { password, ...user } = await repository.findOneBy({ id: _id });

  res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data: user,
  });
};
export const updateUser = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User);
  const repository_group = getManager().getRepository(UserGroup);
  const table_user_permis = getManager().getRepository(UserPermission);

  const username = await repository.find({
    where: {
      username: req.body.username,
    },
  });
  const email = await repository.find({
    where: {
      email: req.body.email,
    },
  });
  const fullname = await repository.find({
    where: {
      fullname: req.body.fullname,
    },
  });
  const type_error =
    username.length == 0
      ? "Username"
      : email.length == 0
      ? "Email"
      : fullname.length == 0
      ? "Fullname"
      : "";

  if (type_error) {
    return res.status(httpStatusCodes.UNAUTHORIZED_ERROR).send({
      status: httpStatusCodes.UNAUTHORIZED_ERROR,
      message: `Are you sure you want to change ${type_error}?`,
    });
  }

  const user = await repository.findOneBy({ id: Number(req.params.id) });

  // Map all item in table user_permission with user_id = _id edit
  // Will execute following query:
  // DELETE FROM `user_permission` WHERE user_id = _id

  const item = await table_user_permis.find({
    relations: {
      user_id: true,
    },
    where: {
      user_id: {
        id: user.id,
      },
    },
  });

  const itemUserGroup = await repository_group.findOneBy({
    id: req.body.group_id,
  });

  // If group_id update !== group_id of user edit

  if (req.body.group_id !== user.groupID) {
    item.map((itemFind) => {
      deleteUserPermission(itemFind.id, res);
    });

    // Create User Permissions with Array itemUserGroup edit new

    mapPermission(
      itemUserGroup.permission,
      req.params.id,
      createUserPermission,
      res
    );
  }

  delete req.body["id"];

  await repository.update(req.params.id, req.body);

  const itemGroup = await repository_group.findOneBy({ id: req.body.group_id });

  const data = await repository.findOneBy({ id: Number(req.params.id) });
  const { password, ...dataPost } = {
    ...data,
    groupID: req.body.group_id,
    role: itemGroup.name,
  };

  res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data: dataPost,
  });
};
export const deleteUser = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User);
  const table_user_permis = getManager().getRepository(UserPermission);

  const user = await repository.findOneBy({ id: Number(req.params.id) });
  if (user) {
    const item = await table_user_permis.find({
      relations: {
        user_id: true,
      },
      where: {
        user_id: {
          id: user.id,
        },
      },
    });
    item.map((itemFind) => {
      deleteUserPermission(itemFind.id, res);
    });

    await repository
      .createQueryBuilder()
      .softDelete()
      .from(User)
      .where("id = :id", { id: Number(req.params.id) })
      .execute();

    res.status(httpStatusCodes.OK).send({
      message: "success",
      status: httpStatusCodes.OK,
      data: {},
    });
  } else {
    res.status(httpStatusCodes.UNAUTHORIZED_ERROR).send({
      message: "User does not exist",
      status: httpStatusCodes.UNAUTHORIZED_ERROR,
      data: null,
    });
  }
};
