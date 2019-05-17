$(function () {
    $("#timestamp").html(new Date().getTime());
    var data = new Date();
    data.setHours(0);
    data.setMinutes(0);
    data.setSeconds(0);
    data.setMilliseconds(0);
    $("#zeroTimestamp").html(data.getTime());
})