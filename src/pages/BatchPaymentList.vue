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
                                :value="tempcourseList_item.PK_Course_ID"
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

            <div class="datatable-form__submit text-center">
                <button class="btn btn-success testbtn" id="btnTest" v-on:click="test()">testcheckitem</button>
            </div>

            <div class="admin-wrap">
                <div class="pb-5">
                    <div class="empty-list_image"
                         v-if="UnbilledBatchPaymentListInt.length<1">
                        <strong>{{startupText}}</strong>
                        <img src="../assets/notfound.png"/>
                    </div>

                    <div v-if="UnbilledBatchPaymentListInt.length>0" class="datatable_group">
                        <data-tables :data="UnbilledBatchPaymentListInt" @selection-change="changeSelection"
                                     :row-key="getRowKeys" width="55" stripe tooltip-effect='light' border>
                            <el-table-column type="selection" width="55" :reserve-selection="true" prop="id">
                            </el-table-column>
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
                spdSelection:[],
                arrobj_Classes:null,
                obj_SelectedClass:null,

                getRowKeys(rows){
                    console.log(rows.PK_SPD_ID);
                    return row.PK_SPD_ID;
                },
                selectedData:[],

                academicYearListSelected:null,
                academicYearList:[],
                academicYearListResponse:'',
                UnbilledBatchPaymentListInt:[],
                UnbilledBatchPaymentList:[{
                    prop: "StudentName",
                    label: "Student Name"
                }, {
                    prop: "Index_No",
                    label: "Student Number"
                }, {
                    prop: "SPPD_PayerName",
                    label: "Billing Items"
                }, {
                    prop: "SPPD_GstValue",
                    label: "GST"
                },{
                    prop: "SPPD_PaymentAmount",
                    label: "Total"
                },{
                    prop: "SPPD_TotalValue",
                    label: "Total(IncludedGst)"
                }],
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

            test(){
                console.log(this.spdSelection);
            },

            async changeSelection(val) {
                this.spdSelection = val;

                //get rows key data
                this.selectedData =[];
                if(val){
                    val.forEach(m=>{
                        if(m){
                            this.selectedData.push(m.PK_SPD_ID);
                        }
                    })
                    //end get rows key data
                    console.log(this.selectedData);
                }
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

                await DataSource.shared.getClassByAcademicYear(this.academicYearListSelected).then((result) => {
                    if (result.code == 2 || result.code == 99) {
                        this.courseListSelected = null;
                        return;
                    }

                    this.courseList = this.groupBy(result.Table, "CRS_Course_Name");

                });
            },

            async Search() {
                try {
                    this.startupText = "No Data Found...";

                    if (!this.schoolsListSelected)
                    {
                        this.$notify({
                            title: 'Require',
                            message: '"School"'
                        });
                    }
                    else
                        {
                            const response = await DataSource.shared.getUnbilledBatchPaymentList(this.schoolsListSelected,
                                '','',
                                this.inputFromDate[0],this.inputFromDate[1]);

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
                            } else
                                {
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

