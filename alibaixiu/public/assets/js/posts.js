//向服务器端发送请求 获取文章列表数据
$.ajax({
        type: 'get',
        url: '/posts',
        success: function(response) {
            var html = template('postsTpl', response);
            $('#postsBox').html(html);
            // 获取分页数据
            var page = template('pageTpl', response);
            $('#page').html(page);
        }
    })
    //
function changePage(page) {
    // 向服务器端发送请求 获取文章列表数据
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function(response) {
            var html = template('postsTpl', response);
            $('#postsBox').html(html);
            var page = template('pageTpl', response);
            $('#page').html(page);
        }
    });
}