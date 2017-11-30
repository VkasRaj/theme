window.onscroll = function () {
    var wScroll = $(window).scrollTop();
    $('.carousel-item').css({
        'background-position' : 'center -' + wScroll/5 + 'px'
    })
}

particlesJS.load('particles-js', './assets/particles.json', function() {
    console.log('callback - particles.js config loaded');
});
