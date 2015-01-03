/**
 * Created by tomasnagy on 11/12/14.
 */
module.exports = function(server) {
    var io = require('socket.io')({
            'sync disconnect on unload': true
        }).listen(server),
        colors = require('colors'),
        generator = require('../util/randomgenerator'),
        Room = require('../models/Room'),
        User = require('../models/User'),
        rooms = [];

    io.on('connection', function(socket) {

        socket.on('join room' , function(location) {
           // check if rooms exist
            if(rooms.length === 0) {

                // create firstroom
                generator.getRandomID(10, function(id) {
                    room = new Room(id);
                    console.log("First room created: " + room.Name.underline.green);
                    room.addUser(new User(socket.id,location));
                    rooms.push(room);
                    socket.join(room.Name);
                    socket.room = room.Name;
                    var user = room.getUserById(socket.id);

                    console.log("User: " + user.Name.underline.green + " joined room: " + room.Name.underline.green);
                    socket.emit('current room', {room: room, user: user });
                });
            } else {
                // find rooms with space
                var indexOfAvailableRoom = rooms.map(function(e) {
                    // returns 0 when full, 1 when space left
                    return (e.Users.length < 4) ? 1 : 0;
                    // get index of rooms that has space -> returns 1
                }).indexOf(1);

                if(indexOfAvailableRoom !== -1) {
                    // room found
                    var room = rooms[indexOfAvailableRoom];
                    room.addUser(new User(socket.id, location));
                    socket.join(room.Name);
                    socket.room = room.Name;

                    // get users after join to get updated user object
                    var user = room.getUserById(socket.id);

                    console.log('User: ' + user.Name.underline.green + ' joined existing room: ' + room.Name.underline.green + ' current user count: ' + room.Users.length.toString().blue);

                    socket.emit('current room', { room: room, user: user });
                    io.to(room.Name).emit('user count changed', room.Users);

                } else {
                    // no space found in existing rooms --> create new room
                    generator.getRandomID(10, function(id) {
                        var room = new Room(id);
                        room.addUser(new User(socket.id, location));
                        socket.join(room.Name);
                        socket.room = room.Name;

                        console.log('New room created: ' + room.Name.underline.green + ', existing room count: ' + rooms.length.toString().blue);

                        var user = room.getUserById(socket.id);

                        console.log('User: ' + user.Name + ' joined new room: ' + room.Name);

                        socket.emit('current room', { room: room, user: user });
                        rooms.push(room);
                    });
                }
            }
        });

        socket.on('send chord to server', function(data) {
           io.to(data.roomName).emit('play chord', {user: data.user, chord: data.chord});
        });

        socket.on('disconnect',  function() {
            if(socket.room !== undefined && socket.room !== null) {

                var indexOfRoom = rooms.map(function(e) {
                    return e.Name;
                }).indexOf(socket.room);

                // remove user from room
                if(indexOfRoom !== -1) {
                    var room = rooms[indexOfRoom];
                    room.removeUser(room.getUserById(socket.id));
                    socket.leave(room.Name);
                    console.log('User: ' + socket.id.underline.red + ' left room: ' + room.Name.underline.green + ' current user count: ' + room.Users.length.toString().blue);
                    if(room.Users.length === 0) {
                        // room empty -> remove room
                        rooms.splice(indexOfRoom, 1);
                        console.log('Room: ' + room.Name.underline.red + ' removed, existing room count: ' + rooms.length.toString().blue);
                    } else {
                        // send updated room info to all users in room
                        io.to(room.Name).emit('user count changed', room.Users);
                    }
                }
            }
        });
    });
};
