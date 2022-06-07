$(function() {
    let layer = layui.layer;
    let form = layui.form;
    initCate();
    initEditor()
        // 1.获取加载文章的分类列表
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                let htmlStr = template("pub_cate", res);
                $('[name=cate_id]').html(htmlStr);

                form.render();
            }

        })
    }


    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options);

    $('#btnChooseImage').on('click', function() {
        $("#coverfile").click();
    })

    $("#coverfile").on('change', function(e) {
            if (e.length === 0) {
                return
            }
            var file = e.target.files[0];
            var newImgURL = URL.createObjectURL(file);
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', newImgURL) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域
        })
        // 定义文章的状态
    var art_state = '已发布';
    // 为存为草稿按钮添加点击事件
    $('#artSave').on('click', function() {
        art_state = '草稿'
    })

    // 为表单绑定submit提交事件
    $("#form_pub").on('submit', function(e) {
        e.preventDefault();
        // 基于form表单，快速创建一个formData对象
        let fd = new FormData($(this)[0])
        fd.append('state', art_state);
        // fd.state = art_state; //能添加，但是不管用哦
        // 将封面裁剪过后的图片，输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作

                // 将文件对象存储在fd中

                fd.append('cover_img', blob)
                    // 发起ajax数据请求，提交表单
                $.ajax({
                    method: 'POST',
                    url: "/my/article/add",
                    // 注意：如果向服务器提交的是FormData格式的数据，必须添加以下两个配置项
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function(res) {
                        if (res.status === 0) {
                            return layer.msg(res.message);
                        }
                        layer.msg(res.message);
                        location.href = '/article/art_list.html'
                    }
                })

            })
    })
})