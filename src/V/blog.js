const path = require('path')
    , fs = require('then-fs')
    , parse = require('./parse')
    , broadcast = require('../server/broadcast')

class V { 
    /**
     * @description V constructor 
     * @param { String } file 
     */
    constructor(file) {
        this.file = file; 

        // On Load 
        this._ = null; 
    }

    /**
     * @description fresh data 
     * @returns { Promise<V> }
     */
    fresh() {
        let loading = this.read(); 

        if (this.data) {
            return Promise.resolve(this); 
        } else {
            return loading.then(data => {
                this.data = data; 
                return this; 
            }); 
        }
    }

    /**
     * @description 读取 
     * @returns { Promise<String> } 
     */
    read() {
        return fs.readFile(this.file)
            .then(e => e.toString())
            .then(parse) 
    }
}

/**
 * @description 
 * @param { String } base file base 
 * @returns { Array<V> }
 */
V.fromdir = base => {
    let file_list = fs.readdirSync(base); 
    
    let file_list_abs = file_list.map(e => path.join(base, e)); 

    // 排除文件夹 
    file_list_abs = file_list_abs.filter(abs => {
        let p = path.parse(abs); 

        if (p.ext !== '.md') return false; 

        let stat = fs.statSync(abs); 

        return !stat.isDirectory(); 
    })

    let vs = file_list_abs.map(file_abs => new V(file_abs)); 

    return vs;  
}

module.exports = V; 
