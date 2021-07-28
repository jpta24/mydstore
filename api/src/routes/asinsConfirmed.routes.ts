import { Router } from 'express';
const router = Router();

import * as acCtrl from '../controllers/asinsConfirmed';

router.put('/asinsconfirmed', acCtrl.updateAsinsConfirmed);

router.get('/asinsconfirmed', acCtrl.getAsinsConfirmed);

/* router.put('/keywords', ac.updateUrl);



router.delete('/keywords/:id', ac.deleteUrl); */

export default router;
