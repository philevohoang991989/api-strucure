import { Request, Response } from "express";
import bcyptjs from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getManager } from "typeorm";
import { httpStatusCodes } from "../../helpers";
import { User } from "../../models/EntityAdmin/userModal";
import { LoginValidation } from "../../validations/auth/login.validation";

export const login = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User);

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
export const logout = async (req: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.send({
    message: "success",
    status: httpStatusCodes.OK,
    data: {},
  });
};
