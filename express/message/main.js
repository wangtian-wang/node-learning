var fs = require("fs"),
  http = require("http"),
  template = require("art-template"),
  url = require("url");
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
http
  .createServer((req, res) => {
    var url = require("url");
    var urlObj = url.parse(req.url, true);
    var url = urlObj.pathname; // 不包含查询字符串的 URL
    if (url === "/") {
      fs.readFile("./views/subIndex.html", (err, data) => {
        if (err) {
          res.end("404 Not Found");
        }
        // 先读取客户端请求的资源,将这些资源作为模板字符串解析的对象,处理,之后再返回给客户端
        // 如果要对数据进行操作,必须转化为二进制数据
        let htmlStr = template.render(data.toString(), {
          comments: comments,
        });
        res.end(htmlStr);
      });
    } else if (url.indexOf("/public/") === 0) {
      fs.readFile("." + url, (err, data) => {
        if (err) {
          res.end("404 Not Found");
        }
        // 图片类型的数据,不需要做格式处理,告诉浏览器文件格式
        res.end(data);
      });
    } else if (url === "/post") {
      fs.readFile("./views/index.html", (err, data) => {
        if (err) {
          res.end("404 Not Found");
        }
        res.end(data);
      });
    } else if (url === "/evaluate") {
      var comment = urlObj.query;
      //  res.end(JSON.stringify(comment));  响应给客户端的数据是字符串
      // 一次请求,对应一次响应,响应结束,客户端就结束了本次的请求
      comments.push(comment);
      //  用户重新请求' / '
      // 服务器重定向
      // 客户端发送了一个请求,服务器收到请求并且做出了重定向的响应.
      // 1: 状态码设置为 302 临时重定向 301 永久重定向 浏览器会记住,直接请求重定向的 url
      // 2: 在响应头中 通过 location 告诉客户端往哪里定向   setHeader
      // 如果客户端发现服务器的状态码是 302 ,就会去请求头里面找 Location 的地址,重新请求 Location 的地址
      res.statusCode = 302;
      res.setHeader("Location", "/");
      res.end();
    }
  })
  .listen(8000, () => {});
