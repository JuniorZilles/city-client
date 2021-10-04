const router = require('express').Router()
const MissingArgument = require('../errors/MissingArgument')
const CitiesRepository = require('../repository/Cities')

router.options('/', (req, res)=>{
  res.set("Access-Control-Allow-Methods", 'GET, POST')
  res.status(204)
  res.end()
})

router.post('/', async (req, res, next) => {
  try {
    const body = req.body
    const city = await CitiesRepository.create(body)

    res.status(201).json(city)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const name = req.query.name
    const state = req.query.state
    if (name === undefined && state === undefined) {
      throw new MissingArgument('name or state')
    }
    let city
    if (name != undefined) {
      city = await CitiesRepository.getCityByName(name)
    } else if (state != undefined) {
      city = await CitiesRepository.getByState(state)
    }
    res.status(200).json(city)
  } catch (error) {
    next(error)
  }
})

module.exports = router
