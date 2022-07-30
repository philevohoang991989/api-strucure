import { Request, Response } from "express";
import _ from "lodash";
import bcyptjs from "bcryptjs";
import { getManager } from "typeorm";

// import from file in project
import { httpStatusCodes, mapPermission } from "../../../helpers";
import { Customer } from "../../../models/EntityCustomer/customerModal";
import { CustomerGroup } from "../../../models/EntityCustomer/customerGroupModal";
import { UserPermission } from "../../../models/EntityAdmin/userPermission.Modal";
import { CreateValidation } from "../../../validations/customer/customer/create.validation";

export const listCustomer = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Customer);

  const page = Number(req.query.page) || 1;
  const page_size = Number(req.query.limit) || 10;

  const list = await repository.find({
    relations: ["customer_group_id"],
    skip: (page - 1) * page_size,
    take: page_size,
  });

  return res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    page,
    page_size,
    data: list.map((customer) => {
      const { password, ...data } = customer;
      return data;
    }),
  });
};

export const createCustomer = async (req: Request, res: Response) => {
  const { body } = req;
  const repository = getManager().getRepository(Customer);
  const repository_group_customer = getManager().getRepository(CustomerGroup);
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

  const item = await repository_group_customer.findOneBy({
    id: req.body.customer_group_id,
  });

  const { password, ...user } = await repository.save({
    cus_code: body.cus_code,
    customer_group_id: {
      id: body.customer_group_id,
    },
    username: body.username,
    password: await bcyptjs.hash(body.password, 10),
    avatar: body.avatar,
    fullname: body.fullname,
    email: body.email,
    status: body.status,
    phone: body.phone,
  });

  res.status(httpStatusCodes.OK).send({
    message: "success",
    status: 200,
    data: user,
  });
};
export const getCustomer = async (_id: number, res: Response) => {
  const repository = getManager().getRepository(Customer);

  const user = await repository.find({
    relations: {
      customer_group_id: true,
    },
    where: {
      id: _id,
    },
  });
  const { password, ...body } = user[0];

  res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data: body,
  });
};
export const updateCustomer = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Customer);

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

  delete req.body["id"];

  await repository.update(req.params.id, req.body);

  const data = await repository.findOneBy({ id: Number(req.params.id) });
  const { password, ...dataPost } = data;

  res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data: dataPost,
  });
};
export const deleteCustomer = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Customer);

  const data = await repository.findOneBy({ id: Number(req.params.id) });

  await repository
    .createQueryBuilder()
    .softDelete()
    .from(Customer)
    .where("id = :id", { id: Number(req.params.id) })
    .execute();

  res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data: {},
  });
};
