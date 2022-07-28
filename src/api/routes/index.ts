import { Router } from "express";

import {
  Login,
  UpdateInfo,
  Logout,
  UpdatePassword,
} from "../controllers/auth.Controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { PermissionMiddleware } from "../middlewares/permission.middleware";

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
  router.post("/api/logout", AuthMiddleware, Logout);
  router.put("/api/update-info", AuthMiddleware, UpdateInfo);
  router.put("/api/update-pass", AuthMiddleware, UpdatePassword);

  // Router User Group
  router.get(
    "/api/user-group/list",
    AuthMiddleware,
    PermissionMiddleware("user_group"),
    ListUserGroups
  );
  router.post(
    "/api/user-group/create",
    AuthMiddleware,
    PermissionMiddleware("user_group"),
    CreateUserGroup
  );
  router.put(
    "/api/user-group/:id",
    AuthMiddleware,
    PermissionMiddleware("user_group"),
    UpdateUserGroup
  );
  router.delete(
    "/api/user-group/:id",
    AuthMiddleware,
    PermissionMiddleware("user_group"),
    DeleteUserGroup
  );

  // Router Permission
  router.get(
    "/api/permission/list",
    AuthMiddleware,
    PermissionMiddleware("permission"),
    ListPermission
  );
  router.post(
    "/api/permission/create",
    AuthMiddleware,
    PermissionMiddleware("permission"),
    CreatePermission
  );
  router.put(
    "/api/permission/:id",
    AuthMiddleware,
    PermissionMiddleware("permission"),
    UpdatePermission
  );
  router.delete(
    "/api/permission/:id",
    AuthMiddleware,
    PermissionMiddleware("permission"),
    DeletePermission
  );

  // Router User
  router.get(
    "/api/users/list",
    AuthMiddleware,
    PermissionMiddleware("users"),
    ListUser
  );
  router.post(
    "/api/users/create",
    AuthMiddleware,
    PermissionMiddleware("users"),
    CreateUser
  );
  router.get(
    "/api/users/:id",
    AuthMiddleware,
    PermissionMiddleware("users"),
    GetUser
  );
  router.put(
    "/api/users/:id",
    AuthMiddleware,
    PermissionMiddleware("users"),
    UpdateUser
  );
  router.delete(
    "/api/users/:id",
    AuthMiddleware,
    PermissionMiddleware("users"),
    DeleteUser
  );

  // Router User Permission

  router.get(
    "/api/user-permission/list",
    PermissionMiddleware("user_permission"),
    ListUserPermission
  );
  router.post(
    "/api/user-permission/create",
    PermissionMiddleware("user_permission"),
    CreateUserPermission
  );
  router.delete(
    "/api/user-permission/:id",
    PermissionMiddleware("user_permission"),
    DeleteUserPermission
  );
};
