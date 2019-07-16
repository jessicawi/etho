<template>
    <div id="student-edit-class" class="mt-3 container admin-wrap">
        <div class="row header mb-5">
            <div class="col-lg-6 ">
                <span class="d-block text-left">{{titleCourseName}}  /  Student Status: {{lblStudentStatus}}</span>
                <h3 class="text-left" id="promotionTitleVueTour">{{lblStudentName}}</h3>
            </div>
            <div class="col-lg-6 ">
                <!--<select class="form-control pro-edt-select form-control-primary">-->
                <!--<option v-for="item in EditClassList" v-bind:value="item.PK_Class_ID.trim()">{{-->
                <!--item.CLS_ClassName.trim()}} ({{item.CLS_Batch.trim()}})-->
                <!--</option>-->
                <!--</select>-->
                <el-popover
                        placement="bottom"
                        width="200"
                        trigger="click"
                        popper-class="student-status-popover">
                    <el-select ref="ddlEditClass" v-model="ddlEditClass" placeholder="Select Class" class="mb-3 ">
                        <el-option
                                v-for="item in EditClassList"
                                :key="item.value"
                                :label='item.CLS_ClassName.trim() + "(" + item.CLS_Batch.trim() + ")"'
                                :value="item.PK_Class_ID.trim()"
                                :disabled="item.disabled">
                        </el-option>
                    </el-select>
                    <el-button type="primary" round v-on:click="AddClass">ADD</el-button>
                    <el-button type="primary" round slot="reference" class="float-right"><i class="material-icons">
                        add_circle
                    </i> Add Class
                    </el-button>
                </el-popover>
                <el-button type="primary" round slot="reference" class="float-right mr-2" @click="backtoStudent"><i class="material-icons">
                    keyboard_arrow_left
                </i> Back
                </el-button>
            </div>
        </div>
        <label style="display:none !important;">{{lblStudentID}}</label>
        <label style="display:none !important;">{{lblCourseID}}</label>
        <label style="display:none !important;">{{lblSemID}}</label>
        <label style="display:none !important;">{{lblSubjectCourseID}}</label>
        <div>
            <!--div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Student Name: {{lblStudentName}}</label>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Student Status: {{lblStudentStatus}}</label>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Class</label>
                    <select ref="ddlEditClass" class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in EditClassList" v-bind:value="item.PK_Class_ID.trim()">{{
                            item.CLS_ClassName.trim()}} ({{item.CLS_Batch.trim()}})
                        </option>
                    </select>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 buttonArea">
                    <button class="btn btn-primary waves-effect waves-light m-r-10" v-on:click="AddClass">Add Class
                    </button>
                </div>
            </div-->
            <div class="empty-list_image" v-if="list&&list.length<1">
                <strong>No Data Found...</strong>
                <img src="../assets/notfound.png"/>
            </div>
            <div v-if="list.length>0">
                <data-tables :data="list">
                    <el-table-column v-for="studentClassListInfo in studentClassList" :prop="studentClassListInfo.prop"
                                     :label="studentClassListInfo.label" :key="studentClassListInfo.prop"
                                     sortable="custom">
                    </el-table-column>
                </data-tables>
            </div>
        </div>
    </div>
</template>
<script>
    import DataSource from "../data/datasource";

    export default {
        name: "StudentEditClass",
        async created() {
            this.lblStudentID = this.$route.query.id;
            this.lblCourseID = this.$route.query.courseid;
            this.lblSemID = this.$route.query.semid;
            this.lblSubjectCourseID = this.$route.query.subjectcourseid;
            await this.BindStudentInfo();
        },
        async mounted() {
            await this.GetStudentClassList();
            await this.getStudentLevel();
        },
        data() {
            return {
                EditClassList: [],

                lblStudentID: '',
                lblCourseID: '',
                lblStudentName: '',
                lblStudentStatus: '',
                lblSemID: '',
                lblSubjectCourseID: '',

                list: [],
                studentClassList: [{
                    prop: "CLS_ClassName",
                    label: "Class Name",
                }, {
                    prop: "SCI_AssignedOn_convert",
                    label: "Assigned On"
                }, {
                    prop: "CONname",
                    label: "Assigned By"
                }, {
                    prop: "CLS_Batch",
                    label: "Programme"
                }],
                titleCourseName: '',
                ddlEditClass: [],
                tempQuery: "",
            };
        },
        methods: {
            backtoStudent(){
                this.$router.push('student?id=' + this.lblStudentID);
            },
            async BindEditClass(queryString) {
                this.tempQuery = queryString;
                try {
                    const response = await DataSource.shared.getEditClass(this.lblSemID, this.lblSubjectCourseID, queryString);
                    if (response) {

                        if (response.code === '99') {
                            this.EditClassList = [];
                        } else {
                            this.EditClassListResponse = response.Table;
                            this.EditClassListResponse.forEach(m => {
                                this.EditClassList.push(m);
                            });
                        }
                        // if (response) {
                        //     this.EditClassListResponse = response.Table;
                        //     this.EditClassListResponse.forEach(m => {
                        //         this.EditClassList.push(m);
                        //     });
                        //     console.log(this.EditClassListResponse,"EditClassListResponse");
                        //     console.log(this.EditClassList,"EditClassList");
                        // }
                    }
                } catch (e) {
                    this.results = e;
                }
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
            async GetStudentClassList() {
                this.$vs.loading();
                try {
                    const response = await DataSource.shared.getStudentClass(this.lblStudentID, this.lblCourseID);
                    if (response) {
                        if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Please try again later'
                            });
                        } else if (response.code === '2') {
                            this.BindEditClass('');
                        } else {
                            this.list = response.Table;

                            //filter the added class to BindEditClass
                            let customClassNotEqual = '';
                            this.GetStudentClassListResponse = response.Table;
                            this.GetStudentClassListResponse.forEach(m => {
                                if (customClassNotEqual == '') {
                                    customClassNotEqual = m.PK_Class_ID;
                                } else {
                                    customClassNotEqual = customClassNotEqual + "," + m.PK_Class_ID;
                                }
                            });

                            this.BindEditClass(customClassNotEqual);
                            //filter the added class to BindEditClass
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },
            async getStudentLevel() {
                const response = await DataSource.shared.getStudentLevel(this.$route.query.id);
                if (response) {
                    let tempCourseName = response.Table;
                    tempCourseName.forEach(m => {
                        this.titleCourseName = m.CRS_Course_Name;
                    });
                }
            },
            async AddClass() {
                if (this.$refs.ddlEditClass.value === '' || this.$refs.ddlEditClass.value === null) {
                    this.$notify.error({
                        title: 'Error',
                        message: 'Please choose class'
                    });
                } else {
                    try {
                        const response = await DataSource.shared.setClass(this.lblStudentID, this.$refs.ddlEditClass.value, this.lblCourseID);
                        if (response) {
                            if (response.code === '1') {
                                this.$notify({
                                    title: 'Success',
                                    message: 'Class added',
                                    type: 'success'
                                });
                                this.GetStudentClassList();
                                this.ddlEditClass = "";
                                this.EditClassList = [];
                                this.BindEditClass(this.tempQuery);
                                // window.location.replace('/student-edit-class?courseid=' + this.lblCourseID + '&id=' + this.lblStudentID + '&semid=' + this.lblSemID + '&subjectcourseid=' + this.lblSubjectCourseID);
                            } else if (response.code === '2') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'The class have been exceeded max number of student!'
                                });
                            } else if (response.code === '99') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Please try again later'
                                });
                            }
                        }
                    } catch (e) {
                        this.results = e;
                    }
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