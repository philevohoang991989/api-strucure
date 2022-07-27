import { Request, Response } from "express";

export const PermissionMiddleware = (access: string) => {
  return (req: Request, res: Response, next: Function) => {
    const user_permission = req["user_permission"];
    const arrayPermission = [];
    user_permission.map((item) => {
      arrayPermission.push(item.permission_id);
    });

    if (req.method === "GET") {
      if (
        !arrayPermission.some(
          (permission) => permission.name === `get_${access}`
        )
      ) {
        return res.status(401).send({
          message: "unauthenticated",
        });
      }
    }

    if (req.method === "POST") {
      if (
        !arrayPermission.some(
          (permission) => permission.name === `add_${access}`
        )
      ) {
        return res.status(401).send({
          message: "unauthenticated",
        });
      }
    }
    if (req.method === "PUT") {
      if (
        !arrayPermission.some(
          (permission) => permission.name === `edit_${access}`
        )
      ) {
        return res.status(401).send({
          message: "unauthenticated",
        });
      }
    }

    if (req.method === "DELETE") {
      if (
        !arrayPermission.some(
          (permission) => permission.name === `delete_${access}`
        )
      ) {
        return res.status(401).send({
          message: "unauthenticated",
        });
      }
    }

    next();
  };
};
