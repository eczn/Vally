module.exports = class MetaProxy {
    constructor(){
        return new Proxy(this, {
            get(target, property, receiver){
                if (target.data){
                    if (target.data[property]){
                        return target.data[property]; 
                    } else {
                        return target[property]
                    }
                } else {
                    return target[property]; 
                }
            }
        })
    }
}
