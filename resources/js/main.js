require("./utils");

window.Vue = require('vue').default;
window.axios = require('axios');

const files = require.context('../templates', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

window.app = new Vue({
	el: '#app'
});
