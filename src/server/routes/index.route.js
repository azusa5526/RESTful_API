import express from 'express';
import config from './../../config/config';
import article from './article.route';
import user from './user.route';

const router = express.Router();

/* GET localhost:[port]/api page. */
router.get('/', (req, res) => {
  res.send(`此路徑是: localhost:${config.port}/api`);
});

router.use('/article', article);
router.use('/user', user);

export default router;
