const { response } = require('express');

const getUser = (req, res = response) => {
    const { id = 5 } = req.params;
    if(id) {
        res.status(200).json({
            id
        });
    }else {
        res.status(300).json({
            msg: 'Id Required.'
        });
    }
}

const createUser = (req, res = response) => {
    const { id = 100, name = 'juan', age = 24} = req.query;
    if(id && name && age ) {
        res.status(201).json({
            id,
            name,
            age
        });
    }else {
        res.status(300).json({
            msg: 'Id, name and age Required.'
        });
    }
}

const updateUser = (req, res = response) => {
    const { id = 7} = req.params;
    if(id) {
        res.status(202).json({
            id,
            msg: 'Succesfully updated.'
        });
    }else {
        res.status(300).json({
            msg: 'Id Required.'
        });
    }
}

const patchUser = (req, res = response) => {
    const { id = 7} = req.params;
    if(id) {
        res.status(201).json({
            id,
            msg: 'Succesfully patched.'
        });
    }else {
        res.status(300).json({
            msg: 'Id Required.'
        });
    }
}

const deleteUser = (req, res = response) => {
    const { id = 7} = req.params;
    if(id) {
        res.status(200).json({
            id,
            msg: 'Succesfully deleted.'
        });
    }else {
        res.status(300).json({
            msg: 'Id Required.'
        });
    }
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    patchUser,
    deleteUser
}