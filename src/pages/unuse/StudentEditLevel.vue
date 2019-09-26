<template>
    <div id="student-edit-level" >
        <div class="datatable-edit__header">
            <div class="container">
                <h3>Student Level</h3>
                <a href="StudentList.vue">Student List</a> > Student Level
            </div>
        </div>
        <div class="mt-3 container">
        <label style="display:none !important;">{{lblStudentID}}</label>
        <div class="form-wrap">
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label class="withoutInput">Student Name: {{lblStudentName}}</label>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label class="withoutInput">Student Status: {{lblStudentStatus}}</label>
                </div>

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

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 buttonArea">
                    <button class="btn btn-primary waves-effect waves-light m-r-10" v-on:click="AddLevel">Add
                        Level
                    </button>
                </div>
            </div>

            <div v-if="list.length>0">
                <data-tables :data="list" :actionCol="actionCol" @selection-change="handleSelectionChange">
                    <el-table-column v-for="studentLevelListInfo in studentLevelList"
                                     :prop="studentLevelListInfo.prop" :label="studentLevelListInfo.label"
                                     :key="studentLevelListInfo.prop"
                                     sortable="custom">
                    </el-table-column>

                    <el-table-column label="Activate" min-width="100px">
                        <template slot-scope="scope">
                            <el-button v-for="studentLevelListActivateButton in studentLevelListActivate(scope.row)"
                                       :key="studentLevelListActivateButton.name" type="primary"
                                       @click="studentLevelListActivateButton.handler">
                                {{studentLevelListActivateButton.name}}
                            </el-button>
                        </template>
                    </el-table-column>

                    <el-table-column label="Deactivate" min-width="100px">
                        <template slot-scope="scope">
                            <el-button
                                    v-for="studentLevelListDeactivateButton in studentLevelListDeactivate(scope.row)"
                                    :key="studentLevelListDeactivateButton.name" type="primary"
                                    @click="studentLevelListDeactivateButton.handler">
                                {{studentLevelListDeactivateButton.name}}
                            </el-button>
                        </template>
                    </el-table-column>

                </data-tables>
            </div>
        </div>
            <div class="pt-2">
                <button v-on:click="backToPrevious" type="button"
                        class="btn btn-primary waves-effect waves-light m-r-10 mr-auto ">Cancel
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";

    export default {
        name: "StudentEditLevel",
        async created() {
            this.lblStudentID = this.$route.query.id;
            await this.BindStudentInfo();
            //await this.BindStudentLevel();
            await this.BindAcademicYear();
            await this.BindStudentIntakeYear();
        },
        async mounted() {
            await this.GetStudentLevelList();
        },
        data() {
            return {
                levelList: [],
                academicYearList: [],
                studentIntakeYearList: [],

                lblStudentID: '',
                lblStudentName: '',
                lblStudentStatus: '',

                list: [],
                studentLevelList: [{
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
                actionCol: {
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
        methods: {
            backToPrevious(){
                window.location.replace("/student-list?mode=Course");
            },
            handleSelectionChange(val) {
                this.selectedRow = val;
            },
            async BindStudentInfo() {
                try {
                    const response = await DataSource.shared.getStudent(this.lblStudentID, '', '', '', '');
                    if (response) {
                        this.studentInfoResponse = response.Table;
                        this.studentInfoResponse.forEach(m => {
                            this.lblStudentName = m.Full_Name + ' ' + m.Last_name;
                            this.lblStudentStatus = m.Status;
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async BindStudentLevel(customLevelNotEqual) {
                try {
                    const response = await DataSource.shared.getLevel(customLevelNotEqual);
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
            async GetStudentLevelList() {
                this.$vs.loading();
                try {
                    const response = await DataSource.shared.getStudentLevel(this.lblStudentID);
                    if (response) {
                        if (response.code == 2) {
                            alert('No record found');
                        } else if (response.code == 99) {
                            alert('Please try again later');
                        } else {
                            this.list = response.Table;

                            //filter the added level to BindStudentLevel
                            let customLevelNotEqual = '';
                            this.GetStudentLevelListResponse = response.Table;
                            this.GetStudentLevelListResponse.forEach(m => {
                                if (customLevelNotEqual == '') {
                                    customLevelNotEqual = m.PK_Course_ID;
                                } else {
                                    customLevelNotEqual = customLevelNotEqual + "," + m.PK_Course_ID;
                                }
                            });

                            this.BindStudentLevel(customLevelNotEqual);
                            //filter the added level to BindStudentLevel

                        }
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },
            studentLevelListActivate(row) {
                return [{
                    name: 'Activate',
                    handler: _ => {
                        this.updateLevel(row.PK_Student_Course_ID, "Activate");
                    }
                }];
            },
            studentLevelListDeactivate(row) {
                return [{
                    name: 'Deactivate',
                    handler: _ => {
                        this.updateLevel(row.PK_Student_Course_ID, "Deactivate");
                    }
                }];
            },
            async updateLevel(courseID, mode) {
                try {
                    const response = await DataSource.shared.updateLevel(this.lblStudentID, courseID, mode);
                    if (response) {
                        if (response.code == 1) {
                            alert('Edit Successfully!');
                            window.location.replace('/student-edit-level?id=' + this.lblStudentID);
                        } else if (response.code == 2) {
                            alert('Cannot have multiple active level');
                        } else {
                            alert('Error! Please try again later.');
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async AddLevel() {
                try {
                    if (this.lblStudentID != "" && this.$refs.ddlStudentSelectLevel.value != "" && this.$refs.ddlStudentFirstAcademicYear.value != "" && this.$refs.ddlStudentIntakeYear.value != "") {
                        const getAcaYearRes = await DataSource.shared.getAcademicYearDateRange(this.$refs.ddlStudentFirstAcademicYear.value);

                        if (getAcaYearRes) {
                            if (getAcaYearRes.code == "99") {
                                alert('Get Academic Year Error - Please try again later');
                            } else {
                                let academicYearFromDate, academicYearToDate;

                                this.getAcaYearResTemp = getAcaYearRes.Table;
                                this.getAcaYearResTemp.forEach(m => {
                                    academicYearFromDate = m.SMT_From;
                                    academicYearToDate = m.SMT_To;
                                });

                                const getSetLvlRes = await DataSource.shared.setLevel(this.lblStudentID, this.$refs.ddlStudentSelectLevel.value, academicYearFromDate, academicYearToDate, this.$refs.ddlStudentFirstAcademicYear.value, this.$refs.ddlStudentIntakeYear.value);

                                if (getSetLvlRes) {
                                    if (getSetLvlRes.code == "1") {
                                        alert('Records Successfully Saved');
                                        window.location.replace('/student-edit-level?id=' + this.lblStudentID);
                                    } else if (getSetLvlRes.code == "2") {
                                        alert('cannot have multiple active level');
                                    } else {
                                        alert('Save Student Level Error - Please try again later');
                                    }
                                }
                            }
                        }
                    } else {
                        alert('Please fill in all the information');
                    }

                } catch (e) {
                    this.results = e;
                }
            },
        },
    };
</script>

<style scoped>
    .buttonArea button {
        display: inline;
    }
</style>