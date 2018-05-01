const fs = require('fs')
    , path = require('path')

let list = fs.readdirSync(__dirname); 

module.exports = list.map(dir => {
    return path.join(__dirname, dir); 
}).filter(file => {
    let stat = fs.statSync(file); 

    return stat.isDirectory(); 
}); 

