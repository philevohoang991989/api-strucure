import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getManager } from "typeorm";
import { httpStatusCodes } from "../helpers";
import { Customer } from "../models/EntityCustomer/customerModal";

export const AuthCustomerMiddleware = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const jwt = req.cookies["jwt"];
    const payload: any = verify(jwt, process.env.SECRET_KEY);
    if (!payload) {
      return res.status(httpStatusCodes.UNAUTHORIZED_ERROR).send({
        status: httpStatusCodes.UNAUTHORIZED_ERROR,
        message: "unauthenticated",
      });
    }
    const repository = getManager().getRepository(Customer);

    req["customer"] = await repository.findOne({
      where: { id: payload.id },
      relations: ["customer_group_id"],
    });

    // By(payload.id);

    next();
  } catch (e) {
    return res.status(httpStatusCodes.UNAUTHORIZED_ERROR).send({
      status: httpStatusCodes.UNAUTHORIZED_ERROR,
      message: "unauthenticated",
    });
  }
};
