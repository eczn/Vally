const P = require('./P')
    , path = require('path')
    , $ = require('./$')
    , broadcast = require('./server/broadcast')
    , V = require('./V/blog')
    , chokidar = require('chokidar')
    , CONFIG = require('./config')

process.env.dev = true; 

// module bundle 
let bundler = require('./bundle'); 

bundler.on('re-build', () => {
    broadcast('F5'); 
}); 

require('./server/app'); 

let ps = P.getPages(); 

function page_generator(ps){
    return Promise.all(
        ps.map(p => p.toHTML())
    ); 
}

// init 
bundler.once('first-build', () => {
    page_generator(ps); 
}); 



let mds = path.join(CONFIG.path.blog, '**\\*.md'); 

let watcher = chokidar.watch(mds, {
    ignored: /(^|[\/\\])\../,
    persistent: true
});

watcher.on('change', async path => {
    console.log(`[ $ ] ${path} changed`); 

    await page_generator(ps)

    broadcast('F5'); 
}); 


// $('sort-by/date/desc')
//     .$('page/2/1')
//     .exec()
//     .then(vblogs => {
//     console.log(vblogs); 
// })
