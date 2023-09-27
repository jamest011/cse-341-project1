const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req,res) => {
    //#swagger.tags['Contacts']
    mongodb
    .getDb()
    .db()
    .collection('contacts')
    .find()
    .toArray((err, lists) => {
        if (err) {
            res.status(400).json({message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = (req,res) => {
    //#swagger.tags['Contacts']
    const userID = new ObjectId(req.params.id);
    mongodb
    .getDb()
    .db()
    .collection('contacts')
    .find({_id: userId })
    .toArray((err, result) => {
        if (err) {
            res.status(400).json({message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    });
};

const createContact = async (req,res) => {
    //#swagger.tags['Contacts']
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};

const updateContact = async (req,res) => {
    //#swagger.tags['Contacts']
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};

const deleteContact = async (req,res) => {
    //#swagger.tags['Contacts']
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the user.');
    }
};

const


module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};