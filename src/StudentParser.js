class StudentParser {
	constructor(conn) {
		this.conn = conn;
	}

	async getMarks() {
        let page = await this.conn.getPage("/user/diary/term");
        return this.parseMarks(page);
	}

	async getInfo() {
		let page = await this.conn.getPage("/");
        return this.parseInfo(page);
	}

    parseMarks(page) {
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

    parseInfo(page) {
        let body = (/<table class="tableEx">([^]+)<\/table>/g).exec(page)[0];

        let row_p = /<tr>([^]+?)<\/tr>/g;
        let rows = [];
        let row;

        const fix_str = str => str.replace(/<[^>]*>?/gm, '').replace(':', '').trim();

        while ((row = row_p.exec(body)) !== null) {
            row = row[1];
            let p = /<td[^]*?>([^]*?)<\/td>/g
            let key = fix_str(p.exec(row)[1]);
            let value = fix_str(p.exec(row)[1]);

            if (!value)
                continue;

            rows.push({key, value});
        }

        return rows;
    }
}

module.exports = StudentParser;
