import { Router } from 'express';
const router = Router();

import * as asinCtrl from '../controllers/asins.controller';

router.post('/asins', asinCtrl.createAsin);

router.get('/asins', asinCtrl.getAsins);

/* router.put('/keywords', kwCtrl.updateUrl);

router.delete('/keywords/:id', kwCtrl.deleteUrl); */

export default router;
