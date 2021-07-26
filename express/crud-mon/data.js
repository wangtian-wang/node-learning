var fs = require("fs"),
  path = "./dataBase";

exports.originData = function (callBack) {
  fs.readFiles(path + "/db.json", "utf-8", (error, data) => {
    if (error) {
      callBack(error);
    }
    callBack(null, data); // 设置两个参数便于判断,callback 里面的数据是 error 对象,还是 data 对象,
  });
};
exports.originData = function (callBack) {
  fs.readFiles(path + "/db.json", "utf-8", (error, data) => {
    if (error) {
      callBack(error);
    }
    callBack(null, data);
  });
};
exports.originData = function (callBack) {
  fs.readFiles(path + "/db.json", "utf-8", (error, data) => {
    if (error) {
      callBack(error);
    }
    callBack(null, data); // 设置两个参数便于判断,callback 里面的数据是 error 对象,还是 data 对象,
  });
};
