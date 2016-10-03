var Vue = require('vue');
var app = Vue.extend({});
var VueRouter = require('vue-router');

Vue.use(VueRouter);

var router = new VueRouter({
	hashbang: true,
	history: false,
	saveScrollPosition: true,
	transitionOnload: true
});

require('./router')(router);


router.start(app, "body");