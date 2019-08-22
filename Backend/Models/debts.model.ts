import mongoose from "mongoose";

let debt = new mongoose.Schema({
    payee: {type: Object, ref: 'userModel', required: true},
    payer: {type: Object, ref: 'userModel', required: true},
    amount: {type: Number, required: true},
    allPaid: {type: Boolean, required: true},
    groupId: {type: mongoose.Schema.Types.ObjectId, ref: 'groupModel', required: true},
    billId: {type: mongoose.Schema.Types.ObjectId, ref: 'groupModel', required: true},
    createdAt: {type: Date, required: true},
    updatedAt: {type: Date, required: true}
},{
    versionKey: false
});

module.exports = mongoose.model('debtModel',debt,'debts');