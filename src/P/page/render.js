const fs = require('then-fs')
    , path = require('path')
    , { mkdir } = require('../utils'); 

module.exports = render; 

function render(id){
    let { $, tplRender, CONFIG } = this; 

    let CONFIG_PATH = CONFIG.path; 
    let CONFIG_BLOG = CONFIG.blog; 
    let DIST_BASE = CONFIG_PATH.dist; 
    let PAGE_BASE = path.join(DIST_BASE, 'page'); 
    // let N = CONFIG_BLOG.page_count; 
    let N = 1; 

    mkdir(PAGE_BASE); 
    
    
    // html 
    let vblogs_query = $('sort-by/date')
                      .$(`split-every/${N}`)
                      .exec()
                    

    return vblogs_query.then(vblogs_by_pages => {
        return vblogs_by_pages.map((vblogs, idx) => {
            let html = tplRender({
                vblogs
            }); 

            let dir = path.join(PAGE_BASE, idx.toString()); 

            mkdir(dir); 

            let html_target = path.join(dir, 'index.html'); 

            return fs.writeFile(html_target, html); 
        })
    })
}
