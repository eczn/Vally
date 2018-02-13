
module.exports = find; 

/**
 * @description 搜索 
 * @param   { Array<V>   } vblogs 
 * @param   { Function   } fn 
 */
function find(vblogs, fn){
    for (let i = 0; i < vblogs.length; i ++){
        let vblog = vblogs[i];

        let res = fn(vblog, i, vblogs); 

        if (res) return [ vblog ]
    }
}

