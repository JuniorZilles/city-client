const moment = require('moment')
const { Clients } = require('../models')
const InvalidField = require('../errors/InvalidField')
const NotFound = require('../errors/NotFound')

const createClient = async payload => {
  if (typeof payload.fullname !== 'string' || payload.fullname.length === 0) {
    throw new InvalidField('fullname')
  }
  if (typeof payload.gender !== 'string' || payload.gender.length === 0) {
    throw new InvalidField('gender')
  }
  if (typeof payload.birthday !== 'string' || payload.birthday.length === 0) {
    throw new InvalidField('birthday')
  }
  if (typeof payload.city !== 'number') {
    throw new InvalidField('city')
  }

  const birthday = moment(payload.birthday, 'DD/MM/YYYY').format(
    'YYYY-MM-DD HH:mm:ss'
  )
  const age = moment().diff(birthday, 'years', false)

  const newData = { ...payload, birthday, age }

  return await Clients.create(newData)
}

const getClientByName = async fullname => {
  const client = await Clients.findOne({
    where: {
      fullname: fullname
    }
  })

  if (!client) {
    throw new NotFound(fullname)
  }

  return client
}

const getClientById = async id => {
  const client = await Clients.findOne({
    where: {
      id: id
    }
  })

  if (!client) {
    throw new NotFound(id)
  }

  return client
}

const removeClient = async id => {
    const client = await getClientById(id)
    return await Clients.destroy({where:{id:id}})
}

const updateClientName = (id, name) => {}

module.exports = {
  createClient,
  getClientByName,
  getClientById,
  removeClient,
  updateClientName
}
