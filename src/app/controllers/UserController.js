const { multipleMongooseToObject } = require('../../until/mongoose');
const mongoose = require('../../until/mongoose');
const { mongooseToObject } = require('../../until/mongoose');
// ./ module nam cung thu muc, ../ nam trong thu muc cha,
// nhu model nam trong app
// util nam trong src
const User = require('../models/User');

class UserController {
    // get /users/:slug
    // muon lay slug bi dinh trong file html
    show(req, res, next) {
        User.findOne({ slug: req.params.slug })
            .then((user) => {
                res.render('users/show', { user: mongooseToObject(user) });
            })
            .catch(next);
        // res.send('USER DETAIL - '+ req.params.slug);
    }
    // get /users/create
    create(req, res) {
        res.render('users/create');
    }
    // post /users/store
    store(req, res, next) {
        //res.json(req.body);

        req.body._id = 1;
        const user = new User(req.body);

        user.save() // ()=> res.redirect('/me/stored/users') moi cap nhat khi redirect ve
            .then(() => res.redirect('/me/stored/users'))
            .catch(next);

        // get /users/:id/edit
    }
    edit(req, res, next) {
        User.findById(req.params.id)
            .then((user) =>
                res.render('users/edit', {
                    user: mongooseToObject(user),
                }),
            )
            .catch(next);
        //res.render('users/edit');
    }
    // put /users/:id
    update(req, res, next) {
        // redirect cau hinh location trong res header, / la di tu trang home
        // POST formData --> req.body
        // GET res.render()
        // {{user.?}} --> get ? --> req.params.?
        User.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/users'))
            .catch(next);
    }
    // delete /users/:id
    destroy(req, res, next) {
        User.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    // delete /users/:id/force
    forceDestroy(req, res, next) {
        User.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // patch /users/:id/restore
    restore(req, res, next) {
        User.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    // /users/handle-form-action'
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                // doc doc cua mongoDB
                User.delete({ _id: req.body.userIds })
                    .then(() => res.redirect('back'))
                    .catch(next);

                break;
            default:
                res.json(req.body);
        }
    }
}
// export cau gi thi khi require nhan duoc gia tri do
module.exports = new UserController();
