import { Request, Response } from 'express';
import Author from '../models/Author';
import { sendResponse, sendErrorResponse } from '../helpers/responses';
import { STATUS_CODE } from '../helpers/constants/status-code';
import { STATUS_MESSAGE } from '../helpers/constants/status-message';

export const createAuthor = async (req: Request, res: Response) => {

  try {
    const { name, bio } = req.body;

    if (!name) {
      return sendErrorResponse(req, res, STATUS_CODE.BAD_REQUEST, {
        message: 'Name is required.',
      });
    }

    const author = await Author.create({ name, bio });
    sendResponse(req, res, STATUS_CODE.CREATED, STATUS_MESSAGE.CREATED, author);
  } catch {
    sendErrorResponse(req, res, STATUS_CODE.INTERNAL_SERVER_ERROR, {
      message: STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

export const getAuthors = async (_req: Request, res: Response) => {
  try {
    const authors = await Author.findAll();
    sendResponse(_req, res, STATUS_CODE.SUCCESS, STATUS_MESSAGE.SUCCESS, authors);
  } catch {
    sendErrorResponse(_req, res, STATUS_CODE.INTERNAL_SERVER_ERROR, {
      message: STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

export const getAuthorById = async (req: Request, res: Response) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) {
      return sendErrorResponse(req, res, STATUS_CODE.NOT_FOUND, {
        message: 'Author not found',
      });
    }
    sendResponse(req, res, STATUS_CODE.SUCCESS, STATUS_MESSAGE.SUCCESS, author);
  } catch {
    sendErrorResponse(req, res, STATUS_CODE.INTERNAL_SERVER_ERROR, {
      message: STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const { name, bio } = req.body;
    const { id } = req.params;

    const author = await Author.findByPk(id);
    if (!author) {
      return sendErrorResponse(req, res, STATUS_CODE.NOT_FOUND, {
        message: 'Author not found',
      });
    }

    author.name = name ?? author.name;
    author.bio = bio ?? author.bio;

    await author.save();

    sendResponse(req, res, STATUS_CODE.SUCCESS, STATUS_MESSAGE.UPDATED, author);
  } catch {
    sendErrorResponse(req, res, STATUS_CODE.INTERNAL_SERVER_ERROR, {
      message: STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};


export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) {
      return sendErrorResponse(req, res, STATUS_CODE.NOT_FOUND, {
        message: 'Author not found',
      });
    }
    await author.destroy();
    sendResponse(req, res, STATUS_CODE.SUCCESS, STATUS_MESSAGE.DELETED, {
      message: 'Author deleted successfully',
    });
  } catch {
    sendErrorResponse(req, res, STATUS_CODE.INTERNAL_SERVER_ERROR, {
      message: STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};
