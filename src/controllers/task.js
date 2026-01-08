const task = require('./../models/task_Schema')

module.exports = {
    createtask: async (req, res) => {
        try {
         const createtask= task.create(req.body);
         if(!createtask){
            res.status(400).json({
                success:false,
                message:'task not created..!'
            })
         }
         else{
            res.status(201).json({
                success:true,
                message: 'task created successfully.'
            })
         }
        }
        catch(error){
            res.status(500).json({
                success:false,
                message:'Internal Server Error',
                error:error.message
            })
        }
    }
}