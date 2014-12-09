/**
 * Created by tomasnagy on 09/12/14.
 */
var HistoryAnimationItem = function(index, data) {
    'use strict';
    this.index = index;
    this.data = data;
    this.year = document.querySelectorAll('.year')[index];
    this.guitarItem = document.getElementsByTagName('section')[index];
    this.fullHeight = 0;
    this.smallHeight = 0;
    this.mainData = [this.guitarItem.children[0], this.guitarItem.children[1]];
    this.extraData = [this.guitarItem.children[2], this.guitarItem.children[3]];
    this.i = this.mainData.length - 1;
    this.j = this.extraData.length - 1;
    this.tl1 = new TimelineMax({paused: 'true'});
    this.tl2 = new TimelineMax({paused: 'true'});
    this.tl3 = new TimelineMax({paused: 'true'});
    this.tl4 = new TimelineMax({paused: 'true'});
    this.isOpen = false;
};

HistoryAnimationItem.prototype = {
    get IsOpen() { return this.isOpen; },
    loadImages: function() {
        console.log("RECALC");
        var self = this;

        self.guitarItem.children[2].src = self.data[self.index].Image;

        self.guitarItem.children[2].addEventListener('load', function (e) {
            self.calculateAnimations();
        }, false);
    },
    calculateAnimations: function() {
        var self = this;

        this.fullHeight = parseInt(window.getComputedStyle(this.guitarItem, null).getPropertyValue('height'));


        // hide extra data
        for (this.i; this.i >= 0; this.i--) {
            this.extraData[this.i].className = 'fullyhidden';
        }

        // calculate small height
        this.smallHeight = parseInt(window.getComputedStyle(this.guitarItem, null).getPropertyValue('height'));// - parseInt(window.getComputedStyle(currentItem, null).getPropertyValue('padding'));

        // hide all
        for (this.j; this.j >= 0; this.j--) {
            this.mainData[this.j].className = 'hidden';
        }

        // hideMainItem
        this.guitarItem.className = 'closedItem';

        // create animations
        this.tl1.to(this.guitarItem, 0.4, {className: 'peekOpenItem'}).to(this.mainData, 0.2, {className: 'show'});
        this.tl2.to(this.guitarItem, 0.4, {height: this.fullHeight}).to(this.extraData, 0, {className: 'block'}).to(this.extraData, 0.2, {className: 'fullshow'});
        this.tl3.to(this.extraData, 0.2, {className: 'hidden'}).to(this.extraData, 0, {className: 'fullyhidden'}).to(this.guitarItem, 0.2, {height: this.smallHeight}).to(this.guitarItem, 0, {className: 'peekOpenItem'}).to(this.mainData, 0.2, {className: 'hidden'}).to(this.guitarItem, 0.5, {className: 'closedItem'});
        this.tl4.to([this.mainData, this.extraData], 0.1, {className: 'hidden'}).to(this.guitarItem, 0.1, {className: 'hidden'}).to(this.extraData, 0, {className: 'fullyhidden'}).to(this.guitarItem,  0, {height: this.smallHeight});

        // custom event
        var event = new CustomEvent(
            "closeItems",
            {
                detail: {
                    source: this.index
                },
                bubbles: true,
                cancelable: true
            }
        );

        // close current item
        document.addEventListener('closeItems', function(e) {
            if(e.detail.source !== self.index) {
                if(self.isOpen) {
                    self.tl4.play(0);
                    self.year.className = '';
                    self.isOpen = false;
                }
            }
        }, false);

        // events
        this.year.addEventListener('mouseenter', function () {
            if (!self.isOpen) {
                self.tl1.play(0);
            }
        });

        this.year.addEventListener('mouseleave', function () {
            if (!self.isOpen) {
                self.tl1.reverse();
            }
        });


        this.year.addEventListener('click', function (e) {
            e.target.className = 'active';
            console.log(self.isOpen);
            self.isOpen = true;
            self.tl2.play(0);
            e.target.dispatchEvent(event);
        });

    },
    closeItem: function() {
        console.log('CLOSE');
        this.isOpen = false;
        this.tl4.play(0);
    },
    reset: function() {
        var i = this.guitarItem.children.length - 1,
            tempItem,
            currentItem;

        this.tl1.invalidate();
        this.tl2.invalidate();
        this.tl3.invalidate();
        this.tl4.invalidate();
        this.tl1.pause(0, true);
        this.tl2.pause(0, true);
        this.tl3.pause(0, true);
        this.tl4.pause(0, true);
        this.tl1.kill();
        this.tl2.kill();
        this.tl3.kill();
        this.tl4.kill();
        this.tl1 = null;
        this.tl2 = null;
        this.tl3 = null;
        this.tl4 = null;
        this.tl1 = new TimelineMax({paused: 'true'});
        this.tl2 = new TimelineMax({paused: 'true'});
        this.tl3 = new TimelineMax({paused: 'true'});
        this.tl4 = new TimelineMax({paused: 'true'});

        this.fullHeight = 0;
        this.smallHeight = 0;

        // remove class + remove events
        this.guitarItem.removeAttribute('class');
        this.guitarItem.removeAttribute('style');
        tempItem = this.guitarItem.cloneNode(true);
        this.guitarItem.parentNode.replaceChild(tempItem, this.guitarItem);
        this.guitarItem = tempItem;

        tempItem = this.year.cloneNode(true);
        this.year.parentNode.replaceChild(tempItem, this.year);
        this.year = tempItem;

        for(i; i >=0; i--) {
            currentItem = this.guitarItem.children[i];
            currentItem.removeAttribute('class');
            currentItem.removeAttribute('style');
            tempItem = currentItem.cloneNode(true);
            currentItem.parentNode.replaceChild(tempItem, currentItem);
        }

        this.mainData = [this.guitarItem.children[0], this.guitarItem.children[1]];
        this.extraData = [this.guitarItem.children[2], this.guitarItem.children[3]];
        this.i = this.mainData.length - 1;
        this.j = this.extraData.length - 1;
        this.isOpen = false;
    }
};