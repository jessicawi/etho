<template>
    <div id="myaccount">
        <div class="datatable-edit__header">
            <div class="container">
                <h3>My Account</h3>
                <a href="MyAccount">My Account</a> > Edit
            </div>
        </div>

        <div v-if="!isStaff" class="mt-3 container  pt-5">
            <label style="display:none !important;">{{lblParentID}}</label>
            <b-tabs class="parentPageBTabs">
                <b-tab title="Father" active>
                    <div class="">
                        <div class="fatherAreaDiv">
                            <div class="">
                                <h5 class="text-left student-form__title">Father's Personal Information</h5>
                            </div>
                            <div class="row form-group__wrapper">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>First Name</label>
                                    <input type="text" class="form-control" ref="inputFatherFirstName"
                                           v-model="inputFatherFirstName"
                                           readonly="readonly">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Middle Name</label>
                                    <input type="text" class="form-control" ref="inputFatherMiddleName"
                                           readonly="readonly">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Last Name</label>
                                    <input type="text" class="form-control" ref="inputFatherLastName"
                                           v-model="inputFatherLastName"
                                           readonly="readonly">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Date of Birth</label>
                                    <div class="date">
                                        <input type="text" class="form-control" ref="inputFatherLastName"
                                               v-model="inputFatherDateofBirth"
                                               readonly="readonly">
                                    </div>
                                </div>

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
                                    <input type="text" class="form-control" ref="inputFatherEmail">
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
                                    <input type="text" class="form-control" ref="inputFatherCompanyEmail">
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
                </b-tab>
                <b-tab title="Mother">
                    <div class="">
                        <div class="motherAreaDiv">
                            <div class="">
                                <h5 class="text-left student-form__title">Mother's Personal Information</h5>
                            </div>
                            <div class="row form-group__wrapper">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>First Name</label>
                                    <input type="text" class="form-control" ref="inputMotherFirstName"
                                           v-model="inputMotherFirstName"
                                           readonly="readonly">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Middle Name</label>
                                    <input type="text" class="form-control" ref="inputMotherMiddleName"
                                           readonly="readonly">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Last Name</label>
                                    <input type="text" class="form-control" ref="inputMotherLastName"
                                           v-model="inputMotherLastName"
                                           readonly="readonly">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>* Date of Birth</label>
                                    <div class="date">
                                        <input type="text" class="form-control" ref="inputMotherDateofBirth"
                                               v-model="inputMotherDateofBirth"
                                               readonly="readonly">
                                    </div>
                                </div>

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
                                    <input type="text" class="form-control" ref="inputMotherEmail">
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
                                    <input type="text" class="form-control" ref="inputMotherCompanyEmail">
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
                </b-tab>
                <b-tab title="Guardian">
                    <div class="">
                        <div class="guardianAreaDiv">
                            <div class="">
                                <h5 class="text-left student-form__title">Guardian's Personal Information</h5>
                            </div>
                            <div class="row form-group__wrapper">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>First Name</label>
                                    <input type="text" class="form-control" ref="inputGuardianFirstName"
                                           readonly="readonly">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Middle Name</label>
                                    <input type="text" class="form-control" ref="inputGuardianMiddleName"
                                           readonly="readonly">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Last Name</label>
                                    <input type="text" class="form-control" ref="inputGuardianLastName"
                                           readonly="readonly">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Date of Birth</label>
                                    <div class="date">
                                        <input type="text" class="form-control" v-model="inputGuardianDateofBirth"
                                               ref="inputGuardianDateofBirth" readonly="readonly">
                                    </div>
                                </div>

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
                                    <input type="text" class="form-control" ref="inputGuardianEmail">
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
                                    <input type="text" class="form-control" ref="inputGuardianCompanyEmail">
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
                </b-tab>
                <b-tab title="Third Party">
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
                                    <input type="text" class="form-control" ref="inputThirdPartyCompanyEmail">
                                </div>
                            </div>
                        </div>
                    </div>
                </b-tab>
                <b-tab title="Other">
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
                </b-tab>
                <b-tab title="Children" class="mb-5">
                    <div class="row form-group__wrapper">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                            <div v-if="childList.length>0">
                                <data-tables :data="childList" :action-col="actionCol_Child">
                                    <el-table-column v-for="childListInfo in childListAll" :prop="childListInfo.prop"
                                                     :label="childListInfo.label" :key="childListInfo.prop"
                                                     sortable="custom">
                                    </el-table-column>
                                </data-tables>
                            </div>
                        </div>
                    </div>
                </b-tab>
            </b-tabs>
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <!--<div class="text-center mg-b-pro-edt custom-pro-edt-ds">-->
                        <!--<button v-on:click="backToPrevious" type="button"-->
                                <!--class="btn btn-primary waves-effect waves-light m-r-10 float-left">Cancel-->
                        <!--</button>-->
                    <!--</div>-->
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div class="text-center mg-b-pro-edt custom-pro-edt-ds">
                        <button v-on:click="Update" type="button"
                                class="btn btn-primary waves-effect waves-light m-r-10">Update
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="isStaff" class="">

            <div class="profilePictureArea">
                <div class="myaccount-header_img">
                    <img src="../assets/myaccount-bg.jpg"/>
                </div>
                <div class="myaccount-profile_wrap">
                    <div class="myaccount-image_wrap">
                        <img v-bind:src="imgStaffProfile" type="file"
                             class="imgStaffProfile"/>

                        <button v-on:click="showProfileModal" type="button"
                                class=" text-center"><span>Edit Profile Photo</span>
                        </button>
                    </div>
                    <h4 class="">{{userType}}</h4>
                </div>


                <!--<button v-on:click="SaveStaff" type="button"-->
                        <!--class=" text-center"><span>Save Profile Photo</span>-->
                <!--</button>-->
                <!--<input type="file" ref="file" accept="image/*" style="display:none" @change="previewImgStaffProfile">-->
            </div>
            <div class="myaccount_form   pt-3 pb-5">
                <div class="reset_password">
                    <div class="row login-box">
                        <div class="resetlink-wrap">
                            <div class="col-md-12 mb-6 login-form col-sm-12">
                                <div class="login-header mb-5 row">
                                    <div class="col-md-10">
                                        <h4 class="mb-3 text-muted">Reset Password</h4><br/>
                                        <span>Your password needs to have at least one symbol or number, <br/>and have at least 8 characters.</span>
                                    </div>
                                </div>
                                <div class="reset-content">
                                    <form class="needs-validation" novalidate @submit.prevent="onSubmit">

                                        <div class="mb-3 form-group"
                                             :class="{ 'form-group--error': $v.oldPassword.$error }">
                                            <input type="password" class="form-control" id="oldPassword"
                                                   v-model="oldPassword"
                                                   placeholder="Old Password">
                                        </div>
                                        <div class="error" v-if="!$v.oldPassword.required">Please enter current
                                            password
                                        </div>

                                        <div class="mb-3 form-group"
                                             :class="{ 'form-group--error': $v.userPassword1.$error }">
                                            <input type="password" class="form-control" id="userPassword1"
                                                   v-model="userPassword1"
                                                   placeholder="New Password"
                                                   v-model.trim="$v.userPassword1.$model">
                                        </div>
                                        <div class="error" v-if="!$v.userPassword1.required">Password is required</div>
                                        <div class="error" v-if="!$v.userPassword1.minLength">Password must have at
                                            least 6 letters.
                                        </div>

                                        <div class="mb-3 form-group"
                                             :class="{ 'form-group--error': $v.userPassword2.$error }">
                                            <input type="password" class="form-control" id="userPassword2"
                                                   v-model="userPassword2"
                                                   placeholder="Confirm New Password"
                                                   v-model.trim="$v.userPassword2.$model">
                                        </div>
                                        <div class="error" v-if="!$v.userPassword2.required">Password is required</div>
                                        <div class="error" v-if="!$v.userPassword2.minLength">Password must have at
                                            least 6 letters.
                                        </div>

                                        <div class="system-msg"><p>{{results}}</p></div>
                                        <div class="row d-flex mt-3 mb-5">
                                            <div class="col-md-12">
                                                <button class="btn btn-primary btn-lg btn-block login-btn" type="submit"
                                                        v-show="isLoading===false">
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
                <div class="whitespace-30"></div>

            </div>
            <b-modal id="modal_uploadProfile" title="Update Profile Picture" ref="modal_uploadProfile" centered
                     hide-footer hide-header>

                <H5 class="mt-2 mb-4">PROFILE PHOTO</H5>
                <div class="myaccount-image_wrap">
                    <div class="myaccount-image_overlay" @click="uploadStaffProfileImg()"><i class="material-icons">
                        add_circle_outline
                    </i>  BROWSE</div>
                    <img v-bind:src="imgStaffProfile" type="file"
                         class="imgStaffProfile" />
                </div>
                <el-button type="primary" v-on:click="SaveStaff"  round class="mt-4 mb-2"><span>Save Profile Photo</span></el-button>
                <input type="file" ref="file" accept="image/*" style="display:none" @change="previewImgStaffProfile">

            </b-modal>
        </div>

    </div>
</template>

<script>
    import DataSource from "../data/datasource";
    import {required, minLength} from "vuelidate/lib/validators";
    import Cookies from "js-cookie";
    import ProfileImg from "../assets/boy.png";

    export default {
        name: "MyAccount",
        data() {
            return {
                userType:"",
                isStaff: '',
                imgStaffProfile: '',

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

                inputFatherFirstName: '',
                inputFatherLastName: '',
                inputMotherFirstName: '',
                inputMotherLastName: '',
                inputFatherDateofBirth: '',
                inputFatherIdentificationNoExpiryDate: '',
                inputMotherDateofBirth: '',
                inputMotherIdentificationNoExpiryDate: '',
                inputGuardianDateofBirth: '',
                ddlFatherReligion: '',
                ddlMotherReligion: '',
                ddlGuardianReligion: '',
                ddlFatherIdentificationType: '',
                ddlMotherIdentificationType: '',
                ddlGuardianIdentificationType: '',
                ddlFatherEmploymentStatus: '',
                ddlMotherEmploymentStatus: '',
                ddlGuardianEmploymentStatus: '',
                inputFatherWorkingCommencementDate: '',
                inputMotherWorkingCommencementDate: '',
                inputGuardianWorkingCommencementDate: '',
                lblParentID: '',

                //reset password
                results: "",
                oldPassword: "",
                userPassword1: "",
                userPassword2: "",
                isLoading: false,
                //end:reset password

                staffProPicLoop: '',

                childList: [],
                childListAll: [{
                    prop: "StudentName",
                    label: "Student Name"
                },],
                actionCol_Child: {
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
                            //window.location.replace('/MyChild?id=' + row.Student_ID);

                            this.$router.push({
                                name: 'My Child',
                                params: {
                                    studentID: row.Student_ID
                                }
                            });
                        },
                        label: 'Edit'
                    }]
                },
            };
        },
        validations: {
            //reset password
            newPassword: '',
            oldPassword: {},
            userPassword1: {
                required,
                minLength: minLength(6)
            },
            userPassword2: {
                required,
                minLength: minLength(6)
            },
        },
        async created() {
            this.imgStaffProfile = ProfileImg;

            if (Cookies.get('userTypeSession') === 'Parent') {
                this.isStaff = false;

                await this.BindCountryList();
                await this.BindParentDropdown();
                await this.LoadParentInfo();
                await this.BindChildList();
            } else {
                this.isStaff = true;
                await this.LoadProfileImg();
            }
        },
        async mounted() {
                this.userType = Cookies.get('userTypeSession');
        },
        methods: {
            showProfileModal(){
                this.$refs.modal_uploadProfile.show();
            },
            backToPrevious() {
                window.location.replace("/MyAccount");
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
            async BindParentDropdown() {
                try {
                    let jsonString = '"Religion":"Religion"';
                    jsonString = jsonString + ',"ParentID":"ParentID"';
                    jsonString = jsonString + ',"EmpStatus":"EmpStatus"';
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
                            }
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async LoadParentInfo() {
                try {
                    if (Cookies.get('userIDSession') !== null || Cookies.get('userIDSession') !== undefined) {
                        this.lblParentID = Cookies.get('userIDSession');

                        const response = await DataSource.shared.getParent(Cookies.get('userIDSession'), "", "");
                        if (response) {
                            if (response.code === "2") {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'No record found'
                                });
                            } else if (response.code === "99") {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Please try again later'
                                });
                            } else {
                                this.BindParentFields(response.Table);
                            }
                        }
                    } else {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Error! Please search again.'
                        });
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
                        if (m.PAR_Father_DOB_convert !== '01/01/1901') {
                            this.inputFatherDateofBirth = m.PAR_Father_DOB_convert;
                        }
                        ;
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
                            this.$refs.inputFatherEmail.value = m.PAR_Father_Email;
                        }
                        ;
                        if (m.PAR_Fat_Nationality !== undefined) {
                            this.$refs.ddlFatherNationality.value = m.PAR_Fat_Nationality;
                        }
                        ;
                        this.ddlFatherReligion = m.PAR_FatReligion;
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
                            this.$refs.inputFatherCompanyEmail.value = m.PAR_FComp_Email;
                        }
                        if (m.PAR_Father_WorkingCommencementDate_convert !== '01/01/1901') {
                            this.inputFatherWorkingCommencementDate = m.PAR_Father_WorkingCommencementDate_convert;
                        }
                        ;
                        //father

                        //mother
                        this.inputMotherFirstName = m.PAR_Mother_FirstName;
                        if (m.PAR_Mother_MiddleName !== undefined) {
                            this.$refs.inputMotherMiddleName.value = m.PAR_Mother_MiddleName;
                        }
                        ;
                        this.inputMotherLastName = m.PAR_Mother_LastName;
                        if (m.PAR_Mother_DOB_convert !== '01/01/1901') {
                            this.inputMotherDateofBirth = m.PAR_Mother_DOB_convert;
                        }
                        ;
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
                            this.$refs.inputMotherEmail.value = m.PAR_Mother_Email;
                        }
                        ;
                        if (m.PAR_Mot_Nationality !== undefined) {
                            this.$refs.ddlMotherNationality.value = m.PAR_Mot_Nationality;
                        }
                        ;
                        if (m.PAR_MotReligion !== undefined) {
                            this.$refs.ddlMotherReligion = m.PAR_MotReligion;
                        }
                        ;
                        // if (m.PAR_MotRemarks !== undefined) {
                        //     this.$refs.inputMotherRemarks.value = m.PAR_MotRemarks;
                        // }
                        ;
                        if (m.PAR_Mother_IDType !== undefined) {
                            this.$refs.ddlMotherIdentificationType = m.PAR_Mother_IDType;
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
                            this.$refs.inputMotherCompanyEmail.value = m.PAR_MComp_Email;
                        }
                        if (m.PAR_Mother_WorkingCommencementDate_convert !== '01/01/1901') {
                            this.inputMotherWorkingCommencementDate = m.PAR_Mother_WorkingCommencementDate_convert;
                        }
                        ;
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
                        if (m.PAR_Guardian_DOB_convert !== '01/01/1901') {
                            this.inputGuardianDateofBirth = m.PAR_Guardian_DOB_convert;
                        }
                        ;
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
                            this.$refs.inputGuardianEmail.value = m.PAR_Guardian_Email;
                        }
                        ;
                        if (m.PAR_Gar_Nationality !== undefined) {
                            this.$refs.ddlGuardianNationality.value = m.PAR_Gar_Nationality;
                        }
                        ;
                        this.ddlGuardianReligion = m.PAR_GarReligion;
                        // if (m.PAR_GarRemarks !== undefined) {
                        //     this.$refs.inputGuardianRemarks.value = m.PAR_GarRemarks;
                        // }
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
                            this.$refs.inputGuardianCompanyEmail.value = m.PAR_GComp_Email;
                        }
                        if (m.PAR_Guardian_WorkingCommencementDate_convert !== '01/01/1901') {
                            this.inputGuardianWorkingCommencementDate = m.PAR_Guardian_WorkingCommencementDate_convert;
                        }
                        ;
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
                            this.$refs.inputThirdPartyCompanyEmail.value = m.PAR_TPComp_Email;
                        }
                        ;
                        //third party
                    });
                } catch (e) {
                    this.results = e;
                }
            },
            async BindChildList() {
                try {
                    if (Cookies.get('userIDSession') !== null || Cookies.get('userIDSession') !== undefined) {
                        const relRes = await DataSource.shared.getRelationshipByParentID(Cookies.get('userIDSession'));
                        if (relRes) {
                            if (relRes.code === '88') {
                                window.location.replace('/');
                            } else if (relRes.code === '99') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Error!'
                                });
                            } else {
                                if (relRes) {
                                    this.childList = relRes.Table;
                                }

                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async LoadProfileImg() {
                try {
                    const staffProPic = await DataSource.shared.getStaffProfileImage();
                    if (staffProPic) {
                        if (staffProPic.code !== '2' && staffProPic.code !== '88' && staffProPic.code !== '99') {
                            let image64String = this.ConvertBase64StringToImage(staffProPic.Table[0]);
                            image64String !== '' ? this.imgStaffProfile = image64String : '';
                        }
                    }
                } catch (e) {
                    this.result = e;
                }
            },
            async Update() {
                try {
                    this.lblParentID;
                    if (this.lblParentID != '') {
                        let jsonString = '"PAR_Fat_Emp_Status":"' + this.ddlFatherEmploymentStatus + '"';
                        jsonString = jsonString + ',"PAR_Father_Occupation":"' + this.$refs.inputFatherOccupation.value + '"';
                        jsonString = jsonString + ',"PAR_Father_Designation":"' + this.$refs.inputFatherDesignation.value + '"';
                        jsonString = jsonString + ',"PAR_FatResContact":"' + this.$refs.inputFatherHomeTelNo.value + '"';
                        jsonString = jsonString + ',"PAR_FatOffContact":"' + this.$refs.inputFatherOfficeTelNo.value + '"';
                        jsonString = jsonString + ',"PAR_Father_Fax":"' + this.$refs.inputFatherFax.value + '"';
                        jsonString = jsonString + ',"PAR_Father_Phone":"' + this.$refs.inputFatherMobileNo.value + '"';
                        jsonString = jsonString + ',"PAR_Father_Email":"' + this.$refs.inputFatherEmail.value + '"';
                        jsonString = jsonString + ',"PAR_Fat_Nationality":"' + this.$refs.ddlFatherNationality.value + '"';
                        jsonString = jsonString + ',"PAR_FatReligion":"' + this.ddlFatherReligion + '"';
                        jsonString = jsonString + ',"PAR_Father_IDType":"' + this.ddlFatherIdentificationType + '"';
                        jsonString = jsonString + ',"PAR_Father_UID":"' + this.$refs.inputFatherIdentificationNo.value + '"';
                        jsonString = jsonString + ',"PAR_Father_IDExpDate":"' + this.inputFatherIdentificationNoExpiryDate + '"';
                        if (this.$refs.cbFatherShareMyEmail.checked == true) {
                            jsonString = jsonString + ',"PAR_ShareMyContact":"Yes"';
                        } else {
                            jsonString = jsonString + ',"PAR_ShareMyContact":"No"';
                        }
                        if (this.$refs.cbFatherShareMyMobileNumber.checked == true) {
                            jsonString = jsonString + ',"PAR_ShareMyMobile":"Yes"';
                        } else {
                            jsonString = jsonString + ',"PAR_ShareMyMobile":"No"';
                        }
                        jsonString = jsonString + ',"PAR_Father_Loc_Residence_No":"' + this.$refs.inputFatherAddress1.value + '"';
                        jsonString = jsonString + ',"PAR_Father_Loc_Address1":"' + this.$refs.inputFatherAddress2.value + '"';
                        jsonString = jsonString + ',"PAR_Father_Loc_Address2":"' + this.$refs.inputFatherAddress3.value + '"';
                        jsonString = jsonString + ',"PAR_Father_Loc_City":"' + this.$refs.inputFatherCity.value + '"';
                        jsonString = jsonString + ',"PAR_Father_Loc_Country":"' + this.$refs.ddlFatherCountry.value + '"';
                        jsonString = jsonString + ',"PAR_Father_Loc_Postalcode":"' + this.$refs.inputFatherPostalCode.value + '"';
                        jsonString = jsonString + ',"PAR_Father_CompanyName":"' + this.$refs.inputFatherCompanyName.value + '"';
                        jsonString = jsonString + ',"PAR_Fat_Comp_Addressee":"' + this.$refs.inputFatherCompanyAddresseeName.value + '"';
                        jsonString = jsonString + ',"PAR_Father_Residence_No":"' + this.$refs.inputFatherCompanyAddress1.value + '"';
                        jsonString = jsonString + ',"PAR_Father_Address1":"' + this.$refs.inputFatherCompanyAddress2.value + '"';
                        jsonString = jsonString + ',"PAR_Father_Address2":"' + this.$refs.inputFatherCompanyAddress3.value + '"';
                        jsonString = jsonString + ',"PAR_Father_City":"' + this.$refs.inputFatherCompanyCity.value + '"';
                        jsonString = jsonString + ',"PAR_Father_Country":"' + this.$refs.ddlFatherCompanyCountry.value + '"';
                        jsonString = jsonString + ',"PAR_Father_PostalCode":"' + this.$refs.inputFatherCompanyPostalCode.value + '"';
                        jsonString = jsonString + ',"PAR_FComp_Email":"' + this.$refs.inputFatherCompanyEmail.value + '"';
                        jsonString = jsonString + ',"PAR_Mot_Emp_Status":"' + this.ddlMotherEmploymentStatus + '"';
                        jsonString = jsonString + ',"PAR_Mother_Occupation":"' + this.$refs.inputMotherOccupation.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_Designation":"' + this.$refs.inputMotherDesignation.value + '"';
                        jsonString = jsonString + ',"PAR_MotResContact":"' + this.$refs.inputMotherHomeTelNo.value + '"';
                        jsonString = jsonString + ',"PAR_MotOffContact":"' + this.$refs.inputMotherOfficeTelNo.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_Fax":"' + this.$refs.inputMotherFax.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_Phone":"' + this.$refs.inputMotherMobileNo.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_Email":"' + this.$refs.inputMotherEmail.value + '"';
                        jsonString = jsonString + ',"PAR_Mot_Nationality":"' + this.$refs.ddlMotherNationality.value + '"';
                        jsonString = jsonString + ',"PAR_MotReligion":"' + this.ddlMotherReligion + '"';
                        jsonString = jsonString + ',"PAR_Mother_IDType":"' + this.ddlMotherIdentificationType + '"';
                        jsonString = jsonString + ',"PAR_Mother_UID":"' + this.$refs.inputMotherIdentificationNo.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_IDExpDate":"' + this.inputMotherIdentificationNoExpiryDate + '"';
                        jsonString = jsonString + ',"PAR_Mother_Loc_Residence_No":"' + this.$refs.inputMotherAddress1.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_Loc_Address1":"' + this.$refs.inputMotherAddress2.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_Loc_Address2":"' + this.$refs.inputMotherAddress3.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_Loc_City":"' + this.$refs.inputMotherCity.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_Loc_Country":"' + this.$refs.ddlMotherCountry.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_Loc_Postalcode":"' + this.$refs.inputMotherPostalCode.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_CompanyName":"' + this.$refs.inputMotherCompanyName.value + '"';
                        jsonString = jsonString + ',"PAR_Mot_Comp_Addressee":"' + this.$refs.inputMotherCompanyAddresseeName.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_Residence_No":"' + this.$refs.inputMotherCompanyAddress1.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_Address1":"' + this.$refs.inputMotherCompanyAddress2.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_Address2":"' + this.$refs.inputMotherCompanyAddress3.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_City":"' + this.$refs.inputMotherCompanyCity.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_Country":"' + this.$refs.ddlMotherCompanyCountry.value + '"';
                        jsonString = jsonString + ',"PAR_Mother_PostalCode":"' + this.$refs.inputMotherCompanyPostalCode.value + '"';
                        jsonString = jsonString + ',"PAR_MComp_Email":"' + this.$refs.inputMotherCompanyEmail.value + '"';
                        jsonString = jsonString + ',"PAR_Gar_Emp_Status":"' + this.ddlGuardianEmploymentStatus + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Occupation":"' + this.$refs.inputGuardianOccupation.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Designation":"' + this.$refs.inputGuardianDesignation.value + '"';
                        jsonString = jsonString + ',"PAR_GarResContact":"' + this.$refs.inputGuardianHomeTelNo.value + '"';
                        jsonString = jsonString + ',"PAR_GarOffContact":"' + this.$refs.inputGuardianOfficeTelNo.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Fax":"' + this.$refs.inputGuardianFax.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Phone":"' + this.$refs.inputGuardianMobileNo.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Email":"' + this.$refs.inputGuardianEmail.value + '"';
                        jsonString = jsonString + ',"PAR_Gar_Nationality":"' + this.$refs.ddlGuardianNationality.value + '"';
                        jsonString = jsonString + ',"PAR_GarReligion":"' + this.ddlGuardianReligion + '"';
                        jsonString = jsonString + ',"PAR_Guardian_IDType":"' + this.ddlGuardianIdentificationType + '"';
                        jsonString = jsonString + ',"PAR_Guardian_UID":"' + this.$refs.inputGuardianIdentificationNo.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Loc_Residence_No":"' + this.$refs.inputGuardianAddress1.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Loc_Address1":"' + this.$refs.inputGuardianAddress2.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Loc_Address2":"' + this.$refs.inputGuardianAddress3.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Loc_City":"' + this.$refs.inputGuardianCity.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Loc_Country":"' + this.$refs.ddlGuardianCountry.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Loc_PostalCode":"' + this.$refs.inputGuardianPostalCode.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_CompanyName":"' + this.$refs.inputGuardianCompanyName.value + '"';
                        jsonString = jsonString + ',"PAR_Gar_Comp_Addressee":"' + this.$refs.inputGuardianCompanyAddresseeName.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Residence_No":"' + this.$refs.inputGuardianCompanyAddress1.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Address1":"' + this.$refs.inputGuardianCompanyAddress2.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Address2":"' + this.$refs.inputGuardianCompanyAddress3.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_City":"' + this.$refs.inputGuardianCompanyCity.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Country":"' + this.$refs.ddlGuardianCompanyCountry.value + '"';
                        jsonString = jsonString + ',"PAR_Guardian_Postalcode":"' + this.$refs.inputGuardianCompanyPostalCode.value + '"';
                        jsonString = jsonString + ',"PAR_GComp_Email":"' + this.$refs.inputGuardianCompanyEmail.value + '"';
                        jsonString = jsonString + ',"PAR_TPComp":"' + this.$refs.inputThirdPartyCompanyName.value + '"';
                        jsonString = jsonString + ',"PAR_Fat_TP_Addressee":"' + this.$refs.inputThirdPartyAddresseeName.value + '"';
                        jsonString = jsonString + ',"PAR_TPAddr1":"' + this.$refs.inputThirdPartyAddress1.value + '"';
                        jsonString = jsonString + ',"PAR_TPAddr2":"' + this.$refs.inputThirdPartyAddress2.value + '"';
                        jsonString = jsonString + ',"PAR_TPAddr3":"' + this.$refs.inputThirdPartyAddress3.value + '"';
                        jsonString = jsonString + ',"PAR_TPCity":"' + this.$refs.inputThirdPartyCity.value + '"';
                        jsonString = jsonString + ',"PAR_TPCountry":"' + this.$refs.inputThirdPartyCountry.value + '"';
                        jsonString = jsonString + ',"PAR_TPPin":"' + this.$refs.inputThirdPartyPostalCode.value + '"';
                        jsonString = jsonString + ',"PAR_TPComp_Email":"' + this.$refs.inputThirdPartyCompanyEmail.value + '"';
                        if (this.inputFatherWorkingCommencementDate !== undefined && this.inputFatherWorkingCommencementDate !== null) {
                            jsonString = jsonString + ',"PAR_Father_WorkingCommencementDate":"' + this.inputFatherWorkingCommencementDate + '"';
                        };
                        if (this.inputMotherWorkingCommencementDate !== undefined && this.inputMotherWorkingCommencementDate !== null) {
                            jsonString = jsonString + ',"PAR_Mother_WorkingCommencementDate":"' + this.inputMotherWorkingCommencementDate + '"';
                        };
                        if (this.inputGuardianWorkingCommencementDate !== undefined && this.inputGuardianWorkingCommencementDate !== null) {
                            jsonString = jsonString + ',"PAR_Guardian_WorkingCommencementDate":"' + this.inputGuardianWorkingCommencementDate + '"';
                        };

                        jsonString = '{ ' + jsonString + ' }';

                        const response = await DataSource.shared.updateParent(this.lblParentID, jsonString);
                        if (response) {
                            if (response.code == "1") {
                                this.$notify({
                                    title: 'Success',
                                    message: 'Records Successfully Edited',
                                    type: 'success'
                                });
                                setTimeout(() => window.location.replace('MyAccount'), 500);

                            } else {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Update Parent Error - Please try again later'
                                });
                            }
                        }
                    } else {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Error! Please search again.'
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async uploadStaffProfileImg() {
                try {
                    this.$refs.file.click();
                } catch (e) {
                    this.results = e;
                }
            },
            previewImgStaffProfile: function (event) {
                try {
                    var input = event.target;
                    if (input.files && input.files[0]) {
                        var reader = new FileReader();
                        reader.onload = (e) => {
                            this.imgStaffProfile = e.target.result;
                        };
                        reader.readAsDataURL(input.files[0]);
                        this.selectedFile = event.target.files;
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async SaveStaff() {
                const response = await DataSource.shared.saveStaffProfileImage(this.selectedFile);
                if (response) {
                    if (response.code === '88') {
                        window.location.replace('/');
                    } else if (response.code === "1") {
                        this.$notify({
                            title: 'Success',
                            message: 'Records Successfully Saved',
                            type: 'success'
                        });
                        window.location.replace('/MyAccount');
                    } else {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Save Staff Error - Please try again later'
                        });
                    }
                }
            },
            ConvertBase64StringToImage(file) {
                if (this.isImage(file))
                    return "data:" + file.UPPImageFileType + ";base64," + file.UPPImage;
                else
                    return '';
            },
            isImage(obj_File) {
                let ext = String(obj_File.UPPImageFileExt).toUpperCase();
                let isImage = false;

                switch (ext) {
                    case ".PNG":
                    case ".JPG":
                    case ".BMP":
                    case ".GIF":
                        isImage = true;
                        break;
                    default:
                        isImage = false;
                        break;
                }
                return isImage;
            },
            async onSubmit() {
                try {
                    //if old password doesnt match
                    if (this.oldPassword === null || this.userPassword1 === null || this.userPassword2 === null) {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please fill in all field'
                        });
                    } else if(this.userPassword1 !== this.userPassword2) {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Password not match'
                        });
                    } else {
                        this.isLoading = true;
                        const response = await DataSource.shared.resetPasswordByPassword(this.oldPassword, this.userPassword1);
                        this.isLoading = false;
                        if (response) {
                            switch (response.code) {
                                case "1":
                                    this.$notify({
                                        title: 'Success',
                                        message: 'Password Reset',
                                        type: 'success'
                                    });
                                    window.location.replace("/MyAccount");
                                    // this.results = `Password Reset`;
                                    break;
                                case "2":
                                    this.$notify.error({
                                        title: 'Error',
                                        message: 'Current password wrong'
                                    });
                                    // this.results = `Current password wrong`;
                                    break;
                                case "88":
                                    window.location.replace("/");
                                    break;
                                case "99":
                                    this.$notify.error({
                                        title: 'Error',
                                        message: 'Please fill in all field'
                                    });
                                    break;
                            }
                        }
                    }

                } catch (e) {
                    this.results = e;
                    this.isLoading = false;
                }
            },
        },
    };
</script>

<style scoped>
    .fatherAreaDiv, .motherAreaDiv, .guardianAreaDiv, .thirdpartyAreaDiv, .otherAreaDiv {
        margin-bottom: 50px;
    }

    .el-date-editor, .el-input {
        width: 100% !important;
    }

    .imgStaffProfile:hover {
        cursor: pointer;
    }

    .imgStaffProfile {
        width: 200px;
        height: auto;
        background-color: #ffffff;
        /*margin-top: 16px;*/
    }
</style>
