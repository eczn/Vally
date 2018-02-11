const P = require('./P')
    , webpack = require('webpack')
    , path = require('path')
    , DIST = path.join(__dirname, './dist')


let pages_config = P.getBundleConfig(DIST); 

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
        process.exit(1); 
    }
})
