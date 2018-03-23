// let fs = require('then-fs')
const glob = require('globby')
    , CONFIG = require('../config')
    , CONFIG_PATH = CONFIG.path
    , path = require('path')
    , V = require('../V/blog')

// glob 
function collector(){
    let vblogs = V.fromdir(CONFIG_PATH.blog); 

    let vblogs_loading = vblogs.map(
        v => v.fresh()
    ); 

    return Promise.all(vblogs_loading).then(vblogs => {
        return vblogs.filter(v => !v.isDraft); 
    }); 
}

// collector().then(console.log)

module.exports = collector; 
