
使用express作为后端的服务器 实现一个后端返回图片预览和下载的功能

```js
    
    backend
                app.use(express.static(path.join(__dirname,'public')));
                const imgPath = path.join(__dirname,'public','happy.jpeg');
                app.get('/filedownload',(req,res) => {
                    res.download(imgPath);  这个方法值得仔细阅读
                });
                app.get('/filepreview',(req,res) => {
                    res.sendFile(imgPath)  这个方法值得仔细阅读
                })
    frontend
                axios({
                    methos:'get',
                    responseType: 'blob', 设置响应类型,否则不能正确处理二进制数据
                    url: ''
                }).then((res) => {
                    const { data} = res.data;
                    const blob = new Blob([data],{
                        type: 'image/ipeg',
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.download = 'happy.jpeg';
                    a.href = url;
                    a.click();
                    revokeObjectURL(url);
                }
                index.html
                        url=后端提供的下载的网址 ： localhost：3000/filedownload
                        url1=后端提供的预览的地址  localhost:3000/filepreview
                        <a :href="url">  因为没有参数 这个地址的访问时get请求，所以后端设置的请求方式为get
                        <a :href="url1>





```