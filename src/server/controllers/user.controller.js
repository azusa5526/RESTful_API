import userModule from '../modules/user.module';

const userPost = (req, res) => {
  const insertValues = req.body;
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

export default {
  userPost,
  userGet,
  userPut,
  userDelete
};
