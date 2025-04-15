const { multipleMongooseToObject } = require('../../until/mongoose');
// ./ module nam cung thu muc, ../ nam trong thu muc cha,
// nhu model nam trong app
// util nam trong src
const User = require('../models/User');

class MeController {
    // get /stored/users
    storedUsers(req, res, next) {
        //res.json(res.locals._sort);
        let userQuery = User.find({});
        if (req.query.hasOwnProperty('_sort')) {
            userQuery = userQuery.sort({
                [req.query.column]: req.query.type,
            });
        }
        Promise.all([userQuery, User.countDocumentsDeleted()])
            .then((result) => {
                // result hoac [users, deletedCount]
                res.render('me/stored-users', {
                    deletedCount: result[1],
                    users: multipleMongooseToObject(result[0]),
                });
            })
            .catch(next);

        // User.countDocumentsDeleted()
        // // doi so luu gia tri cua ham countDocumentsDeleted()
        // .then((deletedCount)=> console.log(deletedCount))
        // .catch(()=> {});

        // User.find({})
        //     // condition co hoac bang null
        //     //deletedAt: null,
        // .then((users) => res.render('me/stored-users', {
        //     users: multipleMongooseToObject(users),
        // }))
        // .catch(next);
    }
    // /me/trash/user
    trashUsers(req, res, next) {
        User.findDeleted({})
            // condition co hoac bang null
            //deletedAt: null,
            .then((users) =>
                res.render('me/trash-users', {
                    users: multipleMongooseToObject(users),
                }),
            )

            .catch(next);
    }
}
// export cau gi thi khi require nhan duoc gia tri do
module.exports = new MeController();
