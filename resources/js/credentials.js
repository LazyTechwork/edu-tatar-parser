module.exports = {
	has() {
	    try {
	        let creds = localStorage.getItem("credentials");
		    let {login, password} = JSON.parse(creds);

	        if (login != null && password != null)
	            return true;

	    } catch {}

	    return false;
	},

	set(creds) {
	    creds = JSON.stringify(creds);
	    localStorage.setItem("credentials", creds);
	},

	get() {
	    let creds = localStorage.getItem("credentials");
	    return JSON.parse(creds);
	},

	remove() {
	    localStorage.setItem("credentials", null);
	}
}
