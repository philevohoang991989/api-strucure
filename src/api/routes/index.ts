import { Router } from "express";

import {
  Login,
  UpdateInfo,
  Logout,
  UpdatePassword,
} from "../controllers/admin/auth.Controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { PermissionMiddleware } from "../middlewares/permission.middleware";

import {
  ListUserGroups,
  CreateUserGroup,
  UpdateUserGroup,
  DeleteUserGroup,
} from "../controllers/admin/UserGroup.Controller";
import {
  ListPermission,
  CreatePermission,
  UpdatePermission,
  DeletePermission,
} from "../controllers/admin/permission.Controller";

import {
  ListUserPermission,
  CreateUserPermission,
  DeleteUserPermission,
} from "../controllers/admin/UserPermission.Controller";

import {
  ListUser,
  CreateUser,
  UpdateUser,
  DeleteUser,
  GetUser,
} from "../controllers/admin/User.Controller";

import {
  ListLanguage,
  CreateLanguage,
  UpdateLanguage,
  DeleteLanguage,
} from "../controllers/admin/language.Controller";

export const routes = async (router: Router) => {
  // Router language
  router.get("/api/lang/list", ListLanguage);
  router.post("/api/lang/create", AuthMiddleware, CreateLanguage);
  router.post("/api/lang/:id", AuthMiddleware, UpdateLanguage);
  router.delete("/api/lang/:id", AuthMiddleware, DeleteLanguage);

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
