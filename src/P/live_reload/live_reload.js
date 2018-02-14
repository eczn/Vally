import io from 'socket.io-client';

const socket = io('ws://localhost:44444');


socket.on('broadcast', data => {
    console.log('[ Livereload ]', data); 

    if (data === 'F5') location.reload(); 
})
