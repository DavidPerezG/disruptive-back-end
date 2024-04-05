const request = require('supertest');
const app = require('../src/index.js');

describe('Content Endpoints', () => {
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

  it('should create a new content', async () => {
    const newContent = {
      title: 'Test Content',
      type: 'image',
      category: '660f632adf3d5eeda6f9341b',
      credits: 'Test Credits',
      content: 'Test Content URL'
    };

    const response = await request(app)
      .post('/api/contents')
      .set('Authorization', `${authToken}`)
      .send(newContent);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('title', newContent.title);
  });

  it('should get all content', async () => {
    const response = await request(app)
      .get('/api/contents')
      .set('Authorization', `${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it('should get content by ID', async () => {
    const contentId = '660fded8000f4fe347e14eca';

    const response = await request(app)
      .get(`/api/contents/${contentId}`)
      .set('Authorization', `${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('title');
  });
});

// Close the server after tests
afterAll(async () => {
  await app.close();
});
