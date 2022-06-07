window.addEventListener('load', function() {
    // 定义一个查询的参数对象，将来请求数据的时候
    // 需要将请求参数对象提交到服务器
    var q = {
        pagenum: 1, //页码值，默认请求第一页的数据
        pagesize: 2, //每页显示几条数据
        cate_id: "", // 文章分类的id
        state: "" // 文章的发布状态
    }
    var layer = layui.layer;
    var form = layui.form;
    initTable();
    initcate();
    // 定义美化时间的过滤器
    // template.defaults.imports.dataFormat = function(date) {
    //     const dt = new Data(date);

    //     var y = dt.getFullYear();
    //     var m = dt.getMonth() + 1;
    //     m = m > 9 ? m : "0" + m;
    //     var d = dt.getDate();
    //     d = d > 9 ? d : "0" + d;
    //     var h = dt.getHours();
    //     h = h > 9 ? h : "0" + h;
    //     var min = dt.getMinutes();
    //     min = min > min ? min : "0" + min;
    //     var s = dt.getSeconds();
    //     s = s > 9 ? s : "0" + s;
    //     return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s
    // };


    // 获取文章列表数据的方法
    function initTable() {
        $.ajax({
            method: "GET",
            url: "/my/article/list",
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.massage);
                }
                layer.msg(res.massage);
                var str = template('tpl-table', res);
                $('tbody').html(str);
            }

        })
    }

    function initcate() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // layer.msg(res.message);
                var cateStr = template('rng_win', res);
                $('#cate_id').html(cateStr);
                // 通知layui重新渲染表单区域的UI结构
                form.render();
            }
        })
    }

})