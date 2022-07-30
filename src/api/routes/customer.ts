import { Router } from "express";

import {
  ListCustomerGroup,
} from "../controllers/customer/customerGroup.Controller";


export const customer = async (router: Router) => {
  // Router Customer Group
  router.get("/customer-group/list", ListCustomerGroup);
};
