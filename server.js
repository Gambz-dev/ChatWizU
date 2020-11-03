const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.use(express.static('public'));

app.get("/", function(req, res){
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', function(socket){
    console.log('utilisateur connecté');
    socket.on('disconnect', function (){
        console.log('utilisateur déconnecté');
    })
    socket.on('chat message', function (msg){
        console.log('message recu : ' + msg);
        io.emit('chat message', msg);
    })

})

http.listen(3000, function(){
    console.log("Server running on 3000")
})