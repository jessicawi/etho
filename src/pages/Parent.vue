<template>
    <div id="parent">
        <div class="datatable-edit__header">
            <div class="container">
                <h3>Parent Details</h3>
                <a href="ParentList.vue">Parent List</a> > Edit
            </div>
        </div>
        <div class="mt-3 container  pt-5">
            <label style="display:none !important;">{{lblParentID}}</label>

            <el-tabs v-model="activeTab" class="parentPageBTabs" stretch @tab-click="activeTabHappen">
                <!--<span class="alert-badge badge1"-->
                      <!--v-if="$v.inputFatherDateofBirth.$error || $v.inputFatherFirstName.$error || $v.inputFatherLastName.$error">-->
                    <!--!-->
                <!--</span>-->
                <!--<span class="alert-badge badge2"-->
                      <!--v-if="$v.inputMotherDateofBirth.$error || $v.inputMotherFirstName.$error || $v.inputMotherLastName.$error">-->
                    <!--!-->
                <!--</span>-->

                <!--<span class="alert-badge badge1"-->
                      <!--v-if="$v.inputFatherFirstName.$error || $v.inputFatherLastName.$error || $v.inputFatherEmail.$error || $v.inputFatherCompanyEmail.$error">-->
                    <!--!-->
                <!--</span>-->
                <!--<span class="alert-badge badge2"-->
                      <!--v-if="$v.inputMotherFirstName.$error || $v.inputMotherLastName.$error || $v.inputMotherEmail.$error || $v.inputMotherCompanyEmail.$error">-->
                    <!--!-->
                <!--</span>-->
                <!--<span class="alert-badge badge3"-->
                      <!--v-if="$v.inputGuardianEmail.$error || $v.inputGuardianCompanyEmail.$error">-->
                    <!--!-->
                <!--</span>-->
                <!--<span class="alert-badge badge4"-->
                      <!--v-if="$v.inputThirdPartyCompanyEmail.$error">-->
                    <!--!-->
                <!--</span>-->

                <el-tab-pane name="Father">
                    <span slot="label">
                        <span v-if="!$v.inputFatherFirstName.$error && !$v.inputFatherLastName.$error && !$v.inputFatherEmail.$error && !$v.inputFatherCompanyEmail.$error">Father</span>

                        <el-badge value="!" class="item"
                                  v-if="$v.inputFatherFirstName.$error || $v.inputFatherLastName.$error || $v.inputFatherEmail.$error || $v.inputFatherCompanyEmail.$error">
                            Father</el-badge>
                    </span>
                    <div class="">
                        <div class="fatherAreaDiv">
                            <div class="">
                                <h5 class="text-left student-form__title">Father's Personal Information</h5>
                            </div>
                            <div class="row form-group__wrapper">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>* First Name</label>
                                    <input type="text" class="form-control" ref="inputFatherFirstName"
                                           v-model="inputFatherFirstName"
                                           :class="{ 'requiredFields': $v.inputFatherFirstName.$error }">
                                    <div class="requiredFieldsMsg" v-if="$v.inputFatherFirstName.$error">First Name
                                        Require
                                    </div>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Middle Name</label>
                                    <input type="text" class="form-control" ref="inputFatherMiddleName">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>* Last Name</label>
                                    <input type="text" class="form-control" ref="inputFatherLastName"
                                           v-model="inputFatherLastName"
                                           :class="{ 'requiredFields': $v.inputFatherLastName.$error }">
                                    <div class="requiredFieldsMsg" v-if="$v.inputFatherLastName.$error">Last Name
                                        Require
                                    </div>
                                </div>

                                <!--<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">-->
                                    <!--<label>* Date of Birth</label>-->
                                    <!--<div class="date">-->
                                        <!--<el-date-picker v-model="inputFatherDateofBirth" format="dd/MM/yyyy"-->
                                                        <!--value-format="dd/MM/yyyy" type="date" placeholder="Pick a date"-->
                                                        <!--:class="{ 'requiredFields': $v.inputFatherDateofBirth.$error }"></el-date-picker>-->
                                    <!--</div>-->
                                    <!--<div class="requiredFieldsMsg" v-if="$v.inputFatherDateofBirth.$error">Date of Birth-->
                                        <!--Require-->
                                    <!--</div>-->
                                <!--</div>-->

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Employment Status</label>
                                    <select v-model="ddlFatherEmploymentStatus"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in ddlFatherEmploymentStatusList"
                                                v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Occupation</label>
                                    <input type="text" class="form-control" ref="inputFatherOccupation">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Designation</label>
                                    <input type="text" class="form-control" ref="inputFatherDesignation">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Home Tel No</label>
                                    <input type="text" class="form-control" ref="inputFatherHomeTelNo">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Office Tel No</label>
                                    <input type="text" class="form-control" ref="inputFatherOfficeTelNo">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Fax</label>
                                    <input type="text" class="form-control" ref="inputFatherFax">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Mobile No</label>
                                    <input type="text" class="form-control" ref="inputFatherMobileNo">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Email</label>
                                    <input type="text" class="form-control" v-model="inputFatherEmail">
                                    <div class="requiredFieldsMsg" v-if="$v.inputFatherEmail.$error">
                                        Invalid Email Address
                                    </div>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Nationality</label>
                                    <select ref="ddlFatherNationality"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in countryList" v-bind:value="item.CNYnationality.trim()">{{
                                            item.CNYname.trim() }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Religion</label>
                                    <select v-model="ddlFatherReligion"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in ddlFatherReligionList"
                                                v-bind:value="item.OPTvalue.trim()">{{
                                            item.OPTvalue.trim() }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Remarks</label>
                                    <input type="text" class="form-control" ref="inputFatherRemarks">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Identification Type</label>
                                    <select v-model="ddlFatherIdentificationType"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in ddlFatherIdentificationTypeList"
                                                v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Identification No</label>
                                    <input type="text" class="form-control" ref="inputFatherIdentificationNo">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Identification No Expiry Date</label>
                                    <div class="date">
                                        <el-date-picker v-model="inputFatherIdentificationNoExpiryDate"
                                                        format="dd/MM/yyyy"
                                                        value-format="dd/MM/yyyy" type="date"
                                                        placeholder="Pick a date"></el-date-picker>
                                    </div>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Race</label>
                                    <select v-model="ddlFatherRace"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in ddlRaceList"
                                                v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Marital Status</label>
                                    <select v-model="ddlFatherMaritalStatus"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in ddlMaritalStatusList"
                                                v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Working</label>
                                    <select class="form-control pro-edt-select form-control-primary"
                                            v-model="ddlFatherWorking">
                                        <option>No</option>
                                        <option>Yes</option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 checkbox_wrapper">
                                    <label>
                                        <input type="checkbox" class="form-control" ref="cbFatherEtonStaff" @input="isStaffOnChange()">
                                        Eton Staff
                                        <span>
                                        <span>
                                            <svg class="checkmark" viewBox="0 0 24 24"><path class="checkmark-path"
                                                                                             fill="none" stroke="white"
                                                                                             d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg>
                                        </span>
                                    </span>
                                    </label>
                                </div>

                                <div v-if="isStaffFather" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Employee Name</label>
                                    <select v-model="ddlFatherEmployeeName"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in staffList" v-bind:value="item.CONid.trim()">
                                            {{ item.CONname.trim() }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="fatherAreaDiv">
                            <div class="">
                                <h5 class="text-left student-form__title">Father's Local Residential Address</h5>
                            </div>
                            <div class="row form-group__wrapper">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Address 1</label>
                                    <input type="text" class="form-control" ref="inputFatherAddress1">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Address 2</label>
                                    <input type="text" class="form-control" ref="inputFatherAddress2">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Address 3</label>
                                    <input type="text" class="form-control" ref="inputFatherAddress3">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>City</label>
                                    <input type="text" class="form-control" ref="inputFatherCity">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Country</label>
                                    <select ref="ddlFatherCountry"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in countryList" v-bind:value="item.CNYname.trim()">{{
                                            item.CNYname.trim() }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Postal Code</label>
                                    <input type="text" class="form-control" ref="inputFatherPostalCode">
                                </div>
                            </div>
                        </div>

                        <div class="fatherAreaDiv">
                            <div class="">
                                <h5 class="text-left student-form__title">Father's Company Address</h5>
                            </div>
                            <div class="row form-group__wrapper">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Company Name</label>
                                    <input type="text" class="form-control" ref="inputFatherCompanyName">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Company Addressee Name</label>
                                    <input type="text" class="form-control" ref="inputFatherCompanyAddresseeName">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Company Address 1</label>
                                    <input type="text" class="form-control" ref="inputFatherCompanyAddress1">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Company Address 2</label>
                                    <input type="text" class="form-control" ref="inputFatherCompanyAddress2">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Company Address 3</label>
                                    <input type="text" class="form-control" ref="inputFatherCompanyAddress3">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Company City</label>
                                    <input type="text" class="form-control" ref="inputFatherCompanyCity">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Company Country</label>
                                    <select ref="ddlFatherCompanyCountry"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in countryList" v-bind:value="item.CNYname.trim()">
                                            {{item.CNYname.trim() }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Company Postal Code</label>
                                    <input type="text" class="form-control" ref="inputFatherCompanyPostalCode">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Company Email</label>
                                    <input type="text" class="form-control" v-model="inputFatherCompanyEmail">
                                    <div class="requiredFieldsMsg" v-if="$v.inputFatherCompanyEmail.$error">
                                        Invalid Email Address
                                    </div>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Working Commencement Date</label>
                                    <div class="date">
                                        <el-date-picker v-model="inputFatherWorkingCommencementDate"
                                                        format="dd/MM/yyyy"
                                                        value-format="dd/MM/yyyy" type="date"
                                                        placeholder="Pick a day"></el-date-picker>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane name="Mother">
                    <span slot="label">
                        <span v-if="!$v.inputMotherFirstName.$error && !$v.inputMotherLastName.$error && !$v.inputMotherEmail.$error && !$v.inputMotherCompanyEmail.$error">Mother</span>

                        <el-badge value="!" class="item"
                                  v-if="$v.inputMotherFirstName.$error || $v.inputMotherLastName.$error || $v.inputMotherEmail.$error || $v.inputMotherCompanyEmail.$error">
                            Mother</el-badge>
                    </span>
                    <div class="">
                        <div class="motherAreaDiv">
                            <div class="">
                                <h5 class="text-left student-form__title">Mother's Personal Information</h5>
                            </div>
                            <div class="row form-group__wrapper">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>* First Name</label>
                                    <input type="text" class="form-control" ref="inputMotherFirstName"
                                           v-model="inputMotherFirstName"
                                           :class="{ 'requiredFields': $v.inputMotherFirstName.$error }">
                                    <div class="requiredFieldsMsg" v-if="$v.inputMotherFirstName.$error">First Name
                                        Require
                                    </div>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Middle Name</label>
                                    <input type="text" class="form-control" ref="inputMotherMiddleName">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>* Last Name</label>
                                    <input type="text" class="form-control" ref="inputMotherLastName"
                                           v-model="inputMotherLastName"
                                           :class="{ 'requiredFields': $v.inputMotherLastName.$error }">
                                    <div class="requiredFieldsMsg" v-if="$v.inputMotherLastName.$error">Last Name
                                        Require
                                    </div>
                                </div>

                                <!--<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">-->
                                    <!--<label>* Date of Birth</label>-->
                                    <!--<div class="date">-->
                                        <!--<el-date-picker v-model="inputMotherDateofBirth" format="dd/MM/yyyy"-->
                                                        <!--value-format="dd/MM/yyyy" type="date" placeholder="Pick a date"-->
                                                        <!--:class="{ 'requiredFields': $v.inputMotherDateofBirth.$error }"></el-date-picker>-->
                                    <!--</div>-->
                                    <!--<div class="requiredFieldsMsg" v-if="$v.inputMotherDateofBirth.$error">Date of Birth-->
                                        <!--Require-->
                                    <!--</div>-->
                                <!--</div>-->

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Employment Status</label>
                                    <select v-model="ddlMotherEmploymentStatus"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in ddlMotherEmploymentStatusList"
                                                v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Occupation</label>
                                    <input type="text" class="form-control" ref="inputMotherOccupation">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Designation</label>
                                    <input type="text" class="form-control" ref="inputMotherDesignation">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Home Tel No</label>
                                    <input type="text" class="form-control" ref="inputMotherHomeTelNo">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Office Tel No</label>
                                    <input type="text" class="form-control" ref="inputMotherOfficeTelNo">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Fax</label>
                                    <input type="text" class="form-control" ref="inputMotherFax">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Mobile No</label>
                                    <input type="text" class="form-control" ref="inputMotherMobileNo">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Email</label>
                                    <input type="text" class="form-control" v-model="inputMotherEmail">
                                    <div class="requiredFieldsMsg" v-if="$v.inputMotherEmail.$error">
                                        Invalid Email Address
                                    </div>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Nationality</label>
                                    <select ref="ddlMotherNationality"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in countryList" v-bind:value="item.CNYnationality.trim()">{{
                                            item.CNYname.trim() }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Religion</label>
                                    <select v-model="ddlMotherReligion"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in ddlMotherReligionList"
                                                v-bind:value="item.OPTvalue.trim()">{{
                                            item.OPTvalue.trim() }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Remarks</label>
                                    <input type="text" class="form-control" ref="inputMotherRemarks">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Identification Type</label>
                                    <select v-model="ddlMotherIdentificationType"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in ddlMotherIdentificationTypeList"
                                                v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Identification No</label>
                                    <input type="text" class="form-control" ref="inputMotherIdentificationNo">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Identification No Expiry Date</label>
                                    <div class="date">
                                        <el-date-picker v-model="inputMotherIdentificationNoExpiryDate"
                                                        format="dd/MM/yyyy"
                                                        value-format="dd/MM/yyyy" type="date"
                                                        placeholder="Pick a date"></el-date-picker>
                                    </div>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Race</label>
                                    <select v-model="ddlMotherRace"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in ddlRaceList"
                                                v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Marital Status</label>
                                    <select v-model="ddlMotherMaritalStatus"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in ddlMaritalStatusList"
                                                v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Working</label>
                                    <select class="form-control pro-edt-select form-control-primary"
                                            v-model="ddlMotherWorking">
                                        <option>No</option>
                                        <option>Yes</option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 checkbox_wrapper">
                                    <label>
                                        <input type="checkbox" class="form-control" ref="cbMotherEtonStaff" @input="isStaffOnChange()">
                                        Eton Staff
                                        <span>
                                        <span>
                                            <svg class="checkmark" viewBox="0 0 24 24"><path class="checkmark-path"
                                                                                             fill="none" stroke="white"
                                                                                             d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg>
                                        </span>
                                    </span>
                                    </label>
                                </div>

                                <div v-if="isStaffMother" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Employee Name</label>
                                    <select v-model="ddlMotherEmployeeName"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in staffList" v-bind:value="item.CONid.trim()">
                                            {{ item.CONname.trim() }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="motherAreaDiv">
                            <div class="">
                                <h5 class="text-left student-form__title">Mother's Local Residential Address</h5>
                            </div>
                            <div class="row form-group__wrapper">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Address 1</label>
                                    <input type="text" class="form-control" ref="inputMotherAddress1">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Address 2</label>
                                    <input type="text" class="form-control" ref="inputMotherAddress2">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Address 3</label>
                                    <input type="text" class="form-control" ref="inputMotherAddress3">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>City</label>
                                    <input type="text" class="form-control" ref="inputMotherCity">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Country</label>
                                    <select ref="ddlMotherCountry"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in countryList" v-bind:value="item.CNYname.trim()">{{
                                            item.CNYname.trim() }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Postal Code</label>
                                    <input type="text" class="form-control" ref="inputMotherPostalCode">
                                </div>
                            </div>
                        </div>

                        <div class="motherAreaDiv">
                            <div class="">
                                <h5 class="text-left student-form__title">Mother's Company Address</h5>
                            </div>
                            <div class="row form-group__wrapper">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Company Name</label>
                                    <input type="text" class="form-control" ref="inputMotherCompanyName">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Company Addressee Name</label>
                                    <input type="text" class="form-control" ref="inputMotherCompanyAddresseeName">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Company Address 1</label>
                                    <input type="text" class="form-control" ref="inputMotherCompanyAddress1">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Company Address 2</label>
                                    <input type="text" class="form-control" ref="inputMotherCompanyAddress2">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Company Address 3</label>
                                    <input type="text" class="form-control" ref="inputMotherCompanyAddress3">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Company City</label>
                                    <input type="text" class="form-control" ref="inputMotherCompanyCity">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Company Country</label>
                                    <select ref="ddlMotherCompanyCountry"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in countryList" v-bind:value="item.CNYname.trim()">{{
                                            item.CNYname.trim() }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Company Postal Code</label>
                                    <input type="text" class="form-control" ref="inputMotherCompanyPostalCode">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Company Email</label>
                                    <input type="text" class="form-control" v-model="inputMotherCompanyEmail">
                                    <div class="requiredFieldsMsg" v-if="$v.inputMotherCompanyEmail.$error">
                                        Invalid Email Address
                                    </div>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Working Commencement Date</label>
                                    <div class="date">
                                        <el-date-picker v-model="inputMotherWorkingCommencementDate"
                                                        format="dd/MM/yyyy"
                                                        value-format="dd/MM/yyyy" type="date"
                                                        placeholder="Pick a day"></el-date-picker>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane name="Guardian" label="Guardian">
                    <span slot="label">
                        <span v-if="!$v.inputGuardianEmail.$error && !$v.inputGuardianCompanyEmail.$error">Guardian</span>

                        <el-badge value="!" class="item"
                                  v-if="$v.inputGuardianEmail.$error || $v.inputGuardianCompanyEmail.$error">
                            Guardian</el-badge>
                    </span>
                    <div class="">
                        <div class="guardianAreaDiv">
                            <div class="">
                                <h5 class="text-left student-form__title">Guardian's Personal Information</h5>
                            </div>
                            <div class="row form-group__wrapper">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>First Name</label>
                                    <input type="text" class="form-control" ref="inputGuardianFirstName">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Middle Name</label>
                                    <input type="text" class="form-control" ref="inputGuardianMiddleName">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Last Name</label>
                                    <input type="text" class="form-control" ref="inputGuardianLastName">
                                </div>

                                <!--<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">-->
                                    <!--<label>Date of Birth</label>-->
                                    <!--<div class="date">-->
                                        <!--<el-date-picker v-model="inputGuardianDateofBirth" format="dd/MM/yyyy"-->
                                                        <!--value-format="dd/MM/yyyy" type="date"-->
                                                        <!--placeholder="Pick a date"></el-date-picker>-->
                                    <!--</div>-->
                                <!--</div>-->

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Employment Status</label>
                                    <select v-model="ddlGuardianEmploymentStatus"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in ddlGuardianEmploymentStatusList"
                                                v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Occupation</label>
                                    <input type="text" class="form-control" ref="inputGuardianOccupation">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Designation</label>
                                    <input type="text" class="form-control" ref="inputGuardianDesignation">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Home Tel No</label>
                                    <input type="text" class="form-control" ref="inputGuardianHomeTelNo">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Office Tel No</label>
                                    <input type="text" class="form-control" ref="inputGuardianOfficeTelNo">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Fax</label>
                                    <input type="text" class="form-control" ref="inputGuardianFax">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Mobile No</label>
                                    <input type="text" class="form-control" ref="inputGuardianMobileNo">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Email</label>
                                    <input type="text" class="form-control" v-model="inputGuardianEmail">
                                    <div class="requiredFieldsMsg" v-if="$v.inputGuardianEmail.$error">
                                        Invalid Email Address
                                    </div>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Nationality</label>
                                    <select ref="ddlGuardianNationality"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in countryList" v-bind:value="item.CNYnationality.trim()">{{
                                            item.CNYname.trim() }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Religion</label>
                                    <select v-model="ddlGuardianReligion"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in ddlGuardianReligionList"
                                                v-bind:value="item.OPTvalue.trim()">
                                            {{
                                            item.OPTvalue.trim() }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Remarks</label>
                                    <input type="text" class="form-control" ref="inputGuardianRemarks">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Identification Type</label>
                                    <select v-model="ddlGuardianIdentificationType"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in ddlGuardianIdentificationTypeList"
                                                v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Identification No</label>
                                    <input type="text" class="form-control" ref="inputGuardianIdentificationNo">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Race</label>
                                    <select v-model="ddlGuardianRace"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in ddlRaceList"
                                                v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Marital Status</label>
                                    <select v-model="ddlGuardianMaritalStatus"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in ddlMaritalStatusList"
                                                v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Working</label>
                                    <select class="form-control pro-edt-select form-control-primary"
                                            v-model="ddlGuardianWorking">
                                        <option>No</option>
                                        <option>Yes</option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 checkbox_wrapper">
                                    <label>
                                        <input type="checkbox" class="form-control" ref="cbGuardianEtonStaff" @input="isStaffOnChange()">
                                        Eton Staff
                                        <span>
                                        <span>
                                            <svg class="checkmark" viewBox="0 0 24 24"><path class="checkmark-path"
                                                                                             fill="none" stroke="white"
                                                                                             d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg>
                                        </span>
                                    </span>
                                    </label>
                                </div>

                                <div v-if="isStaffGuardian" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Employee Name</label>
                                    <select v-model="ddlGuardianEmployeeName"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in staffList" v-bind:value="item.CONid.trim()">
                                            {{ item.CONname.trim() }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="guardianAreaDiv">
                            <div class="">
                                <h5 class="text-left student-form__title">Guardian's Local Residential Address</h5>
                            </div>
                            <div class="row form-group__wrapper">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Address 1</label>
                                    <input type="text" class="form-control" ref="inputGuardianAddress1">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Address 2</label>
                                    <input type="text" class="form-control" ref="inputGuardianAddress2">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Address 3</label>
                                    <input type="text" class="form-control" ref="inputGuardianAddress3">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>City</label>
                                    <input type="text" class="form-control" ref="inputGuardianCity">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Country</label>
                                    <select ref="ddlGuardianCountry"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in countryList" v-bind:value="item.CNYname.trim()">{{
                                            item.CNYname.trim() }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Postal Code</label>
                                    <input type="text" class="form-control" ref="inputGuardianPostalCode">
                                </div>
                            </div>
                        </div>

                        <div class="guardianAreaDiv">
                            <div class="">
                                <h5 class="text-left student-form__title">Guardian's Company Address</h5>
                            </div>
                            <div class="row form-group__wrapper">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Company Name</label>
                                    <input type="text" class="form-control" ref="inputGuardianCompanyName">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Company Addressee Name</label>
                                    <input type="text" class="form-control" ref="inputGuardianCompanyAddresseeName">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Company Address 1</label>
                                    <input type="text" class="form-control" ref="inputGuardianCompanyAddress1">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Company Address 2</label>
                                    <input type="text" class="form-control" ref="inputGuardianCompanyAddress2">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Company Address 3</label>
                                    <input type="text" class="form-control" ref="inputGuardianCompanyAddress3">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Company City</label>
                                    <input type="text" class="form-control" ref="inputGuardianCompanyCity">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Company Country</label>
                                    <select ref="ddlGuardianCompanyCountry"
                                            class="form-control pro-edt-select form-control-primary">
                                        <option v-for="item in countryList" v-bind:value="item.CNYname.trim()">{{
                                            item.CNYname.trim() }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Company Postal Code</label>
                                    <input type="text" class="form-control" ref="inputGuardianCompanyPostalCode">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Company Email</label>
                                    <input type="text" class="form-control" v-model="inputGuardianCompanyEmail">
                                    <div class="requiredFieldsMsg" v-if="$v.inputGuardianCompanyEmail.$error">
                                        Invalid Email Address
                                    </div>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Working Commencement Date</label>
                                    <div class="date">
                                        <el-date-picker v-model="inputGuardianWorkingCommencementDate"
                                                        format="dd/MM/yyyy"
                                                        value-format="dd/MM/yyyy" type="date"
                                                        placeholder="Pick a day"></el-date-picker>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane name="Third Party">
                    <span slot="label">
                        <span v-if="!$v.inputThirdPartyCompanyEmail.$error">Third Party</span>

                        <el-badge value="!" class="item"
                                  v-if="$v.inputThirdPartyCompanyEmail.$error">
                            Third Party</el-badge>
                    </span>
                    <div class="">
                        <div class="thirdpartyAreaDiv">
                            <div class="">
                                <h5 class="text-left student-form__title">Third Party's Details</h5>
                            </div>
                            <div class="row form-group__wrapper">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Company Name</label>
                                    <input type="text" class="form-control" ref="inputThirdPartyCompanyName">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Addressee Name</label>
                                    <input type="text" class="form-control" ref="inputThirdPartyAddresseeName">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Address 1</label>
                                    <input type="text" class="form-control" ref="inputThirdPartyAddress1">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Address 2</label>
                                    <input type="text" class="form-control" ref="inputThirdPartyAddress2">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Address 3</label>
                                    <input type="text" class="form-control" ref="inputThirdPartyAddress3">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>City</label>
                                    <input type="text" class="form-control" ref="inputThirdPartyCity">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Country</label>
                                    <input type="text" class="form-control" ref="inputThirdPartyCountry">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Postal Code</label>
                                    <input type="text" class="form-control" ref="inputThirdPartyPostalCode">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Company Email</label>
                                    <input type="text" class="form-control" v-model="inputThirdPartyCompanyEmail">
                                    <div class="requiredFieldsMsg" v-if="$v.inputThirdPartyCompanyEmail.$error">
                                        Invalid Email Address
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane name="Other" label="Other">
                    <div class="">
                        <div class="otherAreaDiv">
                            <div class="">
                                <h5 class="text-left student-form__title">Other Details</h5>
                            </div>
                            <div class="form-group__wrapper row">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 checkbox_wrapper">
                                    <label>
                                        <input type="checkbox" class="form-control" ref="cbFatherShareMyEmail">
                                        Share My Email
                                        <span>
                                        <span>
                                            <svg class="checkmark" viewBox="0 0 24 24"><path class="checkmark-path"
                                                                                             fill="none" stroke="white"
                                                                                             d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg>
                                        </span>
                                    </span>
                                    </label>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 checkbox_wrapper">
                                    <label>
                                        <input type="checkbox" class="form-control" ref="cbFatherShareMyMobileNumber">
                                        Share My Mobile Number
                                        <span>
                                        <span>
                                            <svg class="checkmark" viewBox="0 0 24 24"><path class="checkmark-path"
                                                                                             fill="none" stroke="white"
                                                                                             d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg>
                                        </span>
                                    </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane name="Children" label="Children">
                    <div class="">
                        <div class="childrenAreaDiv">
                            <div class="">
                                <h5 class="text-left student-form__title">Children List</h5>
                            </div>
                            <div class="form-group__wrapper row">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="empty-list_image" v-if="childrenListInt.length<1">
                                        <strong>No Data Found...</strong>
                                        <img src="../assets/notfound.png"/>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <data-tables :data="childrenListInt" v-if="childrenListInt.length>0">
                                        <el-table-column v-for="childrenListInfo in childrenList"
                                                         :prop="childrenListInfo.prop"
                                                         :label="childrenListInfo.label"
                                                         :key="childrenListInfo.prop"
                                                         sortable="custom">
                                        </el-table-column>

                                        <el-table-column label="Edit">
                                            <template slot-scope="scope">
                                                <el-button type="primary"
                                                           icon="el-icon-edit"
                                                           :disabled="checkSiblingEditButton(childrenListInt[scope.$index].School_ID) !== true"
                                                           @click.native.prevent="editSibling(childrenListInt[scope.$index].School_ID, childrenListInt[scope.$index].Student_ID)">
                                                    Edit
                                                </el-button>
                                            </template>
                                        </el-table-column>

                                        <el-table-column label="Edit">
                                            <template slot-scope="scope">
                                                <el-button type="primary"
                                                           icon="el-icon-edit"
                                                           :disabled="checkSiblingReActivate(childrenListInt[scope.$index].Status) !== true"
                                                           @click.native.prevent="OpenReActivateModal(childrenListInt[scope.$index].Student_ID)">
                                                    Re-Active
                                                </el-button>
                                            </template>
                                        </el-table-column>
                                    </data-tables>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>

            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div class="text-center mg-b-pro-edt custom-pro-edt-ds">
                        <button v-on:click="backToPrevious" type="button"
                                class="btn btn-primary waves-effect waves-light m-r-10 float-left">Cancel
                        </button>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div class="text-center mg-b-pro-edt custom-pro-edt-ds">
                        <button v-on:click="Validation" type="button"
                                class="btn btn-primary waves-effect waves-light m-r-10">Save
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="whitespace-30"></div>

        <b-modal id="reActivateModal" size="lg" title="Re-Activate" ok-only ok-variant="secondary" ok-title="Cancel"
                 ref="reActivateShowModal" hide-footer>
            <div class="row ">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label>Date of Commencement</label>
                    <div class="date">
                        <el-date-picker v-model="inputReActivateDateOfCommencement" format="dd/MM/yyyy"
                                        value-format="dd/MM/yyyy" type="date" placeholder="Pick a date"></el-date-picker>
                    </div>
                </div>
                <hr class="custom-hr"/>
                <div class="col-lg-12">
                    <button v-on:click="openReActivateConfirmModal()" class="btn btn-primary waves-effect waves-light m-r-10">
                        Re-Activate
                    </button>
                </div>
            </div>
        </b-modal>
        <b-modal id="reActivateConfirmModal" size="sm" title="Confirm Re-Active" ok-only ok-variant="secondary" ok-title="Cancel"
                 ref="reActivateConfirmShowModal" hide-footer>
            <div class="row">
                <div class="col-lg-12">
                    Confirm ?
                </div>
                <div class="col-lg-12">
                    <button v-on:click="reActive()" class="btn btn-primary waves-effect waves-light m-r-10">
                        Confirm
                    </button>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";
    import {required, requiredIf, requiredUnless, email} from "vuelidate/lib/validators";
    import Vue from 'vue';
    import Cookies from "js-cookie";

    export default {
        name: "Parent",
        data() {
            return {
                countryList: [],
                ddlFatherReligionList: [],
                ddlMotherReligionList: [],
                ddlGuardianReligionList: [],
                ddlFatherIdentificationTypeList: [],
                ddlMotherIdentificationTypeList: [],
                ddlGuardianIdentificationTypeList: [],
                ddlFatherEmploymentStatusList: [],
                ddlMotherEmploymentStatusList: [],
                ddlGuardianEmploymentStatusList: [],
                ddlMaritalStatusList: [],
                ddlRaceList: [],
                staffList: [],

                activeTab: 'Father',
                inputFatherFirstName: '',
                inputFatherLastName: '',
                inputMotherFirstName: '',
                inputMotherLastName: '',
                // inputFatherDateofBirth: '',
                inputFatherIdentificationNoExpiryDate: '',
                // inputMotherDateofBirth: '',
                inputMotherIdentificationNoExpiryDate: '',
                // inputGuardianDateofBirth: '',
                ddlFatherReligion: '',
                ddlMotherReligion: '',
                ddlGuardianReligion: '',
                ddlFatherIdentificationType: '',
                ddlMotherIdentificationType: '',
                ddlGuardianIdentificationType: '',
                ddlFatherEmploymentStatus: '',
                ddlMotherEmploymentStatus: '',
                ddlGuardianEmploymentStatus: '',
                ddlFatherRace: '',
                ddlFatherMaritalStatus: '',
                ddlFatherWorking: '',
                ddlMotherRace: '',
                ddlMotherMaritalStatus: '',
                ddlMotherWorking : '',
                ddlGuardianRace: '',
                ddlGuardianMaritalStatus: '',
                ddlGuardianWorking: '',
                lblParentID: '',
                inputFatherWorkingCommencementDate: '',
                inputMotherWorkingCommencementDate: '',
                inputGuardianWorkingCommencementDate: '',
                ddlFatherEmployeeName: '',
                ddlMotherEmployeeName: '',
                ddlGuardianEmployeeName: '',
                isStaffFather: false,
                isStaffMother: false,
                isStaffGuardian: false,

                inputFatherEmail: '',
                inputFatherCompanyEmail: '',
                inputMotherEmail: '',
                inputMotherCompanyEmail: '',
                inputGuardianEmail: '',
                inputGuardianCompanyEmail: '',
                inputThirdPartyCompanyEmail: '',

                currentStudentID: '',
                inputReActivateDateOfCommencement: '',

                childrenListInt: [],
                childrenList: [{
                    prop: "StudentName",
                    label: "Student Name"
                }, {
                    prop: "Status",
                    label: "Status"
                }, {
                    prop: "SchoolName",
                    label: "School Name"
                }],
            };
        },
        computed: {
            reqFatherEmployeeName() {
                if (this.$refs.cbFatherEtonStaff.checked === true && this.ddlFatherEmployeeName === '') {
                    return true;
                } else {
                    return false;
                }
            },
            reqMotherEmployeeName() {
                if (this.$refs.cbMotherEtonStaff.checked === true && this.ddlMotherEmployeeName === '') {
                    return true;
                } else {
                    return false;
                }
            },
            reqGuardianEmployeeName() {
                if (this.$refs.cbGuardianEtonStaff.checked === true && this.ddlGuardianEmployeeName === '') {
                    return true;
                } else {
                    return false;
                }
            },
        },
        validations: {
            inputFatherFirstName: {required},
            inputFatherLastName: {required},
            // inputFatherDateofBirth: {required},
            inputMotherFirstName: {required},
            inputMotherLastName: {required},
            // inputMotherDateofBirth: {required},

            ddlFatherEmployeeName: {requiredIf: requiredIf('reqFatherEmployeeName')},
            ddlMotherEmployeeName: {requiredIf: requiredIf('reqMotherEmployeeName')},
            ddlGuardianEmployeeName: {requiredIf: requiredIf('reqGuardianEmployeeName')},

            inputFatherEmail: {email},
            inputFatherCompanyEmail: {email},
            inputMotherEmail: {email},
            inputMotherCompanyEmail: {email},
            inputGuardianEmail: {email},
            inputGuardianCompanyEmail: {email},
            inputThirdPartyCompanyEmail: {email},
        },
        async created() {
            await this.BindCountryList();
            await this.BindParentDropdown();
            await this.BindStaffList();
        },
        async mounted() {
            await this.LoadParentInfo();
            await this.getChildren();
        },
        methods: {
            backToPrevious() {
                window.location.replace("/parent-list");
            },
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
            async BindStaffList() {
                try {
                    const response = await DataSource.shared.getAllStaffListBySchool();
                    if (response) {
                        this.getAllStaffListBySchoolResponse = response.Table;
                        this.getAllStaffListBySchoolResponse.forEach(m => {
                            this.staffList.push(m);
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async BindParentDropdown() {
                try {
                    let jsonString = '"Religion":"Religion"';
                    jsonString = jsonString + ',"ParentID":"ParentID"';
                    jsonString = jsonString + ',"EmpStatus":"EmpStatus"';
                    jsonString = jsonString + ',"Parents Martial Status":"Parents Martial Status"';
                    jsonString = jsonString + ',"Race":"Race"';
                    jsonString = "{" + jsonString + "}";

                    const response = await DataSource.shared.getStudentDropDownList(jsonString);
                    if (response) {
                        this.studentDropDownListResponse = response.Table;
                        this.studentDropDownListResponse.forEach(m => {
                            if (m.OGPname.trim() === "Religion") {
                                this.ddlFatherReligionList.push(m);
                                this.ddlMotherReligionList.push(m);
                                this.ddlGuardianReligionList.push(m);
                            } else if (m.OGPname.trim() === 'ParentID') {
                                this.ddlFatherIdentificationTypeList.push(m);
                                this.ddlMotherIdentificationTypeList.push(m);
                                this.ddlGuardianIdentificationTypeList.push(m);
                            } else if (m.OGPname.trim() === 'EmpStatus') {
                                this.ddlFatherEmploymentStatusList.push(m);
                                this.ddlMotherEmploymentStatusList.push(m);
                                this.ddlGuardianEmploymentStatusList.push(m);
                            } else if (m.OGPname.trim() === 'Parents Martial Status') {
                                this.ddlMaritalStatusList.push(m);
                            } else if (m.OGPname.trim() === 'Race') {
                                this.ddlRaceList.push(m);
                            }
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async LoadParentInfo() {
                try {
                    if (this.$route.query.id != null || this.$route.query.id != undefined) {
                        this.lblParentID = this.$route.query.id;

                        const response = await DataSource.shared.getParent(this.$route.query.id, "", "");
                        if (response) {
                            if (response.code == "2") {
                                alert('No record found');
                            } else if (response.code == "99") {
                                alert('Please try again later');
                            } else {
                                this.BindParentFields(response.Table);
                            }
                        }
                    } else {
                        alert('Error! Please search again.');
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async BindParentFields(resultTable) {
                try {
                    resultTable.forEach(m => {
                        //father
                        this.inputFatherFirstName = m.PAR_Father_FirstName;
                        if (m.PAR_Father_MiddleName !== undefined) {
                            this.$refs.inputFatherMiddleName.value = m.PAR_Father_MiddleName;
                        }
                        ;
                        this.inputFatherLastName = m.PAR_Father_LastName;
                        // if (m.PAR_Father_DOB_convert !== '01/01/1901') {
                        //     this.inputFatherDateofBirth = m.PAR_Father_DOB_convert;
                        // }
                        // ;
                        this.ddlFatherEmploymentStatus = m.PAR_Fat_Emp_Status;
                        if (m.PAR_Father_Occupation !== undefined) {
                            this.$refs.inputFatherOccupation.value = m.PAR_Father_Occupation;
                        }
                        ;
                        if (m.PAR_Father_Designation !== undefined) {
                            this.$refs.inputFatherDesignation.value = m.PAR_Father_Designation;
                        }
                        ;
                        if (m.PAR_FatResContact !== undefined) {
                            this.$refs.inputFatherHomeTelNo.value = m.PAR_FatResContact;
                        }
                        ;
                        if (m.PAR_FatOffContact !== undefined) {
                            this.$refs.inputFatherOfficeTelNo.value = m.PAR_FatOffContact;
                        }
                        ;
                        if (m.PAR_Father_Fax !== undefined) {
                            this.$refs.inputFatherFax.value = m.PAR_Father_Fax;
                        }
                        ;
                        if (m.PAR_Father_Phone !== undefined) {
                            this.$refs.inputFatherMobileNo.value = m.PAR_Father_Phone;
                        }
                        ;
                        if (m.PAR_Father_Email !== undefined) {
                            this.inputFatherEmail = m.PAR_Father_Email;
                        }
                        ;
                        if (m.PAR_Fat_Nationality !== undefined) {
                            this.$refs.ddlFatherNationality.value = m.PAR_Fat_Nationality;
                        }
                        ;
                        this.ddlFatherReligion = m.PAR_FatReligion;
                        if (m.PAR_Father_Occupation !== undefined) {
                            this.$refs.inputFatherRemarks.value = m.PAR_FatRemarks;
                        }
                        ;
                        this.ddlFatherIdentificationType = m.PAR_Father_IDType;
                        if (m.PAR_Father_Occupation !== undefined) {
                            this.$refs.inputFatherIdentificationNo.value = m.PAR_Father_UID;
                        }
                        ;
                        if (m.PAR_Father_IDExpDate_convert !== '01/01/1901') {
                            this.inputFatherIdentificationNoExpiryDate = m.PAR_Father_IDExpDate_convert;
                        }
                        ;
                        if (m.PAR_ShareMyContact == 'Yes') {
                            this.$refs.cbFatherShareMyEmail.checked = true;
                        } else {
                            this.$refs.cbFatherShareMyEmail.checked = false;
                        }
                        if (m.PAR_ShareMyMobile == 'Yes') {
                            this.$refs.cbFatherShareMyMobileNumber.checked = true;
                        } else {
                            this.$refs.cbFatherShareMyMobileNumber.checked = false;
                        }
                        if (m.PAR_Father_IsStaff == 'True') {
                            this.$refs.cbFatherEtonStaff.checked = true;
                            this.isStaffFather = true;
                        } else {
                            this.$refs.cbFatherEtonStaff.checked = false;
                        }
                        if (m.PAR_Father_Loc_Residence_No !== undefined) {
                            this.$refs.inputFatherAddress1.value = m.PAR_Father_Loc_Residence_No;
                        }
                        ;
                        if (m.PAR_Father_Loc_Address1 !== undefined) {
                            this.$refs.inputFatherAddress2.value = m.PAR_Father_Loc_Address1;
                        }
                        ;
                        if (m.PAR_Father_Loc_Address2 !== undefined) {
                            this.$refs.inputFatherAddress3.value = m.PAR_Father_Loc_Address2;
                        }
                        ;
                        if (m.PAR_Father_Loc_City !== undefined) {
                            this.$refs.inputFatherCity.value = m.PAR_Father_Loc_City;
                        }
                        ;
                        if (m.PAR_Father_Loc_Country !== undefined) {
                            this.$refs.ddlFatherCountry.value = m.PAR_Father_Loc_Country;
                        }
                        ;
                        if (m.PAR_Father_Loc_Postalcode !== undefined) {
                            this.$refs.inputFatherPostalCode.value = m.PAR_Father_Loc_Postalcode;
                        }
                        ;
                        if (m.PAR_Father_CompanyName !== undefined) {
                            this.$refs.inputFatherCompanyName.value = m.PAR_Father_CompanyName;
                        }
                        ;
                        if (m.PAR_Fat_Comp_Addressee !== undefined) {
                            this.$refs.inputFatherCompanyAddresseeName.value = m.PAR_Fat_Comp_Addressee;
                        }
                        ;
                        if (m.PAR_Father_Residence_No !== undefined) {
                            this.$refs.inputFatherCompanyAddress1.value = m.PAR_Father_Residence_No;
                        }
                        ;
                        if (m.PAR_Father_Address1 !== undefined) {
                            this.$refs.inputFatherCompanyAddress2.value = m.PAR_Father_Address1;
                        }
                        ;
                        if (m.PAR_Father_Address2 !== undefined) {
                            this.$refs.inputFatherCompanyAddress3.value = m.PAR_Father_Address2;
                        }
                        ;
                        if (m.PAR_Father_City !== undefined) {
                            this.$refs.inputFatherCompanyCity.value = m.PAR_Father_City;
                        }
                        ;
                        if (m.PAR_Father_Country !== undefined) {
                            this.$refs.ddlFatherCompanyCountry.value = m.PAR_Father_Country;
                        }
                        ;
                        if (m.PAR_Father_PostalCode !== undefined) {
                            this.$refs.inputFatherCompanyPostalCode.value = m.PAR_Father_PostalCode;
                        }
                        ;
                        if (m.PAR_FComp_Email !== undefined) {
                            this.inputFatherCompanyEmail = m.PAR_FComp_Email;
                        }
                        ;
                        this.ddlFatherRace = m.PAR_Father_Race;
                        this.ddlFatherMaritalStatus = m.PAR_Father_MaritalStatus;
                        this.ddlFatherWorking = m.PAR_Father_Working;
                        if (m.PAR_Father_WorkingCommencementDate_convert !== '01/01/1901') {
                            this.inputFatherWorkingCommencementDate = m.PAR_Father_WorkingCommencementDate_convert;
                        }
                        ;
                        this.ddlFatherEmployeeName = m.PAR_Father_FK_CONid;
                        //father

                        //mother
                        this.inputMotherFirstName = m.PAR_Mother_FirstName;
                        if (m.PAR_Mother_MiddleName !== undefined) {
                            this.$refs.inputMotherMiddleName.value = m.PAR_Mother_MiddleName;
                        }
                        ;
                        this.inputMotherLastName = m.PAR_Mother_LastName;
                        // if (m.PAR_Mother_DOB_convert !== '01/01/1901') {
                        //     this.inputMotherDateofBirth = m.PAR_Mother_DOB_convert;
                        // }
                        // ;
                        this.ddlMotherEmploymentStatus = m.PAR_Mot_Emp_Status;
                        if (m.PAR_Mother_Occupation !== undefined) {
                            this.$refs.inputMotherOccupation.value = m.PAR_Mother_Occupation;
                        }
                        ;
                        if (m.PAR_Mother_Designation !== undefined) {
                            this.$refs.inputMotherDesignation.value = m.PAR_Mother_Designation;
                        }
                        ;
                        if (m.PAR_MotResContact !== undefined) {
                            this.$refs.inputMotherHomeTelNo.value = m.PAR_MotResContact;
                        }
                        ;
                        if (m.PAR_MotOffContact !== undefined) {
                            this.$refs.inputMotherOfficeTelNo.value = m.PAR_MotOffContact;
                        }
                        ;
                        if (m.PAR_Mother_Fax !== undefined) {
                            this.$refs.inputMotherFax.value = m.PAR_Mother_Fax;
                        }
                        ;
                        if (m.PAR_Mother_Phone !== undefined) {
                            this.$refs.inputMotherMobileNo.value = m.PAR_Mother_Phone;
                        }
                        ;
                        if (m.PAR_Mother_Email !== undefined) {
                            this.inputMotherEmail = m.PAR_Mother_Email;
                        }
                        ;
                        if (m.PAR_Mot_Nationality !== undefined) {
                            this.$refs.ddlMotherNationality.value = m.PAR_Mot_Nationality;
                        }
                        ;
                        if (m.PAR_MotReligion !== undefined) {
                            this.ddlMotherReligion = m.PAR_MotReligion;
                        }
                        ;
                        if (m.PAR_MotRemarks !== undefined) {
                            this.$refs.inputMotherRemarks.value = m.PAR_MotRemarks;
                        }
                        ;
                        if (m.PAR_Mother_IDType !== undefined) {
                            this.ddlMotherIdentificationType = m.PAR_Mother_IDType;
                        }
                        ;
                        if (m.PAR_Mother_UID !== undefined) {
                            this.$refs.inputMotherIdentificationNo.value = m.PAR_Mother_UID;
                        }
                        ;
                        if (m.PAR_Mother_IDExpDate_convert !== '01/01/1901') {
                            this.inputMotherIdentificationNoExpiryDate = m.PAR_Mother_IDExpDate_convert;
                        }
                        ;
                        if (m.PAR_Mother_Loc_Residence_No !== undefined) {
                            this.$refs.inputMotherAddress1.value = m.PAR_Mother_Loc_Residence_No;
                        }
                        ;
                        if (m.PAR_Mother_Loc_Address1 !== undefined) {
                            this.$refs.inputMotherAddress2.value = m.PAR_Mother_Loc_Address1;
                        }
                        ;
                        if (m.PAR_Mother_Loc_Address2 !== undefined) {
                            this.$refs.inputMotherAddress3.value = m.PAR_Mother_Loc_Address2;
                        }
                        ;
                        if (m.PAR_Mother_Loc_City !== undefined) {
                            this.$refs.inputMotherCity.value = m.PAR_Mother_Loc_City;
                        }
                        ;
                        if (m.PAR_Mother_Loc_Country !== undefined) {
                            this.$refs.ddlMotherCountry.value = m.PAR_Mother_Loc_Country;
                        }
                        ;
                        if (m.PAR_Mother_Loc_Postalcode !== undefined) {
                            this.$refs.inputMotherPostalCode.value = m.PAR_Mother_Loc_Postalcode;
                        }
                        ;
                        if (m.PAR_Mother_CompanyName !== undefined) {
                            this.$refs.inputMotherCompanyName.value = m.PAR_Mother_CompanyName;
                        }
                        ;
                        if (m.PAR_Mot_Comp_Addressee !== undefined) {
                            this.$refs.inputMotherCompanyAddresseeName.value = m.PAR_Mot_Comp_Addressee;
                        }
                        ;
                        if (m.PAR_Mother_Residence_No !== undefined) {
                            this.$refs.inputMotherCompanyAddress1.value = m.PAR_Mother_Residence_No;
                        }
                        ;
                        if (m.PAR_Mother_Address1 !== undefined) {
                            this.$refs.inputMotherCompanyAddress2.value = m.PAR_Mother_Address1;
                        }
                        ;
                        if (m.PAR_Mother_Address2 !== undefined) {
                            this.$refs.inputMotherCompanyAddress3.value = m.PAR_Mother_Address2;
                        }
                        ;
                        if (m.PAR_Mother_City !== undefined) {
                            this.$refs.inputMotherCompanyCity.value = m.PAR_Mother_City;
                        }
                        ;
                        if (m.PAR_Mother_Country !== undefined) {
                            this.$refs.ddlMotherCompanyCountry.value = m.PAR_Mother_Country;
                        }
                        ;
                        if (m.PAR_Mother_PostalCode !== undefined) {
                            this.$refs.inputMotherCompanyPostalCode.value = m.PAR_Mother_PostalCode;
                        }
                        ;
                        if (m.PAR_MComp_Email !== undefined) {
                            this.inputMotherCompanyEmail = m.PAR_MComp_Email;
                        }
                        ;
                        this.ddlMotherRace = m.PAR_Mother_Race;
                        this.ddlMotherMaritalStatus  = m.PAR_Mother_MaritalStatus;
                        this.ddlMotherWorking  = m.PAR_Mother_Working;
                        if (m.PAR_Mother_WorkingCommencementDate_convert !== '01/01/1901') {
                            this.inputMotherWorkingCommencementDate = m.PAR_Mother_WorkingCommencementDate_convert;
                        }
                        ;
                        if (m.PAR_Mother_IsStaff === 'True') {
                            this.$refs.cbMotherEtonStaff.checked = true;
                            this.isStaffMother = true;
                        } else {
                            this.$refs.cbMotherEtonStaff.checked = false;
                        }
                        this.ddlMotherEmployeeName = m.PAR_Mother_FK_CONid;
                        //mother

                        //guardian
                        if (m.PAR_Guardian_FirstName !== undefined) {
                            this.$refs.inputGuardianFirstName.value = m.PAR_Guardian_FirstName;
                        }
                        ;
                        if (m.PAR_Guardian_MiddleName !== undefined) {
                            this.$refs.inputGuardianMiddleName.value = m.PAR_Guardian_MiddleName;
                        }
                        ;
                        if (m.PAR_Guardian_LastName !== undefined) {
                            this.$refs.inputGuardianLastName.value = m.PAR_Guardian_LastName;
                        }
                        ;
                        // if (m.PAR_Guardian_DOB_convert !== '01/01/1901') {
                        //     this.inputGuardianDateofBirth = m.PAR_Guardian_DOB_convert;
                        // }
                        // ;
                        this.ddlGuardianEmploymentStatus = m.PAR_Gar_Emp_Status;
                        if (m.PAR_Guardian_Occupation !== undefined) {
                            this.$refs.inputGuardianOccupation.value = m.PAR_Guardian_Occupation;
                        }
                        ;
                        if (m.PAR_Guardian_Designation !== undefined) {
                            this.$refs.inputGuardianDesignation.value = m.PAR_Guardian_Designation;
                        }
                        ;
                        if (m.PAR_GarResContact !== undefined) {
                            this.$refs.inputGuardianHomeTelNo.value = m.PAR_GarResContact;
                        }
                        ;
                        if (m.PAR_GarOffContact !== undefined) {
                            this.$refs.inputGuardianOfficeTelNo.value = m.PAR_GarOffContact;
                        }
                        ;
                        if (m.PAR_Guardian_Fax !== undefined) {
                            this.$refs.inputGuardianFax.value = m.PAR_Guardian_Fax;
                        }
                        ;
                        if (m.PAR_Guardian_Phone !== undefined) {
                            this.$refs.inputGuardianMobileNo.value = m.PAR_Guardian_Phone;
                        }
                        ;
                        if (m.PAR_Guardian_Email !== undefined) {
                            this.inputGuardianEmail = m.PAR_Guardian_Email;
                        }
                        ;
                        if (m.PAR_Gar_Nationality !== undefined) {
                            this.$refs.ddlGuardianNationality.value = m.PAR_Gar_Nationality;
                        }
                        ;
                        this.ddlGuardianReligion = m.PAR_GarReligion;
                        if (m.PAR_GarRemarks !== undefined) {
                            this.$refs.inputGuardianRemarks.value = m.PAR_GarRemarks;
                        }
                        ;
                        this.ddlGuardianIdentificationType = m.PAR_Guardian_IDType;
                        if (m.PAR_Guardian_UID !== undefined) {
                            this.$refs.inputGuardianIdentificationNo.value = m.PAR_Guardian_UID;
                        }
                        ;
                        if (m.PAR_Guardian_Loc_Residence_No !== undefined) {
                            this.$refs.inputGuardianAddress1.value = m.PAR_Guardian_Loc_Residence_No;
                        }
                        ;
                        if (m.PAR_Guardian_Loc_Address1 !== undefined) {
                            this.$refs.inputGuardianAddress2.value = m.PAR_Guardian_Loc_Address1;
                        }
                        ;
                        if (m.PAR_Guardian_Loc_Address2 !== undefined) {
                            this.$refs.inputGuardianAddress3.value = m.PAR_Guardian_Loc_Address2;
                        }
                        ;
                        if (m.PAR_Guardian_Loc_City !== undefined) {
                            this.$refs.inputGuardianCity.value = m.PAR_Guardian_Loc_City;
                        }
                        ;
                        if (m.PAR_Guardian_Loc_Country !== undefined) {
                            this.$refs.ddlGuardianCountry.value = m.PAR_Guardian_Loc_Country;
                        }
                        ;
                        if (m.PAR_Guardian_Loc_PostalCode !== undefined) {
                            this.$refs.inputGuardianPostalCode.value = m.PAR_Guardian_Loc_PostalCode;
                        }
                        ;
                        if (m.PAR_Guardian_CompanyName !== undefined) {
                            this.$refs.inputGuardianCompanyName.value = m.PAR_Guardian_CompanyName;
                        }
                        ;
                        if (m.PAR_Gar_Comp_Addressee !== undefined) {
                            this.$refs.inputGuardianCompanyAddresseeName.value = m.PAR_Gar_Comp_Addressee;
                        }
                        ;
                        if (m.PAR_Guardian_Residence_No !== undefined) {
                            this.$refs.inputGuardianCompanyAddress1.value = m.PAR_Guardian_Residence_No;
                        }
                        ;
                        if (m.PAR_Guardian_Address1 !== undefined) {
                            this.$refs.inputGuardianCompanyAddress2.value = m.PAR_Guardian_Address1;
                        }
                        ;
                        if (m.PAR_Guardian_Address2 !== undefined) {
                            this.$refs.inputGuardianCompanyAddress3.value = m.PAR_Guardian_Address2;
                        }
                        ;
                        if (m.PAR_Guardian_City !== undefined) {
                            this.$refs.inputGuardianCompanyCity.value = m.PAR_Guardian_City;
                        }
                        ;
                        if (m.PAR_Guardian_Country !== undefined) {
                            this.$refs.ddlGuardianCompanyCountry.value = m.PAR_Guardian_Country;
                        }
                        ;
                        if (m.PAR_Guardian_Postalcode !== undefined) {
                            this.$refs.inputGuardianCompanyPostalCode.value = m.PAR_Guardian_Postalcode;
                        }
                        ;
                        if (m.PAR_GComp_Email !== undefined) {
                            this.inputGuardianCompanyEmail = m.PAR_GComp_Email;
                        }
                        ;
                        this.ddlGuardianRace = m.PAR_Guardian_Race;
                        this.ddlGuardianMaritalStatus = m.PAR_Guardian_MaritalStatus;
                        this.ddlGuardianWorking = m.PAR_Guardian_Working;
                        if (m.PAR_Guardian_WorkingCommencementDate_convert !== '01/01/1901') {
                            this.inputGuardianWorkingCommencementDate = m.PAR_Guardian_WorkingCommencementDate_convert;
                        }
                        ;
                        if (m.PAR_Guardian_IsStaff === 'True') {
                            this.$refs.cbGuardianEtonStaff.checked = true;
                            this.isStaffGuardian = true;
                        } else {
                            this.$refs.cbGuardianEtonStaff.checked = false;
                        }
                        this.ddlGuardianEmployeeName = m.PAR_Guardian_FK_CONid;
                        //guardian

                        //third party
                        if (m.PAR_TPComp !== undefined) {
                            this.$refs.inputThirdPartyCompanyName.value = m.PAR_TPComp;
                        }
                        ;
                        if (m.PAR_Fat_TP_Addressee !== undefined) {
                            this.$refs.inputThirdPartyAddresseeName.value = m.PAR_Fat_TP_Addressee;
                        }
                        ;
                        if (m.PAR_TPAddr1 !== undefined) {
                            this.$refs.inputThirdPartyAddress1.value = m.PAR_TPAddr1;
                        }
                        ;
                        if (m.PAR_TPAddr2 !== undefined) {
                            this.$refs.inputThirdPartyAddress2.value = m.PAR_TPAddr2;
                        }
                        ;
                        if (m.PAR_TPAddr3 !== undefined) {
                            this.$refs.inputThirdPartyAddress3.value = m.PAR_TPAddr3;
                        }
                        ;
                        if (m.PAR_TPCity !== undefined) {
                            this.$refs.inputThirdPartyCity.value = m.PAR_TPCity;
                        }
                        ;
                        if (m.PAR_TPCountry !== undefined) {
                            this.$refs.inputThirdPartyCountry.value = m.PAR_TPCountry;
                        }
                        ;
                        if (m.PAR_TPPin !== undefined) {
                            this.$refs.inputThirdPartyPostalCode.value = m.PAR_TPPin;
                        }
                        ;
                        if (m.PAR_TPComp_Email !== undefined) {
                            this.inputThirdPartyCompanyEmail = m.PAR_TPComp_Email;
                        }
                        ;
                        //third party
                    });
                } catch (e) {
                    this.results = e;
                }
            },
            async Save() {
                try {
                    if (this.lblParentID !== '') {
                        // let jsonString = '"PAR_Father_FirstName":"' + this.$refs.inputFatherFirstName.value + '"';
                        // jsonString = jsonString + ',"PAR_Father_MiddleName":"' + this.$refs.inputFatherMiddleName.value + '"';
                        // jsonString = jsonString + ',"PAR_Father_LastName":"' + this.$refs.inputFatherLastName.value + '"';
                        // // if (this.inputFatherDateofBirth !== undefined && this.inputFatherDateofBirth !== null) {
                        // //     jsonString = jsonString + ',"PAR_Father_DOB":"' + this.inputFatherDateofBirth + '"';
                        // // };
                        // jsonString = jsonString + ',"PAR_Fat_Emp_Status":"' + this.ddlFatherEmploymentStatus + '"';
                        // jsonString = jsonString + ',"PAR_Father_Occupation":"' + this.$refs.inputFatherOccupation.value + '"';
                        // jsonString = jsonString + ',"PAR_Father_Designation":"' + this.$refs.inputFatherDesignation.value + '"';
                        // jsonString = jsonString + ',"PAR_FatResContact":"' + this.$refs.inputFatherHomeTelNo.value + '"';
                        // jsonString = jsonString + ',"PAR_FatOffContact":"' + this.$refs.inputFatherOfficeTelNo.value + '"';
                        // jsonString = jsonString + ',"PAR_Father_Fax":"' + this.$refs.inputFatherFax.value + '"';
                        // jsonString = jsonString + ',"PAR_Father_Phone":"' + this.$refs.inputFatherMobileNo.value + '"';
                        // jsonString = jsonString + ',"PAR_Father_Email":"' + this.$refs.inputFatherEmail.value + '"';
                        // jsonString = jsonString + ',"PAR_Fat_Nationality":"' + this.$refs.ddlFatherNationality.value + '"';
                        // jsonString = jsonString + ',"PAR_FatReligion":"' + this.ddlFatherReligion + '"';
                        // jsonString = jsonString + ',"PAR_FatRemarks":"' + this.$refs.inputFatherRemarks.value + '"';
                        // jsonString = jsonString + ',"PAR_Father_IDType":"' + this.ddlFatherIdentificationType + '"';
                        // jsonString = jsonString + ',"PAR_Father_UID":"' + this.$refs.inputFatherIdentificationNo.value + '"';
                        // if (this.inputFatherIdentificationNoExpiryDate !== undefined && this.inputFatherIdentificationNoExpiryDate !== null) {
                        //     jsonString = jsonString + ',"PAR_Father_IDExpDate":"' + this.inputFatherIdentificationNoExpiryDate + '"';
                        // };
                        // if (this.$refs.cbFatherShareMyEmail.checked === true) {
                        //     jsonString = jsonString + ',"PAR_ShareMyContact":"Yes"';
                        // } else {
                        //     jsonString = jsonString + ',"PAR_ShareMyContact":"No"';
                        // }
                        // if (this.$refs.cbFatherShareMyMobileNumber.checked === true) {
                        //     jsonString = jsonString + ',"PAR_ShareMyMobile":"Yes"';
                        // } else {
                        //     jsonString = jsonString + ',"PAR_ShareMyMobile":"No"';
                        // }
                        // if (this.$refs.cbFatherEtonStaff.checked === true) {
                        //     jsonString = jsonString + ',"PAR_Father_IsStaff":"True"';
                        // } else {
                        //     jsonString = jsonString + ',"PAR_Father_IsStaff":"False"';
                        // }
                        // if (this.$refs.cbMotherEtonStaff.checked === true) {
                        //     jsonString = jsonString + ',"PAR_Mother_IsStaff":"True"';
                        // } else {
                        //     jsonString = jsonString + ',"PAR_Mother_IsStaff":"False"';
                        // }
                        // if (this.$refs.cbGuardianEtonStaff.checked === true) {
                        //     jsonString = jsonString + ',"PAR_Guardian_IsStaff":"True"';
                        // } else {
                        //     jsonString = jsonString + ',"PAR_Guardian_IsStaff":"False"';
                        // }
                        // jsonString = jsonString + ',"PAR_Father_FK_CONid":"' + this.ddlFatherEmployeeName + '"';
                        // jsonString = jsonString + ',"PAR_Mother_FK_CONid":"' + this.ddlMotherEmployeeName + '"';
                        // jsonString = jsonString + ',"PAR_Guardian_FK_CONid":"' + this.ddlGuardianEmployeeName + '"';
                        // jsonString = jsonString + ',"PAR_Father_Loc_Residence_No":"' + this.$refs.inputFatherAddress1.value + '"';
                        // jsonString = jsonString + ',"PAR_Father_Loc_Address1":"' + this.$refs.inputFatherAddress2.value + '"';
                        // jsonString = jsonString + ',"PAR_Father_Loc_Address2":"' + this.$refs.inputFatherAddress3.value + '"';
                        // jsonString = jsonString + ',"PAR_Father_Loc_City":"' + this.$refs.inputFatherCity.value + '"';
                        // jsonString = jsonString + ',"PAR_Father_Loc_Country":"' + this.$refs.ddlFatherCountry.value + '"';
                        // jsonString = jsonString + ',"PAR_Father_Loc_Postalcode":"' + this.$refs.inputFatherPostalCode.value + '"';
                        // jsonString = jsonString + ',"PAR_Father_CompanyName":"' + this.$refs.inputFatherCompanyName.value + '"';
                        // jsonString = jsonString + ',"PAR_Fat_Comp_Addressee":"' + this.$refs.inputFatherCompanyAddresseeName.value + '"';
                        // jsonString = jsonString + ',"PAR_Father_Residence_No":"' + this.$refs.inputFatherCompanyAddress1.value + '"';
                        // jsonString = jsonString + ',"PAR_Father_Address1":"' + this.$refs.inputFatherCompanyAddress2.value + '"';
                        // jsonString = jsonString + ',"PAR_Father_Address2":"' + this.$refs.inputFatherCompanyAddress3.value + '"';
                        // jsonString = jsonString + ',"PAR_Father_City":"' + this.$refs.inputFatherCompanyCity.value + '"';
                        // jsonString = jsonString + ',"PAR_Father_Country":"' + this.$refs.ddlFatherCompanyCountry.value + '"';
                        // jsonString = jsonString + ',"PAR_Father_PostalCode":"' + this.$refs.inputFatherCompanyPostalCode.value + '"';
                        // jsonString = jsonString + ',"PAR_FComp_Email":"' + this.$refs.inputFatherCompanyEmail.value + '"';
                        // jsonString = jsonString + ',"PAR_Mother_FirstName":"' + this.$refs.inputMotherFirstName.value + '"';
                        // jsonString = jsonString + ',"PAR_Mother_MiddleName":"' + this.$refs.inputMotherMiddleName.value + '"';
                        // jsonString = jsonString + ',"PAR_Mother_LastName":"' + this.$refs.inputMotherLastName.value + '"';
                        // // if (this.inputMotherDateofBirth !== undefined && this.inputMotherDateofBirth !== null) {
                        // //     jsonString = jsonString + ',"PAR_Mother_DOB":"' + this.inputMotherDateofBirth + '"';
                        // // };
                        // jsonString = jsonString + ',"PAR_Mot_Emp_Status":"' + this.ddlMotherEmploymentStatus + '"';
                        // jsonString = jsonString + ',"PAR_Mother_Occupation":"' + this.$refs.inputMotherOccupation.value + '"';
                        // jsonString = jsonString + ',"PAR_Mother_Designation":"' + this.$refs.inputMotherDesignation.value + '"';
                        // jsonString = jsonString + ',"PAR_MotResContact":"' + this.$refs.inputMotherHomeTelNo.value + '"';
                        // jsonString = jsonString + ',"PAR_MotOffContact":"' + this.$refs.inputMotherOfficeTelNo.value + '"';
                        // jsonString = jsonString + ',"PAR_Mother_Fax":"' + this.$refs.inputMotherFax.value + '"';
                        // jsonString = jsonString + ',"PAR_Mother_Phone":"' + this.$refs.inputMotherMobileNo.value + '"';
                        // jsonString = jsonString + ',"PAR_Mother_Email":"' + this.$refs.inputMotherEmail.value + '"';
                        // jsonString = jsonString + ',"PAR_Mot_Nationality":"' + this.$refs.ddlMotherNationality.value + '"';
                        // jsonString = jsonString + ',"PAR_MotReligion":"' + this.ddlMotherReligion + '"';
                        // jsonString = jsonString + ',"PAR_MotRemarks":"' + this.$refs.inputMotherRemarks.value + '"';
                        // jsonString = jsonString + ',"PAR_Mother_IDType":"' + this.ddlMotherIdentificationType + '"';
                        // jsonString = jsonString + ',"PAR_Mother_UID":"' + this.$refs.inputMotherIdentificationNo.value + '"';
                        // if (this.inputMotherIdentificationNoExpiryDate !== undefined && this.inputMotherIdentificationNoExpiryDate !== null) {
                        //     jsonString = jsonString + ',"PAR_Mother_IDExpDate":"' + this.inputMotherIdentificationNoExpiryDate + '"';
                        // };
                        // jsonString = jsonString + ',"PAR_Mother_Loc_Residence_No":"' + this.$refs.inputMotherAddress1.value + '"';
                        // jsonString = jsonString + ',"PAR_Mother_Loc_Address1":"' + this.$refs.inputMotherAddress2.value + '"';
                        // jsonString = jsonString + ',"PAR_Mother_Loc_Address2":"' + this.$refs.inputMotherAddress3.value + '"';
                        // jsonString = jsonString + ',"PAR_Mother_Loc_City":"' + this.$refs.inputMotherCity.value + '"';
                        // jsonString = jsonString + ',"PAR_Mother_Loc_Country":"' + this.$refs.ddlMotherCountry.value + '"';
                        // jsonString = jsonString + ',"PAR_Mother_Loc_Postalcode":"' + this.$refs.inputMotherPostalCode.value + '"';
                        // jsonString = jsonString + ',"PAR_Mother_CompanyName":"' + this.$refs.inputMotherCompanyName.value + '"';
                        // jsonString = jsonString + ',"PAR_Mot_Comp_Addressee":"' + this.$refs.inputMotherCompanyAddresseeName.value + '"';
                        // jsonString = jsonString + ',"PAR_Mother_Residence_No":"' + this.$refs.inputMotherCompanyAddress1.value + '"';
                        // jsonString = jsonString + ',"PAR_Mother_Address1":"' + this.$refs.inputMotherCompanyAddress2.value + '"';
                        // jsonString = jsonString + ',"PAR_Mother_Address2":"' + this.$refs.inputMotherCompanyAddress3.value + '"';
                        // jsonString = jsonString + ',"PAR_Mother_City":"' + this.$refs.inputMotherCompanyCity.value + '"';
                        // jsonString = jsonString + ',"PAR_Mother_Country":"' + this.$refs.ddlMotherCompanyCountry.value + '"';
                        // jsonString = jsonString + ',"PAR_Mother_PostalCode":"' + this.$refs.inputMotherCompanyPostalCode.value + '"';
                        // jsonString = jsonString + ',"PAR_MComp_Email":"' + this.$refs.inputMotherCompanyEmail.value + '"';
                        // jsonString = jsonString + ',"PAR_Guardian_FirstName":"' + this.$refs.inputGuardianFirstName.value + '"';
                        // jsonString = jsonString + ',"PAR_Guardian_MiddleName":"' + this.$refs.inputGuardianMiddleName.value + '"';
                        // jsonString = jsonString + ',"PAR_Guardian_LastName":"' + this.$refs.inputGuardianLastName.value + '"';
                        // // if (this.inputGuardianDateofBirth !== undefined && this.inputGuardianDateofBirth !== null) {
                        // //     jsonString = jsonString + ',"PAR_Guardian_DOB":"' + this.inputGuardianDateofBirth + '"';
                        // // };
                        // jsonString = jsonString + ',"PAR_Gar_Emp_Status":"' + this.ddlGuardianEmploymentStatus + '"';
                        // jsonString = jsonString + ',"PAR_Guardian_Occupation":"' + this.$refs.inputGuardianOccupation.value + '"';
                        // jsonString = jsonString + ',"PAR_Guardian_Designation":"' + this.$refs.inputGuardianDesignation.value + '"';
                        // jsonString = jsonString + ',"PAR_GarResContact":"' + this.$refs.inputGuardianHomeTelNo.value + '"';
                        // jsonString = jsonString + ',"PAR_GarOffContact":"' + this.$refs.inputGuardianOfficeTelNo.value + '"';
                        // jsonString = jsonString + ',"PAR_Guardian_Fax":"' + this.$refs.inputGuardianFax.value + '"';
                        // jsonString = jsonString + ',"PAR_Guardian_Phone":"' + this.$refs.inputGuardianMobileNo.value + '"';
                        // jsonString = jsonString + ',"PAR_Guardian_Email":"' + this.$refs.inputGuardianEmail.value + '"';
                        // jsonString = jsonString + ',"PAR_Gar_Nationality":"' + this.$refs.ddlGuardianNationality.value + '"';
                        // jsonString = jsonString + ',"PAR_GarReligion":"' + this.ddlGuardianReligion + '"';
                        // jsonString = jsonString + ',"PAR_GarRemarks":"' + this.$refs.inputGuardianRemarks.value + '"';
                        // jsonString = jsonString + ',"PAR_Guardian_IDType":"' + this.ddlGuardianIdentificationType + '"';
                        // jsonString = jsonString + ',"PAR_Guardian_UID":"' + this.$refs.inputGuardianIdentificationNo.value + '"';
                        // jsonString = jsonString + ',"PAR_Guardian_Loc_Residence_No":"' + this.$refs.inputGuardianAddress1.value + '"';
                        // jsonString = jsonString + ',"PAR_Guardian_Loc_Address1":"' + this.$refs.inputGuardianAddress2.value + '"';
                        // jsonString = jsonString + ',"PAR_Guardian_Loc_Address2":"' + this.$refs.inputGuardianAddress3.value + '"';
                        // jsonString = jsonString + ',"PAR_Guardian_Loc_City":"' + this.$refs.inputGuardianCity.value + '"';
                        // jsonString = jsonString + ',"PAR_Guardian_Loc_Country":"' + this.$refs.ddlGuardianCountry.value + '"';
                        // jsonString = jsonString + ',"PAR_Guardian_Loc_PostalCode":"' + this.$refs.inputGuardianPostalCode.value + '"';
                        // jsonString = jsonString + ',"PAR_Guardian_CompanyName":"' + this.$refs.inputGuardianCompanyName.value + '"';
                        // jsonString = jsonString + ',"PAR_Gar_Comp_Addressee":"' + this.$refs.inputGuardianCompanyAddresseeName.value + '"';
                        // jsonString = jsonString + ',"PAR_Guardian_Residence_No":"' + this.$refs.inputGuardianCompanyAddress1.value + '"';
                        // jsonString = jsonString + ',"PAR_Guardian_Address1":"' + this.$refs.inputGuardianCompanyAddress2.value + '"';
                        // jsonString = jsonString + ',"PAR_Guardian_Address2":"' + this.$refs.inputGuardianCompanyAddress3.value + '"';
                        // jsonString = jsonString + ',"PAR_Guardian_City":"' + this.$refs.inputGuardianCompanyCity.value + '"';
                        // jsonString = jsonString + ',"PAR_Guardian_Country":"' + this.$refs.ddlGuardianCompanyCountry.value + '"';
                        // jsonString = jsonString + ',"PAR_Guardian_Postalcode":"' + this.$refs.inputGuardianCompanyPostalCode.value + '"';
                        // jsonString = jsonString + ',"PAR_GComp_Email":"' + this.$refs.inputGuardianCompanyEmail.value + '"';
                        // jsonString = jsonString + ',"PAR_TPComp":"' + this.$refs.inputThirdPartyCompanyName.value + '"';
                        // jsonString = jsonString + ',"PAR_Fat_TP_Addressee":"' + this.$refs.inputThirdPartyAddresseeName.value + '"';
                        // jsonString = jsonString + ',"PAR_TPAddr1":"' + this.$refs.inputThirdPartyAddress1.value + '"';
                        // jsonString = jsonString + ',"PAR_TPAddr2":"' + this.$refs.inputThirdPartyAddress2.value + '"';
                        // jsonString = jsonString + ',"PAR_TPAddr3":"' + this.$refs.inputThirdPartyAddress3.value + '"';
                        // jsonString = jsonString + ',"PAR_TPCity":"' + this.$refs.inputThirdPartyCity.value + '"';
                        // jsonString = jsonString + ',"PAR_TPCountry":"' + this.$refs.inputThirdPartyCountry.value + '"';
                        // jsonString = jsonString + ',"PAR_TPPin":"' + this.$refs.inputThirdPartyPostalCode.value + '"';
                        // jsonString = jsonString + ',"PAR_TPComp_Email":"' + this.$refs.inputThirdPartyCompanyEmail.value + '"';
                        // jsonString = jsonString + ',"PAR_Father_Race":"' + this.ddlFatherRace + '"';
                        // jsonString = jsonString + ',"PAR_Father_MaritalStatus":"' + this.ddlFatherMaritalStatus + '"';
                        // jsonString = jsonString + ',"PAR_Father_Working":"' + this.ddlFatherWorking + '"';
                        // jsonString = jsonString + ',"PAR_Mother_Race":"' + this.ddlMotherRace + '"';
                        // jsonString = jsonString + ',"PAR_Mother_MaritalStatus":"' + this.ddlMotherMaritalStatus + '"';
                        // jsonString = jsonString + ',"PAR_Mother_Working":"' + this.ddlMotherWorking + '"';
                        // jsonString = jsonString + ',"PAR_Guardian_Race":"' + this.ddlGuardianRace + '"';
                        // jsonString = jsonString + ',"PAR_Guardian_MaritalStatus":"' + this.ddlGuardianMaritalStatus + '"';
                        // jsonString = jsonString + ',"PAR_Guardian_Working":"' + this.ddlGuardianWorking + '"';
                        // if (this.inputFatherWorkingCommencementDate !== undefined && this.inputFatherWorkingCommencementDate !== null) {
                        //     jsonString = jsonString + ',"PAR_Father_WorkingCommencementDate":"' + this.inputFatherWorkingCommencementDate + '"';
                        // };
                        // if (this.inputMotherWorkingCommencementDate !== undefined && this.inputMotherWorkingCommencementDate !== null) {
                        //     jsonString = jsonString + ',"PAR_Mother_WorkingCommencementDate":"' + this.inputMotherWorkingCommencementDate + '"';
                        // };
                        // if (this.inputGuardianWorkingCommencementDate !== undefined && this.inputGuardianWorkingCommencementDate !== null) {
                        //     jsonString = jsonString + ',"PAR_Guardian_WorkingCommencementDate":"' + this.inputGuardianWorkingCommencementDate + '"';
                        // };
                        //
                        // jsonString = '{ ' + jsonString + ' }';

                        let jsonParent = [];

                        let jsonParentDetials = {
                            PAR_Father_FirstName : this.$refs.inputFatherFirstName.value,
                            PAR_Father_MiddleName : this.$refs.inputFatherMiddleName.value,
                            PAR_Father_LastName : this.$refs.inputFatherLastName.value,
                            PAR_Fat_Emp_Status : this.ddlFatherEmploymentStatus,
                            PAR_Father_Occupation : this.$refs.inputFatherOccupation.value,
                            PAR_Father_Designation : this.$refs.inputFatherDesignation.value,
                            PAR_FatResContact : this.$refs.inputFatherHomeTelNo.value,
                            PAR_FatOffContact : this.$refs.inputFatherOfficeTelNo.value,
                            PAR_Father_Fax : this.$refs.inputFatherFax.value,
                            PAR_Father_Phone : this.$refs.inputFatherMobileNo.value,
                            PAR_Father_Email : this.inputFatherEmail,
                            PAR_Fat_Nationality : this.$refs.ddlFatherNationality.value,
                            PAR_FatReligion : this.ddlFatherReligion,
                            PAR_FatRemarks : this.$refs.inputFatherRemarks.value,
                            PAR_Father_IDType : this.ddlFatherIdentificationType,
                            PAR_Father_UID : this.$refs.inputFatherIdentificationNo.value,
                            PAR_Father_FK_CONid : this.ddlFatherEmployeeName,
                            PAR_Mother_FK_CONid : this.ddlMotherEmployeeName,
                            PAR_Guardian_FK_CONid : this.ddlGuardianEmployeeName,
                            PAR_Father_Loc_Residence_No : this.$refs.inputFatherAddress1.value,
                            PAR_Father_Loc_Address1 : this.$refs.inputFatherAddress2.value,
                            PAR_Father_Loc_Address2 : this.$refs.inputFatherAddress3.value,
                            PAR_Father_Loc_City : this.$refs.inputFatherCity.value,
                            PAR_Father_Loc_Country : this.$refs.ddlFatherCountry.value,
                            PAR_Father_Loc_Postalcode : this.$refs.inputFatherPostalCode.value,
                            PAR_Father_CompanyName : this.$refs.inputFatherCompanyName.value,
                            PAR_Fat_Comp_Addressee : this.$refs.inputFatherCompanyAddresseeName.value,
                            PAR_Father_Residence_No : this.$refs.inputFatherCompanyAddress1.value,
                            PAR_Father_Address1 : this.$refs.inputFatherCompanyAddress2.value,
                            PAR_Father_Address2 : this.$refs.inputFatherCompanyAddress3.value,
                            PAR_Father_City : this.$refs.inputFatherCompanyCity.value,
                            PAR_Father_Country : this.$refs.ddlFatherCompanyCountry.value,
                            PAR_Father_PostalCode : this.$refs.inputFatherCompanyPostalCode.value,
                            PAR_FComp_Email : this.inputFatherCompanyEmail,
                            PAR_Mother_FirstName : this.$refs.inputMotherFirstName.value,
                            PAR_Mother_MiddleName : this.$refs.inputMotherMiddleName.value,
                            PAR_Mother_LastName : this.$refs.inputMotherLastName.value,
                            PAR_Mot_Emp_Status : this.ddlMotherEmploymentStatus,
                            PAR_Mother_Occupation : this.$refs.inputMotherOccupation.value,
                            PAR_Mother_Designation : this.$refs.inputMotherDesignation.value,
                            PAR_MotResContact : this.$refs.inputMotherHomeTelNo.value,
                            PAR_MotOffContact : this.$refs.inputMotherOfficeTelNo.value,
                            PAR_Mother_Fax : this.$refs.inputMotherFax.value,
                            PAR_Mother_Phone : this.$refs.inputMotherMobileNo.value,
                            PAR_Mother_Email : this.inputMotherEmail,
                            PAR_Mot_Nationality : this.$refs.ddlMotherNationality.value,
                            PAR_MotReligion : this.ddlMotherReligion,
                            PAR_MotRemarks : this.$refs.inputMotherRemarks.value,
                            PAR_Mother_IDType : this.ddlMotherIdentificationType,
                            PAR_Mother_UID : this.$refs.inputMotherIdentificationNo.value,
                            PAR_Mother_Loc_Residence_No : this.$refs.inputMotherAddress1.value,
                            PAR_Mother_Loc_Address1 : this.$refs.inputMotherAddress2.value,
                            PAR_Mother_Loc_Address2 : this.$refs.inputMotherAddress3.value,
                            PAR_Mother_Loc_City : this.$refs.inputMotherCity.value,
                            PAR_Mother_Loc_Country : this.$refs.ddlMotherCountry.value,
                            PAR_Mother_Loc_Postalcode : this.$refs.inputMotherPostalCode.value,
                            PAR_Mother_CompanyName : this.$refs.inputMotherCompanyName.value,
                            PAR_Mot_Comp_Addressee : this.$refs.inputMotherCompanyAddresseeName.value,
                            PAR_Mother_Residence_No : this.$refs.inputMotherCompanyAddress1.value,
                            PAR_Mother_Address1 : this.$refs.inputMotherCompanyAddress2.value,
                            PAR_Mother_Address2 : this.$refs.inputMotherCompanyAddress3.value,
                            PAR_Mother_City : this.$refs.inputMotherCompanyCity.value,
                            PAR_Mother_Country : this.$refs.ddlMotherCompanyCountry.value,
                            PAR_Mother_PostalCode : this.$refs.inputMotherCompanyPostalCode.value,
                            PAR_MComp_Email : this.inputMotherCompanyEmail,
                            PAR_Guardian_FirstName : this.$refs.inputGuardianFirstName.value,
                            PAR_Guardian_MiddleName : this.$refs.inputGuardianMiddleName.value,
                            PAR_Guardian_LastName : this.$refs.inputGuardianLastName.value,
                            PAR_Gar_Emp_Status : this.ddlGuardianEmploymentStatus,
                            PAR_Guardian_Occupation : this.$refs.inputGuardianOccupation.value,
                            PAR_Guardian_Designation : this.$refs.inputGuardianDesignation.value,
                            PAR_GarResContact : this.$refs.inputGuardianHomeTelNo.value,
                            PAR_GarOffContact : this.$refs.inputGuardianOfficeTelNo.value,
                            PAR_Guardian_Fax : this.$refs.inputGuardianFax.value,
                            PAR_Guardian_Phone : this.$refs.inputGuardianMobileNo.value,
                            PAR_Guardian_Email : this.inputGuardianEmail,
                            PAR_Gar_Nationality : this.$refs.ddlGuardianNationality.value,
                            PAR_GarReligion : this.ddlGuardianReligion,
                            PAR_GarRemarks : this.$refs.inputGuardianRemarks.value,
                            PAR_Guardian_IDType : this.ddlGuardianIdentificationType,
                            PAR_Guardian_UID : this.$refs.inputGuardianIdentificationNo.value,
                            PAR_Guardian_Loc_Residence_No : this.$refs.inputGuardianAddress1.value,
                            PAR_Guardian_Loc_Address1 : this.$refs.inputGuardianAddress2.value,
                            PAR_Guardian_Loc_Address2 : this.$refs.inputGuardianAddress3.value,
                            PAR_Guardian_Loc_City : this.$refs.inputGuardianCity.value,
                            PAR_Guardian_Loc_Country : this.$refs.ddlGuardianCountry.value,
                            PAR_Guardian_Loc_PostalCode : this.$refs.inputGuardianPostalCode.value,
                            PAR_Guardian_CompanyName : this.$refs.inputGuardianCompanyName.value,
                            PAR_Gar_Comp_Addressee : this.$refs.inputGuardianCompanyAddresseeName.value,
                            PAR_Guardian_Residence_No : this.$refs.inputGuardianCompanyAddress1.value,
                            PAR_Guardian_Address1 : this.$refs.inputGuardianCompanyAddress2.value,
                            PAR_Guardian_Address2 : this.$refs.inputGuardianCompanyAddress3.value,
                            PAR_Guardian_City : this.$refs.inputGuardianCompanyCity.value,
                            PAR_Guardian_Country : this.$refs.ddlGuardianCompanyCountry.value,
                            PAR_Guardian_Postalcode : this.$refs.inputGuardianCompanyPostalCode.value,
                            PAR_GComp_Email : this.inputGuardianCompanyEmail,
                            PAR_TPComp : this.$refs.inputThirdPartyCompanyName.value,
                            PAR_Fat_TP_Addressee : this.$refs.inputThirdPartyAddresseeName.value,
                            PAR_TPAddr1 : this.$refs.inputThirdPartyAddress1.value,
                            PAR_TPAddr2 : this.$refs.inputThirdPartyAddress2.value,
                            PAR_TPAddr3 : this.$refs.inputThirdPartyAddress3.value,
                            PAR_TPCity : this.$refs.inputThirdPartyCity.value,
                            PAR_TPCountry : this.$refs.inputThirdPartyCountry.value,
                            PAR_TPPin : this.$refs.inputThirdPartyPostalCode.value,
                            PAR_TPComp_Email : this.inputThirdPartyCompanyEmail,
                            PAR_Father_Race : this.ddlFatherRace,
                            PAR_Father_MaritalStatus : this.ddlFatherMaritalStatus,
                            PAR_Father_Working : this.ddlFatherWorking,
                            PAR_Mother_Race : this.ddlMotherRace,
                            PAR_Mother_MaritalStatus : this.ddlMotherMaritalStatus,
                            PAR_Mother_Working : this.ddlMotherWorking,
                            PAR_Guardian_Race : this.ddlGuardianRace,
                            PAR_Guardian_MaritalStatus : this.ddlGuardianMaritalStatus,
                            PAR_Guardian_Working : this.ddlGuardianWorking,
                        };

                        if (this.$refs.cbFatherShareMyEmail.checked === true) {
                            Vue.set(jsonParentDetials, "PAR_ShareMyContact", "Yes");
                        } else {
                            Vue.set(jsonParentDetials, "PAR_ShareMyContact", "No");
                        }

                        if (this.$refs.cbFatherShareMyMobileNumber.checked === true) {
                            Vue.set(jsonParentDetials, "PAR_ShareMyMobile", "Yes");
                        } else {
                            Vue.set(jsonParentDetials, "PAR_ShareMyMobile", "No");
                        }

                        if (this.$refs.cbFatherEtonStaff.checked === true) {
                            Vue.set(jsonParentDetials, "PAR_Father_IsStaff", "True");
                        } else {
                            Vue.set(jsonParentDetials, "PAR_Father_IsStaff", "False");
                        }

                        if (this.$refs.cbMotherEtonStaff.checked === true) {
                            Vue.set(jsonParentDetials, "PAR_Mother_IsStaff", "True");
                        } else {
                            Vue.set(jsonParentDetials, "PAR_Mother_IsStaff", "False");
                        }

                        if (this.$refs.cbGuardianEtonStaff.checked === true) {
                            Vue.set(jsonParentDetials, "PAR_Guardian_IsStaff", "True");
                        } else {
                            Vue.set(jsonParentDetials, "PAR_Guardian_IsStaff", "False");
                        }

                        if (this.inputFatherIdentificationNoExpiryDate !== undefined && this.inputFatherIdentificationNoExpiryDate !== null) {
                            Vue.set(jsonParentDetials, "PAR_Father_IDExpDate", this.inputFatherIdentificationNoExpiryDate);
                        }

                        if (this.inputMotherIdentificationNoExpiryDate !== undefined && this.inputMotherIdentificationNoExpiryDate !== null) {
                            Vue.set(jsonParentDetials, "PAR_Mother_IDExpDate", this.inputMotherIdentificationNoExpiryDate);
                        }

                        if (this.inputFatherWorkingCommencementDate !== undefined && this.inputFatherWorkingCommencementDate !== null) {
                            Vue.set(jsonParentDetials, "PAR_Father_WorkingCommencementDate", this.inputFatherWorkingCommencementDate);
                        }

                        if (this.inputMotherWorkingCommencementDate !== undefined && this.inputMotherWorkingCommencementDate !== null) {
                            Vue.set(jsonParentDetials, "PAR_Mother_WorkingCommencementDate", this.inputMotherWorkingCommencementDate);
                        }

                        if (this.inputGuardianWorkingCommencementDate !== undefined && this.inputGuardianWorkingCommencementDate !== null) {
                            Vue.set(jsonParentDetials, "PAR_Guardian_WorkingCommencementDate", this.inputGuardianWorkingCommencementDate);
                        }

                        jsonParent.push(jsonParentDetials);

                        const response = await DataSource.shared.updateParent(this.lblParentID, JSON.stringify(jsonParent));
                        if (response) {
                            if (response.code === "1") {
                                alert('Records Successfully Edited');
                                window.location.replace('/parent?id=' + this.lblParentID);
                            } else {
                                alert('Update Parent Error - Please try again later');
                            }
                        }
                    } else {
                        alert('Error! Please search again.');
                    }
                } catch (e) {
                    this.results = e;
                    console.log(e);
                }
            },
            async Validation() {
                try {
                    this.$v.$touch();

                    if (this.$v.$error) {
                        alert('Please fill in all * fields');
                        return;
                    }

                    this.Save();
                } catch (e) {
                    this.results = e;
                }
            },
            isStaffOnChange () {
                if (this.$refs.cbFatherEtonStaff.checked === true) {
                    this.isStaffFather = true;
                } else {
                    this.isStaffFather = false;
                    this.ddlFatherEmployeeName = '';
                }

                if (this.$refs.cbMotherEtonStaff.checked === true) {
                    this.isStaffMother = true;
                } else {
                    this.isStaffMother = false;
                    this.ddlMotherEmployeeName = '';
                }

                if (this.$refs.cbGuardianEtonStaff.checked === true) {
                    this.isStaffGuardian = true;
                } else {
                    this.isStaffGuardian = false;
                    this.ddlGuardianEmployeeName = '';
                }
            },
            async getChildren() {
                try {
                    const response = await DataSource.shared.getRelationshipByParentID(this.lblParentID);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            console.log('Get Children Error!');
                        } else if (response.code === '2') {
                            this.childrenListInt = [];
                        } else {
                            this.childrenListInt = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
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
                    this.$notify.error({
                        title: 'Error',
                        message: 'You are not authorize to edit this student\'s info'
                    });
                }
            },
            checkSiblingReActivate(value) {
                if (value === 'Withdrawn' || value === 'Graduated' || value === 'Void') {
                    return true;
                } else {
                    return false;
                }
            },
            OpenReActivateModal (value) {
                this.currentStudentID = value;
                this.inputReActivateDateOfCommencement = '';
                this.$refs.reActivateShowModal.show();
            },
            openReActivateConfirmModal (){
                if (this.inputReActivateDateOfCommencement === null || this.inputReActivateDateOfCommencement === '') {
                    this.$notify({
                        title: 'Require',
                        message: 'Please select Date of Commencement...'
                    });
                } else {
                    this.$refs.reActivateShowModal.hide();
                    this.$refs.reActivateConfirmShowModal.show();
                }
            },
            async reActive() {
                const response = await DataSource.shared.setLevel('ReActivate', this.currentStudentID, '', '', this.inputReActivateDateOfCommencement, '');
                if (response) {
                    if (response.code === '88') {
                        window.location.replace('/');
                    } else if (response.code === '1') {
                        this.$notify({
                            title: 'Success',
                            message: 'Re-Activate Successfully!',
                            type: 'success'
                        });
                        window.location.replace('/parent?id=' + this.lblParentID);
                    } else if (response.code === '3') {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Commencement Date out of range...'
                        });
                    } else {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Re-Activate: Error...'
                        });
                    }
                }
            },
        },
    };
</script>

<style scoped>
    .fatherAreaDiv, .motherAreaDiv, .guardianAreaDiv, .thirdpartyAreaDiv, .otherAreaDiv, .childrenAreaDiv {
        margin-bottom: 50px;
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
</style>

<style>
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

    .badge1 {
        left: 73px;
    }

    .badge2 {
        left: 172px;
    }

    .badge3 {
        left: 271px;
    }

    .badge4 {
        left: 370px;
    }

    .parentPageBTabs{
        position: relative;
    }

    .parentPageBTabs .tab-content {
        margin-top: 30px;
    }

    .parentPageBTabs .nav-link {
        font-weight: bold;
    }

    .parentPageBTabs .nav-tabs .nav-link.active {
        background-color: #413f56;
        color: white;
        border: 5px solid #dee2e6;
    }

    .parentPageBTabs .nav-tabs {
        border-bottom: 5px solid #dee2e6;
    }
</style>