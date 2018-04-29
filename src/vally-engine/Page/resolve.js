const path = require('path'); 

module.exports = p => {
    return (...args) => path.join(p, ...args); 
}
