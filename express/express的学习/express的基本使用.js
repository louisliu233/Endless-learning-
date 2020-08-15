//1.引入express
const express = require('express');


//2.创建应用对象
const app = express();


//3.创建路由规则    
//require 是对请求报文的封装
//response  是对响应报文的封装
app.get('/',(require,response) => {
    //设置响应
    response.send('Hello world');
});


//4.监听端口启动服务
app.listen(3000, () =>{
    console.log('服务已经启动，3000 端口监听中...');
})