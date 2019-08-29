<template>
    <div id="attendancemaster" class="AttendanceMasterPage">
        <div class="container admin-wrap">
            <div class="row header mb-5">
                <div class="col-lg-5 ">
                    <h3 class="text-left mb-3">Attendance Master</h3>
                </div>
                <div class="col-lg-7">
                    <div class="row searchingArea attendance-search">
                        <el-select v-model="mode" placeholder="Select Action" class="pro-edt-select" @change="changeMode()">
                            <el-option
                                    v-for="item in ddlModeList"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="pb-5">
                <div class="empty-list_image" v-if="mode === ''">
                    <strong>{{startupText}}</strong>
                    <img src="../assets/notfound.png"/>
                </div>
                <div v-if="mode === 'Advance Class Attendance'" class="datatable_group divAdvanceClassAttendance">
                    <div class="row">
                        <div class="col-lg-12 row">
                            <div class="col-lg-12">
                                <label class="modeDisplay">{{mode}}</label>
                            </div>
                        </div>
                        <div class="col-lg-12 row">
                            <div class="col-lg-2">
                                <label>Class</label>
                            </div>
                            <div class="col-lg-10">
                                <el-select v-model="ddlAdvanceClassAttendanceClass" placeholder="Select Class" class="pro-edt-select"
                                           @change="LoadAdvanceClassAttendanceStudents()">
                                    <el-option
                                            v-for="item in ddlAdvanceClassAttendanceClassList"
                                            :key="item.PK_Class_ID"
                                            :label="item.CLS_ClassName.trim() + ' ' +item.CLS_Batch.trim()"
                                            :value="item.PK_Semester_ID.trim() + ',' + item.SC_FK_CourseID.trim() + ',' + item.PK_Class_ID.trim()">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="col-lg-12 row">
                            <div class="col-lg-2">
                                <label>Student</label>
                            </div>
                            <div class="col-lg-10">
                                <el-select v-model="dllAdvanceClassAttendanceStudent" placeholder="Select Student" class="pro-edt-select">
                                    <el-option
                                            v-for="item in dllAdvanceClassAttendanceStudentList"
                                            :key="item.Index_No"
                                            :label="item.Student_Name.trim()"
                                            :value="item.Index_No">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="col-lg-12 row">
                            <div class="col-lg-2">
                                <label>Attendance Date</label>
                            </div>
                            <div class="col-lg-10">
                                <el-date-picker
                                        v-model="inputAdvanceClassAttendanceFromToDate"
                                        type="daterange"
                                        range-separator="To"
                                        start-placeholder="Start date"
                                        end-placeholder="End date"
                                        format="dd/MM/yyyy"
                                        value-format="dd/MM/yyyy"
                                        :picker-options="inputAdvanceClassAttendanceFromToDatePickerOptions">
                                </el-date-picker>
                            </div>
                        </div>
                        <div class="col-lg-12 row">
                            <div class="col-lg-2">
                                <label>Attendance Status</label>
                            </div>
                            <div class="col-lg-10">
                                <el-select placeholder="Select Status" v-model="ddlAdvanceClassAttendanceStatus">
                                    <el-option
                                            v-for="itemCheckList in ddlAdvanceClassAttendanceStatusList"
                                            :key="itemCheckList"
                                            :label="itemCheckList"
                                            :value="itemCheckList">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="col-lg-12 row">
                            <div class="col-lg-2">
                                <label>Remark</label>
                            </div>
                            <div class="col-lg-10">
                                <input type="text" class="form-control" v-model="inputAdvanceClassAttendanceRemarks">
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <button v-on:click="showModal('advanceClassAttendanceViewShowModal')" class="btn btn-primary waves-effect waves-light m-r-10">
                                View Record
                            </button>
                            <button v-on:click="AdvanceClassAttendanceMarking()" class="btn btn-primary waves-effect waves-light m-r-10">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <b-modal id="advanceClassAttendanceViewModal" size="lg" title="Advance Class Attendance View" ok-only ok-variant="secondary" hide-footer v-model="advanceClassAttendanceViewShowModal">
                <div class="">
                    <div class="empty-list_image" v-if="advanceClassAttendanceRecordsInt.length < 1">
                        <strong>{{noRecordText}}</strong>
                        <img src="../assets/notfound.png"/>
                    </div>

                    <div v-if="advanceClassAttendanceRecordsInt.length > 0">
                        <el-row style="margin-bottom: 10px" class="classManage-ActionBar">
                            <el-col :span="24">
                                <el-input v-model="advanceClassAttendanceRecordsFilters[0].value">
                                    <template slot="prepend">Search Student Name</template>
                                </el-input>
                            </el-col>
                        </el-row>
                        <data-tables :data="advanceClassAttendanceRecordsInt" :filters="advanceClassAttendanceRecordsFilters" :action-col="advanceClassAttendanceRecordsActionCol">
                            <el-table-column v-for="advanceClassAttendanceRecordsInfo in advanceClassAttendanceRecords" :prop="advanceClassAttendanceRecordsInfo.prop"
                                             :label="advanceClassAttendanceRecordsInfo.label" :key="advanceClassAttendanceRecordsInfo.prop"
                                             sortable="custom">
                            </el-table-column>
                        </data-tables>
                    </div>
                </div>
            </b-modal>
        </div>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";

    export default {
        name: "AttendanceMaster",
        data() {
            return {
                startupText: 'Please Select Action',
                noRecordText: 'No Record Found',
                mode: '',
                ddlModeList: ['Advance Class Attendance'],

                //advance attendance
                ddlAdvanceClassAttendanceClass: '',
                ddlAdvanceClassAttendanceClassList: [],
                dllAdvanceClassAttendanceStudent: '',
                dllAdvanceClassAttendanceStudentList: [],

                inputAdvanceClassAttendanceFromToDate: '',
                ddlAdvanceClassAttendanceStatus: '',
                ddlAdvanceClassAttendanceStatusList: ['Absent', 'On Holiday', 'Un-Mark'],
                inputAdvanceClassAttendanceRemarks: '',

                advanceClassAttendanceViewShowModal: false,

                advanceClassAttendanceRecordsInt: [],
                advanceClassAttendanceRecords: [{
                    prop: "Index_No",
                    label: "Student ID"
                }, {
                    prop: "StudentFullName",
                    label: "Student Name"
                }, {
                    prop: "att_in_datetime_convert",
                    label: "Date"
                }, {
                    prop: "att_status",
                    label: "Status"
                }, {
                    prop: "att_remark",
                    label: "Remark"
                }],
                advanceClassAttendanceRecordsActionCol: {
                    label: 'Delete',
                    props: {
                        align: 'center',
                    },
                    buttons: [
                        {
                            props: {
                                type: 'primary',
                                icon: 'el-icon-edit'
                            },
                            handler: row => {
                                this.removeAdvanceClassAttendance(row.att_entity_id);
                            },
                            label: 'Delete'
                        },
                    ]
                },
                advanceClassAttendanceRecordsFilters: [
                    {
                        prop: ['StudentFullName'],
                        value: ''
                    }
                ],

                inputAdvanceClassAttendanceFromToDatePickerOptions: {
                    disabledDate(time) {
                        return time <= new Date();
                    },
                }
                //advance attendance
            };
        },
        async created() {
        },
        async mounted() {
        },
        methods: {
            async changeMode() {
                if (this.mode === 'Advance Class Attendance') {
                    await this.bindAdvanceClassAttendanceClasses();
                }
            },
            async bindAdvanceClassAttendanceClasses() {
                try {
                    this.ddlAdvanceClassAttendanceClass = '';
                    this.ddlAdvanceClassAttendanceClassList = [];

                    const response = await DataSource.shared.getAttendanceClass();
                    if (response) {
                        this.class = response.Table;
                        this.class.forEach(m => {
                            this.ddlAdvanceClassAttendanceClassList.push(m);
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async LoadAdvanceClassAttendanceStudents() {
                try {
                    this.$vs.loading();
                    const response = await DataSource.shared.LoadAttendanceList(this.ddlAdvanceClassAttendanceClass);
                    if (response) {
                        this.dllAdvanceClassAttendanceStudent = '';
                        this.dllAdvanceClassAttendanceStudentList= [];

                        if (response.code === '2') {
                            this.$notify({
                                title: 'No Record',
                                message: 'No Student Found'
                            });
                        } else if (response.code === '99') {
                            console.log("Load Student List Error!");
                        } else {
                            this.dllAdvanceClassAttendanceStudentList = response.Table;
                        }
                    }
                    this.$vs.loading.close();
                } catch (e) {
                    this.results = e;
                }
            },
            async AdvanceClassAttendanceMarking() {
                try {
                    if (this.dllAdvanceClassAttendanceStudent === '' || this.inputAdvanceClassAttendanceFromToDate === '' || this.inputAdvanceClassAttendanceFromToDate === null || this.inputAdvanceClassAttendanceRemarks ==='' || this.ddlAdvanceClassAttendanceStatus === '') {
                        this.$notify({
                            title: 'Require',
                            message: 'Please select Student, Attendance Date & Attendance Remark & Attendance Status'
                        });
                    } else {
                        this.$vs.loading();

                        let jsonString = {
                            studentIndexNo: this.dllAdvanceClassAttendanceStudent,
                            fromDate: this.inputAdvanceClassAttendanceFromToDate[0],
                            toDate: this.inputAdvanceClassAttendanceFromToDate[1],
                            status: this.ddlAdvanceClassAttendanceStatus,
                            remark: this.inputAdvanceClassAttendanceRemarks,
                        };

                        const response = await DataSource.shared.advanceAttendanceMarking(JSON.stringify(jsonString));
                        if (response) {
                            if (response.code === '88') {
                                window.location.replace('/');
                            } else if (response.code === '99') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Save Advance Marking Attendance Error!'
                                });
                            } else {
                                this.$notify({
                                    title: 'Success',
                                    message: 'Save Successfully!'
                                });
                            }
                        }

                        this.$vs.loading.close();
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async getAdvanceClassAttendanceList() {
                try {
                    this.$vs.loading();

                    this.advanceClassAttendanceRecordsInt = [];

                    const response = await DataSource.shared.getadvanceAttendanceMarkingList();
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Get Advance Class Attendance List Error!'
                            });
                        } else {
                            this.advanceClassAttendanceRecordsInt = response.Table;
                        }
                    }

                    this.$vs.loading.close();
                } catch (e) {
                    this.results = e;
                }
            },
            async removeAdvanceClassAttendance(attendanceID) {
                try {
                    this.$vs.loading();

                    const response = await DataSource.shared.updateAdvanceAttendanceMarking('DELETE', attendanceID);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Delete Advance Class Attendance Record Error!'
                            });
                        } else {
                            this.$notify({
                                title: 'Successfully',
                                message: 'Successfully Deleted'
                            });

                            this.getAdvanceClassAttendanceList();
                        }
                    }

                    this.$vs.loading.close();
                } catch (e) {
                    this.results = e;
                }
            },
            showModal (value) {
                if (value === 'advanceClassAttendanceViewShowModal') {
                    this.getAdvanceClassAttendanceList();
                    this.advanceClassAttendanceViewShowModal = true;
                }
            },
        },
    }
</script>

<style scoped>
    .divAdvanceClassAttendance {
        text-align: left;
    }
    .divAdvanceClassAttendance .row {
        margin-bottom: 20px;
    }
    .modeDisplay {
        font-size: 20px;
    }
    .btn-primary {
        margin-left: 10px;
        display: inline;
    }
</style>

<style>
    .AttendanceMasterPage .el-date-editor {
        width: auto !important;
    }
</style>