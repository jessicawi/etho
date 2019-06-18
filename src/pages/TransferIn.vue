<template>
    <div id="transferin">
        <div class="container">
            <div class="row header mb-2">
                <div class="col-lg-3 ">
                    <h3 class="text-left mb-3">
                        {{$route.name}}
                    </h3>
                </div>
                <div class="search-wrap">
                    <el-input placeholder="Search for..." v-model="search" @change="searchInputChange" ></el-input>
                </div>
                <div class="col-lg-3">
                    <!--<router-link :to="{name: 'Student List'}">-->
                        <!--<el-button type="primary" round-->
                                   <!--class="float-right large-btn classManage-filter"><i-->
                                <!--class="material-icons">-->
                            <!--swap_horiz-->
                        <!--</i> Transfer More-->
                        <!--</el-button>-->
                    <!--</router-link>-->
                </div>
            </div>
            <div class="empty-list_image" v-if="transferInListInt&&transferInListInt.length<1 || showEmpty === true">
                <strong>No Data Found...</strong>
                <img src="../assets/notfound.png"/>
            </div>
            <!--<div class="row">-->
            <!--<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">-->
            <!--<div>-->
            <!--&lt;!&ndash;<div v-if="transferInListInt.length>0">&ndash;&gt;-->
            <!--<data-tables :data="transferInListInt" :action-col="transferListAction">-->
            <!--<el-table-column v-for="transferInListInfo in transferInList"-->
            <!--:prop="transferInListInfo.prop"-->
            <!--:label="transferInListInfo.label" :key="transferInListInfo.prop"-->
            <!--sortable="custom">-->
            <!--</el-table-column>-->
            <!--</data-tables>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <div class="row transfer_card mt-3">
                <div class="transfer_card-item" v-for="item in filteredList">
                    <span class="top-colorBar">{{item.STUSCH_EffectiveDate_convert}}</span>
                    <small>{{item.Index_No}}</small>
                    <hr/>
                    <h4>{{item.Full_Name}}</h4>
                    <div style="color:#999;">
                        {{item.Last_name}}
                    </div>
                    <el-button type="primary" icon="el-icon-edit" circle size="small"
                               @click="getTransferAction(item.Student_ID,item.PK_STUSCH_ID,item.STUSCH_EffectiveDate_convert)"
                               class="mt-2 mb-2"></el-button>
                </div>
            </div>
        </div>
        <b-modal id="transferModal" size="lg" title="Transfer" ok-only ok-variant="secondary" ok-title="Cancel"
                 ref="transferShowModal" hide-footer>
            <div style="display: none;">{{ transferStudentID }} - {{ studentSchoolID }}</div>
            <div class="row ">
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Select Level</label>
                    <select ref="ddlStudentSelectLevel" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in levelList" v-bind:value="item.PK_Course_ID.trim()">{{
                            item.CRS_Course_Name.trim() }}
                        </option>
                    </select>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>First Academic Year</label>
                    <select ref="ddlStudentFirstAcademicYear"
                            class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in academicYearList" v-bind:value="item.PK_Semester_ID.trim()">{{
                            item.SMT_Code.trim() }}
                        </option>
                    </select>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Intake Year</label>
                    <select ref="ddlStudentIntakeYear" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in studentIntakeYearList" v-bind:value="item.PK_PAI_ID.trim()">{{
                            item.PAI_Intake_No.trim() }}
                        </option>
                    </select>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Date of Commencement</label>
                    <div class="date">
                        <el-date-picker v-model="inputDateOfCommencement" format="dd/MM/yyyy"
                                        value-format="dd/MM/yyyy" type="date"
                                        placeholder="Pick a date"></el-date-picker>
                    </div>
                </div>
                <!--<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">-->
                <!--<button class="btn btn-primary waves-effect waves-light m-r-10" v-on:click="ApproveReject('APPROVE')">Approve</button>-->
                <!--<button class="btn btn-primary waves-effect waves-light m-r-10" v-on:click="ApproveReject('REJECT')">Reject</button>-->
                <!--</div>-->
                <hr class="custom-hr"/>
                <div class="col-lg-6">
                    <button v-on:click="ApproveReject('REJECT')"
                            class="btn btn-secondary close-modal-btn float-left">Reject
                    </button>
                </div>
                <div class="col-lg-6">
                    <button class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch"
                            v-on:click="ApproveReject('APPROVE')">Approve
                    </button>
                </div>
            </div>
        </b-modal>
    </div>
</template>
<script>
    import DataSource from "../data/datasource";

    export default {
        name: "TransferIn",
        data() {
            return {
                levelList: [],
                academicYearList: [],
                studentIntakeYearList: [],
                transferStudentID: '',
                studentSchoolID: '',
                inputDateOfCommencement: '',

                transferInListInt: [
                    // {
                    //     Index_No: "123",
                    //     Full_Name: "qweasd",
                    //     Middle_name: "asd",
                    //     Last_name: "qw"
                    // },{
                    //     Index_No: "1231",
                    //     Full_Name: "qweasd",
                    //     Middle_name: "asd",
                    //     Last_name: "qw"
                    // }
                ],
                transferInList: [{
                    prop: "Index_No",
                    label: "Student ID"
                }, {
                    prop: "Full_Name",
                    label: "First Name"
                }, {
                    prop: "Middle Name",
                    label: "Middle_name"
                }, {
                    prop: "Last Name",
                    label: "Last_name"
                }],
                transferListAction: {
                    label: 'Action',
                    props: {
                        align: 'center',
                    },
                    buttons: [{
                        props: {
                            type: 'primary',
                            icon: 'el-icon-edit'
                        },
                        handler: row => {
                            this.transferStudentID = row.Student_ID;
                            this.studentSchoolID = row.PK_STUSCH_ID;
                            this.inputDateOfCommencement = row.STUSCH_EffectiveDate_convert;
                            this.$refs.transferShowModal.show();
                        },
                        label: 'Action'
                    }]
                },
                showEmpty: false,
                search: ""
            };
        },
        computed: {
            filteredList() {
                if (this.transferInListInt && Array.isArray(this.transferInListInt)) {
                    return this.transferInListInt.filter(d => {
                        return d.Full_Name.toLowerCase().includes(this.search.toLowerCase());
                    });
                }
            }
        },
        async created() {
            this.getPendingAcceptTransferSchoolList();
            this.BindStudentLevel();
            this.BindAcademicYear();
            this.BindStudentIntakeYear();
        },
        async mounted() {
        },
        methods: {
            searchInputChange(e) {
                console.log(e.target.value);
            },

            getTransferAction(Student_ID, PK_STUSCH_ID, STUSCH_EffectiveDate_convert) {
                this.transferStudentID = Student_ID;
                this.studentSchoolID = PK_STUSCH_ID;
                this.inputDateOfCommencement = STUSCH_EffectiveDate_convert;
                console.log(this.transferStudentID, this.studentSchoolID, this.inputDateOfCommencement);
                this.$refs.transferShowModal.show();
            },
            async getPendingAcceptTransferSchoolList() {
                this.$vs.loading();
                try {
                    const response = await DataSource.shared.getPendingAcceptTransferSchoolBySchool();
                    if (response) {
                        switch (response.code) {
                            case "88":
                                this.$router.push('/');
                                break;
                            case "99":
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Error'
                                });
                                break;
                            case "2":
                                this.showEmpty = true;
                                break;
                        }

                        this.transferInListInt = response.Table;
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
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
            async BindAcademicYear() {
                try {
                    const response = await DataSource.shared.getAcademicYear();
                    if (response) {
                        this.academicYearListResponse = response.Table;
                        this.academicYearListResponse.forEach(m => {
                            this.academicYearList.push(m);
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
                            this.studentIntakeYearList.push(m);
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async ApproveReject(value) {
                this.$vs.loading();
                try {


                    if (this.transferStudentID !== "" && this.studentSchoolID !== "") {
                        if (value === 'APPROVE') {
                            if (this.$refs.ddlStudentSelectLevel.value !== "" && this.$refs.ddlStudentFirstAcademicYear.value !== "" && this.$refs.ddlStudentIntakeYear.value !== "") {
                                const getAcaYearRes = await DataSource.shared.getAcademicYearDateRange(this.$refs.ddlStudentFirstAcademicYear.value);

                                if (getAcaYearRes) {
                                    if (getAcaYearRes.code === "99") {
                                        this.$notify.error({
                                            title: 'Error',
                                            message: 'Get Academic Year Error - Please try again later'
                                        });
                                    } else {
                                        let academicYearFromDate, academicYearToDate;

                                        this.getAcaYearResTemp = getAcaYearRes.Table;
                                        this.getAcaYearResTemp.forEach(m => {
                                            academicYearFromDate = m.SMT_From;
                                            academicYearToDate = m.SMT_To;
                                        });

                                        this.academicYearToDate(value, academicYearFromDate, academicYearToDate, this.$refs.ddlStudentSelectLevel.value, this.$refs.ddlStudentFirstAcademicYear.value, this.$refs.ddlStudentIntakeYear.value);
                                    }
                                }
                            } else {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Please fill in all the information'
                                });
                            }
                        } else if (value === 'REJECT') {
                            this.academicYearToDate(value, 'NO DATA', 'NO DATA', 'NO DATA', 'NO DATA', 'NO DATA');
                        }


                    } else {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Error! Fail to get table info'
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async academicYearToDate(value, academicYearFromDate, academicYearToDate, level, adYear, intakeYear) {
                try {
                    const getSetLvlRes = await DataSource.shared.setLevelForAcceptScool(this.transferStudentID, level, academicYearFromDate, academicYearToDate, adYear, intakeYear, value, this.studentSchoolID, this.inputDateOfCommencement);

                    if (getSetLvlRes) {
                        if (getSetLvlRes.code === "1") {
                            this.$notify({
                                title: 'Success',
                                message: 'Records Successfully Saved',
                                type: 'success'
                            });
                            this.getPendingAcceptTransferSchoolList();
                            this.$refs.transferShowModal.hide();
                            // window.location.replace('/TransferIn');
                        } else if (getSetLvlRes.code === "2") {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Date of Commencement Cannot today or less than today'
                            });
                        } else {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Save Student Accept / Reject School - Please try again later'
                            });
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            }
        },
    };
</script>
<style scoped>
</style>