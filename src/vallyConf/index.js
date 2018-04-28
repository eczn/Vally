const SysConfig = require('./SysConfig')
    , { CONFIG_FILE } = require('./home-resource'); 

module.exports = {
    vallyConf: new SysConfig(CONFIG_FILE)
}
