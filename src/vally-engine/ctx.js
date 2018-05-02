const vallyBlogs = require('../vally-blogs')
    , { vallyConf } = require('../vally-conf')
    , VallyCtx = require('./VallyCtx')

/**
 * @description 为了配置类型才这样写的
 * @return { VallyCtx } vallyCtx 
 */
module.exports = new VallyCtx(vallyBlogs, vallyConf); 

