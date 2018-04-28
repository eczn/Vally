const getInput = require('../../utils/get-input')

function log(...args){
    console.log(log.args(...args));  
}

log.args = (n, ...args) => ['  '.repeat(n), ...args].join(''); 

/**
 * @description 异步遍历配置树 
 * @param { Object } schema 
 * @returns { * } 值 
 */
async function travel(schema, deep = 0){
    let { sub_configs } = schema; 

    if (sub_configs){
        let obj = {}; 
        let next = 
            // 为 0 的时候不必询问要不要配置 
            (deep === 0) || 
            // 不然就询问一下 
            await getInput.isOK(
                log.args(deep, schema.intro, ', 要配置这个吗？(Y / N) ')
            );

        if (next) {
            // 遍历 sub_config 
            for (let i = 0; i < sub_configs.length; i++){
                let sub_config = sub_configs[i]; 

                // 字段赋值 
                obj[sub_config.name] =
                    await travel(sub_config, deep + 1); 
            }

            return obj; 
        } else {
            // 如果 schema.default 有的话，则返回 schema.default 
            // 不然返回 obj 这里是空对象 
            return typeof schema.default === 'undefined' ? 
                obj : schema.default; 
        }
    } else {
        let input = await getInput(
            log.args(deep, schema.intro, ': ')
        ); 
        
        return input; 
    }
}

module.exports = travel; 
