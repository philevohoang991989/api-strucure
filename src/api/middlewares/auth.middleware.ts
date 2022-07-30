import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getManager } from "typeorm";
import { httpStatusCodes } from "../helpers";
import { User } from "../models/EntityAdmin/userModal";
import { UserPermission } from "../models/EntityAdmin/userPermission.Modal";

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const jwt = req.cookies["jwt"];
    const payload: any = verify(jwt, process.env.SECRET_KEY);
    if (!payload) {
      return res
        .status(httpStatusCodes.UNAUTHORIZED_ERROR)
        .send({
          status: httpStatusCodes.UNAUTHORIZED_ERROR,
          message: "unauthenticated",
        });
    }
    const repository = getManager().getRepository(User);
    const repoUserPermission = getManager().getRepository(UserPermission);

    req["user"] = await repository.findOne({
      where: { id: payload.id },
      relations: ["group_id"],
    });

    req["user_permission"] = await repoUserPermission.find({
      relations: {
        permission_id: true,
      },
      where: {
        user_id: {
          id: payload.id,
        },
      },
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
