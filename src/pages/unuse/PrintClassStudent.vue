<template>
    <div id="printClassStudent" class="container">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <EventTagsComponent @tags="setTags"></EventTagsComponent>
            <el-button-group>
                <el-button class="col-xs-2" v-on:click="AddComponentValue()">Add Student</el-button>
                <el-button class="col-xs-2" v-on:click="ClearSelectedItems()">Clear</el-button>
            </el-button-group>
        </div><hr>

        <div div v-if="SelectedStudentListInt.length>0" class="datatable_group">
            <h5 class="text-left mb-3"><p class="font-weight-bold">Selected Student List</p></h5>
            <div class="datatable-form__submit text-right">
                <button class="btn btn-success searchbtn" id="btnPrint" v-on:click="PrintPreviewBtnClick()">Print&Preview</button><br>
            </div>
                <data-tables :data="SelectedStudentListInt"
                             @selection-change="changeSelection" width="55" stripe tooltip-effect='light' border
                             ref="SelectedStudentListTable">
<!--                    <el-table-column type="selection" width="55" :reserve-selection="true">-->
<!--                    </el-table-column>-->
                    <el-table-column v-for="item in SelectedStudentList"
                                     :prop="item.prop"
                                     :label="item.label"
                                     :key="item.prop"
                                     sortable="custom">
                    </el-table-column>
                </data-tables>
        </div>

    </div>
</template>

<script>
    import DataSource from "../data/datasource";
    import EventTagsComponent from "../components/Event_Tags_Component";
    import Cookies from "js-cookie";
    export default {
        name: "PrintClassStudent",
        components:{ EventTagsComponent,},
        async created() {
            // this.imgStaffProfile = ProfileImg;
        },
        async mounted() {
            this.userType = Cookies.get('userTypeSession');
            this.sessionID = Cookies.get('userIDSession');
        },
        data(){
            return{
                test:'',
                spdSelection:[],
                SelectedStudentListInt:[],
                SelectedStudentList:[{
                    prop: "StudentFullName",
                    label: "Student Name"
                }, {
                    prop: "Index_No",
                    label: "Index No"
                },{
                    prop: "CLS_ClassName",
                    label: "Class"
                },{
                    prop: "CRS_Course_Name",
                    label: "Course"
                }],
                SelectedStudentListAction: {
                    label: 'More Info',
                    props: {
                        align: 'center',
                    },
                    buttons: [{
                        props: {
                            type: 'primary',
                            icon: 'el-icon-info'

                        },

                        handler: row => {
                            console.log(row);
                            this.studentCourseID = row.PK_Student_Course_ID;
                            this.studentID = row.FK_Student_ID;
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
                        label: 'More Info'
                    }]
                },
            }
        },
        methods:{
            async changeSelection(val) {
                this.spdSelection = val;
            },
            setTags(value) {
                try {
                    this.tags = value;
                } catch (e) {
                    this.results = e;
                }
            },
            AddComponentValue() {
                try {
                    if (this.tags) {
                        let spdList =[];
                        this.tags.forEach(m=>{
                            if(!m.SF_File_Name){
                                m.SF_File_Name="";
                            }
                            let list={
                                Student_ID:m.Student_ID,
                                StudentFullName:m.First_Name+' '+m.Middle_Name+' '+m.Last_Name,
                                SF_File_Name:m.SF_File_Name,
                                Index_No:m.Index_No,
                                CRS_Course_Name:m.CRS_Course_Name,
                                CLS_ClassName:m.CLS_ClassName,
                                SMT_Code:m.SMT_Code,
                                CLS_Batch:m.CLS_Batch,
                            };
                            spdList.push(list);
                        });
                        this.SelectedStudentListInt=spdList;
                        console.log(this.SelectedStudentListInt,'this.SelectedStudentListInt',' this.tags',this.tags);
                        this.$notify({
                            title: 'Success',
                            message: 'Successfully!',
                            type: 'success'
                        });
                        this.$refs.addClassModal.hide();
                    } else if(this.SelectedStudentListInt)
                    {
                        this.$notify.error({
                            title: 'Error, No selected student, please try again',
                            message: 'Error'
                        });
                    }
                    else {
                        this.$notify.error({
                            title: 'Error, please try again',
                            message: 'Error'
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            ClearSelectedItems(){
                try{
                    console.log('Clear');
                    this.SelectedStudentListInt=[];
                }
                catch (e) {
                    this.results = e;
                }
            },
            displayPdf(base64string) {
                var byteChar = atob(base64string);
                var byteNo = new Array(byteChar.length);
                for (var i = 0; i < byteChar.length; i++) {
                    byteNo[i] = byteChar.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNo);
                var file = new Blob([byteArray], {type: 'application/pdf;base64'});
                var fileUrl = URL.createObjectURL(file);
                window.open(fileUrl, '_blank', 'width=500, height=500');
                // window.print(fileUrl, '_blank', 'width=500, height=500');
            },
            async PrintPreviewBtnClick(){
                this.$vs.loading();
                try {
                    if(this.tags.length>50){
                        this.$notify.error({
                            title: 'Message',
                            message: 'Max 50 students per print!'
                        });
                    }
                    const resp = await DataSource.shared.generateClassStudentForPrinting(JSON.stringify(this.SelectedStudentListInt));
                    if (resp) {
                        switch (resp.code) {
                            case "1":
                                console.log('Print success!');
                                break;
                            case "2":
                                console.log('Cannot find student record!');
                                break;
                            case "88":
                                this.$router.push('/');
                                break;
                            case "99":
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'cannot print student card!'
                                });
                                break;

                            default:
                                this.displayPdf(resp.code);
                                this.SelectedStudentListInt=[];
                        }

                    }

                }
                    catch (e) {
                    this.results = e;
                }

                this.$vs.loading.close();

            },
        }
    }
</script>

<style scoped>

</style>