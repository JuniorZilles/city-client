const truncate = require('../utils/truncate')
const InvalidField = require('../../src/app/errors/InvalidField')
const NotFound = require('../../src/app/errors/NotFound')
const CitiesRepository = require('../../src/app/repository/Cities')
const { expect } = require('@jest/globals')

describe('src :: app :: repository :: cities', () => {
  beforeEach(async () => {
    // permite usar o mesmo nome e estado em diferentes testes
    await truncate()
  })

  it('should create a city and be defined', async () => {
    const city = await CitiesRepository.create({
      name: 'Dois Irmãos',
      state: 'RS'
    })
    expect(city).toBeDefined()
  })

  it('should create a city and return a id', async () => {
    const city = await CitiesRepository.create({
      name: 'Dois Irmãos',
      state: 'RS'
    })
    expect(city.id).not.toBeUndefined()
  })

  it('should throw a invalidfield exception to validate missing data', async () => {
    try {
      const city = await CitiesRepository.create({})
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidField)
    }
  })

  it('should get a city by name', async () => {
    const city_create = await CitiesRepository.create({
      name: 'Dois Irmãos',
      state: 'RS'
    })
    const city = await CitiesRepository.getCityByName('Dois Irmãos')
    expect(city.id).toEqual(city_create.id)
    expect(city.name).toEqual(city_create.name)
    expect(city.state).toEqual(city_create.state)
  })

  it('should get throw a exception when city name is not found', async () => {
    try {
      const city = await CitiesRepository.getCityByName('Dois Irmãos')
    } catch (error) {
      expect(error).toBeInstanceOf(NotFound)
    }
  })

  it('should get a city by state', async () => {
    const city = ['Dois Irmãos', 'Rio Grande']
    // promisse.all garante que todas as iterações feitas vão ser concluidas
    await Promise.all(city.map(async name => {
        await CitiesRepository.create({
        name: name,
        state: 'RS'
      })
    }))
    const cities = await CitiesRepository.getByState('RS')
    expect(cities.length).toEqual(2)
  })

  it('should return a empty list when doesnt find any city', async () => {
    const cities = await CitiesRepository.getByState('RS')

    expect(cities).toEqual([])
  })
})
