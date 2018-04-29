const path = require('path')
    , chokidar = require('chokidar')
    , VFormat = require('md.daily')
    , WATCH_READY = Symbol('watch-ready')

class VBlogsCtrl {
    /**
     * @description 构造函数 
     * @param { String } BLOG_BASE 博客基址 
     * @param { Array<VFormat> } pools 博客池
     */
    constructor(BLOG_BASE, pools = []){
        // 初始化 
        this.BLOG_BASE = BLOG_BASE;  
        this.pools = pools; 
        
        // 开始监听 
        this.beginWatch(); 
    }

    /**
     * @description 收集 
     */
    async collect(){
        await this[WATCH_READY]; 

        return Promise.all(
            this.pools.map(v => v.getData())
        ); 
    }

    /**
     * @description watch *.md in this.BLOG_BASE 
     * @returns { VBlogsCtrl } 链式调用 
     */
    beginWatch(){
        // 监听 *.md 
        let md_files = path.join(this.BLOG_BASE, '*.md')
            // 兼容 Windows 
            .replace(/\\/g, '/'); 
        
        this.watcher = chokidar.watch(md_files, {
            ignored: /(^|[\/\\])\../
        }); 

        // 添加 
        this.watcher.on('add', path => {
            let v = new VFormat(path); 
            this.pools.push(v); 
        }); 

        // 直到 ready 
        this[WATCH_READY] = new Promise(res => {
            // on ready 
            this.watcher.on(
                'ready', res
            ); 
        }); 

        // 剔除 
        this.watcher.on('unlink', path => {
            // 找出需要删除的下标
            let deleted_idx = this.pools.findIndex(
                v => v.file_path === path
            ); 

            // 剔除 
            this.pools.splice(deleted_idx, 1); 
        });

        return this; 
    }

    /**
     * @description close watch 
     * @returns { VBlogsCtrl } 链式调用 
     */
    endWatch(){
        if (this.watcher){
            this.watcher.close(); 
            this.watcher = null; 
        }

        return this; 
    }
}

module.exports = VBlogsCtrl; 
