const {Router} = require("express");
const AuthController = require("../controllers/authController");

const route = Router();

route.get('/signup', AuthController.signup_get);
route.get('/login', AuthController.login_get);
route.post('/signup', AuthController.signup_post);
route.post('/login', AuthController.login_post);
route.get('/logout', AuthController.logout_get);


module.exports = route;