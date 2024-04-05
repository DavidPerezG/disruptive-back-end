const request = require('supertest');
const app = require('../src/index.js');
const Category = require('../src/models/Category');

describe('Category Endpoints', () => {
  let authToken;

  beforeAll(async () => {
    // Perform login to get authentication token
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testUser',
        password: 'testPassword'
      });
    authToken = response.body.token;
  });



  it('should get all categories', async () => {
    const response = await request(app)
      .get('/api/categories')
      .set('Authorization', `${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

});

// Close the server after tests
afterAll(async () => {
  await app.close();
});
