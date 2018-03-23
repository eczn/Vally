const P = require('./P')
    , webpack = require('webpack')
    , path = require('path')
    , CONFIG = require('./config')
    , MODULE_BASE = path.join(CONFIG.path.dist, 'js')
    , { EventEmitter } = require('events')
    // , broadcast = require('./server/broadcast')

let pages_config = P.getBundleConfig(MODULE_BASE); 

let bus = new EventEmitter(); 

module.exports = bus; 


let isFirst = true; 

webpack(pages_config, function(err, stats){
    if (err) throw err; 

    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n'); 

    if (stats.hasErrors()) {
        console.log('  Build failed with errors.\n'); 
        // process.exit(1); 
    }

    if (isFirst){
        isFirst = false; 
        bus.emit('first-build'); 
    }

    bus.emit('re-build');
}); 
