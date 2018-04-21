const { VALLY_HOME } = require('../home-resource')
    , path = require('path')
    , travel = require('./travel')

const schema = {
    name: 'VALLY', 
    intro: 'Vally 配置', 
    sub_configs: [
        {
            name: 'BLOG_BASE', 
            intro: '本地博文 Markdown 文件夹',
            require: true
        }, 
        {
            name: 'DIST', 
            intro: 'Vally 输出目录',
            default: path.join(VALLY_HOME, 'Default-Dist')
        },
        {
            name: 'QINIU', 
            intro: '七牛相关配置',
            default: false, 
            sub_configs: [
                {
                    name: 'AK', 
                    intro: '七牛 Access Key'
                }, 
                {
                    name: 'SK', 
                    intro: '七牛 Secret Key'
                }, 
                {
                    name: 'DOMAIN', 
                    intro: '七牛域名 (domain)'
                }, 
                {
                    name: 'BUCKET', 
                    intro: '七牛空间名 (bucket)'
                }, 
            ]
        }
    ]
}

module.exports = {
    run(){
        console.log(schema.intro); 
        return travel(schema); 
    }
}
