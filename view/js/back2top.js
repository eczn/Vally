// back2top.js
define(['jquery'], function($){
    let rAF = window.requestAnimationFrame || window.setTimeout; 

    /**
     * @description 构造函数 
     * @param { Node } el 
     */
    function Back(el, scroll_area){
        this.$el = $(el); 
        this.$scroll_area = $(scroll_area); 
    }

    /**
     * @description 初始化 
     */
    Back.prototype.init = function(){
        // 取消先前可能的绑定 
        this.$el.off('click.back2top'); 

        // 添加事件监听
        this.$el.on(
            'click.back2top',
            e => this.toTop.call(this)
        ); 
    }

    /**
     * @description 回到顶部 
     * @param { Number } n = this.$scroll_area.scrollTop() 
     */
    Back.prototype.toTop = function(n){
        n = n || this.$scroll_area.scrollTop(); 

        let next = parseInt((n / 1.3) - 10); 
        
        if (next > 0){
            this.$scroll_area.scrollTop(next); 

            rAF(() => {
                this.toTop(next); 
            }, 16); 
        } else {
            rAF(() => {
                this.$scroll_area.scrollTop(0); 
            }, 16); 
        }
        
    }

    return Back; 
})