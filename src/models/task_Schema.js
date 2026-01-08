const mongoose = require('mongoose');

const task = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        isNull: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
    },
    // currentDate: {
    //     type: Date,
    //     default: Date.now
    // },
    // updateDate: {
    //     type: Date,
    //     isnull: true
    // }

},{timestamps:true});
module.exports = mongoose.model('Task', task);