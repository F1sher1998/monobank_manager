import type { NextFunction, Response, Request } from 'express';
import { ZodObject, ZodTypeAny } from "zod";
type Schema = ZodObject<any> | ZodTypeAny;
export interface RequstValidationSchemas {
    body?: Schema;
    params?: Schema;
    query?: Schema;
}
export declare const validateRequest: (schemas: RequstValidationSchemas) => (req: Request, _res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=validate-request.d.ts.map