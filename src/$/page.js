
module.exports = page; 

/**
 * @description 搜索 
 * @param   { Array<V> } vblogs 
 * @param   { Array<*> } args
 */
function page(vblogs, ...args){
    let [ P, N ] = args; 

    P = parseInt(P) || 0; 
    N = parseInt(N) || 10; 

    args[0] =  P * N;
    args[1] = (P + 1) * N; 

    args.unshift('slice'); 
    
    return this(vblogs, args); 
}

