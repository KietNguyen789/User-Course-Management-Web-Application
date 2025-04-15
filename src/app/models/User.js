const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const User = new Schema(
    {
        _id: { type: Number },
        name: { type: String },
        account: { type: String, require: true },
        password: { type: String, require: true },
        email: { type: String, require: true },
        // must be string
        phone: { type: String, require: true },
        roll: { type: String, require: true },
        // unique tu thu vien shortid de hai cai trung slug thi tu noi them de khac
        slug: { type: String, slug: 'account', unique: true },
        isLocked: { type: Boolean, default: true },

        //  createdAt: { type: Date, default: Date.now},
        //  udatedAt: { type: Date, default: Date.now},
        //    deleted:{type:Boolean, default: false},
        //    deletedAt:{type: Date, default:null},
        // mongoDB apply interface vao field, tuy chinh
    },
    { _id: false, timestamps: true },
);
// mongoDB tu convert Course thanh chu thuong,
//neu co nhieu tu thi cach nhau bang gach duoi,
// them dang so nhieu de suy ra collection,
//va khi tao 1 model ma chua co trong collection thi no se tu tao ten va collection

// add plugin
// khi add below ma van conc cac document cu thi bi loi
// no tao ra 1 collection counter, se nhe hon
User.plugin(AutoIncrement);
mongoose.plugin(slug);
// xoa bang cach them deleted:
// override, chi xuat ra cac document co deleted: false
User.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('User', User);
