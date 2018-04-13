// Hello asdasdasdasdasdasdasdasd
const pageCollector = require('./page-collector')
    , path = require('path')
    , webpack = require('webpack')
    , HtmlWebpackPlugin = require('html-webpack-plugin')
    , fs = require('fs-extra')
    , $ = require('../$')
    , tplEngine = require('../tpl/engine')
    , CONFIG = require('../config')
    , chokidar = require('chokidar')
    , broadcast = require('../server/broadcast')
    , { mkdir } = require('./utils')


class P {
    /**
     * @description 构造函数 
     * @param { Path } p
     */
    constructor(p){
        this.path = p; 
        this.name   =  p.name; 
        this.tpl    =  path.join(p.dir, p.name, p.name + '.html'); 
        this.style  =  path.join(p.dir, p.name, p.name + '.css'); 
        this.js     =  path.join(p.dir, p.name, p.name + '.js'); 
        this.assets =  path.join(p.dir, p.name, 'assets'); 
        this.assetsWatch(); 

        let render = path.join(p.dir, p.name, 'render.js')
        let render_fn; 

        try {
            render_fn = require(render)
            this.render = render_fn
        } catch (err){
            this.render = () => {
                console.log('[ P ]', `render not found, \`${name}\``)
                return null; 
            }

            console.log('[ P ]', `render loading error, \`${name}\``)
        }
        
        // init tpl
        this.tplRender = tplEngine.fromFile(this.tpl, { }); 

        // watcher 
        let watcher = chokidar.watch(this.tpl); 
        watcher.on('change', path => {
            console.log(`[ P ] Tpl Reload ... ${this.tpl}`); 
            this.tplRender = tplEngine.fromFile(this.tpl, { }); 

            console.log('[ P ] and toHTML ... '); 

            this.toHTML().then(all_done => {
                // reload 
                console.log('[ P ] Client Reload'); 
                broadcast('F5'); 
            }); 
        });
    }

    toHTML(...args){
        return this.render(...args).then(ok => {
            console.log('[ Render ]', this.name); 
        }); 
    }

    /**
     * @description 监听资源
     */
    assetsWatch(){
        if (!fs.existsSync(this.assets)) return; 

        let DIST = this.CONFIG.path.dist; 
        let ASSETS = path.join(DIST, 'assets'); 
        mkdir(ASSETS); 
        let THIS_PAGE_ASSETS = path.join(ASSETS, this.name);
        mkdir(THIS_PAGE_ASSETS); 

        // Copy File 
        try {
            fs.copySync(this.assets, THIS_PAGE_ASSETS); 
        } catch (err) {
            console.log(err); 
        }
    }
}

P.prototype.$ = $; 
P.prototype.CONFIG = CONFIG; 

/**
 * @description from path 
 * @param { Path } p 
 * @returns { P }
 */
P.from = p => new P(p); 

/**
 * @description 实例化
 * @returns { Array<P> } 
 */
P.getPages = () => {
    return pageCollector().map(P.from);
}

/**
 * @description 开启模块加载
 * @param { Strubg } base 
 */
P.getBundleConfig = base => {
    let pages = P.getPages(); 

    let pages_entry = pages.reduce((entry, page) => {
        entry[page.name] = page.js; 
        
        return entry; 
    }, {}); 

    return {
        entry: pages_entry,
        watch: true, 
        output: {
            path: base,
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        // 'postcss-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        'style-loader',
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        'sass-loader',
                        'postcss-loader'
                    ]
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    use: [
                        { loader: 'url-loader', options: { limit: 999999 } }
                    ]
                }
            ]
        }
    }
}

module.exports = P; 

// webpack(p_config(path.join(__dirname, './dist')), function (err, stats) {
//     if (err) throw err; 

//     process.stdout.write(stats.toString({
//         colors: true,
//         modules: false,
//         children: false,
//         chunks: false,
//         chunkModules: false
//     }) + '\n\n'); 

//     if (stats.hasErrors()) {
//         console.log('  Build failed with errors.\n'); 
//         process.exit(1); 
//     }
// }); 



