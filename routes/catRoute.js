'use strict';
const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: './uploads/' });
const catController = require('../controllers/catController');
const cat = require('../database/model');

router.route('/')
    .post(async (req, res) => {
        const post = await cat.create({
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            color: req.body.color,
            weight: req.body.weight
        });
        res.send(`cat post ${post.name} created with id: ${post._id}`);
    })
    .get(async (req, res) => {

        let cats = {};

        if(req.query.weight){
           const catsWithWeight = await cat.find({}).where('weight').gt(req.query.weight);
           cats = {...cats, ...catsWithWeight}
        }
        if(req.query.age){
            const catsWithAge = await cat.find({}).where('age').gt(req.query.age);
            cats = {...cats, ...catsWithAge}
        }
        if(req.query.gender){
            const catsWithGender = await cat.find({}).where('gender').equals(req.query.gender);
            cats = {...cats, ...catsWithGender}
        }
        if(!req.query.gender && !req.query.weight && !req.query.age){
            cats = await cat.find()
        }
        res.send(cats)
    });

router.route('/:id')
    .get(async (req, res) => {
        res.send(await cat.findById(req.params.id));
    })
    .patch(async (req, res) => {
        const mod = await cat.updateOne({ _id: req.params.id }, { title: req.body.name });
        res.status(200).send(`updated sucessfully ${mod.nModified} cat post`);
    })
    .delete(async (req, res) => {
        const del = await cat.deleteOne({ _id: req.params.id });
        res.send(`deleted ${del.deletedCount} cat post`);
    });

module.exports = router;
