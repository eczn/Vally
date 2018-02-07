define([], function(){
    /**
     * @description Date 
     * @param { Date } date 
     */
	function Timer(){
        this.timer = null; 
        // YY-MM-DD
        this.YY = null; 
        this.MM = null; 
        this.DD = null; 

        this.hh = null;
        this.mm = null; 
        this.ss = null; 
        
        this.event_bus = {}; 
    }

    /**
     * @description 事件监听
     * @param { String   } event_name
     * @param { Function } handle function
     */
    Timer.prototype.on = function(event_name, handle){
        let handles = this.event_bus[event_name]; 

        if (handles){
            handles.push(handle); 
        } else {
            this.event_bus[event_name] = [handle]; 
        }
        
        return this; 
    }

    /**
     * @description 触发 
     * @param { String } event_name 
     */
    Timer.prototype.emit = function(event_name, param){
        let handles = this.event_bus[event_name]; 

        if (handles){
            handles.forEach(fn => fn.call(this, param)); 
        }

        return this; 
    }

    /**
     * @description init 
     */
    Timer.prototype.init = function(){
        this.stop(); 

        this.timer = setInterval(
            this.tick.bind(this),
            1000
        ); 

        setTimeout(() => {
            this.tick(); 
        }); 

        return this;
    }

    /**
     * @description stop 
     */
    Timer.prototype.stop = function(){
        clearInterval(this.timer); 
        this.timer = null; 

        return this; 
    }

    /**
     * @description 计算当前时间
     */
    Timer.prototype.nowTime = function(){
        let now = new Date(); 
        
        let YY = now.getFullYear();
        let MM = now.getMonth() + 1;
        let DD = now.getDate(); 

        // hh, mm, ss
        let hh = now.getHours(); 
        let mm = now.getMinutes(); 
        let ss = now.getSeconds(); 
        
        return { YY, MM, DD, hh, mm, ss }
    }

    /**
     * @description tick 
     */
    Timer.prototype.tick = function(){
        let nowYYMMDD = this.nowTime(); 
        Object.assign(this, nowYYMMDD); 

        this.emit('ticking', nowYYMMDD); 

        return this; 
    }

    return Timer; 
})

