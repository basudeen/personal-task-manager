const express = require('express');
const router = express.Router();
const taskController = require('./../controllers/task');
router.post('/task', taskController.Createtask);
router.get('/task', taskController.GetTasks);
router.get('/task/:id', taskController.GetTaskID);
router.patch('/task/:id', taskController.UpdateTask);
router.delete('/task/:id', taskController.DeleteTask);
module.exports = router;