/**
 * Created by tomasnagy on 11/12/14.
 */
function GuitarPlayerController() {
    'use strict';
    var socket = io.connect(),
        id,
        room,
        user,
        supportguitars = [],
        playChordHandler = function(data) {
            if(data.user.name !== user.name) {
                shakeRightGuitar(data.user.name);
                playChordFromSupportGuitar(data.user, data.chord, supportguitars);
            }
        };

    // request a key
    socket.emit('requestkey');
    // get key
    socket.on('getkey', function(data) {
        // save id + join room
        id = data;
        console.log(id.name);
        getLocation(function(location) {
            socket.emit('join room', {key: data, location: location});
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
            });
        });
    });

    // close browser -> leave room
    window.addEventListener('beforeunload', function() {
        // check if user has joined room, then leave room, else do nothing
        if(room !== undefined) {
            socket.emit('leave room', {name: room.name, user: user});
        }
       // return null;
    });


}



function loadGuitar(socket, user, roomName) {
    var guitarItem = new GuitarPlayerItem(user.guitar, false),
        chord1 = document.getElementById('chord1'),
        chord2 = document.getElementById('chord2'),
        chord3 = document.getElementById('chord3'),
        chord4 = document.getElementById('chord4'),
        guitarImage = document.querySelector('#stage-container > figure > img'),
        setAllFretsInactive = function() {
            chord1.className = '';
            chord2.className = '';
            chord3.className = '';
            chord4.className = '';
        },
        timer;

    // load guitar
    guitarImage.src = "/images/guitars/" + user.guitar +".svg";

    // add handlers
    chord1.addEventListener('mouseenter', function(e) {
        guitarItem.playChord1();
        setAllFretsInactive();
        chord1.className = 'playing';
        clearTimeout(timer);
        timer = setTimeout(function() {
            setAllFretsInactive();
        }, 7000);
        socket.emit('send chord to server', { roomName: roomName, user: user, chord: 1 } );
    });

    chord2.addEventListener('mouseenter', function(e) {
        guitarItem.playChord2();
        setAllFretsInactive();
        chord2.className = 'playing';
        clearTimeout(timer);
        timer = setTimeout(function() {
            setAllFretsInactive();
        }, 7000);
        socket.emit('send chord to server', { roomName: roomName, user: user, chord: 2 } );
    });

    chord3.addEventListener('mouseenter', function(e) {
        guitarItem.playChord3();
        setAllFretsInactive();
        chord3.className = 'playing';
        clearTimeout(timer);
        timer = setTimeout(function() {
            setAllFretsInactive();
        }, 7000);
        socket.emit('send chord to server', { roomName: roomName, user: user, chord: 3 } );
    });

    chord4.addEventListener('mouseenter', function(e) {
        guitarItem.playChord4();
        setAllFretsInactive();
        chord4.className = 'playing';
        clearTimeout(timer);
        timer = setTimeout(function() {
            setAllFretsInactive();
        }, 7000);
        socket.emit('send chord to server', { roomName: roomName, user: user, chord: 4 } );
    });



    // keyhandlers
    window.addEventListener('keydown', function(e) {
        switch(e.keyCode) {
            case 65:
                guitarItem.playChord1();
                setAllFretsInactive();
                chord1.className = 'playing';
                clearTimeout(timer);
                timer = setTimeout(function() {
                    setAllFretsInactive();
                }, 7000);
                socket.emit('send chord to server', { roomName: roomName, user: user, chord: 1 } );
                break;
            case 81:
                // azerty
                guitarItem.playChord1();
                setAllFretsInactive();
                chord1.className = 'playing';
                clearTimeout(timer);
                timer = setTimeout(function() {
                    setAllFretsInactive();
                }, 7000);
                socket.emit('send chord to server', { roomName: roomName, user: user, chord: 1 } );
                break;
            case 83:
                guitarItem.playChord2();
                setAllFretsInactive();
                chord2.className = 'playing';
                clearTimeout(timer);
                timer = setTimeout(function() {
                    setAllFretsInactive();
                }, 7000);
                socket.emit('send chord to server', { roomName: roomName, user: user, chord: 2 } );
                break;
            case 68:
                guitarItem.playChord3();
                setAllFretsInactive();
                chord3.className = 'playing';
                clearTimeout(timer);
                timer = setTimeout(function() {
                    setAllFretsInactive();
                }, 7000);
                socket.emit('send chord to server', { roomName: roomName, user: user, chord: 3 } );
                break;
            case 70:
                guitarItem.playChord4();
                setAllFretsInactive();
                chord4.className = 'playing';
                clearTimeout(timer);
                timer = setTimeout(function() {
                    setAllFretsInactive();
                }, 7000);
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
        supportGuitarContainer = document.getElementById('support-guitars'),
        formatLocation = function(location) {
            var result = '';
            if(location.length > 17) {
                result = location.substring(0, 17);
                result += "..."
                return result.trim();
            } else {
                return location.trim();
            }
        };

    for(i; i >= 0; i--) {
        item = users[i];
        if(item.name !== currentUser) {
            supportGuitar = '<figure class="support-guitar" id="';
            supportGuitar += item.name;
            supportGuitar += '"> <img src="/images/guitars/';
            supportGuitar += item.guitar;
            supportGuitar += '.svg" alt="';
            supportGuitar += item.guitar;
            supportGuitar += '" />';
            supportGuitar += '<figcaption>';
            supportGuitar += formatLocation(item.location);
            supportGuitar += '</figcaption></figure>';
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

function shakeRightGuitar(name) {
    var guitarToShake = document.getElementById(name),
        count = 0,
        shakeTween = function(item){
        TweenMax.to(item,0.05,{rotation: 46});
        TweenMax.to(item, 0.05, {rotation: 44, delay: 0.05});
        if(count < 50) {
            setTimeout(function () {
                shakeTween(item);
                count++;
            }, 100);
        } else {
            TweenMax.to(item,0.1,{rotation: 45, delay: 0.1});
        }
    };

    shakeTween(guitarToShake);
}
