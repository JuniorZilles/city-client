const router = require('express').Router()
const MissingArgument = require('../errors/MissingArgument')
const ClientRepository = require('../repository/Clients')

router.options('/', (req, res) => {
  res.set('Access-Control-Allow-Methods', 'GET, POST')
  res.status(204)
  res.end()
})

router.post('/', async (req, res, next) => {
  try {
    const body = req.body
    const client = await ClientRepository.createClient(body)

    res.status(201).json(client)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const fullname = req.query.fullname
    if (fullname === undefined) {
      throw new MissingArgument('fullname')
    }
    const client = await ClientRepository.getClientByName(fullname)
    res.status(200).json(client)
  } catch (error) {
    next(error)
  }
})

router.options('/:id', (req, res) => {
  res.set('Access-Control-Allow-Methods', 'GET, DELETE, PATCH')
  res.status(204)
  res.end()
})


router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const client = await ClientRepository.getClientById(id)
    res.status(200).json(client)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    await ClientRepository.removeClient(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const fullname = req.body.fullname
    if (fullname === undefined) {
      throw new MissingArgument('fullname')
    }
    await ClientRepository.updateClientName(id, fullname)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router
