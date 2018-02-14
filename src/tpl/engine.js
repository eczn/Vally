const tpl = require('tplser')
    , global_scope = require('./global-scope')

tpl.push(global_scope); 

module.exports = tpl; 
