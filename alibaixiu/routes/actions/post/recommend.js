// 用户模块
const { Post } = require('../../../model/Post');

module.exports = async(req, res) => {
    const posts = await Post.find({ state: 1 }).limit(4).sort('-meta.comments')
        // 响应
    res.send(posts);
}