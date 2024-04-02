import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


interface AuthRequest extends Request {
    user?: any; // Define the user property
}


// Authentication middleware function
const jwtSecret = process.env.JWT_SECRET!;

export const authenticateToken = (req: AuthRequest, res: Response, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const user= decodedToken;
        req.user = user;
        next();
    });
};


// Authorization middleware function
export const authorizeAdmin = (req: AuthRequest, res: Response, next: any) => {
    const userRole = req.user.role;
    if (userRole !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }
    next();
};

