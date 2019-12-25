<template>
    <div id="studentreceiptdetail">
        <div class="datatable-edit__header">
            <!--<div class="container">-->
                <!--<h3>Receipt Details</h3>-->
            <!--</div>-->
            <div>
                <div class="mt-3 container  pt-5">
                    <b-tabs class="receiptDetailPageBTabs">
                            <div class="">
                                <div class="receiptAreaDiv">
                                    <div class="row form-group__wrapper">

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <label>Invoice No</label>
                                            <input type="text" class="form-control" placeholder="e.g SG-024-INXXX-XXX" ref="refInputInvoiceNO"
                                                   v-model="inputInvoiceNO">
                                        </div>

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                            <label>Receipt No</label>
                                            <input type="text" class="form-control" placeholder="e.g SG-024-RCXXX-XXX" ref="refInputReceiptNO"
                                                   v-model="inputReceiptNO">
                                        </div>

                                        <!--<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">-->
                                            <!--<label>Creation Date</label>-->
                                            <!--<input type="text" class="form-control" ref="refInputCreationDate"-->
                                                   <!--v-model="inputCreationDate" disabled>-->
                                        <!--</div>-->

                                        <!--<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">-->
                                            <!--<label>Created By</label>-->
                                            <!--<input type="text" class="form-control"-->
                                                   <!--v-model="inputCreatedBy" ref="refInputCreatedBy" disabled>-->
                                        <!--</div>-->

                                        <!--<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">-->
                                            <!--<label>Student No</label>-->
                                            <!--<input type="text" class="form-control" ref="refInputStudentNO"-->
                                                   <!--v-model="inputStudentNO" disabled>-->
                                        <!--</div>-->

                                        <!--<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">-->
                                            <!--<label>Student Name</label>-->
                                            <!--<input type="text" class="form-control"-->
                                                   <!--v-model="inputStudentName" ref="refInputStudentName" disabled>-->
                                        <!--</div>-->

                                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                            <button v-on:click="clearClick" type="button"
                                                    class="btn btn-primary waves-effect waves-light m-r-10">Clear
                                            </button>&nbsp;

                                            <button v-on:click="searchClick" type="button"
                                                    class="btn btn-primary waves-effect waves-light m-r-10">Search
                                            </button>
                                        </div>

                                    </div>

                                </div>
                            </div>
                    </b-tabs>
                </div>
            </div>

            <div v-if="isShow">
            <div v-if="ReceiptListInt.length>0">
                <data-tables :data="ReceiptListInt">
                    <el-table-column v-for="item in ReceiptList" :prop="item.prop"
                                     :label="item.label" :key="item.prop">
                    </el-table-column>

                    <el-table-column label="Action" min-width="100px" v-if="allowVoidReceipt">
                        <template slot-scope="scope">
                            <el-button v-for="item in viewReceiptDetailsClick(scope.row)"
                                       :key="item.name" type="primary"
                                       @click="item.handler" >
                                {{item.name}}
                            </el-button>
                        </template>
                    </el-table-column>
                </data-tables>

            </div>
        </div>
        </div>

        <b-modal id="ReceiptDetailModal" size="xl" title="Receipt Detail" ok-only ok-variant="secondary" hide-footer ref="ReceiptDetailModal">
            <div class= "col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="mt-3 container  pt-5">
                    <label style="display:none !important;">{{lblReceiptID}}</label>

                    <b-tabs class="receiptDetailPageBTabs">
                    <div class="receiptAreaDiv">
                        <div class="row form-group__wrapper">
                        <!--<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">-->
                             <!--<label>Creation Date</label>-->
                                <!--<input type="text" class="form-control" ref="refInputCreationDate"-->
                                <!--v-model="inputCreationDate" disabled>-->
                        <!--</div>-->

                        <!--<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">-->
                            <!--<label>Created By</label>-->
                                <!--<input type="text" class="form-control"-->
                                <!--v-model="inputCreatedBy" ref="refInputCreatedBy" disabled>-->
                        <!--</div>-->

                        <!--<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">-->
                                <!--<label>Invoice No</label>-->
                                <!--<input type="text" class="form-control" ref="refInputInvoiceNO"-->
                                <!--v-model="inputInvoiceNO" disabled>-->
                        <!--</div>-->

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Receipt No</label>
                            <input type="text" class="form-control" ref="refInputReceiptNO"
                            v-model="inputReceiptNO" disabled>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Student No</label>
                            <input type="text" class="form-control" ref="refInputStudentNO"
                            v-model="inputStudentNO" disabled>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Student Name</label>
                            <input type="text" class="form-control"
                            v-model="inputStudentName" ref="refInputStudentName" disabled>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Payment Type</label>
                            <input type="text" class="form-control"
                            v-model="inputPaymentType" ref="refInputPaymentType" disabled>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Receipt Date</label>
                            <input type="text" class="form-control"
                            v-model="inputReceiptDate" ref="refInputReceiptDate" disabled>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Currency</label>
                            <input type="text" class="form-control"
                            v-model="inputCurrency" ref="refInputCurrency" disabled>
                        </div>

                        <!--<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">-->
                        <!--<label>Address</label>-->
                            <!--<input type="text" class="form-control"-->
                            <!--v-model="inputAddress" ref="redInputAddress" disabled>-->
                        <!--</div>-->

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Status</label>
                                <input type="text" class="form-control"
                                v-model="inputStatus" ref="refInputStatus" disabled>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <label>Remarks</label>
                                <textarea v-model="textAreaRemarks" ref="refTextAreaRemarks"></textarea>
                            </div>

                            <div v-if="this.receiptStatus=='Active'" class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                <button v-on:click="voidReceiptClick" type="button"
                                        class="btn btn-primary waves-effect waves-light m-r-10">VOID
                                </button>
                            </div>
                        </div>
                    </div>
                    </b-tabs>
                </div>

                <div v-if="ReceiptDetailsListInt.length>0" class="datatable_group">
                    <data-tables :data="ReceiptDetailsListInt"
                                 ref="receiptDetailsTable">
                        <el-table-column v-for="item in ReceiptDetailsList" :prop="item.prop"
                                         :label="item.label" :key="item.prop">
                        </el-table-column>
                    </data-tables>
                </div>
            </div>
        </b-modal>

    </div>
</template>

<script>
    import DataSource from "../data/datasource";

    export default {
        name: "StudentReceiptDetail",
        data() {
            return {
                lblParentID:'',
                inputCreationDate:'',
                inputCreatedBy:'',
                inputInvoiceNO:'',
                inputReceiptNO:'',
                inputStudentNO:'',
                inputStudentName:'',
                inputPaymentType:'',
                inputReceiptDate:'',
                inputCurrency:'',
                inputAddress:'',
                inputStatus:'',
                inputRemarks:'',
                lblReceiptID:'',
                textAreaRemarks:'',

                ReceiptListInt:[],
                ReceiptList:[{
                    prop: "RH_Receipt_Name",
                    label: "Receipt Number"
                },{
                    prop: "studentName",
                    label: "Student Name"
                }, {
                    prop: "RH_Receipt_Status",
                    label: "Receipt Status"
                }, {
                    prop: "receiptDate",
                    label: "Receipt Date"
                    }],

                ReceiptDetailsListInt:[],
                ReceiptDetailsList: [{
                    prop: "RD_Item_Description",
                    label: "Item Desciption"
                }, {
                    prop: "RD_Item_Amount",
                    label: "Amount"
                }, {
                    prop: "RD_GSTValue",
                    label: "GST Amount"
                }, {
                    prop: "RD_GST_Applicable",
                    label: "Tax Applicable"
                }, {
                    prop: "RD_Cheque_No",
                    label: "Reference Number"
                }],

                receiptID:'',
                invoiceName:'',
                receiptName:'',
                receiptStatus:'',
                allowVoidReceipt:true,
                isShow:true,
            };
        },

        async created() {
        },

        async mounted() {

        },

        methods:{
            async BindReceiptDetailsItems()
            {
                try {
                    const resp = await DataSource.shared.getPaymentPlanLevelStartDate(this.studentCourseID);
                    if (resp) {
                        if (resp.code === '88') {
                            window.location.replace('/');
                        }
                        else {
                            var SCH_TermsOfPayment = 0;
                            var SCH_ToPrintSpecial = '';
                            this.paymentDueDateResponse = resp.Table;
                            this.paymentDueDateResponse.forEach(m => {
                                SCH_TermsOfPayment = m.SCH_TermsOfPayment;
                                SCH_ToPrintSpecial = m.SCH_ToPrintSpecial;
                            });

                            let addDaysPaymentDue;
                            if(SCH_TermsOfPayment || parseInt(SCH_TermsOfPayment) === 0)
                            {
                                addDaysPaymentDue = new Date(new Date().setDate(new Date().getDate() + parseInt(SCH_TermsOfPayment)));
                            }
                            else
                            {
                                addDaysPaymentDue = new Date(new Date().setDate(new Date().getDate() + 15 ));
                            }
                            this.inputPaymentDueDate = addDaysPaymentDue.getDate()+ '/' + (addDaysPaymentDue.getMonth() + 1) + '/' + addDaysPaymentDue.getFullYear();


                            if(SCH_ToPrintSpecial !== 'No')
                            {
                                this.cbPrintMonthlyBreakdown = true;
                            }
                            else
                            {
                                this.cbPrintMonthlyBreakdown = false;
                            }
                        }
                    }
                }catch (e) {
                    this.results = e;
                }
            },

            viewReceiptDetailsClick(row)
            {
                return [{
                    name: 'More Detail',
                    handler: _ => {
                        try{
                            this.getReceiptDetails(row);
                            this.$refs.ReceiptDetailModal.show();
                        }
                        catch(e){
                            this.results = e;
                        }
                    }
                }];
            },

            async getReceiptDetails(row){
                try{
                    const resp = await DataSource.shared.getReceiptDetails(row.PK_Receipt_ID);
                    if (resp) {
                        switch (resp.code) {
                            case "88":
                                this.$router.push('/');
                                break;
                            case "99":
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Error'
                                });
                                break;

                            default:

                                this.ReceiptDetailsListInt = resp.Table;
                                resp.Table.forEach(m=>{
                                    this.inputStudentName=m.studentName;
                                    this.inputStudentNO=m.Index_No;
                                    this.inputCreationDate=m.RH_Created_On;
                                    this.inputCreatedBy=m.RH_Created_By;
                                    // this.inputInvoiceNO:'';
                                    this.inputReceiptNO=m.RH_Receipt_No;
                                    this.inputPaymentType=m.RH_Receipt_Pay_Type;
                                    this.inputReceiptDate=m.receiptDate;
                                    this.inputCurrency=m.RH_Receipt_Currency;
                                    this.inputAddress=m.st_corr_add_BlgName+','+m.st_corr_add_UntNo+','+m.st_corr_add_country+','+m.st_corr_add_pstcode;
                                    this.inputStatus=m.RH_Receipt_Status;
                                    this.receiptID =m.FK_Receipt_Header_ID;
                                    this.textAreaRemarks=m.RH_Remarks;

                                });
                        }
                    }
                }
                catch(e){
                    this.results = e;
                }
            },

            async getReceiptList(){
                try{

                    // this.invoiceName ='';
                    // this.receiptName ='SG-005-RC19-0434';
                    if(this.inputInvoiceNO||this.inputReceiptNO){

                        const resp = await DataSource.shared.getReceiptList(this.inputInvoiceNO, this.inputReceiptNO);
                        if (resp) {
                            switch (resp.code) {
                                case "88":
                                    this.$router.push('/');
                                    break;
                                case "2":
                                    this.$notify.error({
                                        title: 'Error',
                                        message: 'Invoice/Receipt not found'
                                    });
                                    break;
                                case "99":
                                    this.$notify.error({
                                        title: 'Error',
                                        message: 'Error'
                                    });
                                    break;

                                default:
                                    this.ReceiptListInt = resp.Table;
                                    resp.Table.forEach(m=>{
                                        this.receiptStatus=m.RH_Receipt_Status;
                                    });
                                    this.isShow = true;
                            }
                        }

                    }
                    else
                    {
                        this.$notify.error({
                            title: 'TextBox Empty',
                            message: 'Please key in Invoice/Receipt No!!'
                        });
                    }

                }
                catch(e){
                    this.results = e;
                }
            },

            async voidReceiptClick(){
                try{
                    const resp = await DataSource.shared.cancelReceipt(this.receiptID, this.textAreaRemarks);
                    if (resp) {
                        switch (resp.code) {
                            case "88":
                                this.$router.push('/');
                                break;
                            case "99":
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Error'
                                });
                                break;

                            default:

                                this.$notify({
                                    title: 'Success',
                                    message: 'Successfully Void!',
                                    type: 'success'
                                });

                                await this.getReceiptList();
                                this.textAreaRemarks='';
                                this.$refs.ReceiptDetailModal.hide();

                        }
                    }
                }
                catch(e){
                    this.results = e;
                }
            },

            async searchClick(){
                try {
                    if(this.isShow){
                        await this.getReceiptList();
                    }
                }
                catch(e){
                    this.results = e;
                }
            },

            async clearClick(){
                try {
                    if(this.isShow){
                        await this.clearInputItems();
                    }
                }
                catch(e){
                    this.results = e;
                }
            },

            async clearInputItems(){
                try {
                    this.inputCreationDate='';
                    this.inputCreatedBy='';
                    this.inputInvoiceNO='';
                    this.inputReceiptNO='';
                    this.inputStudentNO='';
                    this.inputStudentName='';
                    this.inputPaymentType='';
                    this.inputReceiptDate='';
                    this.inputCurrency='';
                    this.inputAddress='';
                    this.inputStatus='';
                    this.inputRemarks='';
                    this.textAreaRemarks='';
                    this.ReceiptListInt =[];
                }
                catch(e){
                    this.results = e;
                }
            },
        },
    }
</script>

<style scoped>
    .el-date-editor {
        width: 100% !important;
    }

    .buttonArea {
        margin: 20px 0 0 0;
    }

    .btn-primary {
        display: inline;
    }

    .buttonArea .btn-primary {
        margin: 0 0 0 20px;
    }

    .actionDiv {
        text-align: right;
    }

    .EligibleColor{
        color: green !important;
    }

    .NotEligibleColor{
        color: red !important;
    }

    .textArea {
        width: 100%;
        resize: none;
    }

</style>