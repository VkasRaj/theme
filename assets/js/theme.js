// loading particles
particlesJS.load('particles-js', './assets/particles.json');

// carousel settings
$('.carousel').carousel({
    interval: 3000,
    pause: false
})

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

// page params ===========================
var pp = page_params;
var is_preview=(pp.APP=="KLICKINVITE")?true:false;
console.log(pp);

// carousel section ================
var sliderPics = pp.t1_slider_pics;
if (sliderPics.length) {
    var carouselItem = '';
    sliderPics.forEach(function (pic) {
        carouselItem += '<div class="carousel-item h-100 active" style="background-image: url('+pic+');"></div>'
    });
    $('.carousel-inner').html(carouselItem);
} else {
    // when no slider pics is present;
}

// headings section ================
$('#hpHeading1').text(pp.t1_home_page_heading_1);
$('#hpHeading2').text(pp.t1_home_page_heading_2);
$('#hpHeading3').text(pp.t1_home_page_heading_3);

var pd=null;
for(var i = 0; i < pp.events.length; i++){
    var tp = pp.events[i];
    if(tp.is_primary==1) { pd = tp; }
}
var dp1,dp2,dp3,dp2a;
dp1=moment(pd.starts).format('MMMM D');
dp2a=moment(pd.starts).format('D');
dp2=moment(pd.starts).format('Do').substr(dp2a.length);
dp3=moment(pd.starts).format('YYYY');

$('#custom-text').text(pp.t1_date_text_custom);
$('#custom-date').html(dp1+'<sup>'+dp2+'</sup>, '+dp3);

// greeting message ================
$('#greeting-msg-title').text(pp.greeting_msg.title);
$('#greeting-msg-text').text(pp.greeting_msg.msg_format);
$('#invite-date').text(moment(pd.starts).format('MMMM Do YYYY'));

function start_countdown(a,b,c,d) {
    if(b=="0000-00-00 00:00:00") { //end datetime not available
        b=moment(a).add(4,'h'); //let end-time = start+4hours
    }
    // variables for time units
    var days, hours, minutes, seconds;
    // update the tag with id "countdown" every 1 second
    setInterval(function () {
        // find the amount of "seconds" between now and target
        // console.log(moment(a).format('Do-MMMM-YYYY'));
        // var current_date = new Date().getTime();
        var seconds_left = (moment(a).valueOf() - moment().valueOf()) / 1000;
        var count = '';
        if(moment(a).valueOf()<moment().valueOf()||moment().valueOf() - moment(b).valueOf()) {
            if(seconds_left<0) {
                $('#invite-date-heading').text(d);
                seconds_left=seconds_left*-1;
            } else {
                $('#invite-date-heading').text(c);
            }

            // do some time calculations
            days = parseInt(seconds_left / 86400);
            seconds_left = seconds_left % 86400;

            hours = parseInt(seconds_left / 3600);
            seconds_left = seconds_left % 3600;

            minutes = parseInt(seconds_left / 60);
            seconds = parseInt(seconds_left % 60);

            // format countdown string + set tag value

            count = '<div class="col-6 col-sm-3 text-center">'+
                            '<p class="h1 text-dark caveat">'+days+'</p>'+
                            '<p class="raleway h5 text-muted">Days</p>'+
                        '</div>'+
                        '<div class="col-6 col-sm-3 text-center">'+
                            '<p class="h1 text-dark caveat">'+hours+'</p>'+
                            '<p class="raleway h5 text-muted">Hours</p>'+
                        '</div>'+
                        '<div class="col-6 col-sm-3 text-center">'+
                            '<p class="h1 text-dark caveat">'+minutes+'</p>'+
                            '<p class="raleway h5 text-muted">Minutes</p>'+
                        '</div>'+
                        '<div class="col-6 col-sm-3 text-center">'+
                            '<p class="h1 text-dark caveat">'+seconds+'</p>'+
                            '<p class="raleway h5 text-muted">Second</p>'+
                        '</div>';
            $('#countdown').html(count);

        } else {
            $('#invite-date-heading').text('Event Started Since');
            seconds_passed=moment().valueOf-moment(a).valueOf();

            days = parseInt(seconds_passed / 86400);
            seconds_passed = seconds_passed % 86400;

            hours = parseInt(seconds_passed / 3600);
            seconds_passed = seconds_passed % 3600;

            minutes = parseInt(seconds_passed / 60);
            seconds = parseInt(seconds_passed % 60);

            // format countdown string + set tag value
            count = '<div class="col-6 col-sm-3 text-center">'+
                            '<p class="h1 text-dark caveat">'+days+'</p>'+
                            '<p class="raleway h5 text-muted">Days</p>'+
                        '</div>'+
                        '<div class="col-6 col-sm-3 text-center">'+
                            '<p class="h1 text-dark caveat">'+hours+'</p>'+
                            '<p class="raleway h5 text-muted">Hours</p>'+
                        '</div>'+
                        '<div class="col-6 col-sm-3 text-center">'+
                            '<p class="h1 text-dark caveat">'+minutes+'</p>'+
                            '<p class="raleway h5 text-muted">Minutes</p>'+
                        '</div>'+
                        '<div class="col-6 col-sm-3 text-center">'+
                            '<p class="h1 text-dark caveat">'+seconds+'</p>'+
                            '<p class="raleway h5 text-muted">Second</p>'+
                        '</div>';

            $('#countdown').html(count);
        }
    }, 1000);
}
start_countdown(pd.starts,pd.ends,pp.t1_countdown_text_1,pp.t1_countdown_text_2);

// venue ===========================
if(pd.is_visible) {
    $('#event-venue').html('<i class="fa fa-map-marker"></i> '+pd.venue_add);
} else {
    $('#venue-wrapper').hide();
}
var i_pm_time=moment(pd.starts).format('h:mm a');

    var startDate = moment(pd.starts).format('DD-MM-YYYY');
    var endDate = moment(pd.ends).format('DD-MM-YYYY');
    if(pd.ends=="0000-00-00 00:00:00")
        i_pm_time=i_pm_time+' onwards';
    else if(startDate == endDate) {
        i_pm_time=i_pm_time+' - '+moment(pd.ends).format('h:mm a');
    } else {
        i_pm_time=i_pm_time;
    }
$('#event-time-onwards').text(i_pm_time);

// events ==============================
var events = pp.events;
var eventCard = '';
if (events.length) {
    events.forEach(function (event, $i) {
        var mapBtn = '', rsvpBtn = '', atcBtn = '', dcBtn = '', d_venue_add = '';
        if (event.venue_map) { // Venue Map
            mapBtn = '<a class="btn btn-light text-primary" href="'+event.venue_map+'" target="_blank"><i class="fa fa-map-marker fa-lg"></i></a>';
        }
        if (pp.ask_rsvp) {
            if (event.rsvp) {
                rsvpBtn = '<button class="btn btn-light text-primary"><i class="fa fa-users fa-lg"></i></button>';
            }
        }
        if (pp.add_to_calendar) {
            atcBtn = '<button class="btn btn-light text-primary"><i class="fa fa-calendar fa-lg"></i></button>';
        }
        if (pp.ask_driver_coupon) {
            if (event.driver_coupons) {
                dcBtn = '<button class="btn btn-light text-primary"><i class="fa fa-cab fa-lg"></i></button>';
            }
        }

        var d_event_date = '<i class="fa fa-calendar"></i> ' + moment(event.starts).format('dddd - D MMM YYYY');
        var d_event_time = moment(event.starts).format('h:mm a');
        var end_icon = '<i class="fa fa-clock-o"></i> ';
        var to_text = '';
        var e_ends = '';
        if(event.ends == "0000-00-00 00:00:00") {
            d_event_time = end_icon + d_event_time+' onwards';
            e_ends = moment(event.starts).add(4, 'hours')._i;//add-4-hours by default for adding to calendar
        } else {
            var st_date = moment(event.starts).format('D MMM YYYY');
            var ed_date = moment(event.ends).format('D MMM YYYY');
            if (st_date == ed_date) {
                d_event_time = end_icon + d_event_time+' - '+moment(event.ends).format('h:mm a');
            } else {
                end_icon = '<i class="fa fa-hourglass-end"></i> ';
                d_event_date = '<i class="fa fa-calendar"></i> ' + moment(event.starts).format('dddd - D MMM YYYY') +' - '+d_event_time;
                d_event_time = end_icon + moment(event.ends).format('dddd - D MMM YYYY') +' - '+ moment(event.ends).format('h:mm a');
                to_text = '<li class="py-1 text-center"><b>to</b></li>';
            }
        }

        if (event.venue_add) {
            d_venue_add = '<li class="py-1"><i class="fa fa-map-marker"></i> '+event.venue_add+'<li>'
        }

        var even = $i % 2 == 0 ? true : false; // for alternate event card layout;
        if (even) {
            eventCard += '<div class="col-12 col-md-10 col-lg-9 event-card my-md-3 mx-auto text-dark">'+
                            '<div class="card mb-3 mb-md-0 shadow-3 border-0 text-center bg-white rounded">'+
                                '<div class="row">'+
                                    '<div class="col-12 col-md-6 pr-md-0">'+
                                        '<img class="w-100 h-100 rounded-left" src="'+event.img+'" alt="Card image cap">'+ // 535x285
                                    '</div>'+
                                    '<div class="col-12 col-md-6 position-relative py-4">'+
                                        '<div class="pb-4 px-3">'+
                                            '<p class="caveat h2">'+event.name+'</p>'+
                                            '<div class="raleway">'+
                                                '<ul class="no-bullets">'+
                                                    '<li class="py-1">'+d_event_date+'</li>'+
                                                    to_text+
                                                    '<li class="py-1">'+d_event_time+'</li>'+
                                                    d_venue_add+
                                                '</ul>'+
                                            '</div>'+
                                            '<div class="position-absolute event-action-group w-100">'+
                                                mapBtn+
                                                rsvpBtn+
                                                atcBtn+
                                                dcBtn+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
        } else {
            eventCard += '<div class="col-12 col-md-10 col-lg-9 event-card my-md-3 mx-auto">'+
                            '<div class="mb-3 mb-md-0 shadow-3 border-0 text-center bg-white rounded">'+
                                '<div class="row">'+
                                    '<div class="col-12 col-md-6 position-relative py-4 order-2 order-md-1">'+
                                        '<div class="pb-4 px-3">'+
                                            '<p class="caveat h2">'+event.name+'</p>'+
                                            '<div class="raleway">'+
                                                '<ul class="no-bullets">'+
                                                    '<li class="py-1">'+d_event_date+'</li>'+
                                                    to_text+
                                                    '<li class="py-1">'+d_event_time+'</li>'+
                                                '</ul>'+
                                            '</div>'+
                                            '<div class="position-absolute event-action-group w-100">'+
                                                mapBtn+
                                                rsvpBtn+
                                                atcBtn+
                                                dcBtn+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="col-12 col-md-6 pl-md-0 order-md-2">'+
                                        '<img class="w-100 h-100 rounded-right" src="'+event.img+'" alt="Card image cap">'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
        }
    });
    $('#all-events').html(eventCard);
} else {
    $('#all-events').html('<h1 class="caveat text-center">Ooops !! There is no event added...</h2>');
}