import {Request, Response} from 'express'
import {getManager} from 'typeorm'
import {UserGroup} from '../../models/userGroupModal'

export const listUserGroup = async (req: Request, res: Response)=>{
    const repository = getManager().getRepository(UserGroup);

    const listUserGroup = await repository.find()


    res.send({
        message: 'success',
        status: 200,
        data: listUserGroup
    });
}