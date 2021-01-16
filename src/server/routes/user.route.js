import express from 'express';
import userCtrl from '../controllers/user.controller';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';

const router = express.Router();

router
  .route('/')
  .post(validate(paramValidation.createUser), userCtrl.userPost)
  .get(userCtrl.userGet);

router.route('/:user_id').put(userCtrl.userPut).delete(userCtrl.userDelete);

export default router;
