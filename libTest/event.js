/**
 * Created by dllo on 17/2/13.
 */
// 获取http服务模块
var http = require('http');
//获取events模块 事件模块
var even = require('events');

//创建服务
var server = http.createServer();

//服务添加事件
server.on('request',function (req,res) {
    if (req.url == '/favicon.ico'){
        console.log(req.url);
    }
    console.log(req.url);
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('Hello,Node.js event');
});
//服务添加只执行一次
server.once('request',function (req,res) {
    if (req.url == '/favicon.ico'){
        console.log('请求成功');
    }
});
server.once('request',function (req,res) {
    if (req.url == '/favicon.ico'){
        console.log('响应成功');
    }
});
//移出监听事件
var func = function () {
    console.log('这个方法不会执行');
};
//添加事件,添加监听事件
server.on('request',func);
//删除事件,删除监听事件
server.removeListener('request',func);
//删除全部
// server.removeAllListeners('request');
//
// server.on('request',function (req,res) {
//     res.end('Hello,Event');
// });
//服务器监听3000端口
server.listen(3000);

server.on('newListener',function (f,e) {
    console.log('对' + f + '添加了事件' + e);
});
server.on('removeListener',function (f,e) {
   console.log('对', f + '添加了事件' + e)
});



//设置最大值
//默认最大值为10
server.setMaxListeners(20);
//添加自定义事件
//customEvent 事件类型
server.on('customEvent',function () {
    console.log('此处为自定义事件');
});
//执行自定义事件
server.emit('customEvent');

var even = require('events');
console.log(even.listenerCount(server,'customEvent'));
