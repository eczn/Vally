const fs = require('then-fs')
    , path = require('path')
    , { mkdir } = require('../utils'); 

module.exports = render; 

function render(){
    let { $, tplRender, CONFIG } = this; 

    let CONFIG_PATH = CONFIG.path; 
    let CONFIG_BLOG = CONFIG.blog; 
    let DIST_BASE = CONFIG_PATH.dist; 
    let BLOG_BASE = path.join(DIST_BASE, 'blog'); 

    mkdir(BLOG_BASE); 
    
    // html 
    let vblogs_query = $('sort-by/date').exec();

    return vblogs_query.then(vblogs => {       
        let write_all = vblogs.map(vblog => {
            
            let html = tplRender({
                blog: vblog.data
            }); 

            let dir = path.join(BLOG_BASE, vblog.data.id); 
            mkdir(dir); 

            let html_path = path.join(dir, 'index.html'); 

            return fs.writeFile(html_path, html); 
        }); 

        return Promise.all(write_all); 
    })
}
