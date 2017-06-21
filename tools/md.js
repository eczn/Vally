// md.js
let hljs = require('highlight.js')
  , alias = require('./alias')

hljs.configure({
	useBR: true
});

let md = require('markdown-it')({
	highlight: function (str, lang) {
		lang = alias(lang); 

		let line = str.split('\n').length - 2; 
		let lefts = ['3em', '3.6em'];

		var lineCount = new Array(line + 1).fill(0).reduce((acc, cur, idx) => {
			idx = idx < 100 ? ('00' + idx.toString()).slice(-2) : idx; 

			return acc + `<li>${idx}</li>`; 
		}, '<div class="lines">') + '</div>'; 

		var left = lefts[Math.floor((line + 1) / 100)] || lefts[1]; 

		if (lang && hljs.getLanguage(lang)) {
			try {
				return `<pre style="padding-left: ${left}" class="hljs ${lang}">${lineCount}<code class="lang-name">${lang}</code><code>` +
							hljs.highlight(lang, str, true).value +
						`</code></pre>`;
			} catch (__) {}
		}
		return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
	},
	html: true,
	xhtmlOut: true,
	breaks: true,
	linkify: true,
	typographer: true
}).use(require('markdown-it-toc-and-anchor').default, {
	// markdown-it-toc-and-anchor 
});

// sub sup 
md.use(require('markdown-it-sub'));
md.use(require('markdown-it-sup'));

md.use(require('markdown-it-table-of-contents')); 

var implicitFigures = require('markdown-it-implicit-figures');
md.use(implicitFigures, {
  dataType: false,  // <figure data-type="image">, default: false 
  figcaption: true  // <figcaption>alternative text</figcaption>, default: false 
});

module.exports = md; 
