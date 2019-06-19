const request = require('./request.js');

class EduTatarConnection {
    constructor({url, jar, login}) {
        this.url = url;
        this.jar = jar;
        this.login = login;
    }

    async getPage(url) {
        let res = await request.get({
            url: this.url + url,
            headers: {
                "Referer": this.url,
                "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"
            },
            jar: this.jar
        });
        return res.body;
    }
}

module.exports = EduTatarConnection;