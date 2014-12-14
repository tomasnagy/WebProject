/**
 * Created by tomasnagy on 11/12/14.
 */
(function() {
    'use strict';
    var socket = io.connect(),
        id,
        room,
        user;

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
            loadGuitar(user, room.name);

            // show guitars from other users
            showBackgroundGuitars(room.users, user.name);

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



    //var element1 = document.getElementById("guitar1");
    //element1.addEventListener('mouseenter', function() {
    //    socket.emit('test', {name: roomName, user: id, chord:'Chord1'});
    //    createjs.Sound.stop('Chord2');
    //    createjs.Sound.stop('Chord3');
    //    createjs.Sound.stop('Chord4');
    //    createjs.Sound.play('Chord1');
    //});
    //var element2 = document.getElementById("guitar2");
    //element2.addEventListener('mouseenter', function() {
    //    createjs.Sound.stop('Chord1');
    //    createjs.Sound.stop('Chord3');
    //    createjs.Sound.stop('Chord4');
    //    createjs.Sound.play('Chord2');
    //});
    //var element3 = document.getElementById("guitar3");
    //element3.addEventListener('mouseenter', function() {
    //    createjs.Sound.stop('Chord1');
    //    createjs.Sound.stop('Chord2');
    //    createjs.Sound.stop('Chord4');
    //    createjs.Sound.play('Chord3');
    //});
    //var element4 = document.getElementById("guitar4");
    //element4.addEventListener('mouseenter', function() {
    //    createjs.Sound.stop('Chord1');
    //    createjs.Sound.stop('Chord2');
    //    createjs.Sound.stop('Chord3');
    //    createjs.Sound.play('Chord4');
    //});

    socket.on('play', function(data) {
        if(data.user !== id) {
            createjs.Sound.play(data.chord);
        }
    })
})();

function loadGuitar(user, roomName) {
    var guitarItem = new GuitarPlayerItem(user.guitar, false),
        chord1 = document.getElementById('chord1'),
        chord2 = document.getElementById('chord2'),
        chord3 = document.getElementById('chord3'),
        chord4 = document.getElementById('chord4'),
        guitarImage = document.querySelector('#stage-container > figure > img'),
        socket = io.connect();

    // load guitar
    guitarImage.src = "/images/guitars/" + user.guitar +".svg";

    // add handlers
    chord1.addEventListener('mouseenter', function() {
        guitarItem.playChord1();
        socket.emit('send chord to server', { roomName: roomName, userName: user.name, chord: 1 } );
    });

    chord2.addEventListener('mouseenter', function() {
        guitarItem.playChord2();
        socket.emit('send chord to server', { roomName: roomName, userName: user.name, chord: 2 } );
    });

    chord3.addEventListener('mouseenter', function() {
        guitarItem.playChord3();
        socket.emit('send chord to server', { roomName: roomName, userName: user.name, chord: 3 } );
    });

    chord4.addEventListener('mouseenter', function() {
        guitarItem.playChord4();
        socket.emit('send chord to server', { roomName: roomName, userName: user.name, chord: 4 } );
    });

    // keyhandlers
    window.addEventListener('keydown', function(e) {
        switch(e.keyCode) {
            case 65:
                guitarItem.playChord1();
                socket.emit('send chord to server', { roomName: roomName, userName: user.name, chord: 1 } );
                break;
            case 81:
                // azerty
                guitarItem.playChord1();
                socket.emit('send chord to server', { roomName: roomName, userName: user.name, chord: 1 } );
                break;
            case 83:
                guitarItem.playChord2();
                socket.emit('send chord to server', { roomName: roomName, userName: user.name, chord: 2 } );
                break;
            case 68:
                guitarItem.playChord3();
                socket.emit('send chord to server', { roomName: roomName, userName: user.name, chord: 3 } );
                break;
            case 70:
                guitarItem.playChord4();
                socket.emit('send chord to server', { roomName: roomName, userName: user.name, chord: 4 } );
                break;
        }
    });

    // play chord from other sockets
    socket.on('play chord', function(data) {
        guitarItem.playChord(data);
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
