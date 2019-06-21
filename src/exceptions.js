module.exports.NoCredentialsException = function() {
	this.message = "No credentials. Make sure you've specified `login` and `password` fields";
	this.statusCode = 401;
};

module.exports.WrongCredentialsException = function() {
	this.message = "Login or password is incorrect";
	this.statusCode = 403;
};