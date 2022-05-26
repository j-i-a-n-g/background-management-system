// 每次调用$.get()/$.post()/$.ajax()的时候，都会先调用该函数
// 在发起真正的ajax请求之前，统一拼接请求的根路径
$.ajaxPrefilter(function(option) {
    option.url = 'http://www.liulongbin.top:3007' + option.url
})