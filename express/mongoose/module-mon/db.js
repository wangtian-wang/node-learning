// 主入口文件只负责连接数据库和暴露出 mongoose 对象

var mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost/dateBase",
  { useNewUrlParser: true },
  (err, ret) => {
    if (err) {
      console.log(err);
      return;
    }
  }
);
module.exports = mongoose;
