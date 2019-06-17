const app = require("express")();

const EduTatarClient = require("./EduTatarClient.js");
const client = new EduTatarClient({
	url: "https://edu.tatar.ru"
});

app.get('/', async (req, res) => {
	let info = await client.info();
	res.json(info);
});

app.get('/marks', async (req, res) => {
	let {login, password} = req.query;
	if (!login || !password) {
		res.status(403);
		res.json({
			error: "no login or password fields"
		});
		return;
	}

	res.json({
		'user': login,
		'marks': [4,3,3,2]
	});
});

app.listen(8000);

