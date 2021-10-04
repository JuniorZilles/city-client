const { truncate } = require('../utils/truncate')
const InvalidField = require('../../src/app/errors/InvalidField')
const AlreadyCreated = require('../../src/app/errors/AlreadyCreated')
const NotFound = require('../../src/app/errors/NotFound')
const CitiesRepository = require('../../src/app/repository/Cities')

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
      name: 'Porto Alegre',
      state: 'RS'
    })
    expect(city.id).not.toBeUndefined()
  })

  it('should not create a city with same name and state', async () => {
    const cityCreate = await CitiesRepository.create({
      name: 'Porto Alegre',
      state: 'RS'
    })
    try {
      const city = await CitiesRepository.create({
        name: 'Porto Alegre',
        state: 'RS'
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AlreadyCreated)
    }
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
    await Promise.all(
      city.map(async name => {
        await CitiesRepository.create({
          name: name,
          state: 'RS'
        })
      })
    )
    const cities = await CitiesRepository.getByState('RS')
    expect(cities.length).toEqual(2)
  })

  it('should return a throw a not found exception when doesnt find any city', async () => {
    try {
      const cities = await CitiesRepository.getByState('RS')
    } catch (error) {
      expect(error).toBeInstanceOf(NotFound)
    }
  })
})
