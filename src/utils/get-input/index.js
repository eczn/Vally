const readline = require('readline');

module.exports = getInput;

/**
 * @description 获取输入 
 * @param { String } 问题 
 * @returns { Promise<String> } 结果返回一个 Promise（异步的）
 */
function getInput(question = ''){
    return new Promise(res => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(question, str => {   
            rl.close(); 
            res(str); 
        }); 
    }); 
}


/**
 * @description 提示用户输入 Y / N 判断是否继续 
 * @param { String } prompt 用户提示，默认值为 'is ok ? Y / N '
 * @returns { Promise<Boolean> } ok 或者不 ok
 */
getInput.isOK = function(prompt = 'is ok ? Y / N '){
    return getInput(prompt).then(str => {
        str = str.toLowerCase(); 

        return str === 'y'; 
    }); 
}
