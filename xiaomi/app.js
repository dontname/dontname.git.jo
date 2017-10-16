var express = require('express');
var fs = require('fs');
var template = require('art-template');

var app = express();

app.use('/',express.static('wwwroot'));


//固定写法 
//设置模板引擎为art-template
//参数一 为所渲染数据的文件类型
app.engine('html',require('express-art-template'));
//设置调试模式
app.set('view options',{
    debug: process.env.NODE_ENV !== 'production'
});

//views 放置模板文件的目录 
// app.set('views','./views');
// app.set('views engine','html');  等价于  app.engine('html',require('art-template'));
app.get('/',(req,res) => {
    //fs是nodejs内置的文件系统   //读文件
    var data = fs.readFileSync('books.json').toString();
    var dataArr = [];
    // var dataObj = {};
    if(data) {
        //JSON.parse()  将json字符串转化为js对象
        dataArr = JSON.parse(data);
    }
 
    var strHtml = template(__dirname + '/views/index.html',dataArr);
    console.log(__dirname);
    console.log(__dirname + './views/index.html');
    res.send(strHtml);


    //res.render(fileName,data)  渲染一个文件并发送给浏览器显示
    //参数一 需要渲染文件的名字 参数二 需要渲染的数据
    // res.render('index.html',dataArr);

    //第一种方式 默认以art为后缀的文件
    // var strHtml = template(__dirname + '/views/index',dataArr);
    // res.send(strHtml);
    
    //第二种方式
    // var render = require('./views/home.art');//加载模板
    // var strHtml = render(dataObj);//渲染模板并返回字符串
    // res.status(200).send(strHtml);


})


//这里运行的时候要在地址栏加上路由 即 http://localhost:3000/books
app.get('/books',(req,res) => {
    var data = fs.readFileSync('./books.json').toString();
    var dataObj = {};
    if(data) {
        dataObj = JSON.parse(data);

    }
    var render = require('./views/home.art');//加载模板
    var strHtml = render(dataObj);//渲染模板帮返回html字符串
    res.status(200).send(strHtml);//发送数据
});

app.listen(3000,(req,res) => {
    console.log('run on 3000...');
})
