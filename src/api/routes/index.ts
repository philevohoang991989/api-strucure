import { Router } from "express";

import { Login } from "../controllers/auth.Controller";
import {AuthMiddleware} from "../middlewares/auth.middleware";

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
  GetUser,
} from "../controllers/User.Controller";

export const routes = async (router: Router) => {
  // Router auth
  router.post("/api/login", Login);

  // Router User Group
  router.get("/api/user-group/list", AuthMiddleware, ListUserGroups);
  router.post("/api/user-group/create", CreateUserGroup);
  router.put("/api/user-group/:id", AuthMiddleware, UpdateUserGroup);
  router.delete("/api/user-group/:id", AuthMiddleware, DeleteUserGroup);

  // Router Permission
  router.get("/api/permission/list", AuthMiddleware, ListPermission);
  router.post("/api/permission/create", CreatePermission);
  router.put("/api/permission/:id", AuthMiddleware, UpdatePermission);
  router.delete("/api/permission/:id", AuthMiddleware, DeletePermission);

  // Router User
  router.get("/api/users/list", AuthMiddleware, ListUser);
  router.post("/api/users/create", CreateUser);
  router.get("/api/users/:id", AuthMiddleware, GetUser);
  router.put("/api/users/:id", AuthMiddleware, UpdateUser);
  router.delete("/api/users/:id", AuthMiddleware, DeleteUser);

  // Router User Permission

  router.get("/api/user-permission/list", ListUserPermission);
  router.post("/api/user-permission/create", CreateUserPermission);
  router.delete("/api/user-permission/:id", DeleteUserPermission);
};
