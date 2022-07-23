import {Request, Response} from 'express'

import {listUserGroup, createUserGroup} from '../services/userGroup/'

export const ListUserGroups = async (req: Request, res: Response, next: Function)=>{
    
    try{
       await listUserGroup(req, res)
       
    }catch (e){
        return next(e)
    }
}

export const CreateUserGroup =async (req: Request, res: Response, next: Function) => {
    try{
        await createUserGroup(req, res)
     }catch (e){
         return next(e)
     }
}