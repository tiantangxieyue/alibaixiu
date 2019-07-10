//向服务器段发送请求 获取文章分类数据
$.ajax({
    url: '/categories',
    type: 'get',
    success: function(response) {
        var html = template('categoryTpl', { data: response });
        $('#category').html(html);
    }
});
//当管理员选择文件的时候 触发事件
$('#feature').on('change', function() {
    // 获取到管理员选择到的文件 不管用户上传多少个文件，这个文件的信息都存储在files中
    var file = this.files[0];
    // 创建formData对象 实现二进制文件上传
    var formData = new FormData();
    // 将管理员选择到文件追加到 formData对象中
    formData.append('cover', file);
    //实现文章封面图片上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉 $.ajax方法不要处理data属性对应的参数
        processData: false,
        // 告诉 $.ajax方法不要设置参数类型
        contentType: false,
        success: function(response) {
            console.log(response);
            $('#thumbnail').val(response[0].cover);
        }
    })
});
//当添加文章表单提交的时候
$('#addForm').on('submit', function() {
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    //向服务器端发送请求 实现添加文章内容功能
    console.log(formData);
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function() {
            //文章添加成功 跳转到文章列表页面
            location.href = '/admin/posts.html'
        }
    });
    //阻止表单默认交的行为
    return false;
})