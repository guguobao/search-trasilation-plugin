document.addEventListener("DOMContentLoaded", function() {

    injectCustomJs();
    console.log("document监听回车");
    if (location.host == 'www.google.com') {
        console.log("添加input事件");
        document.querySelectorAll('.gLFyf.gsfi')[0].addEventListener('keydown', EnterPress);
    } else if (location.host == 'www.baidu.com') {
        document.getElementById("kw").addEventListener('keydown', EnterPress);
    } else if (location.host == 'www.dogedoge.com') {
        document.getElementById("search_form_input").addEventListener('keydown', EnterPress);
    } else if (location.host == 'cn.bing.com') {
        document.getElementById("sb_form_q").addEventListener('keydown', EnterPress);
    }
});

function EnterPress(e) {
    var e = e || window.event;
    if (e.keyCode == 9) {

        // 给谷歌搜索结果的超链接增加 _target="blank"
        if (location.host == 'www.google.com') {
            var objs = document.querySelectorAll('h3.r a');
            for (var i = 0; i < objs.length; i++) {
                objs[i].setAttribute('_target', 'blank');
            }
            console.log('处理谷歌超链接！');
            let inputVal = document.querySelectorAll('.gLFyf.gsfi')[0].value;
            callbaiduapi(inputVal);
        } else if (location.host == 'www.baidu.com') {
            console.log('已处理baidu超链接！');
            let inputVal = document.getElementById("kw").value;
            callbaiduapi(inputVal);
        } else if (location.host == 'www.dogedoge.com') {
            console.log('已处理dogedoge超链接！');
            let inputVal = document.querySelectorAll('.search__input--adv.js-search-input')[0].value;
            // let inputVal = document.getElementById("search_form_input").value;
            callbaiduapi(inputVal);
        } else if (location.host == 'cn.bing.com') {
            console.log('已处理bing超链接！');
            let inputVal = document.getElementById("sb_form_q").value;
            // let inputVal = document.getElementById("search_form_input").value;
            callbaiduapi(inputVal);
        }
    }
}

function callbaiduapi(inputVal) {
    // console.log(inputVal + typeof(inputVal));
    if (inputVal == '') {
        return;
    }
    var appid = '********';
    var key = '********';
    var salt = (new Date).getTime();
    var query = inputVal;
    // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
    var from = 'zh';
    var to = 'en';
    var str1 = appid + query + salt + key;
    var sign = BAIDUMD5(str1);
    $.ajax({
        url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
        type: 'get',
        dataType: 'jsonp',
        jsonpCallback: "translationHandle2",
        data: {
            q: query,
            appid: appid,
            salt: salt,
            from: from,
            to: to,
            sign: sign
        },
        success: function(data) {
            console.log(data);
        }
    });
}


function callyoudaoapi(inputVal) {
    if (inputVal == '') {
        return;
    }
    var appKey = '*******';
    var key = '************'; //注意：暴露appSecret，有被盗用造成损失的风险
    var salt = (new Date).getTime();
    var curTime = Math.round(new Date().getTime() / 1000);
    var query = inputVal;
    // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
    var from = 'zh-CHS';
    var to = 'en';
    var str1 = appKey + truncate(query) + salt + curTime + key;
    var sign = sha256(str1);
    $.ajax({
        url: 'http://openapi.youdao.com/api',
        type: 'post',
        dataType: 'jsonp',
        //jsonp: "callback",
        jsonpCallback: "translationHandle",
        data: {
            q: query,
            appKey: appKey,
            salt: salt,
            from: from,
            to: to,
            sign: sign,
            signType: "v3",
            curtime: curTime,
        },
        success: function(data) {
            console.log("success");
        },
        error: function(xmlhttp, status) {
            var result = { resultCode: '-1', resultText: "连接异常(" + status + ")", errorCode: status };
            console.log(result);
        }
    });

    function truncate(q) {
        var len = q.length;
        if (len <= 20) return q;
        return q.substring(0, 10) + len + q.substring(len - 10, len);
    };
}

// 向页面注入JS
function injectCustomJs(jsPath) {
    jsPath = jsPath || 'inject.js';
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/inject.js
    temp.src = chrome.extension.getURL(jsPath);
    temp.onload = function() {
        // 放在页面不好看，执行完后移除掉
        this.parentNode.removeChild(this);
    };
    var meta = "<meta http-equiv=\"Content-Security-Policy\" content=\"upgrade-insecure-requests\">";
    $("head").prepend(meta);
    document.body.appendChild(temp);
}
