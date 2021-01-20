import Joi from 'joi';

export default {
  // POST /api/article
  createArticle: {
    body: {
      user_id: Joi.number().required(),
      article_title: Joi.string().required(),
      article_tag: Joi.string().required(),
      article_content: Joi.string().min(15).required()
    }
  },
  // POST /api/user
  createUser: {
    body: {
      user_name: Joi.string().required(),
      user_mail: Joi.string().email().trim().required(),
      user_password: Joi.string()
        .regex(/[a-zA-Z0-9]{6,20}$/)
        .required() // 最小長度6最大20，只允許英文大小寫和數字
    }
  }
};
