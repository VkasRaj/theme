
window.onscroll = function () {
    var wScroll = $(window).scrollTop();
    $('.carousel-item').css({
        'background-position' : 'center -' + wScroll/5 + 'px'
    })
}