import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

// GET /api/pokedex
const getPokedex = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Pokedex loaded' });
});

// POST /api/pokedex
const initPokedex = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  res.status(200).json({ message: 'Pokedex initialized' });
});

// PUT /api/pokedex/:id
const updatePokedex = asyncHandler(async (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: `Pokedex for user ${req.params.id} updated` });
});

// DELETE /api/pokedex/:id
const deletePokedex = asyncHandler(async (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: `Pokedex for user ${req.params.id} deleted` });
});

export { getPokedex, initPokedex, updatePokedex, deletePokedex };
