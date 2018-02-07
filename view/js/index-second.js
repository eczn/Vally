// index-second.js 
define(['jquery', 'Timer'], function($, Timer){
	function randomArr(a, b = []){
		let len = a.length; 

		if (a.length){
			let target = parseInt(Math.random() * len);

			let item = a.splice(target, 1)[0]; 
			
			b.push(item); 

			return randomArr(a, b); 
		} else {
			return b; 
		}
	}

    
    function init(timer){
        // let timer = new Timer(); 
        
        let sec_random = new Array(60).fill(0).map((_, idx) => idx); 
    
        sec_random = randomArr(sec_random); 
    
        let seconds_html = sec_random.map(e => {
            let m = parseInt(Math.random() * 90) - 45; 

            return `<span class="second"
                style="transform: rotate(${m}deg);"
            >${('00' + e).slice(-2)}</span>`
        }).join(''); 
    
        let val2idx = sec_random.reduce((acc, cur, idx) => {
            acc[cur] = idx;
            return acc; 
        }, {});
    
        $('.seconds').html(seconds_html); 
    
        let SEC_PADDING = 10; 
        let SEC_W = $('.second').width()  + SEC_PADDING * 2; 
        let SEC_H = $('.second').height() + SEC_PADDING * 2; 
    
        // console.log(SEC_W, SEC_H); 
    
        let COLUMN_COUNT = 6; 
        let LINE_COUNT   = 10; 
    
        let OFFSET = {
            X: (COLUMN_COUNT / 2) + 0.5, 
            Y: (LINE_COUNT / 2)
        }
    
        $('.seconds-wrap').css({
            height: SEC_H * LINE_COUNT + 'px'
        }); 
    
        
        $('.seconds').css('width', (COLUMN_COUNT * SEC_W) + 'px'); 
    
        timer.on('ticking', time => {
            // 12 * 5 
            let { YY, MM, DD, hh, mm, ss } = time; 
            
            ss = val2idx[ss]; 
            
            $('.second').removeClass('active'); 
            $('.second').eq(ss).addClass('active'); 
    
            let line_at = parseInt(ss / COLUMN_COUNT); 
            let column_at = ss % COLUMN_COUNT; 
    
            let x = (column_at - OFFSET.X) * SEC_W; 
            let y = (line_at - OFFSET.Y)   * SEC_H; 
            $('.seconds').css(
                'transform',
                `translate(${-parseInt(x)}px, ${-parseInt(y)}px)`
            ); 
    
            // console.log('ss:', ss, 'xi, yi', column_at, line_at); 
            // console.log(x, y); 
        })
    }

	return init; 
})

