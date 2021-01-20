import mysql from 'mysql';
import config from '../../config/config';
import jwt from 'jsonwebtoken';

const connectionPool = mysql.createPool({
  connectionLimit: 10,
  host: config.mysqlHost,
  user: config.mysqlUserName,
  password: config.mysqlPass,
  database: config.mysqlDatabase
});

const createArticle = (insertValues) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query('INSERT INTO Article SET ?', insertValues, (error, result) => {
          // Article資料表寫入一筆資料
          if (error) {
            console.error('SQL error: ', error);
            reject(error);
          } else if (result.affectedRows === 1) {
            resolve(`新增成功！ article_id: ${result.insertId}`);
          }
          connection.release();
        });
      }
    });
  });
};

const selectArticle = () => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query(`SELECT * FROM Article`, (error, result) => {
          if (error) {
            console.error('SQL error: ', error);
            reject(error);
          } else {
            resolve(result);
          }
          connection.release();
        });
      }
    });
  });
};

const modifyArticle = (insertValues, userId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query(
          'UPDATE Article SET ? WHERE article_id = ?',
          [insertValues, userId],
          (error, result) => {
            if (error) {
              console.error('SQL error: ', error); //寫入資料庫出現問題
              reject(error);
            } else if (result.affectedRows === 0) {
              //寫入時發現無該筆資料
              resolve('找不到此文章Id，請確認修改Id是否正確');
            } else if (result.message.match('Changed: 1')) {
              resolve('資料修改成功');
            } else {
              resolve('資料無異動');
            }
            connection.release();
          }
        );
      }
    });
  });
};

const deleteArticle = (userId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query('DELETE FROM Article WHERE article_id = ?', userId, (error, result) => {
          if (error) {
            console.error('SQL error: ', error); //寫入資料庫時發現問題
            reject(error);
          } else if (result.affectedRows === 0) {
            //寫入時發現無該筆資料
            resolve('找不到此文章Id，請確認待刪除Id是否正確');
          } else if (result.affectedRows === 1) {
            resolve('刪除成功');
          } else {
            resolve('刪除失敗');
          }
          connection.release();
        });
      }
    });
  });
};

const selectPersonalArticle = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'my_secret_key', (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        const userId = decoded.payload.user_id;
        connectionPool.getConnection((connectionError, connection) => {
          if (connectionError) {
            reject(connectionError);
          } else {
            connection.query(
              'SELECT * FROM Article WHERE user_id = ?',
              [userId],
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
                connection.release();
              }
            );
          }
        });
      }
    });
  });
};

export default {
  createArticle,
  selectArticle,
  modifyArticle,
  deleteArticle,
  selectPersonalArticle
};
