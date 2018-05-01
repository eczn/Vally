const { EventEmitter } = require('events')
    , path = require('path')
    , resolve = require('./resolve')
    , fs = require('fs')
    , vallyCtx = require('../ctx'); 

class Page extends EventEmitter {
    /**
     * @description Page 类构造函数
     * @param { String } entry 入口 
     */
    constructor(entry) {
        super(); 

        this.entry = entry; 
        this.entryResolve = resolve(this.entry); 

        // 初始化 
        this.info = this.getInfo(); 
    }
    
    /**
     * @description 从磁盘读取 index.json 
     * @returns { js: String, css: String } 
     */
    getInfo() {
        let info = null; 
        try {
            info = require(this.entry); 

            if (typeof info === 'function'){
                info = info(vallyCtx); 
            }
        } catch (err){
            console.error('[ Error ] Page 错误: 未定义 index.js 或 index.js 执行错误'); 
            console.error('Page 位置: ', this.entry); 
            console.error(err); 
            process.exit(1);
        }

        return info; 
    }
}

module.exports = Page; 
