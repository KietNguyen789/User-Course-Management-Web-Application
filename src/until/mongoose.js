module.exports = {
    multipleMongooseToObject: function (mongooses) {
        // tra ve list cac object document
        return mongooses.map((mongoose) => mongoose.toObject());
    },
    mongooseToObject: function (mongoose) {
        // tra ve 1 object document
        return mongoose ? mongoose.toObject() : mongoose;
    },
};
