/**
 * 模块加载
 * @name (require)
 * @func
 * @param {object} scope 作用域 (一般为全局)
 * @param {stirng} pre 方法前缀, 避免冲突
 * @copyright 百度某小游戏(具体出处遗失), 有改动
 * @example
 * // 定义
 * define("namespace/main.js", function(exports){
 *   exports.log = function(){
 *      console.log(1);
 *   }
 *   return exports
 * })
 * // 两种引用方式
 * var main = require("namespace/main.js");
 * var log = require("namespace/main.js").log;
 */
void function (scope, pre){
  var cache = {};
  var mapping = {};
  pre = pre || '';
  scope[pre + 'startModule'] = function(m){
    scope[pre + 'require'](m).start();
  };
  scope[pre + 'define'] = function(id, func){
    mapping[id] = func;
  };
  scope[pre + 'require'] = function(id){
    if(!/\.js$/.test(id)){
      id += '.js';
    }
    return (cache[id] = cache[id] || mapping[id]({}))
  };
}(this);