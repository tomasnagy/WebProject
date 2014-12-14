/**
 * Created by tomasnagy on 11/12/14.
 */
module.exports = function(server) {
    var io = require('socket.io').listen(server),
        generator = require('../util/randomgenerator'),
        Room = require('../models/Room'),
        User = require('../models/User'),
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
                    room = new Room(id);
                    room.addUser(new User(data));
                    rooms.push(room);
                    socket.join(room.Name);

                    var user = room.getUserById(data);

                    socket.emit('current room', {room: room, user: user });
                });
            } else {
                // find rooms with space
                // normal loop to start from beginning & add users to oldest rooms
                var i = 0,
                    l = rooms.length,
                    emptyFound = false;
                for(i; i < l; i++) {
                    if(rooms[i].Users.length < 4) {
                        // user to room
                        rooms[i].addUser(new User(data));

                        // get users after join to get updated user object
                        var user = rooms[i].getUserById(data);

                        socket.emit('current room', { room: rooms[i], user: user });
                        io.to(rooms[i].Name).emit('user count changed', rooms[i].Users);
                        socket.join(rooms[i].Name);
                        emptyFound = true;
                        break;
                    }
                }

                if(emptyFound === false) {
                    // no space found create new room
                    generator.getRandomID(5, function(id) {
                        var room = new Room(id);
                        room.addUser(new User(data));
                        socket.join(room.Name);

                        var user = room.getUserById(data);
                        socket.emit('current room', { room: room, user: user });
                        rooms.push(room);
                    });
                }
            }
        });

        socket.on('leave room', function(data) {
            // find room
            var i = rooms.length - 1;
            for(i; i >= 0; i--) {
                if(rooms[i].Name === data.name) {
                    // remove user from room
                    rooms[i].removeUser(rooms[i].getUserById(data.user.name));

                    // if no users left delete room
                    if(rooms[i].Users.length === 0) {
                        rooms.splice(i, 1);
                    } else {
                        io.to(rooms[i].Name).emit('user count changed', rooms[i].Users);
                    }
                }
            }
        });

        socket.on('send chord to server', function(data) {
           io.to(data.roomName).emit('play chord', data.chord);
          //console.log(data);
        });
    });
};
