import { Request, Response } from 'express';
import Book from '../models/Book';
import { sendResponse, sendErrorResponse } from '../helpers/responses';
import { STATUS_CODE } from '../helpers/constants/status-code';
import { STATUS_MESSAGE } from '../helpers/constants/status-message';

export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, genre, published_date, author_id } = req.body;

    if (!title || !author_id) {
      return sendErrorResponse(req, res, STATUS_CODE.BAD_REQUEST, {
        message: 'Title and author_id are required.',
      });
    }

    const book = await Book.create({ title, genre, published_date, author_id });
    sendResponse(req, res, STATUS_CODE.CREATED, STATUS_MESSAGE.CREATED, book);
  } catch {
    sendErrorResponse(req, res, STATUS_CODE.INTERNAL_SERVER_ERROR, {
      message: STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

export const getBooks = async (_req: Request, res: Response) => {
  try {
    const books = await Book.findAll();
    sendResponse(_req, res, STATUS_CODE.SUCCESS, STATUS_MESSAGE.SUCCESS, books);
  } catch {
    sendErrorResponse(_req, res, STATUS_CODE.INTERNAL_SERVER_ERROR, {
      message: STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return sendErrorResponse(req, res, STATUS_CODE.NOT_FOUND, {
        message: 'Book not found',
      });
    }
    sendResponse(req, res, STATUS_CODE.SUCCESS, STATUS_MESSAGE.SUCCESS, book);
  } catch {
    sendErrorResponse(req, res, STATUS_CODE.INTERNAL_SERVER_ERROR, {
      message: STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, genre } = req.body;

    const book = await Book.findByPk(id);
    if (!book) {
      return sendErrorResponse(req, res, STATUS_CODE.NOT_FOUND, {
        message: 'Book not found',
      });
    }

    book.title = title ?? book.title;
    book.genre = genre ?? book.genre;

    await book.save();

    sendResponse(req, res, STATUS_CODE.SUCCESS, STATUS_MESSAGE.UPDATED, book);
  } catch (error) {
    sendErrorResponse(req, res, STATUS_CODE.INTERNAL_SERVER_ERROR, {
      message: STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return sendErrorResponse(req, res, STATUS_CODE.NOT_FOUND, {
        message: 'Book not found',
      });
    }
    await book.destroy();
    sendResponse(req, res, STATUS_CODE.SUCCESS, STATUS_MESSAGE.DELETED, {
      message: 'Book deleted successfully',
    });
  } catch {
    sendErrorResponse(req, res, STATUS_CODE.INTERNAL_SERVER_ERROR, {
      message: STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};
