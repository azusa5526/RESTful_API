import userModule from '../modules/user.module';
import bcrypt from 'bcrypt';

const userPost = (req, res) => {
  const insertValues = {
    user_name: req.body.user_name,
    user_mail: req.body.user_mail,
    user_password: bcrypt.hashSync(req.body.user_password, 10)
  };
  userModule
    .createUser(insertValues)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      return res.send(err);
    });
};

const userGet = (req, res) => {
  userModule
    .selectUser()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      return res.send(err);
    });
};

const userPut = (req, res) => {
  const userId = req.params.user_id;
  const insertValues = req.body;
  userModule
    .modifyUser(insertValues, userId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      return res.send(err);
    });
};

const userDelete = (req, res) => {
  const userId = req.params.user_id;
  userModule
    .deleteUser(userId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      return res.send(err);
    });
};

const userLogin = (req, res) => {
  const insertValues = req.body;
  userModule
    .selectUserLogin(insertValues)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      return res.send(err);
    });
};

export default {
  userPost,
  userGet,
  userPut,
  userDelete,
  userLogin
};
