import {Request, Response} from 'express'
import {getManager} from 'typeorm'
import {httpStatusCodes} from  "../../helpers"
import {UserGroup} from '../../models/userGroupModal'
import {CreateValidation} from '../../validations/UserGroup/create.validation'

export const listUserGroup = async (req: Request, res: Response)=>{
    const repository = getManager().getRepository(UserGroup);

    const list = await repository.find()

    return res.send({
        message: 'success',
        status: 200,
        data: [] || list 
    });
}

export const createUserGroup = async (req: Request, res: Response)=>{

    const body = req.body
    const repository = getManager().getRepository(UserGroup);
    const {error} = CreateValidation.validate(body);
   
    if(error){
        return res.status(httpStatusCodes.BAD_REQUEST).send(error.details)
    }
    const name = await repository.findOneBy({name: req.body.name});
    const permission = await repository.findOneBy({permission: req.body.permission});

    const type_error = name ? "Name" : permission ? "Permission" : ""

    if(type_error){
        return res.send({
            status: httpStatusCodes.NOT_FOUND,
            message: `${type_error} already exists`
        });
    }

    const data = await repository.save(body)

    res.send({
        message: 'success',
        status: 200,
        data: data
    });
}