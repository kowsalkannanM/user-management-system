import { Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const inputPath = file.path;
    const outputPath = path.join('uploads', `compressed-${file.filename}`);

    await sharp(inputPath)
      .resize(800)
      .toFormat('jpeg')
      .jpeg({ quality: 70 })
      .toFile(outputPath);

    fs.unlinkSync(inputPath); // delete original

    res.status(200).json({
      message: 'Image uploaded and processed',
      file: outputPath,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Image processing failed',
      error: err instanceof Error ? err.message : err,
    });
  }
};
