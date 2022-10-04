import jwt from "jsonwebtoken";
import Users from './../Models/Users.js';

export const auth = async (req, res, next) => {
    let token
    const authHeader = req.headers.authorization

    if (authHeader && authHeader.startsWith('Bearer')) {
        try {
            // extract token from authHeader string
            token = authHeader.split(' ')[1]

            // verified token returns user id
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // find user's obj in db and assign to req.user 
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            res.status(401).json('Not authorized, invalid token')
        }
    }

    if (!token) {
        res.status(401).json('Not authorized, no token found')
    }

    // try {
    //     const token = req.header("Authorization")
    //     if (!token) return res.status(400).json({ msg: "Invalid Authentication." })
    //     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    //         if (err) return res.status(400).json({ msg: "Invalid Authentication." })
    //         req.user = user
    //         next()
    //     })
    // } catch (err) {
    //     return res.status(500).json({ msg: err.message })
    // }
}
export const isAdmin = async (req, res, next) => {
    try {
        // const admin = req.user && req.user.isAdmin;
        // if (!admin) {
        //     res.status(401).json({ msg: 'Not authorized, no token found' })
        // }
        // next()
        const user = await Users.findOne({ _id: req.user.id })
        if (!user) {
            return res.status(500).json({ msg: "No Authorization to see that page" })
        }
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}