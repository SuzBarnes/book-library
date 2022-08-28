const {Book} = require('../models');

 exports.create =  async(req, res) => {
    const newBook = await Book.create(req.body);
    try { res.status(201).json(newBook);
    } catch (err){
        res.sendStatus(500).json(err)}
 };

 exports.read = async (req, res) => {
    const allBooks = await Book.findAll();
    try{
        res.status(200).json(allBooks);
    } catch(err){
        res.sendStatus(500).json(err)
    }
 }