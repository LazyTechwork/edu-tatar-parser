<template>
	<div>
		<signin-form
			v-if="!authed"
			@auth-successful="onAuthSuccess"
		></signin-form>
		
        <div
            class="marks"
            v-if="authed"
        >
    		<marks-table
    			v-bind:lessons="marks"
    		></marks-table>
            <button v-on:click="logout">Выйти</button>            
        </div>
	</div>
</template>

<script>
    const credentials = require("../js/credentials");

    export default {
        data() {
        	return {
        		authed: false,
        		marks: []
        	}
        },
        methods: {
        	onAuthSuccess(data) {
        		console.log(data);

        		this.authed = true;
        		this.marks = data.marks;

                credentials.set(data.credentials);
        	},
            logout() {
                this.authed = false;
                credentials.remove();
            }
        },
        mounted() {
            if (credentials.has()) {
                this.authed = true;

                axios.get("/marks/table", {
                    params: credentials.get()
                }).then(response => {
                    this.marks = response.data.response;
                })
                .catch(error => {
                    this.authed = false;
                });
            }
        }
    }
</script>