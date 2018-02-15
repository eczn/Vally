// Hello asdasdasdasdasdasdasdasd
const pageCollector = require('./page-collector')
    , path = require('path')
    , webpack = require('webpack')
    , HtmlWebpackPlugin = require('html-webpack-plugin')
    , fs = require('fs')
    , $ = require('../$')
    , tplEngine = require('../tpl/engine')
    , CONFIG = require('../config')
    , chokidar = require('chokidar')
    , broadcast = require('../server/broadcast')


class P {
    /**
     * @description 构造函数 
     * @param { String } name 
     * @param { String } tpl 
     * @param { String } style 
     * @param { String } js 
     * @param { String } render 
     */
    constructor(name, tpl, style, js, render){
        this.name  =  name; 
        this.tpl   =  tpl; 
        this.style =  style; 
        this.js    =  js; 
        
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
        this.tplRender = tplEngine.fromFile(tpl, { }); 

        // watcher 
        let watcher = chokidar.watch(tpl); 
        watcher.on('change', path => {
            console.log(`[ P ] Tpl Reload ... ${tpl}`); 
            this.tplRender = tplEngine.fromFile(tpl, { }); 

            console.log('[ P ] and toHTML ... '); 

            this.toHTML().then(all_done => {
                // reload 
                console.log('[ P ] Client Reload'); 
                broadcast('F5'); 
            }); 
        });
    }

    toHTML(...args){
        return this.render.apply(this, args); 
    }
    
    // toHtmlWebpackPlugin(filename){
    //     filename = filename || `./no-set/${this.name}.html`; 

    //     return new HtmlWebpackPlugin({
    //         filename: filename, 
    //         template: this.tpl,
    //         cache: false, 
    //         chunks: ['vendors', this.name],
    //         data: {
    //             file(){
    //                 let content = fs.readFileSync('./test.js').toString(); ; 
    //                 console.log('new content', content); 
    //                 return content;
    //             }
    //         }
    //     });
    // }
}

P.prototype.$ = $; 
P.prototype.CONFIG = CONFIG; 

/**
 * @description from path 
 * @param { Path } p 
 * @returns { P }
 */
P.from = p => new P(
    p.name,
    path.join(p.dir, p.name, p.name + '.html'),
    path.join(p.dir, p.name, p.name + '.css'),
    path.join(p.dir, p.name, p.name + '.js'),
    path.join(p.dir, p.name, 'render.js')
); 

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



