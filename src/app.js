const express = require("express");
const EduTatarClient = require("./EduTatarClient.js");

const {NoCredentialsException} = require("./exceptions.js");

function successHandler(req, res, next) {
	res.success = info => res.json({
		'status': 'ok',
		'response': info
	});
	next();
}

function errorHandler(err, req, res, next) {
	let statusCode = err.statusCode || 500;
	res.status(statusCode);
	res.json({
		'status': 'error',
		'error': err.message,
		'code': statusCode,
		'stack': err.stack
	});
}

function checkCredentials(req, res, next) {
	let {login, password} = req.query;
	if (!login || !password)
		throw new NoCredentialsException;

	req.login = login;
	req.password = password;
	next();
}

class App {
	constructor({port, eduTatarUrl}) {
		this.port = port;
		this.eduTatarUrl = eduTatarUrl;

		this.client = new EduTatarClient({
			url: eduTatarUrl
		});

		this.app = express();
		this.app.use(successHandler);
		this.makeRoutes();
		this.app.use(express.static('public'));
		this.app.use(errorHandler);
	}

	makeRoutes() {
		this.app.get('/', this.getRoute("infoRoute"));
		this.app.get('/marks/table', checkCredentials, this.getRoute("marksTableRoute"));
		this.app.get('/user/info', checkCredentials, this.getRoute("userInfoRoute"));
	}

	getRoute(method) {
		let f = this[method].bind(this);
		let fn = (req, res, next) => {
			Promise
				.resolve(f(req,res,next))
				.catch(next);
		}

		return fn;
	}

	async infoRoute(req, res) {
		let info = await this.client.info();
		res.success(info);
	}

	async marksTableRoute(req, res) {
		let student = await this.client.getStudent(
			req.login, req.password
		);
		res.success(await student.getMarks());
	}

	async userInfoRoute(req, res, next) {
		let student = await this.client.getStudent(
			req.login, req.password
		);

		res.json(await student.getInfo());
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("Server started on port " + this.port);
		});
	}
}

module.exports = App;