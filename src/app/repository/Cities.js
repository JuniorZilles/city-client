const {Cities} = require('../models')
const InvalidField = require('../errors/InvalidField')
const NotFound = require('../errors/NotFound')

const create = async payload => {
  if (typeof payload.name !== 'string' || payload.name.length === 0) {
    throw new InvalidField('name')
  }
  if (typeof payload.state !== 'string' || payload.state === 0) {
    throw new InvalidField('state')
  }

  return await Cities.create(payload)
}

const getCityByName = async cityName => {
   const city = await Cities.findOne({
       where:{
           name:cityName
       }
   })

   if (!city){
       throw new NotFound(cityName)
   }

   return city
}

const getByState = async state => {
    const cities = await Cities.findAll({
        where:{
            state:state
        }
    })

    if (!cities){
      throw new NotFound(state)
  }

    return cities
}

module.exports = {
  create,
  getCityByName,
  getByState
}
