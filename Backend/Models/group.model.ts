import mongoose from "mongoose";

let group = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: false},
    createdBy: { type: Object, ref:'userModel' ,required: true },
    createdAt: {type: Date, required: false, default: Date.now},
    updatedAt: {type: Date, required: false, default: Date.now},
    participants: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required: false
    }],
    bills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'billModel',
        required: false
    }]
},{
    versionKey: false
});

group.pre('save',function (this, next) {
    (this as any).updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('groupModel',group,'groups');