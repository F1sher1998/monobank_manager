import { login, refreshTokens, register, revokeRefreshToken } from "@/services/auth.service";
import { asyncHandler, HttpError } from "@common/src";
export const registerHandler = asyncHandler(async (req, res) => {
    const payload = req.body;
    const tokens = await register(payload);
    res.status(201).json(tokens);
});
export const loginHandler = asyncHandler(async (req, res) => {
    const payload = req.body;
    const tokens = await login(payload);
    res.json(tokens);
});
export const refreshHandler = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        throw new HttpError(400, 'refreshToken is required');
    }
    const tokens = await refreshTokens(refreshToken);
    res.json(tokens);
});
export const revokeHandler = (async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        throw new HttpError(400, 'userId is required');
    }
    await revokeRefreshToken(userId);
    res.status(204).send();
});
//# sourceMappingURL=auth.controller.js.map