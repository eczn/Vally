const fs = require('fs-extra')

let utils = {};

utils.mkdir = dir => {
    try {
        fs.mkdirSync(dir)
    } catch (err) {}
}

module.exports = utils; 
