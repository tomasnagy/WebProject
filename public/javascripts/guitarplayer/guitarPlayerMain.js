/**
 * Created by tomasnagy on 11/12/14.
 */
function guitarPlayerController(isServerDown) {
    'use strict';
    var socket,
        room,
        user,
        supportguitars = [],
        playChordHandler = function(data) {
            if(data.user.name !== user.name) {
                shakeRightGuitar(data.user.name);
                playChordFromSupportGuitar(data.user, data.chord, supportguitars);
            }
        },
        locationLoader = document.getElementById('locationloader'),
        mainGuitar = document.querySelector('#stage-container>figure'),
        supportGuitars = document.getElementById('support-guitars');

    if(!isServerDown) {
        socket = io.connect();

        // get location -> join room
       // getLocation(function (location) {
            socket.emit('join room', 'load test');
            socket.on('current room', function (data) {
                room = data.room;
                user = data.user;

                // show guitar + remove preloader
                TweenLite.to(locationLoader, 0.2, {className: 'invisible'});
                TweenLite.to([mainGuitar, supportGuitars], 0.2, {delay: 0.2, className: '-=invisible'});


                // load appropriate guitar
                loadGuitar(socket, user, room.name);

                // show guitars from other users
                showBackgroundGuitars(room.users, user.name);

                // load guitar sounds once
                supportguitars = loadSupportGuitarsSound(user.guitar);

                socket.on('play chord', playChordHandler);

                socket.on('user count changed', function (data) {
                    // redraw support guitars when new user joins or an existing user leaves
                    showBackgroundGuitars(data, user.name);
                });
            });
        //});
    } else {
        // server down or no internet connection => enable 1 guitar
        TweenLite.to(locationLoader, 0.2, {className: 'invisible'});
        TweenLite.to([mainGuitar, supportGuitars], 0.2, {delay: 0.2, className: '-=invisible'});
        loadGuitar(socket, {name: 'offlineUser', guitar: 'cheap'}, 'offlineRoom');
    }
}



function loadGuitar(socket, user, roomName) {
    var guitarItem = new GuitarPlayerItem(user.guitar, false),
        chord1 = document.getElementById('chord1'),
        chord2 = document.getElementById('chord2'),
        chord3 = document.getElementById('chord3'),
        chord4 = document.getElementById('chord4'),
        keyDown = false,
        guitarImage = document.querySelector('#stage-container > figure > img'),
        setAllFretsInactive = function() {
            chord1.className = '';
            chord2.className = '';
            chord3.className = '';
            chord4.className = '';
        },
        timer,
        playChord1 = function(isKey) {
            if(isKey) {
                if(!keyDown) {
                    keyDown = true;
                } else {
                    return;
                }
            }
            guitarItem.playChord1();
            setAllFretsInactive();
            chord1.className = 'playing';
            clearTimeout(timer);
            timer = setTimeout(function() {
                setAllFretsInactive();
            }, 7000);
            if(socket !== undefined) {
                socket.emit('send chord to server', {roomName: roomName, user: user, chord: 1});
            }
        },
        playChord2 = function(isKey) {
            if(isKey) {
                if(!keyDown) {
                    keyDown = true;
                } else {
                    return;
                }
            }
            guitarItem.playChord2();
            setAllFretsInactive();
            chord2.className = 'playing';
            clearTimeout(timer);
            timer = setTimeout(function() {
                setAllFretsInactive();
            }, 7000);
            if(socket !== undefined) {
                socket.emit('send chord to server', {roomName: roomName, user: user, chord: 2});
            }
        },
        playChord3 = function(isKey) {
            if(isKey) {
                if(!keyDown) {
                    keyDown = true;
                } else {
                    return;
                }
            }
            guitarItem.playChord3();
            setAllFretsInactive();
            chord3.className = 'playing';
            clearTimeout(timer);
            timer = setTimeout(function() {
                setAllFretsInactive();
            }, 7000);
            if(socket !== undefined) {
                socket.emit('send chord to server', {roomName: roomName, user: user, chord: 3});
            }
        },
        playChord4 = function(isKey) {
            if(isKey) {
                if(!keyDown) {
                    keyDown = true;
                } else {
                    return;
                }
            }
            guitarItem.playChord4();
            setAllFretsInactive();
            chord4.className = 'playing';
            clearTimeout(timer);
            timer = setTimeout(function() {
                setAllFretsInactive();
            }, 7000);
            if(socket !== undefined) {
                socket.emit('send chord to server', {roomName: roomName, user: user, chord: 4});
            }
        };

    // load guitar
    guitarImage.src = "/build/images/guitars/" + user.guitar +".svg";

    // add handlers
    chord1.addEventListener('mouseenter', function(e) {
        playChord1(false);
    });

    chord2.addEventListener('mouseenter', function(e) {
        playChord2(false);
    });

    chord3.addEventListener('mouseenter', function(e) {
        playChord3(false);
    });

    chord4.addEventListener('mouseenter', function(e) {
        playChord4(false);
    });

    chord1.addEventListener('click', function(e) {
        playChord1(false);
    });

    chord2.addEventListener('click', function(e) {
        playChord2(false);
    });

    chord3.addEventListener('click', function(e) {
        playChord3(false);
    });

    chord4.addEventListener('click', function(e) {
        playChord4(false);
    });



    // keyhandlers
    window.addEventListener('keydown', function(e) {
        switch(e.keyCode) {
            case 65:
                playChord1(true);
                break;
            case 81:
                // azerty
                playChord1(true);
                break;
            case 83:
                playChord2(true);
                break;
            case 68:
                playChord3(true);
                break;
            case 70:
                playChord4(true);
                break;
        }
    });

    window.addEventListener('keyup', function(e) {
        keyDown = false;
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
                result += "...";
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
            supportGuitar += '"> <img src="/build/images/guitars/';
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
