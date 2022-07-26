import { Request, Response } from "express"
import {User} from "../models/userModal"
import {Permissions} from "../models/permissionsModal"

export const PermissionMiddleware = (access: string) =>{
    return (req: Request, res: Response, next: Function) => {
        const user: User = req['user'];

        const permission: Permissions = req['permission']

        const permissionItem = user
        console.log({permissionItem});
        

        // if(req.method === 'GET') {
        //     if(!permission.some(p => (p.name === )))
        // }
        // next()
    }
}