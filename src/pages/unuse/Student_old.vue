<template>
    <div id="student" class="mt-3 container">
        <div class="row form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 modeArea">
                <label style="display:inline !important;">Mode: </label><label style="display:inline !important;">{{lblCreateOrEdit}}</label>
                <label style="display:none !important;">{{lblStudentID}}</label>
                <label style="display:none !important;">{{lblParentID}}</label>
                <label style="display:none !important;">{{lblStudentIndexNo}}</label>
            </div>
        </div>

        <div v-if="changeStatusAction"  class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12 changeStatusArea">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <label class="lblChangeStatusTo">{{lblCurrentStatus}} Status Change To</label>
                <select v-model="ddlChangeStatusTo"
                        class="form-control pro-edt-select form-control-primary ddlChangeStatusTo">
                    <option v-for="item in ddlChangeStatusToList" v-bind:value="item.StatusValue.trim()" v-bind:text="item.Status.trim()">{{
                        item.Status.trim() }}
                    </option>
                </select>
                <button v-on:click="StatusAction"
                        class="btn btn-primary waves-effect waves-light m-r-10 btnChangeStatus">Action
                </button>
            </div>
        </div>

        <div class="row form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 profilePictureArea">
                <img v-bind:src="imgStudentProfile" type="file" @click="uploadStudentProfileImg()" class="imgStudentProfile"/>
            </div>
            <input type="file" ref="file" accept="image/*" style="display:none" @change="previewImgStudentProfile">
        </div>

        <b-tabs class="studentPageBTabs">
            <b-tab title="Student" active>
                <div class=" form-group ">
                    <div class="studentAreaDiv">
                        <div class="">
                            <h5 class="text-left student-form__title">Student's Personal Information</h5>
                        </div>
                        <div class="row form-group__wrapper">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>* First Name</label>
                                <input type="text" class="form-control form__input" v-model="inputStudentFirstName"
                                       :class="{ 'requiredFields': $v.inputStudentFirstName.$error }">
                                <div class="requiredFieldsMsg" v-if="$v.inputStudentFirstName.$error">First Name
                                    Require
                                </div>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Middle Name</label>
                                <input type="text" class="form-control" v-model="inputStudentMiddleName">
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>* Last Name</label>
                                <input type="text" class="form-control" v-model="inputStudentLastName"
                                       :class="{ 'requiredFields': $v.inputStudentLastName.$error }">
                                <div class="requiredFieldsMsg" v-if="$v.inputStudentLastName.$error">Last Name Require
                                </div>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Preferred Name</label>
                                <input type="text" class="form-control" v-model="inputStudentPreferredName">
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>* Nationality</label>
                                <select v-model="ddlStudentNationality"
                                        class="form-control pro-edt-select form-control-primary"
                                        :class="{ 'requiredFields': $v.ddlStudentNationality.$error }"
                                        @change="onChangeNationalityBirthPlace()">
                                    <option v-for="item in countryList" v-bind:value="item.CNYnationality.trim()">{{
                                        item.CNYnationality.trim() }}
                                    </option>
                                </select>
                                <div class="requiredFieldsMsg" v-if="$v.ddlStudentNationality.$error">Nationality
                                    Require
                                </div>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Gender</label>
                                <select v-model="ddlStudentGender"
                                        class="form-control pro-edt-select form-control-primary">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>* Date of Birth</label>
                                <div class="date">
                                    <el-date-picker v-model="inputStudentDateOfBirth" format="dd/MM/yyyy"
                                                    value-format="dd/MM/yyyy" type="date" placeholder="Pick a date"
                                                    :class="{ 'requiredFields': $v.inputStudentDateOfBirth.$error }"></el-date-picker>
                                </div>
                                <div class="requiredFieldsMsg" v-if="$v.inputStudentDateOfBirth.$error">Date of Birth
                                    Require
                                </div>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Birth Place</label>
                                <select v-model="ddlStudentBirthPlace"
                                        class="form-control pro-edt-select form-control-primary"
                                        @change="onChangeNationalityBirthPlace()">
                                    <option v-for="item in countryList" v-bind:value="item.CNYname.trim()">{{
                                        item.CNYname.trim() }}
                                    </option>
                                </select>
                            </div>

                            <div v-if="finShowHide" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>** Fin</label>
                                <input type="text" class="form-control" v-model="inputStudentIdentificationNo"
                                       :class="{ 'requiredFields': $v.inputStudentIdentificationNo.$error }">
                                <div class="requiredFieldsMsg" v-if="$v.inputStudentIdentificationNo.$error">Fin
                                    Require
                                </div>
                            </div>

                            <div v-if="finShowHide" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>** Fin Expiry Date</label>
                                <div class="date">
                                    <el-date-picker v-model="inputStudentIdentificationExpiryDate" format="dd/MM/yyyy"
                                                    value-format="dd/MM/yyyy" type="date" placeholder="Pick a day"
                                                    :class="{ 'requiredFields': $v.inputStudentIdentificationExpiryDate.$error }"></el-date-picker>
                                </div>
                                <div class="requiredFieldsMsg" v-if="$v.inputStudentIdentificationExpiryDate.$error">Fin
                                    Expiry Date Require
                                </div>
                            </div>

                            <div v-if="birthcertShowHide" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>** Birth Certificate</label>
                                <input type="text" class="form-control" v-model="inputStudentBirthCertificate"
                                       :class="{ 'requiredFields': $v.inputStudentBirthCertificate.$error }">
                                <div class="requiredFieldsMsg" v-if="$v.inputStudentBirthCertificate.$error">Birth
                                    Certificate Require
                                </div>
                            </div>

                            <div v-if="icShowHide" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>** IC</label>
                                <input type="text" class="form-control" v-model="inputStudentIC"
                                       :class="{ 'requiredFields': $v.inputStudentIC.$error }">
                                <div class="requiredFieldsMsg" v-if="$v.inputStudentIC.$error">IC Require</div>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>** Passport</label>
                                <input type="text" class="form-control" v-model="inputStudentPassport"
                                       :class="{ 'requiredFields': $v.inputStudentPassport.$error }">
                                <div class="requiredFieldsMsg" v-if="$v.inputStudentPassport.$error">Passport Require
                                </div>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>** Passport Expiry Date</label>
                                <div class="date">
                                    <el-date-picker v-model="inputStudentPassportExpiryDate" format="dd/MM/yyyy"
                                                    value-format="dd/MM/yyyy" type="date" placeholder="Pick a day"
                                                    :class="{ 'requiredFields': $v.inputStudentPassportExpiryDate.$error }"></el-date-picker>
                                </div>
                                <div class="requiredFieldsMsg" v-if="$v.inputStudentPassportExpiryDate.$error">Passport
                                    Expiry Date Require
                                </div>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>** Other Identification</label>
                                <input type="text" class="form-control" v-model="inputStudentOtherIdentification"
                                       :class="{ 'requiredFields': $v.inputStudentOtherIdentification.$error }">
                                <div class="requiredFieldsMsg" v-if="$v.inputStudentOtherIdentification.$error">Other
                                    Identification Require
                                </div>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Religion</label>
                                <select v-model="ddlStudentReligion"
                                        class="form-control pro-edt-select form-control-primary">
                                    <!--<option v-for="item in ddlStudentReligionList" v-bind:value="{ id: item.OPTvalue.trim(), text: item.OPTvalue.trim() }">{{ item.OPTvalue.trim() }}</option>-->
                                    <option v-for="item in ddlStudentReligionList" v-bind:value="item.OPTvalue.trim()">
                                        {{ item.OPTvalue.trim() }}
                                    </option>
                                </select>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Additional Language</label>
                                <select v-model="ddlStudentAdditionalLanguage"
                                        class="form-control pro-edt-select form-control-primary">
                                    <option v-for="item in ddlStudentAdditionalLanguageList"
                                            v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}
                                    </option>
                                </select>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Meal Preferences</label>
                                <select v-model="ddlStudentMealPreferences"
                                        class="form-control pro-edt-select form-control-primary">
                                    <option v-for="item in ddlStudentMealPreferencesList"
                                            v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}
                                    </option>
                                </select>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>First Language Spoken</label>
                                <input type="text" class="form-control" v-model="inputStudentFirstLanguageSpoken">
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Second Language Spoken</label>
                                <input type="text" class="form-control" v-model="inputSecondLanguageSpoken">
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Membership</label>
                                <select v-model="ddlStudentMembership"
                                        class="form-control pro-edt-select form-control-primary">
                                    <option v-for="item in ddlStudentMembershipList"
                                            v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="studentAreaDiv">
                        <div class="">
                            <h5 class="text-left student-form__title">Student's Registration Details</h5>
                        </div>

                        <div class="row form-group__wrapper">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>* First Commencement Date</label>
                                <div class="date">
                                    <el-date-picker v-model="inputFirstCommencementDate" type="date" format="dd/MM/yyyy"
                                                    value-format="dd/MM/yyyy" placeholder="Pick a day"
                                                    :class="{ 'requiredFields': $v.inputFirstCommencementDate.$error }"></el-date-picker>
                                </div>
                                <div class="requiredFieldsMsg" v-if="$v.inputFirstCommencementDate.$error">First
                                    Commencement Date Require
                                </div>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Residency Status</label>
                                <select v-model="ddlStudentResidencyStatus"
                                        class="form-control pro-edt-select form-control-primary">
                                    <option v-for="item in ddlStudentResidencyStatusList"
                                            v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}
                                    </option>
                                </select>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>* Payer</label>
                                <select v-model="ddlStudentPayer"
                                        class="form-control pro-edt-select form-control-primary"
                                        :class="{ 'requiredFields': $v.ddlStudentPayer.$error }">
                                    <option v-for="item in ddlStudentPayerList" v-bind:value="item.OPTvalue.trim()">{{
                                        item.OPTvalue.trim() }}
                                    </option>
                                </select>
                                <div class="requiredFieldsMsg" v-if="$v.ddlStudentPayer.$error">Payer Require</div>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Student ID</label>
                                <input type="text" class="form-control" v-model="inputStudentID" readonly="readonly">
                            </div>

                            <!--<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">-->
                            <!--<label>* Select Level</label>-->
                            <!--<select v-model="ddlStudentSelectLevel"-->
                            <!--class="form-control pro-edt-select form-control-primary"-->
                            <!--:class="{ 'requiredFields': $v.ddlStudentSelectLevel.$error }">-->
                            <!--<option v-for="item in levelList" v-bind:value="item.PK_Course_ID.trim()">{{-->
                            <!--item.CRS_Course_Name.trim() }}-->
                            <!--</option>-->
                            <!--</select>-->
                            <!--<div class="requiredFieldsMsg" v-if="$v.ddlStudentSelectLevel.$error">Level Require-->
                            <!--</div>-->
                            <!--</div>-->

                            <!--<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">-->
                            <!--<label>* First Academic Year</label>-->
                            <!--<select v-model="ddlStudentFirstAcademicYear"-->
                            <!--class="form-control pro-edt-select form-control-primary"-->
                            <!--:class="{ 'requiredFields': $v.ddlStudentFirstAcademicYear.$error }">-->
                            <!--<option v-for="item in academicYearList" v-bind:value="item.PK_Semester_ID.trim()">-->
                            <!--{{ item.SMT_Code.trim() }}-->
                            <!--</option>-->
                            <!--</select>-->
                            <!--<div class="requiredFieldsMsg" v-if="$v.ddlStudentFirstAcademicYear.$error">First-->
                            <!--Academic Year Require-->
                            <!--</div>-->
                            <!--</div>-->

                            <!--<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">-->
                            <!--<label>* Intake Year</label>-->
                            <!--<select v-model="ddlStudentIntakeYear"-->
                            <!--class="form-control pro-edt-select form-control-primary"-->
                            <!--:class="{ 'requiredFields': $v.ddlStudentIntakeYear.$error }"-->
                            <!--v-bind:disabled="editModeDisable">-->
                            <!--<option v-for="item in studentIntakeYearList" v-bind:value="item.PK_PAI_ID.trim()">-->
                            <!--{{ item.PAI_Intake_No.trim() }}-->
                            <!--</option>-->
                            <!--</select>-->
                            <!--<div class="requiredFieldsMsg" v-if="$v.ddlStudentIntakeYear.$error">Intake Year-->
                            <!--Require-->
                            <!--</div>-->
                            <!--</div>-->
                        </div>
                    </div>
                </div>
            </b-tab>
            <b-tab title="Emergency Contact">
                <div class=" form-group ">
                    <div class="ecAreaDiv">
                        <div class="">
                            <h5 class="text-left student-form__title">Emergency Contact</h5>
                        </div>
                        <div class="row form-group__wrapper">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>1st Emergency Contact No</label>
                                <input type="text" class="form-control" v-model="inputStudent1stEmergencyContactNo">
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>2nd Emergency Contact No</label>
                                <input type="text" class="form-control" v-model="inputStudent2ndEmergencyContactNo">
                            </div>
                        </div>
                    </div>
                </div>
            </b-tab>
            <b-tab title="Addresses">
                <div class=" form-group ">
                    <div class="addAreaDiv">
                        <div class="">
                            <h5 class="text-left student-form__title">Student's Permanent Address</h5>
                        </div>

                        <div class="row form-group__wrapper">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Country</label>
                                <select v-model="ddlStudentAddressCountry"
                                        class="form-control pro-edt-select form-control-primary">
                                    <option v-for="item in countryList" v-bind:value="item.CNYname.trim()">{{
                                        item.CNYname.trim() }}
                                    </option>
                                </select>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>* Postal Code</label>
                                <input type="text" class="form-control" v-model="inputStudentPostalCode"
                                       :class="{ 'requiredFields': $v.inputStudentPostalCode.$error }"
                                       v-on:blur="GetGoogleAPI('inputStudentPostalCode')">
                                <div class="requiredFieldsMsg" v-if="$v.inputStudentPostalCode.$error">Postal Code
                                    Require
                                </div>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>* Address 1</label>
                                <input type="text" class="form-control" v-model="inputStudentAddress1"
                                       :class="{ 'requiredFields': $v.inputStudentAddress1.$error }">
                                <div class="requiredFieldsMsg" v-if="$v.inputStudentAddress1.$error">Address 1 Require
                                </div>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Address 2</label>
                                <input type="text" class="form-control" v-model="inputStudentAddress2">
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Address 3</label>
                                <input type="text" class="form-control" v-model="inputStudentAddress3">
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>City</label>
                                <input type="text" class="form-control" v-model="inputStudentCity">
                            </div>
                        </div>
                    </div>

                    <div class="addAreaDiv">
                        <div class="">
                            <h5 class="text-left student-form__title">Student's Correspondance Address</h5>
                        </div>

                        <div class="row form-group__wrapper">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Country</label>
                                <select v-model="ddlStudentAddressCorrespondanceCountry"
                                        class="form-control pro-edt-select form-control-primary">
                                    <option v-for="item in countryList" v-bind:value="item.CNYname.trim()">{{
                                        item.CNYname.trim() }}
                                    </option>
                                </select>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>* Postal Code</label>
                                <input type="text" class="form-control" v-model="inputStudentCorrespondancePostalCode"
                                       :class="{ 'requiredFields': $v.inputStudentCorrespondancePostalCode.$error }"
                                       v-on:blur="GetGoogleAPI('inputStudentCorrespondancePostalCode')">
                                <div class="requiredFieldsMsg" v-if="$v.inputStudentCorrespondancePostalCode.$error">
                                    Postal Code Require
                                </div>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>* Address 1</label>
                                <input type="text" class="form-control" v-model="inputStudentCorrespondanceAddress1"
                                       :class="{ 'requiredFields': $v.inputStudentCorrespondanceAddress1.$error }">
                                <div class="requiredFieldsMsg" v-if="$v.inputStudentCorrespondanceAddress1.$error">
                                    Address 1 Require
                                </div>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Address 2</label>
                                <input type="text" class="form-control" v-model="inputStudentCorrespondanceAddress2">
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Address 3</label>
                                <input type="text" class="form-control" v-model="inputStudentCorrespondanceAddress3">
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>City</label>
                                <input type="text" class="form-control" v-model="inputStudentCorrespondanceCity">
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Mobile No</label>
                                <input type="text" class="form-control" v-model="inputStudentMobileNo">
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Home Tel No</label>
                                <input type="text" class="form-control" v-model="inputStudentOfficeTelNo">
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Email</label>
                                <input type="text" class="form-control" v-model="inputStudentEmail">
                            </div>
                        </div>
                    </div>

                    <div v-if="divParent" class="addAreaDiv">
                        <div class="">
                            <h5 class="text-left student-form__title">Residential/Billing Address</h5>
                        </div>
                        <div class="row form-group__wrapper">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Country</label>
                                <select v-model="ddlParentCountry" v-bind:disabled="editModeDisable"
                                        class="form-control pro-edt-select form-control-primary">
                                    <option v-for="item in countryList" v-bind:value="item.CNYname.trim()">
                                        {{
                                        item.CNYname.trim() }}
                                    </option>
                                </select>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>* Postal Code</label>
                                <input type="text" class="form-control" v-model="inputParentPostalCode"
                                       v-bind:disabled="editModeDisable"
                                       :class="{ 'requiredFields': $v.inputParentPostalCode.$error }"
                                       v-on:blur="GetGoogleAPI('inputParentPostalCode')">
                                <div class="requiredFieldsMsg" v-if="$v.inputParentPostalCode.$error">Postal
                                    Code Require
                                </div>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>* Address 1</label>
                                <input type="text" class="form-control" v-model="inputParentAddress1"
                                       v-bind:disabled="editModeDisable"
                                       :class="{ 'requiredFields': $v.inputParentAddress1.$error }">
                                <div class="requiredFieldsMsg" v-if="$v.inputParentAddress1.$error">Address
                                    1
                                    Require
                                </div>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Address 2</label>
                                <input type="text" class="form-control" v-model="inputParentAddress2"
                                       v-bind:disabled="editModeDisable">
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Address 3</label>
                                <input type="text" class="form-control" v-model="inputParentAddress3"
                                       v-bind:disabled="editModeDisable">
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>City</label>
                                <input type="text" class="form-control" v-model="inputParentCity"
                                       v-bind:disabled="editModeDisable">
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Landline No</label>
                                <input type="text" class="form-control" v-model="inputParentLandlineNo"
                                       v-bind:disabled="editModeDisable">
                            </div>
                        </div>
                    </div>
                </div>
            </b-tab>
            <b-tab title="Medical">
                <div class=" form-group ">
                    <div class="medAreaDiv">
                        <div class="">
                            <h5 class="text-left student-form__title">Student's Medical Details</h5>
                        </div>

                        <div class="row form-group__wrapper">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Major Ailments List</label>
                                <textarea rows="3" class="textArea"
                                          v-model="taMajorAilmentsList"></textarea>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Medication Allergies List</label>
                                <textarea rows="3" class="textArea"
                                          v-model="taMedicationAllergiesList"></textarea>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Blood Group</label>
                                <input type="text" class="form-control" v-model="inputBloodGroup">
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Blood Donor No</label>
                                <input type="text" class="form-control" v-model="inputBloodDonorNo">
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Name of Family Doctor</label>
                                <input type="text" class="form-control" v-model="inputNameofFamilyDoctor">
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Clinic Address</label>
                                <input type="text" class="form-control" v-model="inputClinicAddress">
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Clinic Phone No</label>
                                <input type="text" class="form-control" v-model="inputClinicPhoneNo">
                            </div>
                        </div>
                    </div>
                </div>
            </b-tab>
            <b-tab title="Parents">
                <div class="">
                    <div class="review-content-section">
                        <div v-if="divFamilySearch" class="row familyIDAreaDiv">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Family No</label>
                                <input type="text" class="form-control" v-model="inputFamilyID" readonly="readonly">
                                <input type="text" class="form-control" v-model="inputFamilyParentID"
                                       style="display:none;">
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label class="lblSearchFamily">Search Family</label>
                                <b-btn v-b-modal.familyModal variant="primary" v-bind:disabled="editModeDisable">
                                    Search
                                </b-btn>
                            </div>
                        </div>

                        <div v-if="divEditParentLink" class="row familyIDAreaDiv">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <button v-on:click="EditParentLink" type="button" class="btn btn-primary waves-effect waves-light m-r-10">
                                    Edit Parent
                                </button>
                            </div>
                        </div>

                        <div v-if="!divParent" class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 parentAreaDiv">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <button v-on:click="CancelUseFamilyNo"
                                        class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch"
                                        v-bind:disabled="editModeDisable">Cancel Use Family No
                                </button>
                            </div>
                        </div>

                        <div class=" parentAreaDiv">

                            <div v-if="divParent" class="parentAreaDiv">
                                <div class="">
                                    <h5 class="text-left student-form__title">Father's Details</h5>
                                </div>

                                <div class="row form-group__wrapper">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>* Parent Mode</label>
                                        <select v-model="ddlParentMode" v-bind:disabled="editModeDisable"
                                                class="form-control pro-edt-select form-control-primary"
                                                :class="{ 'requiredFields': $v.ddlParentMode.$error }">
                                            <option v-for="item in ddlParentModeList"
                                                    v-bind:value="item.OPTvalue.trim()">{{
                                                item.OPTvalue.trim() }}
                                            </option>
                                        </select>
                                        <div class="requiredFieldsMsg" v-if="$v.ddlParentMode.$error">Parent Mode
                                            Require
                                        </div>
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>* First Name</label>
                                        <input type="text" class="form-control" v-model="inputFatherFirstName"
                                               v-bind:disabled="editModeDisable" v-on:blur="CheckParentDup()"
                                               :class="{ 'requiredFields': $v.inputFatherFirstName.$error }">
                                        <div class="requiredFieldsMsg" v-if="$v.inputFatherFirstName.$error">First Name
                                            Require
                                        </div>
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>Middle Name</label>
                                        <input type="text" class="form-control" v-model="inputFatherMiddleName"
                                               v-bind:disabled="editModeDisable">
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>* Last Name</label>
                                        <input type="text" class="form-control" v-model="inputFatherLastName"
                                               v-bind:disabled="editModeDisable" v-on:blur="CheckParentDup()"
                                               :class="{ 'requiredFields': $v.inputFatherLastName.$error }">
                                        <div class="requiredFieldsMsg" v-if="$v.inputFatherLastName.$error">Last Name
                                            Require
                                        </div>
                                        <label v-if="lblFatherNameDuplicated">Father name is duplicated, please double
                                            confirm</label>
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>Date of Birth</label>
                                        <div class="date">
                                            <el-date-picker v-model="inputFatherDateofBirth"
                                                            v-bind:disabled="editModeDisable" format="dd/MM/yyyy"
                                                            value-format="dd/MM/yyyy" type="date"
                                                            placeholder="Pick a day"></el-date-picker>
                                        </div>
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>* Occupation</label>
                                        <input type="text" class="form-control" v-model="inputFatherOccupation"
                                               v-bind:disabled="editModeDisable"
                                               :class="{ 'requiredFields': $v.inputFatherOccupation.$error }">
                                        <div class="requiredFieldsMsg" v-if="$v.inputFatherOccupation.$error">Occupation
                                            Require
                                        </div>
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>Identification Type</label>
                                        <select v-model="ddlFatherIdentificationType" v-bind:disabled="editModeDisable"
                                                class="form-control pro-edt-select form-control-primary">
                                            <option v-for="item in ddlFatherIdentificationTypeList"
                                                    v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}
                                            </option>
                                        </select>
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>Identification No</label>
                                        <input type="text" class="form-control" v-model="inputFatherIdentificationNo"
                                               v-bind:disabled="editModeDisable">
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>Identification No Expiry Date</label>
                                        <div class="date">
                                            <el-date-picker v-model="inputFatherIdentificationNoExpiryDate"
                                                            v-bind:disabled="editModeDisable" format="dd/MM/yyyy"
                                                            value-format="dd/MM/yyyy" type="date"
                                                            placeholder="Pick a day"></el-date-picker>
                                        </div>
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>Mobile No</label>
                                        <input type="text" class="form-control" v-model="inputFatherMobileNo"
                                               v-bind:disabled="editModeDisable">
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>Email</label>
                                        <input type="text" class="form-control" v-model="inputFatherEmail"
                                               v-bind:disabled="editModeDisable">
                                    </div>
                                </div>
                            </div>

                            <div v-if="divParent" class="parentAreaDiv">
                                <div class="">
                                    <h5 class="text-left student-form__title">Mother's Details</h5>
                                </div>
                                <div class="row form-group__wrapper">

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>* First Name</label>
                                        <input type="text" class="form-control" v-model="inputMotherFirstName"
                                               v-bind:disabled="editModeDisable" v-on:blur="CheckParentDup()"
                                               :class="{ 'requiredFields': $v.inputMotherFirstName.$error }">
                                        <div class="requiredFieldsMsg" v-if="$v.inputMotherFirstName.$error">First Name
                                            Require
                                        </div>
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>Middle Name</label>
                                        <input type="text" class="form-control" v-model="inputMotherMiddleName"
                                               v-bind:disabled="editModeDisable">
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>* Last Name</label>
                                        <input type="text" class="form-control" v-model="inputMotherLastName"
                                               v-bind:disabled="editModeDisable" v-on:blur="CheckParentDup()"
                                               :class="{ 'requiredFields': $v.inputMotherLastName.$error }">
                                        <div class="requiredFieldsMsg" v-if="$v.inputMotherLastName.$error">Last Name
                                            Require
                                        </div>
                                        <label v-if="lblMotherNameDuplicated">Mother name is duplicated, please double
                                            confirm</label>
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>Date of Birth</label>
                                        <div class="date">
                                            <el-date-picker v-model="inputMotherDateofBirth"
                                                            v-bind:disabled="editModeDisable" format="dd/MM/yyyy"
                                                            value-format="dd/MM/yyyy" type="date"
                                                            placeholder="Pick a day"></el-date-picker>
                                        </div>
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>Occupation</label>
                                        <input type="text" class="form-control" v-model="inputMotherOccupation"
                                               v-bind:disabled="editModeDisable">
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>Identification Type</label>
                                        <select v-model="ddlMotherIdentificationType" v-bind:disabled="editModeDisable"
                                                class="form-control pro-edt-select form-control-primary">
                                            <option v-for="item in ddlMotherIdentificationTypeList"
                                                    v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}
                                            </option>
                                        </select>
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>Identification No</label>
                                        <input type="text" class="form-control" v-model="inputMotherIdentificationNo"
                                               v-bind:disabled="editModeDisable">
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>Identification No Expiry Date</label>
                                        <div class="date">
                                            <el-date-picker v-model="inputMotherIdentificationNoExpiryDate"
                                                            v-bind:disabled="editModeDisable" format="dd/MM/yyyy"
                                                            value-format="dd/MM/yyyy" type="date"
                                                            placeholder="Pick a day"></el-date-picker>
                                        </div>
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>Mobile No</label>
                                        <input type="text" class="form-control" v-model="inputMotherMobileNo"
                                               v-bind:disabled="editModeDisable">
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>Email</label>
                                        <input type="text" class="form-control" v-model="inputMotherEmail"
                                               v-bind:disabled="editModeDisable">
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </b-tab>
            <b-tab title="Siblings" v-if="siblingTab">
                <div v-if="siblingList.length>0">
                    <data-tables :data="siblingList" :action-col="actionCol_Sibling">
                        <el-table-column v-for="siblingListInfo in siblingListAll" :prop="siblingListInfo.prop"
                                         :label="siblingListInfo.label" :key="siblingListInfo.prop"
                                         sortable="custom">
                        </el-table-column>
                    </data-tables>
                </div>
                <div v-else class="siblingNoRecordArea">
                    <label>No Record Found...</label>
                </div>
            </b-tab>
            <b-tab title="Level" v-if="levelTab">
                <div class=" form-group ">
                    <div class="lvlAreaDiv">
                        <div class="">
                            <h5 class="text-left student-form__title">Level</h5>
                        </div>
                        <div class="row form-group__wrapper">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Select Level</label>
                                <select v-model="ddlStudentSelectLevel_Level" class="form-control pro-edt-select form-control-primary">
                                    <option v-for="item in levelList_Level" v-bind:value="item.PK_Course_ID.trim()">{{ item.CRS_Course_Name.trim() }}</option>
                                </select>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>First Academic Year</label>
                                <select v-model="ddlStudentFirstAcademicYear_Level" class="form-control pro-edt-select form-control-primary">
                                    <option v-for="item in academicYearList_Level" v-bind:value="item.PK_Semester_ID.trim()">{{ item.SMT_Code.trim() }}</option>
                                </select>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Intake Year</label>
                                <select v-model="ddlStudentIntakeYear_Level" class="form-control pro-edt-select form-control-primary">
                                    <option v-for="item in studentIntakeYearList_Level" v-bind:value="item.PK_PAI_ID.trim()">{{ item.PAI_Intake_No.trim() }}</option>
                                </select>
                            </div>

                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <button class="btn btn-primary waves-effect waves-light m-r-10" v-on:click="AddLevel">Add Level</button>
                            </div>
                        </div>

                        <div v-if="lvlLevelList_Level.length>0">
                            <data-tables :data="lvlLevelList_Level" :actionCol="actionCol_Level" @selection-change="handleSelectionChange">
                                <el-table-column v-for="lvlLevelList_LevelAllInfo in lvlLevelList_LevelAll" :prop="lvlLevelList_LevelAllInfo.prop" :label="lvlLevelList_LevelAllInfo.label" :key="lvlLevelList_LevelAllInfo.prop"
                                                 sortable="custom">
                                </el-table-column>

                                <el-table-column label="Activate" min-width="100px">
                                    <template slot-scope="scope">
                                        <el-button v-for="studentLevelListActivateButton in studentLevelListActivate(scope.row)" :key="studentLevelListActivateButton.name" type="primary" @click="studentLevelListActivateButton.handler">
                                            {{studentLevelListActivateButton.name}}
                                        </el-button>
                                    </template>
                                </el-table-column>

                                <el-table-column label="Deactivate" min-width="100px">
                                    <template slot-scope="scope">
                                        <el-button v-for="studentLevelListDeactivateButton in studentLevelListDeactivate(scope.row)" :key="studentLevelListDeactivateButton.name" type="primary" @click="studentLevelListDeactivateButton.handler">
                                            {{studentLevelListDeactivateButton.name}}
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </data-tables>
                        </div>
                    </div>
                </div>
            </b-tab>
        </b-tabs>

        <div class="whitespace-30"></div>

        <div class="buttonArea">
            <div class="text-center mg-b-pro-edt custom-pro-edt-ds">
                <button v-on:click="Validation" type="button" class="btn btn-primary waves-effect waves-light m-r-10">
                    Save
                </button>
            </div>
        </div>

        <div class="whitespace-30"></div>

        <b-modal id="familyModal" class="studentPageBModal" size="lg" title="Search Family ID" ok-only
                 ok-variant="secondary" ok-title="Cancel" ref="familyModalShowModal">
            <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Student Name</label>
                    <input type="text" class="form-control" ref="familyIDStudentName">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Family No</label>
                    <input type="text" class="form-control" ref="familyIDFamilyNo">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Parent First Name</label>
                    <input type="text" class="form-control" ref="familyParentFirstName">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Parent Last Name</label>
                    <input type="text" class="form-control" ref="familyParentLastName">
                </div>

                <div v-if="familyIDList.length>0" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <data-tables :data="familyIDList" :action-col="actionCol">
                        <el-table-column v-for="familyIDListInfo in familyIDListAll" :prop="familyIDListInfo.prop"
                                         :label="familyIDListInfo.label" :key="familyIDListInfo.prop"
                                         sortable="custom">
                        </el-table-column>
                    </data-tables>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <button v-on:click="SearchFamilyID"
                            class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch">Search
                    </button>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import DataSource from "../../data/datasource";
    import {required, requiredIf, requiredUnless} from "vuelidate/lib/validators";
    const API_HOST = process.env.VUE_APP_ROOT_API;

    export default {
        name: "Student",
        async created() {
            this.imgStudentProfile = API_HOST + '/db/Files/noImage1.jpg';
            this.divParent = true;
            this.finShowHide = true;
            this.birthcertShowHide = true;
            this.icShowHide = true;
            await this.BindCountryList();
            await this.BindStudentDropdown();
            //await this.BindStudentLevel();
            await this.BindAcademicYear();
            await this.BindStudentIntakeYear();
        },
        async mounted() {
            await this.LoadStudentParentInfo();
            await this.onChangeNationalityBirthPlace();
        },
        data() {
            return {
                countryList: [],
                ddlStudentReligionList: [],
                ddlStudentAdditionalLanguageList: [],
                ddlStudentMealPreferencesList: [],
                ddlStudentMembershipList: [],
                ddlStudentResidencyStatusList: [],
                ddlStudentPayerList: [],
                ddlFatherIdentificationTypeList: [],
                ddlMotherIdentificationTypeList: [],
                ddlParentModeList: [],
                levelList: [],
                academicYearList: [],
                studentIntakeYearList: [],
                ddlChangeStatusToList: [],
                levelList_Level: [],
                academicYearList_Level: [],
                studentIntakeYearList_Level: [],

                inputStudentDateOfBirth: '',
                inputFatherDateofBirth: '',
                inputStudentIdentificationExpiryDate: '',
                inputFirstCommencementDate: '',
                inputFatherIdentificationNoExpiryDate: '',
                inputMotherDateofBirth: '',
                inputMotherIdentificationNoExpiryDate: '',
                ddlStudentGender: '',
                inputStudentFirstName: '',
                inputStudentMiddleName: '',
                inputStudentLastName: '',
                inputStudentPreferredName: '',
                ddlStudentNationality: '',
                ddlStudentBirthPlace: '',
                inputStudentIdentificationNo: '',
                inputStudent1stEmergencyContactNo: '',
                inputStudent2ndEmergencyContactNo: '',
                inputStudentFirstLanguageSpoken: '',
                inputSecondLanguageSpoken: '',
                ddlStudentSelectLevel: '',
                ddlStudentFirstAcademicYear: '',
                inputStudentID: '',
                ddlStudentIntakeYear: '',
                inputStudentAddress1: '',
                inputStudentAddress2: '',
                inputStudentAddress3: '',
                inputStudentCity: '',
                inputStudentPostalCode: '',
                inputStudentCorrespondanceAddress1: '',
                inputStudentCorrespondanceAddress2: '',
                inputStudentCorrespondanceAddress3: '',
                inputStudentCorrespondanceCity: '',
                ddlStudentAddressCorrespondanceCountry: '',
                inputStudentCorrespondancePostalCode: '',
                inputStudentMobileNo: '',
                inputStudentOfficeTelNo: '',
                inputStudentEmail: '',
                taMajorAilmentsList: '',
                taMedicationAllergiesList: '',
                inputBloodGroup: '',
                inputBloodDonorNo: '',
                inputNameofFamilyDoctor: '',
                inputClinicAddress: '',
                inputClinicPhoneNo: '',
                inputFamilyID: '',
                inputFamilyParentID: '',
                inputFatherFirstName: '',
                inputFatherMiddleName: '',
                inputFatherLastName: '',
                inputFatherOccupation: '',
                inputFatherIdentificationNo: '',
                inputFatherMobileNo: '',
                inputFatherEmail: '',
                inputMotherFirstName: '',
                inputMotherMiddleName: '',
                inputMotherLastName: '',
                inputMotherOccupation: '',
                inputMotherIdentificationNo: '',
                inputMotherMobileNo: '',
                inputMotherEmail: '',
                inputParentAddress1: '',
                inputParentAddress2: '',
                inputParentAddress3: '',
                inputParentCity: '',
                inputParentLandlineNo: '',
                ddlParentCountry: '',
                inputParentPostalCode: '',
                ddlStudentAddressCountry: '',
                ddlStudentReligion: '',
                ddlStudentAdditionalLanguage: '',
                ddlStudentMealPreferences: '',
                ddlStudentMembership: '',
                ddlStudentResidencyStatus: '',
                ddlStudentPayer: '',
                ddlFatherIdentificationType: '',
                ddlMotherIdentificationType: '',
                ddlParentMode: '',
                inputStudentBirthCertificate: '',
                inputStudentIC: '',
                inputStudentPassport: '',
                inputStudentPassportExpiryDate: '',
                inputStudentOtherIdentification: '',
                ddlChangeStatusTo: '',
                selectedFile: null,
                ddlStudentSelectLevel_Level: '',
                ddlStudentFirstAcademicYear_Level: '',
                ddlStudentIntakeYear_Level: '',

                editModeDisable: '',
                lblCreateOrEdit: '',
                lblStudentID: '',
                lblParentID: '',
                lblMotherNameDuplicated: '',
                lblFatherNameDuplicated: '',
                parentAreaDiv: '',
                lblStudentIndexNo: '',
                lblCurrentStatus: '',
                imgStudentProfile: '',
                finShowHide: '',
                birthcertShowHide: '',
                icShowHide: '',

                siblingTab: '',
                changeStatusAction: '',
                levelTab: '',

                siblingList: [],
                siblingListAll: [{
                    prop: "Index_No",
                    label: "Student No"
                }, {
                    prop: "Full_Name",
                    label: "First Name"
                }, {
                    prop: "Last_name",
                    label: "Last Name"
                }, {
                    prop: "Regst_date_convert",
                    label: "Regisration Date"
                }, {
                    prop: "CRS_Course_Name",
                    label: "Level"
                }, {
                    prop: "SCH_Name",
                    label: "Center Name"
                }],
                actionCol_Sibling: {
                    label: 'Edit',
                    props: {
                        align: 'center',
                    },
                    buttons: [{
                        props: {
                            type: 'primary',
                            icon: 'el-icon-edit'
                        },
                        handler: row => {
                            window.location.replace('/student?id=' + row.Student_ID);
                        },
                        label: 'Edit'
                    }]
                },

                familyIDList: [],
                familyIDListAll: [{
                    prop: "PAR_ID",
                    label: "Parent ID"
                }, {
                    prop: "PAR_Family_Number",
                    label: "Family No"
                }, {
                    prop: "Parent_FName",
                    label: "Father's Name"
                }, {
                    prop: "Parent_MName",
                    label: "Mother's Name"
                }, {
                    prop: "Parent_GName",
                    label: "Guardian's Name"
                }, {
                    prop: "PAR_Status",
                    label: "Parent's Status"
                }],
                actionCol: {
                    label: 'Select',
                    props: {
                        align: 'center',
                    },
                    buttons: [{
                        props: {
                            type: 'primary',
                            icon: 'el-icon-edit'
                        },
                        handler: row => {
                            this.inputFamilyID = row.PAR_Family_Number;
                            this.inputFamilyParentID = row.PAR_ID;
                            this.divParent = false;
                            this.$refs.familyModalShowModal.hide();
                        },
                        label: 'Select'
                    }]
                },

                lvlLevelList_Level: [],
                lvlLevelList_LevelAll: [{
                    prop: "CRS_Course_Name",
                    label: "Level",
                }, {
                    prop: "SCH_Short_Name",
                    label: "School Name"
                }, {
                    prop: "SMT_Code",
                    label: "Academic Year Code"
                }, {
                    prop: "SCRS_From_Date_convert",
                    label: "Level Start Date"
                }, {
                    prop: "SCRS_To_Date_convert",
                    label: "Level End Date"
                }, {
                    prop: "SCRS_Status",
                    label: "Status"
                }],
                actionCol_Level: {
                    label: 'Class',
                    props: {
                        align: 'center',
                    },
                    buttons: [{
                        props: {
                            type: 'primary',
                            icon: 'el-icon-edit'
                        },
                        handler: row => {
                            window.location.replace('/student-edit-class?courseid=' + row.PK_Student_Course_ID + '&id=' + this.lblStudentID + '&semid=' + row.PK_Semester_ID + '&subjectcourseid=' + row.SCRS_FK_Course_ID);
                        },
                        label: 'Class'
                    }]
                },

                selectedRow: null,
            };
        },
        computed: {
            isdivParent() {
                if (this.divParent === true && this.lblCreateOrEdit === "New" && this.inputFamilyID === "") {
                    return true;
                } else {
                    return false;
                }
            },
            oneIDType() {
                if (this.inputStudentIdentificationExpiryDate === "" && this.inputStudentIdentificationNo === "" && this.inputStudentBirthCertificate === "" && this.inputStudentIC === "" && this.inputStudentPassport === "" && this.inputStudentPassportExpiryDate === "" && this.inputStudentOtherIdentification === "") {
                    return true;
                } else {
                    return false;
                }
            },
            oneFinType() {
                if (this.inputStudentIdentificationExpiryDate === "" && this.inputStudentIdentificationNo === "" && this.inputStudentBirthCertificate === "" && this.inputStudentIC === "" && this.inputStudentPassport === "" && this.inputStudentPassportExpiryDate === "" && this.inputStudentOtherIdentification === "") {
                    return true;
                } else if ((this.inputStudentIdentificationExpiryDate !== "" && this.inputStudentIdentificationNo === "") || (this.inputStudentIdentificationExpiryDate === "" && this.inputStudentIdentificationNo !== "")) {
                    return true;
                } else {
                    return false;
                }
            },
            onePassportType() {
                if (this.inputStudentIdentificationExpiryDate === "" && this.inputStudentIdentificationNo === "" && this.inputStudentBirthCertificate === "" && this.inputStudentIC === "" && this.inputStudentPassport === "" && this.inputStudentPassportExpiryDate === "" && this.inputStudentOtherIdentification === "") {
                    return true;
                } else if ((this.inputStudentPassport !== "" && this.inputStudentPassportExpiryDate === "") || (this.inputStudentPassport === "" && this.inputStudentPassportExpiryDate !== "")) {
                    return true;
                } else {
                    return false;
                }
            },
        },
        validations: {
            inputStudentFirstName: {required},
            inputStudentLastName: {required},
            ddlStudentNationality: {required},
            inputStudentDateOfBirth: {required},
            //ddlStudentSelectLevel: {required},
            inputFirstCommencementDate: {required},
            //ddlStudentFirstAcademicYear: {required},
            ddlStudentPayer: {required},
            //ddlStudentIntakeYear: {required},
            inputStudentAddress1: {required},
            inputStudentPostalCode: {required},
            inputStudentCorrespondanceAddress1: {required},
            inputStudentCorrespondancePostalCode: {required},

            inputStudentIdentificationExpiryDate: {requiredIf: requiredIf('oneFinType')},
            inputStudentIdentificationNo: {requiredIf: requiredIf('oneFinType')},

            inputStudentPassport: {requiredIf: requiredIf('onePassportType')},
            inputStudentPassportExpiryDate: {requiredIf: requiredIf('onePassportType')},

            inputStudentBirthCertificate: {requiredIf: requiredIf('oneIDType')},
            inputStudentIC: {requiredIf: requiredIf('oneIDType')},
            inputStudentOtherIdentification: {requiredIf: requiredIf('oneIDType')},

            ddlParentMode: {requiredIf: requiredIf('isdivParent')},
            inputFatherFirstName: {requiredIf: requiredIf('isdivParent')},
            inputFatherLastName: {requiredIf: requiredIf('isdivParent')},
            inputFatherOccupation: {requiredIf: requiredIf('isdivParent')},
            inputMotherFirstName: {requiredIf: requiredIf('isdivParent')},
            inputMotherLastName: {requiredIf: requiredIf('isdivParent')},
            inputParentAddress1: {requiredIf: requiredIf('isdivParent')},
            inputParentPostalCode: {requiredIf: requiredIf('isdivParent')},
        },
        methods: {
            async BindCountryList() {
                try {
                    const response = await DataSource.shared.getCountryList();
                    if (response) {
                        this.countryListResponse = response.Table;
                        this.countryListResponse.forEach(m => {
                            this.countryList.push(m);
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async BindStudentDropdown() {
                try {
                    let jsonString = '"Religion":"Religion"';
                    jsonString = jsonString + ',"Mother Tongue":"Mother Tongue"';
                    jsonString = jsonString + ',"Meal Preferences":"Meal Preferences"';
                    jsonString = jsonString + ',"Student Membership":"Student Membership"';
                    jsonString = jsonString + ',"Residency Status":"Residency Status"';
                    jsonString = jsonString + ',"Sponsorship Type":"Sponsorship Type"';
                    jsonString = jsonString + ',"ParentID":"ParentID"';
                    jsonString = jsonString + ',"Parent Mode":"Parent Mode"';
                    jsonString = "{" + jsonString + "}";

                    const response = await DataSource.shared.getStudentDropDownList(jsonString);
                    if (response) {
                        this.studentDropDownListResponse = response.Table;
                        this.studentDropDownListResponse.forEach(m => {
                            if (m.OGPname.trim() === 'Religion') {
                                this.ddlStudentReligionList.push(m);
                            } else if (m.OGPname.trim() === 'Mother Tongue') {
                                this.ddlStudentAdditionalLanguageList.push(m);
                            } else if (m.OGPname.trim() === 'Meal Preferences') {
                                this.ddlStudentMealPreferencesList.push(m);
                            } else if (m.OGPname.trim() === 'Student Membership') {
                                this.ddlStudentMembershipList.push(m);
                            } else if (m.OGPname.trim() === 'Residency Status') {
                                this.ddlStudentResidencyStatusList.push(m);
                            } else if (m.OGPname.trim() === 'Sponsorship Type') {
                                this.ddlStudentPayerList.push(m);
                            } else if (m.OGPname.trim() === 'ParentID') {
                                this.ddlFatherIdentificationTypeList.push(m);
                                this.ddlMotherIdentificationTypeList.push(m);
                            } else if (m.OGPname.trim() === 'Parent Mode') {
                                this.ddlParentModeList.push(m);
                            }
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async BindStudentLevel() {
                try {
                    const response = await DataSource.shared.getLevel('');
                    if (response) {
                        this.levelListResponse = response.Table;
                        this.levelListResponse.forEach(m => {
                            this.levelList.push(m);
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async BindStudentLevel_Level(customLevelNotEqual) {
                try {
                    const response = await DataSource.shared.getLevel(customLevelNotEqual);
                    if (response) {
                        this.levelListResponse = response.Table;
                        this.levelListResponse.forEach(m => {
                            this.levelList_Level.push(m);
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async BindAcademicYear() {
                try {
                    const response = await DataSource.shared.getAcademicYear();
                    if (response) {
                        this.academicYearListResponse = response.Table;
                        this.academicYearListResponse.forEach(m => {
                            //this.academicYearList.push(m);
                            this.academicYearList_Level.push(m);
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async BindStudentIntakeYear() {
                try {
                    const response = await DataSource.shared.getIntakeYear();
                    if (response) {
                        this.studentIntakeYearListResponse = response.Table;
                        this.studentIntakeYearListResponse.forEach(m => {
                            //this.studentIntakeYearList.push(m);
                            this.studentIntakeYearList_Level.push(m);
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async LoadStudentParentInfo() {
                try {
                    if (this.$route.query.id != null || this.$route.query.id != undefined) {
                        this.lblCreateOrEdit = "Edit";
                        this.lblStudentID = this.$route.query.id;
                        this.editModeDisable = true;
                        this.siblingTab = true;
                        this.levelTab = true;
                        this.divFamilySearch = false;
                        this.divEditParentLink = true;
                        this.changeStatusAction = true;
                        let parentID;

                        const stuRes = await DataSource.shared.getStudent(this.$route.query.id, "", "", "", "");
                        if (stuRes) {
                            if (stuRes.code == "2") {
                                alert('No record found');
                            } else if (stuRes.code == "99") {
                                alert('Please try again later');
                            } else {
                                this.BindActiveIntakeYear();
                                this.BindStudentFields(stuRes.Table);
                                this.BindStudentSibling();
                            }
                        }

                        const stuProPic = await DataSource.shared.getStudentProfilePicture(this.$route.query.id);
                        if (stuProPic) {
                            if (stuProPic.code !== "2" && stuProPic.code !== "99") {
                                this.stuProPicLoop = stuProPic.Table;
                                this.stuProPicLoop.forEach(m => {
                                    this.imgStudentProfile = API_HOST + '/db/Files/' + m.SF_File_Name;
                                });
                            }
                        }

                        const relRes = await DataSource.shared.getRelationship("", this.$route.query.id, "", "", "");
                        if (relRes) {
                            if (relRes.code == "2") {
                                alert('No record found');
                            } else if (relRes.code == "99") {
                                alert('Please try again later');
                            } else {
                                this.relResLoop = relRes.Table;
                                this.relResLoop.forEach(m => {
                                    parentID = m.PAR_ID;
                                });

                                const parRes = await DataSource.shared.getParent(parentID, "");
                                if (parRes) {
                                    this.BindParentFields(parRes.Table);
                                }
                            }
                        }

                        const response = await DataSource.shared.getStudentLevel(this.$route.query.id);
                        if (response) {
                            if (response.code == 2)
                            {
                                alert('No record found');
                            }
                            else if (response.code == 99) {
                                alert('Please try again later');
                            }
                            else
                            {
                                this.lvlLevelList_Level = response.Table;

                                //filter the added level to BindStudentLevel
                                let customLevelNotEqual='';
                                this.GetStudentLevelListResponse = response.Table;
                                this.GetStudentLevelListResponse.forEach(m => {
                                    if (customLevelNotEqual == '')
                                    {
                                        customLevelNotEqual = m.PK_Course_ID;
                                    }
                                    else
                                    {
                                        customLevelNotEqual = customLevelNotEqual + "," + m.PK_Course_ID;
                                    }
                                });

                                this.BindStudentLevel_Level(customLevelNotEqual);
                                //filter the added level to BindStudentLevel
                            }
                        }
                    } else {
                        this.editModeDisable = false;
                        this.lblCreateOrEdit = "New";
                        this.siblingTab = false;
                        this.levelTab = false;
                        this.divFamilySearch = true;
                        this.divEditParentLink = false;
                        this.changeStatusAction = false;

                        this.ddlStudentAddressCountry = 'Singapore';
                        this.ddlStudentAddressCorrespondanceCountry = 'Singapore';
                        this.ddlParentCountry = 'Singapore';
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async BindActiveIntakeYear() {
                try {
                    const response = await DataSource.shared.getStudentLevelActiveOnly(this.$route.query.id);
                    if (response) {
                        response.Table.forEach(m => {
                            this.ddlStudentIntakeYear = m.SCRS_Course_Year;
                        });
                    }

                } catch (e) {
                    this.results = e;
                }
            },
            async BindStudentAvailableStatusAction(currentStatus) {
                try {
                    const response = await DataSource.shared.getStudentAvailableStatusAction(currentStatus);
                    if (response) {
                        this.ddlChangeStatusToListResponse = response.Table1;
                        this.ddlChangeStatusToListResponse.forEach(m => {
                            this.ddlChangeStatusToList.push(m);
                        });
                    }

                } catch (e) {
                    this.results = e;
                }
            },
            async BindStudentFields(resultTable) {
                try {
                    resultTable.forEach(m => {
                        this.BindStudentAvailableStatusAction(m.Status);
                        this.lblCurrentStatus = m.Status;
                        this.lblStudentIndexNo = m.Index_No;
                        this.inputStudentID = m.Index_No;
                        this.inputStudentFirstName = m.Full_Name;
                        this.inputStudentMiddleName = m.Middle_name;
                        this.inputStudentLastName = m.Last_name;
                        this.ddlStudentGender = m.Sex;
                        this.inputStudentCorrespondanceAddress1 = m.st_corr_add_flrNo;
                        this.inputStudentCorrespondanceAddress2 = m.st_corr_add_blkNo;
                        this.inputStudentCorrespondanceCity = m.st_corr_add_stName;
                        this.inputStudentCorrespondancePostalCode = m.st_corr_add_pstcode;
                        this.inputStudentPostalCode = m.st_prm_add_pstcode;
                        this.inputStudentAddress1 = m.st_prm_add_blkNo;
                        this.inputStudentAddress2 = m.st_prm_add_flrNo;
                        this.inputStudentAddress3 = m.st_prm_add_BlgName;
                        if (m.DOB_convert !== '01/01/1901') { this.inputStudentDateOfBirth = m.DOB_convert; };
                        this.ddlStudentReligion = m.St_Religion;
                        this.ddlStudentNationality = m.Nationality;
                        if (m.Regst_date_convert !== '01/01/1901') { this.inputFirstCommencementDate = m.Regst_date_convert; };
                        this.ddlStudentAddressCountry = m.st_prm_add_country;
                        this.inputStudentMobileNo = m.Handphone;
                        this.inputStudentCorrespondanceAddress3 = m.st_corr_add_BlgName;
                        this.ddlStudentResidencyStatus = m.student_type;
                        this.ddlStudentPayer = m.sponsor_type;
                        this.inputStudentIdentificationNo = m.ID_Number;
                        this.inputStudentCity = m.st_prm_add_stName;
                        this.ddlStudentAddressCorrespondanceCountry = m.st_corr_add_country;
                        this.inputStudent2ndEmergencyContactNo = m.Fax;
                        this.inputStudentEmail = m.email;
                        this.inputStudent1stEmergencyContactNo = m.Telephone;
                        this.inputStudentOfficeTelNo = m.Offphone;
                        //this.ddlStudentSelectLevel = m.Course_Type;
                        this.inputNameofFamilyDoctor = m.Family_Doctor;
                        this.taMajorAilmentsList = m.Ailments;
                        this.taMedicationAllergiesList = m.medication_allergic_to;
                        this.inputBloodGroup = m.BLD_grp;
                        this.inputBloodDonorNo = m.BLD_donor_no;
                        this.inputClinicAddress = m.clinic_add;
                        this.inputClinicPhoneNo = m.clinic_ph_no;
                        //this.ddlStudentFirstAcademicYear = m.Semester;
                        this.inputStudentPreferredName = m.St_Preferred_Name;
                        this.ddlStudentAdditionalLanguage = m.St_Mother_Tongue;
                        this.ddlStudentMealPreferences = m.St_Meal_Preferences;
                        this.ddlStudentBirthPlace = m.St_Birth_Place;
                        this.inputStudentFirstLanguageSpoken = m.St_AdditionalLanguage;
                        this.inputSecondLanguageSpoken = m.St_SecondLanguageSpoken;
                        this.ddlStudentMembership = m.ST_StudentMemership;
                        if (m.ID_ExpDate_convert !== '01/01/1901') { this.inputStudentIdentificationExpiryDate = m.ID_ExpDate_convert; };
                        this.inputStudentBirthCertificate = m.St_BirthCer_Number;
                        this.inputStudentIC = m.St_IC_ID_Number;
                        this.inputStudentPassport = m.St_Passport_Number;
                        if (m.St_Passport_ExpDate_convert !== '01/01/1901') { this.inputStudentPassportExpiryDate = m.St_Passport_ExpDate_convert; };
                        this.inputStudentOtherIdentification = m.St_Identification_Others;
                    });
                } catch (e) {
                    this.results = e;
                }
            },
            async BindParentFields(resultTable) {
                try {
                    resultTable.forEach(m => {
                        this.lblParentID = m.PAR_ID;
                        this.ddlParentMode = m.PAR_Mode;
                        this.inputFatherFirstName = m.PAR_Father_FirstName;
                        this.inputFatherMiddleName = m.PAR_Father_MiddleName;
                        this.inputFatherLastName = m.PAR_Father_LastName;
                        if (m.PAR_Father_DOB_convert !== '01/01/1901') { this.inputFatherDateofBirth = m.PAR_Father_DOB_convert; };
                        this.inputFatherOccupation = m.PAR_Father_Occupation;
                        this.inputParentLandlineNo = m.PAR_FatResContact;
                        this.inputFatherMobileNo = m.PAR_Father_Phone;
                        this.inputFatherEmail = m.PAR_Father_Email;
                        this.ddlFatherIdentificationType = m.PAR_Father_IDType;
                        this.inputFatherIdentificationNo = m.PAR_Father_UID;
                        this.inputParentAddress1 = m.PAR_Father_Loc_Residence_No;
                        this.inputParentAddress2 = m.PAR_Father_Loc_Address1;
                        this.inputParentAddress3 = m.PAR_Father_Loc_Address2;
                        this.inputParentPostalCode = m.PAR_Father_Loc_Postalcode;
                        this.inputParentCity = m.PAR_Father_Loc_City;
                        this.ddlParentCountry = m.PAR_Father_Loc_Country;
                        this.inputParentCity = m.PAR_Father_City;
                        this.ddlParentCountry = m.PAR_Father_Country;
                        this.inputParentPostalCode = m.PAR_Father_PostalCode;
                        this.inputMotherFirstName = m.PAR_Mother_FirstName;
                        this.inputMotherMiddleName = m.PAR_Mother_MiddleName;
                        this.inputMotherLastName = m.PAR_Mother_LastName;
                        if (m.PAR_Mother_DOB_convert !== '01/01/1901') { this.inputMotherDateofBirth = m.PAR_Mother_DOB_convert; };
                        this.inputMotherOccupation = m.PAR_Mother_Occupation;
                        this.inputParentLandlineNo = m.PAR_MotResContact;
                        this.inputMotherMobileNo = m.PAR_Mother_Phone;
                        this.inputMotherEmail = m.PAR_Mother_Email;
                        this.ddlMotherIdentificationType = m.PAR_Mother_IDType;
                        this.inputMotherIdentificationNo = m.PAR_Mother_UID;
                        this.inputParentAddress1 = m.PAR_Mother_Loc_Residence_No;
                        this.inputParentAddress2 = m.PAR_Mother_Loc_Address1;
                        this.inputParentAddress3 = m.PAR_Mother_Loc_Address2;
                        this.inputParentCity = m.PAR_Mother_Loc_City;
                        this.ddlParentCountry = m.PAR_Mother_Loc_Country;
                        this.inputParentPostalCode = m.PAR_Mother_Loc_Postalcode;
                        this.inputParentCity = m.PAR_Mother_City;
                        this.ddlParentCountry = m.PAR_Mother_Country;
                        this.inputParentPostalCode = m.PAR_Mother_PostalCode;
                        this.inputParentLandlineNo = m.PAR_GarResContact;
                        this.inputParentAddress1 = m.PAR_Guardian_Loc_Residence_No;
                        this.inputParentAddress1 = m.PAR_Guardian_Loc_City;
                        this.inputParentAddress2 = m.PAR_Guardian_Loc_Country;
                        this.inputParentAddress3 = m.PAR_Guardian_Loc_PostalCode;
                        this.inputParentAddress1 = m.PAR_Guardian_Residence_No;
                        this.inputParentAddress2 = m.PAR_Guardian_Address1;
                        this.inputParentAddress3 = m.PAR_Guardian_Address2;
                        this.inputParentCity = m.PAR_Guardian_City;
                        this.ddlParentCountry = m.PAR_Guardian_Country;
                        this.inputParentPostalCode = m.PAR_Guardian_Postalcode;
                        if (m.PAR_Father_IDExpDate_convert !== '01/01/1901') { this.inputFatherIdentificationNoExpiryDate = m.PAR_Father_IDExpDate_convert; };
                        if (m.PAR_Mother_IDExpDate_convert !== '01/01/1901') { this.inputMotherIdentificationNoExpiryDate = m.PAR_Mother_IDExpDate_convert; };
                        this.inputFamilyID = m.PAR_Family_Number;
                    });
                } catch (e) {
                    this.results = e;
                }
            },
            async BindStudentSibling() {
                try {
                    const response = await DataSource.shared.getSibling('', this.$route.query.id);
                    if (response) {
                        if (response.Table.length > 0) {
                            this.siblingList = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async Save() {
                try {
                    //students
                    let jsonString = '"Full_Name":"' + this.inputStudentFirstName + '"';
                    jsonString = jsonString + ',"Middle_name":"' + this.inputStudentMiddleName + '"';
                    jsonString = jsonString + ',"Last_name":"' + this.inputStudentLastName + '"';
                    jsonString = jsonString + ',"Sex":"' + this.ddlStudentGender + '"';
                    jsonString = jsonString + ',"st_corr_add_flrNo":"' + this.inputStudentCorrespondanceAddress1 + '"';
                    jsonString = jsonString + ',"st_corr_add_blkNo":"' + this.inputStudentCorrespondanceAddress2 + '"';
                    jsonString = jsonString + ',"st_corr_add_stName":"' + this.inputStudentCorrespondanceCity + '"';
                    jsonString = jsonString + ',"st_corr_add_pstcode":"' + this.inputStudentCorrespondancePostalCode + '"';
                    jsonString = jsonString + ',"st_prm_add_pstcode":"' + this.inputStudentPostalCode + '"';
                    jsonString = jsonString + ',"st_prm_add_blkNo":"' + this.inputStudentAddress1 + '"';
                    jsonString = jsonString + ',"st_prm_add_flrNo":"' + this.inputStudentAddress2 + '"';
                    jsonString = jsonString + ',"st_prm_add_BlgName":"' + this.inputStudentAddress3 + '"';
                    jsonString = jsonString + ',"DOB":"' + this.inputStudentDateOfBirth + '"';
                    jsonString = jsonString + ',"St_Religion":"' + this.ddlStudentReligion + '"';
                    jsonString = jsonString + ',"Nationality":"' + this.ddlStudentNationality + '"';
                    jsonString = jsonString + ',"Regst_date":"' + this.inputFirstCommencementDate + '"';
                    jsonString = jsonString + ',"st_prm_add_country":"' + this.ddlStudentAddressCountry + '"';
                    jsonString = jsonString + ',"Handphone":"' + this.inputStudentMobileNo + '"';
                    jsonString = jsonString + ',"st_corr_add_BlgName":"' + this.inputStudentCorrespondanceAddress3 + '"';
                    jsonString = jsonString + ',"student_type":"' + this.ddlStudentResidencyStatus + '"';
                    jsonString = jsonString + ',"sponsor_type":"' + this.ddlStudentPayer + '"';
                    jsonString = jsonString + ',"ID_Number":"' + this.inputStudentIdentificationNo + '"';
                    jsonString = jsonString + ',"st_prm_add_stName":"' + this.inputStudentCity + '"';
                    jsonString = jsonString + ',"st_corr_add_country":"' + this.ddlStudentAddressCorrespondanceCountry + '"';
                    jsonString = jsonString + ',"Fax":"' + this.inputStudent2ndEmergencyContactNo + '"';
                    jsonString = jsonString + ',"email":"' + this.inputStudentEmail + '"';
                    jsonString = jsonString + ',"Telephone":"' + this.inputStudent1stEmergencyContactNo + '"';
                    jsonString = jsonString + ',"Offphone":"' + this.inputStudentOfficeTelNo + '"';
                    //jsonString = jsonString + ',"Course_Type":"' + this.ddlStudentSelectLevel + '"';
                    jsonString = jsonString + ',"Family_Doctor":"' + this.inputNameofFamilyDoctor + '"';
                    jsonString = jsonString + ',"Ailments":"' + this.taMajorAilmentsList + '"';
                    jsonString = jsonString + ',"medication_allergic_to":"' + this.taMedicationAllergiesList + '"';
                    jsonString = jsonString + ',"BLD_grp":"' + this.inputBloodGroup + '"';
                    jsonString = jsonString + ',"BLD_donor_no":"' + this.inputBloodDonorNo + '"';
                    jsonString = jsonString + ',"clinic_add":"' + this.inputClinicAddress + '"';
                    jsonString = jsonString + ',"clinic_ph_no":"' + this.inputClinicPhoneNo + '"';
                    //jsonString = jsonString + ',"Semester":"' + this.ddlStudentFirstAcademicYear + '"';
                    jsonString = jsonString + ',"St_Preferred_Name":"' + this.inputStudentPreferredName + '"';
                    jsonString = jsonString + ',"St_Mother_Tongue":"' + this.ddlStudentAdditionalLanguage + '"';
                    jsonString = jsonString + ',"St_Meal_Preferences":"' + this.ddlStudentMealPreferences + '"';
                    jsonString = jsonString + ',"St_Birth_Place":"' + this.ddlStudentBirthPlace + '"';
                    jsonString = jsonString + ',"St_AdditionalLanguage":"' + this.inputStudentFirstLanguageSpoken + '"';
                    jsonString = jsonString + ',"St_SecondLanguageSpoken":"' + this.inputSecondLanguageSpoken + '"';
                    jsonString = jsonString + ',"ST_StudentMemership":"' + this.ddlStudentMembership + '"';
                    jsonString = jsonString + ',"ID_ExpDate":"' + this.inputStudentIdentificationExpiryDate + '"';
                    jsonString = jsonString + ',"St_BirthCer_Number":"' + this.inputStudentBirthCertificate + '"';
                    jsonString = jsonString + ',"St_IC_ID_Number":"' + this.inputStudentIC + '"';
                    jsonString = jsonString + ',"St_Passport_Number":"' + this.inputStudentPassport + '"';
                    jsonString = jsonString + ',"St_Passport_ExpDate":"' + this.inputStudentPassportExpiryDate + '"';
                    jsonString = jsonString + ',"St_Identification_Others":"' + this.inputStudentOtherIdentification + '"';
                    //students

                    //parent
                    let jsonString2 = '"PAR_Mode":"' + this.ddlParentMode + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_FirstName":"' + this.inputFatherFirstName + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_MiddleName":"' + this.inputFatherMiddleName + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_LastName":"' + this.inputFatherLastName + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_DOB":"' + this.inputFatherDateofBirth + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Occupation":"' + this.inputFatherOccupation + '"';
                    jsonString2 = jsonString2 + ',"PAR_FatResContact":"' + this.inputParentLandlineNo + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Phone":"' + this.inputFatherMobileNo + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Email":"' + this.inputFatherEmail + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_IDType":"' + this.ddlFatherIdentificationType + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_UID":"' + this.inputFatherIdentificationNo + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Loc_Residence_No":"' + this.inputParentAddress1 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Loc_Address1":"' + this.inputParentAddress2 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Loc_Address2":"' + this.inputParentAddress3 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Loc_Postalcode":"' + this.inputParentPostalCode + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Loc_City":"' + this.inputParentCity + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Loc_Country":"' + this.ddlParentCountry + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_City":"' + this.inputParentCity + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Country":"' + this.ddlParentCountry + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_PostalCode":"' + this.inputParentPostalCode + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_FirstName":"' + this.inputMotherFirstName + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_MiddleName":"' + this.inputMotherMiddleName + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_LastName":"' + this.inputMotherLastName + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_DOB":"' + this.inputMotherDateofBirth + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Occupation":"' + this.inputMotherOccupation + '"';
                    jsonString2 = jsonString2 + ',"PAR_MotResContact":"' + this.inputParentLandlineNo + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Phone":"' + this.inputMotherMobileNo + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Email":"' + this.inputMotherEmail + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_IDType":"' + this.ddlMotherIdentificationType + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_UID":"' + this.inputMotherIdentificationNo + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Loc_Residence_No":"' + this.inputParentAddress1 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Loc_Address1":"' + this.inputParentAddress2 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Loc_Address2":"' + this.inputParentAddress3 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Loc_City":"' + this.inputParentCity + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Loc_Country":"' + this.ddlParentCountry + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Loc_Postalcode":"' + this.inputParentPostalCode + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_City":"' + this.inputParentCity + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Country":"' + this.ddlParentCountry + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_PostalCode":"' + this.inputParentPostalCode + '"';
                    jsonString2 = jsonString2 + ',"PAR_GarResContact":"' + this.inputParentLandlineNo + '"';
                    jsonString2 = jsonString2 + ',"PAR_Guardian_Loc_Residence_No":"' + this.inputParentAddress1 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Guardian_Loc_City":"' + this.inputParentAddress1 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Guardian_Loc_Country":"' + this.inputParentAddress2 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Guardian_Loc_PostalCode":"' + this.inputParentAddress3 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Guardian_Residence_No":"' + this.inputParentAddress1 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Guardian_Address1":"' + this.inputParentAddress2 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Guardian_Address2":"' + this.inputParentAddress3 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Guardian_City":"' + this.inputParentCity + '"';
                    jsonString2 = jsonString2 + ',"PAR_Guardian_Country":"' + this.ddlParentCountry + '"';
                    jsonString2 = jsonString2 + ',"PAR_Guardian_Postalcode":"' + this.inputParentPostalCode + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_IDExpDate":"' + this.inputFatherIdentificationNoExpiryDate + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_IDExpDate":"' + this.inputMotherIdentificationNoExpiryDate + '"';
                    //parent

                    jsonString = '{ ' + jsonString + ' }';
                    jsonString2 = '{ ' + jsonString2 + ' }';

                    if (this.lblCreateOrEdit == "New") {
                        const chkStuRes = await DataSource.shared.checkStudentDuplication(this.inputStudentFirstName, this.inputStudentLastName, this.inputStudentDateOfBirth, this.inputStudentIdentificationExpiryDate, this.inputStudentIdentificationNo, this.inputStudentBirthCertificate, this.inputStudentIC, this.inputStudentPassport, this.inputStudentPassportExpiryDate, this.inputStudentOtherIdentification);
                        if (chkStuRes) {
                            if (chkStuRes.code == "1") {
                                const saveStuRes = await DataSource.shared.saveStudent(this.selectedFile, jsonString, jsonString2, this.inputFamilyID, this.inputFamilyParentID);
                                if (saveStuRes) {
                                    if (saveStuRes.code == "1") {
                                        alert('Records Successfully Saved');
                                        window.location.replace('/student?id=' + saveStuRes.studentID);
                                    } else {
                                        alert("Save Student Error - Please try again later");
                                    }
                                }
                            } else if (chkStuRes.code == "2") {
                                alert("This student is existing");
                            } else {
                                alert("Check Student Error - Please try again later");
                            }
                        }
                    } else if (this.lblCreateOrEdit == "Edit") {
                        try {
                            const response = await DataSource.shared.updateStudent(this.selectedFile, this.lblStudentID, jsonString);
                            if (response) {
                                if (response.code == 1) {
                                    alert('Records Successfully Edited');
                                    window.location.replace('/student?id=' + this.lblStudentID);
                                } else {
                                    alert('Update Student Error - Please try again later');
                                }
                            }
                        } catch (e) {
                            this.results = e;
                        }
                    } else {
                        //this.$message("Error! Please try again later")
                        alert("Error! Please try again later");
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async SearchFamilyID() {
                try {
                    const response = await DataSource.shared.getRelationship(this.$refs.familyIDFamilyNo.value, '', this.$refs.familyParentFirstName.value, this.$refs.familyParentLastName.value, this.$refs.familyIDStudentName.value);
                    if (response) {
                        this.familyIDList = response.Table;
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async CheckParentDup() {
                try {
                    if (this.inputMotherFirstName !== '' && this.inputMotherLastName !== '') {
                        const response = await DataSource.shared.checkParentDuplication(this.inputMotherFirstName, this.inputMotherLastName, 'Mother');
                        if (response) {
                            if (response.code == 1) {
                                this.lblMotherNameDuplicated = false;
                            } else if (response.code == 2) {
                                this.lblMotherNameDuplicated = true;
                            }
                        }
                    }

                    if (this.inputFatherFirstName !== '' && this.inputFatherLastName !== '') {
                        const response = await DataSource.shared.checkParentDuplication(this.inputFatherFirstName, this.inputFatherLastName, 'Father');
                        if (response) {
                            if (response.code == 1) {
                                this.lblFatherNameDuplicated = false;
                            } else if (response.code == 2) {
                                this.lblFatherNameDuplicated = true;
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async StatusAction() {
                try {
                    if (this.ddlChangeStatusTo === '' || this.ddlChangeStatusTo === null)
                    {
                        alert('Please select status to change');
                    }
                    else if (this.ddlChangeStatusTo === 'Active')
                    {
                        if (this.lblStudentIndexNo === undefined || this.lblStudentIndexNo === '')
                        {
                            this.Active();
                        }
                        else
                        {
                            this.ChangeStatus();
                        }
                    }
                    else
                    {
                        this.ChangeStatus();
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async Active() {
                try {
                    const response = await DataSource.shared.activeStudent(this.lblStudentID);
                    if (response) {
                        if (response.code == 1) {
                            alert('Successfully activated');
                            window.location.replace('/student?id=' + this.lblStudentID);
                        } else {
                            alert('Please try again later');
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async ChangeStatus() {
                try {
                    const response = await DataSource.shared.updateStudentStatus(this.lblStudentID, this.ddlChangeStatusTo);
                    if (response) {
                        if (response.code == 1) {
                            alert('Successfully change status');
                            window.location.replace('/student?id=' + this.lblStudentID);
                        } else {
                            alert('Please try again later');
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async Validation() {
                try {
                    this.$v.$touch();

                    if (this.$v.$error) {
                        //this.$nextTick(() => this.$refs.studentPageMain.focus())
                        alert('Please fill in all * fields & at least one of ** field');
                        return;
                    }

                    const firstCommencementDate_array = this.inputFirstCommencementDate.split("/");
                    const studentDateOfBirth_array = this.inputStudentDateOfBirth.split("/");
                    let firstCommencementDate = new Date(firstCommencementDate_array[2], firstCommencementDate_array[1] - 1, firstCommencementDate_array[0]);
                    let studentDateOfBirth = new Date(studentDateOfBirth_array[2], studentDateOfBirth_array[1] - 1, studentDateOfBirth_array[0]);
                    if (studentDateOfBirth > firstCommencementDate)
                    {
                        alert('First Commencement Date cannot early Date of Birth');
                        return;
                    }

                    this.Save();
                } catch (e) {
                    this.results = e;
                }
            },
            async CancelUseFamilyNo() {
                try {
                    this.divParent = true;
                    this.inputFamilyID = '';
                    this.inputFamilyParentID = '';
                } catch (e) {
                    this.results = e;
                }
            },
            async uploadStudentProfileImg() {
                try {
                    this.$refs.file.click();
                } catch (e) {
                    this.results = e;
                }
            },
            previewImgStudentProfile: function(event) {
                try {
                    var input = event.target;
                    if (input.files && input.files[0]) {
                        var reader = new FileReader();
                        reader.onload = (e) => {
                            this.imgStudentProfile = e.target.result;
                        }
                        reader.readAsDataURL(input.files[0]);
                        this.selectedFile = event.target.files;
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async onChangeNationalityBirthPlace() {
                try {
                    if (this.ddlStudentNationality === '' && this.ddlStudentBirthPlace === '')
                    {
                        this.finShowHide = false;
                        this.birthcertShowHide = false;
                        this.icShowHide = false;
                    }
                    else if ((this.ddlStudentNationality === 'Singaporean' && this.ddlStudentBirthPlace === '') || (this.ddlStudentNationality === '' && this.ddlStudentBirthPlace === 'Singapore') || (this.ddlStudentNationality === 'Singaporean' && this.ddlStudentBirthPlace === 'Singapore'))
                    {
                        this.finShowHide = false;
                        this.inputStudentIdentificationNo = '';
                        this.inputStudentIdentificationExpiryDate = '';

                        this.birthcertShowHide = true;

                        this.icShowHide = true;
                    }
                    else if (this.ddlStudentNationality !== 'Singaporean' && this.ddlStudentBirthPlace === 'Singapore')
                    {
                        this.finShowHide = true;

                        this.birthcertShowHide = true;

                        this.icShowHide = false;
                        this.inputStudentIC = '';
                    }
                    else if (this.ddlStudentNationality === 'Singaporean' && this.ddlStudentBirthPlace !== 'Singapore')
                    {
                        this.finShowHide = false;
                        this.inputStudentIdentificationNo = '';
                        this.inputStudentIdentificationExpiryDate = '';

                        this.birthcertShowHide = false;
                        this.inputStudentBirthCertificate = '',

                            this.icShowHide = true;
                    }
                    else if (this.ddlStudentNationality !== 'Singaporean' && this.ddlStudentBirthPlace !== 'Singapore')
                    {
                        this.finShowHide = true;

                        this.birthcertShowHide = false;
                        this.inputStudentBirthCertificate = '',

                            this.icShowHide = false;
                        this.inputStudentIC = '';
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async EditParentLink(){
                window.location.replace('/parent?id=' + this.lblParentID);
            },
            studentLevelListActivate(row) {
                return [{
                    name: 'Activate',
                    handler: _ => {
                        this.updateLevel(row.PK_Student_Course_ID, "Activate");
                    }
                }]
            },
            studentLevelListDeactivate(row) {
                return [{
                    name: 'Deactivate',
                    handler: _ => {
                        this.updateLevel(row.PK_Student_Course_ID, "Deactivate");
                    }
                }]
            },
            async updateLevel(courseID, mode) {
                try {
                    const response = await DataSource.shared.updateLevel(this.lblStudentID, courseID, mode);
                    if (response) {
                        if (response.code == 1)
                        {
                            alert('Edit Successfully!');
                            window.location.replace('/student?id=' + this.lblStudentID);
                        }
                        else if (response.code == 2) {
                            alert('Cannot have multiple active level');
                        }
                        else
                        {
                            alert('Error! Please try again later.');
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async AddLevel() {
                try {
                    if (this.lblStudentID !== "" && this.ddlStudentSelectLevel_Level !== "" && this.ddlStudentFirstAcademicYear_Level !== "" && this.ddlStudentIntakeYear_Level !== "")
                    {
                        const getAcaYearRes = await DataSource.shared.getAcademicYearDateRange(this.ddlStudentFirstAcademicYear_Level);

                        if (getAcaYearRes)
                        {
                            if (getAcaYearRes.code == "99")
                            {
                                alert('Get Academic Year Error - Please try again later');
                            }
                            else
                            {
                                let academicYearFromDate, academicYearToDate;

                                this.getAcaYearResTemp = getAcaYearRes.Table;
                                this.getAcaYearResTemp.forEach(m => {
                                    academicYearFromDate = m.SMT_From;
                                    academicYearToDate = m.SMT_To;
                                });

                                const getSetLvlRes = await DataSource.shared.setLevel(this.lblStudentID, this.ddlStudentSelectLevel_Level, academicYearFromDate, academicYearToDate, this.ddlStudentFirstAcademicYear_Level, this.ddlStudentIntakeYear_Level);

                                if (getSetLvlRes)
                                {
                                    if (getSetLvlRes.code == "1")
                                    {
                                        alert('Records Successfully Saved');
                                        window.location.replace('/student?id=' + this.lblStudentID);
                                    }
                                    else if (getSetLvlRes.code == "2")
                                    {
                                        alert('cannot have multiple active level');
                                    }
                                    else
                                    {
                                        alert('Save Student Level Error - Please try again later');
                                    }
                                }
                            }
                        }
                    }
                    else
                    {
                        alert('Please select level, academic year and intake year');
                    }

                } catch (e) {
                    this.results = e;
                }
            },
            async GetGoogleAPI(postcodeModel) {
                try {
                    if (postcodeModel === 'inputStudentPostalCode' && this.inputStudentPostalCode !== '' && this.inputStudentAddress1 === '') {
                        const response = await DataSource.shared.getStudentAddressGoogleAPI(this.inputStudentPostalCode, this.ddlStudentAddressCountry);
                        if (response !== '') {
                            this.inputStudentAddress1 = response;
                        }
                    }
                    else if (postcodeModel === 'inputStudentCorrespondancePostalCode' && this.inputStudentCorrespondancePostalCode !== '' && this.inputStudentCorrespondanceAddress1 === '') {
                        const response = await DataSource.shared.getStudentAddressGoogleAPI(this.inputStudentCorrespondancePostalCode, this.ddlStudentAddressCorrespondanceCountry);
                        if (response !== '') {
                            this.inputStudentCorrespondanceAddress1 = response;
                        }
                    }
                    else if (postcodeModel === 'inputParentPostalCode' && this.inputParentPostalCode !== '' && this.inputParentAddress1 === '') {
                        const response = await DataSource.shared.getStudentAddressGoogleAPI(this.inputParentPostalCode, this.ddlParentCountry);
                        if (response !== '') {
                            this.inputParentAddress1 = response;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
        },
    };
</script>

<style scoped>
    .studentAreaDiv, .familyIDAreaDiv, .parentAreaDiv, .amAreaDiv, .ecAreaDiv {

    }

    .btnFamilyIDSearch {
        margin-top: 10px;
    }

    .el-date-editor, .el-input {
        width: 100% !important;
    }

    .requiredFields {
        border-color: #f79483;
    }

    .requiredFieldsMsg {
        color: red;
        font-weight: bold;
    }

    .buttonArea
    {
        margin:20px 0 0 0;
    }

    .buttonArea .btn-primary
    {
        margin:0 0 0 20px;
    }

    .btn-primary
    {
        display:inline;
    }

    .modeArea
    {
        text-align:left;
    }

    .textArea
    {
        width:100%;
        resize:none;
    }

    ::-webkit-scrollbar-track
    {
        background-color:whitesmoke;
    }

    .lblSearchFamily
    {
        width:100%;
    }

    .siblingNoRecordArea
    {
        padding:20px;
    }

    .changeStatusArea
    {
        background-color: white;
        text-align:left;
        padding:0px;
    }

    .ddlChangeStatusTo, .lblChangeStatusTo, .btnChangeStatus
    {
        width:auto;
        display:inline !important;
        margin:10px;
    }

    .imgStudentProfile:hover
    {
        cursor:pointer;
    }

    .imgStudentProfile
    {
        width:300px;
        height:300px;
    }

    .profilePictureArea
    {
        text-align:left;
    }

    .familyIDAreaDiv button
    {
        margin-bottom:20px;
    }
</style>

<style>


    .studentPageBTabs .tab-content {
        margin-top: 30px;
    }

    .studentPageBTabs .nav-link {
        font-weight: bold;
    }

    .studentPageBTabs .nav-tabs .nav-link.active {
        background-color: #413f56;
        color: white;
        border: 5px solid #dee2e6;
    }

    .studentPageBTabs .nav-tabs {
        border-bottom: 5px solid #dee2e6;
    }
</style>