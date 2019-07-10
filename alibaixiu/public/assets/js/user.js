// 当表单发生提交行为的时候
$('#userForm').on('submit', function() {
    // 获取到用户在表单中输入的内容并将内容格式化成参数字符串
    var formData = $(this).serialize();
    // 向服务器端发送添加用户的请求
    console.log(formData);

    $.ajax({
            type: 'post',
            url: '/users',
            data: formData,
            success: function() {
                // 刷新页面
                location.reload();
            },
            error: function() {
                alert('用户添加失败')
            }
        })
        // 阻止表单的默认提交行为
    return false;
});

//当用户选择文件的时候
$('#avatar').on('change', function() {
        // this.files[0]
        var formData = new FormData();
        formData.append('avatar', this.files[0]);
        $.ajax({
            type: 'post',
            url: '/upload',
            data: formData,
            //告诉 $.ajax 方法不要解析请求参数
            processData: false,
            //告诉 $.ajax 方法不要设置请求参数的类型
            contentType: false,
            success: function(response) {
                //实现头像预览功能
                $('#preview').attr('src', response[0].avatar);
                $('#hiddenAvatar').val(response[0].avatar)
            }
        })
    })
    //向服务器端发送请求 索要用户列表数据
$.ajax({
    type: 'get',
    url: '/users',
    success: function(response) {
        // 使用模板引擎将数据和 HTML 字符串进行拼接
        var html = template('userTpl', { data: response });
        //将拼接好的字符串显示在页面中，找到需要显示内容的这个容器，吧内容添加到这个容器中即可
        $('#userBox').html(html);

    }
});
// 通过事件委托的方式为编辑按钮添加事件
$('#userBox').on('click', '.edit', function() {
    //获取被点击用户的id值
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(response) {
            var html = template('modifyTpl', response);
            $('#modifyBox').html(html);
        }
    })
});
// 为表单修改添加表单提交事件
$('#modifyBox').on('submit', '#modifyForm', function() {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    // 获取要修改的那个用户的id值
    var id = $(this).attr('data-id');
    // 发送请求 修改用户信息
    $.ajax({
            type: 'put',
            //告诉服务器，我们需要修改哪一个用户
            url: '/users/' + id,
            data: formData,
            success: function(response) {
                // 修改用户信息成功 重新加载页面
                location.reload()
            }
        })
        // 阻止表单默认提交
    return false;
});
//当删除按钮被点击的时候
$('#userBox').on('click', '.delete', function() {
    //如果管理员确认要删除用户
    if (confirm('您真的要删除用户吗')) {
        //获取到即使要删除的用户id
        var id = $(this).attr('data-id');
        //向服务器端发送请求 删除用户
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function() {
                location.reload()
            }
        })
    }
});
// 获取到全选按钮状态，设置给每一个用户的复选框
var selectAll = $('#selectAll');
// 获取批量删除按钮
var deleteMany = $('#deleteMany');
selectAll.on('change', function() {
    // 获取到全选按钮当前的状态
    var status = $(this).prop('checked');
    // 当全选按钮的状态发生改变时
    if (status) {
        // 显示批量删除按钮
        deleteMany.show();
    } else {
        // 隐藏批量删除按钮
        deleteMany.hide();
    }
    // 获取到所有的用户并将用户的状态和全选按钮保持一致
    $('#userBox').find('input').prop('checked', status);
});
$('#userBox').on('change', '.userStatus', function() {
    var inputs = $('#userBox').find('input');
    if (inputs.length == inputs.filter(':checked').length) {
        // alert('所有用户都是选中的')
        selectAll.prop('checked', true)
    } else {
        // alert('不是所有用户都是选中的')
        selectAll.prop('checked', false)
    }

    // 当用户前面的复选框状态发生改变时
    // 如果选中的复选框的数量大于0 就说明有选中的复选框
    if (inputs.filter(':checked').length > 0) {
        // 显示批量删除按钮
        deleteMany.show();
    } else {
        // 隐藏批量删除按钮
        deleteMany.hide();
    }

});

deleteMany.on('click', function() {
    var ids = [];
    // 获取选中的用户
    var checkedUser = $('#userBox').find('input').filter(':checked');
    // 循环复选框 从复选框元素的身上获取data-id属性的值
    checkedUser.each(function(index, element) {
        ids.push($(element).attr('data-id'));
    });
    if (confirm('您真要确定要进行批量删除操作吗')) {

        $.ajax({
            type: 'delete',

            url: '/users/' + ids.join('-'),
            success: function() {
                location.reload();
            }
        })
        console.log(ids);
    }
});