// Mongoose Task Model
const Task = require('../models/task-model')
// Express Task Router
const taskRouter = require('express').Router()

taskRouter.route('/')
  // Generic GET
  .get((req, res) => {
    let query = {}
    // filter by status if provided
    if (req.query.status) query.status = req.query.status
    Task.find(query, (err, tasks) => {
      if (err) res.status(500).send(err)
      if (tasks) res.status(200).json(tasks)
      res.status(404).end()
    })
  })
  // Generic POST
  .post((req, res) => {
    // getting rid of user provided ids in the req body to ensure
    // that mongo handles them exclusively
    if (req.body._id) delete req.body._id
    const task = new Task(req.body)
    task.save((err, tasks) => {
      if (err) res.status(500).send(err)
      if (tasks) res.status(201).json(tasks)
      res.status(404).end()
    })
  })

taskRouter.route('/:taskId')
  // ById GET
  .get((req, res) => {
    const id = req.params.taskId
    Task.findById(id, (err, task) => {
      if (err) res.status(500).end()
      if (task) res.status(200).json(task)
      res.status(404).end()
    })
  })
  // ById PATCH
  .patch((req, res) => {
    // findByIdandUpdate doesnt play nice with validation
    Task.find(req.params.taskId, (err, task) => {
      for (let field in req.body) { // eslint-disable-line no-unused-vars
        task.field = req.body.field
      }
      if (err) res.status(500).send(err)
      if (task) res.status(200).save(task)
      res.status(404).end()
    })
  })

  // ById DELETE
  .delete((req, res) => {
    const id = req.params.taskId
    Task.findByIdAndRemove(id, (err, task) => {
      if (err) res.status(500).end()
      if (task) res.status(204).end()
      res.status(404).end()
    })
  })

module.exports = taskRouter
