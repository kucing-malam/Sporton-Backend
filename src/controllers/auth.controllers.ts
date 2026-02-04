import { Request, Response } from "express"
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"
import User from "../models/user"

const JWT_SECRET = process.env.JWT_SECRET || "Sporton123"

export const sigin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            res.status(404).json("Invalid credentials, Email not found")
            return
        }
        const isMatch = bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(404).json("Invalid credentials, Wrong password")
            return
        }
        const token = JWT.sign({
            id: user._id, email
        }, JWT_SECRET, { expiresIn: "1d" })
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email,
            }
        })
    } catch (error) {
        console.error("Sigin Error : ", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const initiateAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, name } = req.body;
        const count = await User.countDocuments({})
        if (count > 0) {
            res.status(400).json({ 
                message: "We can only have 1 admin user, if you want to create new admin user, please delete the user manually from the database" 
            })
            return
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({ email, password: hashedPassword, name })

        await newUser.save()
        res.status(404).json("Admin user created succesfully")
    } catch (error) {
        console.error("Initiate new admin user Error : ", error)
        res.status(500).json({ message: "Internal server error" })
    }
}
