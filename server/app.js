// 引入编写好的api

const api = require('./api')

// 引入文件模块

const fs = require('fs')

// 引入处理路径的模块

const path = require('path')

// 引入处理post数据的模块

const bodyParser = require('body-parser')

// 引入Express

const express = require('express')

const app = express()

const mongoose = require('mongoose');


//设置跨域
app.use((req, res, next) => {
  // 允许的请求主机名及端口号 也可以用通配符*， 表示允许所有主机请求
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  // 允许请求携带cookie
  res.setHeader('Access-Control-Allow-Credentials', true);
  // 允许的请求方式
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // 允许的请求头
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({

extended: false

}));

app.use(api)
// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../index.html')));

// 因为是单页应用 所有请求都走/dist/index.html

app.get('*', function (req, res) {

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8')

res.send(html)

});

// 监听8080端口

mongoose.connect('mongodb://localhost:27017/admin',{useNewUrlParser:true}, (err) => {

    if (err) {
        console.log('error!');
        return;
    } else {
    	app.listen(8081);
       	console.log('数据库连接成功…………');
        console.log('后台服务已启动...');
    }

});


