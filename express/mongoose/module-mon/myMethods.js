var fruit = require("./fruit"),
  apple = new fruit({
    name: "apple",
  });
apple.save((err, res) => {});
/**
 function Apple (){
   this.eat= function(){}   实例方法
 }
 Apple.feed = function(){}      静态方法
 调用实例方法,即 new 完之后 的实例调用构造函数原型上面的方法
 静态方法 : 是构造函数自己的方法
 */
