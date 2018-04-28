const osHomedir = require('os-homedir')
    , path = require('path')
    , USER_HOME = osHomedir()
    , VALLY_HOME = path.join(USER_HOME, '.vally')
    , CONFIG_FILE = path.join(VALLY_HOME, 'config.json')
    , mkdir = require('../utils/mkdir'); 

// 初始化 
mkdir(VALLY_HOME); 

module.exports = {
    VALLY_HOME, USER_HOME, CONFIG_FILE
}
