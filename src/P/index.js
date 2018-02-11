// Hello asdasdasdasdasdasdasdasd
const pageCollector = require('./page-collector')
    , path = require('path')
    , webpack = require('webpack')
    , HtmlWebpackPlugin = require('html-webpack-plugin')
    , fs = require('fs')

class P {
    constructor(name, tpl, style, js){
        this.name  =  name; 
        this.tpl   =  tpl; 
        this.style =  style; 
        this.js    =  js; 
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

/**
 * @description from path 
 * @param { Path } p 
 * @returns { P }
 */
P.from = p => new P(
    p.name,
    path.join(p.dir, p.name, p.name + '.ejs'),
    path.join(p.dir, p.name, p.name + '.css'),
    path.join(p.dir, p.name, p.name + '.js')
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



