const fs = require('fs')
    , path = require('path')

let PAGE_LIST = fs.readdirSync(__dirname)

let ignore = {
    'dist': true, 
    'test.html': true, 
    '.js': true
}

PAGE_LIST = PAGE_LIST.filter(
    e => {
        let p = path.parse(e); 
        let ext = p.ext; 

        if (ignore[e]  || 
            ignore[ext]
        ) {
            return false; 
        } else {
            return true; 
        }
    }
); 

PAGE_BASE = PAGE_LIST.map(
    e => path.parse(path.join(__dirname, e))
); 

/**
 * @returns { Array<String> }
 */
function pageCollector(){
    return PAGE_BASE; 
}

module.exports= pageCollector; 
