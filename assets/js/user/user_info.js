$(function() {
    var form = layui.form;

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "昵称长度必须在1~6个字符之间"
            }
        }
    })
    intiUserInfo();

    $('#btnReset').on('click', function(e) {
        // 阻止重置按钮的默认重置行为
        e.preventDefault();

        intiUserInfo();
    })

    // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                // 调用父页面中的方法,重新渲染用户的头像和用户的信息;
                // window.parent.getUserInfo();  //不知道为啥,实现不了
                window.parent.location.reload();
            }
        })
    })

    var layer = layui.layer;

    function intiUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 调用form.val()给表单自动赋值
                form.val("formUserInfo", res.data)
            }
        })
    }

})