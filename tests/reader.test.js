const { expect } = require('chai');
const request = require('supertest');
const { Reader } = require('../src/models/reader');
const app = require('../src/app');

describe('/readers', () => {
  before(async () => Reader.sequelize.sync());

  beforeEach(async () => {
    await Reader.destroy({ where: {} });
  });

  describe('with no records in the database', () => {
    describe('POST /reader', () => {
      let response;

      beforeEach(async () => {
        response = await request(app).post('/reader').send({
          name: 'Elizabeth Bennet',
          email: 'future_ms_darcy@gmail.com',
          password: 'MrD4rcy<3'
        });
      })
      it('creates a new reader in the database', async () => {
        
        const newReaderRecord = await Reader.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.name).to.equal('Elizabeth Bennet');
        expect(newReaderRecord.name).to.equal('Elizabeth Bennet');
        expect(newReaderRecord.email).to.equal('future_ms_darcy@gmail.com');
        expect(newReaderRecord.password).to.equal('MrD4rcy<3');
      });
      it('has to have a password 8 or more characters long', async () => {
        const badReaderPassword = await request(app).post('/reader').send({
          name: 'Elizabeth Bennet',
          email: 'future_ms_darcy@gmail.com',
          password: 'MrD4rcy'
        });

        expect(badReaderPassword.status).to.equal(400);
        expect(badReaderPassword.body).to.deep.equal({error: 'Password length must be 8 or more characters.'})
      });
      it('returns a 400 if no password is set', async () => {
        const noReaderPassword = await request(app).post('/reader').send({
          name: 'A A Milne',
          email: 'Winnie_The_Pooh@honeypot.co.uk',
          password: ''
        });
        expect(noReaderPassword.status).to.equal(400);
        expect(noReaderPassword.body).to.deep.equal({error: 'Please create a password which must be 8 or more characters.'})
      })
    });
  });

  describe('with records in the database', () => {
    let readers;

    beforeEach(async () => {
      readers = await Promise.all([
        Reader.create({
          name: 'Elizabeth Bennet',
          email: 'future_ms_darcy@gmail.com',
          password: 'MrD4rcy<3',
        }),
        Reader.create({ 
          name: 'Arya Stark',
         email: 'vmorgul@me.com',
          password: 'TheHound'
        }),
        Reader.create({ 
          name: 'Lyra Belacqua',
          email: 'darknorth123@msn.org',
          password: 'DaemonWill'
        }),
      ]);
    });

    describe('GET /reader', () => {
      it('gets all readers records', async () => {
        const response = await request(app).get('/reader');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((reader) => {
          const expected = readers.find((a) => a.id === reader.id);

          expect(reader.name).to.equal(expected.name);
          expect(reader.email).to.equal(expected.email);
        });
      });
    });

    describe('GET /reader/:readerId', () => {
      it('gets readers record by id', async () => {
        const reader = readers[0];
        const response = await request(app).get(`/reader/${reader.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal(reader.name);
        expect(response.body.email).to.equal(reader.email);
        expect(response.body.password).to.equal(reader.password);
      });

      it('returns a 404 if the reader does not exist', async () => {
        const response = await request(app).get('/reader/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The reader could not be found.');
      });
    });

    describe('PATCH /reader/:readerId', () => {
      it('updates readers email by id', async () => {
        const reader = readers[0];
        const response = await request(app)
          .patch(`/reader/${reader.id}`)
          .send({ email: 'miss_e_bennet@gmail.com' });
        const updatedReaderRecord = await Reader.findByPk(reader.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedReaderRecord.email).to.equal('miss_e_bennet@gmail.com');
      });

      it('returns a 404 if the reader does not exist', async () => {
        const response = await request(app)
          .patch('/reader/12345')
          .send({ email: 'some_new_email@gmail.com' });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The reader could not be found.');
      });
    });

    describe('DELETE /reader/:readerId', () => {
      it('deletes reader record by id', async () => {
        const reader = readers[0];
        const response = await request(app).delete(`/reader/${reader.id}`);
        const deletedReader = await Reader.findByPk(reader.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedReader).to.equal(null);
      });

      it('returns a 404 if the reader does not exist', async () => {
        const response = await request(app).delete('/reader/12345');
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The reader could not be found.');
      });
    });
  });
});