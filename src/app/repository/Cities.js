const {Cities} = require('../models')
const InvalidField = require('../errors/InvalidField')

const create = async payload => {
  if (typeof payload.name !== 'string' || payload.name.length === 0) {
    throw new InvalidField('name')
  }
  if (typeof payload.state !== 'string' || payload.state === 0) {
    throw new InvalidField('state')
  }

  const city = await Cities.create(payload)
  return city
}

const getByName = cityName => {}

const getByState = state => {}

module.exports = {
  create,
  getByName,
  getByState
}
