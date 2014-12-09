/**
 * Created by tomasnagy on 30/11/14.
 */
function animateAllTheThings(data) {
'use strict';

    for(var k = 0; k < data.length; k++) {

        var item = new HistoryAnimationItem(k, data);
        item.calculateAnimations();
        //var imageContainer = document.querySelectorAll('section> img');
        //imageContainer[k].src = data[k].Image;
        //
        //imageContainer[k].addEventListener('load', function (e) {
        //    var year = document.querySelectorAll('.year')[findChildIndex(e.target.parentElement) - 4],
        //        guitarItem = e.target.parentElement,
        //        fullHeight = 0,
        //        smallHeight = 0,
        //        mainData = [guitarItem.children[0], guitarItem.children[1]],
        //        extraData = [guitarItem.children[2], guitarItem.children[3]],
        //        i = extraData.length - 1,
        //        j = mainData.length - 1,
        //        tl = new TimelineLite({paused: 'true'}),
        //        tl2 = new TimelineLite({paused: 'true'}),
        //        tl3 = new TimelineLite({paused: 'true'}),
        //        isOpen = false;
        //
        //
        //    console.log('loaded');
        //    // calc full height
        //    fullHeight = parseInt(window.getComputedStyle(guitarItem, null).getPropertyValue('height'));
        //
        //
        //    // hide extra data
        //    for (i; i >= 0; i--) {
        //        extraData[i].className = 'fullyhidden';
        //    }
        //
        //    // calculate small height
        //    smallHeight = parseInt(window.getComputedStyle(guitarItem, null).getPropertyValue('height'));// - parseInt(window.getComputedStyle(currentItem, null).getPropertyValue('padding'));
        //
        //    // hide all
        //    for (j; j >= 0; j--) {
        //        mainData[j].className = 'hidden';
        //    }
        //
        //    // hideMainItem
        //    guitarItem.className = 'closedItem';
        //
        //    //guitarItem.style.top = parseInt(window.getComputedStyle(year, null).getPropertyValue('top')) * 2 + "px";
        //
        //    tl.to(guitarItem, 0.4, {className: 'peekOpenItem'}).to(mainData, 0.2, {className: 'show'});
        //    tl2.to(guitarItem, 0.5, {height: fullHeight}).to(extraData, 0, {className: 'block'}).to(extraData, 0.5, {className: 'fullshow'});
        //    tl3.to(extraData, 0.5, {className: 'hidden'}).to(extraData, 0, {className: 'fullyhidden'}).to(guitarItem, 0.5, {height: smallHeight}).to(guitarItem, 0, {className: 'peekOpenItem'}).to(mainData, 0.2, {className: 'hidden'}).to(guitarItem, 0.5, {className: 'closedItem'});
        //
        //    year.addEventListener('mouseenter', function () {
        //        console.log(isOpen);
        //        if (!isOpen) {
        //            tl.play(0);
        //        }
        //    });
        //
        //    year.addEventListener('mouseleave', function () {
        //        console.log(isOpen);
        //
        //        if (!isOpen) {
        //            tl.reverse();
        //        } else {
        //            isOpen = false;
        //            tl3.play(0);
        //        }
        //    });
        //
        //
        //    year.addEventListener('click', function (e) {
        //        console.log(isOpen);
        //        tl2.play(0);
        //        isOpen = true;
        //    });
        //}, false);
    }
}

function findChildIndex(node) {
    'use strict';
    var index = 1;                         // nth-child starts with 1 = first child
    // (You could argue that you should throw an exception here if the
    // `node` passed in is not an element [e.g., is a text node etc.]
    // or null.)
    while (node.previousSibling) {
        node = node.previousSibling;
        if (node && node.nodeType === 1) { // 1 = element
            ++index;
        }
    }
    return index;
}
