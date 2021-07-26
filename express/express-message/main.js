var express = require("express");
const fs = require("fs");
const path = require("path");
const uploadDir = path.join("", "./public/files");
const SparkMd5 = require("spark-md5");
var server = express();
var bodyParser = require("body-parser");
const multer = require("multer");
const { hash } = require("spark-md5");
server.engine("html", require("express-art-template"));
server.use("/public/", express.static("./public"));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/image"); // 指定文件路径 最好自己手动创建,
  },
  filename: (req, file, cb) => {
    //  file 里面包含了上传文件的信息
    let originalExt = file.originalname.split("/");
    let ext = originalExt[originalExt.length - 1];
    let tempname = new Date().getTime() + parseInt(Math.random() * 999999); // 指定文件名
    cb(null, tempname + "." + ext);
  },
});
const upload = multer({
  storage: storage,
});

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

let comments = [
  {
    name: "lucy",
    message: "wow, i am lucy",
  },
  {
    name: "lucy",
    message: "wow, i am lucy",
  },
  {
    name: "lucy",
    message: "wow, i am lucy",
  },
  {
    name: "lucy",
    message: "wow, i am lucy",
  },
];
server.get("/", (req, res) => {
  res.render("subIndex.html", {
    comments: comments,
  });
});
// 图片上传
server.get("/img", (req, res) => {
  res.render("upload.html");
});
server.post("/upload", upload.single("img"), (req, res) => {
  // upload.single("img") img 为上传图片对象的 key 值,value 值为图片数据,这个 key 值必须和前端保持统一,否则会上传文件不成功
  console.log(req.file);
  let { size, mimetype, path } = req.file;
  let err;
  let type = ["jpg", "jpeg", "png", "gif"];
  let fileType = mimetype.split("/")[1];
  if (size > 1024 * 5000) {
    return res.send({ err: -1, message: "尺寸太大" });
  } else if (type.indexOf(fileType) == -1) {
    return res.send({ err: -2, message: "类型错误" });
  }
  // req.file 里面有上传成功之后,文件的信息
  let url = "http://localhost:3000" + "/public/image/" + req.file.filename;
  res.send({ err: 0, message: url });
});

/**************  el-upload 文件上传 *******************8*/
server.post("/uploadfiles", (req, res) => {
  console.log(req, "in 71");
  res.send({ mgs: "success" });
});
server.post("/uploadbase64", (req, res) => {
  let { chunk, name } = req.body;

  chunk = decodeURIComponent(chunk);
  chunk = chunk.replace(/^data:image\/\w+;base64,/, "");
  chunk = Buffer.from(chunk, "base64"); // base to base64

  // save file
  let spark = new SparkMd5.ArrayBuffer(),
    suffix = /\.([0-9a-zA-z]+)$/.exec(name)[1],
    path;
  spark.append(chunk);
  path = `${uploadDir}/${spark.end()}.${suffix}`;
  console.log(path, "in path");
  fs.writeFileSync(path, chunk);
  res.send({
    code: 200,
    path: path,
  });
});

/**************  el-upload 视频文件上传 *******************8*/
server.post("/largefile", async (req, res) => {
  let { fields, files } = await handleMutipalFile(req, res);
  let [chunk] = files.chunk,
    [filename] = files.name;
  let hash = /([0-9a-zA-Z]+)_\d+/.exec(filename)[1],
    path = `${uploadDir}/${hash}`;
  !fs.existSync(path) ? fs.mkdirSync(path) : "null";
  //  存在的文件不再上传 先生成临时文件,合并后存在文件夹里面
  // 关键点在于 每次分片上传的文件生成的哈希是唯一的,不会再重复,只要文件内容不变的话
  fs.access(path, async (err) => {
    if (!err) {
      res.send({
        code: 0,
        path: path.replace(__dirname, `http://127.0.0.1:3000`),
      });
      return;
    }

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
    let readStream = fs.createReadeStream(chunk.path),
      writeStream = fs.createWriteStream(path);
    readStream.pipe(writeStream);
    readStream.on("end", () => {
      fs.unlinkSync(chunk.path);
      res.send({
        code: 0,
        path: path.replace(__dirname, `http://127.0.0.1:3000`),
      });
    });
  });
});
const handleMutipalFile = (req, res) => {};
server.post("/merge", (req, res) => {
  let { path } = req.query;
  let path = ` ${uploadDir}/${hash}`,
    fileList = fs.readdirSync(path),
    suffix;
  fileList
    .sort((a, b) => {
      let reg = /_(\d+)/;
      return reg.exec(a)[1] - reg.exec(b)[1];
    })
    .forEach((item) => {
      !suffix ? (suffix = /\.([0-9a-zA-z]+)$/.exec(item)[1]) : null;
      fs.appendFileSync(
        `${uploadDir}${hash}.${suffix}`,
        fs.readFileSync(`${path}${item}`)
      );
      fs.unlinkSync(`${path}${item}`);
    });
  fs.rmdirSync(path);
  res.send({
    code: 0,
    path: `http://127.0.0.1:3000/files/${hash}.${suffix}`,
  });
});
// post 请求 提交表单
server.post("/post", (req, res) => {
  // res.render("one");
  // res.send("hahah"); // 为啥 res .render 作为响应一个字符串会出错 但是 send 就 OK
  // console.log(req.body, "in post");
  var comment = req.body;
  comments.push(comment);
  res.redirect("/");
});
server.get("/evaluate", (req, res) => {
  var comment = req.query;
  comments.push(comment);

  //  1 : 在发送之前设置重定向的状态码和地址
  // 原生的重定向方法在 express 中可以使用
  // res.statusCode = 302;
  // res.setHeader("Location", "/");
  // res.render("subIndex.html", { 这一步可以省略不写
  //   comments: comments,
  // });
  // 2: express 封装的重定向的方法;
  res.redirect("/");
});
server.listen(3000, () => {
  console.log("server is running at port 3000");
});

// 在 express 中使用 art-template
//1:  装包
// npm i --save art-template
// npm i --save express-art-template
// 2 : 配置
//  server.engine("html", require("express-art-template"));
// 第一个参数表示 当渲染以.art 结尾的文件的时候, 使用express-art-template 模板
// express-art-template 是专门为 express 提供的模板, 但是这个包依赖于 art-template 所以需要安装 srt-template
// 这句代码的作用是   express 为 response 对象,提供了一个 render 方法,只要有这句代码,就能执行这个方法
// 使用这个方法返回响应的数据如下
// res.render{'html模板名称', {模板数据}} express 封装了读取文件的方法, 只需要使用 render 函数即可
// 第一个参数不能写路径,写文件名,默认回去项目的 views 目录查找该模板文件 这个是 express 的约定,需要开发者将 HTML 文件放在 views 中
// 也可以更改默认的目录: server.set('views'(第一个参数必须是这样写,告诉 express 我要重新设置 views 了), render 函数的默认路径)
// 但是开发者必须将 HTML 文件的后缀名改为.art 但是可以在设置的时候,将名字设置为 html
// server.engine("html", require("express-art-template"));

// res.render && res.send
// render 表示渲染数据, 有无后面的参数不影响渲染结果

// express 中获取 get 的参数
// req.query
// post 的参数
// req.body
