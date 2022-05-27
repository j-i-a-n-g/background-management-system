// 每次调用$.get()/$.post()/$.ajax()的时候，都会先调用该函数
// 在发起真正的ajax请求之前，统一拼接请求的根路径
$.ajaxPrefilter(function(option) {
    option.url = 'http://www.liulongbin.top:3007' + option.url

    // 统一为有权限的接口，设置headers请求头
    if (option.url.indexOf("/my/") !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    };

    option.complete = function(res) {
        if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
            // 清空token;
            localStorage.removeItem('token');

            // 页面跳转到登录页面
            location.href = '/login.html';
        }
    }
})