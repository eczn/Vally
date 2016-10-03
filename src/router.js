var index = require('./app.vue');
var ASOB = require('./components/public/ASOB.vue')
var blogList = require('./components/blogList.vue'); 

module.exports = function(router){
	router.map({
		"/": {
            name: 'root',
			component: index,
			subRoutes: {
				"/": {
					name: "welcome", 
					component: ASOB
				},
				"blogList": {
					name: "blogList", 
					component: blogList
				}
			}
		}
	});
}
