import { Router } from "express";

import { AuthMiddleware } from "../middlewares/auth.middleware";

import { AuthCustomerMiddleware } from "../middlewares/authCustomer.middleware";

import { Login } from "../controllers/customer/authCustomer.Controller";

import {
  ListCustomerGroup,
  CreateCustomerGroup,
  UpdateCustomerGroup,
  DeleteCustomerGroup,
} from "../controllers/customer/customerGroup.Controller";
import {
  ListCustomer,
  CreateCustomer,
  GetCustomer,
  UpdateCustomer,
} from "../controllers/customer/customer.Controller";

export const customer = async (router: Router) => {
  // Router Customer Group
  router.get("/customer-group/list", ListCustomerGroup);
  router.post("/customer-group/create", CreateCustomerGroup);
  router.put("/customer-group/:id", AuthMiddleware, UpdateCustomerGroup);
  router.delete("/customer-group/:id", AuthMiddleware, DeleteCustomerGroup);

  // Router Customer
  router.get("/customer/list", ListCustomer);
  router.post("/customer/create", CreateCustomer);
  router.get("/customer/:id", GetCustomer);
  router.put("/customer/:id", UpdateCustomer);

  // Auth customer
  router.post("/customer/login", Login);
};
