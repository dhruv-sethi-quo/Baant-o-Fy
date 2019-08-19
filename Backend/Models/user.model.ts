import mongoose from "mongoose";

let User = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    createdAt: {type: Date, required: false, default: Date.now},
    updatedAt: {type: Date, required: false, default: Date.now}
},{
    versionKey: false
});

User.pre('save',function (this, next) {
    (this as any).updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('userModel',User,'users');