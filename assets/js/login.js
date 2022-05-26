window.addEventListener('load', function() {

    let loginBox = document.querySelector('.login-box');
    let regBox = document.querySelector('.reg-box');
    let linkLogin = document.querySelector('#link-login');
    let linkReg = document.querySelector('#link-reg');
    linkReg.addEventListener('click', function() {
        loginBox.style.display = 'none';
        regBox.style.display = 'block';
    });
    linkLogin.addEventListener('click', function() {
            regBox.style.display = 'none';
            loginBox.style.display = 'block';
        })
        // 从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function(value) {
            let pwd = $('.reg-box [name = "password"]').val();
            if (pwd !== value) {
                return '两次密码不一致！'
            }

        }
    })


    // 监听注册表单的提交事件
    let formReg = document.querySelector('#form-reg');
    formReg.addEventListener('submit', function(e) {
        e.preventDefault();
        // $.post('/api/reguser', { username: $('#form-reg [name="username"]').val(), password: $('#form-reg [name="repassword"]').val() }, function(res) {
        //     if (res.status !== 0) {
        //         return alert(res.message);
        //     }
        //     console.log(res.message);
        // })

        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/reguser');
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(`username=${$('#form-reg [name=username]').val()}&password=${$('#form-reg [name=repassword]').val()}`)
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                if (JSON.parse(xhr.responseText).status !== 0) {
                    return layer.msg(JSON.parse(xhr.responseText).message);

                }
                layer.msg(JSON.parse(xhr.responseText).message);
                // 模拟人的点击行为
                linkLogin.click();
            }

        }



    });

    // 登录操作
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: "/api/login",
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);

                // 登录成功后将得到的token字符串保存到本地locationStorage中;
                localStorage.setItem('token', res.token);

                // 跳转页面
                location.href = '/index.html';
            }
        })
    })
})