import { Router } from 'express';
import {
	create,
	getAll,
	getById,
	remove,
	update
} from '../controllers/users/users.controller';

const router = Router();

router.get('/',    getAll);
router.post('/',   create);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
