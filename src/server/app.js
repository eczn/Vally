const express = require('express')
    , path = require('path')
    , CONFIG = require('../config')
    , CONFIG_PATH = CONFIG.path
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')
    , logger = require('morgan')
    , http = require('http')
    , broadcast = require('./broadcast')
    , serve = require('serve')

// Static Servev Port 
const PORT = CONFIG.server.PORT || 4444; 

serve(CONFIG_PATH.dist, {
    port: PORT
}); 
