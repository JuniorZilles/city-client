const truncate = require('../utils/truncate')
const InvalidField = require('../../src/app/errors/InvalidField')
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
    const city = await CitiesRepository.getByName("Dois Irmãos")
    expect(city).toEqual(city_create)
  })

  it('should get a city by state', () => {})
})
