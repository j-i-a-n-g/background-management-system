window.addEventListener('load', function() {

    initArtcateList();
    // 获取文章分类的列表
    var layer = layui.layer;
    var form = layui.form;

    function initArtcateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr);
            }
        })
    }
    var indexOpen = null;
    $('#btnAddCate').on('click', function() {
            indexOpen = layer.open({
                content: $('#dialog-add').html(),
                type: "1",
                title: "添加文章分类",
                area: ['500px', '250px']
            })
        })
        // 通过代理的方式为form绑定submit绑定事件
    var indexEdit = null;
    $('body').on('submit', '#form-add', function(e) {
            e.preventDefault();
            $.ajax({
                method: "POST",
                url: '/my/article/addcates',
                data: $('#form-add').serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.massage)
                    }
                    initArtcateList();
                    layer.msg(res.massage);
                    layer.close(indexOpen)
                }
            })
        })
        // 通过代理的形式，为按钮绑定点击事件
    $('tbody').on('click', '.btn-edit', function() {
            indexEdit = layer.open({
                content: $('#dialog-edit').html(),
                type: "1",
                title: "修改文章内容",
                area: ['500px', '250px']
            })

            var btn_editId = $(this).attr("data-id");
            $.ajax({
                method: "GET",
                url: '/my/article/cates/' + btn_editId,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg(res.message);
                    form.val('form_edit', res.data)
                    console.log(res);
                }
            })
        })
        // 通过代理的形式，为修改分类的表单绑定submit事件
    $('body').on('submit', '#form_edit', function(e) {
            e.preventDefault();
            $.ajax({
                method: "POST",
                url: '/my/article/updatecate',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.close(indexEdit);
                    layer.msg(res.message)
                    initArtcateList();
                }
            })
        })
        // 删除指定文章
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id');
        layer.confirm('是否确定要删除该内容', { icon: 3, title: '提示' }, function(index) {
            $.get('/my/article/deletecate/' + id, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.massage)
                }
                layer.msg(res.massage);
                initArtcateList();
            })

            layer.close(index);
        })
    })
})