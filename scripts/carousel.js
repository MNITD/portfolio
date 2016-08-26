var Carousel = function (id, duration) {
    "use strict";
    var timer, slides, currentId, indicators;//, transDuration;

    slides = document.getElementById(id).getElementsByClassName('slide');
    //transDuration = slides[0].style.transition;
    //console.log(slides[0]);
    //console.log(transDuration);
    currentId = (+document.getElementById(id).getElementsByClassName('slide active')[0].getAttribute('id'));
    indicators = document.getElementById(id).getElementsByClassName('indicator');

    function changeIndicator(active) {
        if (active) {
            indicators[currentId].setAttribute('class', 'indicator active');
        } else {
            indicators[currentId].setAttribute('class', 'indicator');
        }
    }

    function changeId() {
        if (currentId === (slides.length - 1)) {
            currentId = -1;
        }
        currentId = currentId + 1;
    }

    this.moveCarousel = function () {
        timer = window.setInterval(function () {
            slides[currentId].setAttribute('class', 'slide outgoing');
            changeIndicator(false);
            window.setTimeout(function () {
                slides[currentId].setAttribute('class', 'slide');
                changeId();
                slides[currentId].className = 'slide from-right';
                //console.log(slides[currentId].getAttribute('class'));
                changeIndicator(true);
            }, 400);
            window.setTimeout(function () {
                slides[currentId].setAttribute('class', 'slide active');
            }, 415);
        }, duration);
    };
    this.stopCarousel = function () {
        window.clearInterval(timer);
    };
};



window.onload = function () {
    "use strict";
    (new Carousel("clients_carousel", 5000)).moveCarousel();
};