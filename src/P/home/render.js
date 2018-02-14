const fs = require('then-fs')
    , path = require('path')

module.exports = render; 

function render(){
    let { CONFIG, $, tplRender } = this; 
    let CONFIG_PATH = CONFIG.path; 

    let DIST_BASE = CONFIG_PATH.dist; 
    let INDEX = path.join(DIST_BASE, 'index.html'); 

    // html 
    let html = tplRender({}); 

    return fs.writeFile(INDEX, html); 
}
