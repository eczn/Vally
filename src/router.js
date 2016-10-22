var index = require('./app.vue');
var ASOB = require('./components/public/ASOB.vue');
var blogList = require('./components/blog/blogList.vue'); 
var admin = require('./components/admin/admin.vue');
var adminNav = require('./components/admin/adminNav.vue');
var writedesk = require('./components/admin/writedesk.vue');
var display = require('./components/blog/display.vue'); 

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
					component: blogList,
					subRoutes: {
						"/display": {
							name: "display",
							component: display
						}
					}
				}
			}
		},
		"admin": {
			name: 'admin',
			component: admin,
			subRoutes: {
				"/": {
					name: 'admin-nav', 
					component: adminNav
				},
				"writedesk": {
					name: 'writedesk',
					component: writedesk
				}
			}
		}
	});
}
