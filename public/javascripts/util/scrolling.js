/**
 * Created by tomasnagy on 20/12/14.
 */
(function(){
    'use strict';
    var playGuitarButton = document.getElementById('play-guitar'),
        stageContainer = document.getElementById('stage-container'),
        backToTopButton = document.getElementById('back-to-top'),
        header = document.getElementsByTagName('header')[0];

    window.smoothScroll = function(target) {
        var scrollContainer = target,
            targetY = 0,
            scroll;

        do { //find scroll container
            scrollContainer = scrollContainer.parentNode;
            if (!scrollContainer) { return; }
            scrollContainer.scrollTop += 1;
        } while (scrollContainer.scrollTop === 0);

        do { //find the top of target relatively to the container
            if (target === scrollContainer) { break; }
            targetY += target.offsetTop;
        } while (target === target.offsetParent);

        scroll = function(c, a, b, i) {
            i++; if (i > 30) { return ; }
            c.scrollTop = a + (b - a) / 30 * i;
            setTimeout(function(){ scroll(c, a, b, i); }, 20);
        };
        // start scrolling
        scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
    };

    playGuitarButton.addEventListener('click', function() {
       smoothScroll(stageContainer);
    });

    backToTopButton.addEventListener('click', function() {
        smoothScroll(header);
    });
})();