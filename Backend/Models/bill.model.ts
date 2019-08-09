import mongoose from "mongoose";

let bill = new mongoose.Schema({
    name: {type: String, required: true},
    createdBy: {
        type: String,
        ref: 'user',
        required: true
    },
    createdAt: {type: Date, required: true},
    updatedAt: {type: Date, required: true},
    amount: {type: Number, required: true},
    description : {type: String, required: false},
    participants: [{
        type: String,
        ref: 'user',
        required: false
    }],
    paidBy: {
        type: String,
        ref: 'user',
        required: true
    }
},{
    versionKey: false
});

module.exports = mongoose.model('bill',bill,'bills');