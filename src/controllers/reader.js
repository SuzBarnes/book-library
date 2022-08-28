const {Reader} = require('../models');

exports.create= async (req, res) => {
    const newReader = await Reader.create(req.body);
    const newReaderPassword = newReader.dataValues.password;
    if(!newReaderPassword){
        res.status(400).json({error: 'Password length must be 8 or more characters.'})
    } else if (newReaderPassword.length < 8){
        res.status(400).json({error: 'Password length must be 8 or more characters.'})
    } else {
    res.status(201).json(newReader);
    }
};

exports.read= async(req, res) => {
    const readers = await Reader.findAll();
    res.status(200).json(readers);
};

exports.readById = async(req, res) => {
    const {readerId} = req.params;
    // console.log(readerId)
    try {const reader = await Reader.findByPk(readerId);
        
    if (!reader){
        res.status(404).send({error: 'The reader could not be found.'})
    } else {
        res.status(200).send(reader)
    }
} catch(err){res.sendStatus(500)}
}

exports.update = async(req, res) => {

    const {readerId} = req.params;
    const updateDataEmail = {email: req.body.email};

    // const updateDataName = req.body.name
    // console.log(updateDataEmail);
    // console.log(readerId)
    try {const [updatedRows] = await Reader.update(updateDataEmail, {where:{id: readerId}});
    // console.log(updatedRows)
    if (!updatedRows){
        res.status(404).send({error: 'The reader could not be found.'})
    } else {
    res.status(200).send({message:'The email-address has been updated.'})
}
}catch(err) {res.sendStatus(500)}
};

exports.delete = async (req, res) => {
 const {readerId} = req.params;
 console.log(readerId);
  try{
    const deletedRows = await Reader.destroy({ where:{id: readerId}});
    console.log(deletedRows)
        if(!deletedRows){
            res.status(404).send({error: 'The reader could not be found.'})
        } else {
            res.status(204).send({message: 'The record has been deleted.'})
        }
  } catch(err){
    res.sendStatus(500);
  }
}