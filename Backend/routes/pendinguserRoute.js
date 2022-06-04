import express from 'express';
import pendinguserCtrl from '../controllers/pendinguserCtrl.js';
const router = express.Router();

router.post('/pendingregister', pendinguserCtrl.pendingregister)

router.get('/pendingall', pendinguserCtrl.pendingallusers)

router.delete('/pendingdelete/:id', pendinguserCtrl.deletependingUser)


export default router;