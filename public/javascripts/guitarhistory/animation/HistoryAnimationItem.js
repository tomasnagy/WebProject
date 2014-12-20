/**
 * Created by tomasnagy on 09/12/14.
 */
var HistoryAnimationItem = function(index, data) {
    'use strict';
    this.index = index;
    this.data = data;
    this.year = document.querySelectorAll('inlay')[this.index];
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
    this.tl4 = new TimelineLite({paused: 'true'});
    this.tl5 = new TimelineLite({paused: 'true'});
    this.isOpen = false;
};

HistoryAnimationItem.prototype = {
    get IsOpen() { return this.isOpen; },
    loadImages: function() {
        var self = this;

        self.guitarItem.children[2].src = self.data[self.index].Image;

        self.guitarItem.children[2].addEventListener('load', function (e) {
            self.calculateAnimations();
        }, false);
    },
    calculateAnimations: function() {
        var self = this,
            closeItemsEvent = new CustomEvent(
                "closeItems",
                {
                    detail: {
                        source: this.index
                    },
                    bubbles: true,
                    cancelable: true
                }
            ),
            fadeOutItemsEvent = new CustomEvent(
                "fadeOutItems",
                {
                    detail: {
                        source: this.index
                    },
                    bubbles: true,
                    cancelable: true
                }
            ),
            fadeInItemsEvent = new CustomEvent(
                "fadeInItems",
                {
                    detail: {
                        source: this.index
                    },
                    bubbles: true,
                    cancelable: true
                }
            );



        this.fullHeight = parseInt(window.getComputedStyle(this.guitarItem, null).getPropertyValue('height'));
        console.log("FULLHEIGHT: " + this.fullHeight);

        // hide extra data
        for (this.i; this.i >= 0; this.i--) {
            this.extraData[this.i].className = 'fullyhidden';
        }

        // calculate small height
        this.smallHeight = parseInt(window.getComputedStyle(this.guitarItem, null).getPropertyValue('height'));// - parseInt(window.getComputedStyle(currentItem, null).getPropertyValue('padding'));

        // set top -> get top from correlating year
        this.guitarItem.style.top = this.year.offsetTop - (this.smallHeight / 4) + 'px';

        // hide all
        for (this.j; this.j >= 0; this.j--) {
            this.mainData[this.j].className = 'hidden';
        }

        // hideMainItem
        this.guitarItem.className = 'closedItem';

        // create animations
        this.tl1
            .to(this.guitarItem, 0.4, {className: 'peekOpenItem'})
            .to(this.mainData, 0.2, {className: 'show'});

        this.tl2
            .to(this.guitarItem, 0.4, {height: this.fullHeight})
            .to(this.extraData, 0, {className: 'block'})
            .to(this.extraData, 0.2, {className: 'fullshow'});

        this.tl3
            .to(this.extraData, 0.2, {className: 'hidden'})
            .to(this.extraData, 0, {className: 'fullyhidden'})
            .to(this.guitarItem, 0.2, {height: this.smallHeight})
            .to(this.guitarItem, 0, {className: 'peekOpenItem'})
            .to(this.mainData, 0.2, {className: 'hidden'})
            .to(this.guitarItem, 0.5, {className: 'closedItem'});

        this.tl4
            .to([this.mainData, this.extraData], 0.1, {className: 'hidden'})
            .to(this.guitarItem, 0.1, {className: 'hidden'})
            .to(this.extraData, 0, {className: 'fullyhidden'})
            .to(this.guitarItem,  0, {height: this.smallHeight});

        this.tl5.to(this.guitarItem, 0.4, {className: '+=opaqueItem'});

        // close current item
        document.addEventListener('closeItems', function(e) {
            if(e.detail.source !== self.index) {
                if(self.isOpen) {
                    self.tl4.play(0);
                    if(self.year.children[0].classList) {
                        self.year.children[0].classList.remove('active');
                    } else {
                        self.year.children[0].className = self.year.children[0].className.replace(new RegExp('(^|\\b)' + 'active'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');

                    }
                    self.isOpen = false;
                }
            }
        }, false);

        // fadeout current item
        document.addEventListener('fadeOutItems', function(e) {
            if(e.detail.source !== self.index && self.isOpen === true) {
                self.tl5.play(0);
            }
        }, false);

        // fadein current item
        document.addEventListener('fadeInItems', function(e) {
            if(e.detail.source !== self.index && self.isOpen === true) {
                self.tl5.reverse();
            }
        }, false);

        // events
        this.year.addEventListener('mouseenter', function (e) {
            if (!self.isOpen) {
                self.tl1.play(0);
                e.target.dispatchEvent(fadeOutItemsEvent);
            }
        });

        this.year.addEventListener('mouseleave', function (e) {
            if (!self.isOpen) {
                self.tl1.reverse();
                e.target.dispatchEvent(fadeInItemsEvent);
            }
        });


        this.year.addEventListener('click', function (e) {
            if(e.target.classList) {
                e.target.classList.add('active');
            }
            else {
                e.target.className += ' ' + 'active';
            }

            console.log(self.isOpen);
            self.isOpen = true;
            self.tl2.play(0);
            e.target.dispatchEvent(closeItemsEvent);
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
        this.tl5.invalidate();
        this.tl1.pause(0, true);
        this.tl2.pause(0, true);
        this.tl3.pause(0, true);
        this.tl4.pause(0, true);
        this.tl5.pause(0, true);
        this.tl1.kill();
        this.tl2.kill();
        this.tl3.kill();
        this.tl4.kill();
        this.tl5.kill();
        this.tl1 = null;
        this.tl2 = null;
        this.tl3 = null;
        this.tl4 = null;
        this.tl5 = null;
        this.tl1 = new TimelineLite({paused: 'true'});
        this.tl2 = new TimelineLite({paused: 'true'});
        this.tl3 = new TimelineLite({paused: 'true'});
        this.tl4 = new TimelineLite({paused: 'true'});
        this.tl5 = new TimelineLite({paused: 'true'});

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
        if (this.year.children[0].classList) {
            this.year.children[0].classList.remove('active');
        }
        else {
            this.year.children[0].className = this.year.children[0].className.replace(new RegExp('(^|\\b)' + 'active'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }

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
        this.year.className = '';
    }
};