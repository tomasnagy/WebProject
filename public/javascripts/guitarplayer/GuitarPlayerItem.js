/**
 * Created by tomasnagy on 12/12/14.
 */
var GuitarPlayerItem = function(selectedGuitar, isSupportGuitar) {
    'use strict';
    var audioPath = "../sounds/",
        manifest;

    this.selectedGuitar = selectedGuitar;
    this.isSupportGuitar = isSupportGuitar;
    this.chord1;
    this.chord2;
    this.chord3;
    this.chord4;

    if (!createjs.Sound.initializeDefaultPlugins()) {return;}


    switch (this.selectedGuitar) {
        case 'cheap':
            manifest = [
                {id:"cheapChord1", src:"CheapStudio/chord1CheapStudio.mp3"},
                {id:"cheapChord2", src:"CheapStudio/chord2CheapStudio.mp3"},
                {id:"cheapChord3", src:"CheapStudio/chord3CheapStudio.mp3"},
                {id:"cheapChord4", src:"CheapStudio/chord4CheapStudio.mp3"}
            ];
            break;
        case 'heartBroken':
            manifest = [
                {id:"heartBrokenChord1", src:"HeartBroken/chord1HeartBroken.mp3"},
                {id:"heartBrokenChord2", src:"HeartBroken/chord2HeartBroken.mp3"},
                {id:"heartBrokenChord3", src:"HeartBroken/chord3HeartBroken.mp3"},
                {id:"heartBrokenChord4", src:"HeartBroken/chord4HeartBroken.mp3"}
            ];
            break;
        case 'practiceSpace':
            manifest = [
                {id:"practiceSpaceChord1", src:"PracticeSpace/chord1PracticeSpace.mp3"},
                {id:"practiceSpaceChord2", src:"PracticeSpace/chord2PracticeSpace.mp3"},
                {id:"practiceSpaceChord3", src:"PracticeSpace/chord3PracticeSpace.mp3"},
                {id:"practiceSpaceChord4", src:"PracticeSpace/chord4PracticeSpace.mp3"}
            ];
            break;
        case 'woollyOctave':
            manifest = [
                {id:"woollyOctaveChord1", src:"WoollyOctave/chord1WoollyOctave.mp3"},
                {id:"woollyOctaveChord2", src:"WoollyOctave/chord2WoollyOctave.mp3"},
                {id:"woollyOctaveChord3", src:"WoollyOctave/chord3WoollyOctave.mp3"},
                {id:"woollyOctaveChord4", src:"WoollyOctave/chord4WoollyOctave.mp3"}
            ];
    }

    //var manifest = [
    //    {id:"cheapChord1", src:"CheapStudio/chord1CheapStudio.mp3"},
    //    {id:"cheapChord2", src:"CheapStudio/chord2CheapStudio.mp3"},
    //    {id:"cheapChord3", src:"CheapStudio/chord3CheapStudio.mp3"},
    //    {id:"cheapChord4", src:"CheapStudio/chord4CheapStudio.mp3"},
    //    {id:"heartBrokenChord1", src:"HeartBroken/chord1HeartBroken.mp3"},
    //    {id:"heartBrokenChord2", src:"HeartBroken/chord2HeartBroken.mp3"},
    //    {id:"heartBrokenChord3", src:"HeartBroken/chord3HeartBroken.mp3"},
    //    {id:"heartBrokenChord4", src:"HeartBroken/chord4HeartBroken.mp3"},
    //    {id:"practiceSpaceChord1", src:"PracticeSpace/chord1PracticeSpace.mp3"},
    //    {id:"practiceSpaceChord2", src:"PracticeSpace/chord2PracticeSpace.mp3"},
    //    {id:"practiceSpaceChord3", src:"PracticeSpace/chord3PracticeSpace.mp3"},
    //    {id:"practiceSpaceChord4", src:"PracticeSpace/chord4PracticeSpace.mp3"},
    //    {id:"woollyOctaveChord1", src:"WoollyOctave/chord1WoollyOctave.mp3"},
    //    {id:"woollyOctaveChord2", src:"WoollyOctave/chord2WoollyOctave.mp3"},
    //    {id:"woollyOctaveChord3", src:"WoollyOctave/chord3WoollyOctave.mp3"},
    //    {id:"woollyOctaveChord4", src:"WoollyOctave/chord4WoollyOctave.mp3"}
    //];

    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.registerManifest(manifest, audioPath);
};

GuitarPlayerItem.prototype = {
    get Chord1() { return this.selectedGuitar + 'Chord1'; },
    get Chord2() { return this.selectedGuitar + 'Chord2'; },
    get Chord3() { return this.selectedGuitar + 'Chord3'; },
    get Chord4() { return this.selectedGuitar + 'Chord4'; },

    playChord1: function() {
        this.stopAllChords();
        if (this.chord1 === undefined) {
            this.chord1 = createjs.Sound.play(this.selectedGuitar + 'Chord1');

            if(this.isSupportGuitar) {
                this.chord1.setVolume(0.5);
            }

        } else {
            this.chord1.stop();
            this.chord1.play();
        }
    },
    playChord2: function() {
        this.stopAllChords();
        if (this.chord2 === undefined) {
            this.chord2 = createjs.Sound.play(this.selectedGuitar + 'Chord2');

            if(this.isSupportGuitar) {
                this.chord2.setVolume(0.5);
            }

        } else {
            this.chord2.stop();
            this.chord2.play();
        }
    },
    playChord3: function() {
        this.stopAllChords();
        if (this.chord3 === undefined) {
            this.chord3 = createjs.Sound.play(this.selectedGuitar + 'Chord3');

            if(this.isSupportGuitar) {
                this.chord1.setVolume(0.5);
            }

        } else {
            this.chord3.stop();
            this.chord3.play();
        }
    },
    playChord4: function() {
        this.stopAllChords();
        if (this.chord4 === undefined) {
            this.chord4 = createjs.Sound.play(this.selectedGuitar + 'Chord4');

            if(this.isSupportGuitar) {
                this.chord1.setVolume(0.5);
            }

        } else {
            this.chord4.stop();
            this.chord4.play();
        }
    },
    stopAllChords: function() {
        if(this.chord1 !== undefined) {
            this.chord1.stop();
        }

        if(this.chord2 !== undefined) {
            this.chord2.stop();
        }

        if(this.chord3 !== undefined) {
            this.chord3.stop();
        }

        if(this.chord4 !== undefined) {
            this.chord4.stop();
        }
    }
};