import { Router } from 'express';
const router = Router();

import * as acCtrl from '../controllers/asinsConfirmed';

router.post('/asinsconfirmed', acCtrl.createAsinsConfirmed);

/* router.put('/keywords', ac.updateUrl);

router.get('/keywords', ac.getUrls);

router.delete('/keywords/:id', ac.deleteUrl); */

export default router;
