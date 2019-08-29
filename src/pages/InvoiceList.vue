<template>
    <div id="invoice-list">
        <div class="container">

            <h3 class="text-left mb-3"><p class="font-weight-bold">Invoice List</p></h3>

                <div class="datatable-form__header atr-header-wrap mb-4">
                        <label>Invoice Date From-To(Optional)</label>
                        <el-date-picker
                                v-model="inputFromDate"
                                type="daterange"
                                range-separator="To"
                                start-placeholder="From Date"
                                end-placeholder="To Date"
                                format="dd/MM/yyyy"
                                value-format="dd/MM/yyyy">
                        </el-date-picker>

                        <label>Invoice DUE Date From-To(Optional)</label>
                        <el-date-picker
                                v-model="inputFromDueDate"
                                type="daterange"
                                range-separator="To"
                                start-placeholder="From Due Date"
                                end-placeholder="Due Date"
                                format="dd/MM/yyyy"
                                value-format="dd/MM/yyyy">
                        </el-date-picker>

                    <div class="datatable-form__submit text-center">
                        <button class="btn btn-success searchbtn" id="btnSearch" v-on:click="Search()">Search</button>
                    </div>
                </div>

                <div class="admin-wrap">
                    <div class="datatable-form__submit text-right">
                    </div>

                    <div class="pb-5">
                        <div class="empty-list_image"
                             v-if="InvoiceListInt.length<1">
                            <strong>{{startupText}}</strong>
                            <img src="../assets/notfound.png"/>
                        </div>

                        <div v-if="InvoiceListInt.length>0" class="datatable_group">
                            <h5 class="text-left mb-3">
                                <p style="color:blue" class="font-weight-bold">Invoice List</p></h5>
                            <data-tables :data="InvoiceListInt"  :action-col="InvoiceListAction"
                                         @selection-change="changeSelection" width="55" stripe tooltip-effect='light' border
                                         ref="InvoiceListTable">
                                <el-table-column type="selection" width="55" :reserve-selection="true">
                                </el-table-column>
                                <el-table-column v-for="item in InvoiceList"
                                                 :prop="item.prop"
                                                 :label="item.label"
                                                 :key="item.prop"
                                                 sortable="custom">
                                </el-table-column>
                            </data-tables>
                            <div class="datatable-form__submit text-center">
                                <button class="btn btn-success searchbtn" id="btnSendEmail" v-on:click="showTestBModel()">Send Email</button><br>

<!--                                <button class="btn btn-success searchbtn" id="btnSendEmail" v-on:click="btnSendEmail()">Send Email</button><br>-->
<!--                                <button class="btn btn-success searchbtn" id="btnTest" v-on:click="showTestBModel()">SEND BATCH EMAIL TESTING</button>-->
                            </div>
                        </div>
                    </div><hr>

                    <div class="pb-5">
                        <div v-if="InvoiceListWithoutPayeeEmailInt.length>0" class="datatable_group">
                            <h5 class="text-left mb-3">
                                <p style="color:red" class="font-weight-bold">Invoice List Without Email(Please take note)</p></h5>
                            <data-tables :data="InvoiceListWithoutPayeeEmailInt"
                                         width="55" stripe tooltip-effect='light' border
                                         ref="InvoiceListWithoutPayerEmailTable">
                                <el-table-column v-for="item in InvoiceListWithoutPayeeEmail"
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
        <b-modal id="showBatchEmailConfirmationModal" hide-footer title="Send Email Confirmation" size="sm"
                 ref="showBatchEmailConfirmationModal">
            <data-tables :data="selectedListInt"
                         width="55" stripe tooltip-effect='light' border
                         ref="selectedListTable">
                <el-table-column v-for="item in selectedList"
                                 :prop="item.prop"
                                 :label="item.label"
                                 :key="item.prop"
                                 sortable="custom">
                </el-table-column>
            </data-tables>
            <div class="d-block text-center">
                <h3>Proceed to send email??</h3>
            </div>
            <b-button class="mt-2" variant="success" block v-on:click="btnSendEmail()">Yes</b-button>
            <b-button class="mt-2" variant="danger" block v-on:click="btnSendEmail('No')">No</b-button>
        </b-modal>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";
    //import Cookies from "js-cookie";
    export default {
        name: "InvoiceList",
        async created(){
            // await this.Search();
        },
        async mounted(){},
        data(){
            return{
                spdSelection:[],
                selectedEmailSenderListInt:[],
                startupText:'',
                //start: More detail
                studentCourseID:'',
                studentID:'',
                courseStatus:'',
                //End:More detail
                datePicker:{
                    disabledDate(date){

                        return date<(new Date().getTime() - (1 * 24 * 60 * 60 * 1000));
                        //  Without using the second variable, you can replace 7 for with your back x days:
                        //e.g return date< Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000));
                    }
                },
                selectedData:[],
                inputFromDate:[],
                inputFromDueDate:[],
               // InvoiceListResp:[],
                InvoiceListInt:[],
                InvoiceList:[{
                    prop: "studentName",
                    label: "Student Name"
                }, {
                    prop: "IH_Invoice_Status",
                    label: "Invoice Status"
                },{
                    prop: "IH_Invoice_No",
                    label: "Invoice Name"
                },{
                    prop: "email",
                    label: "Email"
                },{
                    prop: "sponsor_type",
                    label: "Payee"
                }],
                InvoiceListAction: {
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

                InvoiceListWithoutPayeeEmailInt:[],
                InvoiceListWithoutPayeeEmail:[{
                    prop: "studentName",
                    label: "Student Name"
                }, {
                    prop: "IH_Invoice_Status",
                    label: "Invoice Status"
                },{
                    prop: "IH_Invoice_No",
                    label: "Invoice Name"
                },{
                    prop: "email",
                    label: "Email"
                },{
                    prop: "sponsor_type",
                    label: "Payee"
                }],
                InvoiceListWithoutPayeeEmailAction: {
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

                //testing only
                selectedListInt:[],
                selectedList:[{
                    prop: "studentName",
                    label: "Student Name"
                }, {
                    prop: "IH_Invoice_Status",
                    label: "Invoice Status"
                },{
                    prop: "IH_Invoice_No",
                    label: "Invoice Name"
                },{
                    prop: "email",
                    label: "Email"
                },{
                    prop: "sponsor_type",
                    label: "Payee"
                }],

                tempResp:[],
                //testing only
            }
        },
        methods:{
            async changeSelection(val) {
                this.spdSelection = val;
                console.log(this.spdSelection);
            },

            async Search(){
                this.$vs.loading();
                try{
                    this.clearTablesList();
                    const resp = await DataSource.shared.getInvoiceList(this.inputFromDate[0],
                     this.inputFromDate[1], this.inputFromDueDate[0],this.inputFromDueDate[1]);
                    if (resp) {
                        if (resp.code === '88') {
                            window.location.replace('/');
                        } else if (resp.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Search Student: Error',
                            });
                        } else if (resp.code === '2') {
                            this.$notify.error({
                                title: 'No Record',
                                message: 'No Student Found',
                            });
                        } else {
                            this.tempResp =resp.Table;
                            console.log(resp.Table.length,this.tempResp);
                            this.tempResp.forEach(m=>{
                                if(m.email){
                                    this.InvoiceListInt.push(m);
                                }
                                else{
                                    this.InvoiceListWithoutPayeeEmailInt.push(m);
                                }
                            });
                        }
                    }

                }
                catch (e) {
                        this.results = e;
                    }
                this.$vs.loading.close();
                },

            async btnSendEmail(value){
                try{
                    if(value==='No'){
                        this.$refs.showBatchEmailConfirmationModal.hide();
                    }
                    else{
                        let selectedObjList=[];
                        this.spdSelection.forEach(m=>{
                            let list={
                                IH_Invoice_No:m.IH_Invoice_No,
                                studentID:m.FK_Student_ID,
                                studentName:m.studentName,
                                email:m.email,
                                //email:'cheeseng.goh@etonhouse.com.sg',
                            };
                            selectedObjList.push(list);
                        });
                        console.log(selectedObjList.length,selectedObjList);
                        const resp = await DataSource.shared.sendEmailInvoice(JSON.stringify(selectedObjList));
                        if(resp){
                            if(resp.code==='2'){
                                this.$notify.error({
                                    title: 'Message',
                                    message: 'No Email Found'
                                });
                            }
                            else if(resp.code==='99'){
                                this.$notify.error({
                                    title: 'Message',
                                    message: 'Cannot send email'
                                });
                            }
                            else if(resp.code==='1'){
                                this.$notify({
                                    title: 'Success',
                                    message: 'Send Success!',
                                    type: 'success'
                                });
                                this.selectedEmailSenderListInt=resp.Table;
                                this.$refs.showBatchEmailConfirmationModal.hide();
                                window.location.replace('/invoicelist');
                            }
                        }
                    }
                }
                catch(e){
                    this.results = e;
                }
            },

            async btnTestClick(){
                try{
                console.log('btnTestCLick');
                }
                catch(e){
                    this.results = e;
                }
            },
            async getSelectedList(){
                try{
                    this.selectedListInt=this.spdSelection ;
                }
                catch(e){
                    this.results = e;
                }
            },
            async showTestBModel(){
                try{
                    this.$refs.showBatchEmailConfirmationModal.show();
                    await this.getSelectedList();
                    await this.btnTestClick();
                }
                catch(e){
                    this.results=e;
                }
            },
            async emailConfirmationClick(){},
            async clearTablesList(){
               this.InvoiceListInt=[];
               this.InvoiceListWithoutPayeeEmailInt=[];
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

</style>
