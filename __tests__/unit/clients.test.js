const  {truncateOrdered} = require('../utils/truncate')
const InvalidField = require('../../src/app/errors/InvalidField')
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
})
