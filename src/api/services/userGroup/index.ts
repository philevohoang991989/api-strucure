import {Request, Response} from 'express'
import _ from 'lodash'
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
        data: list
    });
}

export const createUserGroup = async (req: Request, res: Response)=>{
    console.log(req.body);
    

    const body = req.body
    const repository = getManager().getRepository(UserGroup);
    const {error} = CreateValidation.validate(body);
   
    if(error){
        return res.status(httpStatusCodes.BAD_REQUEST).send(error.details)
    }
    const name = await repository.findOneBy({name: req.body.name});

    const type_error = name ? "Name" : ""

    if(type_error){
        return res.send({
            status: httpStatusCodes.NOT_FOUND,
            message: `Name already exists`
        });
    }

    const data = await repository.save(body)

    res.send({
        message: 'success',
        status: 200,
        data: data
    });
}

export const updateUserGroup = async (req: Request, res: Response)=>{

    const repository = getManager().getRepository(UserGroup);

    delete req.body['id'];
    
    await repository.update(req.params.id, req.body);

    const data = await repository.findOneBy({id: Number(req.params.id)})


    res.send({
        message: 'success',
        status: httpStatusCodes.OK,
        data
    })
}
export const deleteUserGroup =async (req: Request, res: Response) => {

    const repository = getManager().getRepository(UserGroup)
    
    const data = await repository.findOneBy({id: Number(req.params.id)})
    console.log({repository1: getManager().getRepository(UserGroup)});
    
    await repository.createQueryBuilder()
    .softDelete()
    .from(UserGroup)
    .where("id = :id", { id: Number(req.params.id) })
    .execute()

    res.send({
        message: 'success',
        status: httpStatusCodes.OK,
        data: {}
    });
    
}