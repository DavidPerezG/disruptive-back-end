const request = require('supertest');
const app = require('../src/index.js');
const User = require('../src/models/User');

describe('User Endpoints', () => {
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


  it('should get all users', async () => {
    const response = await request(app)
      .get('/api/users')
      .set('Authorization', `${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should get user by ID', async () => {
    // Create a test user
    const testUser = await User.create({
      username: 'testUser2',
      email: 'testuser2@example.com',
      password: 'testPassword2',
      userType: 'creator'
    });

    const response = await request(app)
      .get(`/api/users/${testUser._id}`)
      .set('Authorization', `${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('username', testUser.username);

    // Delete the test user
    await User.findByIdAndDelete(testUser._id);
  });
});

// Close the server after tests
afterAll(async () => {
  await app.close();
});
