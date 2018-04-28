const configMerge = require('./config-schema/merge')
    , configSchema = require('./config-schema')
    , fs = require('fs-extra')

class SysConfig {
    /**
     * @description 构造函数 
     */
    constructor(_CONFIG_FILE){
        this.CONFIG_FILE = _CONFIG_FILE; 
    }

    /**
     * @description get config
     * @returns { Promise<Object> } 获取配置 
     */
    async get(){
        let config_new = await configSchema.run();
        let config_old; 

        try {
            let temp = await fs.readFile(
                this.CONFIG_FILE, 
                'utf-8'
            ); 
            config_old = JSON.parse(temp); 
        } catch (err){
            // ENOENT::配置文件不存在 
            // 则复制一份 
            config_old = JSON.parse(JSON.stringify(config_new)); 
        }

        return configMerge(
            config_old, config_new
        ); 
    }

    /**
     * @description 读取配置文件 
     * @returns { Object }
     */
    async load(){
        let temp = await fs.readFile(
            this.CONFIG_FILE, 
            'utf-8'
        ); 
        
        return JSON.parse(temp); 
    }

    /**
     * @description get & save 
     * @returns { Promise } fs.writeFile 所返回的 promise 
     */
    async getAndSave(){
        let config = await this.get(); 
        return this.set(config); 
    }

    /**
     * @description save config
     * @param { Object } config 
     * @returns { Promise } fs.writeFile 所返回的 promise 
     */
    set(config){
        let config_str = JSON.stringify(config); 

        return fs.writeFile(this.CONFIG_FILE, config_str, 'utf-8'); 
    }
}

module.exports = SysConfig; 
