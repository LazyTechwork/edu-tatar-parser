const App = require("./src/app.js");
const app = new App({
	port: process.env.PORT || 8000,
	eduTatarUrl: "https://edu.tatar.ru"
});

app.listen();