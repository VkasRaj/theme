// loading particles
particlesJS.load('particles-js', './assets/particles.json');

// making slider parallax
window.onscroll = function () {
    var wScroll = $(window).scrollTop();
    $('.carousel-item').css({
        'background-position' : 'center -' + wScroll/5 + 'px'
    })
}

// blocking right click on particles
$('#particles-js').on('contextmenu', function (e) {
    e.preventDefault();
})

// scroll on arrow click
$('.scroll-to-down').click(function () {
    $('html,body').animate({
        scrollTop : $('.greetings-wrapper').offset().top - 150
    }, 1000)
})

// scroll to destination when nav link is click
$('.nav-link').click(function () {
    var t = $(this);
    $('.nav-item').removeClass('active');
    $('.nav-item').eq($('.nav-link').index(t)).addClass('active');
    // history.pushState({}, "page"+($('.nav-link').index($(this))+1), (t).slice(1)); // changing url based on content; == giving error on reload
    $('html,body').animate({
        scrollTop : $($(t).attr('data-target')).offset().top - 100
    }, 1200)
})