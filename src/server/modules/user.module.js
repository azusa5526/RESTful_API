import mysql from 'mysql';
import config from '../../config/config';

const connectionPool = mysql.createPool({
  connectionLimit: 10,
  host: config.mysqlHost,
  user: config.mysqlUserName,
  password: config.mysqlPass,
  database: config.mysqlDatabase
});

const createUser = (insertValues) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query('INSERT INTO User SET ?', insertValues, (error, result) => {
          if (error) {
            console.error('SQL error: ', error);
            reject(error);
          } else if (result.affectedRows === 1) {
            resolve(`新增成功 user_id: ${result.insertId}`);
          }
          connection.release();
        });
      }
    });
  });
};

// getAllUsers
const selectUser = () => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query(`SELECT * FROM User`, (error, result) => {
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

const modifyUser = (insertValues, userId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query(
          `UPDATE User SET ? WHERE user_id = ?`,
          [insertValues, userId],
          (error, result) => {
            if (error) {
              console.error('SQL error: ', error);
              reject(error);
            } else if (result.affectedRows === 0) {
              // 寫入時發現無該筆資料
              resolve('找不到此User Id，請確認Id是否正確');
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

const deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
      if (connectionError) {
        reject(connectionError);
      } else {
        connection.query('DELETE FROM User WHERE user_id = ?', userId, (error, result) => {
          if (error) {
            console.error('SQL error: ', error); //寫入資料庫時發現問題
            reject(error);
          } else if (result.affectedRows === 0) {
            //寫入時發現無該筆資料
            resolve('找不到此用戶Id，請確認待刪除Id是否正確');
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

export default {
  createUser,
  selectUser,
  modifyUser,
  deleteUser
};
