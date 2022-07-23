import {Request, Response} from 'express'

import {listUserGroup} from '../services/userGroup/'

export const ListUserGroups = async (req: Request, res: Response, next: Function)=>{
    
    try{
        const list = await listUserGroup(req, res)
        return res.send({
            message: 'success',
            status: 200,
            data: [] || list 
        });
    }catch (e){
        return next(e)
    }
}