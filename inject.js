function translationHandle(data) {

    if (location.host == 'www.google.com') {

        console.log("替换google的value");
        document.querySelectorAll('.gLFyf.gsfi')[0].value = data.translation;

    } else if (location.host == 'www.baidu.com') {
        console.log("替换baidu的value");
        document.getElementById("kw").value = data.translation;
    } else if (location.host == 'www.dogedoge.com') {
        console.log("替换dogedoge的value");
        document.getElementById("search_form_input").value = data.translation;
    }

}

function translationHandle2(data) {

    if (location.host == 'www.google.com') {

        console.log("替换google的value");
        document.querySelectorAll('.gLFyf.gsfi')[0].value = data.trans_result[0].dst;

    } else if (location.host == 'www.baidu.com') {
        console.log("替换baidu的value");
        document.getElementById("kw").value = data.trans_result[0].dst;
    } else if (location.host == 'www.dogedoge.com') {
        console.log("替换dogedoge的value");
        document.getElementById("search_form_input").value = data.trans_result[0].dst;
    } else if (location.host == 'cn.bing.com') {
        console.log("替换bing的value");
        document.getElementById("sb_form_q").value = data.trans_result[0].dst;
    }

}
