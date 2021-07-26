var mon = require("mongoose");
mon.connect(
  "mongodb://localhost/crud-mon",
  { useNewUrlParser: true },
  (err, ret) => {
    if (err) {
      console.log("connect success");
    }
  }
);
var Schema = mon.Schema;

var studentSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  sex: {
    type: String,
    require: true,
    enum: ["female", "man"], //  可以枚举的 接收的值必须是这个数组里面的
    default: 0,
  },
  hobbies: {
    type: String,
    require: true,
  },
});
module.exports = mon.model("Student", studentSchema);
