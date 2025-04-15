class NewsController {
    // get /news
    index(req, res) {
        res.render('news');
    }
    // get /news/:slug
    show(req, res) {
        res.send('news detail');
    }
}
// export cau gi thi khi require nhan duoc gia tri do
module.exports = new NewsController();
