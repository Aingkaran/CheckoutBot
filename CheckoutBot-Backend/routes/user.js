const express = require('express');

const router = express.Router();

const { register } = require("../controller/register");

const { login } = require("../controller/login");
const { newCreditCard } = require("../controller/newCreditCard");
const { getCreditCard } = require("../controller/getCreditCard");
const { verifyToken } = require("../controller/authMiddleware");
const { addProxy } = require("../controller/addProxy");


const { getProxyList } = require("../controller/getProxyList")


router.post('/register', register);

router.post('/login', login);
router.post('/newCreditCard', verifyToken, newCreditCard);
router.get('/creditcard/:user_id', verifyToken, getCreditCard)
router.post('/proxy', verifyToken, addProxy);
router.get('/proxy/:user_id', verifyToken, getProxyList);


module.exports = router;