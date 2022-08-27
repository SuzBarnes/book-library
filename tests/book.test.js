// const {expect} = require('chai');
// const request = require('supertest');
// const {Book} = require('../src/models/book');
// const app = require('../src/app');

// describe('/book', () => {
//     before(async () => Book.sequelize.sync());
    
//     beforeEach(async () => {
//         await Book.destroy({ where: {}});
// });

// describe('with no records in the database', () => {
//     describe('POST /book', () => {
//         let response;

//         beforeEach(async () => {
//             response = await response(app).post('/book').send({
//                 title: 'The Northern Lights',
//                 author: 'Phillip Pullman',
//                 genre: "Children's",
//                 ISBN: '10: 0590660543'
//             });
//         })
//         it('creates a new book in the database', async () => {
//             const newBookRecord = await Book.findByPk(response.body.id, {
//                 raw:true,
//             });

//             expect(response.status).to.equal(201);
//             expect(response.body.title).to.equal('The Northern Lights');
//             expect(newBookRecord.title).to.equal('The Northern Lights');
//             expect(newBookRecord.author).to.equal('Phillip Pullman');
//             expect(newBookRecord.genre).to.equal("Children's");
//             expect(newBookRecord.ISBN).to.equal('10: 0590660543');
//         });

//     // describe('with records in the database', () => {

//     // })

// //     describe('GET /book', () => {
// //         xit('gets all book records', async () => {

// //         });
// //     });

// //     describe('GET /book/:bookId', () => {
// //         xit('gets book records by id', async () => {

// //         });
// //         xit('returns a 404 if the reader does not exist', async () => {

// //         })
// //     })

// //     describe('PATCH /book/:bookId', () => {
// //         xit('updates book author by id', async () => {

// //         });
// //         xit('returns a 404 if the book does not exist', async () => {

// //         })
// //     })

// //     describe('DELETE /book/:bookId', () => {
// //         xit('deletes book record by id', async () => {

// //         });
// //         xit('returns a 404 if the book does not exist', async () => {

// //         })
// //     })
// });
// });
// })