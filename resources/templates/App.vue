<template>
	<div>
		<signin-form
			v-if="!authed"
			@auth-successful="onAuthSuccess"
		></signin-form>
		
		<marks-table
			v-if="authed"
			v-bind:lessons="marks"
		></marks-table>
	</div>
</template>

<script>
    function has_credentials() {
        try {
            let {login, password} = get_credentials("credentials");
            if (login != null && password != null)
                return true;
        } catch {}

        return false;
    }

    function set_credentials(creds) {
        creds = JSON.stringify(creds);
        localStorage.setItem("credentials", creds);
    }

    function get_credentials() {
        let creds = localStorage.getItem("credentials");
        return JSON.parse(creds);
    }

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

                set_credentials(data.credentials);
        	},
        },
        mounted() {
            this.authed = true;

            if (has_credentials()) {
                axios.get("/marks/table", {
                    params: get_credentials()
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