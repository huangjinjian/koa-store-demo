// 引入mongo 模块

const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";

const dbName = "store";

let obj = {};

connect = function(callback) {
  const client = new MongoClient(url);
  client.connect(function(err) {
    if (err) throw err;
    const db = client.db(dbName);
    console.log("Connected successfully to server");
    callback(client, db);
  });
};

obj.connect = function(callback) {
  const client = new MongoClient(url);
  client.connect(function(err) {
    if (err) throw err;
    const db = client.db(dbName);
    console.log("Connected successfully to server");
    callback(client, db);
  });
};

// 创建索引
obj.createIndex = (cName, fn) => {
  connect((client, db) => {
    db.collection(cName).createIndex(
      {
        loc: "2dsphere"
      },
      (err, result) => {
        fn(err, result);
        client.close();
      }
    );
  });
};

// 插入

obj.insert = (cName, arrData) => {
  return new Promise((resole, reject) => {
    connect((client, db) => {
      db.collection(cName).insertMany(arrData, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resole(result);
        }
        client.close();
      });
    });
  });
};

// 查询
obj.find = (cName, options) => {
  return new Promise((resole, reject) => {
    connect((client, db) => {
      db.collection(cName)
        .find(options)
        .toArray((err, docs) => {
          if (err) {
            reject(err);
          } else {
            resole(docs);
          }
          client.close();
        });
    });
  });
};

// 查询 skip limit



// 改
obj.update = (cName, filter, updated) => {
  return new Promise((resole, reject) => {
    connect((client, db) => {
      db.collection(cName).updateOne(
        filter,
        {
          $set: updated
        },
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resole(result);
          }
          client.close();
        }
      );
    });
  });
};

obj.updateMany = (cName, filter, updated) => {
  return new Promise((resole, reject) => {
    connect((client, db) => {
      db.collection(cName).updateMany(
        filter,
        {
          $set: updated
        },
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resole(result);
          }
          client.close();
        }
      );
    });
  });
};

obj.delete = (cName, filter) => {
  return new Promise((resole, reject) => {
    connect((client, db) => {
      db.collection(cName).deleteOne(filter, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resole(result);
        }
        client.close();
      });
    });
  });
};

obj.deleteMany = (cName, filter) => {
  return new Promise((resole, reject) => {
    connect((client, db) => {
      db.collection(cName).deleteMany(filter, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resole(result);
        }
        client.close();
      });
    });
  });
};

obj.nearDis = (cName, arrLoc, fn) => {
  // 创建索引
  connect((client, db) => {
    db.collection(cName)
      .aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [parseFloat(arrLoc[0]), parseFloat(arrLoc[1])]
            },
            distanceField: "dis",
            spherical: true
          }
        }
      ])
      .toArray((err, docs) => {
        fn(err, docs);
        client.close();
      });
  });
};

// obj.nearDis('locList', ['113.3732888343', '23.1249358877'], (err, docs) => {
// 	if (err) throw err;
// 	console.log(docs);
// })

// obj.createIndex("locList", (err, result) => {
// 	if (err) throw err
// 	console.log(result);
// })

module.exports = obj;
