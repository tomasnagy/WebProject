/**
 * Created by tomasnagy on 11/12/14.
 */
(function() {
    'use strict';
    var socket = io.connect(),
        id,
        room,
        user,
        supportguitars = [],
        playChordHandler = function(data) {
            if(data.user.name !== user.name) {
                playChordFromSupportGuitar(data.user, data.chord, supportguitars);
            }
        };

    // request a key
    socket.emit('requestkey');
    // get key
    socket.on('getkey', function(data) {
        // save id + join room
        id = data;
        console.log(id);
        socket.emit('join room', data);
        socket.on('current room', function(data) {
            room = data.room;
            user = data.user;

            // load appropriate guitar
            loadGuitar(socket, user, room.name);

            // show guitars from other users
            showBackgroundGuitars(room.users, user.name);

            // load guitar sounds once
            supportguitars = loadSupportGuitarsSound(user.guitar);

            socket.on('play chord', playChordHandler);

            socket.on('user count changed', function(data) {
                // redraw support guitars when new user joins or an existing user leaves
                showBackgroundGuitars(data, user.name);
           });
        })
    });

    // close browser -> leave room
    window.addEventListener('beforeunload', function() {
        socket.emit('leave room', { name: room.name, user: user});
        return null;
    });


})();



function loadGuitar(socket, user, roomName) {
    var guitarItem = new GuitarPlayerItem(user.guitar, false),
        chord1 = document.getElementById('chord1'),
        chord2 = document.getElementById('chord2'),
        chord3 = document.getElementById('chord3'),
        chord4 = document.getElementById('chord4'),
        guitarImage = document.querySelector('#stage-container > figure > img');

    // load guitar
    guitarImage.src = "/images/guitars/" + user.guitar +".svg";

    // add handlers
    chord1.addEventListener('mouseenter', function() {
        guitarItem.playChord1();
        socket.emit('send chord to server', { roomName: roomName, user: user, chord: 1 } );
    });

    chord2.addEventListener('mouseenter', function() {
        guitarItem.playChord2();
        socket.emit('send chord to server', { roomName: roomName, user: user, chord: 2 } );
    });

    chord3.addEventListener('mouseenter', function() {
        guitarItem.playChord3();
        socket.emit('send chord to server', { roomName: roomName, user: user, chord: 3 } );
    });

    chord4.addEventListener('mouseenter', function() {
        guitarItem.playChord4();
        socket.emit('send chord to server', { roomName: roomName, user: user, chord: 4 } );
    });

    // keyhandlers
    window.addEventListener('keydown', function(e) {
        switch(e.keyCode) {
            case 65:
                guitarItem.playChord1();
                socket.emit('send chord to server', { roomName: roomName, user: user, chord: 1 } );
                break;
            case 81:
                // azerty
                guitarItem.playChord1();
                socket.emit('send chord to server', { roomName: roomName, user: user, chord: 1 } );
                break;
            case 83:
                guitarItem.playChord2();
                socket.emit('send chord to server', { roomName: roomName, user: user, chord: 2 } );
                break;
            case 68:
                guitarItem.playChord3();
                socket.emit('send chord to server', { roomName: roomName, user: user, chord: 3 } );
                break;
            case 70:
                guitarItem.playChord4();
                socket.emit('send chord to server', { roomName: roomName, user: user, chord: 4 } );
                break;
        }
    });
}

function showBackgroundGuitars(users, currentUser) {
    var i = users.length - 1,
        htmlBuilder = '',
        supportGuitar = '',
        item,
        supportGuitarContainer = document.getElementById('support-guitars');

    for(i; i >= 0; i--) {
        item = users[i];
        if(item.name !== currentUser) {
            supportGuitar = '<img id="';
            supportGuitar += item.name;
            supportGuitar += '" src="/images/guitars/';
            supportGuitar += item.guitar;
            supportGuitar += '.svg" alt="';
            supportGuitar += item.guitar;
            supportGuitar += '" />';
            htmlBuilder += supportGuitar;
        }
    }

    supportGuitarContainer.innerHTML = htmlBuilder;
}

function loadSupportGuitarsSound(currentGuitar) {
    var supportguitars = ['cheap', 'heartBroken', 'practiceSpace', 'woollyOctave'],
        i = supportguitars.length - 1,
        item,
        supportGuitarItem,
        result = [];

    for(i; i >= 0; i--) {
        item = supportguitars[i];
        if(item !== currentGuitar) {
            supportGuitarItem = new GuitarPlayerItem(item, true);
            result.push(supportGuitarItem);
        }
    }

    return result;
}

function playChordFromSupportGuitar(user, chord, supportguitars) {
    var i = supportguitars.length - 1,
        guitarItem;

    for(i; i >= 0; i--) {
        guitarItem = supportguitars[i];
        if(guitarItem.selectedGuitar === user.guitar) {
            switch(chord) {
                case 1:
                    guitarItem.playChord1();
                    break;
                case 2:
                    guitarItem.playChord2();
                    break;
                case 3:
                    guitarItem.playChord3();
                    break;
                case 4:
                    guitarItem.playChord4();
                    break;
            }
        }
    }
}
