const _ = require('ramda')

module.exports = splitEvery; 

/**
 * @description 搜索 
 * @param   { Array<V> } vblogs 
 * @param   { Array<*> } args
 */
function splitEvery(vblogs, ...args){
    let [ N ] = args; 

    N = parseInt(N) || 10; 


    return _.splitEvery(N)(vblogs); 
}

