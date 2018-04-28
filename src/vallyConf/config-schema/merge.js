
/**
 * @description 有限制的对象合并, 会改变 old_one  
 * @param { Object } old_one 
 * @param { Object } new_one 
 * @returns { Object } 合并之后的 old_one 
 */
function merge(old_one, new_one) {
    Object.keys(new_one).forEach(key => {
        // 如果新值是 '' 则跳过这个 key 
        if (new_one[key] === '') return; 
    
        if (
            typeof old_one[key] === 'object' && 
            typeof new_one[key] === 'object'
        ) {
            // 两个都是对象则继续合并 
            merge(old_one[key], new_one[key]); 
        } else {
            // 否则覆盖 
            old_one[key] = new_one[key]; 
        }
    }); 

    return old_one; 
}

module.exports = merge; 
