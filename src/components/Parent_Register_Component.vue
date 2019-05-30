<template>
    <div class="container-fluid parent-register-modal">
        <div class="login-header mb-5 row">
            <div class="col-md-10">
                <h4 class="mb-3 text-muted">Parent Registration</h4>
            </div>
            <div class="col-md-2 pl-0 pr-0">
                <img src="../assets/kagami.jpg"/>
            </div>
        </div>
        <form class="needs-validation form-style" novalidate @submit.prevent="onSubmit">
            <div class="row">
            <div class="mb-3 col-lg-12" :class="{ 'form-group--error': $v.userEmail.$error }">
                <!--<label for="username">Username</label>-->
                <el-input placeholder="Email ID" v-model="userEmail" id="userEmail" required :readonly="!emailStatus"
                          v-model.trim="$v.userEmail.$model"></el-input>
                <!--<input type="text" class="form-control" id="userEmail" v-model="userEmail"-->
                <!--placeholder="Email ID"-->
                <!--required :readonly="!emailStatus"/>-->
                <!--<div class="invalid-feedback" style="width: 100%;">-->
                <!--Your Email ID is required.-->
                <!--</div>-->
                <div class="error" v-if="!$v.userEmail.required">Email ID is required</div>
            </div>
            <div class="mb-2 col-lg-6" :class="{ 'form-group--error': $v.userPassword.$error }" v-if="passwordStatus">
                <!--<label for="password">Password</label>-->

                <el-input placeholder="Password" show-password v-model="userPassword" id="userPassword" required
                           v-model.trim="$v.userPassword.$model"></el-input>

                <!--<input type="password" class="form-control" id="userPassword" v-model="userPassword"-->
                <!--placeholder="Password"-->
                <!--required v-if="passwordStatus">-->
                <div class="invalid-feedback" style="width: 100%;">
                    Your password is required.
                </div>
                <div class="error" v-if="!$v.userPassword.required">password is required</div>
                <div class="error" v-if="!$v.userPassword.minLength">Password must have at least
                    {{$v.userPassword.$params.minLength.min}} character, numerical.
                </div>
            </div>


            <div class="mb-2 col-lg-6" :class="{ 'form-group--error': $v.studentID_Index.$error }">
                <!--<label for="password">Password</label>-->
                <el-input placeholder="student ID" v-model="studentID_Index" id="studentID_Index" required
                          v-model.trim="$v.studentID_Index.$model"></el-input>
                <!--<input type="text" class="form-control" id="studentID_Index" v-model="studentID_Index"-->
                <!--placeholder="student ID"-->
                <!--required>-->
                <div class="invalid-feedback" style="width: 100%;">
                    Your student ID is required.
                </div>
                <div class="error" v-if="!$v.studentID_Index.required">student ID is required</div>
            </div>

            <div class="mb-2 col-lg-6" :class="{ 'form-group--error': $v.studentDOB.$error }">
                <!--<label for="password">Password</label>-->
                <!--<input type="text" class="form-control" id="studentDOB" v-model="studentDOB"-->
                <!--placeholder="studentDOB"-->
                <!--required>-->

                <el-date-picker
                        v-model="studentDOB"
                        type="date"
                        placeholder="student DOB"
                        v-model.trim="$v.studentDOB.$model"
                        class="fullwidth">
                </el-date-picker>
                <div class="invalid-feedback" style="width: 100%;">
                    Your student DOB is required.
                </div>
                <div class="error" v-if="!$v.studentDOB.required">Student DOB is required</div>
            </div>

            <div class="mb-2 col-lg-6" :class="{ 'form-group--error': $v.studentDOB.$error }">
                <!--<label for="password">Password</label>-->
                <!--<vs-input label-placeholder="student ID Type"  class="form-control text-left" id="studentIDType" v-model="studentIDType" required/>-->
                <el-select class="fullwidth" id="studentIDType" v-model="studentIDType" placeholder="student ID Type"
                           v-model.trim="$v.studentIDType.$model">
                    <el-option
                            v-for="item,index in studentIdTypeList"
                            :key="index"
                            :label="item.text"
                            :value="item.value">
                    </el-option>
                </el-select>
                <!--<input type="text" class="form-control" id="studentIDType" v-model="studentIDType"-->
                <!--placeholder="studentIDType"-->
                <!--required>-->
                <div class="invalid-feedback" style="width: 100%;">
                    Your student ID Type is required.
                </div>
                <div class="whitespace-10"></div>
                <div class="error" v-if="!$v.studentIDType.required">Student ID is required</div>
            </div>

            <div class="mb-2 col-lg-6" :class="{ 'form-group--error': $v.studentIDNo.$error }">
                <!--<label for="password">Password</label>-->
                <el-input placeholder="Identification No" v-model="studentIDNo" id="studentIDNo" required v-model.trim="$v.studentIDNo.$model"></el-input>
                <!--<vs-input label-placeholder="Identification No" class="form-control text-left" id="studentIDNo"-->
                          <!--v-model="studentIDNo" required v-model.trim="$v.studentIDNo.$model"/>-->
                <!--<input type="text" class="form-control" id="studentIDNo" v-model="studentIDNo"-->
                <!--placeholder="Identification No"-->
                <!--required>-->
                <div class="invalid-feedback" style="width: 100%;">
                    Your Identification No is required.
                </div>
                <div class="error" v-if="!$v.studentIDNo.required">Identification No is required</div>
            </div>
            </div>
            <div class="system-msg"><p>{{results}}</p></div>
            <div class="row d-flex mt-3 mb-5">
                <div class="col-md-12">
                    <button class="btn btn-primary login-btn" type="submit">
                        Register
                    </button>
                    <!--<div class="loading" v-if="isLoading===true">-->
                        <!--<div class="load-3">-->
                            <!--<div class="line"></div>-->
                            <!--<div class="line"></div>-->
                            <!--<div class="line"></div>-->
                        <!--</div>-->
                    <!--</div>-->
                    <a href="/login" class="mt10 d-block">Back to Login</a>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    /* eslint-disable */
    import DataSource from "../data/datasource";
    import {required, minLength} from 'vuelidate/lib/validators';

    export default {
        name: 'Parent_Register_Component',
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
                redirecting: "",
                studentIdTypeList: [
                    {text: 'Fin', value: 'Fin'},
                    {text: 'Passport', value: 'Passport'},
                    {text: 'IC', value: 'IC'},
                    {text: 'Birth Certificate', value: 'Birth Certificate'},
                    {text: 'Others Identification', value: 'Others Identification'}
                ],
            };
        },
        methods: {
            async onSubmit() {
                this.$vs.loading();
                this.$v.$touch();
                this.error = "";
                //this.results = "<< Requesting.. >>";
                try {
                    const response = await DataSource.shared.parentRegister(this.userEmail, this.userPassword, this.studentIDNo, this.studentID_Index, this.studentDOB, this.studentIDType, this.platform, this.tokenId);
                    if (response) {
                        this.$vs.loading.close();
                        switch (response.code) {
                            case "1":
                                this.results = `Registration Success`;
                                this.redirecting = true;
                                //this.results = `Login Success - ${JSON.stringify(response)}`;
                                window.location.replace("/login");
                                this.$emit("result", true);
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
                } catch (e) {
                    console.log("error", e);
                    this.error = e;
                }
            },
        },
        props: {
            email: String, tokenId: String, platform: String, emailStatus: Boolean, passwordStatus: Boolean
        },
        watch: {
            email: function () {
                this.userEmail = this.email;
            }
        },
        validations: {
            userEmail: {
                required
            },
            userPassword: {
                /*required,*/
                minLength: minLength(6)
            },
            studentID_Index: {
                required
            },
            studentDOB: {
                required
            },
            studentIDType: {
                required
            },
            studentIDNo: {
                required
            }


        }
    };
</script>

<style scoped>
</style>
<style>
    .parent-register div#parentx-static,
    .parent-register header {
        display: none;
    }
</style>