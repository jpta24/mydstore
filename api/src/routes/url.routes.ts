import { Router } from 'express';
const router = Router();

import * as urlCtrl from '../controllers/url.controller';

router.get('/urls', urlCtrl.getUrls);

router.get('/urls/:id', urlCtrl.getUrl);

router.post('/urls', urlCtrl.createUrl);

router.delete('/urls/:id', urlCtrl.deleteUrl);

router.put('/urls/:id', urlCtrl.updateUrl);

export default router;
