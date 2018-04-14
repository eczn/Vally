import $ from 'jquery'; 

const $children_position_cache = Symbol('$children_position_cache'); 
const $children_cache = Symbol('$children_cache'); 

export default class FooterDocker {
    /**
     * @description 构造函数 
     * @param { JQuery } $parent
     */
    constructor($parent) {
        this.$parent = $parent; 
        this.$parent.addClass('footer-docker');
        this.onEnter = false;  

        let left = this.$parent.offset().left; 

        this.$parent.on('mousemove.footer-docker', e => {
            let { clientX } = e; 
            let offsetX = Math.ceil(clientX - left); 

            this.mousemove(offsetX); 
        }); 

        this.$parent.on('mouseenter.footer-docker', e => {
            let { clientX } = e; 
            let offsetX = Math.ceil(clientX - left); 
            
            this.mouseenter(offsetX); 
        }); 

        this.$parent.on('mouseleave.footer-docker', () => {
            this.positionReset(); 
        }); 
        this.positionReset(); 
        this.temp = []; 
    }

    mouseenter(offsetX){
        this.onEnter = true; 

        requestAnimationFrame(() => this.adjust(offsetX)); 

        setTimeout(() => {
            this.$children.removeClass('footer-transition'); 

            this.onEnter = false; 
        }, 300); 
    }

    mousemove(offsetX){
        let temp = this.temp; 

        if (this.onEnter) {
            temp.push(offsetX); 
            return; 
        }

        let go = () => {
            let b = temp.shift(); 
            // console.log(b)
            if (temp.length !== 0) {
                this.adjust(b); 
                requestAnimationFrame(go);
            } else {
                this.onEnter = false; 
            }
        }

        if (temp.length !== 0) {
            this.onEnter = true; 
            temp.push(offsetX); 
            go(); 
        } else {
            this.adjust(offsetX); 
        }
    }

    positionReset(){
        this.$children.addClass('footer-transition'); 
            
        this.$children.each((i, $dom) => {
            
            let cssSty = `
                transform: scale(1) translateX(0%);
            `; 
            $dom.setAttribute('style', cssSty); 
        })
    }

    adjust(offsetX){
        let vs = this.get_vectors(offsetX); 
        this.$children.each((i, $dom) => {
            let v = vs[i]; 
            let d = Math.abs(v); 

            let scale = d > 100 ? 1 : (
                1 + ((100 - d) / 80)
            ); 

            let cssSty = `
                transform: scale(${scale}) translateX(${-v}%);
            `; 
            $dom.setAttribute('style', cssSty); 
        })
    }

    /**
     * @description 距离矢量 
     * @param { Number } mouse_at 当前鼠标位置 
     * @returns { Array<Number> } 距离矢量集 
     */
    get_vectors(mouse_at){
        let pos = this.$children_position; 

        return pos.map(e => mouse_at - e); 
    }

    /**
     * @description 获取中心坐标 
     * @returns { Array<Number> } 结果 
     */
    get $children_position() {
        if (this[$children_position_cache]) {
            return this[$children_position_cache]; 
        }

        let $children = this.$parent.children();
        let len = $children.length; 

        let res = new Array(len).fill(0).map((__, idx) => {
            let $child = $children.eq(idx); 
            let mid = $child.width() / 2; 
            
            return parseInt($child.position().left + mid); 
        }); 

        this[$children_position_cache] = res; 

        return res; 
    }

    /**
     * @description get children 
     * @returns { JQuery } 
     */
    get $children() {
        if (this[$children_cache]) {
            return this[$children_cache]; 
        } else {
            let ch = this.$parent.children(); 
            this[$children_cache] = ch; 

            return ch; 
        }
    }
}
