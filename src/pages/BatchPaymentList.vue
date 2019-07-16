<template>
    <div id="batch-payment-list">
        <div class="container ">
            <div class="row header mb-5">
                <div class="col-lg-5 ">
                    <h3 class="text-left mb-3">Batch Invoice</h3>
                </div>
            </div>

            <div class="datatable-form__header atr-header-wrap mb-4">

                <div class="datatable-form__input form-group flex-1">
                    <label>Schools</label>
                    <el-select placeholder="Select School" v-model="schoolsListSelected"
                               v-on:change="BindAcademicYear()" class="ddlSearchStatus">
                        <el-option
                                v-for="item in schoolsList"
                                :label="item.SCH_Name"
                                :value="item.PK_SCH_ID"
                        >
                        </el-option>
                    </el-select>
                </div>

                <div class="datatable-form__input form-group flex-1">
                    <label>Academic Year</label>
                    <el-select class="ddlSearchStatus"
                               placeholder="Search Academic Year" v-model="academicYearListSelected"
                               v-on:change="loadClasses()"  filterable>
                        <el-option
                                v-for="item in academicYearList"
                                :label="item.SMT_Code"
                                :value="item.PK_Semester_ID"
                        >
                        </el-option>
                    </el-select>
                </div>

                <div class="datatable-form__input form-group flex-1">
                    <label>Course and Class</label>
                    <el-select v-model="courseListSelected" placeholder="Class" id="ddl_Class"
                               class="mb-3 promotion-academicYear-select"
                               :disabled="academicYearListSelected === null">
                        <el-option-group
                                v-for="tempcourseList_item of courseList"
                                :key="tempcourseList_item.id"
                                :label="tempcourseList_item.Str_SortBy">
                            <el-option
                                    v-for="tempobj_Class of tempcourseList_item.ArrObj_Items"
                                    :key="tempobj_Class.id"
                                    :label="tempobj_Class.CLS_ClassName + ' of ' + tempobj_Class.CLS_Batch"
                                    :value="tempobj_Class">
                            </el-option>
                        </el-option-group>
                    </el-select>
                </div>

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
                </div>

                <div class="datatable-form__submit text-center">
                    <button class="btn btn-success searchbtn" id="btnSearch" v-on:click="Search()">Search</button>
                </div>
            </div>
            <div class="admin-wrap">
                <div class="pb-5">
                    <div class="empty-list_image"
                         v-if="UnbilledBatchPaymentListInt.length<1">
                        <strong>{{startupText}}</strong>
                        <img src="../assets/notfound.png"/>
                    </div>

                    <div v-if="UnbilledBatchPaymentListInt.length>0" class="datatable_group">
                        <data-tables :data="UnbilledBatchPaymentListInt">
                            <el-table-column v-for="item in UnbilledBatchPaymentList"
                                             :prop="item.prop"
                                             :label="item.label"
                                             :key="item.prop"
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
    export default {
        name: "BatchPaymentList",

        data(){
            return{
                arrobj_Classes:null,
                obj_SelectedClass:null,

                academicYearListSelected:null,
                academicYearList:[],
                academicYearListResponse:'',
                UnbilledBatchPaymentListInt:[],
                UnbilledBatchPaymentList:[],
                schoolsListSelected:'',

                courseListResponse:'',
                courseListSelected:null,
                courseList:[],
                classListSelected:'',
                classList:[],
                inputFromDate:'',
                startupText:'',

                schoolsList:[],
                allSchoolsList:[],
                schoolsListResponse:[],

                schoolListInt:[],
                currentSchoolsName:'',
            }
        },
        async mounted(){
            await this.BindSchool();
        },
        async created(){},
        methods:{
            testDate(){
                console.log('TESTDATE');
            },

            async BindSchool(){
                try {
                    const response = await DataSource.shared.getAllActiveSchool('', 'UTY201300000061');
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'No School Found!'
                            });
                        } else if (response.code === '2') {
                            this.schoolsList = [];
                        } else {
                            this.schoolsListResponse = response.Table;
                            this.schoolsListResponse.forEach(m => {
                                if (m.PK_SCH_ID !== 'SCH20120000001') {
                                    this.schoolsList.push(m);
                                }
                            });
                            this.schoolsListResponse =[];
                        }

                    }
                } catch (e) {
                    this.results = e;
                }
            },

            async BindAcademicYear(){
                try{
                    console.log(this.schoolsList,'this.schoolsList',this.schoolsListSelected);
                    this.academicYearList=[];
                    if(this.schoolsListSelected.length>0){
                        const response = await DataSource.shared.getAcademicYearBySchoolID(this.schoolsListSelected);
                        this.academicYearListResponse=response.Table;
                        this.academicYearListResponse.forEach(m => {
                            this.academicYearList.push(m);
                        });
                        this.academicYearListResponse=[];
                    }
                }
                catch (e) {
                    this.results = e;
                }
            },

            async loadClasses() {

                this.courseList = null;

                console.log(this.academicYearListSelected);

                await DataSource.shared.getClassByAcademicYear(this.academicYearListSelected).then((result) => {
                    if (result.code == 2 || result.code == 99) {
                        this.courseListSelected = null;
                        return;
                    }

                    this.courseList = this.groupBy(result.Table, "CRS_Course_Name");
                    console.log(this.courseList);
                });
            },

            async Search() {
                try {
                    this.startupText = "No Data Found...";

                    if (this.inputFromDate === '' || this.schoolsListSelected === '' || this.academicYearListSelected === ''
                    ||this.courseListSelected === '') {
                        this.$notify({
                            title: 'Require',
                            message: 'Please select "From Date", "To Date", "School", "course" and "class"'
                        });
                    } else {
                        let schoolsList = [];
                        let schoolsListTemp = {
                            schoolsList: this.schoolsListSelected
                        };
                        schoolsList.push(schoolsListTemp);

                        let coursesList = [];
                        let courseListTemp = {
                            fromDate: this.inputFromDate[0],
                            toDate: this.inputFromDate[1],
                            schoolsListSelected: this.schoolsListSelected,
                            schoolsList: schoolsList,
                        };
                        coursesList.push(courseListTemp);

                        console.log(this.schoolsListSelected,
                            this.courseListSelected.PK_Course_ID,this.courseListSelected.PK_Class_ID,
                            this.inputFromDate[0],this.inputFromDate[1]);

                        const response = await DataSource.shared.getUnbilledBatchPaymentList(this.schoolsListSelected,
                            this.courseListSelected.PK_Course_ID,this.courseListSelected.PK_Class_ID,
                            this.inputFromDate[0],this.inputFromDate[1]);

                        this.schoolListInt = [];

                        if (response) {
                            if (response.code === '88') {
                                window.location.replace('/');
                            } else if (response.code === '99') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Error 99!'
                                });
                            } else if (response.code === '2') {
                                this.$notify({
                                    title: 'No Record',
                                    message: 'No Record Found'
                                });
                            } else {
                                    this.UnbilledBatchPaymentListInt = response.Table;

                                this.currentSchoolsName = this.$refs.schoolsListSelected.selected.label;
                            }
                        }

                    }
                } catch (e) {
                    this.results = e;
                }
            },

            groupBy(data, key) {
                //Credits to Ceasar Bautista and Juan Castillo @ stackoverflow
                /*return data.reduce(function(storage, item) {
                    let group = item[key];

                    storage[group] = storage[group] || [];
                    storage[group].push(item);
                    return storage;
                }, {});*/

                let ArrObj_Sorted = [];

                for (let item of data) {
                    let index = ArrObj_Sorted.findIndex(x => x.Str_SortBy === item[key]);

                    if (index === -1) {
                        ArrObj_Sorted.push({Str_SortBy: item[key], ArrObj_Items: [item]});
                    } else
                        ArrObj_Sorted[index].ArrObj_Items.push(item);
                }

                return ArrObj_Sorted;
            },
        },
    }
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

