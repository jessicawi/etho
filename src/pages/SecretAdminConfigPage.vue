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
        },
    }
</script>

<style scoped>
.fullWidth {
    width: 100%;
}
</style>