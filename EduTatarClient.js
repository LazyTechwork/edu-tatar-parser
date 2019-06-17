class EduTatarClient {
	constructor({url}) {
		this.url = url;
	}

	async info() {
		return {
			url: this.url,
			status: "ok"
		};
	}
}

module.exports = EduTatarClient;