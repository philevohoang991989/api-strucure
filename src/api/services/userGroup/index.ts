import {Request, Response} from 'express'
import {getManager} from 'typeorm'
import {UserGroup} from '../../models/userGroupModal'

export const listUserGroup = async (req: Request, res: Response)=>{
    const repository = getManager().getRepository(UserGroup);

    const list = await repository.find()

    return res.send({
        message: 'success',
        status: 200,
        data: [] || list 
    });
}