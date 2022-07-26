import { Router } from "express";

import {
  ListUserGroups,
  CreateUserGroup,
  UpdateUserGroup,
  DeleteUserGroup,
} from "../controllers/UserGroup.Controller";
import {
  ListPermission,
  CreatePermission,
  UpdatePermission,
  DeletePermission,
} from "../controllers/permission.Controller";

import {
  ListUserPermission,
  CreateUserPermission,
  DeleteUserPermission,
} from "../controllers/UserPermission.Controller";

import {
  ListUser,
  CreateUser,
  UpdateUser,
  DeleteUser,
} from "../controllers/User.Controller";

export const routes = async (router: Router) => {
  // Router User Group
  router.get("/api/user-group/list", ListUserGroups);
  router.post("/api/user-group/create", CreateUserGroup);
  router.put("/api/user-group/:id", UpdateUserGroup);
  router.delete("/api/user-group/:id", DeleteUserGroup);

  // Router Permission
  router.get("/api/permission/list", ListPermission);
  router.post("/api/permission/create", CreatePermission);
  router.put("/api/permission/:id", UpdatePermission);
  router.delete("/api/permission/:id", DeletePermission);

  // Router User
  router.get("/api/users/list", ListUser);
  router.post("/api/users/create", CreateUser);
  router.put("/api/users/:id", UpdateUser);
  router.delete("/api/users/:id", DeleteUser);

  // Router User Permission

  router.get("/api/user-permission/list", ListUserPermission);
  router.post("/api/user-permission/create", CreateUserPermission);
  router.delete("/api/user-permission/:id", DeleteUserPermission);
};
