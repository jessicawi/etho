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
                <div class="col-md-12 mb-6 login-form col-sm-12">
                    <div class="login-header mb-5 row">
                        <div class="col-md-10">
                            <h4 class="mb-3 text-muted">Reset Password</h4>
                            <span>To reset your password, enter the email address you use to sign in to EtonHouse</span>
                        </div>
                        <div class="col-md-2 pl-0 pr-0">
                            <img src="../assets/kagami.jpg"/>
                        </div>
                    </div>
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
                                <button class="btn btn-primary btn-lg btn-block login-btn" type="submit">Send Reset Link</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
