<template>
    <div id="student">
        <div class="datatable-edit__header">
            <div class="container">
                <h3>Student Details</h3>
                <a href="/student-list?mode=Search">Student List</a> > Student Edit<br/>
                <label style="display:inline !important;">Mode: </label><label style="display:inline !important;">{{lblCreateOrEdit}}</label>
                <label style="display:none !important;">{{lblStudentID}}</label>
                <label style="display:none !important;">{{lblParentID}}</label>
                <label style="display:none !important;">{{lblStudentIndexNo}}</label>
            </div>
        </div>
        <!--<div class="row form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">-->
        <!--<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 modeArea">-->
        <!--<label style="display:inline !important;">Mode: </label><label style="display:inline !important;">{{lblCreateOrEdit}}</label>-->
        <!--<label style="display:none !important;">{{lblStudentID}}</label>-->
        <!--<label style="display:none !important;">{{lblParentID}}</label>-->
        <!--<label style="display:none !important;">{{lblStudentIndexNo}}</label>-->
        <!--</div>-->
        <!--</div>-->
        <div v-if="changeStatusAction" class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12 changeStatusArea">
            <!--<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">-->
            <!--<label class="lblChangeStatusTo">{{lblCurrentStatus}} Status Change To</label>-->
            <!--<select v-model="ddlChangeStatusTo"-->
            <!--class="form-control pro-edt-select form-control-primary ddlChangeStatusTo">-->
            <!--<option v-for="item in ddlChangeStatusToList" v-bind:value="item.StatusValue.trim()"-->
            <!--v-bind:text="item.Status.trim()">{{-->
            <!--item.Status.trim() }}-->
            <!--</option>-->
            <!--</select>-->
            <!--<button v-on:click="StatusAction"-->
            <!--class="btn btn-primary waves-effect waves-light m-r-10 btnChangeStatus">Action-->
            <!--</button>-->
            <!--</div>-->

            <div class="student-action-link ">
                <el-button-group>
                    <el-button v-b-modal.withdrawModal type="primary" class="btnWithdraw"><i class="material-icons">
                        forward
                    </i> Withdraw
                    </el-button>
                    <el-button v-b-modal.transferModal type="primary" class="btnTransfer"><i class="material-icons">
                        import_export
                    </i> Transfer
                    </el-button>
                    <el-button type="primary" class="btnUploadDocument" v-on:click="showStudentDocumentModal()"><i
                            class="material-icons">
                        folder
                    </i> Student Doc
                    </el-button>
                    <el-button type="primary" class="btnImmunizationRecords" v-if="immunizationRecordsUpload"
                               v-on:click="showImmunizationRecordsModal()">
                        <i class="material-icons">event_note</i>
                        Immunization Records
                    </el-button>
                    <el-button type="primary" class="btnAllAboutMe" v-on:click="showAllAboutMeModal()"><i
                            class="material-icons">
                        face
                    </i> All About Me
                    </el-button>
                </el-button-group>

                <!--<b-btn v-b-modal.withdrawModal variant="primary" class="btnWithdraw">-->
                <!--Withdraw-->
                <!--</b-btn>-->

                <!--<b-btn v-b-modal.transferModal variant="primary" class="btnTransfer">-->
                <!--Transfer-->
                <!--</b-btn>-->

                <!--<b-btn variant="primary" class="btnUploadDocument" v-on:click="showStudentDocumentModal()">-->
                <!--Student Doc-->
                <!--</b-btn>-->

                <!--<b-btn variant="primary" class="btnImmunizationRecords" v-if="immunizationRecordsUpload" v-on:click="showImmunizationRecordsModal()">-->
                <!--Immunization Records-->
                <!--</b-btn>-->

                <!--<b-btn variant="primary" class="btnAllAboutMe" v-on:click="showAllAboutMeModal()">-->
                <!--All About Me-->
                <!--</b-btn>-->
            </div>
        </div>
        <div class="profilePictureArea form-group">
            <div class=" container ">
                <div class="profile_wrap">
                    <div class="imgStudentProfile">
                        <img v-bind:src="imgStudentProfile" type="file" @click="uploadStudentProfileImg()"
                             class=""/>

                        <a class="student-profile-edit" @click="uploadStudentProfileImg()">
                            <i class="material-icons">
                                edit
                            </i>
                        </a>
                    </div>
                    <span>{{inputStudentFirstName}}</span>
                </div>

                <div class="student-status" v-if="changeStatusAction">
                    <div class="d-flex align-items-center">
                        <span class="student-status-current">{{lblCurrentStatus}}</span>
                        <el-popover
                                placement="bottom"
                                width="200"
                                trigger="click"
                                popper-class="student-status-popover">
                            <label class="lblChangeStatusTo">Status Change To</label>
                            <!--<select v-model="ddlChangeStatusTo"-->
                            <!--class="form-control pro-edt-select form-control-primary ddlChangeStatusTo">-->
                            <!--<option v-for="item in ddlChangeStatusToList" v-bind:value="item.StatusValue.trim()"-->
                            <!--v-bind:text="item.Status.trim()">{{-->
                            <!--item.Status.trim() }}-->
                            <!--</option>-->
                            <!--</select>-->
                            <el-select v-model="ddlChangeStatusTo" placeholder="Select" class="ddlChangeStatusTo">
                                <el-option
                                        v-for="item in ddlChangeStatusToList"
                                        :key="item.StatusValue.trim()"
                                        :label="item.Status.trim()"
                                        :value="item.StatusValue.trim()">
                                </el-option>
                            </el-select>
                            <el-button type="primary" round v-on:click="StatusAction">Save</el-button>
                            <!--<button v-on:click="StatusAction"-->
                            <!--class="btn btn-primary waves-effect waves-light m-r-10 btnChangeStatus">Save-->
                            <!--</button>-->
                            <el-button type="primary" round slot="reference">Change Status</el-button>
                        </el-popover>

                    </div>
                </div>
            </div>
            <input type="file" ref="file" accept="image/*" style="display:none" @change="previewImgStudentProfile">
        </div>
        <div class="mt-3 container">
            <el-tabs v-model="activeName" @tab-click="handleClick" class="studentPageBTabs">
                <el-tab-pane label="Student" name="Student">
                    <span class="alert-badge2"
                          v-if="$v.inputStudentFirstName.$error || $v.inputStudentLastName.$error || $v.ddlStudentNationality.$error || $v.inputStudentDateOfBirth.$error || $v.inputStudentIdentificationNo.$error || $v.inputStudentIdentificationExpiryDate.$error || $v.inputStudentBirthCertificate.$error || $v.inputStudentIC.$error || $v.inputStudentPassport.$error || $v.inputStudentPassportExpiryDate.$error || $v.inputFirstCommencementDate.$error || $v.ddlStudentPayer.$error || $v.inputStudentEnrolledCenterName.$error || $v.ddlStudentEnrolledCenterType.$error">
                            !
                        </span>
                    <div class=" form-group ">
                        <div class="review-content-section">
                            <div class="row familyIDAreaDiv">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Family No</label>
                                    <input type="text" class="form-control" v-model="inputFamilyID" readonly="readonly">
                                    <input type="text" class="form-control" v-model="inputFamilyParentID"
                                           style="display:none;">
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" v-if="divFamilySearch">
                                    <label class="lblSearchFamily">Search Family</label>
                                    <b-btn v-b-modal.familyModal variant="primary" v-bind:disabled="editModeDisable">
                                        Search
                                    </b-btn>
                                </div>
                            </div>

                            <div v-if="divEditParentLink" class="row familyIDAreaDiv">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <button v-on:click="EditParentLink" type="button"
                                            class="btn btn-primary waves-effect waves-light m-r-10">
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
                        </div>

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
                                    <label>* Family Name</label>
                                    <input type="text" class="form-control" v-model="inputStudentLastName"
                                           :class="{ 'requiredFields': $v.inputStudentLastName.$error }">
                                    <div class="requiredFieldsMsg" v-if="$v.inputStudentLastName.$error">Last Name
                                        Require
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
                                                        @change="checkStudentAge()"
                                                        value-format="dd/MM/yyyy" type="date" placeholder="Pick a date"
                                                        :class="{ 'requiredFields': $v.inputStudentDateOfBirth.$error }"></el-date-picker>
                                    </div>
                                    <div class="requiredFieldsMsg" v-if="$v.inputStudentDateOfBirth.$error">Date of
                                        Birth
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
                                        <el-date-picker v-model="inputStudentIdentificationExpiryDate"
                                                        format="dd/MM/yyyy"
                                                        value-format="dd/MM/yyyy" type="date" placeholder="Pick a day"
                                                        :class="{ 'requiredFields': $v.inputStudentIdentificationExpiryDate.$error }"></el-date-picker>
                                    </div>
                                    <div class="requiredFieldsMsg"
                                         v-if="$v.inputStudentIdentificationExpiryDate.$error">Fin
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
                                           :disabled="disableIC"
                                           :class="{ 'requiredFields': $v.inputStudentIC.$error }">
                                    <div class="requiredFieldsMsg" v-if="$v.inputStudentIC.$error">IC Require</div>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" v-if="isIntSchool">
                                    <label>** Passport</label>
                                    <input type="text" class="form-control" v-model="inputStudentPassport"
                                           :class="{ 'requiredFields': $v.inputStudentPassport.$error }">
                                    <div class="requiredFieldsMsg" v-if="$v.inputStudentPassport.$error">Passport
                                        Require
                                    </div>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" v-if="isIntSchool">
                                    <label>** Passport Expiry Date</label>
                                    <div class="date">
                                        <el-date-picker v-model="inputStudentPassportExpiryDate" format="dd/MM/yyyy"
                                                        value-format="dd/MM/yyyy" type="date" placeholder="Pick a day"
                                                        :class="{ 'requiredFields': $v.inputStudentPassportExpiryDate.$error }"></el-date-picker>
                                    </div>
                                    <div class="requiredFieldsMsg" v-if="$v.inputStudentPassportExpiryDate.$error">
                                        Passport
                                        Expiry Date Require
                                    </div>
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
                                    <label>Dietary Requirement</label>
                                    <input type="text" class="form-control" v-model="inputStudentDietaryRequirement">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>First Language Spoken</label>
                                    <input type="text" class="form-control" v-model="inputStudentFirstLanguageSpoken">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Second Language Spoken</label>
                                    <input type="text" class="form-control" v-model="inputSecondLanguageSpoken">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="display:none;">
                                    <label>Membership</label>
                                    <select v-model="ddlStudentMembership"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in ddlStudentMembershipList"
                                                v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"
                                     v-if="isLocalSchool || isIntPreSchool">
                                    <label>Race</label>
                                    <select v-model="ddlStudentRace"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in ddlRaceList"
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
                                    <label>* Commencement Date</label>
                                    <div class="date">
                                        <el-date-picker v-model="inputFirstCommencementDate" type="date"
                                                        format="dd/MM/yyyy"
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
                                        <option v-for="item in ddlStudentPayerList" v-bind:value="item.OPTvalue.trim()"
                                                :disabled="(disFatherCompany && item.OPTvalue.trim() === 'Father Company' && divParent) || (disMotherCompany && item.OPTvalue.trim() === 'Mother Company') && divParent">
                                            {{ item.OPTvalue.trim() }}
                                        </option>
                                    </select>
                                    <div class="requiredFieldsMsg" v-if="$v.ddlStudentPayer.$error">Payer Require</div>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Student ID</label>
                                    <input type="text" class="form-control" v-model="inputStudentID"
                                           readonly="readonly">
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

                        <div class="studentAreaDiv">
                            <div class="">
                                <h5 class="text-left student-form__title">Before Join Us</h5>
                            </div>

                            <div class="row form-group__wrapper">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Enrolled in Other Center</label>
                                    <select class="form-control pro-edt-select form-control-primary"
                                            v-model="ddlStudentEnrolledinOtherCenter"
                                            @change="EnrolledinOtherCenterShow()"
                                            v-bind:disabled="editModeDisable">
                                        <option>No</option>
                                        <option>Yes</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row form-group__wrapper" v-if="divEnrolledinOtherCenterShow">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>* Center Name</label>
                                    <input type="text" class="form-control form__input"
                                           v-model="inputStudentEnrolledCenterName"
                                           :class="{ 'requiredFields': $v.inputStudentEnrolledCenterName.$error }"
                                           v-bind:disabled="editModeDisable">
                                    <div class="requiredFieldsMsg" v-if="$v.inputStudentEnrolledCenterName.$error">
                                        Center Name Require
                                    </div>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>* Center Type</label>
                                    <select v-model="ddlStudentEnrolledCenterType"
                                            class="form-control pro-edt-select form-control-primary"
                                            :class="{ 'requiredFields': $v.ddlStudentEnrolledCenterType.$error }"
                                            v-bind:disabled="editModeDisable">
                                        <option v-for="item in ddlStudentEnrolledCenterTypeList"
                                                v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}
                                        </option>
                                    </select>
                                    <div class="requiredFieldsMsg" v-if="$v.ddlStudentEnrolledCenterType.$error">
                                        Center Type Require
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="Parents" name="Parents">
                    <span class="alert-badge2"
                          v-if="$v.ddlParentMode.$error || $v.inputFatherFirstName.$error || $v.inputFatherLastName.$error || lblFatherNameDuplicated || $v.inputFatherOccupation.$error || $v.inputMotherFirstName.$error || $v.inputMotherLastName.$error || lblMotherNameDuplicated">
                            !
                        </span>

                </el-tab-pane>
                <el-tab-pane label="Role" name="third">Role</el-tab-pane>
                <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
            </el-tabs>

            <b-tabs class="studentPageBTabs">
                <!--<span class="alert-badge badge1"-->
                <!--v-if="$v.ddlParentMode.$error || $v.inputFatherFirstName.$error || $v.inputFatherLastName.$error || lblFatherNameDuplicated || $v.inputFatherOccupation.$error || $v.inputMotherFirstName.$error || $v.inputMotherLastName.$error || lblMotherNameDuplicated">-->
                <!--!-->
                <!--</span>-->
                <!--<span class="alert-badge badge2"-->
                <!--v-if="$v.inputStudentFirstName.$error || $v.inputStudentLastName.$error || $v.ddlStudentNationality.$error || $v.inputStudentDateOfBirth.$error || $v.inputStudentIdentificationNo.$error || $v.inputStudentIdentificationExpiryDate.$error || $v.inputStudentBirthCertificate.$error || $v.inputStudentIC.$error || $v.inputStudentPassport.$error || $v.inputStudentPassportExpiryDate.$error || $v.inputFirstCommencementDate.$error || $v.ddlStudentPayer.$error || $v.inputStudentEnrolledCenterName.$error || $v.ddlStudentEnrolledCenterType.$error">-->
                <!--!-->
                <!--</span>-->
                <!--<span class="alert-badge badge4"-->
                <!--v-if="$v.inputStudentPostalCode.$error || $v.inputStudentAddress1.$error || $v.inputStudentCorrespondancePostalCode.$error || $v.inputStudentCorrespondanceAddress1.$error">-->
                <!--!-->
                <!--</span>-->

                <b-tab title="Student" active>
                    <template slot="title">
                        Student
                        <span class="alert-badge2"
                              v-if="$v.inputStudentFirstName.$error || $v.inputStudentLastName.$error || $v.ddlStudentNationality.$error || $v.inputStudentDateOfBirth.$error || $v.inputStudentIdentificationNo.$error || $v.inputStudentIdentificationExpiryDate.$error || $v.inputStudentBirthCertificate.$error || $v.inputStudentIC.$error || $v.inputStudentPassport.$error || $v.inputStudentPassportExpiryDate.$error || $v.inputFirstCommencementDate.$error || $v.ddlStudentPayer.$error || $v.inputStudentEnrolledCenterName.$error || $v.ddlStudentEnrolledCenterType.$error">
                            !
                        </span>
                    </template>

                    <div class=" form-group ">
                        <div class="review-content-section">
                            <div class="row familyIDAreaDiv">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Family No</label>
                                    <input type="text" class="form-control" v-model="inputFamilyID" readonly="readonly">
                                    <input type="text" class="form-control" v-model="inputFamilyParentID"
                                           style="display:none;">
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" v-if="divFamilySearch">
                                    <label class="lblSearchFamily">Search Family</label>
                                    <b-btn v-b-modal.familyModal variant="primary" v-bind:disabled="editModeDisable">
                                        Search
                                    </b-btn>
                                </div>
                            </div>

                            <div v-if="divEditParentLink" class="row familyIDAreaDiv">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <button v-on:click="EditParentLink" type="button"
                                            class="btn btn-primary waves-effect waves-light m-r-10">
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
                        </div>

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
                                    <label>* Family Name</label>
                                    <input type="text" class="form-control" v-model="inputStudentLastName"
                                           :class="{ 'requiredFields': $v.inputStudentLastName.$error }">
                                    <div class="requiredFieldsMsg" v-if="$v.inputStudentLastName.$error">Last Name
                                        Require
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
                                                        @change="checkStudentAge()"
                                                        value-format="dd/MM/yyyy" type="date" placeholder="Pick a date"
                                                        :class="{ 'requiredFields': $v.inputStudentDateOfBirth.$error }"></el-date-picker>
                                    </div>
                                    <div class="requiredFieldsMsg" v-if="$v.inputStudentDateOfBirth.$error">Date of
                                        Birth
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
                                        <el-date-picker v-model="inputStudentIdentificationExpiryDate"
                                                        format="dd/MM/yyyy"
                                                        value-format="dd/MM/yyyy" type="date" placeholder="Pick a day"
                                                        :class="{ 'requiredFields': $v.inputStudentIdentificationExpiryDate.$error }"></el-date-picker>
                                    </div>
                                    <div class="requiredFieldsMsg"
                                         v-if="$v.inputStudentIdentificationExpiryDate.$error">Fin
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
                                           :disabled="disableIC"
                                           :class="{ 'requiredFields': $v.inputStudentIC.$error }">
                                    <div class="requiredFieldsMsg" v-if="$v.inputStudentIC.$error">IC Require</div>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" v-if="isIntSchool">
                                    <label>** Passport</label>
                                    <input type="text" class="form-control" v-model="inputStudentPassport"
                                           :class="{ 'requiredFields': $v.inputStudentPassport.$error }">
                                    <div class="requiredFieldsMsg" v-if="$v.inputStudentPassport.$error">Passport
                                        Require
                                    </div>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" v-if="isIntSchool">
                                    <label>** Passport Expiry Date</label>
                                    <div class="date">
                                        <el-date-picker v-model="inputStudentPassportExpiryDate" format="dd/MM/yyyy"
                                                        value-format="dd/MM/yyyy" type="date" placeholder="Pick a day"
                                                        :class="{ 'requiredFields': $v.inputStudentPassportExpiryDate.$error }"></el-date-picker>
                                    </div>
                                    <div class="requiredFieldsMsg" v-if="$v.inputStudentPassportExpiryDate.$error">
                                        Passport
                                        Expiry Date Require
                                    </div>
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
                                    <label>Dietary Requirement</label>
                                    <input type="text" class="form-control" v-model="inputStudentDietaryRequirement">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>First Language Spoken</label>
                                    <input type="text" class="form-control" v-model="inputStudentFirstLanguageSpoken">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Second Language Spoken</label>
                                    <input type="text" class="form-control" v-model="inputSecondLanguageSpoken">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="display:none;">
                                    <label>Membership</label>
                                    <select v-model="ddlStudentMembership"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in ddlStudentMembershipList"
                                                v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"
                                     v-if="isLocalSchool || isIntPreSchool">
                                    <label>Race</label>
                                    <select v-model="ddlStudentRace"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in ddlRaceList"
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
                                    <label>* Commencement Date</label>
                                    <div class="date">
                                        <el-date-picker v-model="inputFirstCommencementDate" type="date"
                                                        format="dd/MM/yyyy"
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
                                        <option v-for="item in ddlStudentPayerList" v-bind:value="item.OPTvalue.trim()"
                                                :disabled="(disFatherCompany && item.OPTvalue.trim() === 'Father Company' && divParent) || (disMotherCompany && item.OPTvalue.trim() === 'Mother Company') && divParent">
                                            {{ item.OPTvalue.trim() }}
                                        </option>
                                    </select>
                                    <div class="requiredFieldsMsg" v-if="$v.ddlStudentPayer.$error">Payer Require</div>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Student ID</label>
                                    <input type="text" class="form-control" v-model="inputStudentID"
                                           readonly="readonly">
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

                        <div class="studentAreaDiv">
                            <div class="">
                                <h5 class="text-left student-form__title">Before Join Us</h5>
                            </div>

                            <div class="row form-group__wrapper">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Enrolled in Other Center</label>
                                    <select class="form-control pro-edt-select form-control-primary"
                                            v-model="ddlStudentEnrolledinOtherCenter"
                                            @change="EnrolledinOtherCenterShow()"
                                            v-bind:disabled="editModeDisable">
                                        <option>No</option>
                                        <option>Yes</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row form-group__wrapper" v-if="divEnrolledinOtherCenterShow">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>* Center Name</label>
                                    <input type="text" class="form-control form__input"
                                           v-model="inputStudentEnrolledCenterName"
                                           :class="{ 'requiredFields': $v.inputStudentEnrolledCenterName.$error }"
                                           v-bind:disabled="editModeDisable">
                                    <div class="requiredFieldsMsg" v-if="$v.inputStudentEnrolledCenterName.$error">
                                        Center Name Require
                                    </div>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>* Center Type</label>
                                    <select v-model="ddlStudentEnrolledCenterType"
                                            class="form-control pro-edt-select form-control-primary"
                                            :class="{ 'requiredFields': $v.ddlStudentEnrolledCenterType.$error }"
                                            v-bind:disabled="editModeDisable">
                                        <option v-for="item in ddlStudentEnrolledCenterTypeList"
                                                v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}
                                        </option>
                                    </select>
                                    <div class="requiredFieldsMsg" v-if="$v.ddlStudentEnrolledCenterType.$error">
                                        Center Type Require
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </b-tab>
                <b-tab title="Parents" v-if="divParent">
                    <template slot="title">
                        Parents
                        <span class="alert-badge2"
                              v-if="$v.ddlParentMode.$error || $v.inputFatherFirstName.$error || $v.inputFatherLastName.$error || lblFatherNameDuplicated || $v.inputFatherOccupation.$error || $v.inputMotherFirstName.$error || $v.inputMotherLastName.$error || lblMotherNameDuplicated">
                            !
                        </span>
                    </template>

                    <div class="">
                        <div class="review-content-section">
                            <!--<div class="row familyIDAreaDiv">-->
                            <!--<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">-->
                            <!--<label>Family No</label>-->
                            <!--<input type="text" class="form-control" v-model="inputFamilyID" readonly="readonly">-->
                            <!--<input type="text" class="form-control" v-model="inputFamilyParentID"-->
                            <!--style="display:none;">-->
                            <!--</div>-->
                            <!--<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" v-if="divFamilySearch" >-->
                            <!--<label class="lblSearchFamily">Search Family</label>-->
                            <!--<b-btn v-b-modal.familyModal variant="primary" v-bind:disabled="editModeDisable">-->
                            <!--Search-->
                            <!--</b-btn>-->
                            <!--</div>-->
                            <!--</div>-->

                            <!--<div v-if="divEditParentLink" class="row familyIDAreaDiv">-->
                            <!--<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">-->
                            <!--<button v-on:click="EditParentLink" type="button"-->
                            <!--class="btn btn-primary waves-effect waves-light m-r-10">-->
                            <!--Edit Parent-->
                            <!--</button>-->
                            <!--</div>-->
                            <!--</div>-->

                            <!--<div v-if="!divParent" class="row col-lg-12 col-md-12 col-sm-12 col-xs-12 parentAreaDiv">-->
                            <!--<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">-->
                            <!--<button v-on:click="CancelUseFamilyNo"-->
                            <!--class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch"-->
                            <!--v-bind:disabled="editModeDisable">Cancel Use Family No-->
                            <!--</button>-->
                            <!--</div>-->
                            <!--</div>-->

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
                                            <div class="requiredFieldsMsg" v-if="$v.inputFatherFirstName.$error">First
                                                Name
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
                                            <div class="requiredFieldsMsg" v-if="$v.inputFatherLastName.$error">Last
                                                Name
                                                Require
                                            </div>
                                            <label v-if="lblFatherNameDuplicated">Father name is duplicated, please
                                                double
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
                                            <div class="requiredFieldsMsg" v-if="$v.inputFatherOccupation.$error">
                                                Occupation
                                                Require
                                            </div>
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <label>Identification Type</label>
                                            <select v-model="ddlFatherIdentificationType"
                                                    v-bind:disabled="editModeDisable"
                                                    class="form-control pro-edt-select form-control-primary">
                                                <option v-for="item in ddlFatherIdentificationTypeList"
                                                        v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}
                                                </option>
                                            </select>
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <label>Identification No</label>
                                            <input type="text" class="form-control"
                                                   v-model="inputFatherIdentificationNo"
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

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"
                                             v-if="isLocalSchool || isIntPreSchool">
                                            <label>Race</label>
                                            <select v-model="ddlFatherRace"
                                                    v-bind:disabled="editModeDisable"
                                                    class="form-control pro-edt-select form-control-primary">
                                                <option v-for="item in ddlRaceList"
                                                        v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}
                                                </option>
                                            </select>
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <label>Marital Status</label>
                                            <select v-model="ddlFatherMaritalStatus"
                                                    v-bind:disabled="editModeDisable"
                                                    class="form-control pro-edt-select form-control-primary">
                                                <option v-for="item in ddlMaritalStatusList"
                                                        v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}
                                                </option>
                                            </select>
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <label>Working</label>
                                            <select class="form-control pro-edt-select form-control-primary"
                                                    v-model="ddlFatherWorking"
                                                    @change="ParentCompanyAddressShow('Father')"
                                                    v-bind:disabled="editModeDisable">
                                                <option>No</option>
                                                <option>Yes</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="divParent & divFatherCompany" class="parentAreaDiv">
                                    <div class="">
                                        <h5 class="text-left student-form__title">Father's Company</h5>
                                    </div>

                                    <div class="row form-group__wrapper">
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <label>Company Name</label>
                                            <input type="text" class="form-control" v-model="inputFatherCompanyName">
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <label>Company Addressee Name</label>
                                            <input type="text" class="form-control"
                                                   v-model="inputFatherCompanyAddresseeName">
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <label>Company Address 1</label>
                                            <input type="text" class="form-control"
                                                   v-model="inputFatherCompanyAddress1">
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <label>Company Address 2</label>
                                            <input type="text" class="form-control"
                                                   v-model="inputFatherCompanyAddress2">
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <label>Company Address 3</label>
                                            <input type="text" class="form-control"
                                                   v-model="inputFatherCompanyAddress3">
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <label>Company City</label>
                                            <input type="text" class="form-control" v-model="inputFatherCompanyCity">
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <label>Company Country</label>
                                            <select v-model="ddlFatherCompanyCountry"
                                                    class="form-control pro-edt-select form-control-primary">
                                                <option v-for="item in countryList" v-bind:value="item.CNYname.trim()">
                                                    {{item.CNYname.trim() }}
                                                </option>
                                            </select>
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <label>Company Postal Code</label>
                                            <input type="text" class="form-control"
                                                   v-model="inputFatherCompanyPostalCode">
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <label>Company Email</label>
                                            <input type="text" class="form-control" v-model="inputFatherCompanyEmail">
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <label>Working Commencement Date</label>
                                            <div class="date">
                                                <el-date-picker v-model="inputFatherWorkingCommencementDate"
                                                                v-bind:disabled="editModeDisable" format="dd/MM/yyyy"
                                                                value-format="dd/MM/yyyy" type="date"
                                                                placeholder="Pick a day"></el-date-picker>
                                            </div>
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
                                            <div class="requiredFieldsMsg" v-if="$v.inputMotherFirstName.$error">First
                                                Name
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
                                            <div class="requiredFieldsMsg" v-if="$v.inputMotherLastName.$error">Last
                                                Name
                                                Require
                                            </div>
                                            <label v-if="lblMotherNameDuplicated">Mother name is duplicated, please
                                                double
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
                                            <select v-model="ddlMotherIdentificationType"
                                                    v-bind:disabled="editModeDisable"
                                                    class="form-control pro-edt-select form-control-primary">
                                                <option v-for="item in ddlMotherIdentificationTypeList"
                                                        v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}
                                                </option>
                                            </select>
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <label>Identification No</label>
                                            <input type="text" class="form-control"
                                                   v-model="inputMotherIdentificationNo"
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

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"
                                             v-if="isLocalSchool || isIntPreSchool">
                                            <label>Race</label>
                                            <select v-model="ddlMotherRace"
                                                    v-bind:disabled="editModeDisable"
                                                    class="form-control pro-edt-select form-control-primary">
                                                <option v-for="item in ddlRaceList"
                                                        v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}
                                                </option>
                                            </select>
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <label>Marital Status</label>
                                            <select v-model="ddlMotherMaritalStatus"
                                                    v-bind:disabled="editModeDisable"
                                                    class="form-control pro-edt-select form-control-primary">
                                                <option v-for="item in ddlMaritalStatusList"
                                                        v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}
                                                </option>
                                            </select>
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <label>Working</label>
                                            <select class="form-control pro-edt-select form-control-primary"
                                                    v-model="ddlMotherWorking"
                                                    @change="ParentCompanyAddressShow('Mother')"
                                                    v-bind:disabled="editModeDisable">
                                                <option>No</option>
                                                <option>Yes</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="divParent & divMotherCompany" class="parentAreaDiv">
                                    <div class="">
                                        <h5 class="text-left student-form__title">Mother's Company</h5>
                                    </div>

                                    <div class="row form-group__wrapper">
                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <label>Company Name</label>
                                            <input type="text" class="form-control" v-model="inputMotherCompanyName">
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <label>Company Addressee Name</label>
                                            <input type="text" class="form-control"
                                                   v-model="inputMotherCompanyAddresseeName">
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <label>Company Address 1</label>
                                            <input type="text" class="form-control"
                                                   v-model="inputMotherCompanyAddress1">
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <label>Company Address 2</label>
                                            <input type="text" class="form-control"
                                                   v-model="inputMotherCompanyAddress2">
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <label>Company Address 3</label>
                                            <input type="text" class="form-control"
                                                   v-model="inputMotherCompanyAddress3">
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <label>Company City</label>
                                            <input type="text" class="form-control" v-model="inputMotherCompanyCity">
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <label>Company Country</label>
                                            <select v-model="ddlMotherCompanyCountry"
                                                    class="form-control pro-edt-select form-control-primary">
                                                <option v-for="item in countryList" v-bind:value="item.CNYname.trim()">
                                                    {{
                                                    item.CNYname.trim() }}
                                                </option>
                                            </select>
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <label>Company Postal Code</label>
                                            <input type="text" class="form-control"
                                                   v-model="inputMotherCompanyPostalCode">
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <label>Company Email</label>
                                            <input type="text" class="form-control" v-model="inputMotherCompanyEmail">
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <label>Working Commencement Date</label>
                                            <div class="date">
                                                <el-date-picker v-model="inputMotherWorkingCommencementDate"
                                                                v-bind:disabled="editModeDisable" format="dd/MM/yyyy"
                                                                value-format="dd/MM/yyyy" type="date"
                                                                placeholder="Pick a day"></el-date-picker>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </b-tab>
                <b-tab title="Emergency Contact">
                    <div class=" form-group ">
                        <div class="ecAreaDiv">
                            <div class="">
                                <h5 class="text-left student-form__title">1st Emergency Contact</h5>
                            </div>
                            <div class="row form-group__wrapper">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Contact Person</label>
                                    <input type="text" class="form-control" v-model="inputStudent1stEmergencyContact">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Contact No</label>
                                    <input type="text" class="form-control" v-model="inputStudent1stEmergencyContactNo">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Contact Relation</label>
                                    <input type="text" class="form-control"
                                           v-model="inputStudent1stEmergencyContactRelation">
                                </div>
                            </div>
                        </div>

                        <div class="ecAreaDiv">
                            <div class="">
                                <h5 class="text-left student-form__title">2nd Emergency Contact</h5>
                            </div>
                            <div class="row form-group__wrapper">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label> Contact Person</label>
                                    <input type="text" class="form-control" v-model="inputStudent2ndEmergencyContact">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Contact No</label>
                                    <input type="text" class="form-control" v-model="inputStudent2ndEmergencyContactNo">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Contact Relation</label>
                                    <input type="text" class="form-control"
                                           v-model="inputStudent2ndEmergencyContactRelation">
                                </div>
                            </div>
                        </div>
                    </div>
                </b-tab>
                <b-tab title="Addresses">
                    <template slot="title">
                        Addresses
                        <span class="alert-badge2"
                              v-if="$v.inputStudentPostalCode.$error || $v.inputStudentAddress1.$error || $v.inputStudentCorrespondancePostalCode.$error || $v.inputStudentCorrespondanceAddress1.$error">
                            !
                        </span>
                    </template>
                    <div class=" form-group ">
                        <div class="addAreaDiv">
                            <div class="">
                                <h5 class="text-left student-form__title">Student's Local Residential Address</h5>
                            </div>

                            <div class="row form-group__wrapper">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Country</label>
                                    <select v-model="ddlStudentAddressCountry" @change="onchangeCopyAdd()"
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
                                           v-on:blur="GetGoogleAPI('inputStudentPostalCode')"
                                           @change="onchangeCopyAdd()">
                                    <div class="requiredFieldsMsg" v-if="$v.inputStudentPostalCode.$error">Postal Code
                                        Require
                                    </div>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>* Address 1</label>
                                    <input type="text" class="form-control" v-model="inputStudentAddress1"
                                           @change="onchangeCopyAdd()"
                                           :class="{ 'requiredFields': $v.inputStudentAddress1.$error }">
                                    <div class="requiredFieldsMsg" v-if="$v.inputStudentAddress1.$error">Address 1
                                        Require
                                    </div>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Address 2</label>
                                    <input type="text" class="form-control" v-model="inputStudentAddress2"
                                           @change="onchangeCopyAdd()">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Address 3</label>
                                    <input type="text" class="form-control" v-model="inputStudentAddress3"
                                           @change="onchangeCopyAdd()">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>City</label>
                                    <input type="text" class="form-control" v-model="inputStudentCity"
                                           @change="onchangeCopyAdd()">
                                </div>
                            </div>
                        </div>

                        <div class="addAreaDiv">
                            <div class="">
                                <h5 class="text-left student-form__title">Student's Billing Address</h5>
                            </div>

                            <div class="row form-group__wrapper">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Copy Address From Student's Permanent Address</label>
                                    <!--<div v-on:click="StuCorAddCopyStuPermAdd" class="ttStuCorAddCopy"><i class="fa fa-clone" aria-hidden="true"></i>-->
                                    <!--<span class="ttnStuCorAddCopy">Copy Address From Student's Correspondance Address</span>-->
                                    <!--</div>-->
                                    <!--<input type="checkbox" class="form-control" ref="cbStuCorAddCopy" @change="StuCorAddCopyStuPermAdd()">-->

                                    <select v-model="ddlCopyAddToStuCorAdd"
                                            class="form-control pro-edt-select form-control-primary"
                                            @change="onchangeCopyAdd()">
                                        <option value="manuallyInput">Manually Input</option>
                                        <option value="stuPerAdd">Student's Permanent Address</option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Country</label>
                                    <select v-model="ddlStudentAddressCorrespondanceCountry" @change="onchangeCopyAdd()"
                                            v-bind:disabled="stuCorAddCopy"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in countryList" v-bind:value="item.CNYname.trim()">{{
                                            item.CNYname.trim() }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>* Postal Code</label>
                                    <input type="text" class="form-control"
                                           v-model="inputStudentCorrespondancePostalCode"
                                           :class="{ 'requiredFields': $v.inputStudentCorrespondancePostalCode.$error }"
                                           v-bind:disabled="stuCorAddCopy"
                                           v-on:blur="GetGoogleAPI('inputStudentCorrespondancePostalCode')"
                                           @change="onchangeCopyAdd()">
                                    <div class="requiredFieldsMsg"
                                         v-if="$v.inputStudentCorrespondancePostalCode.$error">
                                        Postal Code Require
                                    </div>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>* Address 1</label>
                                    <input type="text" class="form-control" v-model="inputStudentCorrespondanceAddress1"
                                           @change="onchangeCopyAdd()"
                                           v-bind:disabled="stuCorAddCopy"
                                           :class="{ 'requiredFields': $v.inputStudentCorrespondanceAddress1.$error }">
                                    <div class="requiredFieldsMsg" v-if="$v.inputStudentCorrespondanceAddress1.$error">
                                        Address 1 Require
                                    </div>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Address 2</label>
                                    <input type="text" class="form-control"
                                           v-bind:disabled="stuCorAddCopy"
                                           v-model="inputStudentCorrespondanceAddress2" @change="onchangeCopyAdd()">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Address 3</label>
                                    <input type="text" class="form-control"
                                           v-bind:disabled="stuCorAddCopy"
                                           v-model="inputStudentCorrespondanceAddress3" @change="onchangeCopyAdd()">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>City</label>
                                    <input type="text" class="form-control" v-model="inputStudentCorrespondanceCity"
                                           @change="onchangeCopyAdd()" v-bind:disabled="stuCorAddCopy">
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
                    </div>
                </b-tab>
                <b-tab title="Medical">
                    <div class=" form-group ">
                        <div class="medAreaDiv">
                            <div class="">
                                <h5 class="text-left student-form__title">Medication Allergies List</h5>
                            </div>

                            <div>
                                <div v-if="medicationAllergiesListInt.length>0">
                                    <data-tables :data="medicationAllergiesListInt"
                                                 :action-col="medicationAllergiesListAcion">
                                        <el-table-column v-for="medicationAllergiesListInfo in medicationAllergiesList"
                                                         :prop="medicationAllergiesListInfo.prop"
                                                         :label="medicationAllergiesListInfo.label"
                                                         :key="medicationAllergiesListInfo.prop"
                                                         sortable="custom">
                                        </el-table-column>
                                    </data-tables>
                                </div>
                            </div>

                            <div class="row form-group__wrapper">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Medication</label>
                                    <input type="text" class="form-control"
                                           v-model="inputStudentMedicationAllergiesMedication">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Remarks</label>
                                    <input type="text" class="form-control"
                                           v-model="inputStudentMedicationAllergiesRemarks">
                                </div>
                            </div>

                            <button class="btn btn-primary waves-effect waves-light m-r-10"
                                    v-on:click="addMedicationAllergiesList()">
                                Add
                            </button>
                        </div>

                        <div class="medAreaDiv">
                            <div class="">
                                <h5 class="text-left student-form__title">Food Allergies List</h5>
                            </div>

                            <div>
                                <div v-if="foodAllergiesListInt.length>0">
                                    <data-tables :data="foodAllergiesListInt" :action-col="foodAllergiesListAcion">
                                        <el-table-column v-for="foodAllergiesListInfo in foodAllergiesList"
                                                         :prop="foodAllergiesListInfo.prop"
                                                         :label="foodAllergiesListInfo.label"
                                                         :key="foodAllergiesListInfo.prop"
                                                         sortable="custom">
                                        </el-table-column>
                                    </data-tables>
                                </div>
                            </div>

                            <div class="row form-group__wrapper">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Food</label>
                                    <select v-model="ddlStudentFoodAllergiesFood"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in ddlddlStudentFoodAllergiesFoodList"
                                                v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Remarks</label>
                                    <input type="text" class="form-control" v-model="inputStudentFoodAllergiesRemarks">
                                </div>
                            </div>

                            <button class="btn btn-primary waves-effect waves-light m-r-10"
                                    v-on:click="addFoodAllergiesList()">
                                Add
                            </button>
                        </div>

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
                <b-tab title="Siblings" v-if="siblingTab">
                    <div v-if="siblingList.length>0">
                        <!--<data-tables :data="siblingList" :action-col="actionCol_Sibling">-->
                        <data-tables :data="siblingList">
                            <el-table-column v-for="siblingListInfo in siblingListAll" :prop="siblingListInfo.prop"
                                             :label="siblingListInfo.label" :key="siblingListInfo.prop"
                                             sortable="custom">
                            </el-table-column>

                            <el-table-column label="Edit">
                                <template slot-scope="scope">
                                    <el-button type="primary"
                                               icon="el-icon-edit"
                                               v-if="checkSiblingEditButton(siblingList[scope.$index].School_ID) === true"
                                               @click.native.prevent="editSibling(siblingList[scope.$index].School_ID, siblingList[scope.$index].Student_ID)">
                                        Edit
                                    </el-button>
                                </template>
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
                                <!--<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">-->
                                <!--<label>Select Level</label>-->
                                <!--<select v-model="ddlStudentSelectLevel_Level"-->
                                <!--class="form-control pro-edt-select form-control-primary">-->
                                <!--<option v-for="item in levelList_Level" v-bind:value="item.PK_Course_ID.trim()">-->
                                <!--{{ item.CRS_Course_Name.trim() }}-->
                                <!--</option>-->
                                <!--</select>-->
                                <!--</div>-->

                                <!--<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">-->
                                <!--<label>First Academic Year</label>-->
                                <!--<select v-model="ddlStudentFirstAcademicYear_Level"-->
                                <!--class="form-control pro-edt-select form-control-primary">-->
                                <!--<option v-for="item in academicYearList_Level"-->
                                <!--v-bind:value="item.PK_Semester_ID.trim()">{{ item.SMT_Code.trim() }}-->
                                <!--</option>-->
                                <!--</select>-->
                                <!--</div>-->

                                <!--<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">-->
                                <!--<label>Intake Year</label>-->
                                <!--<select v-model="ddlStudentIntakeYear_Level"-->
                                <!--class="form-control pro-edt-select form-control-primary">-->
                                <!--<option v-for="item in studentIntakeYearList_Level"-->
                                <!--v-bind:value="item.PAI_Intake_No.trim()">{{ item.PAI_Intake_No.trim() }}-->
                                <!--</option>-->
                                <!--</select>-->
                                <!--</div>-->

                                <!--<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">-->
                                <!--<button class="btn btn-primary waves-effect waves-light m-r-10"-->
                                <!--v-on:click="AddLevel">Add Level-->
                                <!--</button>-->
                                <!--</div>-->

                                <promotion-component @result="promotionResult"
                                                     @promoteStudents="promoteStudents"
                                                     :selectedStudents="arrayStudentIDLevelComponent"
                                                     :courseId="strClassIDLevelComponent"
                                                     :arrobjSelectedStudentID="this.$route.query.id"
                                                     :isStudent="true"
                                ></promotion-component>
                            </div>

                            <div v-if="lvlLevelList_Level.length>0">
                                <data-tables :data="lvlLevelList_Level" :actionCol="actionCol_Level">
                                    <!--<data-tables :data="lvlLevelList_Level" :actionCol="actionCol_Level"-->
                                    <!--@selection-change="handleSelectionChange">-->
                                    <el-table-column v-for="lvlLevelList_LevelAllInfo in lvlLevelList_LevelAll"
                                                     :prop="lvlLevelList_LevelAllInfo.prop"
                                                     :label="lvlLevelList_LevelAllInfo.label"
                                                     :key="lvlLevelList_LevelAllInfo.prop"
                                                     sortable="custom">
                                    </el-table-column>

                                    <!--<el-table-column label="Promote" min-width="100px">-->
                                    <!--<template slot-scope="scope">-->
                                    <!--<el-button-->
                                    <!--v-for="studentLevelListActivateButton in studentLevelListActivate(scope.row)"-->
                                    <!--:key="studentLevelListActivateButton.name" type="primary"-->
                                    <!--@click="studentLevelListActivateButton.handler">-->
                                    <!--{{studentLevelListActivateButton.name}}-->
                                    <!--</el-button>-->
                                    <!--</template>-->
                                    <!--</el-table-column>-->

                                    <!--<el-table-column label="Demote" min-width="100px">-->
                                    <!--<template slot-scope="scope">-->
                                    <!--<el-button-->
                                    <!--v-for="studentLevelListDeactivateButton in studentLevelListDeactivate(scope.row)"-->
                                    <!--:key="studentLevelListDeactivateButton.name" type="primary"-->
                                    <!--@click="studentLevelListDeactivateButton.handler">-->
                                    <!--{{studentLevelListDeactivateButton.name}}-->
                                    <!--</el-button>-->
                                    <!--</template>-->
                                    <!--</el-table-column>-->
                                </data-tables>
                            </div>
                        </div>
                    </div>
                </b-tab>
            </b-tabs>

            <div class="whitespace-30"></div>

            <div class="buttonArea">
                <div class="text-center mg-b-pro-edt custom-pro-edt-ds">

                    <button v-on:click="backToPrevious" type="button"
                            class="btn btn-primary waves-effect waves-light m-r-10 float-left">Cancel
                    </button>
                    <button v-on:click="Validation" type="button"
                            class="btn btn-primary waves-effect waves-light m-r-10 float-right">
                        Save
                    </button>
                </div>
            </div>
        </div>
        <div class="whitespace-30"></div>

        <b-modal id="familyModal" class="studentPageBModal" title="Search Family ID" ok-only
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

        <b-modal id="withdrawModal" class="studentPageBModal" title="Withdraw" ok-only ok-variant="secondary"
                 ok-title="Cancel" ref="withdrawShowModal">
            <div>
                <div class="row form-group__wrapper">
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Withdrawal Date</label>
                        <el-date-picker v-model="inputWithdrawalDate" format="dd/MM/yyyy"
                                        value-format="dd/MM/yyyy" type="date"
                                        placeholder="Pick a day"></el-date-picker>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" v-if="withdrawMainReason">
                        <label>Main Reason</label>
                        <select v-model="ddlMainReason" @change="WithdrawTaskDescription()"
                                class="form-control pro-edt-select form-control-primary">
                            <option v-for="item in ddlMainReasonList" v-bind:value="item.OPTvalue.trim()">
                                {{item.OPTvalue.trim()}}
                            </option>
                        </select>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" v-if="withdrawInternationalSchool">
                        <label>International School Name</label>
                        <select v-model="ddlInternationalSchool"
                                class="form-control pro-edt-select form-control-primary">
                            <option v-for="item in ddlInternationaSchoolList" v-bind:value="item.OPTvalue.trim()">
                                {{ item.OPTvalue.trim() }}
                            </option>
                        </select>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" v-if="withdrawReason1">
                        <label>Reason1</label>
                        <select v-model="ddlReason1" class="form-control pro-edt-select form-control-primary">
                            <option v-for="item in ddlReason1List" v-bind:value="item.OPTvalue.trim()">
                                {{ item.OPTvalue.trim() }}
                            </option>
                        </select>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" v-if="withdrawReason2">
                        <label>Reason2</label>
                        <select v-model="ddlReason2" class="form-control pro-edt-select form-control-primary">
                            <option v-for="item in ddlReason2List" v-bind:value="item.OPTvalue.trim()">
                                {{ item.OPTvalue.trim() }}
                            </option>
                        </select>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" v-if="withdrawReason3">
                        <label>Reason3</label>
                        <select v-model="ddlReason3" class="form-control pro-edt-select form-control-primary">
                            <option v-for="item in ddlReason3List" v-bind:value="item.OPTvalue.trim()">
                                {{ item.OPTvalue.trim() }}
                            </option>
                        </select>
                    </div>
                </div>

                <button v-on:click="WithdrawSave"
                        class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch">Withdraw
                </button>

            </div>
        </b-modal>

        <b-modal id="transferModal" class="studentPageBModal" title="Transfer" ok-only
                 ok-variant="secondary" ok-title="Cancel" ref="transferShowModal">
            <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label>Transfer to School</label>
                    <select v-model="ddlTransferSchool" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in transferSchoolList" v-bind:value="item.PK_SCH_ID">
                            {{ item.SCH_Name }}
                        </option>
                    </select>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label>Remarks</label>
                    <input type="text" class="form-control" v-model="inputTransferSchoolRemark">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Commencement Date</label>
                    <div class="date">
                        <el-date-picker v-model="inputTransferSchoolEffDate" format="dd/MM/yyyy"
                                        value-format="dd/MM/yyyy" type="date" placeholder="Pick a day"></el-date-picker>
                    </div>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <button v-on:click="transferSave()"
                            class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch">
                        Confirm Transfer
                    </button>
                </div>
            </div>
        </b-modal>

        <b-modal id="uploadDocumentModal" class="studentPageBModal" title="Student Document" ok-only
                 ok-variant="secondary" ok-title="Cancel" ref="uploadDocumentShowModal">
            <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <!--<input type="file" ref="studentDocument" accept="image/*" multiple>-->
                    <label>Upload File</label>
                    <input type="file" ref="studentDocument">
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label>File Description</label>
                    <input type="text" class="form-control form__input" v-model="inputStudentFileDescription">
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <button class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch"
                            v-on:click="uploadStudentDocument()">
                        Upload
                    </button>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div v-if="studentFileListInt.length>0">
                        <data-tables :data="studentFileListInt" :action-col="studentFileListAction">
                            <el-table-column v-for="studentFileListInfo in studentFileList"
                                             :prop="studentFileListInfo.prop"
                                             :label="studentFileListInfo.label" :key="studentFileListInfo.prop"
                                             sortable="custom">
                            </el-table-column>

                            <el-table-column label="Download" min-width="100px">
                                <template slot-scope="scope">
                                    <el-button
                                            v-for="studentFileDownloadButton in studentFileDownload(scope.row)"
                                            :key="studentFileDownloadButton.name" type="primary"
                                            @click="studentFileDownloadButton.handler">
                                        {{studentFileDownloadButton.name}}
                                    </el-button>
                                </template>
                            </el-table-column>
                        </data-tables>
                    </div>
                </div>
            </div>
        </b-modal>

        <b-modal id="uploadImmunizationRecordsModal" class="studentPageBModal" title="Immunization Records" ok-only
                 ok-variant="secondary" ok-title="Cancel" ref="uploadImmunizationRecordsShowModal">
            <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <!--<input type="file" ref="studentDocument" accept="image/*" multiple>-->
                    <label>Upload File</label>
                    <input type="file" ref="immunizationRecords">
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label>File Description</label>
                    <input type="text" class="form-control form__input" v-model="inputImmunizationRecordsDescription">
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <button class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch"
                            v-on:click="uploadImmunizationRecords()">
                        Upload
                    </button>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div v-if="studentFileListInt.length>0">
                        <data-tables :data="studentFileListInt" :action-col="studentFileListAction">
                            <el-table-column v-for="studentFileListInfo in studentFileList"
                                             :prop="studentFileListInfo.prop"
                                             :label="studentFileListInfo.label" :key="studentFileListInfo.prop"
                                             sortable="custom">
                            </el-table-column>

                            <el-table-column label="Download" min-width="100px">
                                <template slot-scope="scope">
                                    <el-button
                                            v-for="studentFileDownloadButton in studentFileDownload(scope.row)"
                                            :key="studentFileDownloadButton.name" type="primary"
                                            @click="studentFileDownloadButton.handler">
                                        {{studentFileDownloadButton.name}}
                                    </el-button>
                                </template>
                            </el-table-column>
                        </data-tables>
                    </div>
                </div>
            </div>
        </b-modal>

        <b-modal id="uploadAllAboutMeModal" class="studentPageBModal" title="All About Me" ok-only
                 ok-variant="secondary" ok-title="Cancel" ref="uploadAllAboutMeShowModal">
            <div class="row col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <!--<input type="file" ref="studentDocument" accept="image/*" multiple>-->
                    <label>Upload File</label>
                    <input type="file" ref="allAboutMe">
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label>File Description</label>
                    <input type="text" class="form-control form__input" v-model="inputAllAboutMeDescription">
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <button class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch"
                            v-on:click="uploadAllAboutMe()">
                        Upload
                    </button>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div v-if="studentFileListInt.length>0">
                        <data-tables :data="studentFileListInt" :action-col="studentFileListAction">
                            <el-table-column v-for="studentFileListInfo in studentFileList"
                                             :prop="studentFileListInfo.prop"
                                             :label="studentFileListInfo.label" :key="studentFileListInfo.prop"
                                             sortable="custom">
                            </el-table-column>

                            <el-table-column label="Download" min-width="100px">
                                <template slot-scope="scope">
                                    <el-button
                                            v-for="studentFileDownloadButton in studentFileDownload(scope.row)"
                                            :key="studentFileDownloadButton.name" type="primary"
                                            @click="studentFileDownloadButton.handler">
                                        {{studentFileDownloadButton.name}}
                                    </el-button>
                                </template>
                            </el-table-column>
                        </data-tables>
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";
    import ProfileImg from "../assets/boy.png";
    import {required, requiredIf, requiredUnless} from "vuelidate/lib/validators";
    import promotionComponent from "../components/Promotion_Component";
    import Cookies from "js-cookie";
    import axios from 'axios';

    const API_HOST = process.env.VUE_APP_ROOT_API;

    export default {
        name: "Student",
        async created() {
            // this.imgStudentProfile = API_HOST + '/db/Files/noImage1.jpg';
            this.imgStudentProfile = ProfileImg;
            this.divParent = true;
            this.finShowHide = true;
            this.birthcertShowHide = true;
            this.icShowHide = true;
            this.stuCorAddCopy = false;
            this.resBilAddCopy = false;
            //withdrawn
            this.withdrawMainReason = true;
            this.withdrawInternationalSchool = false;
            this.withdrawReason1 = false;
            this.withdrawReason2 = false;
            this.withdrawReason3 = false;
            //end withdrawn
            await this.BindCountryList();
            await this.BindStudentDropdown();
            //await this.BindStudentLevel();
            await this.BindAcademicYear();
            await this.BindStudentIntakeYear();
            await this.BindTransferSchool();
            await this.checkSchoolIsLocalOrInt();
        },
        async mounted() {
            await this.LoadStudentParentInfo();
            await this.onChangeNationalityBirthPlace();
        },
        data() {
            return {
                countryList: [],
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
                arrayStudentIDLevelComponent: [],
                strClassIDLevelComponent: '',
                transferSchoolList: [],
                transferSchoolCourseList: [],
                studentFileListInt: [],
                ddlMaritalStatusList: [],
                ddlRaceList: [],
                ddlddlStudentFoodAllergiesFoodList: [],
                ddlStudentEnrolledCenterTypeList: [],

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
                inputNameofFamilyDoctor: '',
                inputClinicAddress: '',
                inputClinicPhoneNo: '',
                inputFamilyID: '',
                divFamilySearch: '',
                divEditParentLink: '',
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
                ddlStudentAddressCountry: '',
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
                ddlChangeStatusTo: '',
                selectedFile: null,
                ddlStudentSelectLevel_Level: '',
                ddlStudentFirstAcademicYear_Level: '',
                ddlStudentIntakeYear_Level: '',
                ddlCopyAddToStuCorAdd: '',
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
                stuCorAddCopy: '',
                resBilAddCopy: '',
                siblingTab: '',
                changeStatusAction: '',
                levelTab: '',
                ddlTransferSchool: '',
                ddlTransferSchoolCourse: '',
                inputTransferSchoolRemark: '',
                inputTransferSchoolEffDate: '',
                inputStudentFileDescription: '',
                immunizationRecordsUpload: '',
                inputImmunizationRecordsDescription: '',
                inputAllAboutMeDescription: '',
                ddlFatherWorking: 'No',
                divFatherCompany: '',
                ddlFatherMaritalStatus: '',
                ddlFatherRace: '',
                inputFatherCompanyName: '',
                inputFatherCompanyAddresseeName: '',
                inputFatherCompanyAddress1: '',
                inputFatherCompanyAddress2: '',
                inputFatherCompanyAddress3: '',
                inputFatherCompanyCity: '',
                ddlFatherCompanyCountry: '',
                inputFatherCompanyPostalCode: '',
                inputFatherCompanyEmail: '',
                divMotherCompany: '',
                ddlMotherRace: '',
                ddlMotherMaritalStatus: '',
                ddlMotherWorking: 'No',
                inputMotherCompanyName: '',
                inputMotherCompanyAddresseeName: '',
                inputMotherCompanyAddress1: '',
                inputMotherCompanyAddress2: '',
                inputMotherCompanyAddress3: '',
                inputMotherCompanyCity: '',
                ddlMotherCompanyCountry: '',
                inputMotherCompanyPostalCode: '',
                inputMotherCompanyEmail: '',
                inputFatherWorkingCommencementDate: '',
                inputMotherWorkingCommencementDate: '',
                inputStudent1stEmergencyContact: '',
                inputStudent1stEmergencyContactRelation: '',
                inputStudent2ndEmergencyContact: '',
                inputStudent2ndEmergencyContactRelation: '',
                inputStudentDietaryRequirement: '',
                inputStudentMedicationAllergiesMedication: '',
                inputStudentMedicationAllergiesRemarks: '',
                ddlStudentFoodAllergiesFood: '',
                inputStudentFoodAllergiesRemarks: '',
                isLocalSchool: '',
                isIntSchool: '',
                isIntPreSchool: '',
                ddlStudentRace: '',
                disFatherCompany: true,
                disMotherCompany: true,
                disableIC: true,
                ddlStudentEnrolledinOtherCenter: 'No',
                inputStudentEnrolledCenterName: '',
                divEnrolledinOtherCenterShow: '',
                ddlStudentEnrolledCenterType: '',

                //For withdrawal and graduation
                withdrawInternationalSchool: '',
                withdrawMainReason: '',
                withdrawReason1: '',
                withdrawReason2: '',
                withdrawReason3: '',
                ddlWithdrawGraduation: '',
                inputWithdrawalDate: '',
                ddlMainReason: '',
                ddlReason1: '',
                ddlReason2: '',
                ddlReason3: '',
                ddlInternationalSchool: '',
                ddlMainReasonList: [],
                ddlInternationaSchoolList: [],
                ddlReason1List: [],
                ddlReason2List: [],
                ddlReason3List: [],
                WithGradReason1: '',
                //End withdrawal and graduation

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
                            if (row.School_ID === Cookies.get('schoolSession')) {
                                window.location.replace('/student?id=' + row.Student_ID);
                            } else {
                                alert("You are not authorize to edit this student's info");
                            }
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
                            this.ReferSiblingReligionLanguage(row.PAR_ID);
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

                studentFileList: [{
                    prop: "SF_File_Description",
                    label: "File Description"
                }, {
                    prop: "SF_Upload_Date_convert",
                    label: "File Uploaded Date"
                }],
                studentFileListAction: {
                    label: 'Delete',
                    props: {
                        align: 'center',
                    },
                    buttons: [{
                        props: {
                            type: 'primary',
                            icon: 'el-icon-edit'
                        },
                        handler: row => {
                            this.deleteStudentDocument(row.PK_SF_ID);
                        },
                        label: 'Delete'
                    }]
                },

                medicationAllergiesListInt: [],
                medicationAllergiesList: [{
                    prop: "StAllItem",
                    label: "Medication"
                }, {
                    prop: "StAllRemarks",
                    label: "Remarks"
                }],
                medicationAllergiesListAcion: {
                    label: 'Delete',
                    props: {
                        align: 'center',
                    },
                    buttons: [{
                        props: {
                            type: 'primary',
                            icon: 'el-icon-edit'
                        },
                        handler: row => {
                            this.medicationAllergiesListInt.splice(this.medicationAllergiesListInt.indexOf(row), 1);
                        },
                        label: 'Delete'
                    }]
                },

                foodAllergiesListInt: [],
                foodAllergiesList: [{
                    prop: "StAllItem",
                    label: "Food"
                }, {
                    prop: "StAllRemarks",
                    label: "Remarks"
                }],
                foodAllergiesListAcion: {
                    label: 'Delete',
                    props: {
                        align: 'center',
                    },
                    buttons: [{
                        props: {
                            type: 'primary',
                            icon: 'el-icon-edit'
                        },
                        handler: row => {
                            this.foodAllergiesListInt.splice(this.foodAllergiesListInt.indexOf(row), 1);
                        },
                        label: 'Delete'
                    }]
                },
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
                if (this.inputStudentIdentificationExpiryDate === "" && this.inputStudentIdentificationNo === "" && this.inputStudentBirthCertificate === "" && this.inputStudentIC === "" && this.inputStudentPassport === "" && this.inputStudentPassportExpiryDate === "") {
                    return true;
                } else {
                    return false;
                }
            },
            oneFinType() {
                if (this.inputStudentIdentificationExpiryDate === "" && this.inputStudentIdentificationNo === "" && this.inputStudentBirthCertificate === "" && this.inputStudentIC === "" && this.inputStudentPassport === "" && this.inputStudentPassportExpiryDate === "") {
                    return true;
                } else if ((this.inputStudentIdentificationExpiryDate !== "" && this.inputStudentIdentificationNo === "") || (this.inputStudentIdentificationExpiryDate === "" && this.inputStudentIdentificationNo !== "")) {
                    return true;
                } else {
                    return false;
                }
            },
            onePassportType() {
                if (this.inputStudentIdentificationExpiryDate === "" && this.inputStudentIdentificationNo === "" && this.inputStudentBirthCertificate === "" && this.inputStudentIC === "" && this.inputStudentPassport === "" && this.inputStudentPassportExpiryDate === "") {
                    return true;
                } else if ((this.inputStudentPassport !== "" && this.inputStudentPassportExpiryDate === "") || (this.inputStudentPassport === "" && this.inputStudentPassportExpiryDate !== "")) {
                    return true;
                } else {
                    return false;
                }
            },
            isdivEnrolledinOtherCenter() {
                if (this.divEnrolledinOtherCenterShow === true) {
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

            ddlParentMode: {requiredIf: requiredIf('isdivParent')},
            inputFatherFirstName: {requiredIf: requiredIf('isdivParent')},
            inputFatherLastName: {requiredIf: requiredIf('isdivParent')},
            inputFatherOccupation: {requiredIf: requiredIf('isdivParent')},
            inputMotherFirstName: {requiredIf: requiredIf('isdivParent')},
            inputMotherLastName: {requiredIf: requiredIf('isdivParent')},

            inputStudentEnrolledCenterName: {requiredIf: requiredIf('isdivEnrolledinOtherCenter')},
            ddlStudentEnrolledCenterType: {requiredIf: requiredIf('isdivEnrolledinOtherCenter')},
        },
        components: {promotionComponent},
        methods: {
            backToPrevious() {
                window.location.replace("/student-list?mode=Search");
            },
            async BindCountryList() {
                try {
                    const response = await DataSource.shared.getCountryList();
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.countryListResponse = response.Table;
                            this.countryListResponse.forEach(m => {
                                this.countryList.push(m);
                            });
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async BindStudentDropdown() {
                try {
                    let jsonString = '"Mother Tongue":"Mother Tongue"';
                    jsonString = jsonString + ',"Meal Preferences":"Meal Preferences"';
                    jsonString = jsonString + ',"Student Membership":"Student Membership"';
                    jsonString = jsonString + ',"Residency Status":"Residency Status"';
                    jsonString = jsonString + ',"Sponsorship Type":"Sponsorship Type"';
                    jsonString = jsonString + ',"ParentID":"ParentID"';
                    jsonString = jsonString + ',"Parent Mode":"Parent Mode"';
                    jsonString = jsonString + ',"Graduation_Remarks":"Graduation_Remarks"';
                    jsonString = jsonString + ',"International School Name":"International School Name"';
                    jsonString = jsonString + ',"Widthdrawal Reason":"Widthdrawal Reason"';
                    jsonString = jsonString + ',"Parents Martial Status":"Parents Martial Status"';
                    jsonString = jsonString + ',"Race":"Race"';
                    jsonString = jsonString + ',"Food Allergies":"Food Allergies"';
                    jsonString = jsonString + ',"Other Center Type":"Other Center Type"';
                    jsonString = "{" + jsonString + "}";

                    const response = await DataSource.shared.getStudentDropDownList(jsonString);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.studentDropDownListResponse = response.Table;
                            this.studentDropDownListResponse.forEach(m => {
                                if (m.OGPname.trim() === 'Mother Tongue') {
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
                                } else if (m.OGPname.trim() === 'Graduation_Remarks') {
                                    this.ddlMainReasonList.push(m);
                                } else if (m.OGPname.trim() === 'International School Name') {
                                    this.ddlInternationaSchoolList.push(m);
                                } else if (m.OGPname.trim() === 'Widthdrawal Reason') {
                                    this.ddlReason1List.push(m);
                                    this.ddlReason2List.push(m);
                                    this.ddlReason3List.push(m);
                                } else if (m.OGPname.trim() === 'Parents Martial Status') {
                                    this.ddlMaritalStatusList.push(m);
                                } else if (m.OGPname.trim() === 'Race') {
                                    this.ddlRaceList.push(m);
                                } else if (m.OGPname.trim() === 'Food Allergies') {
                                    this.ddlddlStudentFoodAllergiesFoodList.push(m);
                                } else if (m.OGPname.trim() === 'Other Center Type') {
                                    this.ddlStudentEnrolledCenterTypeList.push(m);
                                }
                            });
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async BindStudentLevel() {
                try {
                    const response = await DataSource.shared.getLevel('');
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.levelListResponse = response.Table;
                            this.levelListResponse.forEach(m => {
                                this.levelList.push(m);
                            });
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async BindStudentLevel_Level(customLevelNotEqual) {
                try {
                    const response = await DataSource.shared.getLevel(customLevelNotEqual);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.levelListResponse = response.Table;
                            this.levelListResponse.forEach(m => {
                                this.levelList_Level.push(m);
                            });
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async BindAcademicYear() {
                try {
                    const response = await DataSource.shared.getAcademicYear();
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.academicYearListResponse = response.Table;
                            this.academicYearListResponse.forEach(m => {
                                //this.academicYearList.push(m);
                                this.academicYearList_Level.push(m);
                            });
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async BindStudentIntakeYear() {
                try {
                    const response = await DataSource.shared.getIntakeYear();
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.studentIntakeYearListResponse = response.Table;
                            this.studentIntakeYearListResponse.forEach(m => {
                                //this.studentIntakeYearList.push(m);
                                this.studentIntakeYearList_Level.push(m);
                            });
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async LoadStudentParentInfo() {
                try {
                    if (this.$route.query.id != null || this.$route.query.id !== undefined) {
                        this.lblCreateOrEdit = "Edit";
                        this.lblStudentID = this.$route.query.id;
                        this.editModeDisable = true;
                        this.siblingTab = true;
                        this.levelTab = true;
                        this.divFamilySearch = false;
                        this.divEditParentLink = true;
                        this.changeStatusAction = true;
                        let parentID;
                        let courseID;

                        const stuRes = await DataSource.shared.getStudent(this.$route.query.id, "", "", "", "");
                        if (stuRes) {
                            if (stuRes.code === '88') {
                                window.location.replace('/');
                            } else if (stuRes.code === '99') {
                                console.log('get Student Error');
                            } else if (stuRes.code === '2') {
                                window.location.replace('/');
                            } else {
                                this.BindActiveIntakeYear();
                                this.BindStudentFields(stuRes.Table);
                                this.BindStudentSibling();
                                this.arrayStudentIDLevelComponent.push(stuRes.Table[0].Student_ID);
                                if (stuRes.Table[0].Nationality !== 'Singaporean') {
                                    await this.checkImmunizationRecordsUpload();
                                }
                            }
                        }

                        const stuProPic = await DataSource.shared.getStudentProfilePicture(this.$route.query.id);
                        if (stuProPic) {
                            if (stuProPic.code === '88') {
                                window.location.replace('/');
                            } else if (stuProPic.code === '99') {
                                console.log('get getStudentProfilePicture Error');
                            } else if (stuProPic.code === '2') {
                                console.log('getStudentProfilePicture No Record');
                            } else {
                                if (stuProPic.code !== "2" && stuProPic.code !== "99") {
                                    this.stuProPicLoop = stuProPic.Table;
                                    this.stuProPicLoop.forEach(m => {
                                        this.imgStudentProfile = API_HOST + '/db/Files/' + m.SF_File_Name;
                                    });
                                }
                            }
                        }

                        const relRes = await DataSource.shared.getRelationship("", this.$route.query.id, "", "", "");
                        if (relRes) {
                            if (relRes.code === '88') {
                                window.location.replace('/');
                            } else if (relRes.code === '99') {
                                console.log('get getRelationship Error');
                            } else if (relRes.code === '2') {
                                console.log('getRelationship No Record');
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
                            if (response.code === '88') {
                                window.location.replace('/');
                            } else if (response.code === '99') {
                                console.log('get getStudentLevel Error');
                            } else if (response.code === '2') {
                                console.log('getStudentLevel No Record');
                            } else {
                                this.lvlLevelList_Level = response.Table;

                                //filter the added level to BindStudentLevel
                                let customLevelNotEqual = '';
                                this.GetStudentLevelListResponse = response.Table;
                                this.GetStudentLevelListResponse.forEach(m => {
                                    if (customLevelNotEqual === '') {
                                        customLevelNotEqual = m.PK_Course_ID;
                                    } else {
                                        customLevelNotEqual = customLevelNotEqual + "," + m.PK_Course_ID;
                                    }

                                    // if (m.SCRS_Status === 'Active') {
                                    courseID = m.SCRS_FK_Course_ID;
                                    this.strClassIDLevelComponent = courseID;
                                    // }
                                });

                                this.BindStudentLevel_Level(customLevelNotEqual);
                                //filter the added level to BindStudentLevel
                            }
                        }

                        // const resStuClass = await DataSource.shared.getStudentClass(this.$route.query.id, courseID);
                        // if (resStuClass) {
                        //     if (resStuClass.code === '88') {
                        //         window.location.replace('/');
                        //     }
                        //     else if (resStuClass.code === 2)
                        //     {
                        //         alert('No record found');
                        //     }
                        //     else
                        //     {
                        //         this.strClassIDLevelComponent = resStuClass.Table[0].PK_Class_ID;
                        //     }
                        // }

                        const alleRes = await DataSource.shared.getStudentAllergies(this.$route.query.id, '');
                        if (alleRes) {
                            if (alleRes.code === '88') {
                                window.location.replace('/');
                            } else if (alleRes.code === '99') {
                                console.log('get getStudentAllergies Error');
                            } else if (alleRes.code === '2') {
                                console.log('getStudentAllergies No Record');
                            } else {
                                this.alleResLoop = alleRes.Table;
                                this.alleResLoop.forEach(m => {
                                    if (m.StAllType === 'Medical') {
                                        this.medicationAllergiesListInt.push(m);
                                    } else if (m.StAllType === 'Food') {
                                        this.foodAllergiesListInt.push(m);
                                    }
                                });
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
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async BindActiveIntakeYear() {
                try {
                    const response = await DataSource.shared.getStudentLevelActiveOnly(this.$route.query.id);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            response.Table.forEach(m => {
                                this.ddlStudentIntakeYear = m.SCRS_Course_Year;
                            });
                        }
                    }

                } catch (e) {
                    this.results = e;
                }
            },
            async BindStudentAvailableStatusAction(currentStatus) {
                try {
                    const response = await DataSource.shared.getStudentAvailableStatusAction(currentStatus);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.ddlChangeStatusToListResponse = response.Table1;
                            this.ddlChangeStatusToListResponse.forEach(m => {
                                this.ddlChangeStatusToList.push(m);
                            });
                        }
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
                        if (m.DOB_convert !== '01/01/1901') {
                            this.inputStudentDateOfBirth = m.DOB_convert;
                        }
                        ;
                        this.ddlStudentNationality = m.Nationality;
                        if (m.Regst_date_convert !== '01/01/1901') {
                            this.inputFirstCommencementDate = m.Regst_date_convert;
                        }
                        ;
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
                        if (m.ID_ExpDate_convert !== '01/01/1901') {
                            this.inputStudentIdentificationExpiryDate = m.ID_ExpDate_convert;
                        }
                        ;
                        this.inputStudentBirthCertificate = m.St_BirthCer_Number;
                        this.inputStudentIC = m.St_IC_ID_Number;
                        this.inputStudentPassport = m.St_Passport_Number;
                        if (m.St_Passport_ExpDate_convert !== '01/01/1901') {
                            this.inputStudentPassportExpiryDate = m.St_Passport_ExpDate_convert;
                        }
                        ;
                        this.inputStudent1stEmergencyContact = m.St_EmergencyContact;
                        this.inputStudent1stEmergencyContactRelation = m.St_EmergencyContactRelation;
                        this.inputStudent2ndEmergencyContact = m.St_2ndEmergencyContact;
                        this.inputStudent2ndEmergencyContactRelation = m.St_2ndEmergencyContactRelation;
                        this.inputStudentDietaryRequirement = m.St_Dietary;
                        this.ddlStudentRace = m.Race;
                        this.ddlStudentEnrolledinOtherCenter = m.St_OtherCenter;
                        if (m.St_OtherCenter === 'Yes') {
                            this.divEnrolledinOtherCenterShow = true;
                            this.inputStudentEnrolledCenterName = m.St_OtherCenterName;
                            this.ddlStudentEnrolledCenterType = m.St_OtherCenterType;
                        }
                        ;
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
                        if (m.PAR_Father_DOB_convert !== '01/01/1901') {
                            this.inputFatherDateofBirth = m.PAR_Father_DOB_convert;
                        }
                        ;
                        this.inputFatherOccupation = m.PAR_Father_Occupation;
                        this.inputFatherMobileNo = m.PAR_Father_Phone;
                        this.inputFatherEmail = m.PAR_Father_Email;
                        this.ddlFatherIdentificationType = m.PAR_Father_IDType;
                        this.inputFatherIdentificationNo = m.PAR_Father_UID;
                        this.inputMotherFirstName = m.PAR_Mother_FirstName;
                        this.inputMotherMiddleName = m.PAR_Mother_MiddleName;
                        this.inputMotherLastName = m.PAR_Mother_LastName;
                        if (m.PAR_Mother_DOB_convert !== '01/01/1901') {
                            this.inputMotherDateofBirth = m.PAR_Mother_DOB_convert;
                        }
                        ;
                        this.inputMotherOccupation = m.PAR_Mother_Occupation;
                        this.inputMotherMobileNo = m.PAR_Mother_Phone;
                        this.inputMotherEmail = m.PAR_Mother_Email;
                        this.ddlMotherIdentificationType = m.PAR_Mother_IDType;
                        this.inputMotherIdentificationNo = m.PAR_Mother_UID;
                        if (m.PAR_Father_IDExpDate_convert !== '01/01/1901') {
                            this.inputFatherIdentificationNoExpiryDate = m.PAR_Father_IDExpDate_convert;
                        }
                        ;
                        if (m.PAR_Mother_IDExpDate_convert !== '01/01/1901') {
                            this.inputMotherIdentificationNoExpiryDate = m.PAR_Mother_IDExpDate_convert;
                        }
                        ;
                        this.inputFamilyID = m.PAR_Family_Number;
                        this.ddlFatherRace = m.PAR_Father_Race;
                        this.ddlFatherMaritalStatus = m.PAR_Father_MaritalStatus;
                        this.ddlFatherWorking = m.PAR_Father_Working;
                        this.ddlMotherRace = m.PAR_Mother_Race;
                        this.ddlMotherMaritalStatus = m.PAR_Mother_MaritalStatus;
                        this.ddlMotherWorking = m.PAR_Mother_Working;
                    });
                } catch (e) {
                    this.results = e;
                }
            },
            async BindStudentSibling() {
                try {
                    const response = await DataSource.shared.getSibling('', this.$route.query.id);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            if (response.Table.length > 0) {
                                this.siblingList = response.Table;
                            }
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
                    jsonString = jsonString + ',"St_EmergencyContact":"' + this.inputStudent1stEmergencyContact + '"';
                    jsonString = jsonString + ',"St_EmergencyContactRelation":"' + this.inputStudent1stEmergencyContactRelation + '"';
                    jsonString = jsonString + ',"St_2ndEmergencyContact":"' + this.inputStudent2ndEmergencyContact + '"';
                    jsonString = jsonString + ',"St_2ndEmergencyContactRelation":"' + this.inputStudent2ndEmergencyContactRelation + '"';
                    jsonString = jsonString + ',"St_Dietary":"' + this.inputStudentDietaryRequirement + '"';
                    jsonString = jsonString + ',"Race":"' + this.ddlStudentRace + '"';
                    jsonString = jsonString + ',"St_OtherCenter":"' + this.ddlStudentEnrolledinOtherCenter + '"';
                    if (this.ddlStudentEnrolledinOtherCenter === 'Yes') {
                        jsonString = jsonString + ',"St_OtherCenterName":"' + this.inputStudentEnrolledCenterName + '"';
                        jsonString = jsonString + ',"St_OtherCenterType":"' + this.ddlStudentEnrolledCenterType + '"';
                    }
                    //students

                    //parent
                    let jsonString2 = '"PAR_Mode":"' + this.ddlParentMode + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_FirstName":"' + this.inputFatherFirstName + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_MiddleName":"' + this.inputFatherMiddleName + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_LastName":"' + this.inputFatherLastName + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_DOB":"' + this.inputFatherDateofBirth + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Occupation":"' + this.inputFatherOccupation + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Phone":"' + this.inputFatherMobileNo + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Email":"' + this.inputFatherEmail + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_IDType":"' + this.ddlFatherIdentificationType + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_UID":"' + this.inputFatherIdentificationNo + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_FirstName":"' + this.inputMotherFirstName + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_MiddleName":"' + this.inputMotherMiddleName + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_LastName":"' + this.inputMotherLastName + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_DOB":"' + this.inputMotherDateofBirth + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Occupation":"' + this.inputMotherOccupation + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Phone":"' + this.inputMotherMobileNo + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Email":"' + this.inputMotherEmail + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_IDType":"' + this.ddlMotherIdentificationType + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_UID":"' + this.inputMotherIdentificationNo + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_IDExpDate":"' + this.inputFatherIdentificationNoExpiryDate + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_IDExpDate":"' + this.inputMotherIdentificationNoExpiryDate + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Loc_Residence_No":"' + this.inputStudentAddress1 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Loc_Address1":"' + this.inputStudentAddress2 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Loc_Address2":"' + this.inputStudentAddress3 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Loc_Postalcode":"' + this.inputStudentPostalCode + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Loc_City":"' + this.inputStudentCity + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Loc_Country":"' + this.ddlStudentAddressCountry + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Loc_Residence_No":"' + this.inputStudentAddress1 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Loc_Address1":"' + this.inputStudentAddress2 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Loc_Address2":"' + this.inputStudentAddress3 + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Loc_City":"' + this.inputStudentCity + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Loc_Country":"' + this.ddlStudentAddressCountry + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Loc_Postalcode":"' + this.inputStudentPostalCode + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Race":"' + this.ddlFatherRace + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Race":"' + this.ddlMotherRace + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_MaritalStatus":"' + this.ddlFatherMaritalStatus + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_MaritalStatus":"' + this.ddlMotherMaritalStatus + '"';
                    jsonString2 = jsonString2 + ',"PAR_Father_Working":"' + this.ddlFatherWorking + '"';
                    jsonString2 = jsonString2 + ',"PAR_Mother_Working":"' + this.ddlMotherWorking + '"';
                    if (this.ddlFatherWorking === 'Yes') {
                        jsonString2 = jsonString2 + ',"PAR_Father_CompanyName":"' + this.inputFatherCompanyName + '"';
                        jsonString2 = jsonString2 + ',"PAR_Fat_Comp_Addressee":"' + this.inputFatherCompanyAddresseeName + '"';
                        jsonString2 = jsonString2 + ',"PAR_Father_Residence_No":"' + this.inputFatherCompanyAddress1 + '"';
                        jsonString2 = jsonString2 + ',"PAR_Father_Address1":"' + this.inputFatherCompanyAddress2 + '"';
                        jsonString2 = jsonString2 + ',"PAR_Father_Address2":"' + this.inputFatherCompanyAddress3 + '"';
                        jsonString2 = jsonString2 + ',"PAR_Father_City":"' + this.inputFatherCompanyCity + '"';
                        jsonString2 = jsonString2 + ',"PAR_Father_Country":"' + this.ddlFatherCompanyCountry + '"';
                        jsonString2 = jsonString2 + ',"PAR_Father_PostalCode":"' + this.inputFatherCompanyPostalCode + '"';
                        jsonString2 = jsonString2 + ',"PAR_FComp_Email":"' + this.inputFatherCompanyEmail + '"';
                        jsonString2 = jsonString2 + ',"PAR_Father_WorkingCommencementDate":"' + this.inputFatherWorkingCommencementDate + '"';
                    }
                    if (this.ddlMotherWorking === 'Yes') {
                        jsonString2 = jsonString2 + ',"PAR_Mother_CompanyName":"' + this.inputMotherCompanyName + '"';
                        jsonString2 = jsonString2 + ',"PAR_Mot_Comp_Addressee":"' + this.inputMotherCompanyAddresseeName + '"';
                        jsonString2 = jsonString2 + ',"PAR_Mother_Residence_No":"' + this.inputMotherCompanyAddress1 + '"';
                        jsonString2 = jsonString2 + ',"PAR_Mother_Address1":"' + this.inputMotherCompanyAddress2 + '"';
                        jsonString2 = jsonString2 + ',"PAR_Mother_Address2":"' + this.inputMotherCompanyAddress3 + '"';
                        jsonString2 = jsonString2 + ',"PAR_Mother_City":"' + this.inputMotherCompanyCity + '"';
                        jsonString2 = jsonString2 + ',"PAR_Mother_Country":"' + this.ddlMotherCompanyCountry + '"';
                        jsonString2 = jsonString2 + ',"PAR_Mother_PostalCode":"' + this.inputMotherCompanyPostalCode + '"';
                        jsonString2 = jsonString2 + ',"PAR_MComp_Email":"' + this.inputMotherCompanyEmail + '"';
                        jsonString2 = jsonString2 + ',"PAR_Mother_WorkingCommencementDate":"' + this.inputMotherWorkingCommencementDate + '"';
                    }
                    //parent

                    jsonString = '{ ' + jsonString + ' }';
                    jsonString2 = '{ ' + jsonString2 + ' }';

                    //allergies list combining into one whole list//
                    let allergiesList = [];

                    //medical
                    this.medicationAllergiesListInt.forEach(item => {
                        let medicationAllergiesListIntDetials = {
                            Item: item.StAllItem,
                            Remarks: item.StAllRemarks,
                            Type: 'Medical'
                        };

                        allergiesList.push(medicationAllergiesListIntDetials);
                    });

                    //food
                    this.foodAllergiesListInt.forEach(item => {
                        let foodAllergiesListIntDetials = {
                            Item: item.StAllItem,
                            Remarks: item.StAllRemarks,
                            Type: 'Food'
                        };

                        allergiesList.push(foodAllergiesListIntDetials);
                    });
                    //allergies list combining into one whole list//

                    if (this.lblCreateOrEdit === "New") {
                        const chkStuRes = await DataSource.shared.checkStudentDuplication(this.inputStudentFirstName, this.inputStudentLastName, this.inputStudentDateOfBirth, this.inputStudentIdentificationExpiryDate, this.inputStudentIdentificationNo, this.inputStudentBirthCertificate, this.inputStudentIC, this.inputStudentPassport, this.inputStudentPassportExpiryDate);
                        if (chkStuRes) {
                            if (chkStuRes.code === '88') {
                                window.location.replace('/');
                            } else if (chkStuRes.code === "1") {
                                const saveStuRes = await DataSource.shared.saveStudent(this.selectedFile, jsonString, jsonString2, this.inputFamilyID, this.inputFamilyParentID, JSON.stringify(allergiesList));
                                if (saveStuRes) {
                                    if (saveStuRes.code === '88') {
                                        window.location.replace('/');
                                    } else if (saveStuRes.code === "1") {
                                        alert('Records Successfully Saved');
                                        window.location.replace('/student?id=' + saveStuRes.studentID);
                                    } else {
                                        alert("Save Student Error - Please try again later");
                                    }
                                }
                            } else if (chkStuRes.code === "2") {
                                alert("This student is existing");
                            } else {
                                alert("Check Student Error - Please try again later");
                            }
                        }
                    } else if (this.lblCreateOrEdit === "Edit") {
                        try {
                            const response = await DataSource.shared.updateStudent(this.selectedFile, this.lblStudentID, jsonString, JSON.stringify(allergiesList));
                            if (response) {
                                if (response.code === '88') {
                                    window.location.replace('/');
                                } else if (response.code === '1') {
                                    alert('Records Successfully Edited');
                                    // window.location.replace('/student?id=' + this.lblStudentID);
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
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.familyIDList = response.Table;
                        }
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
                            if (response.code === '88') {
                                window.location.replace('/');
                            } else if (response.code === '1') {
                                this.lblMotherNameDuplicated = false;
                            } else if (response.code === '2') {
                                this.lblMotherNameDuplicated = true;
                            }
                        }
                    }

                    if (this.inputFatherFirstName !== '' && this.inputFatherLastName !== '') {
                        const response = await DataSource.shared.checkParentDuplication(this.inputFatherFirstName, this.inputFatherLastName, 'Father');
                        if (response) {
                            if (response.code === '88') {
                                window.location.replace('/');
                            } else if (response.code === '1') {
                                this.lblFatherNameDuplicated = false;
                            } else if (response.code === '2') {
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
                    if (this.ddlChangeStatusTo === '' || this.ddlChangeStatusTo === null) {
                        alert('Please select status to change');
                    } else if (this.ddlChangeStatusTo === 'Active') {
                        if (this.lblStudentIndexNo === undefined || this.lblStudentIndexNo === '') {
                            this.Active();
                        } else {
                            this.ChangeStatus();
                        }
                    } else {
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
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '1') {
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
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '1') {
                            this.$notify({
                                title: 'Success',
                                message: 'Successfully change status',
                                type: 'success'
                            });
                            this.ddlChangeStatusToList = [];
                            this.LoadStudentParentInfo();
                            // window.location.replace('/student?id=' + this.lblStudentID);
                        } else {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Please try again later'
                            });
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
                    if (studentDateOfBirth > firstCommencementDate) {
                        alert('Commencement Date cannot early Date of Birth');
                        return;
                    }

                    this.Save();
                    this.promoteStudents();
                } catch (e) {
                    this.results = e;
                }
            },
            async promoteStudents(PK_Semester_ID, PK_Course_ID, PK_Class_ID) {
                console.log("11");
                let studentID = this.$route.query.id;
                console.log(PK_Semester_ID);
                await DataSource.shared.saveStudentPromotions(studentID, PK_Semester_ID, PK_Course_ID, PK_Class_ID).then((result) => {

                    // this.hideLoading();
                    if (!this.isNull(result) && result.code === "1") {
                        console.log("22");

                        this.$notify({
                            title: 'Success',
                            message: 'Students Promoted',
                            type: 'success'
                        });
                    } else if (!this.isNull(result) && result.code === "2") {
                        this.$notify({
                            title: 'Student Exceeded',
                            message: 'Number of students assign to this class have excceded max number of class',
                            type: 'success'
                        });
                    }
                });
                // this.hideLoading();
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
            previewImgStudentProfile: function (event) {
                try {
                    var input = event.target;
                    if (input.files && input.files[0]) {
                        var reader = new FileReader();
                        reader.onload = (e) => {
                            this.imgStudentProfile = e.target.result;
                        };
                        reader.readAsDataURL(input.files[0]);
                        this.selectedFile = event.target.files;
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async onChangeNationalityBirthPlace() {
                try {
                    if (this.ddlStudentNationality === '' && this.ddlStudentBirthPlace === '') {
                        this.finShowHide = false;
                        this.birthcertShowHide = false;
                        this.icShowHide = false;
                    } else if ((this.ddlStudentNationality === 'Singaporean' && this.ddlStudentBirthPlace === '') || (this.ddlStudentNationality === '' && this.ddlStudentBirthPlace === 'Singapore') || (this.ddlStudentNationality === 'Singaporean' && this.ddlStudentBirthPlace === 'Singapore')) {
                        this.finShowHide = false;
                        this.inputStudentIdentificationNo = '';
                        this.inputStudentIdentificationExpiryDate = '';

                        this.birthcertShowHide = true;

                        this.icShowHide = true;
                    } else if (this.ddlStudentNationality !== 'Singaporean' && this.ddlStudentBirthPlace === 'Singapore') {
                        this.finShowHide = true;

                        this.birthcertShowHide = true;

                        this.icShowHide = false;
                        this.inputStudentIC = '';
                    } else if (this.ddlStudentNationality === 'Singaporean' && this.ddlStudentBirthPlace !== 'Singapore') {
                        this.finShowHide = false;
                        this.inputStudentIdentificationNo = '';
                        this.inputStudentIdentificationExpiryDate = '';

                        this.birthcertShowHide = false;
                        this.inputStudentBirthCertificate = '',

                            this.icShowHide = true;
                    } else if (this.ddlStudentNationality !== 'Singaporean' && this.ddlStudentBirthPlace !== 'Singapore') {
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
            async EditParentLink() {
                window.location.replace('/parent?id=' + this.lblParentID);
            },
            studentLevelListActivate(row) {
                return [{
                    name: 'Promote',
                    handler: _ => {
                        this.updateLevel(row.PK_Student_Course_ID, "Activate");
                    }
                }];
            },
            studentLevelListDeactivate(row) {
                return [{
                    name: 'Demote',
                    handler: _ => {
                        this.updateLevel(row.PK_Student_Course_ID, "Deactivate");
                    }
                }];
            },
            async updateLevel(courseID, mode) {
                try {
                    const response = await DataSource.shared.updateLevel(this.lblStudentID, courseID, mode);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '1') {
                            alert('Edit Successfully!');
                            window.location.replace('/student?id=' + this.lblStudentID);
                        } else if (response.code === '2') {
                            alert('Cannot have multiple active level');
                        } else {
                            alert('updateLevel Error! Please try again later.');
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async AddLevel() {
                try {
                    if (this.lblStudentID !== "" && this.ddlStudentSelectLevel_Level !== "" && this.ddlStudentFirstAcademicYear_Level !== "" && this.ddlStudentIntakeYear_Level !== "") {
                        const getAcaYearRes = await DataSource.shared.getAcademicYearDateRange(this.ddlStudentFirstAcademicYear_Level);

                        if (getAcaYearRes) {
                            if (getAcaYearRes.code === '88') {
                                window.location.replace('/');
                            }
                            if (getAcaYearRes.code === "99") {

                            } else {
                                let academicYearFromDate, academicYearToDate;

                                this.getAcaYearResTemp = getAcaYearRes.Table;
                                this.getAcaYearResTemp.forEach(m => {
                                    academicYearFromDate = m.SMT_From;
                                    academicYearToDate = m.SMT_To;
                                });

                                const getSetLvlRes = await DataSource.shared.setLevel(this.lblStudentID, this.ddlStudentSelectLevel_Level, academicYearFromDate, academicYearToDate, this.ddlStudentFirstAcademicYear_Level, this.ddlStudentIntakeYear_Level);

                                if (getSetLvlRes) {
                                    if (getSetLvlRes.code === '88') {
                                        window.location.replace('/');
                                    } else if (getSetLvlRes.code === "1") {
                                        alert('Records Successfully Saved');
                                        window.location.replace('/student?id=' + this.lblStudentID);
                                    } else if (getSetLvlRes.code === "2") {
                                        alert('cannot have multiple active level');
                                    } else {
                                        alert('Save Student Level Error - Please try again later');
                                    }
                                }
                            }
                        }
                    } else {
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
                    } else if (postcodeModel === 'inputStudentCorrespondancePostalCode' && this.inputStudentCorrespondancePostalCode !== '' && this.inputStudentCorrespondanceAddress1 === '') {
                        const response = await DataSource.shared.getStudentAddressGoogleAPI(this.inputStudentCorrespondancePostalCode, this.ddlStudentAddressCorrespondanceCountry);
                        if (response !== '') {
                            this.inputStudentCorrespondanceAddress1 = response;
                        }
                    }

                    this.onchangeCopyAdd();
                } catch (e) {
                    this.results = e;
                }
            },
            async ReferSiblingReligionLanguage(parentID) {
                try {
                    const response = await DataSource.shared.getStudentSiblingReligionLanguages(parentID);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.ddlStudentAdditionalLanguage = response.Table[0].St_Mother_Tongue;
                            this.inputStudentFirstLanguageSpoken = response.Table[0].St_AdditionalLanguage;
                            this.inputSecondLanguageSpoken = response.Table[0].St_SecondLanguageSpoken;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async onchangeCopyAdd() {
                if (this.ddlCopyAddToStuCorAdd === 'stuPerAdd') {
                    this.stuCorAddCopy = true;

                    this.ddlStudentAddressCorrespondanceCountry = this.ddlStudentAddressCountry;
                    this.inputStudentCorrespondancePostalCode = this.inputStudentPostalCode;
                    this.inputStudentCorrespondanceAddress1 = this.inputStudentAddress1;
                    this.inputStudentCorrespondanceAddress2 = this.inputStudentAddress2;
                    this.inputStudentCorrespondanceAddress3 = this.inputStudentAddress3;
                    this.inputStudentCorrespondanceCity = this.inputStudentCity;
                } else {
                    this.stuCorAddCopy = false;
                }
            },
            promotionResult(result) {
                if (result === 'true') {
                    alert('Records Successfully Saved');
                    window.location.replace('/student?id=' + this.lblStudentID);
                } else {
                    alert('Error promotion');
                }
            },
            checkSiblingEditButton(value) {
                if (value === Cookies.get('schoolSession')) {
                    return true;
                } else {
                    return false;
                }
            },
            editSibling(schID, siblingStudentID) {
                if (schID === Cookies.get('schoolSession')) {
                    window.location.replace('/student?id=' + siblingStudentID);
                } else {
                    alert("You are not authorize to edit this student's info");
                }
            },
            async BindTransferSchool() {
                try {
                    const response = await DataSource.shared.getAllActiveSchool();
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.transferSchoolListResponse = response.Table;
                            this.transferSchoolListResponse.forEach(m => {
                                if (m.PK_SCH_ID !== 'SCH20120000001') {
                                    this.transferSchoolList.push(m);
                                }
                            });
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async transferSave() {
                try {
                    if (this.ddlTransferSchool !== '' && this.ddlTransferSchool !== undefined) {
                        const response = await DataSource.shared.saveTransferSchool(this.lblStudentID, this.ddlTransferSchool, this.inputTransferSchoolRemark, this.inputTransferSchoolEffDate);
                        if (response) {
                            if (response.code === '88') {
                                window.location.replace('/');
                            } else if (response.code === '99') {
                                alert('Error!');
                            } else if (response.code === '2') {
                                alert('Commencement Date cannot today or less than today!');
                            } else if (response.code === '3') {
                                alert('Duplicated transfer action!');
                            } else if (response.code === '4') {
                                alert('Cannot transfer to same school!');
                            } else {
                                alert('Student has been provisionally transfered!');
                            }
                        }
                    } else {
                        alert('Please fill in all the fields!');
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async WithdrawSave() {
                try {
                    let date = new Date().getDate();
                    let month = new Date().getMonth() + 1;
                    let year = new Date().getFullYear();
                    console.log(this.ddlInternationaSchool);
                    var withdrawObj = {
                        studentID: this.lblStudentID,
                        GRD_Remarks: this.ddlMainReason,
                        GRD_Remarks1: this.ddlReason1,
                        GRD_Remarks2: this.ddlReason2,
                        GRD_Remarks3: this.ddlReason3,
                        GRD_Date: this.inputWithdrawalDate,
                        GRD_Withdraw_Date: this.inputWithdrawalDate,
                        GRD_SchoolName: this.ddlInternationalSchool,
                    };
                    //check student withdraw status
                    if (this.lblCurrentStatus === 'Withdrawn') {
                        alert('Cannot Withdraw student who is already Withdrawn');
                    } else if (this.ddlMainReason === '' || this.ddlMainReason === null || this.ddlMainReason === undefined) {
                        alert('Please select withdraw reason');
                    } else if (this.inputWithdrawalDate === '' || this.inputWithdrawalDate === null || this.inputWithdrawalDate === undefined) {
                        alert('Please select datetime');
                    } else {

                        const response = await DataSource.shared.saveStudentWithdraw(JSON.stringify(withdrawObj));

                        console.log(response.code);

                        if (response.code === '88') {
                            console.log('88');
                        } else if (response.code === "99") {
                            console.log('99');
                        } else if (response.code === '1') {
                            alert('Withdraw Successful');
                            window.location.replace('/student?id=' + this.lblStudentID);
                        }
                    }
                } catch (e) {
                    this.results = e;
                }

            },
            WithdrawTaskDescription() {
                if (this.ddlMainReason === "Transferring to another international school") {
                    this.withdrawInternationalSchool = true;
                    this.withdrawReason1 = true;
                    this.withdrawReason2 = true;
                    this.withdrawReason3 = true;
                } else {
                    this.ddlInternationaSchool = '';
                    this.ddlReason1 = '';
                    this.ddlReason2 = '';
                    this.ddlReason3 = '';
                    this.withdrawInternationalSchool = false;
                    this.withdrawReason1 = false;
                    this.withdrawReason2 = false;
                    this.withdrawReason3 = false;
                }
            },
            async showStudentDocumentModal() {
                this.$vs.loading();
                try {
                    this.studentFileListInt = [];

                    const response = await DataSource.shared.getStudentDocument(this.lblStudentID, 'DOCUMENT');

                    if (response) {
                        this.studentFileListInt = response.Table;
                    }

                    this.$refs.uploadDocumentShowModal.show();
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },
            async uploadStudentDocument() {
                try {
                    if (this.$refs.studentDocument.files.length === 0) {
                        alert('Please select file!');
                    } else if (this.inputStudentFileDescription === '') {
                        alert('Please fill in file description!');
                    } else {
                        const response = await DataSource.shared.saveStudentDocument(this.$refs.studentDocument.files, this.lblStudentID, this.inputStudentFileDescription, 'Upload Student Documents');

                        if (response) {
                            if (response.code === '88') {
                                window.location.replace('/');
                            } else if (response.code === '99') {
                                alert('Error!');
                            } else if (response.code === '2') {
                                alert('No files being upload!');
                            } else if (response.code === '3') {
                                alert('Upload files error! Please try again');
                            } else if (response.code === '1') {
                                this.inputStudentFileDescription = '';
                                this.studentFileListInt = [];
                                this.$refs.studentDocument.value = null;

                                alert('File Successfuly saved!');

                                this.$refs.uploadDocumentShowModal.hide();
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async deleteStudentDocument(studentFilesID) {
                try {
                    const response = await DataSource.shared.updateStudentDocument(studentFilesID, 'DELETE');

                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            alert('Error!');
                        } else if (response.code === '1') {
                            this.inputStudentFileDescription = '';
                            this.studentFileListInt = [];

                            alert('File Successfuly saved!');

                            this.$refs.uploadDocumentShowModal.hide();
                            this.$refs.uploadImmunizationRecordsShowModal.hide();
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            studentFileDownload(row) {
                return [{
                    name: 'Download',
                    handler: _ => {
                        axios({
                            method: 'get',
                            url: row.fileLink,
                            responseType: 'arraybuffer'
                        })
                            .then(response => {
                                this.fileDownload(response, row.fileExt);
                            })
                            .catch(() => console.log('error occured'));
                    }
                }];
            },
            fileDownload(response, fileExt) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file' + fileExt);
                document.body.appendChild(link);
                link.click();
            },
            async checkImmunizationRecordsUpload() {
                try {
                    const response = await DataSource.shared.getSchoolInfoBySchoolID(Cookies.get('schoolSession'));
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            console.log('no school found in checkImmunizationRecordsUpload');
                        } else {
                            if (response.Table[0].SCH_SchoolType.includes('International')) {
                                this.immunizationRecordsUpload = true;
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async showImmunizationRecordsModal() {
                this.$vs.loading();
                try {
                    this.studentFileListInt = [];

                    const response = await DataSource.shared.getStudentDocument(this.lblStudentID, 'IMMNUIZATION');

                    if (response) {
                        this.studentFileListInt = response.Table;
                    }

                    this.$refs.uploadImmunizationRecordsShowModal.show();
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },
            async uploadImmunizationRecords() {
                try {
                    if (this.$refs.immunizationRecords.files.length === 0) {
                        alert('Please select file!');
                    } else if (this.inputImmunizationRecordsDescription === '') {
                        alert('Please fill in file description!');
                    } else {
                        const response = await DataSource.shared.saveStudentDocument(this.$refs.immunizationRecords.files, this.lblStudentID, this.inputImmunizationRecordsDescription, 'Upload Student Immunization Records');

                        if (response) {
                            if (response.code === '88') {
                                window.location.replace('/');
                            } else if (response.code === '99') {
                                alert('Error!');
                            } else if (response.code === '2') {
                                alert('No files being upload!');
                            } else if (response.code === '3') {
                                alert('Upload files error! Please try again');
                            } else if (response.code === '1') {
                                this.inputImmunizationRecordsDescription = '';
                                this.studentFileListInt = [];
                                this.$refs.immunizationRecords.value = null;

                                alert('File Successfuly saved!');

                                this.$refs.uploadImmunizationRecordsShowModal.hide();
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async showAllAboutMeModal() {
                this.$vs.loading();
                try {
                    this.studentFileListInt = [];

                    const response = await DataSource.shared.getStudentDocument(this.lblStudentID, 'ALLABOUTME');

                    if (response) {
                        this.studentFileListInt = response.Table;
                    }

                    this.$refs.uploadAllAboutMeShowModal.show();
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },
            async uploadAllAboutMe() {
                try {
                    if (this.$refs.allAboutMe.files.length === 0) {
                        alert('Please select file!');
                    } else if (this.inputAllAboutMeDescription === '') {
                        alert('Please fill in file description!');
                    } else {
                        const response = await DataSource.shared.saveStudentDocument(this.$refs.allAboutMe.files, this.lblStudentID, this.inputAllAboutMeDescription, 'Upload All About Me');

                        if (response) {
                            if (response.code === '88') {
                                window.location.replace('/');
                            } else if (response.code === '99') {
                                alert('Error!');
                            } else if (response.code === '2') {
                                alert('No files being upload!');
                            } else if (response.code === '3') {
                                alert('Upload files error! Please try again');
                            } else if (response.code === '1') {
                                this.inputAllAboutMeDescription = '';
                                this.studentFileListInt = [];
                                this.$refs.allAboutMe.value = null;

                                alert('File Successfuly saved!');

                                this.$refs.uploadAllAboutMeShowModal.hide();
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            ParentCompanyAddressShow(value) {
                if (value === 'Father') {
                    if (this.ddlFatherWorking === 'Yes') {
                        this.divFatherCompany = true;
                        this.disFatherCompany = false;
                    } else {
                        this.divFatherCompany = false;
                        this.disFatherCompany = true;
                        if (this.ddlStudentPayer === 'Father Company') {
                            this.ddlStudentPayer = '';
                        }
                    }
                } else if (value === 'Mother') {
                    if (this.ddlMotherWorking === 'Yes') {
                        this.divMotherCompany = true;
                        this.disMotherCompany = false;
                    } else {
                        this.divMotherCompany = false;
                        this.disMotherCompany = true;
                        if (this.ddlStudentPayer === 'Mother Company') {
                            this.ddlStudentPayer = '';
                        }
                    }
                }
            },
            addMedicationAllergiesList() {
                if (this.inputStudentMedicationAllergiesMedication !== '' && this.inputStudentMedicationAllergiesRemarks !== '') {
                    let addNewRowList = {
                        StAllItem: this.inputStudentMedicationAllergiesMedication,
                        StAllRemarks: this.inputStudentMedicationAllergiesRemarks,
                    };

                    this.medicationAllergiesListInt.push(addNewRowList);

                    this.inputStudentMedicationAllergiesMedication = '';
                    this.inputStudentMedicationAllergiesRemarks = '';
                } else {
                    alert('Please fill Medication and Remarks');
                }
            },
            addFoodAllergiesList() {
                if (this.ddlStudentFoodAllergiesFood !== '' && this.inputStudentFoodAllergiesRemarks !== '') {
                    let addNewRowList = {
                        StAllItem: this.ddlStudentFoodAllergiesFood,
                        StAllRemarks: this.inputStudentFoodAllergiesRemarks,
                    };

                    this.foodAllergiesListInt.push(addNewRowList);

                    this.ddlStudentFoodAllergiesFood = '';
                    this.inputStudentFoodAllergiesRemarks = '';
                } else {
                    alert('Please fill Food and Remarks');
                }
            },
            async checkSchoolIsLocalOrInt() {
                try {
                    const response = await DataSource.shared.getSchoolInfoBySchoolID(Cookies.get('schoolSession'));
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            console.log('no school found in getSchoolInfoBySchoolID');
                        } else {
                            if (response.Table[0].SCH_SchoolType === 'International') {
                                this.isIntSchool = true;
                            } else if (response.Table[0].SCH_SchoolType === 'International Pre-School') {
                                this.isIntPreSchool = true;
                            } else {
                                this.isLocalSchool = true;
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            checkStudentAge() {
                if (this.inputStudentDateOfBirth === '' || this.inputStudentDateOfBirth === null) {
                    this.disableIC = true;
                    this.inputStudentIC = '';
                } else {
                    //convert dd/mm/yyyy to mm/dd/yyyy for convert into new date to calculate age
                    let splittedDate = this.inputStudentDateOfBirth.split('/');
                    let bDay = [splittedDate[1], splittedDate[0], splittedDate[2]].join('/');

                    //calculate age
                    let today = new Date();
                    let birthDate = new Date(bDay);
                    let age = today.getFullYear() - birthDate.getFullYear();
                    let m = today.getMonth() - birthDate.getMonth();
                    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                        age--;
                    }

                    if (age >= 16) {
                        this.disableIC = false;
                    } else {
                        this.disableIC = true;
                        this.inputStudentIC = '';
                    }
                }
            },
            EnrolledinOtherCenterShow() {
                if (this.ddlStudentEnrolledinOtherCenter === 'No') {
                    this.divEnrolledinOtherCenterShow = false;
                    this.inputStudentEnrolledCenterName = '';
                    this.ddlStudentEnrolledCenterType = '';
                } else {
                    this.divEnrolledinOtherCenterShow = true;
                }
            },
        },
    };
</script>

<style scoped>

    .studentPageBTabs {
        position: relative;
    }

    .alert-badge {
        background: red;
        width: 14px;
        height: 14px;
        text-align: center;
        display: block;
        border-radius: 50%;
        font-weight: bold;
        color: #fff;
        position: absolute;
        top: 3px;
        line-height: 1.2;
        font-size: 12px;
    }

    .alert-badge2 {
        background: red;
        border-radius: 50%;
        font-weight: bold;
        color: #fff;
        padding: 5px 10px;
    }

    .badge1 {
        left: 83px;
    }

    .badge2 {
        left: 185px;
    }

    .badge4 {
        left: 503px;
    }

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

    .buttonArea {
        margin: 20px 0 0 0;
    }

    .buttonArea .btn-primary {
        margin: 0 0 0 20px;
    }

    .btn-primary {
        display: inline;
    }

    .modeArea {
        text-align: left;
    }

    .textArea {
        width: 100%;
        resize: none;
    }

    ::-webkit-scrollbar-track {
        background-color: whitesmoke;
    }

    .lblSearchFamily {
        width: 100%;
    }

    .siblingNoRecordArea {
        padding: 20px;
    }

    .changeStatusArea {
        /*background-color: white;*/
        text-align: left;
        padding: 0px;
    }

    .ddlChangeStatusTo, .lblChangeStatusTo, .btnChangeStatus, .btnWithdraw, .btnTransfer, .btnUploadDocument, .btnImmunizationRecords, .btnAllAboutMe {
        width: auto;
        display: inline !important;
        margin: -11px 0 -5px;
    }

    .imgStudentProfile:hover {
        cursor: pointer;
    }

    .imgStudentProfile {
        display: flex;
        width: 200px;
        height: 200px;
        border-radius: 100%;
        background-color: #ffffff;
        margin-top: 16px;
        overflow: hidden;
        position: relative;
        flex-wrap: nowrap;
        align-items: center;
        cursor: pointer;
    }

    .profilePictureArea {
        text-align: left;
        position: relative;
    }

    .familyIDAreaDiv button {
        margin-bottom: 20px;
    }

    .profile_wrap span {
        font-size: 20px;
        margin-left: auto;
        letter-spacing: 7px;
        text-transform: uppercase;
    }

    .profile_wrap {
        display: flex;
        align-items: center;
        position: relative;
    }

    .profilePictureArea:before {
        content: "";
        background: white;
        display: block;
        height: 69%;
        position: absolute;
        width: 100%;
        top: -10px;
    }

    .fa-clone {
        font-size: 30px;
        border-radius: 40%;
        padding: 10px;
        background-color: #4CAF50;
        cursor: pointer;
    }

    .fa-clone:hover {
        background-color: #5fb962;
    }

    .ttStuCorAddCopy {
        text-align: left;
    }

    .ttStuCorAddCopy .ttnStuCorAddCopy {
        visibility: hidden;
        width: auto;
        background-color: #555;
        color: #fff;
        text-align: center;
        border-radius: 5px;
        padding: 5px;

        /* Position the tooltip */
        position: absolute;
        z-index: 1;
    }

    .ttStuCorAddCopy:hover .ttnStuCorAddCopy {
        visibility: visible;
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