<template>
    <div class="content">
        <div class="backstretch">
            <img src="../assets/bg.jpg"/>
        </div>
        <!--<div class="pb-5">-->
        <!--<h2>Login Test</h2>-->
        <!--<p class="lead">Fill in the form and submit to get the response from the server.</p>-->
        <!--</div>-->

        <div class="row login-box">
            <div class="resetlink-wrap">
                <div class="col-md-12 mb-6 login-form col-sm-12"  v-if="step===1">
                    <div class="login-header mb-5 row">
                        <div class="col-md-10">
                            <h4 class="mb-3 text-muted">Forgot Password</h4>
                        </div>
                        <div class="col-md-2 pl-0 pr-0">
                            <img src="../assets/kagami.jpg"/>
                        </div>
                    </div>
                    <div class="reset-content">
                        <span style="margin-bottom: 10px;display: block;">To reset your password, enter the email address you use to sign in to EtonHouse</span>
                        <form class="needs-validation" novalidate @submit.prevent="onSubmit">

                            <div class="mb-3">
                                <!--<label for="username">Username</label>-->
                                <input type="text" class="form-control" id="email" v-model="usernameInput"
                                       placeholder="Email Address"
                                       required>
                                <div class="invalid-feedback" style="width: 100%;">
                                    Your email address is required.
                                </div>
                            </div>
                            <div class="system-msg"><p>{{results}}</p></div>
                            <div class="row d-flex mt-3 mb-5">
                                <div class="col-md-12">
                                    <button class="btn btn-primary btn-lg btn-block login-btn" type="submit"
                                            v-on:click="stepChange(2)">Send Reset Link
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!--<transition name="slide-fade">-->
                    <!--<div class="reset-content-2"  v-if="step===2">-->
                        <!--<span style="margin-bottom: 10px;display: block;">Reset link has send to your registered email ID</span>-->

                        <!--<button class="btn btn-primary btn-lg btn-block login-btn" type="submit">Done</button>-->
                    <!--</div>-->
                    <!--</transition>-->
                </div>
                <transition  name="flip" mode="out-in">
                <div class="col-md-12 mb-6 login-form col-sm-12"  v-if="step===2">
                    <div class="login-header mb-5 row">
                        <div class="col-md-10">
                            <h4 class="mb-3 text-muted">Reset Password</h4>
                        </div>
                        <div class="col-md-2 pl-0 pr-0">
                            <img src="../assets/kagami.jpg"/>
                        </div>
                    </div>
                    <div class="reset-content-2">
                        <span style="margin-bottom: 10px;display: block;">Reset link has send to your registered email ID</span>

                        <router-link :to="{ name: 'Home' }"><button class="btn btn-primary btn-lg btn-block login-btn" >Done</button></router-link>
                    </div>
                </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Step',
        data() {
            return {
                step: 1,
            };
        },
        methods: {
            stepChange: function (step) {
                this.step = step;
            }
        }


    };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #header {
        display: none;
    }

    .backstretch {
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: fixed;
    }

    .backstretch img {
        width: 100%;
        min-height: 100%;
    }

    .resetlink-wrap {
        display: flex;
        /*width: 80%;*/
        background: #f7f6f6;
        position: relative;
        margin: auto;
        box-shadow: 0px 0px 10px 0px;
    }

    .login-form {
        padding: 30px;
        margin: auto;
        min-width: 574px;
    }

    .login-header {
        text-align: left;
        color: #222 !important;
        margin-left: -15px !important;
        width: 100%;
        margin-right: -15px !important;
        display: flex;
        align-items: center;
    }

    body {
    }

    .login-header h4 {
        text-align: left;
        color: #222 !important;
        margin: 0px !important;
    }

    .login-header span {
        font-size: 0.8rem;
    }

    .login-wrap .form-control {
        border: 0px;
        border-bottom: 2px solid #ccc;
        border-radius: 0px;
        padding: 0px;
        background: transparent;
    }

    .login-btn {
        background: #f65151;
        border: 2px solid white;
        border-radius: 2rem;
        padding: 0.2rem 1rem;
        box-shadow: 0px 2px 3px -3px black;
    }

    .login-btn {
        background: #f65151;
        border: 2px solid white;
        border-radius: 2rem;
        padding: 0.2rem 1rem;
        box-shadow: 0px 2px 3px -3px black;
    }

    .login-btn:hover {
        background-color: #404040;
        border-color: #999;
    }

    .login-box {
        display: flex;
        height: 100%;
        align-items: center;
    }

    .content {
        height: calc(100vh - 90px);
    }

    .flip-enter-active {
        transition: all 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53);
    }

    .flip-leave-active {
        transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .flip-enter,
    .flip-leave-to {
        transform: scaleY(0) translateZ(0);
        opacity: 0;
    }

    @media (max-width: 1025px) {
        .backstretch img {
            height: 100%;
            min-width: 100%;
            width: auto !important;
        }
    }

    @media (max-width: 769px) {

        .login-form {
            max-width: 100%;
            flex: 0 0 100%;
        }
    }


</style>
