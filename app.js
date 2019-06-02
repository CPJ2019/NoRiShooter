const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const userRouter = require('./router/user.js');
const indexRouter = require('./router/index.js');
const tukuRouter = require('./router/tuku.js');
var server = express();
server.listen(8080);
console.log('服务器启动完成');
// server.use(cookieParser);
// server.use(session({
// 	secret: "hello",
// 	cookie: { maxAge: 60 * 60 * 1000 * 24 },
// 	resave: true,
// 	saveUninitialized: true
// }));
server.use(express.static('public'));
server.use(bodyParser.urlencoded({
	extended: false
}));
server.use('/user', userRouter);
server.use('/', indexRouter);
server.use('/tuku', tukuRouter);
