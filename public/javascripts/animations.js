/**
 * Created by tomasnagy on 30/11/14.
 */
function animateAllTheThings(data) {
'use strict';
    var items = [],
        i = data.length - 1,
        resizeStarted = false;

    // create all items
    for(i; i >= 0; i--) {
        var item = new HistoryAnimationItem(i, data);
        item.loadImages();
        items.push(item);
    }

    // resize stop
    function stoppedResizing() {
        var j = items.length - 1;
        for(j; j >= 0; j--) {
            // recalculate animations
            items[j].reset();
            console.log('RESET');
            items[j].calculateAnimations();
        }

        resizeStarted = false;
    }

    window.addEventListener('resize', function() {

        if(!resizeStarted) {
            var j = items.length - 1;
            for (j; j >= 0; j--) {
                var item = items[j];

                // close all open items
                if (item.IsOpen) {
                    items[j].closeItem();
                }
            }
            resizeStarted = true;
        }
    });

    window.resizeStop.bind(stoppedResizing);
    window.resizeStop.setThreshold(200);
}
