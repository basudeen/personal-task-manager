const { ObjectId } = require('bson');
const task = require('./../models/task_Schema');
const dayjs = require('dayjs');
const { default: mongoose } = require('mongoose');

module.exports = {
    Createtask: async (req, res) => {
        try {
            const createtask = await task.create(req.body);
            if (!createtask) {
                res.status(400).json({
                    success: false,
                    message: 'task not created..!'
                })
            }
            else {
                res.status(201).json({
                    success: true,
                    message: 'task created successfully.'
                })
            }
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: error.message
            })
        }
    },
    GetTasks: async (req, res) => {
        try {
            let { search, status } = req.query;
            let filter = {};
            if (search) {
                filter.title = {
                    $regex: search,
                    $options: 'i'
                }
            }
            if (status) {
                filter.status = status;
            }
     
            const gettask = await task.find(filter);
            if (!gettask) {
                res.status(400).json({
                    success: false,
                    message: 'task detail not fetched successfully..!',
                    data: []
                })
            }
            else {
                res.status(200).json({
                    success: true,
                    message: 'task detail fetched successfully..!',
                    data: gettask
                })
            }
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: error.message
            })
        }
    },
    GetTaskID: async (req, res) => {
        try {
            let { id } = req.params;
            const gettask = await task.findById(id, { title: 1, description: 1, status: 1, _id: 0, createdAt: 1, updatedAt: 1 }).lean();

            if (!gettask) {
                res.status(400).json({
                    success: false,
                    message: 'task detail not fetched successfully..!',
                    data: []
                })
            }
            else {

                gettask.createdAt = dayjs(gettask.createdAt).format("DD-MM-YYYY");
                gettask.updatedAt = dayjs(gettask.updatedAt).format("DD-MM-YYYY");

                console.log(gettask.createdAt);
                res.status(200).json({
                    success: true,
                    message: 'task detail fetched successfully..!',
                    data: gettask
                })
            }
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: error.message
            })
        }
    },
    UpdateTask: async (req, res) => {
        try {
            let { id } = req.params;
            let { title, description, status } = req.query;

            let data = {};
            if (title !== undefined)
                data.title = title;
            if (description !== undefined)
                data.description = description;
            if (status !== undefined)
                data.status = status;

            if (Object.keys(data).length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'no feild provided to update',
                })
            }

            const updateTask = await task.findByIdAndUpdate(id, { $set: data }, { new: true })

            if (!updateTask) {
                return res.status(404).json({
                    success: false,
                    message: 'task not update successfully..!',
                    data: []
                })
            }
            else {
                res.status(200).json({
                    success: true,
                    message: 'task update successfully..!',
                    data: []
                })
            }
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            })
        }
    },
    DeleteTask: async (req, res) => {
        try {
            let { id } = req.params;
            const deletetask = await task.findByIdAndDelete(id);
            if (!deletetask) {
                return res.status(400).json({ success: true, message: 'Task not found' });
            }
            else {
                res.status(200).json({ success: true, message: 'Task removed successfully..' })
            }
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: error.message
            })
        }
    }

}