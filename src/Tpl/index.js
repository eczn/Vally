const tpl = require('tplser')
    , global_scope = require('./global-scope')

// 压入到 tplser 作为全局作用域 
tpl.push(global_scope); 

module.exports = tpl; 
