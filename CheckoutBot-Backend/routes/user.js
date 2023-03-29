const express = require('express');

const router = express.Router();

const { register } = require("../controller/register");

const { login } = require("../controller/login");
const { newCreditCard } = require("../controller/newCreditCard");
const { getCreditCard } = require("../controller/getCreditCard");
const { verifyToken } = require("../controller/authMiddleware");
const { addProxy } = require("../controller/addProxy");
const { proxyTest } = require("../controller/proxyTest");
const { deleteProxy } = require("../controller/deleteProxy");
const { deleteCreditCard } = require("../controller/deleteCreditCard");


const { getProxyList } = require("../controller/getProxyList")


router.post('/register', register);

router.post('/login', login);
router.post('/creditcard', verifyToken, newCreditCard);
router.get('/creditcard/:user_id', verifyToken, getCreditCard)
router.post('/proxy', verifyToken, addProxy);
router.get('/proxy/:user_id', verifyToken, getProxyList);
router.post('/proxytest', verifyToken, proxyTest);
router.delete('/proxy', verifyToken, deleteProxy);
router.delete('/creditcard', verifyToken, deleteCreditCard);


module.exports = router;