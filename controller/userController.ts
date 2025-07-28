import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendResponse, sendErrorResponse } from '../helpers/responses';
import { STATUS_CODE } from '../helpers/constants/status-code';
import { STATUS_MESSAGE } from '../helpers/constants/status-message';

// Register user
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return sendErrorResponse(req, res, STATUS_CODE.BAD_REQUEST, {
        message: 'Name, email, and password are required.',
      });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return sendErrorResponse(req, res, STATUS_CODE.CONFLICT, {
        message: 'Email already exists.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role: 'user' });

    sendResponse(req, res, STATUS_CODE.CREATED, STATUS_MESSAGE.CREATED, {
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {

    console.log(error)
    sendErrorResponse(req, res, STATUS_CODE.INTERNAL_SERVER_ERROR, {
      message: STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendErrorResponse(req, res, STATUS_CODE.BAD_REQUEST, {
        message: 'Email and password are required.',
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return sendErrorResponse(req, res, STATUS_CODE.UNAUTHORIZED, {
        message: 'Invalid email or password.',
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret_key', {
      expiresIn: '1d',
    });

    sendResponse(req, res, STATUS_CODE.SUCCESS, STATUS_MESSAGE.SUCCESS, {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    sendErrorResponse(req, res, STATUS_CODE.INTERNAL_SERVER_ERROR, {
      message: STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

