// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
    // 1.2 配置选项
const options = {
    // 纵横比  指定裁剪框的宽高比例
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}
var layer = layui.layer
    // 1.3 创建裁剪区域
$image.cropper(options)

$('#btnChooseImage').on('click', function() {
    $('#file').click();
})

// 实现裁剪区域图片的替换
$('#file').on('change', function(e) {
    // 获取用户选择的文件
    var fileList = e.target.files;
    if (fileList.length === 0) {
        return layer.msg('未选择照片')
    }
    var file = fileList[0];
    // 将文件转换为路径
    var imgURL = URL.createObjectURL(file);
    // 重新初始化裁剪区域
    $image.cropper('destroy').attr('src', imgURL).cropper(options);
    console.log(imgURL);
})

$('#btnUpload').on('click', function() {
    var dataURL = $image.cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        })
        .toDataURL('image/png')

    $.ajax({
        method: 'POST',
        url: '/my/update/avatar',
        data: {
            avatar: dataURL
        },
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg(res.message);
            // $image.cropper('destroy').attr('src', imgURL).cropper(options);
            window.parent.location.reload()
        }

    })
})