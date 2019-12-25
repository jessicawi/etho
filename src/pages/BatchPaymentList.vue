<template>
    <div id="batch-payment-list">
        <div class="container">
                    <h5 class="text-left mb-3">Batch Invoice</h5>

            <div class="datatable-form__header atr-header-wrap mb-4">

                <div class="datatable-form__input form-group flex-1">
                    <label>Academic Year</label>
                    <el-select class="ddlSearchStatus"
                               placeholder="Search Academic Year" v-model="academicYearListSelected"
                               v-on:change="loadCourses()"  filterable>
                        <el-option
                                v-for="item in academicYearList"
                                :label="item.SMT_Code"
                                :value="item.PK_Semester_ID"
                        >
                        </el-option>
                    </el-select>
                </div>

                <div class="datatable-form__input form-group flex-1">
                    <label>Course</label>
                    <el-select class="ddlSearchStatus"
                               placeholder="Select course" v-model="courseSelected"
                               v-on:change="loadClasses()"  filterable>
                        <el-option
                                v-for="item in courseList"
                                :label="item.CRS_Course_Name"
                                :value="item.PK_Course_ID"
                        >
                        </el-option>
                    </el-select>
                </div>

                <div class="datatable-form__input form-group flex-1">
                    <label>Class</label>
                    <el-select class="ddlSearchStatus"
                               placeholder="Select Class" v-model="classesSelected"
                               filterable>
                        <el-option
                                v-for="item in classesList"
                                :label="item.CLS_ClassName+'-'+item.CLS_Batch"
                                :value="item.PK_Class_ID"
                        >
                        </el-option>
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
                        <div class="col-lg-6" v-if="UnbilledBatchPaymentListInt.length>0">
                            <el-checkbox v-model="cbPrintMonthlyBreakdown" label="Print monthly breakdown" border
                                         class="float-left"></el-checkbox>
                        </div>
                    <el-button-group v-if="UnbilledBatchPaymentListInt.length>0">
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

                    <div v-if="negativeStudentListInt.length>0">
                        <b>Error List</b>
                        <data-tables :data="negativeStudentListInt"
                                     width="55" stripe tooltip-effect='light' border>
                            <el-table-column v-for="item in negativeStudentList"
                                             :prop="item.prop"
                                             :label="item.label"
                                             :key="item.prop"
                                             sortable="custom">
                            </el-table-column>
                        </data-tables>
                    </div>

                    <div v-if="UnbilledBatchPaymentListInt.length>0" class="datatable_group">
                        <div class="">
                            <el-input class="search-datatable" placeholder="Search Students"  v-model="UnbilledBatchPaymentListFilters[0].value">
                                <template slot="prepend">
                                    <i class="material-icons">search</i>
                                    <span>Search Student</span>
                                </template>
                            </el-input>
                        </div>
                        <data-tables ref="selectableTable" :page-size="pageSize"
                                     :pagination-props="{ pageSizes: [pageSize,100] }"
                                     :filters="UnbilledBatchPaymentListFilters"
                                     :data="UnbilledBatchPaymentListInt" @selection-change="changeSelection"
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
                            <el-table-column label="Total(IncludedGst)" min-width="70px">
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
    import Cookies from "js-cookie";
    import Vue from 'vue';

    export default {
        name: "BatchPaymentList",
        data(){
            return{
                pageSize:50,
                readonly:true,
                spdSelection:[],
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
                UnbilledBatchPaymentListFilters:[
                    {
                        value: '',
                        prop: 'StudentName',
                    },
                ],
                inputDueDate:'',
                courseListResponse:'',
                courseList:[],

                //Class items
                classesSelected:'',
                classesList:[],
                classesListResponse:[],
                //class Item

                //start:update
                courseSelected:'',
                courseID:'',
                semesterID:'',
                schoolID:'',
                //
                inputFromDate:[],
                startupText:'',

                schoolsList:[],
                allSchoolsList:[],
                schoolsListResponse:[],

                schoolListInt:[],
                previewResultList:'',

                //breakdown items
                cbPrintMonthlyBreakdown:false,
                breakdownFlag:'',
                objNonCourseFees:[],
                nonEligibleStudentList:[],
                //breakdown items

                negativeStudentListInt:[],
                negativeStudentList:[{
                    prop: "StudentName",
                    label: "Student Name"
                }, {
                    prop: "Index_No",
                    label: "Index NO"
                }, {
                    prop: "NegativeAmount",
                    label: "Negative Amount"
                }],
            }
        },
        async mounted(){
            this.schoolID = Cookies.get('schoolSession');

            if (this.$route.query.AY) {
                await this.BindAcademicYear();
                this.academicYearListSelected = this.$route.query.AY;

                await this.loadCourses();
                this.courseSelected = this.$route.query.CR;

                await this.loadClasses();
                if (this.$route.query.CL) {
                    this.classesSelected = this.$route.query.CL;
                }

                if (this.$route.query.FR) {
                    Vue.set(this.inputFromDate, 0, this.$route.query.FR.replace(/-/gim,'/'));
                    Vue.set(this.inputFromDate, 1, this.$route.query.TO.replace(/-/gim,'/'));
                }

                await this.Search();
            } else {
                await this.BindAcademicYear();
            }
        },
        async created(){
        },

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

            async checkBatchPaymentBreakdownEligible(){
                    var eligible = true;
                    let courseFeesCount = 0;
                    this.nonEligibleStudentList=[];
                    this.arrobj_selectedSPD.forEach(m=>{
                        let stuName='';
                        let nonCourseFeesCount = 0;
                                m.ArrObj_Items.forEach(n=>{
                                    if(n.PPD_CalCategory==="Course Fees")
                                    {
                                        courseFeesCount++;
                                    }
                                    else
                                    {
                                        nonCourseFeesCount++;
                                        stuName=n.StudentName;
                                    }
                                });
                        if(m.ArrObj_Items.length==nonCourseFeesCount){
                            this.nonEligibleStudentList.push(stuName);
                            eligible = false;
                        }

                    });

                return eligible;
            },

            async batchPreviewClick(){
                try{
                    this.sortByStudentNO();
                    //todo:check eligibility for negative items and value: start
                    let countNegativeStudent = 0;
                    let tempListObj=[];
                    this.arrobj_selectedSPD.forEach(m=>{
                        let countNegativeItem = 0;
                        let countValue = 0;
                        let studentName = '';

                       m.ArrObj_Items.forEach(n=>{
                           if(parseFloat(n.SPPD_TotalValue)<0)
                           {
                               countNegativeItem++;
                           }
                           countValue+=parseFloat(n.SPPD_TotalValue);
                           studentName = n.Full_Name+' '+n.Last_name;
                       });

                       if(parseFloat(countNegativeItem)>0 && parseFloat(countValue)<0)
                       {
                            countNegativeStudent++;
                               let tempList = {
                                   StudentName:studentName,
                                   Index_No:m.ArrObj_Items[0].Index_No,
                                   NegativeAmount:parseFloat(countValue).toFixed(2),
                               };
                               tempListObj.push(tempList);
                               this.negativeStudentListInt = tempListObj;
                       }

                    });
                    //todo:To check eligibility for negative items and value: end

                    if (!this.inputDueDate)
                    {
                        this.$notify({
                            title: 'Require',
                            message: '"Payment Due Date"'
                        });
                    }
                    else if(this.spdSelection.length === 0) {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please select at least 1 payment item'
                        });
                    }
                    else if(countNegativeStudent>0){
                        this.$notify({
                            title: 'Error',
                            message: '"Cannot generate invoice with negative value, please check students below:"'
                        });
                    }
                    else{
                        //check breakdown
                        if(this.cbPrintMonthlyBreakdown){
                             var breakdownflag = await this.checkBatchPaymentBreakdownEligible();
                            if(breakdownflag==true)
                            {
                                this.breakdownFlag='Y';
                                await this.batchPreview();
                            }
                            else
                            {
                                let nonEligibleStudentListString="";
                                this.nonEligibleStudentList.forEach(n=>{
                                    nonEligibleStudentListString+=(n+', ');
                                });
                                let nonEligibleStudent= nonEligibleStudentListString.trim().substring(0,nonEligibleStudentListString.trim().length-1);
                                this.breakdownFlag='N';
                                this.$notify.error({
                                    title: 'Message',
                                    message: 'Below students are not eligible for breakdown! (no course fees type found)'+nonEligibleStudent,
                                });
                            }
                        }
                        else
                        {
                            this.breakdownFlag='N';
                            await this.batchPreview();
                        }
                        //check breakdown
                    }
                }
                catch (e) {
                    this.results = e;
                }

            },

            async batchPreview(){
                try{
                    let actionType = 'Preview';
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

                    this.$vs.loading();
                    const resp = await DataSource.shared.generateBatchInvoice(JSON.stringify(batchPaymentObj),this.inputDueDate,actionType,this.breakdownFlag);
                    if (resp) {
                        if (resp.code === '88') {
                            window.location.replace('/');
                        } else if (resp.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Cannot preview batch invoice!'
                            });
                        } else if (resp.code === '2') {
                            this.$notify({
                                title: 'No Record',
                                message: 'No Record Found'
                            });
                        } else
                        {
                            this.arrobj_selectedSPD=[];
                            this.displayPdf(resp.code);
                        }
                    }
                }
                catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },

            async batchGenerateClick(){
                try{
                    this.sortByStudentNO();
                    let countNegativeStudent = 0;
                    let tempListObj=[];

                    this.arrobj_selectedSPD.forEach(m=>{
                        let countNegativeItem = 0;
                        let countValue = 0;
                        let studentName = '';

                        m.ArrObj_Items.forEach(n=>{
                            // console.log(n.Full_Name,parseFloat(n.newGSTAmount),parseFloat(n.SPPD_TotalValue),n.SPPD_PaymentAmount);
                            if(parseFloat(n.SPPD_TotalValue)<0)
                            {
                                countNegativeItem++;
                            }
                            countValue+=parseFloat(n.SPPD_TotalValue);
                            // countValue = countValue+parseFloat(n.SPPD_TotalValue);
                            studentName = n.Full_Name+' '+n.Last_name;
                        });

                        // console.log('xxx',studentName,parseFloat(countNegativeItem),countValue);

                        if(parseFloat(countNegativeItem)>0 && parseFloat(countValue)<0)
                        {
                            countNegativeStudent++;
                            let tempList = {
                                StudentName:studentName,
                                Index_No:m.ArrObj_Items[0].Index_No,
                                NegativeAmount:parseFloat(countValue).toFixed(2),
                            };
                            // console.log('m.ArrObj_Items=',m.ArrObj_Items,m.ArrObj_Items[0].Index_No);
                            tempListObj.push(tempList);
                            this.negativeStudentListInt = tempListObj;
                        }

                    });

                    if (!this.inputDueDate)
                    {
                        this.$notify.error({
                            title: 'Require',
                            message: '"Payment Due Date"'
                        });
                    }
                    else if(this.spdSelection.length === 0) {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please select at least 1 payment item'
                        });
                    }
                    else if(countNegativeStudent>0){
                        this.$notify({
                            title: 'Error',
                            message: '"Cannot generate invoice with negative value, please check students below:"'
                        });
                    }
                    else{
                        //call batchGenerate method,
                        //check breakdown
                        if(this.cbPrintMonthlyBreakdown){
                            var breakdownflag = await this.checkBatchPaymentBreakdownEligible();
                            if(breakdownflag==true)
                            {
                                this.breakdownFlag='Y';
                                await this.batchGenerate();
                            }
                            else
                            {
                                let nonEligibleStudentListString="";
                                this.nonEligibleStudentList.forEach(n=>{
                                    nonEligibleStudentListString+=(n+', ');
                                });
                                let nonEligibleStudent= nonEligibleStudentListString.trim().substring(0,nonEligibleStudentListString.trim().length-1);
                                this.breakdownFlag='N';
                                this.$notify.error({
                                    title: 'Message',
                                    message: 'Below students are not eligible for breakdown! (no course fees type found)'+nonEligibleStudent,
                                });
                            }
                        }
                        else
                        {
                            this.breakdownFlag='N';
                            await this.batchGenerate();
                        }
                        //check breakdown

                    }

                }
                catch (e) {
                    this.results = e;
                }
            },

            async batchGenerate(){
                try{
                    this.$vs.loading();
                    let actionType = 'Generate';
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

                    const resp = await DataSource.shared.generateBatchInvoice(JSON.stringify(batchPaymentObj),this.inputDueDate,actionType,this.breakdownFlag);
                    if (resp) {
                        if (resp.code === '88') {
                            window.location.replace('/');
                        } else if (resp.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Cannot generate batch invoice!'
                            });
                        } else if (resp.code === '2') {
                            this.$notify({
                                title: 'No Record',
                                message: 'No Record Found'
                            });
                        } else
                        {
                            batchPaymentObj={};
                            this.arrobj_selectedSPD=[];
                            this.displayPdf(resp.code);
                            this.Search();
                        }
                    }
                }
                catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },

            clearSelect () {
                // this.spdSelection=null;
            },

            getRowKeys(row){
                return row.PK_SPD_ID;
            },

            async changeSelection(val) {
                this.spdSelection=val;
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

            async BindAcademicYear(){
                try{
                    this.academicYearList=[];
                    if(this.schoolID.length>0){
                        const response = await DataSource.shared.getAcademicYearBySchoolID(this.schoolID);
                        this.academicYearListResponse=response.Table;
                        this.academicYearListResponse.forEach(m => {
                            this.academicYearList.push(m);
                        });

                        this.academicYearListResponse=[];
                        //todo: to refesh academic year, course and class list
                        await this.loadCourses();
                    }
                }
                catch (e) {
                    this.results = e;
                }
            },

            async loadCourses(){
                try{
                    this.courseList = [];
                    this.classesList = [];
                    this.semesterID = this.academicYearListSelected;
                    let coursePList =[];
                    if(this.schoolID.length>0){
                        const response = await DataSource.shared.getCourseBySemesterID(this.schoolID,this.semesterID);
                        this.courseListResponse=response.Table;
                        this.courseListResponse.forEach(m => {
                            coursePList.push(m);
                        });
                        this.courseList=coursePList;
                        this.courseListResponse=[];
                    }
                }
                catch (e) {
                    this.results = e;
                }
            },

            async loadClasses(){
                try{
                    if(this.schoolID.length>0){
                        let classesPList =[];
                        const response = await DataSource.shared.getClassBySemesterAndCourseID(this.semesterID,this.courseSelected);
                        this.classesListResponse=response.Table;
                        this.classesListResponse.forEach(m => {
                            classesPList.push(m);
                        });
                        this.classesList = classesPList;
                        this.classesListResponse=[];
                    }
                }
                catch (e) {
                    this.results = e;
                }
            },

            async Search() {
                try {
                    this.startupText = "No Data Found...";
                    this.UnbilledBatchPaymentListInt =[];
                    this.negativeStudentListInt=[];
                    if (!this.schoolID)
                    {
                        this.$notify({
                            title: 'Require',
                            message: '"No assigned school"'
                        });
                    }
                    else if(!this.semesterID)
                    {
                        this.$notify({
                            title: 'Require',
                            message: '"Please select academic year"'
                        });
                    }
                    else if(!this.courseSelected)
                    {
                        this.$notify({
                            title: 'Require',
                            message: '"Please select course"'
                        });
                    }
                    else
                        {
                            this.$vs.loading();
                            let courseID='';
                            let classID ='';
                            if(this.courseSelected){
                                courseID = this.courseSelected;
                                classID = this.classesSelected;
                            }
                            else{
                                courseID = '';
                                classID = '';
                            }

                            const response = await DataSource.shared.getUnbilledBatchPaymentList(this.schoolID, this.semesterID,
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
                                    this.spdSelection=[];
                                    this.UnbilledBatchPaymentListInt = tempList;
                                }
                        }

                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },

            sortByStudentNO() {
                    let sortedList = this.groupBy(this.spdSelection, "Student_ID");
                    this.arrobj_selectedSPD = sortedList;
            },

            groupBy(data, key) {

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

