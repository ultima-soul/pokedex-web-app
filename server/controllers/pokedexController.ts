import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Pokedex from '../model/pokedexModel.js';

// GET /api/pokedex
const getPokedex = asyncHandler(async (req: Request, res: Response) => {
  const pokedexes = await Pokedex.find();

  res.status(200).json(pokedexes);
});

// POST /api/pokedex
const initPokedex = asyncHandler(async (req: Request, res: Response) => {
  const pokedex = await Pokedex.create({
    caughtPokes: [],
  });

  res.status(200).json(pokedex);
});

// PUT /api/pokedex/:id
const updatePokedex = asyncHandler(async (req: Request, res: Response) => {
  const pokedex = await Pokedex.findById(req.params.id);

  if (!pokedex) {
    res.status(400);
    throw new Error(`Pokedex for user ${req.params.id} not found`);
  }

  const updatedPokedex = await Pokedex.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedPokedex);
});

// DELETE /api/pokedex/:id
const deletePokedex = asyncHandler(async (req: Request, res: Response) => {
  const pokedex = await Pokedex.findById(req.params.id);

  if (!pokedex) {
    res.status(400);
    throw new Error(`Pokedex for user ${req.params.id} not found`);
  }

  await pokedex.remove();

  res.status(200).json({ id: req.params.id });
});

export { getPokedex, initPokedex, updatePokedex, deletePokedex };
