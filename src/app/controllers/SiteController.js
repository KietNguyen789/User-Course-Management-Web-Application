const { multipleMongooseToObject } = require('../../until/mongoose');
// ./ module nam cung thu muc, ../ nam trong thu muc cha,
// nhu model nam trong app
// util nam trong src
const User = require('../models/User');

class SiteController {
    // get /
    index(req, res, next) {
        // gui yeu cau den mongoDB,
        //lay du lieu theo truy van,
        //  tra du lieu ve cho controller,
        // controller send ve browser

        //err => { next(err);   } or next

        res.render('home');
    }
    // get /search
    search(req, res) {
        res.render('search');
    }
    // post /signin
    signin(req, res, next) {
        //console.log(req.body);
        // findOne(conditions, projection, options)
        User.findOne({ account: req.body.account, password: req.body.password })
            .then((user) => {
                if (user !== null) res.redirect('me/stored/users');
                else {
                    res.redirect('/');
                }
            })
            .catch((error) => {
                next(error);
            });

        // .then(res.redirect('me/stored/users'))
        // .catch(error => {
        //   res.redirect('/')
        //   res.render(error);
        // })
        //  if(result === null)
        // {
        //   res.redirect('/');
        //   res.render('Dang nhap that bai');
        // }
        // else{
        //   res.redirect('me/stored/users')
        // }
        // //res.render('users/edit');
        // console.log(result);
    }
}
// export cau gi thi khi require nhan duoc gia tri do
module.exports = new SiteController();
