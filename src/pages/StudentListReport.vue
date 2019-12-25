<template>
    <div id="studentlistreport">
        <div class="container admin-wrap">
            <div class="row header mb-5">
                <div class="col-lg-5 ">
                    <h3 class="text-left mb-3">Student List Report</h3>
                </div>
                <div class="col-lg-7">
                    <div class="row">
                        <button type="button" class="btn btn-primary float-right" v-on:click="generateReport()">Generate</button>
                    </div>
                </div>
            </div>
            <div class="pb-5">
                <div class="empty-list_image" v-if="studentListInt.length < 1">
                    <strong>{{startupText}}</strong>
                    <img src="../assets/notfound.png"/>
                </div>
                <div v-if="studentListInt.length > 0" class="datatable_group ClassAttendanceReportPage">
                    <el-button type="primary" round @click="exportExcel()" class="btnExport"><i class="fa fa-file-excel-o" aria-hidden="true"></i> Export</el-button>

                    <data-tables :data="studentListInt">
                        <el-table-column v-for="studentListInfo in studentList"
                                         :prop="studentListInfo.prop"
                                         :label="studentListInfo.label"
                                         :key="studentListInfo.prop"
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
    import XLSX from 'xlsx';

    export default {
        name: "StudentListReport",
        data() {
            return {
                startupText: 'No Record...',

                studentListInt: [],
                studentList: [{
                    prop: "First Name",
                    label: "First Name"
                }, {
                    prop: "Middle Name",
                    label: "Middle Name"
                }, {
                    prop: "Last Name",
                    label: "Last Name"
                }, {
                    prop: "DOB",
                    label: "DOB"
                }, {
                    prop: "First Commencement Date",
                    label: "First Commencement Date"
                }, {
                    prop: "Local Residential Address",
                    label: "Local Residential Address"
                }, {
                    prop: "Billing Address",
                    label: "Billing Address"
                }, {
                    prop: "Current Level",
                    label: "Current Level"
                }, {
                    prop: "First Enroll Level",
                    label: "First Enroll Level"
                }, {
                    prop: "Current Commencement Date",
                    label: "Current Commencement Date"
                }, {
                    prop: "Status",
                    label: "Status"
                }, {
                    prop: "IC",
                    label: "IC"
                }, {
                    prop: "Birth Cert",
                    label: "Birth Cert"
                }, {
                    prop: "Fin",
                    label: "Fin"
                }, {
                    prop: "Fin Expiry Date",
                    label: "Fin Expiry Date"
                }, {
                    prop: "Passport",
                    label: "Passport"
                }, {
                    prop: "Passport Expiry Date",
                    label: "Passport Expiry Date"
                }, {
                    prop: "Father First Name",
                    label: "Father First Name"
                }, {
                    prop: "Father Middle Name",
                    label: "Father Middle Name"
                }, {
                    prop: "Father Last Name",
                    label: "Father Last Name"
                }, {
                    prop: "Father ID",
                    label: "Father ID"
                }, {
                    prop: "Father ID Expiry Date",
                    label: "Father ID Expiry Date"
                }, {
                    prop: "Father Local Residential Address",
                    label: "Father Local Residential Address"
                }, {
                    prop: "Mother First Name",
                    label: "Mother First Name"
                }, {
                    prop: "Mother Middle Name",
                    label: "Mother Middle Name"
                }, {
                    prop: "Mother Last Name",
                    label: "Mother Last Name"
                }, {
                    prop: "Mother ID",
                    label: "Mother ID"
                }, {
                    prop: "Mother ID Expiry Date",
                    label: "Mother ID Expiry Date"
                }, {
                    prop: "Mother Local Residential Address",
                    label: "Mother Local Residential Address"
                }],
            };
        },
        async created() {

        },
        methods: {
            async generateReport() {
                try {
                    this.$vs.loading();

                    const response = await DataSource.shared.getStudentListReport();

                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Get Student List Report Error!'
                            });
                        } else if (response.code === '2') {
                            this.$notify({
                                title: 'No Record',
                                message: 'No Record Found...'
                            });
                        } else {
                            this.studentListInt = response.Table;
                        }
                    }

                    this.$vs.loading.close();
                } catch (e) {
                    this.results = e;
                }
            },
            exportExcel () {
                // let exportExcelObject = [];
                // let splitMonthYear = this.currentMonthYear.split('/');
                //
                // this.classAttendanceReportInt.forEach(m => {
                //     let tempExportExcelObject = {
                //         'Student Name': m['Student Name'],
                //         'Student ID': m['Student Index No'],
                //     };
                //
                //     for (let i = 1; i <= this.reportTotalDay; i++) {
                //         Vue.set(tempExportExcelObject, i + " ", m[i.toString()]);
                //     }
                //
                //     exportExcelObject.push(tempExportExcelObject)
                // });

                var sheet1WS = XLSX.utils.json_to_sheet(this.studentListInt)
                var wb = XLSX.utils.book_new() // make Workbook of Excel
                XLSX.utils.book_append_sheet(wb, sheet1WS, 'sheet1') // sheetAName is name of Worksheet
                XLSX.writeFile(wb, 'Student List Report.xlsx') // name of the file is 'book.xlsx'
            },
        },
    }
</script>

<style scoped>
    .btnExport {
        display: block;
    }
</style>