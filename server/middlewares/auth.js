import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
    const token = req.query.token; // Read from query params

    if (!token) {
        return res.json({ success: false, message: "Not authorized, login again" });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = tokenDecode.id; // FIX: Attach userId directly to req, not req.body

        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export default userAuth;
