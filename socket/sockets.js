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
            if(rooms.length === 0) {

                // create firstroom
                generator.getRandomID(10, function(id) {
                    room = new Room(id);
                    console.log("First room created: " + room.Name);
                    room.addUser(new User(data.key, data.location));
                    rooms.push(room);
                    socket.join(room.Name);

                    var user = room.getUserById(data.key);

                    console.log("User: " + user.Name + " joined room: " + room.Name);
                    socket.emit('current room', {room: room, user: user });
                });
            } else {
                // find rooms with space
                var indexOfAvailableRoom = rooms.map(function(e) {
                    // returns 0 when full 1 when space left
                    return (e.Users.length < 4) ? 1 : 0;
                    // get index of rooms that has space -> returns 1
                }).indexOf(1);

                if(indexOfAvailableRoom !== -1) {
                    // room found
                    var room = rooms[indexOfAvailableRoom];
                    room.addUser(new User(data.key, data.location));
                    socket.join(room.Name);

                    // get users after join to get updated user object
                    var user = room.getUserById(data.key);

                    console.log('User: ' + user.Name + ' joined existing room: ' + room.Name);

                    socket.emit('current room', { room: room, user: user });
                    io.to(room.Name).emit('user count changed', room.Users);

                } else {
                    // no space found in existing rooms --> create new room
                    generator.getRandomID(10, function(id) {
                        var room = new Room(id);
                        room.addUser(new User(data.key, data.location));
                        socket.join(room.Name);

                        console.log('New room created: ' + room.Name);

                        var user = room.getUserById(data.key);

                        console.log('User: ' + user.Name + ' joined new room: ' + room.Name);

                        socket.emit('current room', { room: room, user: user });
                        rooms.push(room);
                    });
                }
            }
        });

        socket.on('leave room', function(data) {
            // get index of room
            var indexOfRoom = rooms.map(function(e) {
                return e.Name;
            }).indexOf(data.name);

            // remove user from room
            if(indexOfRoom !== -1) {
                var room = rooms[indexOfRoom];
                room.removeUser(room.getUserById(data.user.name));
                console.log('User: ' + data.user.name + ' left room: ' + room.Name);
                if(room.Users.length === 0) {
                    // room empty -> remove room
                    console.log('Room: ' + room.Name + ' removed.');
                    rooms.splice(indexOfRoom, 1);
                } else {
                    // send updated room info to all users in room
                    io.to(room.Name).emit('user count changed', room.Users);
                }
            }
        });

        socket.on('send chord to server', function(data) {
           io.to(data.roomName).emit('play chord', {user: data.user, chord: data.chord});
        });
    });
};
