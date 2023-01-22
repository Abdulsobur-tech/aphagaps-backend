import bycrpt from "bcrypt"
import jwt from "jsonwebtoken";

export const comparePassword = (password, hash) => {
    return bycrpt.compare(password, hash)
}

export const hashPassword = (password) => {
    return bycrpt.hash(password, 5)
}


export const createJWT = (user) => {
    const token = jwt.sign(
        { id: user.id, username: user.firstname },
        process.env.JWT_SECRET
    );
    return token
};

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization

    if (!bearer) {
        res.status(401)
        res.json({ message: "Not authorized" })
        return
    }
    const [, token] = bearer.split(" ")
    if (!token) {
        res.status(401)
        res.json({ message: "Not valid token" })
        return
    }
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        next()
    } catch (error) {
        console.log(error);
        res.status(401)
        res.json({ message: "Invalid Token" })
        return
    }
}