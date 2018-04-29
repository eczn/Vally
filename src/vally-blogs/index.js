const { vallyConf } = require('../vally-conf')
    , VBlogsCtrl = require('./VBlogsCtrl')

    
module.exports = new VBlogsCtrl(
    vallyConf.load().BLOG_BASE
); 

