/*
* 1.扫描db下的全数据
* 2.过滤出需要的city
* 3.写入simplify/
* */

import sql from './base';
import fs from 'fs';
import path from 'path';

const options = {position: '杭州', name: 'hangzhou'};

const dbs = readDir();
const actions = dbs.map(name => () => scan(name, options));

export async function splitDatabase() {
  // const actions = [1000,2000,4000].map(name => () => new Promise(r => setTimeout(() => {console.log(name);r(name)}, name)));
  await serialize(actions);
}

// 序列化执行promise
async function serialize(promises) {
  async function iterate(index = 0) {
    if (index === actions.length - 1) {
      await promises[index]();
      return;
    }

    promises[index]().then(async () => {
      await iterate(++index)
    })
  }

  await iterate();
}

// 读取数据库文件
function readDir() {
  const p = path.join(__dirname, 'db/');
  const files = fs.readdirSync(p);
  const dbs = files.filter(d => d.match(/.sqlite3$/));
  return dbs.map(d => d.replace(/.sqlite3$/, ''))
}

// 扫描一个数据库
async function scan(db, condition) {
  await sql.init(db);

  await sql.getDB().connectDb();

  const simplifyData =
    await sql.getDB()
      .filterRows(condition);

  sql.getDB().closeDb();

  // console.log(simplifyData[0], 1);

  // 插入新
  const simplify = new sql.Database(`../simplify/${condition.name}`);

  await simplify.connectDb();

  await simplify.createTable();

  await simplify.updateRows(simplifyData);

  const aa = await simplify.readAllRows();
  console.log(aa.length, '数据长度');

  await simplify.closeDb();
}

// scan('lte81168',{position: '杭州', name: 'hangzhou'})
