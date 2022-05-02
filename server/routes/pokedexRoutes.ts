import { Router } from 'express';
import {
  deletePokedex,
  getPokedex,
  initPokedex,
  updatePokedex,
} from '../controllers/pokedexController.js';

const router: Router = Router();

router.route('/').get(getPokedex).post(initPokedex);
router.route('/:id').put(updatePokedex).delete(deletePokedex);

export default router;
