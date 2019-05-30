<template>
    <div id="Login" class="content">
        <div class="backstretch">
            <img src="../assets/bg.jpg"/>
        </div>

        <div class="row login-box">
            <div class="login-wrap">
                <div class="col-md-6 mb-6 login-img"></div>
                <div class="col-md-6 mb-6 login-form col-sm-12">
                    <parent-register-component :user-email="null" :token-id="null" :platform="'manual'"
                                               :email-status="true" :password-status="true"></parent-register-component>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import DataSource from "../data/datasource";
    import parentRegisterComponent from "../components/Parent_Register_Component";

    export default {
        name: 'parentRegister',
        data() {
            return {
                results: "",
                userEmail: "",
                userPassword: "",
                studentID_Index: "",
                studentDOB: "",
                studentIDType: "",
                studentIDNo: "",
                error: "",
                isLoading: false,
                redirecting: ""
            };
        },
        methods: {
            /*async onSubmit() {
                this.error = "";
                //this.results = "<< Requesting.. >>";
                try {
                    this.isLoading = true;
                    const response = await DataSource.shared.parentRegister(this.userEmail, this.userPassword, this.studentIDNo, this.studentID_Index, this.studentDOB, this.studentIDType);
                    this.isLoading = false;
                    console.log(response);
                    if (response) {
                        switch (response.code) {
                            case "1":
                                this.results = `Registration Success`;
                                this.redirecting = true;
                                //this.results = `Login Success - ${JSON.stringify(response)}`;
                                window.location.replace("/login");
                                break;
                            case "2":
                                this.results = `Invalid Student Info`;
                                //this.results = `Invalid User Name - sample 1:${JSON.stringify(response)}`;
                                break;
                            case "3":
                                this.results = `Existing Account`;
                                //this.results = `Invalid password - sample 2: code: ${response.code}`;
                                break;
                            case "99":
                                this.results = `Please try again later`;
                                //this.results = `Please fill in all field - sample 3: code: ${response.code}`;
                                break;
                        }
                    }
                    console.log(results);
                } catch (e) {
                    console.log("error", error);
                    this.error = e;
                    this.isLoading = false;
                }

            },*/
        },
        components: {parentRegisterComponent}
    };


</script>

<style scoped>
    .backstretch img{
        width: 100%;
    }
</style>
<style>
    .parent-register div#parentx-static,
    .parent-register header {
        display: none;
    }
</style>