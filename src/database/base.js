// const sqlite3 = require('sqlite3').verbose();
// const path = require('path');
// const lodash = require('lodash');
//
//
// let db;
// let database;
//
// class Database {
//   constructor(t = 'soul') {
//     this.type = t;
//     this.name = `${this.type}.sqlite3`;
//     this.path = path.join(__dirname, 'db', this.name);
//     this.db = db;
//   }
//
//   createDb() {
//     return new Promise((resolve, reject) => {
//       this.db = new sqlite3.Database(this.path, (err) => {
//         if (err) {
//           console.log(err, '创建db err');
//           reject(err);
//         }
//         resolve();
//         // console.log('创建db', this.name);
//       });
//     });
//   }
//
//   connectDb() {
//     return new Promise((resolve, reject) => {
//       console.log('createDb');
//       this.db = new sqlite3.Database(this.path, ((err) => {
//         if (err) {
//           reject(err);
//           console.log('连接数据库错误', err);
//         } else {
//           resolve();
//         }
//       }));
//     });
//   }
//
//   createTable() {
//     return new Promise((resolve, reject) => {
//       this.db.run(`CREATE TABLE IF NOT EXISTS soul (
//       userId INTEGER,
//       genderelation TEXT,
//       mail TEXT,
//       position TEXT,
//       coordinate TEXT,
//       userInfo TEXT,
//       post TEXT
//       )`, (err) => {
//         if (err) {
//           reject(err);
//           // console.log("createTable err", err)
//         }
//         // console.log("createTable soul");
//         resolve();
//       });
//     });
//   }
//
//   insertRows(infoList = [], postList = []) {
//     return new Promise((resolve, reject) => {
//       // todo: 先尝试更新 没有userid则插入
//       // console.log("insertRows Ipsum i");
//       const stmt = this.db.prepare('INSERT INTO soul (userId, genderelation, mail, position, coordinate, userInfo, post) VALUES (?,?,?,?,?,?,?)');
//       infoList.forEach((info, index) => {
//         const { userId, genderelation, mail } = info || {};
//         const post = postList[index] || [];
//         if (userId) {
//           const coordinate = post.map(d => ({ latitude: d.latitude, longitude: d.longitude }));
//           const position = lodash.compact(post.map(d => (d.position)));
//           // console.log(position, 'position');
//
//           stmt.run([
//             userId,
//             genderelation,
//             mail,
//             JSON.stringify(position),
//             JSON.stringify(coordinate),
//             JSON.stringify(info),
//             JSON.stringify(post),
//           ], (a, err) => {
//             if (err) {
//               reject(err);
//               console.log(err, 'insertRows err');
//             }
//           });
//         }
//       });
//
//       stmt.finalize((err) => {
//         if (err) {
//           reject(err);
//           console.log(err, 'insertRows err');
//         }
//         resolve();
//       });
//     });
//   }
//
//   updateRows(info) {
//     return new Promise((resolve, reject) => {
//       // console.log("insertRows Ipsum i");
//       const stmt = this.db.prepare('INSERT INTO soul (userId, registerTime, genderelation, mail, userInfo) VALUES (?,?,?,?,?)');
//
//       const {
//         userId, registerTime, genderelation, mail,
//       } = info;
//       stmt.run([
//         userId,
//         registerTime,
//         genderelation,
//         mail,
//         JSON.stringify(info),
//       ], (err) => {
//         console.log(err, 222);
//       });
//
//       stmt.finalize((err) => {
//         if (err) {
//           reject(err);
//           console.log(err, 1919);
//         }
//         resolve();
//       });
//     });
//   }
//
//   readAllRows() {
//     return new Promise((resolve, reject) => {
//       this.db.all('SELECT rowid AS id, * FROM soul', async (err/* rows */) => {
//         if (err) {
//           console.log(err, 'readAllRows err');
//           reject(err);
//         }
//         // rows.forEach(function (row) {
//         // console.log(row.id + ": " + row.userId);
//         // });
//         resolve();
//       });
//     });
//   }
//
//   closeDb() {
//     return new Promise((resolve) => {
//       this.db.close((err) => {
//         if (err) {
//           console.log(err, 'closeDb');
//         }
//         resolve();
//       });
//     });
//   }
// }
//
//
// module.exports = {
//   init: (type) => {
//     if (!database) {
//       database = new Database(type);
//     }
//   },
//   getDB: () => database,
// };
//
