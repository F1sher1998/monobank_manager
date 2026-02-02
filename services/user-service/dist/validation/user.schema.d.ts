import { z } from "@common/src";
export declare const createUserSchema: any;
export declare const userIdParamsSchema: any;
export declare const excludeSchema: any;
export declare const searchUserQuerySchema: any;
export type SearchUserQuery = z.infer<typeof searchUserQuerySchema>;
export type CreateUserBody = z.infer<typeof createUserSchema>;
export type UserIdParams = z.infer<typeof userIdParamsSchema>;
//# sourceMappingURL=user.schema.d.ts.map