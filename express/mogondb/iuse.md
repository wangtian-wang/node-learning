## mongod --dbpath=数据的存储目录

### 表 = 集合 = 数组

## 命令行工具

momgo + entry 直接开启本机服务器
exit 退出连接
show dbs 查看所有数据表
use 切换到指定的数据库,如果当前没有这个数据库,就会新建一个数据库,等有数据表(集合)的时候,这个数据库就会显示出来
db 查看当前操作的数据库
db.data.insertOne({name: "pg"}) 在当前的数据库当中插入 一条数据表
show collections 显示当前数据库的所有表(集合)
db.students.find() 查找 students 表的所有数据

## node.JS 连接 mongon

### 使用 MongoDB 包

在 npm 官网 上下载 mongodb-naive 不常用
mongoose 常用 MongooseJS.com 帮助设计数据库表
