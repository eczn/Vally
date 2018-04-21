const fs = require('fs'); 

/**
 * @description mkdir (ignore any error)
 * @param { String } dir path to the dir u want to init 
 */
module.exports = dir => {
    try {
        fs.mkdirSync(dir); 
    } catch (err) { }
}
