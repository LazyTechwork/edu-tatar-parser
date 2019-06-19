class StudentParser {
	constructor(conn) {
		this.conn = conn;
	}

	async getMarks() {
		let page = await this.conn.getPage("/user/diary/term");
		let body = (/<tbody>([^]+)<\/tbody>/g).exec(page);
		body = body[0];

		let row;
		let p = /<tr>([^]+?)<\/tr>/g;
		let lessons = [];
		while ((row = p.exec(body)) !== null)
			lessons.push(row[0]);

		lessons.pop();
		lessons = lessons.map(row => {
			let title = (/<td>([^]+?)<\/td>/).exec(row)[1];
			let marks = [];
			let p = /<td>(\d+)<\/td>/g;
			let mark;
			while ((mark = p.exec(row)) !== null)
				marks.push(mark[1]);

			marks = marks.map(x => parseInt(x)).filter(x => x != NaN);
		
			return {title, marks};
		});

		return lessons;
	}
}
	
module.exports = StudentParser;