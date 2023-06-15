import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Pokedex from '../model/pokedexModel.js';

// GET /api/pokedex
const getPokedex = asyncHandler(async (req: Request, res: Response) => {
  if (!req.auth?.payload.sub) {
    throw new Error('No valid user ID provided.');
  }

  const userId: string = req.auth.payload.sub;

  const pokedex = await Pokedex.findById(userId);

  if (!pokedex) {
    res.status(400);
    throw new Error(`Pokedex for user ${userId} not found`);
  }

  res.status(200).json(pokedex);
});

// POST /api/pokedex
const initPokedex = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body._id) {
    throw new Error('No valid user ID provided.');
  }

  const userId: string = req.body._id;

  const pokedex = await Pokedex.create({
    _id: userId,
    caughtMons: [],
  });

  res.status(200).json(pokedex);
});

// PUT /api/pokedex
const updatePokedex = asyncHandler(async (req: Request, res: Response) => {
  if (!req.auth?.payload.sub) {
    throw new Error('No valid user ID provided.');
  }

  const userId: string = req.auth.payload.sub;

  const pokedex = await Pokedex.findById(userId);

  if (!pokedex) {
    res.status(400);
    throw new Error(`Pokedex for user ${userId} not found`);
  }

  const updatedPokedex = await Pokedex.findByIdAndUpdate(userId, req.body, {
    new: true,
  });

  res.status(200).json(updatedPokedex);
});

// DELETE /api/pokedex/:id
const deletePokedex = asyncHandler(async (req: Request, res: Response) => {
  const pokedex = await Pokedex.findById(req.params.id);

  if (!pokedex) {
    res.status(400);
    throw new Error(`Pokedex for user ${req.params.id} not found`);
  }

  await pokedex.deleteOne();

  res.status(200).json({ id: req.params.id });
});

export { getPokedex, initPokedex, updatePokedex, deletePokedex };
