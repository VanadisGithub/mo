var clock;
$(document).ready(function () {
    var date = new Date();
    clock = $('.clock').FlipClock(date, {
        clockFace: 'TwelveHourClock'
    });
    Carousel.init($(".poster-main"));
});


getUserIP(function (ip) {
    $("#ip2").html(ip);
    $.getJSON("https://api.ipify.org?format=jsonp&callback=?", function (data) {
        $("#ip1").html(data.ip);
    });
    $.ajax({
        type: 'GET',
        url: 'https://www.tianqiapi.com/api/',
        data: 'version=v1',
        dataType: 'JSON',
        success: function (res) {
            $("#weather").html(res.data[0].wea);
            for (var i = 0; i < res.data[0].hours.length; i++) {
                $('#hours').append('<tr>')
                $('#hours').append('<td>' + res.data[0].hours[i].day + ' </td >');
                $('#hours').append('<td>' + res.data[0].hours[i].wea + ' </td >');
                $('#hours').append('</tr>')
            }
        }
    });
});

function getUserIP(onNewIP) {
    //compatibility for firefox and chrome
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
            iceServers: []
        }),
        noop = function () {
        },
        localIPs = {},
        ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g, key;

    function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
    }

    //create a bogus data channel
    pc.createDataChannel("");

    // create offer and set local description
    pc.createOffer().then(function (sdp) {
        sdp.sdp.split('\n').forEach(function (line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });
        pc.setLocalDescription(sdp, noop, noop);
    }).catch(function (reason) {
        // An error occurred, so handle the failure to connect
    });
    pc.onicecandidate = function (ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
}

