$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samepwd: function(value) {
            if (value === $('.layui-form [name="oldPwd"]').val()) {
                return '新密码与原密码不能一致'
            }
        },
        repwd: function(value) {
            if (value !== $('.layui-form [name="newPwd"]').val()) {
                return '两次密码输入不一致'
            }
        }
    })


    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: "/my/updatepwd",
            // data: 'password=' + $('[name="repwd"]').val(),
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message)
                    // 重置表单  在jQuery对象后面添加[0],转换为DOM对象,再清空表单
                $('.layui-form')[0].reset();
                // window.parent.location.href = '/login.html';
                // layer.msg('请重新登录')
            }
        })
    })
})