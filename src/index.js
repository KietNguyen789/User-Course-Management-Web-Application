const express = require('express');
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');
const SortMiddleware = require('./app/middleware/SortMiddleware');
const methodOverride = require('method-override');
// khai báo thư viện
const db = require('./config/db');
// connect to db
db.connect();
const route = require('./routes');

const app = express(); // tạo instance của thư viện express
const port = 3000; // run website ở port nào
// đinh nghĩa route, /tin-tuc thì phải gõ tin-tức
// http://localhost:3000/trang-chu/ khi là: /trang-chu
//app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));
// urlencoded() là middleware để xử, từ browser(client) --> server
// apply len toan bo ung dung
app.use(
    express.urlencoded({
        extended: true,
    }),
);
// Custom middleware
app.use(SortMiddleware);
// Toan bo ung dung phai qua BaoVe khi path khong duoc chi dinh
app.use('/test', BacBaoVe);
function BacBaoVe(req, res, next) {
    if (['vethuong', 'vevip'].includes(req.query.ve)) {
        req.face = 'Gach';
        return next();
    }

    res.status(403).json({
        message: 'Access Denied',
    });
    // thu tu tham so req, toi res, toi next, sai thu tu la loi
}
// gửi dữ liệu từ server --> browser(client), thư viện trong js với code js để submit
//XMLHttpRequest, fetch, axios,
//HTTP logger
app.use(express.json());
app.use(methodOverride('_method'));
// Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        // su dung thu vien handlebars-express
        // su dung ma cua thu vien handlebars
        helpers: {
            // hacker co the truyen 1 script vao ?query= de lau cookies
            sum(a, b) {
                return a + b;
            },
            sortable(field, sort) {
                const sortType = field === sort.column ? sort.type : 'default';
                const icons = {
                    default: 'fa-solid fa-sort',
                    desc: 'fa-solid fa-arrow-up-wide-short',
                    asc: 'fa-solid fa-arrow-up-short-wide',
                };
                const types = {
                    default: 'desc',
                    desc: 'asc',
                    asc: 'desc',
                };
                const type = types[sortType];
                const icon = icons[sortType];
                return `<a href="?_sort&column=${field}&type=${type}">
            <i class="${icon}"></i>
         </a>`;
            },
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));

//Home, search, contact

// Routes init
route(app);
// do path no chi toi src nên nó không tim được file home trong views, cái cần render là layouts của file home
console.log('PATH:' + __dirname);

// post khi dien form
// get khi muon hien thi du lieu
/*function(req, res) {}  */
// 127.0.0.1
app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
// để server không chạy nữa thì ấn control c

// debug chi chuot vao bien de thay gia tri bien
// luu y la tren windows thi no khong phai la breakpoint ma la quet khoi xanh dau dong do
// neu gap loi la [nodemon] app crashed - waiting for file changes before starting... thi la chua luu file cau hinh
// hoac chua luu file theo thu tu
// giữa browser và controller, có tích hợp lưu vào query nhưng ko body, version từ 4.16 trở xuống phải cài: body-parser và qs lib, ngược lại được tích hợp
//xem body-parser và qs lib trong package.json

// luu y la da cho phep thu vien co the tu overwrite files code
// lint-stage check xem cac file add vao git & co dung format ?
// prettier --write --tab-width 4 --single-quote --trailing-comma all, write phai nam dung vi tri
