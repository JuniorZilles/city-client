const request = require('supertest')
const { truncateOrdered } = require('../utils/truncate')
const app = require('../../src/app')

describe('src :: app :: controllers :: cities', () => {
  beforeEach(async () => {
    // permite usar o mesmo nome e estado em diferentes testes
    await truncateOrdered()
  })

  it('should create a new city and return 201 with an object that has an id', async () => {
    const response = await request(app)
      .post('/api/v1/cities')
      .send({
        name: 'Igrejinha',
        state: 'RS'
      })

    expect(response.status).toBe(201)
    expect(response.body.id).toBeDefined()
  })

  it('should not create a city and return 400 when has missing values', async () => {
    const response = await request(app)
      .post('/api/v1/cities')
      .send({
        state: 'RS'
      })

    expect(response.status).toBe(400)
  })

  it('should get a city by his name and return 200 with the content', async () => {
    const response = await request(app)
      .post('/api/v1/cities')
      .send({
        name: 'Dois Irmãos',
        state: 'RS'
      })

    const responseTested = await request(app).get(
      '/api/v1/cities?name=Dois Irmãos'
    )

    expect(responseTested.status).toBe(200)
    expect(responseTested.body).toBeDefined()
  })

  it('should not get a city by his name and return 400 when it has missing values', async () => {
    const responseTested = await request(app).get('/api/v1/cities')

    expect(responseTested.status).toBe(400)
  })

  it('should not get a city by his name and return 404 when not found', async () => {
    const responseTested = await request(app).get(
      '/api/v1/cities?name=Sapucaia'
    )

    expect(responseTested.status).toBe(404)
  })

  it('should get a city by his state and return 200 with the content', async () => {
    const response = await request(app)
      .post('/api/v1/cities')
      .send({
        name: 'Dois Irmãos',
        state: 'RS'
      })

    const responseTested = await request(app).get('/api/v1/cities?state=RS')

    expect(responseTested.status).toBe(200)
    expect(responseTested.body).toBeDefined()
  })

  it('should not get a city by his state and return 404 when not found', async () => {
    const responseTested = await request(app).get('/api/v1/cities?state=SP')

    expect(responseTested.status).toBe(404)
  })
})
