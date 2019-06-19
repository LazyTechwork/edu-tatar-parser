*work in progress, any feature described below might not work*

# edu-tatar-parser

**edu-tatar-parser** is a tool which provides convenient api for [edu.tatar](https://edu.tatar.ru) website

## Installation

### Using Docker

1. `docker pull pomah3/edu-tatar-parser`
1. `docker run -d -p 8000:8000 -t pomah3/edu-tatar-parser`

### Using Heroku

1. fork this repo
1. make heroku app and specify your repo in the app's settings

### Manual installation

1. make sure you have *nodejs* and *npm* installed
1. `git clone https://github.com/pomah3/edu-tatar-parser.git`
1. `cd edu-tatar-parser`
1. `npm i`
1. `node index.js`

## Usage

Each method requires `login` and `password` query selectors. For example:

`http://localhost/marks/table?login=519000000&password=123`

### marks
- `marks/table` - return student's marks table

### user
- `user/info` - return user's info
