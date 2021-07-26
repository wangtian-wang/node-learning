// 定义了一个 fruit 集合, 想要使用其他的集合,可以再定义一个集合的模块
var mongoose = require("./db");
var appleSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true, // lowercase uppercase 预定义修饰符   自定义修饰符 Setters
    default: "strawberry",
    get(params) {
      return "addition" + name;
    },
    /**
     * 在实例化完一个数据的时候,生成了一个新的数据对象,通过对象的形式访问数据的时候,会调用 get 方法
     var apple = new Apple {
       name: 'apple'
     }
     apple.name = 'addition apple'
     */
  },
  url: {
    type: String,
    set(params) {
      if (!params) {
        // params 就是 URL 即要自定义修饰符本身这个数据
        return;
      } else {
        if (
          params.indexOf("https://" !== 0 || params.indexOf("https://" !== 0))
        ) {
          return "https://" + params;
        }
      }
    },
  },
  // 设置索引 db.apples.findIndexes() 可以在控制台找到设置了索引的字段
  setIndex: {
    type: Number,
    index: true,
  },
});
// 设置扩展静态方法
appleSchema.statics.findByIndex = function (index, cb) {
  this.find({ setIndex: index }, (err, ret) => {
    if (err) {
      cb(err);
    }
    cb(null, ret);
  });
};
// 设置扩展实例方法
appleSchema.methods.findByIndex = function (index, cb) {};
// 数据校验
/**
  适用于 所有类型的数据 : require: true,
  适用于 number 类型的数据 : min: 0; max: 100,
  适用于 string 类型的数据 : enum['1', '2'] 上传的数据必须在这个数组当中 ; maxlength ; minlength; match :对应一个正则表达式  符合正则表达式的才算合格
自定义校验规则
index: {
  type: Number,
  validate(params){
    return params > 0
  }
}


 */
module.exports = mongoose.model("Apple", appleSchema);
