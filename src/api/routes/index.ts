import {Router} from "express";

import {ListUserGroups, CreateUserGroup, UpdateUserGroup, DeleteUserGroup} from '../controllers/UserGroup.Controller'

export const routes =async (router: Router)=>{

    // Router User Group
    router.get('/api/user-group/list', ListUserGroups)
    router.post('/api/user-group/create', CreateUserGroup)
    router.put('/api/user-group/:id', UpdateUserGroup)
    router.delete('/api/user-group/:id', DeleteUserGroup)
}