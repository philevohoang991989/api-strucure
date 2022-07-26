import { Response } from "express";

export const httpStatusCodes = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED_ERROR: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
};

export const mapPermission = (
  arrayMap,
  userId,
  actionFun: Function,
  resPermission
) => {
  arrayMap.map((item) => {
    const bodyPost = {
      permission_id: Number(item),
      user_id: userId,
    };
    actionFun(bodyPost, resPermission);
  });
};

export const Role = {
  Admin: "Admin",
  SuperAdmin: "Super Admin",
};
