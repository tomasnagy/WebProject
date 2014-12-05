/**
 * Created by tomasnagy on 30/11/14.
 */
'use strict';
function animateAllTheThings(data) {

    for(var k = 0; k < data.length; k++) {


        var year = document.querySelector('p'),
            guitarItem = document.querySelectorAll('section'),
            tl = new TimelineLite({paused: 'true'}),
            tl2 = new TimelineLite({paused: 'true'}),
            tl3 = new TimelineLite({paused: 'true'}),
            isOpen = false,
            currentItem = guitarItem[0],
            fullHeight = 0,
            smallHeight = 0,
            mainData = [guitarItem[0].children[0], guitarItem[0].children[1]],
            extraData = [guitarItem[0].children[2], guitarItem[0].children[3]],
            imageContainer = currentItem.children[2],
            i = extraData.length - 1,
            j = mainData.length - 1;

        imageContainer.src = data[k].Image;

        imageContainer.addEventListener('load', function () {

            console.log('loaded');
            // calc full height
            fullHeight = parseInt(window.getComputedStyle(currentItem, null).getPropertyValue('height'))

            // hide extra data
            for (i; i >= 0; i--) {
                extraData[i].className = 'fullyhidden';
            }

            // calculate small height
            smallHeight = parseInt(window.getComputedStyle(currentItem, null).getPropertyValue('height'));// - parseInt(window.getComputedStyle(currentItem, null).getPropertyValue('padding'));
            console.log(window.getComputedStyle(currentItem, null).getPropertyValue('padding'));

            // hide all
            for (j; j >= 0; j--) {
                mainData[j].className = 'hidden';
            }

            // hideMainItem
            currentItem.className = 'closedItem';


            tl.to(currentItem, .4, {className: 'peekOpenItem'}).to(mainData, .2, {className: 'show'});
            tl2.to(currentItem, .5, {height: fullHeight}).to(extraData, 0, {className: 'block'}).to(extraData, .5, {className: 'fullshow'});
            tl3.to(extraData, .5, {className: 'hidden'}).to(extraData, 0, {className: 'fullyhidden'}).to(currentItem, .5, {height: smallHeight}).to(currentItem, 0, {className: 'peekOpenItem'});

            year.addEventListener('mouseenter', function () {
                if (!isOpen) {
                    tl.play(0);
                }
            });

            year.addEventListener('mouseleave', function () {
                if (!isOpen) {
                    tl.reverse();
                } else {
                    tl3.play();
                    isOpen = false;
                }
            });


            year.addEventListener('click', function (e) {
                e.currentTarget.className = 'active';
                tl2.play(0);
                isOpen = true;
            });
        }, false);
    }

}