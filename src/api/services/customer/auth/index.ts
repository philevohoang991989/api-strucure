import { Request, Response } from "express";
import bcyptjs from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getManager } from "typeorm";
import { httpStatusCodes } from "../../../helpers";
import { Customer } from "../../../models/EntityCustomer/customerModal";
import { LoginValidation } from "../../../validations/admin/auth/login.validation";
import { UpdatePasswordValidation } from "../../../validations/admin/auth/updatePassword.validation";

export const login = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Customer);

  const { error } = LoginValidation.validate(req.body);

  if (error) {
    return res.status(httpStatusCodes.BAD_REQUEST).send(error.details);
  }
  const live_token = 24 * 60 * 60 * 1000;
  const user = await repository.findOneBy({ username: req.body.username });
  if (!user) {
    return res.send({
      message: "user not found",
      status: httpStatusCodes.NOT_FOUND,
    });
  }
  if (!(await bcyptjs.compare(req.body.password, user.password))) {
    return res.status(httpStatusCodes.BAD_REQUEST).send({
      message: "invalid password",
      status: httpStatusCodes.BAD_REQUEST,
    });
  }
  const token = sign(
    {
      id: user.id,
    },
    process.env.SECRET_KEY
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: live_token,
  });
  const { password, ...info } = user;

  res.status(httpStatusCodes.OK).send({
    message: "success",
    status: httpStatusCodes.OK,
    data: {
      access_token: token,
      live_token: live_token,
      user: info,
    },
  });
};

export const updateInfo = async (req: Request, res: Response) => {
  const customer = req["customer"];

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

  await repository.update(customer.id, req.body);

  const { password, ...data } = await repository.findOneBy(customer.id);
  res.send({
    message: "success",
    status: httpStatusCodes.OK,
    data,
  });
};
export const logout = async (req: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.send({
    message: "success",
    status: httpStatusCodes.OK,
    data: {},
  });
};
export const updatePassword = async (req: Request, res: Response) => {
  const customer = req["customer"];

  const { error } = UpdatePasswordValidation.validate(req.body);

  if (error) {
    return res.status(httpStatusCodes.BAD_REQUEST).send(error.details);
  }

  if (!(await bcyptjs.compare(req.body.old_password, customer.password))) {
    return res.status(httpStatusCodes.BAD_REQUEST).send({
      message: "invalid password",
      status: httpStatusCodes.BAD_REQUEST,
    });
  }

  if (req.body.password !== req.body.password_confirm) {
    return res.status(httpStatusCodes.BAD_REQUEST).send({
      message: "Password's do not match",
    });
  }

  const repository = getManager().getRepository(Customer);

  await repository.update(customer.id, {
    password: await bcyptjs.hash(req.body.password, 10),
  });

  const { password, ...data } = customer;
  res.cookie("jwt", "", { maxAge: 0 });
  res.send({
    message: "success",
    status: httpStatusCodes.OK,
    data,
  });
};
