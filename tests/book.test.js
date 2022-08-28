const {expect} = require('chai');
const request = require('supertest');
const {Book} = require('../src/models');
const app = require('../src/app');

describe('/book', () => {
    before(async () => Book.sequelize.sync());
    
    beforeEach(async () => {
        await Book.destroy({ where: {} });
});

describe('with no records in the database', () => {
    describe('POST /book', () => {
        let response;

        beforeEach(async () => {
             response = await request(app).post('/book').send({
                title: 'The Northern Lights',
                author: 'Phillip Pullman',
                genre: "Children's",
                ISBN: '10: 0590660543'
            });
        })
        it('creates a new book in the database', async () => {
            const newBookRecord = await Book.findByPk(response.body.id, {
                raw: true,
              });

            expect(response.status).to.equal(201);
            expect(response.body.title).to.equal('The Northern Lights');
            expect(newBookRecord.title).to.equal('The Northern Lights');
            expect(newBookRecord.author).to.equal('Phillip Pullman');
            expect(newBookRecord.genre).to.equal("Children's");
            expect(newBookRecord.ISBN).to.equal('10: 0590660543');
        });
    });

    describe('with records in the database', () => {
        let books;

        beforeEach(async () => {
            books = await Promise.all([
                Book.create({
                    title: 'The Northern Lights',
                    author: 'Phillip Pullman',
                    genre: "Children's",
                    ISBN: '10: 0590660543'
                }),
                Book.create({
                    title: "Winnie the Pooh",
                    author: "A A Milne",
                    genre: "Children's",
                    ISBN: "10000000"
                }),
                Book.create({
                    title: "Harry Potter and the Philospher's Stone",
                    author: "JK Rowling",
                    genre: "Children's",
                    ISBN: "200000000"
                }),
                Book.create({
                    title: "A Thousand Splendid Suns",
                    author: "Khaled Hosseini",
                    genre: "Domestic Fiction",
                    ISBN: "300000000"
                }),
            ]);
        });

    describe('GET /book', () => {
        it('gets all book records', async () => {
            const response = await request(app).get('/book');

            expect(response.status).to.equal(200);
            expect(response.body.length).to.equal(4);
            
            response.body.forEach((book) => {
                const expected = books.find((a) => a.id === book.id);

                expect(book.title).to.equal(expected.title);
                expect(book.author).to.equal(expected.author);
            });
        });
    });

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
});
});
})
