import type { AuthenticatedUser } from "@common/src";

declare global {
        namespace Express{
                interface Request {
                        user?: AuthenticatedUser
                }
        }
}
export {}