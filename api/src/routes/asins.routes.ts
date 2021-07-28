import { Router } from 'express';
const router = Router();

import * as asinCtrl from '../controllers/asins.controller';

router.post('/asins', asinCtrl.createAsin);

/* router.put('/keywords', kwCtrl.updateUrl);

router.get('/keywords', kwCtrl.getUrls);

router.delete('/keywords/:id', kwCtrl.deleteUrl); */

export default router;
