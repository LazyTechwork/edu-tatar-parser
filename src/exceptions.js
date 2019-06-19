module.exports.NoCredentialsException = function() {
	this.message = "No credentials. Make sure you've specified `login` and `password` fields";
	this.statusCode = 403;
};