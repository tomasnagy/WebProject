/**
 * Created by tomasnagy on 11/12/14.
 */
(function() {
    'use strict';
    var socket = io.connect(),
        id,
        roomName;

    // request a key
    socket.emit('requestkey');
    // get key
    socket.on('getkey', function(data) {
        // save id + join room
        id = data;
        console.log(id);
        socket.emit('join room', data);
        socket.on('current room', function(data) {
            roomName = data;
        })
    });


    // if initializeDefaultPlugins returns false, we cannot play sound in this browser
    if (!createjs.Sound.initializeDefaultPlugins()) {return;}

    var audioPath = "../sounds/";
    var manifest = [
        {id:"Chord1", src:"CheapStudio/chord1CheapStudio.mp3"},
        {id:"Chord2", src:"CheapStudio/chord2CheapStudio.mp3"},
        {id:"Chord3", src:"CheapStudio/chord3CheapStudio.mp3"},
        {id:"Chord4", src:"CheapStudio/chord4CheapStudio.mp3"}
    ];

    createjs.Sound.alternateExtensions = ["mp3"];
    //createjs.Sound.addEventListener("fileload", handleLoad);
    createjs.Sound.registerManifest(manifest, audioPath);


    var element1 = document.getElementById("guitar1");
    element1.addEventListener('mouseenter', function() {
        socket.emit('test', 'Chord1');
        createjs.Sound.stop('Chord2');
        createjs.Sound.stop('Chord3');
        createjs.Sound.stop('Chord4');
        createjs.Sound.play('Chord1');
    });
    var element2 = document.getElementById("guitar2");
    element2.addEventListener('mouseenter', function() {
        createjs.Sound.stop('Chord1');
        createjs.Sound.stop('Chord3');
        createjs.Sound.stop('Chord4');
        createjs.Sound.play('Chord2');
    });
    var element3 = document.getElementById("guitar3");
    element3.addEventListener('mouseenter', function() {
        createjs.Sound.stop('Chord1');
        createjs.Sound.stop('Chord2');
        createjs.Sound.stop('Chord4');
        createjs.Sound.play('Chord3');
    });
    var element4 = document.getElementById("guitar4");
    element4.addEventListener('mouseenter', function() {
        createjs.Sound.stop('Chord1');
        createjs.Sound.stop('Chord2');
        createjs.Sound.stop('Chord3');
        createjs.Sound.play('Chord4');
    });

    socket.on('play', function(data) {
        createjs.Sound.play(data);
    })
})();
