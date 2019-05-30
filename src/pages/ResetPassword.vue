<template>
    <div id="resetPassword" class="content">
        <div class="backstretch">
            <img src="../assets/bg.jpg"/>
        </div>

        <div class="row login-box">
            <div class="resetlink-wrap">
                <div class="col-md-12 mb-6 login-form col-sm-12">
                    <div class="login-header mb-5 row">
                        <div class="col-md-10">
                            <h4 class="mb-3 text-muted">Reset Password</h4><br/>
                            <span>Your password needs to have at least one symbol or number, <br/>and have at least 8 characters.</span>
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

                            <div class="mb-3 form-group" :class="{ 'form-group--error': $v.userPassword.$error }">
                                <input type="password" class="form-control" id="userPassword" v-model="userPassword"
                                       placeholder="New Password"
                                       v-model.trim="$v.userPassword.$model">
                            </div>
                            <div class="error" v-if="!$v.userPassword.required">Password is required</div>
                            <div class="error" v-if="!$v.userPassword.minLength">Password must have at least 6 letters.</div>


                            <div class="mb-3 form-group" :class="{ 'form-group--error': $v.otp.$error }">
                                <input type="text" class="form-control" id="otp" v-model="otp"
                                       placeholder="OTP"
                                       v-model.trim="$v.otp.$model">
                            </div>
                            <div class="error" v-if="!$v.otp.required">OTP is required</div>

                            <div class="system-msg"><p>{{results}}</p></div>
                            <div class="row d-flex mt-3 mb-5">
                                <div class="col-md-12">
                                    <button class="btn btn-primary btn-lg btn-block login-btn" type="submit" v-show="isLoading===false">
                                        Submit
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
    import { required, minLength, email } from 'vuelidate/lib/validators'

    export default {
        name: 'ResetPassword',
        data() {
            return {
                results: "",
                userEmail: "",
                userPassword: "",
                otp: "",
                isLoading: false,
            };
        },
        validations: {
            userEmail: {
                required,
                email
            },
            userPassword: {
                required,
                minLength: minLength(6)
            },
            otp: {
                required
            }
        },
        methods: {
            async onSubmit() {
                //this.results = "<< Requesting.. >>";
                try {
                    this.isLoading = true;
                    const response = await DataSource.shared.resetPassword(this.userEmail, this.userPassword, this.otp);
                    this.isLoading = false;
                    if (response) {
                        switch (response.code) {
                            case "1":
                                window.location.replace("/login");
                                this.results = `Password Reset`;
                                //this.results = `Invalid User Name - sample 1:${JSON.stringify(response)}`;
                                break;
                            case "2":
                                this.results = `Invalid OTP`;
                                //this.results = `Invalid User Name - sample 1:${JSON.stringify(response)}`;
                                break;
                            case "3":
                                this.results = `OTP Expired`;
                                //this.results = `Invalid password - sample 2: code: ${response.code}`;
                                break;
                            case "99":
                                this.results = `Please Try Again`;
                                //this.results = `Please fill in all field - sample 3: code: ${response.code}`;
                                break;
                        }
                    }
                } catch (e) {
                    this.results = e;
                    this.isLoading = false;
                }
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
    .resetPassword header {
        display: none;
    }
</style>
