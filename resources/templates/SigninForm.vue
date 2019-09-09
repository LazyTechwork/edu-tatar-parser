<template>
    <div>
        <div>
            login: <input type="text" v-model="login">
        </div>
        
        <div>
            password: <input type="password" v-model="password">
        </div>

        <button
            v-on:click="check_auth"
        >
            Signin
        </button>
    
    </div>
</template>

<script>
    export default {
        data() {
            return {
                login: '',
                password: ''
            }
        },
        methods: {
            check_auth() {
                let login = encodeURI(this.login);
                let password = encodeURI(this.password);

                if (!password || !login) {
                    alert("No login or password");
                    return;
                }

                axios.get("/marks/table", {
                    params: {
                        login, password
                    }
                }).then(response => {
                    this.$emit(
                        'auth-successful',
                        {
                            marks: response.data.response,
                            credentials: {login, password}
                        }
                    );
                })
                .catch(error => {
                    if (error.response.status == 403)
                        alert("Wrong password");
                    else
                        alert("Unknown error");
                });
            }
        }
    }
</script>