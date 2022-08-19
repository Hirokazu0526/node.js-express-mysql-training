const pool = require("./pool.js");

var Transaction = class {
  constructor(connection) {
    this.connection = connection;
  }
  async begin() {
    if (this.connection) {
      this.connection.release();
    }
    this.connection = await pool.getConnection();
    this.connection.beginTransaction();
  }
  async executeQuery(query, values, options = {}) {
    options = {
      fileds: options.fileds || false,
    };
    return new Promise((resolve, reject) => {
      this.connection.query(query, values, (err, results, fileds) => {
        if(!err) {
          resolve(options.fileds ? results : {results, fileds});
        }else {
          reject();
        }
      });
    });
  }
  async commit() {
    return new Promise((resolve, reject) => {
      this.connection.commit((err) => {
        this.connection.release();
        this.connection = null;
        if(!err) {
          resolve();
        } else {
          reject(err);
        }
      });
    });
  }
  async rollback() {
    return new Promise((resolve, reject) => {
      this.connection.rollback(() => {
        this.connection.release();
        this.connection = null;
        resolve();
      });
    });
  }
};


module.exports = Transaction;