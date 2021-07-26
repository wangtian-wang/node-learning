var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// 1:连接数据库
mongoose.connect("mongodb://localhost/user");
// 2: 对数据格式进行约束
var userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
});
//3: 发布一个数据 表
var User = mongoose.model("User", userSchema);
// 增加数据集合
var admin = new User({
  name: "Luna",
  gender: "female",
});
// admin.save((error, res) => {
//   if (error) {
//     console.log(error);
//   }
//   if (res) {
//     console.log("success");
//   }
// });
// User.find((err, ret) => {
//   // 找到所有的集合
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(ret);
//   }
// });
// User.findOne((err, ret) => {
//   // 只找一个
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(ret);
//   }
// });
// 删除 1
// User.remove(
//   {
//     name: "za",
//   },
//   (err, res) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(res, "in 55");
//     }
//   }
// );
// 删除 2
// User.findByIdAndRemove("5f07adba81ed690397d720ca", (err, ret) => {
//   if (err) {
//     console.log("根据 Id 删除失败");
//   } else {
//     console.log(ret, "delete by id");
//   }
// });
// 删除 3

// User.findOneAndRemove(
//   {
//     name: "luna",
//     gender: "nan",
//   },
//   (err, ret) => {
//     if (ret) {
//       console.log("根据条件删除一个成功");
//     }
//   }
// );

//更新 1
// User.findByIdAndUpdate(
//   "5f07adba81ed690397d720ca",
//   {
//     name: "little luna",
//   },
//   (err, res) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(res, "in update");
//     }
//   }
// );
//更新 2
// User.findOneAndUpdate(
//   {
//     name: " Luna",
//     gender: "female", // 找到指定的数据,并且更新
//   },
//   {
//     name: "updateName",
//     gender: "updateGender",
//   },
//   (err, ret) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(ret, "find one and upDate");
//     }
//   }
// );
// 条件 是否是找到并且更新满足这一个条件的所有数据
// 根据条件,更新数据 执行一次代码,只更新一个一个找到的数据(即使找到了多个有相同条件到的数据)
User.update(
  {
    name: "Luna",
  },
  {
    name: "lala",
  },
  (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res, "in update");
    }
  }
);
User.find((err, ret) => {
  if (ret) {
    console.log(ret, "in 72");
  }
});
