var index = require('./app.vue');
var ASOB = require('./components/public/ASOB.vue');
var blogList = require('./components/blogList.vue'); 
var admin = require('./components/admin/admin.vue');
var adminNav = require('./components/admin/adminNav.vue');
var writedesk = require('./components/admin/writedesk.vue')

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
