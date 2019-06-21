const vue = new Vue({
	el: '#app',
	data: {
		state: 'login',
		login: '',
		password: '',
		table: [],
	},
	methods: {
		doLogin: function() {
			let login = encodeURI(this.login);
			let password = encodeURI(this.password);

			if (!password || !login) {
				alert("No login or password");
				return;
			}

			axios.get("/marks/table", {
				params: {
					login, password
				}
			}).then(response => {
				this.table = response.data.response;
				this.state = "main";
			}) 
			.catch(error => {
				if (error.response.status == 403)
					alert("Wrong password");
				else
					alert("Unknown error");
			});
		}
	}
})