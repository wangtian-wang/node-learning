/**
 buffer  
            底层存储的是字节    通过不同方式的编码， 变成了网络中看到的字符串
            操作系统为程序分配的内存  node  v8  = c++ && js --->  buffer的内存申请操作是由底层的c++ 来完成的，由c语言直接向操作系统申请内存是一种更加高效的方式
使用过程
        1： 申请内存
                内存不够 扩容 c++底层
        2： js内存使用
在node当中的使用：
        1： 无需引入 ，直接使用；
        2：

 方法： 
        1 :Buffer.alloc(12) 给buffer分配的内存为12；
        2 :buffer[0] = 67;    //  67 指的是 67 对应的 ASCII位置的字母， 将这些字符存储在buffer中 
        3 :let str = buffer.toString('utf8') 将2打印出来
        4 :var length = buffer.write('hello world', 'utf8');
        5 :length
                    const str = 'awvnuye哈哈';    英文字母一个字节，汉字3个字节
                    const buffer = Buffer.from(str);
                    console.log(buffer.length); 7 + 6 = 13
        6 :buffer的拼接
                    const buffer1 = Buffer.from('awvnuye哈哈');
                    const buffer2 = Buffer.from('hello');
                    const buffer3 = Buffer.from('json');
                    const bufferArray = [buffer1, buffer2, buffer3];
                    const bufferAll = Buffer.concat(bufferArray, buffer1.length + buffer2.length + buffer3.length);


 
 
 
 
 
 
 */





const buffer1 = Buffer.from('awvnuye哈哈');
const buffer2 = Buffer.from('hello');
const buffer3 = Buffer.from('json');
const bufferArray = [buffer1, buffer2, buffer3];
const bufferAll = Buffer.concat(bufferArray, buffer1.length + buffer2.length + buffer3.length);
console.log(bufferAll.length);
console.log(bufferAll.toString());