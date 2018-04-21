const SysConfig = require('./SysConfig')
    , { CONFIG_FILE } = require('./home-resource'); 

module.exports = new SysConfig(CONFIG_FILE); 
