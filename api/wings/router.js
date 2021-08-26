const express = require('express')
const router = express.Router()
const Wing = require('./model')

router.get('/', async (req, res, next) => {
    try {
        const wings = await Wing.get()
        const newWings = wings.map(w => ({...w}))
        res.json(newWings)
    } catch (err) {
        next(err)
    }
})

router.get('/:wing_id', async (req, res, next) => { //eslint-disable-line
  Wing.getById(req.params.wing_id)
    .then(w => {
      res.status(200).json(w)
    })
})

router.post('/', // validateWing, 
(req, res, next) => {
    const wings = req.body
    Wing.create(wings)
      .then(newWings => {
        res.status(201).json({...newWings})
      })
      .catch(next)
  });

router.use((err, req, res, next) => { //eslint-disable-line
  res.status(500).json({
    customMessage: 'you deserve only tyson wings boiled in water for causing this issue',
    message: err.message,
    stack: err.stack
  })
})

module.exports = router