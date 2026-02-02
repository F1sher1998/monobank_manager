import { userService } from "@/services/user.service";
export const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        res.json({ data: user });
    }
    catch (error) {
        next(error);
    }
};
export const getAllUsers = async (req, res, next) => {
    try {
        const users = userService.getAllUsers();
        res.json({ data: users });
    }
    catch (error) {
        next(error);
    }
};
export const createUser = async (req, res, next) => {
    try {
        const payload = req.body;
        const user = await userService.createUser(payload);
        res.status(201).json({ data: user });
    }
    catch (error) {
        next(error);
    }
};
export const searchUsers = async (req, res, next) => {
    try {
        const { query, limit, exclude } = req.query;
        const user = await userService.searchUsers({
            query,
            limit,
            excludeIds: exclude
        });
        res.json({ data: user });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=user.controller.js.map