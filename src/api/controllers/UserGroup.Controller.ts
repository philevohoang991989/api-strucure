import {Request, Response} from 'express'

import {listUserGroup} from '../services/userGroup/'

export const UserGroups = (req: Request, res: Response)=>{
    const body = req.body;

    listUserGroup
}