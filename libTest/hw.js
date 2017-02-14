/**
 * Created by dllo on 17/2/13.
 */
//调用加密模块
const crypto = require('crypto');
//创建返回一个hash对象,指定算法的加密hash,用于生产hash,参数选系统支持的算法
//const hash = crypto.createHash('md5');
//var str = 'Hello,world!';
//更新hash的内容为指定的data参数
//hash.update(str);
//console.log(hash.digest('hex'));

//创建并返回一个hmac对象
//参数选支持的算法
//const hmac = crypto.createHmac('sha256','secret-key');
//更新hmac的内容为指定的data
//hmac.update('Hello,world');
//console.log(hmac.digest('hex'));

//aes对称加密算法
// function aesEncrypt(data,key) {
//     //aes中aes192算法
//     const cipher = crypto.createCipher('aes192',key);
//     var crypted = cipher.update(data,'utf-8','hex');
//     crypted += cipher.final('hex');
//     return crypted;
// }
// function aesDecrypt(encrypted,key) {
//     const decipher = crypto.createDecipher('aes192',key);
//     var decrypted = decipher.update(encrypted,'hex','utf8');
//     decrypted += decipher.final('utf8');
//     return decrypted;
// }
// var data = 'Hello, this is a secret message!';
// var key = 'Password!';
// var encrypted = aesEncrypt(data,key);
// var decrypted = aesDecrypt(encrypted,key);
//
// console.log('Plain text:'+data);
// console.log('Encrypted text:'+encrypted);
// console.log('Decrypted text:'+decrypted);

//dh
//小明key
var ming = crypto.createDiffieHellman(512);
var ming_keys = ming.generateKeys();

var prime = ming.getPrime();
var generator = ming.getGenerator();

console.log('Prime:'+prime.toString('hex'));
console.log('Generator:'+generator.toString('hex'));

//小红key
var hong = crypto.createDiffieHellman(prime,generator);
var hong_keys = hong.generateKeys();

//交换生成
var ming_secret = ming.computeSecret(hong_keys);
var hong_secret = hong.computeSecret(ming_keys);

//打印秘钥
console.log('Secret of Xiao Ming:'+ ming_secret.toString('hex'));
console.log('Secret of Xiao Hong:'+hong_secret.toString('hex'));