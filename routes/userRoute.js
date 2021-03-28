'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const app = express();


router.get('/wee', userController.user_list_get);

router.get('/:id', userController.user_get);

router.post('/', (req, res) => {
    console.log('helo');
    console.log(req.body);
    res.json(req.body)
});
router.put('/put', (req, res) => {
    res.send('With this endpoint you can edit users')
});
router.delete('/delete', (req, res) => {
    res.send('With this endpoint you can delete users')
});

module.exports = router;
