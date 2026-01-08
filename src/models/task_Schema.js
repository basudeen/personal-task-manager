const mongoose = require('mongoose');

const task = {
    title: {
        type: String,
        required: true
    },
    description:{
        type : String,
        isNull:true
    },
    status:{
        type:String,
        enum:['Pending','In Progress','Completed'],
    },
    currentDate:{
        type:Date()
    }
}
module.exports=mongoose.model('Task',task);