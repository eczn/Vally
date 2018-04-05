
let scope = {}

scope.require = function(name = '__'){
    let live_reload = process.env.dev ? 
        `<script src="/js/live_reload.js"></script>` : ''; 

    return `
        <script src="/js/${name}.js"></script>
        ${live_reload}
    `; 
}

/**
 * @description 前置 0 
 * @param { Number } n 0 的个数 
 * @param { String | Number } val 待前置对象
 * @returns { String } 
 */
scope.zeroPreset = function(n, val){
    return ('0'.repeat(n) + val.toString()).slice(-n); 
}

/**
 * @description 时间处理
 * @param { Date } d 
 * @returns { String } 返回时间 
 */
scope.pageDate = function(d){
    let YYYY = d.getFullYear(); 
    let MM = scope.zeroPreset(2, d.getMonth() + 1); 
    let DD = scope.zeroPreset(2, d.getDate()); 

    return [YYYY, MM, DD].join('-'); 
}

/**
 * @description Slice 
 * @param { Array | String } v 
 * @param { Array<Number> } args 
 * @returns { Array | String }
 */
scope.slice = function(v, ...args){
    return v.slice(...args); 
}

module.exports = scope; 
