const request = require('supertest')
const { truncateOrdered } = require('../utils/truncate')
const app = require('../../src/app')

describe('src :: app :: controllers :: clients', () => {
  beforeEach(async () => {
    // permite usar o mesmo nome e estado em diferentes testes
    await truncateOrdered()
  })

  it('should create a client return 201 and a id', async () => {
    const cityResponse = await request(app)
      .post('/api/v1/cities')
      .send({
        name: 'Igrejinha',
        state: 'RS'
      })
    const response = await request(app)
      .post('/api/v1/clients')
      .send({
        fullname: 'Godofredo Mascarello',
        gender: 'Masculino',
        birthday: '14/11/1994',
        city: cityResponse.body.id
      })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })

  it('should not create a client and return 400', async () => {
    const cityResponse = await request(app)
      .post('/api/v1/cities')
      .send({
        name: 'Igrejinha',
        state: 'RS'
      })
    const response = await request(app)
      .post('/api/v1/clients')
      .send({
        birthday: '14/11/1994',
        city: cityResponse.body.id
      })

    expect(response.status).toBe(400)
  })

  it('should get a client by his name and return 200 with the content', async () => {
    const cityResponse = await request(app)
      .post('/api/v1/cities')
      .send({
        name: 'Igrejinha',
        state: 'RS'
      })
    const clientResponse = await request(app)
      .post('/api/v1/clients')
      .send({
        fullname: 'Godofredo Mascarello',
        gender: 'Masculino',
        birthday: '14/11/1994',
        city: cityResponse.body.id
      })

    const response = await request(app).get(
      '/api/v1/clients?fullname=Godofredo Mascarello'
    )

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body).toHaveProperty('id')
  })

  it('should not get a client and return 400 when it has missing values', async () => {
    const responseTested = await request(app).get('/api/v1/clients')

    expect(responseTested.status).toBe(400)
  })

  it('should not get a client by his name and return 404 when not found', async () => {
    const responseTested = await request(app).get(
      '/api/v1/clients?fullname=Alexandre'
    )

    expect(responseTested.status).toBe(404)
  })

  it('should get a client by id and return 200 with the content', async () => {
    const cityResponse = await request(app)
      .post('/api/v1/cities')
      .send({
        name: 'Igrejinha',
        state: 'RS'
      })
    const clientResponse = await request(app)
      .post('/api/v1/clients')
      .send({
        fullname: 'Godofredo Mascarello',
        gender: 'Masculino',
        birthday: '14/11/1994',
        city: cityResponse.body.id
      })

    const response = await request(app).get(
      `/api/v1/clients/${clientResponse.body.id}`
    )

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body).toHaveProperty('id')
  })

  it('should not get a client with invalid id and return 404 when not found', async () => {
    const responseTested = await request(app).get('/api/v1/clients/300')

    expect(responseTested.status).toBe(404)
  })

  it('should remove a client by id and return 204 with no content', async () => {
    const cityResponse = await request(app)
      .post('/api/v1/cities')
      .send({
        name: 'Igrejinha',
        state: 'RS'
      })
    const clientResponse = await request(app)
      .post('/api/v1/clients')
      .send({
        fullname: 'Godofredo Mascarello',
        gender: 'Masculino',
        birthday: '14/11/1994',
        city: cityResponse.body.id
      })

    const response = await request(app).delete(
      `/api/v1/clients/${clientResponse.body.id}`
    )

    expect(response.status).toBe(204)
    expect(response.body).toEqual({})
  })

  it('should not remove a client with invalid id and return 404 when not found', async () => {
    const responseTested = await request(app).get('/api/v1/clients/300')

    expect(responseTested.status).toBe(404)
  })

  it('should update the client name by id and return 204 with no content', async () => {
    const cityResponse = await request(app)
      .post('/api/v1/cities')
      .send({
        name: 'Igrejinha',
        state: 'RS'
      })
    const clientResponse = await request(app)
      .post('/api/v1/clients')
      .send({
        fullname: 'Godofredo Mascarello',
        gender: 'Masculino',
        birthday: '14/11/1994',
        city: cityResponse.body.id
      })

    const response = await request(app)
      .patch(`/api/v1/clients/${clientResponse.body.id}`)
      .send({
        fullname: 'Bateu Santos'
      })

    expect(response.status).toBe(204)
    expect(response.body).toEqual({})
  })

  it('should not update a client with invalid id and return 404 when not found', async () => {
    const responseTested = await request(app)
      .patch('/api/v1/clients/300')
      .send({
        fullname: 'Bateu Santos'
      })

    expect(responseTested.status).toBe(404)
  })

  it('should not update a client and return 400 when missing body', async () => {
    const cityResponse = await request(app)
      .post('/api/v1/cities')
      .send({
        name: 'Igrejinha',
        state: 'RS'
      })
    const clientResponse = await request(app)
      .post('/api/v1/clients')
      .send({
        fullname: 'Godofredo Mascarello',
        gender: 'Masculino',
        birthday: '14/11/1994',
        city: cityResponse.body.id
      })

    const responseTested = await request(app).patch(
      `/api/v1/clients/${clientResponse.body.id}`
    )

    expect(responseTested.status).toBe(400)
  })
})
