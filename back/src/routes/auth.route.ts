import { login } from '@controllers/auth/auth.controller';
import { validateLoginBody } from '@validations/validateLoginBody';
import { Router } from 'express';

const router = Router();

router.post('/login', validateLoginBody, login);

export default router;
