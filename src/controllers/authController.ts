import { Request, Response } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/users';
import { signupSchema, loginSchema } from '../utils/validation';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    console.error('JWT secret is not defined');
    // Handle the case where JWT secret is not defined, e.g., throw an error or return a response
}

export const signup = async (req: Request, res: Response) => {
    try {
        const { error } = signupSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ email: user.email, username: user.username, role: user.role }, jwtSecret!);
        res.json({ token, username: user.username, role: user.role });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create admin user endpoint
// export const adminSignUp = async (req: Request, res: Response) => {
//     try {
//         // Validate request payload
//         const { error } = signupSchema.validate(req.body);
//         if (error) {
//             return res.status(400).json({ message: error.details[0].message });
//         }

//         const { username, email, password } = req.body;
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Email already exists' });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ username, email, password: hashedPassword, role: 'admin' }); // Set role to 'admin'
//         await newUser.save();

//         res.status(201).json({ message: 'Admin user created successfully' });
//     } catch (err) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };
