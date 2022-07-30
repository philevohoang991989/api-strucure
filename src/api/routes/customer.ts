import { Router } from "express";

import { AuthMiddleware} from '../middlewares/auth.middleware'

import {
  ListCustomerGroup,
  CreateCustomerGroup,
  UpdateCustomerGroup
} from "../controllers/customer/customerGroup.Controller";


export const customer = async (router: Router) => {
  // Router Customer Group
  router.get("/customer-group/list", ListCustomerGroup);
  router.post("/customer-group/create", AuthMiddleware ,CreateCustomerGroup)
  router.put("/customer-group/:id", AuthMiddleware ,UpdateCustomerGroup)
};
