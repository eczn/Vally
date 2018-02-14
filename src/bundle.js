const P = require('./P')
    , webpack = require('webpack')
    , path = require('path')
    , CONFIG = require('./config')
    , MODULE_BASE = path.join(CONFIG.path.dist, 'js')
    // , broadcast = require('./server/broadcast')

let pages_config = P.getBundleConfig(MODULE_BASE); 


let reloads = []; 

module.exports = fn => {
    reloads.push(fn); 
} 

webpack(pages_config, function (err, stats) {
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

    // reload 

    reloads.forEach(fn => fn()); 


    // broadcast('F5'); 
}); 
