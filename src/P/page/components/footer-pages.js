import $ from 'jquery'; 

export default function render(){
    let $$pages = $('.pages'); 
    let $$links = $$pages.find('> a'); 
    let $$now_at = $$pages.find('.now-at'); 
    let now_at_pos = $$links.index($$now_at); 
    let start = now_at_pos + 1; 
    let i = $$links.length - 1; 

    for (
        let start = (now_at_pos + 1) % $$links.length;
        start !== now_at_pos; 
        start = (start + 1) % $$links.length
    ) { // start 从 (now_at_pos + 1) 循环到 now_at_pos
        $$links.eq(start).css({
            fontSize: ((i * 6) + 16) + 'px'
        }); 

        i --; 
    }

    $$links.eq(now_at_pos).css({
        fontSize: $$links.length * 6 + 16 + 'px'
    })
}
