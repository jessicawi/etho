<template>
    <div id="Login" class="content">
        <div class="backstretch">
            <img src="../assets/bg.jpg"/>
        </div>
        <!--<div class="pb-5">-->
        <!--<h2>Login Test</h2>-->
        <!--<p class="lead">Fill in the form and submit to get the response from the server.</p>-->
        <!--</div>-->

        <div class="row login-box">
            <div class="login-wrap">
                <div class="col-md-6 mb-6 login-img"></div>
                <div class="col-md-6 mb-6 login-form col-sm-12">
                    <div class="login-header mb-5 row">
                        <div class="col-md-10">
                            <h4 class="mb-3 text-muted">Login</h4>
                            <span>Don't have an account? <a href="/register/parent">Find out how</a> </span>
                        </div>
                        <div class="col-md-2 pl-0 pr-0">
                            <img src="../assets/kagami.jpg"/>
                        </div>
                    </div>

                    <el-alert
                            title="Welcome Back"
                            type="success"
                            :description="results"
                            show-icon
                            class="mt-3 mb-3"
                    v-if="results !== false && errorresults === false">
                    </el-alert>
                    <el-alert
                            title=""
                            type="error"
                            :description="errorresults"
                            show-icon
                            class="mt-3 mb-3"
                            v-if="errorresults !== false && results === false">
                    </el-alert>
                    <form class="needs-validation" @submit.prevent="onSubmit">

                        <div class="mb-3" :class="{ 'form-group--error': $v.usernameInput.$error }">
                            <!--<label for="username">Username</label>-->
                            <vs-input label-placeholder="Email ID" class="form-control text-left" id="username"
                                      v-model="usernameInput" v-model.trim="$v.usernameInput.$model"/>
                            <div class="invalid-feedback" style="width: 100%;">
                                Your username is required.
                            </div>
                            <div class="error" v-if="!$v.usernameInput.required">Username is required</div>
                        </div>

                        <div class="mb-2" :class="{ 'form-group--error': $v.passwordInput.$error }">
                            <!--<label for="password">Password</label>-->
                            <vs-input type="password" label-placeholder="Password" class="form-control text-left"
                                      id="password" v-model="passwordInput" v-model.trim="$v.passwordInput.$model"/>
                            <div class="error" v-if="!$v.passwordInput.required">Password is required</div>
                        </div>
                        <small class="d-block text-left">By signing in, you accept the terms found in our <a href="">Trust
                            Centre</a></small>
                        <!--<div class="system-msg"><p>{{results}}</p></div>-->
                        <div class="row d-flex mt-3 mb-5">
                            <div class="col-md-6"></div>
                            <div class="col-md-6">
                                <button class="btn btn-primary btn-lg btn-block login-btn" type="submit">
                                    Login
                                </button>
                                <small><a href="/reset-email">Forgot password</a></small>
                            </div>
                        </div>
                    </form>
                    <div class="social-login" style="display: none;">
                        <div id="google-signin-button"></div>
                        <button id="btn_FBLogin" @click="loginFB">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 216" class="_5h0m" color="#FFFFFF">
                                <path fill="#FFFFFF" d="
          M204.1 0H11.9C5.3 0 0 5.3 0 11.9v192.2c0 6.6 5.3 11.9 11.9
          11.9h103.5v-83.6H87.2V99.8h28.1v-24c0-27.9 17-43.1 41.9-43.1
          11.9 0 22.2.9 25.2 1.3v29.2h-17.3c-13.5 0-16.2 6.4-16.2
          15.9v20.8h32.3l-4.2 32.6h-28V216h55c6.6 0 11.9-5.3
          11.9-11.9V11.9C216 5.3 210.7 0 204.1 0z"></path>
                            </svg>
                            Facebook
                        </button>
                    </div>
                    <!--<button @click="logoutall">Logout all</button>-->
                    <!--<div class="social-wrap row">-->
                    <!--<div class="col-md-6 pr-2">-->
                    <!--<a class="social-item facebook">-->
                    <!--<i class="fa fa-facebook" aria-hidden="true"></i>-->
                    <!--<span>Connect with Facebook</span>-->
                    <!--</a>-->
                    <!--</div>-->
                    <!--<div class="col-md-6 pl-2">-->
                    <!--<a class="social-item twitter">-->
                    <!--<i class="fa fa-twitter" aria-hidden="true"></i>-->
                    <!--<span>Connect with Twitter</span>-->
                    <!--</a>-->
                    <!--</div>-->
                    <!--<div class="col-md-6 pr-2">-->
                    <!--<a class="social-item linkedin">-->
                    <!--<i class="fa fa-linkedin" aria-hidden="true"></i>-->
                    <!--<span>Connect with Linkedin</span>-->
                    <!--</a>-->
                    <!--</div>-->
                    <!--<div class="col-md-6 pl-2">-->
                    <!--<a class="social-item google">-->
                    <!--<i class="fa fa-google-plus" aria-hidden="true"></i>-->
                    <!--<span>Connect with Google +</span>-->
                    <!--</a>-->
                    <!--</div>-->
                    <!--</div>-->
                </div>
            </div>
        </div>

        <b-modal id="modal_Registration" size="lg" title="Registration" ref="modal_Registration" centered
                 hide-footer>
            <parent-register-component @result="hideRegisterModal" :email="obj_ExternalLogin.str_Email"
                                       :token-id="obj_ExternalLogin.str_TokenId"
                                       :platform="obj_ExternalLogin.str_Platform"
                                       :email-status="obj_ExternalLogin.bool_EmailStatus"
                                       :password-status="obj_ExternalLogin.bool_PasswordStatus"></parent-register-component>
        </b-modal>
    </div>
</template>

<script>
    /* eslint-disable */
    import DataSource from "../data/datasource";
    import parentRegisterComponent from "../components/Parent_Register_Component";
    import $ from "jquery";
    import {required, minLength} from 'vuelidate/lib/validators';
    import Cookies from "js-cookie";

    export default {
        data() {
            return {
                status: "",
                usernameInput: "",
                passwordInput: "",
                results: false,
                errorresults: false,
                isLoading: false,
                redirecting: "",
                obj_ExternalLogin: {
                    str_Email: "",
                    str_TokenId: "",
                    str_Platform: "",
                    bool_EmailStatus: false,
                    bool_PasswordStatus: false
                },
                obj_GoogleSignIn: {
                    clientId: "646978523324-lcudp248dvuuk0rda4q6kf2bti9qkk3b.apps.googleusercontent.com",
                    secret: "pky9b3RK2jH6km_tNQBhDMQ4"
                }
            };
        },
        computed: {
            request() {
                return JSON.stringify(this.usernameInput, null, "  ");
            },
        },
        methods: {
            async onSubmit() {
                this.$v.$touch();
                //this.results = "<< Requesting.. >>";

                this.$vs.loading();

                try {
                    const response = await DataSource.shared.login(this.usernameInput, this.passwordInput);
                    this.redirecting = true;

                    const isParent = Cookies.get('userTypeSession');
                    if (response) {

                        this.$vs.loading.close();
                        if (response.token) {
                            this.results = `Login Success, Welcome Back`;
                            if (isParent === "Parent") {
                                window.location.replace("/feed");
                            } else {
                                window.location.replace("/");
                            }

                        } else {
                            switch (response.code) {
                                case "2":
                                    this.errorresults = `Invalid Email ID`;
                                    //this.results = `Invalid User Name - sample 1:${JSON.stringify(response)}`;
                                    break;
                                case "3":
                                    this.errorresults = `Invalid Password`;
                                    //this.results = `Invalid password - sample 2: code: ${response.code}`;
                                    break;
                                case "99":
                                    this.errorresults = `Please fill in all field`;
                                    //this.results = `Please fill in all field - sample 3: code: ${response.code}`;
                                    break;
                                default:
                                    alert("Please try again later");
                                    this.errorresults = JSON.stringify(response);
                            }
                            this.redirecting = false;
                        }
                    }
                } catch (e) {
                    console.log(e);
                    this.errorresults = "server error, please contact administrator";
                    this.$vs.loading.close();
                }
            },
            checkUserAccount(str_Email, str_TokenId, str_Platform) {
                DataSource.shared.externalLogin(str_Email, str_TokenId)
                    .then((result) => {
                        if (result.code == 2 || result.code == 99) {
                            this.initRegistration(str_Email, str_TokenId, str_Platform);
                            return;
                        }

                        const isParent = Cookies.get('userTypeSession');

                        if (result && result.token) {
                            this.results = `Login Success, Welcome Back`;
                            if (isParent === "Parent")
                                window.location.replace("/feed");
                            else
                                window.location.replace("/");
                        }
                    });
            },
            showRegisterModal() {
                this.$refs.modal_Registration.show();
            },
            hideRegisterModal() {
                this.obj_ExternalLogin = {
                    str_Email: "",
                    str_TokenId: "",
                    str_Platform: "",
                    bool_EmailStatus: false,
                    bool_PasswordStatus: false
                };
                this.$refs.modal_Registration.hide();
            },
            initRegistration(str_Email, str_TokenId, str_Platform) {
                this.obj_ExternalLogin = {
                    str_Email: str_Email,
                    str_TokenId: str_TokenId,
                    str_Platform: str_Platform,
                    bool_EmailStatus: false,
                    bool_PasswordStatus: false
                };

                this.showRegisterModal();
            },

            logoutall() {
                this.logoutFB();
                this.logoutGoogle();
            },

            logoutFB() {
                $.getScript('https://connect.facebook.net/en_US/sdk.js', function () {
                    FB.logout();
                });
            },
            logoutGoogle() {
                $.getScript('https://apis.google.com/js/platform.js', function () {
                    gapi.load("auth2", () => {
                        gapi.auth2.init({
                            client_id: "646978523324-lcudp248dvuuk0rda4q6kf2bti9qkk3b.apps.googleusercontent.com"
                        }).then((auth2) => {
                            auth2.signOut();
                        });
                    });
                });
            },

            loginFB() {
                let self = this;
                $.getScript('https://connect.facebook.net/en_US/sdk.js', function () {
                    FB.init({
                        // appId: '255792542012990',
                        appId: '1983777365262188',
                        version: 'v2.7' // or v2.1, v2.2, v2.3, ...
                    });

                    FB.login((response) => {
                        FB.api("/me", {fields: "email,id"}, (profile) => {
                            self.checkUserAccount(profile.email, profile.id, "FB");
                        });
                    }, {scope: 'public_profile,email'});
                });
            },
            getFBSignin() {
                let self = this;
                $.getScript('https://connect.facebook.net/en_US/sdk.js', function () {
                    FB.init({
                        // appId: '255792542012990',
                        appId: '1983777365262188',
                        version: 'v2.7' // or v2.1, v2.2, v2.3, ...
                    });

                    FB.getLoginStatus((loginStatus) => {
                        if (loginStatus.status !== "connected")
                            return;


                        FB.api("/me", {fields: "email,id"}, (profile) => {
                            self.checkUserAccount(profile.email, profile.id, "FB");
                        });
                    });
                });
            },
            getGoogleSignin() {
                $.getScript("https://apis.google.com/js/platform.js", () => {
                    gapi.load("auth2", () => {
                        gapi.auth2.init({
                            client_id: "646978523324-lcudp248dvuuk0rda4q6kf2bti9qkk3b.apps.googleusercontent.com"
                        });

                        gapi.signin2.render('google-signin-button', {
                            onsuccess: this.onGoogleSignIn
                        });
                    });
                });
            },
            onGoogleSignIn(googleUser) {
                let profile = googleUser.getBasicProfile();
                let token = googleUser.getAuthResponse();

                $.ajax({
                    type: "get",
                    url: "https://oauth2.googleapis.com/tokeninfo",
                    data: {"id_token": token.id_token},
                }).then((tokeninfo) => {
                    this.checkUserAccount(profile.getEmail(), tokeninfo.sub, "google");
                });

                // profile.getEmail()
                // token.id_token
                /*DataSource.shared.exteralLogin(profile.getEmail, token.*/
            },
        },
        mounted() {
            const isLogin = Cookies.get('authToken');
            if (isLogin && isLogin !== "null" && isLogin !== "undefined") {
                this.results = `You already logged in`;
                // window.location.replace("/");
                this.$router.go(-1);
            }

            this.getGoogleSignin();
            this.getFBSignin();
        },
        components: {parentRegisterComponent},
        validations: {
            usernameInput: {
                required
            },
            passwordInput: {
                required
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .header {
        display: none;
    }

    #btn_FBLogin {
        background-color: #4267b2;
        border-radius: 4px;
        color: #fff;
        padding: 10px;
        border: 0;
        border-collapse: collapse;
        border-spacing: 0;

        font-family: Helvetica, Arial, sans-serif;
        letter-spacing: 0.25px;
        overflow: hidden;
        text-align: center;
        text-overflow: clip;
        white-space: nowrap;
        font-size: 16px;
        cursor: pointer;
        margin: 0 24px 0 12px;
    }

    #btn_FBLogin svg {
        width: 25px;
        height: 25px;
        margin-right: 10px;
    }
</style>

<style>
    .login div#parentx-static,
    .login header {
        display: none;
    }

    .login .menu-box-wrap {
        display: none;
    }
</style>
