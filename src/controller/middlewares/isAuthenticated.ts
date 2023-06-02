import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWTData } from '../../types/JWTData';

const JWT_SECRET = process.env.JWT_SECRET;

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
   const authHeader = req.header('Authorization');
   const token = authHeader && authHeader.split(' ')[1];
   if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
   }
   try {
      const decoded = jwt.verify(token, JWT_SECRET) as JWTData; next();
   } catch
   (err) {
      res.status(401).json({ message: 'Token is not valid' });
   }
};
