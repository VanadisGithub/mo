$(function () {
    $("#btn").click(function () {
        $.getJSON("data/data.json", function (data) {
            var strHtml = "";
            $.each(data, function (infoIndex, info) {
                strHtml += "姓名：" + info["name"] + "<br>";
                strHtml += "性别：" + info["sex"] + "<br>";
                strHtml += "邮箱：" + info["email"] + "<br>";
                strHtml += "<hr>"
            });
            $("#jsonTip").html(strHtml);
        })
    })
})