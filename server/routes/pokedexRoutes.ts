import { Router } from 'express';
import {
  deletePokedex,
  getPokedex,
  initPokedex,
  updatePokedex,
} from '../controllers/pokedexController.js';
import checkJwt from '../middleware/checkJwt.js';

const router: Router = Router();

router
  .route('/')
  .get(checkJwt, getPokedex)
  .post(checkJwt, initPokedex)
  .put(checkJwt, updatePokedex)
  .delete(checkJwt, deletePokedex);

export default router;
