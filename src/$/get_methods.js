const fs = require('fs')
    , path = require('path')

module.exports = () => 
    fs.readdirSync(__dirname).reduce((query, item) => {
        let p = path.parse(item); 

        query[p.name] = require('./' + p.name); 

        return query; 
    }, {
        all: arr => arr 
    });
