import { Request, Response } from 'express';

const getPokedex = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Pokedex loaded' });
};

const initPokedex = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Pokedex initialized' });
};

const updatePokedex = (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: `Pokedex for user ${req.params.id} updated` });
};

const deletePokedex = (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: `Pokedex for user ${req.params.id} deleted` });
};

export { getPokedex, initPokedex, updatePokedex, deletePokedex };
