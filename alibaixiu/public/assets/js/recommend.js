$.ajax({
    type: 'get',
    url: '/posts/recommend',
    success: function(response) {
        var recommendTpl =
            `
            {{each data}}
			<li>
			  <a href="detail.html?id={{$value._id}}">
			    <img src="{{$value.thumbnail}}" alt="">
			    <span>{{$value.title}}</span>
			  </a>
			</li>
            {{/each}}
            `;
        var html = template.render(recommendTpl, { data: response });
        //将拼接好的热门推荐显示再了页面中
        $('#recommendBox').html(html);
    }
})