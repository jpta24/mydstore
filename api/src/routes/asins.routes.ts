import { Router } from 'express';
const router = Router();

import * as kwCtrl from '../controllers/keyWord.controller';

router.post('/keywords', kwCtrl.createUrl);

router.put('/keywords', kwCtrl.updateUrl);

router.get('/keywords', kwCtrl.getUrls);

router.delete('/keywords/:id', kwCtrl.deleteUrl);

export default router;
