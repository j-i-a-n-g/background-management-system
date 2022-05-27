window.addEventListener('load', function() {
    // 获取用户的基本信息
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success: function(res) {
            if (res.status !== -0) {
                return layui.layer.msg(res.message)
            }
            // 调用函数渲染头像
            renderAcvatar(res.data)
        }

    })
    var layer = layui.layer;
    // 点击按钮，实现退出功能
    $('#btnLogout').on('click', function() {
        // 提示用户是否确认退出
        layer.confirm('是否退出登录', { icon: 3, title: '提示' }, function(index) {
            // 1.清空本地存储中的token
            localStorage.removeItem('token');
            // 2.重新跳转到登录页面
            location.href = '/login.html';
            // 关闭询问框
            layer.close(index);

        })
    })


    function renderAcvatar(user) {
        var name = user.nickname || user.username;

        $('#welcome').html('欢迎&nbsp;&nbsp;' + name);

        // 渲染用户头像
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src', user.user_pic).show();
            $('.text-avatar').hide()
        } else {
            $('.layui-nav-img').hide();
            var firstNum = name[0].toUpperCase();
            $('.text-avatar').html(firstNum).show();
        }
    }
})