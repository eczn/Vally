var io = require('socket.io')();

io.on('connection', client => {
    console.log('[ Livereload ] client connected'); 
});

function broadcast(data){
    io.emit('broadcast', data);
}

broadcast.reload = function(){
    broadcast('F5'); 
}

io.listen(44444);


module.exports = broadcast; 
