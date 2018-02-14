const fs = require('fs')
let utils = {};


utils.mkdir = dir => {
    try {
        fs.mkdirSync(dir)
    } catch (err) {}
}

module.exports = utils; 
