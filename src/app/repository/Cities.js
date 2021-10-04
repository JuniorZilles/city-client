const { Cities } = require('../models')
const InvalidField = require('../errors/InvalidField')
const NotFound = require('../errors/NotFound')
const AlreadyCreated = require('../errors/AlreadyCreated')

const create = async payload => {
  if (typeof payload.name !== 'string' || payload.name.length === 0) {
    throw new InvalidField('name')
  }
  if (typeof payload.state !== 'string' || payload.state === 0) {
    throw new InvalidField('state')
  }

  const city = await getCity({name:payload.name, state:payload.state})

  if (city) {
    throw new AlreadyCreated(`${payload.name} - ${payload.state}`)
  }

  return await Cities.create(payload)
}

const getCity = async content => {
  const city = await Cities.findOne({
    where: content
  })

  return city
}

const getCityByName = async cityName => {
  const city = await Cities.findOne({
    where: {
      name: cityName
    }
  })

  if (!city) {
    throw new NotFound(cityName)
  }

  return city
}

const getByState = async state => {
  const cities = await Cities.findAll({
    where: {
      state: state
    }
  })

  if (cities.length == 0) {
    throw new NotFound(state)
  }

  return cities
}

module.exports = {
  create,
  getCityByName,
  getByState
}
