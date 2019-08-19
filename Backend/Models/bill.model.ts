import mongoose from "mongoose";

let bill = new mongoose.Schema({
    name: {type: String, required: true},
    createdBy: { type: Object, ref: 'userModel', required: true },
    createdAt: {type: Date, required: true},
    updatedAt: {type: Date, required: true},
    amount: {type: Number, required: true},
    description : {type: String, required: false},
    participants: [{
        type: Object,
        ref: 'userModel',
        required: false
    }],
    paidBy: { type: Object, ref: 'userModel', required: true }
},{
    versionKey: false
});

module.exports = mongoose.model('billModel',bill,'bills');