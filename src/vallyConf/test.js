const { sy } = require('./index')
    , { CONFIG_FILE } = require('./home-resource')
    , fs = require('fs-extra')

async function printConfig(title){
    let str = await fs.readFile(CONFIG_FILE, 'utf-8'); 

    console.log(title); 
    console.log(str + '\n'); 
}

(async () => {
    console.log(CONFIG_FILE + '\n'); 

    await printConfig('之前的配置'); 
    console.log('------------'); 
    await sy.getAndSave();
    console.log('------------\n');
    await printConfig('之后的配置'); 

    
})(); 
