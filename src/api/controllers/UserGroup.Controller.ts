import {Request, Response} from 'express'

import {listUserGroup} from '../services/userGroup/'

export const ListUserGroups = async (req: Request, res: Response, next: Function)=>{
    
    try{
       await listUserGroup(req, res)
       
    }catch (e){
        return next(e)
    }
}