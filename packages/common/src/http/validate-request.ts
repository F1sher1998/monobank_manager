import {z} from 'zod';
import { HttpError } from '../errors/http-error';
import type { NextFunction, Response, Request } from 'express';
import { ZodObject, ZodError, ZodTypeAny } from "zod"

type Schema = ZodObject<any> | ZodTypeAny
type ParamsRecord = Record<string, string>
type QueryRecord = Record<string, unknown>


export interface RequstValidationSchemas{
    body?: Schema,
    params?: Schema,
    query?: Schema
}


const formatedError = (error: ZodError) => 
    error.issues.map((issue: any) => ({
    path: issue.path.join("/"),
    message: issue.message
}))



export const validateRequest = (schemas: RequstValidationSchemas) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        try{
            if(schemas.body){
                const parsedBody = schemas.body.parse(req.body) as unknown;
                (req as any).body = parsedBody
            }


            if(schemas.params){
                const parsedParams = schemas.params.parse(req.params) as ParamsRecord;
                req.params = parsedParams as Request["params"]
            }


            if(schemas.query){
                const parsedQuery = schemas.query.parse(req.query) as QueryRecord;
                req.query = parsedQuery as Request["query"]
            }

            next()
        }catch(error){
            if(error instanceof ZodError){
                next(
                    new HttpError(422, "Validation Error", {
                        issues: formatedError(error),
                    }),
                );
                return;
            }

            next(error)
        }
    }
}