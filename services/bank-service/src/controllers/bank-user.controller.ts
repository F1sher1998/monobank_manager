import { CreateBankUserBody } from "@/validation/bank-user.schema";
import { createBankUserSchema } from "@/validation/bank-user.schema";
import { bankUserService } from "@/services/bank-user.service";
import { AsyncHandler } from "@common/src";
import { HttpError } from "@common/src";

export const createBankUser: AsyncHandler = async(req, res, next) => {
        try{
                const payload = req.body as CreateBankUserBody
                const user = await bankUserService.createUser(payload);

                res.status(201).json({ data: user })
        }catch(error){
                next(error)
        }
}

export const getAllBankUsers: AsyncHandler = async(_req, res, next) => {
        try{
                const users = await bankUserService.getAllUsers();
                res.status(200).json({ data: users })
        }catch(error){
                next(error)
        }
}

export const getBankUser: AsyncHandler = async(req, res, next) => {
        try{
                const { id } = req.params as { id: string };
                const user = await bankUserService.getUserById(id);
                
                if(!user){
                        throw new HttpError(404, 'Bank user not found');
                }
                
                res.status(200).json({ data: user })
        }catch(error){
                next(error)
        }
}
