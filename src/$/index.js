const collector = require('../Collector')
    , get_methods = require('./get_methods')
    , QUERY_METHODS = get_methods()

module.exports = _$; 

let uri_merge = args => {
    let [ uri, ...xs ]= args; 

    let uri_args = uri.split('/').filter(e => e); 

    args = uri_args.concat(xs);   

    return args; 
}

function _$(...args){
    args = uri_merge(args); 

    let last = args[args.length - 1]; 
    
    let fn = {}; 

    fn.$ = (...args_2) => {
        let next = uri_merge(args_2);
      
        fn.query_list.push(next); 

        return fn; 
    }

    fn.query_list = [];

    fn.exec = () => collector().then(vblogs => {
        let { query_list } = fn; 

        let origin = $.call(null, vblogs, args); 

        origin = query_list.reduce((prev, query) => {
            return $.call(null, prev, query)
        }, origin); 
        
        return origin; 
    }).catch(err => {
        console.log('[ Query Error ]', err); 

        return Promise.reject(err); 
    });

    return fn;
}

function $(vblogs, args){
    let [todo, ...query_args] = args; 

    todo = todo || 'all'; 

    query_args.unshift(vblogs); 
    
    // let qs_res = query[todo].apply(null, query_args); 
    console.log('[ Query ]', args); 

    return QUERY_METHODS[todo].apply($, query_args); 
}
