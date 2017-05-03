'use strict'

const express = require('express')
const router = express.Router()
const todoController = require('./todo.controller')

router.get('/ping', todoController.ping)
router.get('/getall', todoController.getAll)
router.get('/getone/:todoId', todoController.getOne)
router.post('/create', todoController.create)
router.post('/update', todoController.update)
router.post('/delete', todoController.delete)

module.exports = router
