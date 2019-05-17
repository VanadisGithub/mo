/**
 * 显示一个时间 notification
 */
function show() {
    alert(1);
    var time = new Date().format('yyyy-MM-dd hh:mm:ss');
    // 创建一个notification
    var notification = window.webkitNotifications.createNotification(
        '48.png',    // 图片，在web_accessible_resources 中添加了
        '现在的时间是：',    // title
        time    // body.
    );
    // 显示notification
    notification.show();
}

// 格式化时间函数
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "h+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

// 测试浏览器是否支持 webkitNotifications
if (window.Notification) {
    // 获得权限
    Notification.requestPermission();
    // 点击按钮
    document.querySelector('#button').addEventListener('click', function () {
        new Notification("Hi，帅哥：", {
            body: '可以加你为好友吗？',
            icon: 'https://avatars6.githubusercontent.com/u/496048?v=4&s=460'
        });
    });
} else {
    document.getElementById('result').innerHTML = '浏览器不支持Web Notification';
}
