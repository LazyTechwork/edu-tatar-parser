const request = require('./request.js');
const EduTatarConnection = require("./EduTatarConnection.js");
const StudentParser = require("./StudentParser.js");

class EduTatarClient {
    constructor({url}) {
        this.url = url;
    }

    async info() {
        let {response} = await request.get(this.url);

        return {
            url: this.url,
            status: response.statusMessage
        };
    }

    async getUserConnection(login, password) {
        let jar = request.jar();
        await request.post({
            url: "https://edu.tatar.ru/logon",
            form: {
                "main_login": login,
                "main_password": password
            },
            headers: {
                "Referer": this.url,
                "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"
            },
            followAllRedirects: true,
            jar
        });

        return new EduTatarConnection({
            url: this.url,
            jar,
            login
        });
    }

    async getStudent(login, password) {
        let conn = await this.getUserConnection(login, password);
        return new StudentParser(conn);
    }
}

module.exports = EduTatarClient;