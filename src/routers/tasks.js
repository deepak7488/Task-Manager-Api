const express = require('express')
const Task = require('../models/task')
const auth = require('../middlewere/auth')
const { findById } = require('../models/user')
const router = new express.Router()
router.post('/tasks', auth, async(req, res) => {

    // const save=await task.save()
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {

        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch(error => {
    //     res.status(400).send(error)
    // })
})
router.get('/tasks', auth, async(req, res) => {
    try {
        // const tasks = await Task.find({ owner: req.user._id })
        const match = {}
        const sort = {}
        if (req.query.completed) {
            match.completed = req.query.completed === 'true'
        }
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'asc' ? 1 : -1;
        }

        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
                // sort: {
                //     createdAt: -1
                // }
            }
        }).execPopulate()
        res.send(req.user.tasks)

    } catch (e) {
        res.status(500).send(e);
    }
})
router.get('/tasks/:id', auth, async(req, res) => {
    const _id = req.params.id;
    try {
        //const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task)
            return res.status(404).send("Task Not found!")

        res.send(task);
    } catch (e) {
        res.status(500).send()
    }
})
router.patch('/tasks/:id', auth, async(req, res) => {
    Update = Object.keys(req.body)
    allowedUpadtes = ['description', 'completed']
    isValidOperation = Update.every(update => allowedUpadtes.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'invalid Updates!' })
    }
    try {
        const tasks = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        if (!tasks) {
            return res.status(404).send("Tasks not find!");
        }
        Update.forEach(update => tasks[update] = req.body[update]);
        await tasks.save();
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        res.send(tasks);
    } catch (e) {
        res.status(400).send(e)
    }
})
router.delete('/tasks/:id', auth, async(req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!task)
            return res.status(404).send("Tasks not find!");
        res.send(task);
    } catch (e) {
        res.status(500).send(e)
    }
})
module.exports = router