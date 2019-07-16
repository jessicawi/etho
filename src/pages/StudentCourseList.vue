<template>
    <div id="studentcourselist">
        <div class="container">
            <div class="row">
                <div class= "col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="">
                            <h5 class="text-left student-form__title" id="StudentInformation">
                                Student Information</h5>
                        </div>

                        <div class="row form-group__wrapper">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Student Name</label>
                                <input type="text" class="form-control form__input" v-model="inputStudentName" disabled>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Student NO</label>
                                <input type="text" class="form-control form__input" v-model="inputStudentNO" disabled>
                            </div>
<!--                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">-->
<!--                                <label>Created By</label>-->
<!--                                <input type="text" class="form-control" v-model="inputCreatedBy" disabled>-->
<!--                            </div>-->
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Creation Date</label>
                                <input type="text" class="form-control" v-model="inputCreationDate" disabled>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Status</label>
                                <input type="text" class="form-control" v-model="inputStudentStatus" disabled>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Meal Preferences</label>
                                <input type="text" class="form-control" v-model="inputMealPreferences" disabled>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Payee Name</label>
                                <input type="text" class="form-control" v-model="inputPayeeName" disabled>
                            </div>
<!--                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">-->
<!--                                <label>From Date</label>-->
<!--                                <div class="date">-->
<!--                                    <el-date-picker v-model="inputFromDate" format="dd/MM/yyyy"-->
<!--                                                    value-format="dd/MM/yyyy" type="date" disabled>-->
<!--                                    </el-date-picker>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">-->
<!--                                <label>To Date</label>-->
<!--                                <div class="date">-->
<!--                                    <el-date-picker v-model="inputToDate" format="dd/MM/yyyy"-->
<!--                                                    value-format="dd/MM/yyyy" type="date" disabled>-->
<!--                                    </el-date-picker>-->
<!--                                </div>-->
<!--                            </div>-->
                        </div>

                    <h5 class="text-left">Student Course List</h5>
                    <div v-if="StudentCourseListInt.length>0" class="datatable_group">
                        <data-tables :data="StudentCourseListInt" :action-col="StudentCourseListAction">
                            <el-table-column v-for="item in StudentCourseList" :prop="item.prop"
                                             :label="item.label" :key="item.prop">
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

    export default {
        name: "StudentCourseList",

        data(){
            return{
                inputStudentName:'',
                inputCreatedBy:'',
                inputCreationDate:'',
                inputStudentStatus:'',
                inputStudentLevel:'',
                inputIntake:'',
                inputFromDate:'',
                inputToDate:'',
                inputStudentNO:'',
                inputPayeeName:'',
                inputMealPreferences:'',

                sponsor_type:'',
                studentDetail:[],

                courseStatus:'',
                StudentCourseListInt:[],
                StudentCourseList:[{
                    label: 'Level',
                    prop: 'CRS_Course_Name',
                },{
                    label: 'School',
                    prop: 'SCH_Short_Name',
                },{
                    label: 'Academic Year',
                    prop: 'SMT_Code',
                },{
                    label: 'Level Start Date',
                    prop: 'SCRS_From_Date_convert',
                },{
                    label: 'Level End Date',
                    prop: 'SCRS_To_Date_convert',
                },{
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
                            icon: 'el el-circle-arrow-right'

                        },

                        handler: row => {
                            this.studentCourseID = row.PK_Student_Course_ID;
                            this.studentID=row.SCRS_FK_Student_ID;
                            this.courseStatus=row.SCRS_Status
                            if(this.studentCourseID){
                                this.$router.push('StudentPaymentPlan?sid=' + this.studentID+'&scid='+this.studentCourseID+'&crsStatus='+this.courseStatus);
                            }
                            else{
                                this.$notify.error({
                                    title: 'Message',
                                    message: 'Error.'
                                });
                            }
                        },
                        label: 'Payment Detail'
                    }]
                },
            }
        },

        async created(){
            await this.getStudentCourseSemesterInfo();
            await this.BindStudentInfo();
        },

        async mounted(){

        },

        methods:{
            async BindStudentInfo(){
                try{
                    const resp = await DataSource.shared.getStudent(this.$route.query.id, '', '', '', '');

                    this.studentDetail = resp.Table;
                    this.studentDetail.forEach(m=>{
                        this.inputStudentName=m.Full_Name;
                        this.inputStudentNO =m.Index_No;
                        this.inputStudentStatus=m.Status;
                        this.sponsor_type= m.sponsor_type;
                        this.inputCreationDate=m.Created_On_convert;
                        if(m.St_Meal_Preferences)
                        {this.inputMealPreferences= m.St_Meal_Preferences;}
                        else
                        {this.inputMealPreferences='N/A'}
                    })

                    const PayeeResp = await DataSource.shared.getPayee(this.inputStudentNO);
                    this.inputPayeeName = PayeeResp.PAR_Father_FirstName+' '+PayeeResp.PAR_Father_MiddleName+' '+PayeeResp.PAR_Father_LastName;

                }
                catch (e) {
                    this.results = e;
                }
            },

            async getStudentCourseSemesterInfo(){
                try{
                    const resp = await DataSource.shared.getStudentCourseSemesterInfo(this.$route.query.id,'');
                    this.StudentCourseListInt=resp.Table;
                    let spd_list=[];
                    this.StudentCourseListInt.forEach(m=>{
                        this.inputFromDate=m.SCRS_From_Date_convert;
                        this.inputToDate=m.SCRS_To_Date_convert;
                        this.inputStudentLevel=m.CRS_Course_Name;
                        this.inputIntake=m.SMT_Code;

                        spd_list.push(m);
                        }
                    )

                }
                catch (e) {
                    this.results = e;
                }
            },
        },
    }
</script>

<style scoped>

</style>