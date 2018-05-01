const Page = require('./Page')
const INNER_PAGES = require('../vally-inner-pages')

// 初始化页面 
const PAGES = INNER_PAGES.map(page_entry => {
    return new Page(page_entry); 
}); 


