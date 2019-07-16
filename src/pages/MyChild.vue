<template>
    <div id="myChild">
        <div class="datatable-edit__header">
            <div class="container">
                <h3>Child Details</h3>
            </div>
        </div>
        <div class="profilePictureArea form-group">
            <div class=" container ">
                <div class="profile_wrap">
                    <img v-bind:src="imgStudentProfile" type="file" @click="uploadStudentProfileImg()"
                         class="imgStudentProfile"/>
                    <span>{{inputStudentFirstName}}</span>
                    <small class="parent_wrap" @click="backPrevious()">Back</small>
                </div>
            </div>
            <input type="file" ref="file" accept="image/*" style="display:none" @change="previewImgStudentProfile">
        </div>

        <div class="mt-3 container">
            <b-tabs class="studentPageBTabs">
                <b-tab title="Student" active>
                    <div class=" form-group ">
                        <div class="studentAreaDiv">
                            <div class="">
                                <h5 class="text-left student-form__title">Children Information</h5>
                            </div>
                            <div class="row form-group__wrapper">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>First Name</label>
                                    <input type="text" class="form-control form__input" v-model="inputStudentFirstName"
                                           readonly="readonly">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Middle Name</label>
                                    <input type="text" class="form-control" v-model="inputStudentMiddleName"
                                           readonly="readonly">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Last Name</label>
                                    <input type="text" class="form-control" v-model="inputStudentLastName"
                                           readonly="readonly">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Preferred Name</label>
                                    <input type="text" class="form-control" v-model="inputStudentPreferredName">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Nationality</label>
                                    <input type="text" class="form-control" v-model="ddlStudentNationality" readonly="readonly">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Gender</label>
                                    <input type="text" class="form-control" v-model="ddlStudentGender"
                                           readonly="readonly">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Date of Birth</label>
                                    <div class="date">
                                        <input type="text" class="form-control" v-model="inputStudentDateOfBirth"
                                               readonly="readonly">
                                    </div>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Birth Place</label>
                                    <input type="text" class="form-control" v-model="ddlStudentBirthPlace"
                                           readonly="readonly">
                                </div>

                                <div v-if="finShowHide" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Fin</label>
                                    <input type="text" class="form-control" v-model="inputStudentIdentificationNo">
                                </div>

                                <div v-if="finShowHide" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Fin Expiry Date</label>
                                    <div class="date">
                                        <el-date-picker v-model="inputStudentIdentificationExpiryDate"
                                                        format="dd/MM/yyyy"
                                                        value-format="dd/MM/yyyy" type="date" placeholder="Pick a day"></el-date-picker>
                                    </div>
                                </div>

                                <div v-if="birthcertShowHide" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Birth Certificate</label>
                                    <input type="text" class="form-control" v-model="inputStudentBirthCertificate">
                                </div>

                                <div v-if="icShowHide" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>IC</label>
                                    <input type="text" class="form-control" v-model="inputStudentIC">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Passport</label>
                                    <input type="text" class="form-control" v-model="inputStudentPassport">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Passport Expiry Date</label>
                                    <div class="date">
                                        <el-date-picker v-model="inputStudentPassportExpiryDate" format="dd/MM/yyyy"
                                                        value-format="dd/MM/yyyy" type="date" placeholder="Pick a day"></el-date-picker>
                                    </div>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Other Identification</label>
                                    <input type="text" class="form-control" v-model="inputStudentOtherIdentification">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Religion</label>
                                    <select v-model="ddlStudentReligion"
                                            class="form-control pro-edt-select form-control-primary">
                                        <!--<option v-for="item in ddlStudentReligionList" v-bind:value="{ id: item.OPTvalue.trim(), text: item.OPTvalue.trim() }">{{ item.OPTvalue.trim() }}</option>-->
                                        <option v-for="item in ddlStudentReligionList"
                                                v-bind:value="item.OPTvalue.trim()">
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
                                    <label>Payer</label>
                                    <select v-model="ddlStudentPayer"
                                    class="form-control pro-edt-select form-control-primary">
                                    <option v-for="item in ddlStudentPayerList" v-bind:value="item.OPTvalue.trim()">
                                    {{
                                    item.OPTvalue.trim() }}
                                    </option>
                                    </select>
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Student ID</label>
                                    <input type="text" class="form-control" v-model="inputStudentID"
                                           readonly="readonly">
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
                                    <data-tables :data="medicationAllergiesListInt" :action-col="medicationAllergiesListAcion">
                                        <el-table-column v-for="medicationAllergiesListInfo in medicationAllergiesList" :prop="medicationAllergiesListInfo.prop"
                                                         :label="medicationAllergiesListInfo.label" :key="medicationAllergiesListInfo.prop"
                                                         sortable="custom">
                                        </el-table-column>
                                    </data-tables>
                                </div>
                            </div>

                            <div class="row form-group__wrapper">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Medication</label>
                                    <input type="text" class="form-control" v-model="inputStudentMedicationAllergiesMedication">
                                </div>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Remarks</label>
                                    <input type="text" class="form-control" v-model="inputStudentMedicationAllergiesRemarks">
                                </div>
                            </div>

                            <button class="btn btn-primary waves-effect waves-light m-r-10" v-on:click="addMedicationAllergiesList()">
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
                                        <el-table-column v-for="foodAllergiesListInfo in foodAllergiesList" :prop="foodAllergiesListInfo.prop"
                                                         :label="foodAllergiesListInfo.label" :key="foodAllergiesListInfo.prop"
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

                            <button class="btn btn-primary waves-effect waves-light m-r-10" v-on:click="addFoodAllergiesList()">
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
            </b-tabs>
        </div>
        <br>
        <div>
            <button type="button" v-on:click="Update" class="btn btn-primary waves-effect waves-light m-r-10">Update</button>
        </div>
        <div class="whitespace-30"></div>

    </div>
</template>
<script>
    import DataSource from "../data/datasource";
    import {required, requiredIf, requiredUnless} from "vuelidate/lib/validators";
    import ProfileImg from "../assets/boy.png";
    const API_HOST = process.env.VUE_APP_ROOT_API;
    export default {
            name:'MyChild',
        async created(){
            if (this.$route.params.studentID === '' || this.$route.params.studentID === null || this.$route.params.studentID === undefined){
                window.location.replace('/MyAccount');
            }
        },
        async mounted(){
                this.LoadStudentInfo();
                this.BindCountryList();
                this.BindStudentDropdown();
        },
        data(){
                return{
                    studentID:'',
                    imgStudentProfile: '',
                    inputStudentFirstName: '',
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

                    arrayStudentIDLevelComponent:[],
                    strClassIDLevelComponent: '',

                    inputStudentDateOfBirth: '',
                    inputFatherDateofBirth: '',
                    inputStudentIdentificationExpiryDate: '',
                    inputFirstCommencementDate: '',
                    inputFatherIdentificationNoExpiryDate: '',
                    inputMotherDateofBirth: '',
                    inputMotherIdentificationNoExpiryDate: '',
                    ddlStudentGender: '',
                    inputStudentMiddleName: '',
                    inputStudentLastName: '',
                    inputStudentPreferredName: '',
                    ddlStudentNationality: '',
                    ddlStudentBirthPlace: '',
                    inputStudentIdentificationNo: '',
                    inputStudent1stEmergencyContact: '',
                    inputStudent2ndEmergencyContact: '',
                    inputStudent1stEmergencyContactNo: '',
                    inputStudent2ndEmergencyContactNo: '',
                    inputStudent1stEmergencyContactRelation: '',
                    inputStudent2ndEmergencyContactRelation: '',
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
                    ddlCopyAddToResBil: '',
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
                    finShowHide: '',
                    birthcertShowHide: '',
                    icShowHide: '',
                    stuCorAddCopy: '',
                    resBilAddCopy: '',

                    siblingTab: '',
                    changeStatusAction: '',
                    levelTab: '',

                    //student medical allergies list
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
                                this.medicationAllergiesListInt.splice(this.medicationAllergiesListInt.indexOf(row), 1)
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
                                this.foodAllergiesListInt.splice(this.foodAllergiesListInt.indexOf(row), 1)
                            },
                            label: 'Delete'
                        }]
                    },
                    ddlddlStudentFoodAllergiesFoodList: [],
                    ddlStudentFoodAllergiesFood: '',
                    inputStudentFoodAllergiesRemarks: '',
                    inputStudentMedicationAllergiesMedication: '',
                    inputStudentMedicationAllergiesRemarks: '',
                };
        },
        methods:{
            backPrevious(){
                    this.$router.go(-1);
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
            async LoadStudentInfo(){
                try{
                    let studentID ='';
                    studentID = this.$route.params.studentID;
                    this.studentID = studentID;
                    const responce = await DataSource.shared.getStudentParentView(this.$route.params.studentID);
                    if(responce){
                        if(responce.code==='88'){
                            this.$notify.error({
                                title: 'Error',
                                message: 'Error'
                            });
                        }else{
                            this.BindStudentFields(responce.Table);
                        }
                    }
                    const stuProPic = await DataSource.shared.getStudentProfilePicture(this.$route.params.studentID);
                    if (stuProPic) {
                        if (stuProPic.code === '88') {
                            window.location.replace('/');
                        } else {
                            if (stuProPic.code !== "2" && stuProPic.code !== "99") {
                                this.stuProPicLoop = stuProPic.Table;
                                this.stuProPicLoop.forEach(m => {
                                    this.imgStudentProfile = API_HOST + '/db/Files/' + m.SF_File_Name;
                                });
                            }
                        }
                    }
                    const alleRes = await DataSource.shared.getStudentAllergies(this.$route.params.studentID, '');
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
                }
                catch(e){
                    this.result = e;
                }
            },
            async BindStudentFields(resultTable) {
                try {
                    resultTable.forEach(m => {
                        this.lblCurrentStatus = m.Status;
                        this.lblStudentIndexNo = m.Index_No;
                        this.inputStudentID = m.Index_No;
                        this.inputStudentFirstName = m.Full_Name;
                        this.inputFatherFirstName = m.PAR_Father_FirstName;
                        this.inputMotherFirstName = m.PAR_Mother_FirstName;
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
                        this.ddlStudentReligion = m.St_Religion;
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

                        this.inputStudent1stEmergencyContact = m.St_EmergencyContact;
                        this.inputStudent1stEmergencyContactRelation = m.St_EmergencyContactRelation;
                        this.inputStudent2ndEmergencyContact = m.St_2ndEmergencyContact;
                        this.inputStudent2ndEmergencyContactRelation = m.St_2ndEmergencyContactRelation;

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
                        this.inputStudentOtherIdentification = m.St_Identification_Others;
                    });
                } catch (e) {
                    this.results = e;
                }
            },
            async BindCountryList() {
                try {
                    const response = await DataSource.shared.getCountryList();
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        }
                        else {
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
                    let jsonString = '"Religion":"Religion"';
                    jsonString = jsonString + ',"Mother Tongue":"Mother Tongue"';
                    jsonString = jsonString + ',"Meal Preferences":"Meal Preferences"';
                    jsonString = jsonString + ',"Student Membership":"Student Membership"';
                    jsonString = jsonString + ',"Residency Status":"Residency Status"';
                    jsonString = jsonString + ',"Sponsorship Type":"Sponsorship Type"';
                    jsonString = jsonString + ',"ParentID":"ParentID"';
                    jsonString = jsonString + ',"Food Allergies":"Food Allergies"';
                    jsonString = jsonString + ',"Parent Mode":"Parent Mode"';
                    jsonString = "{" + jsonString + "}";

                    const response = await DataSource.shared.getStudentDropDownList(jsonString);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        }
                        else {
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
                                } else if (m.OGPname.trim() === 'Food Allergies') {
                                    this.ddlddlStudentFoodAllergiesFoodList.push(m);
                                } else if (m.OGPname.trim() === 'Parent Mode') {
                                    this.ddlParentModeList.push(m);
                                }
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
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please fill in all * fields & at least one of ** field'
                        });
                        return;
                    }
                    this.Save();
                } catch (e) {
                    this.results = e;
                }
            },
            async Update() {
                try{
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
                    jsonString = jsonString + ',"Family_Doctor":"' + this.inputNameofFamilyDoctor + '"';
                    jsonString = jsonString + ',"Ailments":"' + this.taMajorAilmentsList + '"';
                    jsonString = jsonString + ',"medication_allergic_to":"' + this.taMedicationAllergiesList + '"';
                    jsonString = jsonString + ',"BLD_grp":"' + this.inputBloodGroup + '"';
                    jsonString = jsonString + ',"BLD_donor_no":"' + this.inputBloodDonorNo + '"';
                    jsonString = jsonString + ',"clinic_add":"' + this.inputClinicAddress + '"';
                    jsonString = jsonString + ',"clinic_ph_no":"' + this.inputClinicPhoneNo + '"';
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

                    jsonString = jsonString + ',"St_EmergencyContact":"' + this.inputStudent1stEmergencyContact + '"';
                    jsonString = jsonString + ',"St_EmergencyContactRelation":"' + this.inputStudent1stEmergencyContactRelation + '"';
                    jsonString = jsonString + ',"St_2ndEmergencyContact":"' + this.inputStudent2ndEmergencyContact + '"';
                    jsonString = jsonString + ',"St_2ndEmergencyContactRelation":"' + this.inputStudent2ndEmergencyContactRelation + '"';
                    //students

                    jsonString = '{ ' + jsonString + ' }';
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

                    const saveStuRes = await DataSource.shared.updateStudent(this.selectedFile, this.studentID, jsonString, JSON.stringify(allergiesList));
                    if (saveStuRes) {
                        if (saveStuRes.code === '88') {
                           // window.location.replace('/');
                        }
                        else if (saveStuRes.code === "1") {
                            this.$notify({
                                title: 'Success',
                                message: 'Records Successfully Saved',
                                type: 'success'
                            });
                           // window.location.replace('/MyAccount');
                        } else {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Update Error - Please try again later'
                            });
                            // window.location.replace('/MyAccount');
                        }
                    }
                }
                catch(e){

                }

            },
            addMedicationAllergiesList () {
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
            addFoodAllergiesList () {
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
        }
    }
</script>
<style scoped>

    .studentPageBTabs{
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
        background-color: white;
        text-align: left;
        padding: 0px;
    }

    .ddlChangeStatusTo, .lblChangeStatusTo, .btnChangeStatus {
        width: auto;
        display: inline !important;
        margin: 10px;
    }

    .imgStudentProfile:hover {
        cursor: pointer;
    }

    .imgStudentProfile {
        /*width: 300px;*/
        /*height: 300px;*/
        width: 200px;
        height: auto;
        border-radius: 100%;
        background-color: #ffffff;
        margin-top: 16px;
    }

    .profilePictureArea {
        text-align: left;    position: relative;
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
        align-items: center;    position: relative;
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

    .ttStuCorAddCopy{
        text-align: left;
    }

    .ttStuCorAddCopy .ttnStuCorAddCopy{
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

    .ttStuCorAddCopy:hover .ttnStuCorAddCopy{
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