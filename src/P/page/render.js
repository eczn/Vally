const fs = require('then-fs')
    , path = require('path')
    , { mkdir } = require('../utils'); 

module.exports = render; 

async function render(id){
    let { $, tplRender, CONFIG } = this; 

    let CONFIG_PATH = CONFIG.path; 
    let CONFIG_BLOG = CONFIG.blog; 
    let DIST_BASE = CONFIG_PATH.dist; 
    let PAGE_BASE = path.join(DIST_BASE, 'page'); 
    // let N = CONFIG_BLOG.page_count; 
    let N = CONFIG.blog.page_count; 

    mkdir(PAGE_BASE); 
    
    // html 
    let [pages, blog_count] = await Promise.all([
        $('sort-by/date').$(`split-every/${N}`).exec(), 
        $('count').exec()
    ]); 

    let writing = pages.map((page, now_page) => {
        let html = tplRender({
            page, 
            blog_count, 
            now_page
        }); 

        let dir = path.join(PAGE_BASE, now_page.toString()); 

        mkdir(dir); 

        let html_target = path.join(dir, 'index.html'); 

        return fs.writeFile(html_target, html); 
    }); 

    return Promise.all(writing); 
}
