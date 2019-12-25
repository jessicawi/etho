<template>
    <div id="secretadminconfigpage">
        <div class="container admin-wrap">
            <div class="col-lg-12">
                <div class="row">
                    <div class="col-lg-12">
                        <el-button type="primary" class="mt-2 mb-2" @click="openClearTokenValidateModal()">
                            Clear Token
                        </el-button>
                    </div>
                    <div class="col-lg-12">
                        <el-button type="primary" class="mt-2 mb-2" @click="openPatchEmptyLevelInStudentCourseModal()">
                            Patch Empty Level in Student Course
                        </el-button>
                    </div>
                    <div class="col-lg-12">
                        <el-button type="primary" class="mt-2 mb-2" @click="openDebugAutoGetLevelAcademicYearModal()">
                            Debug Auto Get Level & Academic Year
                        </el-button>
                    </div>
                </div>
            </div>
        </div>

        <b-modal size="lg" title="Clear Token Validate" ok-only ok-variant="secondary" ok-title="Cancel" ref="clearTokenLoginValidate" hide-footer>
            <div class="row">
                <div class="col-lg-12">
                    <label>User Name</label>
                    <input type="text" class="form-control" v-model="inputClearTokenUserName">
                </div>
                <div class="col-lg-12">
                    <label>Password</label>
                    <input type="password" class="form-control" v-model="inputClearTokenPassword">
                </div>
                <div class="col-lg-12">
                    <el-button type="primary" class="mt-2 mb-2" @click="clearToken()">
                        Submit
                    </el-button>
                </div>
            </div>
        </b-modal>
        <b-modal size="lg" title="Patch Empty Level in Student Course" ok-only ok-variant="secondary" ok-title="Cancel" ref="patchEmptyLevelInStudentCourse" hide-footer>
            <div class="row">
                <div class="col-lg-12">
                    <label>Student ID</label>
                    <input type="text" class="form-control" v-model="inputEmptyLevelInStudentCourseStudentID">
                </div>
                <div class="col-lg-12">
                    <el-button type="primary" class="mt-2 mb-2" @click="searchEmptyLevelInStudentCourseStudent()">
                        Search Student
                    </el-button>
                </div>

                <div class="col-lg-12" v-if="emptyLevelInStudentCourseStudentListInt.length>0">
                    <data-tables :data="emptyLevelInStudentCourseStudentListInt">
                        <el-table-column v-for="emptyLevelInStudentCourseStudentListInfo in emptyLevelInStudentCourseStudentList"
                                         :prop="emptyLevelInStudentCourseStudentListInfo.prop"
                                         :label="emptyLevelInStudentCourseStudentListInfo.label"
                                         :key="emptyLevelInStudentCourseStudentListInfo.prop"
                                         sortable="custom">
                        </el-table-column>
                    </data-tables>
                </div>

                <div class="col-lg-12" v-if="inputEmptyLevelInStudentCourseLevelList.length>0">
                    <div class="col-lg-12">
                        <label>Level</label>
                        <el-select v-model="inputEmptyLevelInStudentCourseLevel" placeholder="Select Level" class="fullWidth">
                            <el-option
                                    v-for="item in inputEmptyLevelInStudentCourseLevelList"
                                    :key="item.PK_Course_ID"
                                    :label="item.CRS_Course_Name + ' ( Age: ' + item.CRS_Age + ' )'"
                                    :value="item.PK_Course_ID">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="col-lg-12">
                        <label>User Name</label>
                        <input type="text" class="form-control" v-model="inputEmptyLevelInStudentCourseLevelUserName">
                    </div>
                    <div class="col-lg-12">
                        <label>Password</label>
                        <input type="password" class="form-control" v-model="inputEmptyLevelInStudentCourseLevelPassword">
                    </div>
                    <div class="col-lg-12">
                        <el-button type="primary" class="mt-2 mb-2" @click="patchEmptyLevelStudent()">
                            Submit
                        </el-button>
                    </div>
                </div>
            </div>
        </b-modal>
        <b-modal size="lg" title="Debug Auto Get Level & Academic Year" ok-only ok-variant="secondary" ok-title="Cancel" ref="debugAutoGetLevelAcademicYear" hide-footer>
            <div class="row">
                <div class="col-lg-12">
                    <label>School</label>
                    <el-select v-model="ddlDebugAutoGetLevelAcademicYearSchoolID" placeholder="Select School" class="pro-edt-select fullWidth">
                        <el-option
                                v-for="item in ddlDebugAutoGetLevelAcademicYearSchoolIDList"
                                :key="item.PK_SCH_ID"
                                :label="item.SCH_Short_Name"
                                :value="item.PK_SCH_ID">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-lg-12">
                    <label>Date of Birth</label>
                    <div class="date">
                        <el-date-picker v-model="inputDebugAutoGetLevelAcademicYearDOB" format="dd/MM/yyyy" value-format="dd/MM/yyyy" type="date"
                                        placeholder="Pick a date"></el-date-picker>
                    </div>
                </div>
                <div class="col-lg-12">
                    <label>Commencement Date</label>
                    <div class="date">
                        <el-date-picker v-model="inputDebugAutoGetLevelAcademicYearCommencementDate" format="dd/MM/yyyy" value-format="dd/MM/yyyy" type="date"
                                        placeholder="Pick a date"></el-date-picker>
                    </div>
                </div>
                <div class="col-lg-12">
                    <label>User Name</label>
                    <input type="text" class="form-control" v-model="inputDebugAutoGetLevelAcademicYearUserName">
                </div>
                <div class="col-lg-12">
                    <label>Password</label>
                    <input type="password" class="form-control" v-model="inputDebugAutoGetLevelAcademicYearPassword">
                </div>
                <div class="col-lg-12">
                    <el-button type="primary" class="mt-2 mb-2" @click="getDebugAutoGetLevelAcademicYear()">
                        Submit
                    </el-button>
                </div>

                <div class="col-lg-12" v-if="debugAutoGetLevelAcademicAutoGetListInt.length>0">
                    <data-tables :data="debugAutoGetLevelAcademicAutoGetListInt">
                        <el-table-column v-for="debugAutoGetLevelAcademicAutoGetListInfo in debugAutoGetLevelAcademicAutoGetList"
                                         :prop="debugAutoGetLevelAcademicAutoGetListInfo.prop"
                                         :label="debugAutoGetLevelAcademicAutoGetListInfo.label"
                                         :key="debugAutoGetLevelAcademicAutoGetListInfo.prop"
                                         sortable="custom">
                        </el-table-column>
                    </data-tables>
                </div>

                <div class="col-lg-12" v-if="debugAutoGetLevelAcademicAutoGetListActiveSemesterInt.length>0">
                    <data-tables :data="debugAutoGetLevelAcademicAutoGetListActiveSemesterInt">
                        <el-table-column v-for="debugAutoGetLevelAcademicAutoGetListActiveSemesterInfo in debugAutoGetLevelAcademicAutoGetListActiveSemester"
                                         :prop="debugAutoGetLevelAcademicAutoGetListActiveSemesterInfo.prop"
                                         :label="debugAutoGetLevelAcademicAutoGetListActiveSemesterInfo.label"
                                         :key="debugAutoGetLevelAcademicAutoGetListActiveSemesterInfo.prop"
                                         sortable="custom">
                        </el-table-column>
                    </data-tables>
                </div>

                <div class="col-lg-12" v-if="debugAutoGetLevelAcademicAutoGetListAllAgeCoursesInt.length>0">
                    <data-tables :data="debugAutoGetLevelAcademicAutoGetListAllAgeCoursesInt">
                        <el-table-column v-for="debugAutoGetLevelAcademicAutoGetListAllAgeCoursesInfo in debugAutoGetLevelAcademicAutoGetListAllAgeCourses"
                                         :prop="debugAutoGetLevelAcademicAutoGetListAllAgeCoursesInfo.prop"
                                         :label="debugAutoGetLevelAcademicAutoGetListAllAgeCoursesInfo.label"
                                         :key="debugAutoGetLevelAcademicAutoGetListAllAgeCoursesInfo.prop"
                                         sortable="custom">
                        </el-table-column>
                    </data-tables>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";

    export default {
        name: "SecretAdminConfigPage",
        data() {
            return {
                inputClearTokenUserName: '',
                inputClearTokenPassword: '',

                inputEmptyLevelInStudentCourseStudentID: '',
                inputEmptyLevelInStudentCourseLevel: '',
                inputEmptyLevelInStudentCourseLevelList: [],
                inputEmptyLevelInStudentCourseLevelUserName: '',
                inputEmptyLevelInStudentCourseLevelPassword: '',
                emptyLevelInStudentCourseStudentListInt: [],
                emptyLevelInStudentCourseStudentList: [{
                    prop: "Student Course ID",
                    label: "Student Course ID"
                }, {
                    prop: "Student Course Creation Date",
                    label: "Student Course Creation Date"
                }, {
                    prop: "Student Name",
                    label: "Student Name"
                }],

                ddlDebugAutoGetLevelAcademicYearSchoolID: '',
                ddlDebugAutoGetLevelAcademicYearSchoolIDList: [],
                inputDebugAutoGetLevelAcademicYearDOB: '',
                inputDebugAutoGetLevelAcademicYearCommencementDate: '',
                inputDebugAutoGetLevelAcademicYearUserName: '',
                inputDebugAutoGetLevelAcademicYearPassword: '',
                debugAutoGetLevelAcademicAutoGetListInt: [],
                debugAutoGetLevelAcademicAutoGetList: [{
                    prop: "Prop",
                    label: "Prop"
                }, {
                    prop: "Value",
                    label: "Value"
                }],
                debugAutoGetLevelAcademicAutoGetListActiveSemesterInt: [],
                debugAutoGetLevelAcademicAutoGetListActiveSemester: [{
                    prop: "PK_Semester_ID",
                    label: "Sem ID"
                }, {
                    prop: "SMT_Code",
                    label: "Academic Year"
                }, {
                    prop: "SEMD_DetailName",
                    label: "Term"
                }, {
                    prop: "SEMD_FromDate",
                    label: "Term From Date"
                }, {
                    prop: "SEMD_ToDate",
                    label: "Term To Date"
                }],
                debugAutoGetLevelAcademicAutoGetListAllAgeCoursesInt: [],
                debugAutoGetLevelAcademicAutoGetListAllAgeCourses: [{
                    prop: "PK_Course_ID",
                    label: "Crs ID"
                }, {
                    prop: "CRS_Course_Name",
                    label: "Level"
                }, {
                    prop: "CRS_Age",
                    label: "Age"
                }],
            };
        },
        async created() {
            if (this.$route.query.Token !== '' && this.$route.query.Token !== undefined && this.$route.query.Token !== null) {
                this.checkToken(this.$route.query.Token);
            } else {
                window.location.replace('/');
            }
        },
        methods: {
            async checkToken(value){
                try {
                    const response = await DataSource.shared.checkSecretAdminConfigToken(value);
                    if (response) {
                        if (response.code === '1') {
                           console.log('you have correct token!');
                        } else {
                            window.location.replace('/');
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            openClearTokenValidateModal () {
                this.inputClearTokenUserName = '';
                this.inputClearTokenPassword = '';
                this.$refs.clearTokenLoginValidate.show();
            },
            async clearToken(){
                try {
                    if (this.inputClearTokenUserName === '' || this.inputClearTokenPassword === '') {
                        this.$notify({
                            title: 'Require',
                            message: 'Require User Name and Password...'
                        });
                    } else {
                        const response = await DataSource.shared.clearAllToken(this.inputClearTokenUserName, this.inputClearTokenPassword);
                        if (response) {
                            if (response.code === '99') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Error check access...'
                                });
                            } else if (response.code === '2') {
                                this.$notify.error({
                                    title: 'Invalid',
                                    message: 'Invalid Login'
                                });
                            } else {
                                this.$notify({
                                    title: 'Success',
                                    message: 'All Tokens have clear'
                                });

                                this.$refs.clearTokenLoginValidate.hide();
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            openPatchEmptyLevelInStudentCourseModal () {
                this.inputEmptyLevelInStudentCourseLevelUserName = '';
                this.inputEmptyLevelInStudentCourseLevelPassword = '';
                this.inputEmptyLevelInStudentCourseStudentID = '';
                this.inputEmptyLevelInStudentCourseLevel = '';
                this.emptyLevelInStudentCourseStudentListInt = [];
                this.inputEmptyLevelInStudentCourseLevelList = [];
                this.$refs.patchEmptyLevelInStudentCourse.show();
            },
            async searchEmptyLevelInStudentCourseStudent(){
                try {
                    if (this.inputEmptyLevelInStudentCourseStudentID === '') {
                        this.$notify({
                            title: 'Require',
                            message: 'Require Student ID to search...'
                        });
                    } else {
                        this.emptyLevelInStudentCourseStudentListInt = [];
                        this.inputEmptyLevelInStudentCourseLevelList = [];
                        this.inputEmptyLevelInStudentCourseLevel = '';

                        const response = await DataSource.shared.getStudentEmptyCourseIDInStudentCourse(this.inputEmptyLevelInStudentCourseStudentID);
                        if (response) {
                            if (response.code === '99') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Error get student...'
                                });
                            } else if (response.code === '2') {
                                this.$notify.error({
                                    title: 'No Record',
                                    message: 'No records found...'
                                });
                            } else {
                                this.emptyLevelInStudentCourseStudentListInt = response.Table;
                                this.inputEmptyLevelInStudentCourseLevelList = response.Table1;
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async patchEmptyLevelStudent () {
                if (this.inputEmptyLevelInStudentCourseLevel === '' || this.inputEmptyLevelInStudentCourseLevelUserName === '' || this.inputEmptyLevelInStudentCourseLevelPassword === '') {
                    this.$notify({
                        title: 'Require',
                        message: 'Please select Level & key in User Name And Password...'
                    });
                } else {
                    const response = await DataSource.shared.updateStudentEmptyCourseIDInStudentCourse(this.inputEmptyLevelInStudentCourseLevelUserName, this.inputEmptyLevelInStudentCourseLevelPassword, this.emptyLevelInStudentCourseStudentListInt[0]['Student Course ID'], this.inputEmptyLevelInStudentCourseLevel);
                    if (response) {
                        if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Error update student level...'
                            });
                        } else if (response.code === '2') {
                            this.$notify.error({
                                title: 'Invalid',
                                message: 'Invalid Login'
                            });
                        } else {
                            this.$notify({
                                title: 'Success',
                                message: 'Update successfully...'
                            });

                            this.$refs.patchEmptyLevelInStudentCourse.hide();
                        }
                    }
                }
            },
            openDebugAutoGetLevelAcademicYearModal () {
                this.ddlDebugAutoGetLevelAcademicYearSchoolID = '';
                this.ddlDebugAutoGetLevelAcademicYearSchoolIDList = [];
                this.inputDebugAutoGetLevelAcademicYearDOB = '';
                this.inputDebugAutoGetLevelAcademicYearCommencementDate = '';
                this.inputDebugAutoGetLevelAcademicYearUserName = '';
                this.inputDebugAutoGetLevelAcademicYearPassword = '';
                this.debugAutoGetLevelAcademicAutoGetListInt = [];
                this.debugAutoGetLevelAcademicAutoGetListActiveSemesterInt = [];
                this.debugAutoGetLevelAcademicAutoGetListAllAgeCoursesInt = [];

                this.getAllSchools();

                this.$refs.debugAutoGetLevelAcademicYear.show();
            },
            async getAllSchools(){
                try {
                    const response = await DataSource.shared.getAllSchools();
                    if (response) {
                        if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Error get student...'
                            });
                        } else if (response.code === '2') {
                            this.ddlDebugAutoGetLevelAcademicYearSchoolIDList = [];
                        } else {
                            this.ddlDebugAutoGetLevelAcademicYearSchoolIDList = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async getDebugAutoGetLevelAcademicYear(){
                try {
                    if (this.ddlDebugAutoGetLevelAcademicYearSchoolID === '' || this.inputDebugAutoGetLevelAcademicYearDOB === '' || this.inputDebugAutoGetLevelAcademicYearCommencementDate === '' || this.inputDebugAutoGetLevelAcademicYearUserName === '' || this.inputDebugAutoGetLevelAcademicYearPassword === '') {
                        this.$notify({
                            title: 'Require',
                            message: 'Please fill in all information....'
                        });
                    } else {
                        this.debugAutoGetLevelAcademicAutoGetListInt = [];
                        this.debugAutoGetLevelAcademicAutoGetListActiveSemesterInt = [];
                        this.debugAutoGetLevelAcademicAutoGetListAllAgeCoursesInt = [];

                        const response = await DataSource.shared.getDebugAutoGetLevelAcademicYear(this.inputDebugAutoGetLevelAcademicYearUserName, this.inputDebugAutoGetLevelAcademicYearPassword, this.inputDebugAutoGetLevelAcademicYearCommencementDate, this.inputDebugAutoGetLevelAcademicYearDOB, this.ddlDebugAutoGetLevelAcademicYearSchoolID);
                        if (response) {
                            if (response.code === '99') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Error get student...'
                                });
                            } else if (response.code === '2') {
                                this.$notify.error({
                                    title: 'Invalid',
                                    message: 'Invalid Login...'
                                });
                            } else {
                                // response.SummaryTable.forEach(m => {
                                //     if (m.Prop !== 'Debug Active Semester Table' && m.Prop !== 'Debug Active All Age Courses Table') {
                                //         this.debugAutoGetLevelAcademicAutoGetListInt.push(m);
                                //     } else {
                                //         if (m.Prop === 'Debug Active Semester Table') {
                                //             console.log(m.Value);
                                //             this.debugAutoGetLevelAcademicAutoGetListActiveSemesterInt = m.Value.Table;
                                //         } else if (m.Prop === 'Debug Active All Age Courses Table') {
                                //             console.log(m.Value);
                                //         }
                                //     }
                                // });
                                this.debugAutoGetLevelAcademicAutoGetListInt = response.SummaryTable.Table;
                                this.debugAutoGetLevelAcademicAutoGetListActiveSemesterInt = response.DebugActiveSemesterTable.Table;
                                this.debugAutoGetLevelAcademicAutoGetListAllAgeCoursesInt = response.DebugActiveAllAgeCourses.Table;
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
        },
    }
</script>

<style scoped>
.fullWidth {
    width: 100%;
}
</style>