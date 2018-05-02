const VBlogsCtrl = require('../vally-blogs/VBlogsCtrl')
    , SysConfig = require('../vally-conf/SysConfig')

class VallyCtx {
    /**
     * @description 构造函数 
     * @param { VBlogsCtrl } blogs 
     * @param { SysConfig } conf 
     */
    constructor(blogs, conf){
        this.blogs = blogs; 
        this.conf = conf; 
    }
}

module.exports = VallyCtx; 
