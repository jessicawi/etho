<template>
    <div id="resetPassword" class="content">
        <div class="backstretch">
            <img src="../assets/bg.jpg"/>
        </div>
        <!--<div class="pb-5">-->
        <!--<h2>Login Test</h2>-->
        <!--<p class="lead">Fill in the form and submit to get the response from the server.</p>-->
        <!--</div>-->

        <div class="row login-box">
            <div class="resetlink-wrap">
                <div class="col-md-12 mb-6 login-form col-sm-12">
                    <div class="login-header mb-5 row">
                        <div class="col-md-10">
                            <h4 class="mb-3 text-muted">Reset Password</h4><br/>
                            <span>Enter the email address associated with your account, <br/>and we’ll email you a link to reset your password.</span>
                        </div>
                        <div class="col-md-2 pl-0 pr-0">
                            <img src="../assets/kagami.jpg"/>
                        </div>
                    </div>
                    <div class="reset-content">
                        <form class="needs-validation" novalidate @submit.prevent="onSubmit">

                            <div class="mb-3 form-group" :class="{ 'form-group--error': $v.userEmail.$error }">
                                <input type="email" class="form-control" id="userEmail" v-model="userEmail"
                                       placeholder="Email Address"
                                       v-model.trim="$v.userEmail.$model">
                            </div>
                            <div class="error" v-if="!$v.userEmail.required">Email is required</div>
                            <div class="error" v-if="!$v.userEmail.email">Enter a valid email</div>
                            <tree-view :data="$v.userEmail"
                                       :options="{rootObjectKey: '$v.userEmail', maxDepth: 2}"></tree-view>

                            <div class="system-msg"><p>{{results}}</p></div>
                            <div class="row d-flex mt-3 mb-5">
                                <div class="col-md-12">
                                    <button class="btn btn-primary btn-lg btn-block login-btn" type="submit" v-show="isLoading===false" :class="{ 'd-none': redirecting===true }">
                                        Send Reset Link
                                    </button>
                                    <div class="loading" v-if="isLoading===true">
                                        <div class="load-3">
                                            <div class="line"></div>
                                            <div class="line"></div>
                                            <div class="line"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import DataSource from "../data/datasource";
    import {required, email} from 'vuelidate/lib/validators';

    export default {
        name: 'ResetEmail',
        data() {
            return {
                results: "",
                isLoading: false,
                userEmail: "",
                redirecting: ""
            };
        },
        validations: {
            userEmail: {
                required,
                email
            }
        },
        methods: {
            async onSubmit() {
                //this.results = "<< Requesting.. >>";
                try {
                    this.isLoading = true;
                    const response = await DataSource.shared.resetEmailPassword(this.userEmail);
                    this.isLoading = false;
                    if (response) {
                        switch (response.code) {
                            case "1":
                                this.results = ` A link to reset your password has been sent to ${this.userEmail}, redirecting to reset password session..`;
                                setTimeout(this.otpFillLink, 3000); // 3 hours
                                this.redirecting = true;
                                //this.results = `Invalid User Name - sample 1:${JSON.stringify(response)}`;
                                break;
                            case "2":
                                this.results = `Email not found`;
                                //this.results = `Invalid User Name - sample 1:${JSON.stringify(response)}`;
                                break;
                            case "99":
                                this.results = `Email is required`;
                                //this.results = `Please fill in all field - sample 3: code: ${response.code}`;
                                break;
                        }
                    }
                } catch (e) {
                    this.results = e;
                    this.isLoading = false;
                }
            },
            otpFillLink() {
                window.location.replace("/reset-password");
            },
        }


    };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .topbar {
        display: none;
    }






</style>

<style>
    .resetEmail header {
        display: none;
    }
</style>
