/**
 * Created by tomasnagy on 30/11/14.
 */
'use strict';
function animateAllTheThings() {
    var year = document.querySelector('p'),
        guitarItem = document.querySelectorAll('section'),
        tl = new TimelineLite({paused: 'true'}),
        tl2 = new TimelineLite({paused: 'true'});

    tl.to(guitarItem[0], .4, {className:'peekOpenItem'}).to([guitarItem[0].children[0], guitarItem[0].children[1]],.2, { className: 'show'});
    tl2.to(guitarItem[0],.5, {className: 'openItem'}).to([guitarItem[0].children[2], guitarItem[0].children[3]], 0, { className: 'block'}).to([guitarItem[0].children[2], guitarItem[0].children[3]], .5, { className: 'fullshow'});
    year.addEventListener('mouseenter', function() {
        tl.play();
    });


    year.addEventListener('click', function(e) {
        e.currentTarget.className = 'active';
        tl2.play();
    });

}