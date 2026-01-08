const express = require('express');
const router = express.Router();
const taskController = require('./../controllers/task');
router.post('/task', taskController.Createtask);
router.get('/task', taskController.GetTasks);
router.put('/task/:id', taskController.UpdateTask);
// router.delete('/deleteTask', taskController.deleteTask);
module.exports = router;