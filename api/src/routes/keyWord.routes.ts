import { Router } from 'express';
const router = Router();

import * as kwCtrl from '../controllers/keyWord.controller';

router.post('/keywords', kwCtrl.createUrl);

router.put('/keywords', kwCtrl.updateUrl);

export default router;
