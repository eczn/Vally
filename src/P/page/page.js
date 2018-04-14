import $ from 'jquery'; 
import footerPages from './components/footer-pages';
import FooterDocker from './components/footer-docker'; 

require('../utils/flexible.min'); 
require('./page.scss'); 


$(async () => {
    // footerPages(); 
    let docker = new FooterDocker($('.pages')); 

    window.docker = docker; 
}); 
