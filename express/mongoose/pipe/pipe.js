const mongoose = require("../module-mon/db");

/**
 聚合管道 : 将两张表关联起来 一张表是父表 管理用户的每个订单交易的订单编号  对应一张子表,其信息为用户每单里面的商品的个数和详细信息
 */
fatherOrderModel.aggregate(
  // 模型数据表fatherOrderModel 的名称
  [
    {
      $lookup: {
        from: "order_item", // 要关联的数据表
        localField: "order_id", // 父表中的要关联的字段
        foreignField: "order_id", // 子表中需要关联的字段
        as: "items",
      },
    },
    {
      $match: { all_price: { $get: 90 } }, // 匹配的条件
    },
  ],
  (err, ret) => {
    if (err) {
      console.log(err);
    }
    console.log(ret);
  }
);
/**
  子表关联父表
  mongoose 中 获取 objectId mongoose.Types.objectId
 */
SonOrderModel.aggregate(
  [
    {
      $lookup: {
        from: "FatherOrderModel", // 要关联的数据表
        localField: "order_id", // 父表中的要关联的字段
        foreignField: "order_id", // 子表中需要关联的字段
        as: "items",
      },
    },
    {
      $match: { order_id: mongoose.Types.ObjectId }, // 匹配的条件
    },
  ],
  (err, ret) => {
    if (err) {
      console.log(err);
    }
    console.log(ret);
  }
);
