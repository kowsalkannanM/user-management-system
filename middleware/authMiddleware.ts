import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { STATUS_CODE } from '../helpers/constants/status-code';
import { sendErrorResponse } from '../helpers/responses';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return sendErrorResponse(req, res, STATUS_CODE.UNAUTHORIZED, {
      message: 'Access token is missing.',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secret_key', (err, user) => {
    if (err) {
      return sendErrorResponse(req, res, STATUS_CODE.UNAUTHORIZED, {
        message: 'Invalid or expired token.',
      });
    }
    (req as any).user = user; // Add user info to req
    next();
  });
};
