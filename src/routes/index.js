const newsRouter = require('./news');
const siteRouter = require('./site');
const userRouter = require('./users');
const meRouter = require('./me');

function route(app) {
    app.get(
        '/trang-chu',
        /*Arrow function 
có thể viết là (req, res) => res.send('Hello World!'): hiểu là return, khi chỉ có 1 dòng */ (
            req,
            res,
        ) => {
            // res.send('Hello World!')
            res.render('home');
        },
    );
    /*
app.get('/news', 
(req, res) => {
  // tat ca cac response duoc tra ve trong 1 lan giao tiep 
  // truy xuat form tu 1 trang khac
  console.log(req.query.q);
  res.render('news');
})*/
    // cap con nho hon cua news ./  la cap con dau tien

    // path cap 1 va function handler
    app.use('/news', newsRouter);
    app.use('/', siteRouter);
    app.use('/users', userRouter);
    app.use('/me', meRouter);
    /*
app.get('/search', 
(req, res) => {
  // tat ca cac response duoc tra ve trong 1 lan giao tiep 
  //console.log(req.query.q); 
  // tương tác với view
  res.render('search');
})
// duoc sinh ra de du lieu khong dinh tren URL
// khong phai query parameter thi khong dinh tren URL
// POST thi no la data

// mô hình MVC, gồm 3 thành phần chính model, view và controller
// npm start lằng nghe port 
// routes: entry point index đã được nạp vào bộ nhớ RAM
// Dispatcher sẽ kiểm tra xem action có khớp với fucntion handler không?
// sau đó controller là fucntion handler lấy dữ liệu từ model và view rồi gửi về cho browser
app.post('/search', 
(req, res) => {
  // tat ca cac response duoc tra ve trong 1 lan giao tiep 
 // console.log(req.query.q); 
 console.log(req.body) ;
 res.send('');
})*/
}

module.exports = route;
