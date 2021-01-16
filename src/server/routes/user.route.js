import express from 'express';
import userCtrl from '../controllers/user.controller';

const router = express.Router();

router.route('/').post(userCtrl.userPost).get(userCtrl.userGet);

router.route('/:user_id').put(userCtrl.userPut).delete(userCtrl.userDelete);

export default router;
