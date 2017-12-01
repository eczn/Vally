// pull 
const config = require('../../config')
    , blogPaths = config.path 
    , collector = require('../../tools/collector')
    , v = require('../../tools/v')
    , fs = require('then-fs')
    , path = require('path')
    , deploy = require('../deploy')
    , mkdir = require('../../tools/mkdir')
    , STORE_BASE = '/_sync'
    , STORE_TO   = path.join(config.path.dist, STORE_BASE)


// Init Dir 
mkdir(STORE_TO); 

function pullToLocal(){
    const git = require('simple-git')(config.path.dist);
    
    return new Promise(res => {
        git.pull(['origin', 'master'], (err, msg) => {
            console.log('Git Pull To Local Success.'); 

            res('ok'); 
        }); 
    })
}

function pullSync(){
    mkdir(config.path.blog); 

    return pullToLocal().then(ok => {
        console.log(`Git Sync Ok, And Next To Copy File To ${config.path.blog}`); 

        return fs.readdir(STORE_TO)
    }).then(list => {
        return Promise.all(list.map(file => {
            let abs = path.join(STORE_TO, file); 
            let to = path.join(config.path.blog, file); 

            return fs.readFile(abs).then(data => {
                return fs.writeFile(to, data); 
            })
        }))
    }).then(ok => {
        console.log(`Sync Pull Success, Watch: ${config.path.blog}`); 
    })
}

function pushSync(){
    let len = 0; 

    return collector.readBlog().then(blogs => {
        // 读取文件
        return blogs.map(blog => {
            let vblog = v(blog); 

            vblog.title = vblog.title.replace(/(\?|\\|\/)/, '').trim(); 
            
            return {
                fileName: vblog.title + '.md',
                content: blog
            }
        });         
    }).then(blogs => {
        // 写到 Git 目录下
        return Promise.all(
            blogs.map(blog => {
                let { content, fileName } = blog; 

                return fs.writeFile(path.join(STORE_TO, fileName), content); 
            })
        ); 
    }).then(ok => {
        console.log(`File Write Success`); 
        
        return deploy(false); 
    })
}

module.exports = function(arg){
    if (arg === 'pull'){
        // just pull 
        return pullSync();
    } else {
        // push to 
        return pushSync().then(ok => {
            console.log('Push Sync Success'); 
        }); 
    }
}
