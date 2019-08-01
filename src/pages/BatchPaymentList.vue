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
                    <el-select v-model="courseListSelected" class="ddlSearchStatus" placeholder="Class" id="ddl_Class">
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
                            value-format="dd/MM/yyyy">
                    </el-date-picker>
                </div>

                <div class="datatable-form__submit text-center">
                    <button class="btn btn-success searchbtn" id="btnSearch" v-on:click="Search()">Search</button>
                </div>
            </div>

            <div class="admin-wrap">
                <div class="datatable-form__submit text-right">
                    <el-button-group v-if="UnbilledBatchPaymentListInt.length>1">
                        <div class="datatable-form__input form-group flex-1">
                            <el-date-picker
                                    v-model="inputDueDate"
                                    type="date"
                                    format="dd/MM/yyyy"
                                    value-format="dd/MM/yyyy"
                                    placeholder="**Payment Due Date">
                            </el-date-picker>
                        </div>
                        <el-button type="primary" variant="primary" v-on:click="batchPreviewClick()">
                            Preview
                        </el-button>
                        <el-button type="primary" variant="primary" v-on:click="batchGenerateClick()">
                            Generate
                        </el-button>
                    </el-button-group>
                </div>
                <div class="pb-5">
                    <div class="empty-list_image"
                         v-if="UnbilledBatchPaymentListInt.length<1">
                        <strong>{{startupText}}</strong>
                        <img src="../assets/notfound.png"/>
                    </div>

                    <div v-if="UnbilledBatchPaymentListInt.length>0" class="datatable_group">
                        <data-tables :data="UnbilledBatchPaymentListInt" @selection-change="changeSelection"
                                     :row-key="getRowKeys"
                                     width="55" stripe tooltip-effect='light' border>
                            <el-table-column type="selection" width="55" :reserve-selection="true">
                            </el-table-column>
                            <el-table-column v-for="item in UnbilledBatchPaymentList"
                                             :prop="item.prop"
                                             :label="item.label"
                                             :key="item.prop"
                                             sortable="custom">
                            </el-table-column>
                            <el-table-column label="GST" min-width="60px">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.newGSTAmount" type="number"
                                              v-on:change="updateTotalClick(scope.row.newGSTAmount,scope.row.SPPD_PaymentAmount,scope.row)"
                                              :min="adjustmentMin(scope.row.SPPD_GstValue)"
                                              :max="adjustmentMax(scope.row.SPPD_GstValue)"
                                              :step="0.01" placeholder="GST"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="Total(IncludedGst)" min-width="100px">
                                <template slot-scope="scope">
                                    <el-input id="totalValueWithGst" v-model="scope.row.SPPD_TotalValue" type="number" readonly="readonly"></el-input>
                                </template>
                            </el-table-column>
                        </data-tables>
                        <el-button type="primary" variant="primary" v-on:click="clearSelect()">
                            Clear All Selection
                        </el-button>
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
                readonly:true,
                spdSelection:[],
                arrobj_Classes:null,
                obj_SelectedClass:null,
                arrobj_selectedSPD:[],
                datePicker:{
                    disabledDate(date){

                        return date<(new Date().getTime() - (1 * 24 * 60 * 60 * 1000));
                        //  Without using the second variable, you can replace 7 for with your back x days:
                        //e.g return date< Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000));
                    }
                },
                selectedData:[],
                academicYearListSelected:null,
                academicYearList:[],
                academicYearListResponse:'',
                tempUnbillList:[],
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
                },{
                    prop: "SPPD_PaymentAmount",
                    label: "Amount"
                }],
                schoolsListSelected:'',
                inputDueDate:'',
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
                previewResultList:'',
            }
        },
        async mounted(){
            await this.BindSchool();
        },
        async created(){},

        methods:{
            getCurrentDate(){
                var currentDate =new Date();
                this.inputDueDate=currentDate;
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
                // window.openBrowser(fileUrl);
                window.open(fileUrl, '_blank', 'width=500, height=500');
            },

            async batchPreviewClick(){
                try{
                    let actionType = 'Preview';
                    let selected= this.sortByStudentNO();
                    console.log('this.arrobj_selectedSPD',this.arrobj_selectedSPD);
                    //let ObjList=[];
                    if (!this.inputDueDate)
                    {
                        this.$notify({
                            title: 'Require',
                            message: '"Payment Due Date"'
                        });
                    }
                    else{
                        let List = [];
                        let batchPaymentObj = {};
                        this.arrobj_selectedSPD.forEach(m=>{
                            let objList=[];
                            m.ArrObj_Items.forEach(n=>{
                                List = {
                                    studentCourseID:n.PK_Student_Course_ID,
                                    PK_SPD_ID:n.PK_SPD_ID,
                                    SPPD_PayerName:n.SPPD_PayerName,
                                    SPPD_PaymentItemType:n.SPPD_PaymentItemType,
                                    SPPD_PaymentAmount:n.SPPD_PaymentAmount,
                                    SPPD_GstValue:n.newGSTAmount,
                                };
                                objList.push(List);
                            });

                           batchPaymentObj["studentID_"+m.Str_SortBy] = objList;
                        });
                        console.log('batchPaymentObj=',batchPaymentObj);

                        const resp = DataSource.shared.generateBatchInvoice(JSON.stringify(batchPaymentObj),this.inputDueDate,actionType);
                        if (resp) {
                            if (resp.code === '88') {
                                window.location.replace('/');
                            } else if (resp.code === '99') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Error 99!'
                                });
                            } else if (resp.code === '2') {
                                this.$notify({
                                    title: 'No Record',
                                    message: 'No Record Found'
                                });
                            } else
                            {
                                this.displayPdf(resp.code);
                                console.log('OKOKOKK');

                            }
                        }
                    }
                }
                catch (e) {
                    this.results = e;
                }
            },

            batchGenerateClick(){
                try{
                    let actionType = 'Generate';
                    let selected = this.sortByStudentNO();
                    console.log(selected,actionType);
                }
                catch (e) {
                    this.results = e;
                }
            },

            clearSelect () {
                this.$refs.batchListTable.clearSelection();
            },

            getRowKeys(row){
                return row.PK_SPD_ID;
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

            adjustmentMin(value){
                return (parseFloat(value)-parseFloat(0.01));
            },

            adjustmentMax(value){
                return (parseFloat(value)+parseFloat(0.01));
            },

            updateTotalClick(gstValue,currentAmount,rowData){

                let gst = parseFloat(gstValue);
                let amount = parseFloat(currentAmount);
                let total = 0.0;

                total = gst +amount;

                this.UnbilledBatchPaymentListInt.forEach(m => {

                    if(m.PK_SPD_ID==rowData.PK_SPD_ID)
                    {
                        m.SPPD_TotalValue = total.toFixed(2);
                    }
                });
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
                        //todo: to refesh academic year, course and class list
                        await this.loadClasses();
                        this.courseListSelected='';
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
                            let courseID='';
                            let classID ='';

                            if(this.courseListSelected){
                                courseID = this.courseListSelected.PK_Course_ID;
                                classID = this.courseListSelected.PK_Class_ID;
                            }
                            else{
                                courseID = '';
                                classID = '';
                            }

                            const response = await DataSource.shared.getUnbilledBatchPaymentList(this.schoolsListSelected,
                                courseID,classID,this.inputFromDate[0],this.inputFromDate[1]);

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
                                    this.tempUnbillList = response.Table;
                                    let tempList = [];
                                    this.tempUnbillList.forEach(m=>{
                                        m.newGSTAmount=m.SPPD_GstValue;
                                        tempList.push(m);
                                    })
                                    this.UnbilledBatchPaymentListInt = tempList;

                                    this.currentSchoolsName = this.$refs.schoolsListSelected.selected.label;
                                }
                        }

                    }
                } catch (e) {
                    this.results = e;
                }
            },

            sortByStudentNO() {
                    let sortedList = this.groupBy(this.spdSelection, "Student_ID");
                    this.arrobj_selectedSPD = sortedList;
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
</style>
<style>
    #totalValueWithGst{border:0px solid}
</style>

