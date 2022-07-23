import {Router} from "express";

import {ListUserGroups} from '../controllers/UserGroup.Controller'

export const routes =async (router: Router)=>{
    router.get('/api/user-group/list', ListUserGroups)
}