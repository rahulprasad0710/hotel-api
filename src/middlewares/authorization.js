import jwt from "jsonwebtoken";
import Key from "../config/AppConfig.js";

// const verifyToken = (req, res, next) => {

// };

export function verifyToken(req, res, next) {
    const authHeader = req.header("Authorization");
    // split Bearer fron token
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
        return res
            .status(401)
            .json({ success: false, data: null, error: "Access Denied" });

    try {
        const verified = jwt.verify(token, Key.JWT_SECRET);
        const userVerified = { ...verified, token };
        req.user = userVerified;
        next();
        return true;
    } catch (error) {
        res.status(400).json({
            success: false,
            data: null,
            error: "Invalid Token",
        });
        return false;
    }
}

export const verifyAdmin = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res
            .status(401)
            .json({ success: false, data: null, error: "Access Denied" });
    }
    try {
        const verified = jwt.verify(token, Key.JWT_SECRET);
        if (!verified.isAdmin)
            return res
                .status(403)
                .json({ success: false, data: null, error: "Unauthorized" });

        req.user = verified;
        return next();
    } catch (error) {
        return res
            .status(400)
            .json({ success: false, data: null, error: "Invalid Admin Token" });
    }
};

export const checkPermission = (requiredPermission) => (req, res, next) => {
    if (!req.user.isAdmin || !req.user.permission)
        return res
            .status(403)
            .json({ success: false, data: null, error: "Unauthorized" });
    if (!req.user.permission.includes(requiredPermission))
        return res.status(403).json({
            success: false,
            data: null,
            error: "Not Allowed. Permission Denied",
        });
    const tempUser = { ...req.user };
    tempUser.permissionType = requiredPermission;
    req.user = tempUser;
    return next();
};
