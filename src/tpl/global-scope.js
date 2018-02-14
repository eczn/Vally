
let scope = {}

scope.require = function(name = '__'){
    let live_reload = process.env.dev ? 
        `<script src="/js/live_reload.js"></script>` : ''; 

    return `
        <script src="/js/${name}.js"></script>
        ${live_reload}
    `; 
}

module.exports = scope; 
