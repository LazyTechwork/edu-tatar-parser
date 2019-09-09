*work in progress, any feature described below might not work*

# edu-tatar-parser

**edu-tatar-parser** is a tool which provides convenient api for [edu.tatar](https://edu.tatar.ru) website

## Installation

### Using Docker

1. `docker build -t edu-tatar-parser .`
1. `docker run -p 8000:8000 edu-tatar-parser`

### Manual installation

1. `cd edu-tatar-parser`
1. `npm i`
1. `./node_modules/.bin/webpack-cli`
1. `node index.js`

## Usage

### Methods

Each method requires `login` and `password` query selectors. For example:

`http://localhost/marks/table?login=519000000&password=123`

- `/status` - return status of the service
- `/marks/table` - return student's marks table
- `/user/info` - return user's info
