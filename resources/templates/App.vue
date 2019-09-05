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
    export default {
        data() {
        	return {
        		authed: false,
        		marks: []
        	}
        },
        methods: {
        	onAuthSuccess(data) {
        		this.authed = true;
        		console.log(data);
        		this.marks = data;
        	}
        }
    }
</script>