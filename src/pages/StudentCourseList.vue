<template>
    <div id="studentcourselist" class="">
        <div class="payment-title-wrap container mt-2">
            <h5 class="text-left payment-title" id="StudentInformation">
                Student Information</h5>
        </div>
        <div class="payment-header">
            <div class="container">
                <div class="payment-student-info">
                    <div class="payment-student-object">
                        <h4>{{inputStudentName}}</h4>
                        <span>Student Name</span>
                    </div>
                    <div class="payment-student-object">
                        <h4>{{inputStudentNO}}</h4>
                        <span>Student NO</span>
                    </div>
                    <div class="payment-student-object">
                        <h4>{{inputCommencementDate}}</h4>
                        <span>Commencement Date</span>
                    </div>
                    <div class="payment-student-object">
                        <h4>{{inputStudentStatus}}</h4>
                        <span>Status</span>
                    </div>
                    <div class="payment-student-object">
                        <h4>{{inputMealPreferences}}</h4>
                        <span>Meal Preferences</span>
                    </div>
                    <div class="payment-student-object">
                        <h4>{{inputPayeeName}}</h4>
                        <span>Payee Name</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="student-course-list container mt-5">
            <h5 class="text-left payment-title">Student Course List</h5>
            <div class="empty-list_icon" v-if="StudentCourseListInt&&StudentCourseListInt.length<1">
                <div class="mb-3">
                    <img src="../assets/notfound-icon.png"/>
                    <strong class="">No Data Found...</strong>
                </div>
            </div>
            <div v-if="StudentCourseListInt.length>0" class="datatable_group">
                <data-tables :data="StudentCourseListInt" :action-col="StudentCourseListAction">
                    <el-table-column label="Level" :min-width="55">
                        <template slot-scope="scope">
                            <span>{{ scope.row.CRS_Course_Name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Class" :min-width="50">
                        <template slot-scope="scope">
                            <span>{{ scope.row.ClassName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Batch" :min-width="50">
                        <template slot-scope="scope">
                            <span>{{ scope.row.Batch}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="School">
                        <template slot-scope="scope">
                            <span>{{ scope.row.SCH_Short_Name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Academic Year">
                        <template slot-scope="scope">
                            <span>{{ scope.row.SMT_Code }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Start Date" :min-width="55">
                        <template slot-scope="scope">
                            <span>{{ scope.row.SCRS_From_Date_convert }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="End Date" :min-width="55">
                        <template slot-scope="scope">
                            <span>{{ scope.row.SCRS_To_Date_convert }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Status" :min-width="50">
                        <template slot-scope="scope">
                            <span :class="scope.row.SCRS_Status">{{ scope.row.SCRS_Status }}</span>
                            <!--<span :class="`${scope.row.SCRS_Status==='Active' ? 'active' :''}`">{{ scope.row.SCRS_Status }}</span>-->
                        </template>
                    </el-table-column>
                </data-tables>
            </div>
        </div>
    </div>
</template>
<script>
    import DataSource from "../data/datasource";

    export default {
        name: "StudentCourseList",

        data() {
            return {
                inputStudentName: '-',
                inputCreatedBy: '',
                inputCreationDate: '',
                inputStudentStatus: '-',
                inputStudentLevel: '',
                inputIntake: '',
                inputFromDate: '',
                inputToDate: '',
                inputStudentNO: '-',
                inputPayeeName: '-',
                inputMealPreferences: '-',
                inputCommencementDate: '-',
                sponsor_type: '',
                studentDetail: [],

                courseStatus: '',
                StudentCourseListInt: [],
                StudentCourseList: [{
                    label: 'Level',
                    prop: 'CRS_Course_Name',
                }, {
                    label: 'School',
                    prop: 'SCH_Short_Name',
                }, {
                    label: 'Academic Year',
                    prop: 'SMT_Code',
                }, {
                    label: 'Level Start Date',
                    prop: 'SCRS_From_Date_convert',
                }, {
                    label: 'Level End Date',
                    prop: 'SCRS_To_Date_convert',
                }, {
                    label: 'Status',
                    prop: 'SCRS_Status',
                }],
                StudentCourseListAction: {
                    label: 'Payment Detail',
                    props: {
                        align: 'center',
                    },
                    buttons: [{

                        props: {
                            type: 'primary',
                            icon: 'el-icon-info'

                        },

                        handler: row => {
                            this.studentCourseID = row.PK_Student_Course_ID;
                            this.studentID = row.SCRS_FK_Student_ID;
                            this.courseStatus = row.SCRS_Status;
                            if (this.studentCourseID) {
                                this.$router.push('StudentPaymentPlan?sid=' + this.studentID + '&scid=' + this.studentCourseID + '&crsStatus=' + this.courseStatus);
                            } else {
                                this.$notify.error({
                                    title: 'Message',
                                    message: 'Error.'
                                });
                            }
                        },
                        label: 'Detail'
                    }]
                },
            };
        },

        async created() {
            await this.getStudentCourseSemesterInfo();
            await this.BindStudentInfo();

        },

        mounted() {
            //console.log(this.$refs.SCRS_Status.innerHTML);
        },

        methods: {
            async BindStudentInfo() {
                try {
                    const resp = await DataSource.shared.getStudent(this.$route.query.id, '', '', '', '');

                    this.studentDetail = resp.Table;
                    this.studentDetail.forEach(m => {
                        console.log(m);
                        this.inputStudentName = m.Full_Name+" "+m.Last_name;
                        this.inputStudentNO = m.Index_No;
                        this.inputStudentStatus = m.Status;
                        this.inputCommencementDate = m.Regst_date_convert;
                        this.sponsor_type = m.sponsor_type;
                        this.inputCreationDate = m.Created_On_convert;
                        if (m.St_Meal_Preferences) {
                            this.inputMealPreferences = m.St_Meal_Preferences;
                        } else {
                            this.inputMealPreferences = 'N/A';
                        }
                    });

                    const PayeeResp = await DataSource.shared.getPayee(this.inputStudentNO);

                    if(this.sponsor_type==="Father")
                    {
                        this.inputPayeeName = PayeeResp.PAR_Father_FirstName + ' ' + PayeeResp.PAR_Father_LastName;
                    }
                    else if(this.sponsor_type==="Mother")
                    {
                        this.inputPayeeName = PayeeResp.PAR_Mother_FirstName + ' ' + PayeeResp.PAR_Mother_LastName;
                    }
                    else if(this.sponsor_type==="Father Company")
                    {
                        this.inputPayeeName = PayeeResp.PAR_Father_CompanyName;
                    }
                    else if(this.sponsor_type==="Mother Company")
                    {
                        this.inputPayeeName = PayeeResp.PAR_Mother_CompanyName;
                    }
                    else
                    {
                        this.inputPayeeName = '';
                    }

                } catch (e) {
                    this.results = e;
                }
            },

            async getStudentCourseSemesterInfo() {
                try {
                    const resp = await DataSource.shared.getStudentCourseSemesterInfo(this.$route.query.id, '');
                    this.StudentCourseListInt = resp.Table;
                    let spd_list = [];
                    this.StudentCourseListInt.forEach(m => {
                            this.inputFromDate = m.SCRS_From_Date_convert;
                            this.inputToDate = m.SCRS_To_Date_convert;
                            this.inputStudentLevel = m.CRS_Course_Name;
                            this.inputIntake = m.SMT_Code;

                            spd_list.push(m);
                        }
                    );

                } catch (e) {
                    this.results = e;
                }
            },
        },
    };
</script>
<style scoped>
</style>