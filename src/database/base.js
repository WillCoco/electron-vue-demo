const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const lodash = require('lodash');


let db;
let database;

class Database {
  constructor(t = 'soul') {
    this.type = t;
    this.name = `${this.type}.sqlite3`;
    this.path = path.join(__dirname, 'db', this.name);
    console.log(this.path, 'path')
  }

  createDb() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(this.path, (err) => {
        if (err) {
          console.log(err, '创建db err');
          reject(err);
        }
        resolve();
      });
    });
  }

  connectDb() {
    return new Promise((resolve, reject) => {
      console.log(this.path, 'createDb');
      this.db = new sqlite3.Database(this.path, ((err) => {
        if (err) {
          reject(err);
          console.log('连接数据库错误', err);
        } else {
          resolve();
        }
      }));
    });
  }

  // 写新数据库
  createTable() {
    return new Promise((resolve, reject) => {
      this.db.run(`CREATE TABLE IF NOT EXISTS soul (
      userId INTEGER UNIQUE,
      genderelation TEXT,
      mail TEXT,
      position TEXT,
      coordinate TEXT,
      userInfo TEXT,
      post TEXT,
      isFavorite BOOLEAN
      )`, (err) => {
        if (err) {
          reject(err);
          // console.log("createTable err", err)
        }
        // console.log("createTable soul");
        resolve();
      });
    });
  }

  insertRows(data = []) {
    return new Promise((resolve, reject) => {
      // console.log("insertRows Ipsum i");
      const stmt = this.db.prepare('INSERT INTO soul (userId, genderelation, mail, position, coordinate, userInfo, post, isFavorite) VALUES (?,?,?,?,?,?,?,?)');
      data.forEach((d, index) => {
        let { userId, genderelation, mail, position, coordinate, userInfo, post, isFavorite } = d || {};
        post = JSON.parse(post);
        if (userId) {
          const coordinate = post.map(d => ({ latitude: d.latitude, longitude: d.longitude }));
          const position = lodash.compact(post.map(d => (d.position)));
          // console.log(position, 'position');

          stmt.run([
            userId,
            genderelation,
            mail,
            position,
            coordinate,
            userInfo,
            post,
            !!isFavorite
          ], (a, err) => {
            if (err) {
              reject(err);
              console.log(err, 'insertRows err');
            }
          });
        }
      });

      stmt.finalize((err) => {
        if (err) {
          reject(err);
          console.log(err, 'insertRows err');
        }
        resolve();
      });
    });
  }

  // 更新或插入
  updateRows(data) {
    return new Promise((resolve, reject) => {
      const stmt = this.db.prepare(`INSERT OR REPLACE INTO soul (userId, genderelation, mail, position, coordinate, userInfo, post, isFavorite) VALUES(?,?,?,?,?,?,?,?)`);

      data.forEach((d) => {
        stmt.run([
          d.userId,
          d.genderelation,
          d.mail,
          d.position,
          d.coordinate,
          d.userInfo,
          d.post,
          !!d.isFavorite
        ], (a, err) => {
          if (err) {
            reject(err);
            console.log(err, 'updateRows err');
          }
        });
      });

      stmt.finalize((err) => {
        if (err) {
          reject(err);
          console.log(err, 'updateRows err');
        }
        resolve();
      });
    });
  }

  readAllRows() {
    return new Promise((resolve, reject) => {
      this.db.all(`SELECT rowid AS id, * FROM soul`, async (err, rows) => {
        if (err) {
          console.log(err, 'readAllRows err');
          reject(err);
        }
        // console.log(rows, '===1------')
        resolve(rows);
      });
    });
  }

  // 读取userId
  readSoulById(userId, offset = 0) {
    console.log(userId, 1111110)
    return new Promise((resolve, reject) => {
      this.db.all(`SELECT rowid AS id, * FROM soul WHERE userId = ${userId}`, async (err, rows) => {
        if (err) {
          console.log(err, 'readSoulById err');
          reject(err);
          return;
        }
        if (offset === 0) {
          resolve(rows && rows[0]);
          return;
        }
        if (!rows[0]) {
          this.db.all(`SELECT min(userId), * FROM soul`, async (err, rows) => {
            if (err) {
              console.log(err, 'readSoulById err');
              reject(err);
              return;
            }
            console.log(rows, '找不到usid, 返回最小的');
            resolve(rows && rows[0]);
          });
          return;
        }
        const {id} = rows[0] || {};
        this.db.all(`SELECT * FROM soul WHERE rowid = ${id + offset || 0}`, async (err, rows) => {
          if (err) {
            console.log(err, 'readSoulById err');
            reject(err);
          }
          resolve(rows && rows[0]);
        });
      });
    });
  }

  // favor
  favor(userId, action) {
    console.log(userId, action, 67678678)
    return new Promise((resolve, reject) => {
      this.db.all(`UPDATE soul SET isFavorite = ${action} WHERE userId = ${userId}`, function(err, rows) {
        if (err) {
          reject()
        } else {
          resolve(rows)
        }
      });
    });
  }

  // 过滤城市男女
  filterRows(condition) {
    return new Promise((resolve, reject) => {
      this.db.all(
        `SELECT * FROM soul WHERE position LIKE '%${condition.position}%' 
        AND userInfo NOT LIKE '%portrait_%' 
        AND userInfo NOT LIKE '%avatar-1549510966505-00924%' 
        AND userInfo NOT LIKE '%avatar-1549933792272-01164%' 
        AND userInfo NOT LIKE '%Avatar_V3_Man_%'`
        , async (err, rows) => {
        if (err) {
          console.log(err, 'filterRows err');
          reject(err);
        }
        resolve(rows);
      });
    });
  }

  closeDb() {
    return new Promise((resolve) => {
      this.db.close((err) => {
        if (err) {
          console.log(err, 'closeDb');
        }
        resolve();
      });
    });
  }
}

export default {
  init: (type) => {
    if (!database) {
      database = new Database(type);
    }
  },
  getDB: () => database,
  Database
};

