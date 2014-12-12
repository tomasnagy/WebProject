/**
 * Created by tomasnagy on 11/12/14.
 */
module.exports = function(server) {
    var io = require('socket.io').listen(server),
        generator = require('../util/randomgenerator'),
        rooms = [];

    console.log('start socket');
    io.on('connection', function(socket) {
        socket.on('requestkey', function() {
            generator.getRandomID(10, function(data) {
                socket.emit('getkey', data);
            })
        });

        socket.on('join room' , function(data) {
           // check if rooms exist
            console.log('ID: ' + data);
            if(rooms.length === 0) {

                // create firstroom
                generator.getRandomID(5, function(id) {
                    var room = {
                        name: id,
                        users: [data]
                    };
                    rooms.push(room);
                    socket.join(room.name);
                    socket.emit('current room', room.name);
                    console.log('Joined room: ' + rooms.length);
                });
            } else {
                // find rooms with space
                var i = rooms.length - 1;
                for(i; i >= 0; i--) {
                    if(rooms[i].users.length < 4) {
                        // user to room
                        rooms[i].users.push(data);
                        socket.join(rooms[i].name);
                        return;
                    }
                }
                // no space found create new room
                generator.getRandomID(5, function(id) {
                    var room = {
                        name: id,
                        users: [data]
                    };
                    rooms.push(room);
                });
            }
        });

        socket.on('test', function(data) {
           io.emit('play', data);
          //console.log(data);
        });
    });
};
