import express from 'express';
import articleCtrl from '../controllers/article.controller';
import paramValidation from '../../config/param-validation';
import validate from 'express-validation';

const router = express.Router();

router
  .route('/')
  .get(articleCtrl.articleGet)
  .post(validate(paramValidation.createArticle), articleCtrl.articlePost);
router.route('/:article_id').put(articleCtrl.articlePut).delete(articleCtrl.articleDelete);

const ensureToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefine') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403).send(Object.assign({ code: 403 }, { message: '您尚未登入' }));
  }
};
router.get('/personal', ensureToken, articleCtrl.articlePersonalGet);

export default router;
