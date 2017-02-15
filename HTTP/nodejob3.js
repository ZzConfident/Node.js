/**
 * Created by dllo on 17/2/14.
 */
'use strict';
// //导入http模块
// var http = require('http');
// //创建server 传入回调
// var server = http.createServer(function (request,response) {
//    //回调接收request和response
// //获得http请求的method和url
//     console.log(request.method + ':'+request.url);
//     //响应200写入response,同时设置content-type
//     response.writeHead(200,{'Content-Type':'text/html'});
//     //响应html的内容写到response
//     response.end('<h1>Hello world!</h1>');
// });
//
// //让服务器监听8080端口
// server.listen(8080);
// console.log('Server is running at http://127.0.0.1:8080/');

// //用到url模块
// var url = require('url');
// //通过parse将一个字符串解析为一个url对象
// console.log(url.parse('http://user:pass@host.com:8080?path/to/file?query=string#hash'));

//处理本地文件目录用path模块

// var path = require('path');
// //解析本地目录
// var workDir = path.resolve('.');
// //组合完整的文件路径
// var filePath = path.join(workDir,'pub','index.html');


var
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');
//从命令参数获取root目录
var root = path.resolve(process.argv[2]||'.');
console.log('Static root dir :' + root);
//创建服务器
var server = http.createServer(function (request,response) {
   //获取urlde path
     var pathname = url.parse(request.url).pathname;
     //获得对应的本地文件路径
    var filepath = path.join(root,pathname);
    //获取文件状态
    fs.stat(filepath,function (err,stats) {
        if (!err&&stats.isFile()){
            //没出错并且文件存在
            console.log('200'+request.url);
            //发送200响应
            response.writeHead(200);
            //将文件流导向response
            fs.createReadStream(filepath).pipe(response);
        }else {
            //出错或者文件不存在
            console.log('404'+request.url);
            //发404
            response.writeHead(404);
            response.end('404 Not Found');
        }

    });
});
server.listen(8080);
console.log("Server is running at http://127.0.0.1:8080/");