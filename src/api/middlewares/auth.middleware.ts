import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getManager } from "typeorm";
import { User } from "../models/userModal";
import { UserPermission } from "../models/userPermission.Modal";

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const jwt = req.cookies["jwt"];

    const payload: any = verify(jwt, process.env.SECRET_KEY);

    if (!payload) {
      return res.status(401).send({
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
    return res.status(401).send({
      message: "unauthenticated",
    });
  }
};
