const  {truncateOrdered} = require('../utils/truncate')
const InvalidField = require('../../src/app/errors/InvalidField')
const NotFound = require('../../src/app/errors/NotFound')
const CitiesRepository = require('../../src/app/repository/Cities')
const ClientsRepository = require('../../src/app/repository/Clients')

describe('src :: app :: repository :: clients', () => {
  beforeEach(async () => {
    // permite usar o mesmo nome e estado em diferentes testes
    await truncateOrdered()
  })

  it('should create a client and client be defined', async () => {
    const city = await CitiesRepository.create({
      name: 'Dois Irmãos',
      state: 'RS'
    })

    const client = await ClientsRepository.createClient({
      fullname: 'Godofredo Mascarello',
      gender: 'Masculino',
      birthday: '14/11/1994',
      city: city.id
    })
    expect(client).toBeDefined()
  })

  it('should create a client and return a valid id', async () => {
    const city = await CitiesRepository.create({
      name: 'Gramado',
      state: 'RS'
    })

    const client = await ClientsRepository.createClient({
      fullname: 'Godofredo Mascarello',
      gender: 'Masculino',
      birthday: '14/11/1994',
      city: city.id
    })

    expect(client.id).not.toBeUndefined()
  })

  it('should throw a invalidfield exception to validate missing data', async () => {
    try {
      const client = await ClientsRepository.createClient({})
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidField)
    }
  })

  it('should get a client by his name and be defined', async () => {
    const city_created = await CitiesRepository.create({
      name: 'Gramado',
      state: 'RS'
    })

    const client_created = await ClientsRepository.createClient({
      fullname: 'Godofredo Mascarello',
      gender: 'Masculino',
      birthday: '14/11/1994',
      city: city_created.id
    })

    const client = await ClientsRepository.getClientByName('Godofredo Mascarello')

    expect(client).toBeDefined()
  })

  it('should get a client by his name', async () => {
    const city_created = await CitiesRepository.create({
      name: 'Gramado',
      state: 'RS'
    })

    const client_created = await ClientsRepository.createClient({
      fullname: 'Godofredo Mascarello',
      gender: 'Masculino',
      birthday: '14/11/1994',
      city: city_created.id
    })

    const client = await ClientsRepository.getClientByName('Godofredo Mascarello')

    expect(client.fullname).toBe(client_created.fullname)
    expect(client.id).toBe(client_created.id)
  })

  it('should throw a not found exception when doesnt find a client by his name', async () => {
    try {
        const client = await ClientsRepository.getClientByName('Godofredo Silva')
    } catch (error) {
        expect(error).toBeInstanceOf(NotFound)
    }
  })

  it('should get a client by id and be defined', async () => {
    const city_created = await CitiesRepository.create({
      name: 'Gramado',
      state: 'RS'
    })

    const client_created = await ClientsRepository.createClient({
      fullname: 'Godofredo Mascarello',
      gender: 'Masculino',
      birthday: '14/11/1994',
      city: city_created.id
    })

    const client = await ClientsRepository.getClientById(client_created.id)

    expect(client).toBeDefined()
  })

  it('should get a client by id', async () => {
    const city_created = await CitiesRepository.create({
      name: 'Gramado',
      state: 'RS'
    })

    const client_created = await ClientsRepository.createClient({
      fullname: 'Godofredo Mascarello',
      gender: 'Masculino',
      birthday: '14/11/1994',
      city: city_created.id
    })

    const client = await ClientsRepository.getClientById(client_created.id)

    expect(client.id).toBe(client_created.id)
    expect(client.fullname).toBe(client_created.fullname)
    
  })

  it('should throw a not found exception when doesnt find a client by id', async () => {
    try {
        const client = await ClientsRepository.getClientById(500)
    } catch (error) {
        expect(error).toBeInstanceOf(NotFound)
    }
  })
})
