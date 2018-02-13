
module.exports = sort; 

/**
 * @description 排序 
 * @param   { Array<V>   } vblogs 
 * @param   { Boolean    } asc 
 * @returns { Array<V> }
 */
function sort(vblogs, prop = 'date', asc = false){
    if (asc === 'desc') {
        asc = false; 
    } else if (asc === 'asc') {
        asc = true; 
    }

    return vblogs.sort((a, b) => {
        if (prop === 'date'){
            a = + new Date(a.data[prop]);
            b = + new Date(b.data[prop]);    
        } else {
            a = a.data[prop]
            b = b.data[prop]
        }

        let one  = asc ? 1 : -1; 

        return a > b ? 
            one : 
            (a === b ? 0 : (-one))
    })
}

