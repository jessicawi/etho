<template>
    <div id="classattendancereport">
        <div class="container admin-wrap">
            <div class="row header mb-5">
                <div class="col-lg-5 ">
                    <h3 class="text-left mb-3">Class Attendance Report</h3>
                </div>
                <div class="col-lg-7">
                    <div class="row">
                        <div class="col-lg-6">
                            <el-date-picker
                                    @change="bindClasses()"
                                    v-model="inputMonthYear"
                                    type="month"
                                    value-format="M/yyyy"
                                    placeholder="Pick a month">
                            </el-date-picker>
                        </div>
                        <div class="col-lg-6">
                            <el-select v-model="ddlClass" filterable placeholder="Select Class" class="pro-edt-select" @change="getReport()">
                                <el-option-group
                                        v-for="group in ddlClassList"
                                        :key="group.levelName"
                                        :label="group.levelName">
                                    <el-option
                                            v-for="item in group.levelDetails"
                                            :key="item.PK_Class_ID"
                                            :label="item.className"
                                            :value="item.classID">
                                    </el-option>
                                </el-option-group>
                            </el-select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pb-5">
                <div class="empty-list_image" v-if="classAttendanceReportInt.length < 1">
                    <strong>{{startupText}}</strong>
                    <img src="../assets/notfound.png"/>
                </div>
                <div v-if="classAttendanceReportInt.length > 0" class="datatable_group ClassAttendanceReportPage">
                    <el-button type="primary" round @click="exportExcel()" class="btnExport"><i class="fa fa-file-excel-o" aria-hidden="true"></i> Export</el-button>

                    <div class="row col-lg-12 divCurrentClassNameMonthYear">
                        <div class="col-lg-6">
                            <label class="currentClassName">Class: {{currentClassName}}</label>
                        </div>
                        <div class="col-lg-6">
                            <label class="currentMonthYear">Month Year: {{currentMonthYear}}</label>
                        </div>
                    </div>

                    <data-tables :data="classAttendanceReportInt">
                        <el-table-column v-for="classAttendanceReportInfo in classAttendanceReport"
                                         :prop="classAttendanceReportInfo.prop"
                                         :label="classAttendanceReportInfo.label"
                                         :key="classAttendanceReportInfo.prop"
                                         sortable="custom">
                        </el-table-column>
                    </data-tables>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";
    import Cookies from "js-cookie";
    import XLSX from 'xlsx';
    import Vue from 'vue';

    export default {
        name: "ClassAttendanceReport",
        data() {
            return {
                startupText: 'Please Select Class',
                ddlClass: '',
                inputMonthYear: '',
                reportTotalDay: '',
                currentClassName: '',
                currentMonthYear: '',

                ddlClassList: [],
                ddlClassListInt: [],

                classAttendanceReportInt: [],
                classAttendanceReport: [],
            };
        },
        async created() {

        },
        methods: {
            async bindClasses() {
                try {
                    let filterByStaffInCharge = '';
                    if (Cookies.get('userTypeSession') !== 'Parent Liaison') {
                        filterByStaffInCharge = 'YES';
                    };

                    this.ddlClassList = [];
                    this.ddlClass = '';

                    let splitMonthYear = this.inputMonthYear.split('/');

                    const response = await DataSource.shared.getClassByMonthYear(splitMonthYear[0], splitMonthYear[1], filterByStaffInCharge);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Class Error!'
                            });
                        } else if (response.code === '2') {
                            this.$notify.error({
                                title: 'No Record',
                                message: 'No Class Found!'
                            });
                        } else {
                            let gorupByLevel = [];
                            let groupValue = [];
                            let newLevel;

                            response.Table.forEach(m => {
                                newLevel = 'No';
                                groupValue = [];

                                gorupByLevel.forEach(finalTableLoopValue => {
                                    if (finalTableLoopValue.levelName === m.levelName) {
                                        newLevel = 'Yes';
                                    }
                                });

                                if (newLevel === 'No') {
                                    response.Table.forEach(loopAgainResponseValue => {
                                        if (loopAgainResponseValue.levelName === m.levelName) {
                                            let groupValueTemp = {
                                                academicYear: loopAgainResponseValue.academicYear,
                                                classID: loopAgainResponseValue.classID,
                                                className: loopAgainResponseValue.className,
                                            };

                                            groupValue.push(groupValueTemp);
                                        }
                                    });

                                    let gorupByLevelTemp = {
                                        levelName: m.levelName,
                                        levelDetails: groupValue,
                                    };
                                    gorupByLevel.push(gorupByLevelTemp);
                                }
                            });

                            this.ddlClassList = gorupByLevel;
                            this.ddlClassListInt = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async getReport() {
                try {
                    let splitMonthYear = this.inputMonthYear.split('/');

                    const response = await DataSource.shared.getClassAttendanceReportByMonthYear(splitMonthYear[0], splitMonthYear[1], this.ddlClass);

                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Class Attendance Report Error!'
                            });
                        } else if (response.code === '2') {
                            this.$notify.error({
                                title: 'No Record',
                                message: 'No Record Found!'
                            });
                        } else {
                            this.classAttendanceReportInt = response.Table;

                            //create dynamic column base on how many days
                            this.classAttendanceReport = [];
                            this.reportTotalDay = response.TotalDay;

                            // let classAttendanceReportTemp = {
                            //     prop: "Student Index No",
                            //     label: "Student Index No",
                            // };
                            // this.classAttendanceReport.push(classAttendanceReportTemp);

                            let classAttendanceReportTemp = {
                                prop: "Student Name",
                                label: "Student Name",
                            };
                            this.classAttendanceReport.push(classAttendanceReportTemp);

                            for (let i = 1; i <= response.TotalDay; i++) {
                                classAttendanceReportTemp = {
                                    prop: i.toString(),
                                    label: i.toString(),
                                };
                                this.classAttendanceReport.push(classAttendanceReportTemp);
                            }
                            //create dynamic column base on how many days

                            //set current class and month-year
                            this.ddlClassListInt.forEach(m => {
                                if (m.classID === this.ddlClass) {
                                    this.currentClassName = m.className;
                                }
                            });

                            this.currentMonthYear = splitMonthYear[0] + "/" + splitMonthYear[1]
                            //set current class and month-year
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            exportExcel () {
                let exportExcelObject = [];
                let splitMonthYear = this.currentMonthYear.split('/');

                this.classAttendanceReportInt.forEach(m => {
                    let tempExportExcelObject = {
                        'Student Name': m['Student Name'],
                        'Student ID': m['Student Index No'],
                    };

                    for (let i = 1; i <= this.reportTotalDay; i++) {
                        Vue.set(tempExportExcelObject, i + " ", m[i.toString()]);
                    }

                    exportExcelObject.push(tempExportExcelObject)
                });

                var sheet1WS = XLSX.utils.json_to_sheet(exportExcelObject)
                var wb = XLSX.utils.book_new() // make Workbook of Excel
                XLSX.utils.book_append_sheet(wb, sheet1WS, 'sheet1') // sheetAName is name of Worksheet
                XLSX.writeFile(wb, 'Class Attendance Report - ' + this.currentClassName + ' - ' + splitMonthYear[0] + "-" + splitMonthYear[1] + '.xlsx') // name of the file is 'book.xlsx'
            },
        },
    }
</script>

<style scoped>
    .btnExport {
        display: block;
    }
    .divCurrentClassNameMonthYear{
        margin-top: 20px;
    }
    .currentClassName {
        text-align: left;
    }
    .currentMonthYear {
        text-align: right;
    }
</style>

<style>
    /*.ClassAttendanceReportPage .el-table_1_column_1 {*/
        /*position: absolute !important;*/
        /*z-index: 10;*/
        /*width: 200px;*/
    /*}*/
    /*.ClassAttendanceReportPage .el-table__body-wrapper {*/
        /*position: unset !important;*/
    /*}*/
    /*.ClassAttendanceReportPage .el-table td, .ClassAttendanceReportPage .el-table th {*/
        /*padding: 0;*/
    /*}*/
</style>