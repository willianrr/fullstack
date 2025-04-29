import {
	create,
	getAll,
	getById,
	remove,
	update
} from '@controllers/users/users.controller';
import { validateUserBody } from '@validations/validateUserBody';
import { Router } from 'express';

const router = Router();

router.put('/:id', validateUserBody, update);
router.post('/', validateUserBody, create);

router.get('/',    getAll);
router.get('/:id', getById);

router.delete('/:id', remove);

export default router;
