<template>
    <div id="attendancereport">
        <div class="container ">
            <div class="row header mb-5">
                <div class="col-lg-5 ">
                    <h3 class="text-left mb-3">ATTENDANCE REPORT</h3>
                </div>
            </div>
            <div class="datatable-form__header atr-header-wrap mb-4">
                <div class="datatable-form__input form-group flex-1">
                    <label>Select Date</label>
                    <el-date-picker
                            v-model="inputFromDate"
                            type="daterange"
                            range-separator="To"
                            start-placeholder="Start date"
                            end-placeholder="End date"
                            format="dd/MM/yyyy"
                            value-format="dd/MM/yyyy"
                            @change="testDate">
                    </el-date-picker>
                    <!--<div class="date">-->
                    <!--<el-date-picker v-model="inputFromDate" type="date"-->
                    <!--format="dd/MM/yyyy"-->
                    <!--value-format="dd/MM/yyyy" placeholder="Pick a day">-->
                    <!--</el-date-picker>-->
                    <!--</div>-->
                </div>
                <!--<div class="datatable-form__input form-group">-->
                <!--<label>To Date</label>-->
                <!--<div class="date">-->
                <!--<el-date-picker v-model="inputToDate" type="date"-->
                <!--format="dd/MM/yyyy"-->
                <!--value-format="dd/MM/yyyy" placeholder="Pick a day">-->
                <!--</el-date-picker>-->
                <!--</div>-->
                <!--</div>-->
                <div class="datatable-form__input form-group flex-1">
                    <label>Attendance Type</label>
                    <el-select placeholder="Select" v-model="attendTypeSelected" class="ddlSearchStatua">
                        <el-option
                                v-for="attendTypeItem in attendType"
                                :label="attendTypeItem"
                                :value="attendTypeItem"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div class="datatable-form__input form-group flex-1">
                    <label>Student Name</label>
                    <el-select class="ddlSearchStatua"
                               placeholder="Search Student by Name" v-model="attendStudentSelected"
                               ref="attendStudentSelected"
                               filterable>
                        <el-option
                                v-for="allActiveStudentItem in allActiveStudent"
                                :label="allActiveStudentItem.Full_Name + '' + allActiveStudentItem.Middle_name + ' ' + allActiveStudentItem.Last_name"
                                :value="allActiveStudentItem.Index_No"
                        >
                        </el-option>
                        <!--<el-option-->
                                <!--v-for="allActiveStudentItem in allActiveStudent"-->
                        <!--:label="allActiveStudentItem.Full_Name + ' ' + allActiveStudentItem.Middle_name + ' ' + allActiveStudentItem.Last_name"-->
                        <!--:value="allActiveStudentItem.Index_No"-->
                        <!--&gt;-->
                        <!--</el-option>-->
                    </el-select>
                </div>
                <div class="datatable-form__submit text-center">
                    <button class="btn btn-success searchbtn" id="btnSearch" v-on:click="Search()">Search</button>
                </div>
            </div>
            <div v-if="attendanceReportListInt.length>0 || attendanceBusReportListInt.length>0 || attendanceEcaReportListInt.length>0" class="d-flex atr-list-header">
                <label>
                    <i class="material-icons">
                        face
                    </i>
                    {{currentStudentName}}
                </label>
                <el-button type="primary" round @click="exportCSV()" class="btnExport"><i class="fa fa-file-excel-o" aria-hidden="true"></i> Export</el-button>
            </div>
            <div class="admin-wrap">
                <div class="pb-5">
                    <div class="empty-list_image"
                         v-if="attendanceReportListInt.length<1 && attendanceBusReportListInt.length<1 && attendanceEcaReportListInt.length<1">
                        <strong>{{startupText}}</strong>
                        <img src="../assets/notfound.png"/>
                    </div>

                    <div v-if="attendanceReportListInt.length>0" class="datatable_group">
                        <data-tables :data="attendanceReportListInt">
                            <el-table-column v-for="attendanceReportListInfo in attendanceReportList"
                                             :prop="attendanceReportListInfo.prop"
                                             :label="attendanceReportListInfo.label"
                                             :key="attendanceReportListInfo.prop"
                                             sortable="custom">
                            </el-table-column>
                        </data-tables>
                    </div>
                    <div v-if="attendanceBusReportListInt.length>0" class="datatable_group">
                        <data-tables :data="attendanceBusReportListInt">
                            <el-table-column v-for="attendanceBusReportListInfo in attendanceBusReportList"
                                             :prop="attendanceBusReportListInfo.prop"
                                             :label="attendanceBusReportListInfo.label"
                                             :key="attendanceBusReportListInfo.prop"
                                             sortable="custom">
                            </el-table-column>
                        </data-tables>
                    </div>
                    <div v-if="attendanceEcaReportListInt.length>0" class="datatable_group">
                        <data-tables :data="attendanceEcaReportListInt">
                            <el-table-column v-for="attendanceEcaReportListInfo in attendanceEcaReportList"
                                             :prop="attendanceEcaReportListInfo.prop"
                                             :label="attendanceEcaReportListInfo.label"
                                             :key="attendanceEcaReportListInfo.prop"
                                             sortable="custom">
                            </el-table-column>
                        </data-tables>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import DataSource from "../data/datasource";
    import Export_CSV from "../components/Export_CSV";

    export default {
        name: "AttendanceReport",
        components: {
            Export_CSV,
        },
        async created() {
            this.getAllActiveStudent();
        },
        data() {
            return {
                attendTypeSelected: '',
                attendStudentSelected: '',
                inputFromDate: '',
                inputToDate: '',
                currentStudentName: '',

                attendType: ['ATTENDANCE', 'BUS ATTENDANCE', 'ECA ATTENDANCE'],
                allActiveStudent: [],

                attendanceReportListInt: [],
                attendanceReportList: [{
                    prop: "att_in_datetime",
                    label: "Time In"
                }, {
                    prop: "att_in_temp",
                    label: "Time In Temperature"
                }, {
                    prop: "att_out_datetime",
                    label: "Time Out"
                }, {
                    prop: "att_remark",
                    label: "Remarks"
                }, {
                    prop: "att_status",
                    label: "Status"
                }],

                attendanceBusReportListInt: [],
                attendanceBusReportList: [{
                    prop: "busatt_created_date_Covert",
                    label: "Time In"
                }, {
                    prop: "busatt_bus_no",
                    label: "Bus No"
                }, {
                    prop: "busatt_remark",
                    label: "Remarks"
                }, {
                    prop: "ShowAttendance",
                    label: "Status"
                }],

                attendanceEcaReportListInt: [],
                attendanceEcaReportList: [{
                    prop: "EcaAttCreatedOn_Covert",
                    label: "Time In"
                }, {
                    prop: "EcaName",
                    label: "ECA Name"
                }, {
                    prop: "EcaAttRemarks",
                    label: "Remarks"
                }, {
                    prop: "ShowAttendance",
                    label: "Status"
                }],
                startupText: "Please select student...",
            };
        },
        methods: {
            testDate() {
                console.log(this.inputFromDate);
                console.log(this.inputFromDate[1]);
            },
            async getAllActiveStudent() {
                try {
                    const response = await DataSource.shared.getStudentWithStatus('', '', '', '', '', 'Active');
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Get All Students Error!'
                            });
                        } else if (response.code === '2') {
                            this.allActiveStudent = [];
                        } else {
                            //this.allActiveStudent = response.Table;

                            this.allActiveStudentResponse = response.Table;
                            this.allActiveStudentResponse.forEach(m => {
                                let studentsListTemp = {
                                    Full_Name: m.Full_Name,
                                    Middle_name: m.Middle_name,
                                    Last_name: m.Last_name,
                                    Index_No: m.Index_No
                                };

                                this.allActiveStudent.push(studentsListTemp);
                            });
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async Search() {
                try {
                    this.startupText = "No Data Found...";
                    if (this.inputFromDate === '' || this.attendTypeSelected === '' || this.attendStudentSelected === '') {
                        // if (this.inputFromDate === '' || this.inputToDate === '' || this.attendTypeSelected === '' || this.attendStudentSelected === '') {
                        this.$notify({
                            title: 'Require',
                            message: 'Please select "From Date", "To Date", "Attendance Type" and "Student Name"'
                        });
                    } else {
                        this.$vs.loading();
                        let studentList = [];
                        let studentsListTemp = {
                            studentIndexNo: this.attendStudentSelected
                        };
                        studentList.push(studentsListTemp);

                        let attendanceList = [];
                        let attendanceListTemp = {
                            fromDate: this.inputFromDate[0],
                            toDate: this.inputFromDate[1],
                            attendanceType: this.attendTypeSelected,
                            studentList: studentList,
                        };
                        attendanceList.push(attendanceListTemp);

                        const response = await DataSource.shared.generateEcaAttendanceReport(JSON.stringify(attendanceList));

                        this.attendanceReportListInt = [];
                        this.attendanceBusReportListInt = [];
                        this.attendanceEcaReportListInt = [];

                        if (response) {
                            if (response.code === '88') {
                                window.location.replace('/');
                            } else if (response.code === '99') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Generate Report Error!'
                                });
                            } else if (response.code === '2') {
                                this.$notify({
                                    title: 'No Record',
                                    message: 'No Record Found'
                                });
                            } else {
                                if (this.attendTypeSelected === 'ATTENDANCE') {
                                    this.attendanceReportListInt = response.Table;
                                } else if (this.attendTypeSelected === 'BUS ATTENDANCE') {
                                    this.attendanceBusReportListInt = response.Table;
                                } else if (this.attendTypeSelected === 'ECA ATTENDANCE') {
                                    this.attendanceEcaReportListInt = response.Table;
                                }

                                this.currentStudentName = this.$refs.attendStudentSelected.selected.label;
                            }
                        }
                        this.$vs.loading.close();
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            exportCSV() {
                let finalExportList = [];

                if (this.attendanceReportListInt.length > 0) {
                    this.attendanceReportListInt.forEach((m, index) => {
                        let tempRow = {
                            'Time In': m.att_in_datetime,
                            'Time In Temperature': m.att_in_temp,
                            'Time Out': m.att_out_datetime,
                            'Remarks': m.att_remark,
                            'Status': m.att_status,
                        };

                        finalExportList.push(tempRow);
                    });

                    Export_CSV.CsvExport(finalExportList, '', '', 'Attendance -' + this.currentStudentName);
                } else if (this.attendanceBusReportListInt.length > 0) {
                    this.attendanceBusReportListInt.forEach((m, index) => {
                        let tempRow = {
                            'Time In': m.busatt_created_date_Covert,
                            'Bus No': m.busatt_bus_no,
                            'Remarks': m.busatt_remark,
                            'Status': m.ShowAttendance,
                        };

                        finalExportList.push(tempRow);
                    });

                    Export_CSV.CsvExport(finalExportList, '', '', 'Bus Attendance -' + this.currentStudentName);
                } else if (this.attendanceEcaReportListInt.length > 0) {
                    this.attendanceEcaReportListInt.forEach((m, index) => {
                        let tempRow = {
                            'Time In': m.EcaAttCreatedOn_Covert,
                            'ECA Name': m.EcaName,
                            'Remarks': m.EcaAttRemarks,
                            'Status': m.ShowAttendance,
                        };

                        finalExportList.push(tempRow);
                    });

                    Export_CSV.CsvExport(finalExportList, '', '', 'ECA Attendance -' + this.currentStudentName);
                }
            },
        },
    };
</script>
<style scoped>
    .datatable-form__header .searchbtn {
        background: #4856ad;
        border-color: #4856ad;
        height: 37px;
        position: relative;
        top: 2px;
    }

    .btnExport {
        display: block;
    }
</style>
<style>
</style>
