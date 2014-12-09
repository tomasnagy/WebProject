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
    this.tl1 = new TimelineLite({paused: 'true'});
    this.tl2 = new TimelineLite({paused: 'true'});
    this.tl3 = new TimelineLite({paused: 'true'});
    this.isOpen = false;
};

HistoryAnimationItem.prototype = {
    calculateAnimations: function() {
        var self = this;

        self.guitarItem.children[2].src = self.data[self.index].Image;

        self.guitarItem.children[2].addEventListener('load', function (e) {

            // calc full height
            self.fullHeight = parseInt(window.getComputedStyle(self.guitarItem, null).getPropertyValue('height'));


            // hide extra data
            for (self.i; self.i >= 0; self.i--) {
                self.extraData[self.i].className = 'fullyhidden';
            }

            // calculate small height
            self.smallHeight = parseInt(window.getComputedStyle(self.guitarItem, null).getPropertyValue('height'));// - parseInt(window.getComputedStyle(currentItem, null).getPropertyValue('padding'));

            // hide all
            for (self.j; self.j >= 0; self.j--) {
                self.mainData[self.j].className = 'hidden';
            }

            // hideMainItem
            self.guitarItem.className = 'closedItem';

            // create animations
            self.tl1.to(self.guitarItem, 0.4, {className: 'peekOpenItem'}).to(self.mainData, 0.2, {className: 'show'});
            self.tl2.to(self.guitarItem, 0.5, {height: self.fullHeight}).to(self.extraData, 0, {className: 'block'}).to(self.extraData, 0.5, {className: 'fullshow'});
            self.tl3.to(self.extraData, 0.5, {className: 'hidden'}).to(self.extraData, 0, {className: 'fullyhidden'}).to(self.guitarItem, 0.5, {height: self.smallHeight}).to(self.guitarItem, 0, {className: 'peekOpenItem'}).to(self.mainData, 0.2, {className: 'hidden'}).to(self.guitarItem, 0.5, {className: 'closedItem'});

            // custom event
            var event = new CustomEvent(
                "closeItems",
                {
                    detail: {
                        source: self.index
                    },
                    bubbles: true,
                    cancelable: true
                }
            );

            // close current item
            document.addEventListener('closeItems', function(e) {
                if(e.detail.source !== self.index) {
                    if(self.isOpen) {
                        self.tl3.play(0);
                        self.isOpen = false;
                    }
                }
            }, false);

            // events
            self.year.addEventListener('mouseenter', function () {
                if (!self.isOpen) {
                    self.tl1.play(0);
                }
            });

            self.year.addEventListener('mouseleave', function () {
                if (!self.isOpen) {
                    self.tl1.reverse();
                }
            });


            self.year.addEventListener('click', function (e) {
                console.log(self.isOpen);
                self.isOpen = true;
                self.tl2.play(0);
                e.target.dispatchEvent(event);
            });

        }, false);
    }
};