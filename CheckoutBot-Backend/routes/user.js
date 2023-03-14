const express = require('express');

const router = express.Router();

const { register } = require("../controller/register");

const { login } = require("../controller/login");
const { newCreditCard } = require("../controller/newCreditCard");


router.post('/register', register);

router.post('/login', login);
router.post('/newCreditCard', newCreditCard);

module.exports = router;