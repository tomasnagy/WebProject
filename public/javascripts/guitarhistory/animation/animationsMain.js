/**
 * Created by tomasnagy on 30/11/14.
 */
function startAnimations(data) {
'use strict';
    var items = [],
        i = data.length - 1,
        resizeStarted = false,
        backgroundImage = document.querySelector('#data-container > img'),
        stageContainer = document.getElementById('stage-container'),
        event = new CustomEvent(
            "closeItems",
            {
                detail: {
                    source: undefined
                },
                bubbles: true,
                cancelable: true
            }
        );

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

    // close all open sections on click
    backgroundImage.addEventListener('click', function(e) {
        if(e.target === this) {
            e.target.dispatchEvent(event);
        }
    });

    stageContainer.addEventListener('click', function(e) {
        e.target.dispatchEvent(event);
    });

    window.resizeStop.bind(stoppedResizing);
    window.resizeStop.setThreshold(200);
}
