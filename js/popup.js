$(function () {
    $("#timestamp").html(new Date().getTime());
    var data = new Date();
    data.setHours(0);
    data.setMinutes(0);
    data.setSeconds(0);
    data.setMilliseconds(0);
    $("#zeroTimestamp").html(data.getTime());

    $("#btn").unbind("click").click(function () {
        chrome.notifications.create(null, {
            type: 'image',
            iconUrl: 'img/icon.png',
            title: '祝福',
            message: '骚年，祝你圣诞快乐！Merry christmas!',
            imageUrl: 'logo.png'
        });
    });
})