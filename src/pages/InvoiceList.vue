<template>
    <div id="invoice-list">
        <div class="container-fluid">
            <div>
                <div class="pull-left">
                    <el-select v-on:change="loadList()" v-model="ddlSelectedValue"
                               placeholder="Please select:" filterable>
                        <el-option v-for="items in ddlSelection" :value="items.value">{{items.text}}</el-option>
                    </el-select>
                </div>
            </div>
<!--            //invoicelist: start-->
            <div v-if="ddlInvoiceSelected">

                <div class="datatable-form__header atr-header-wrap mb-4">
                    <label>Invoice Date From-To</label>
                    <el-date-picker
                            v-model="inputFromDate"
                            type="daterange"
                            range-separator="To "
                            start-placeholder="From Date"
                            end-placeholder="To Date"
                            format="dd/MM/yyyy"
                            value-format="dd/MM/yyyy">
                    </el-date-picker>

                    <label>Invoice DUE Date From-To</label>
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
                        <button class="btn btn-success searchbtn" id="btnSearch" v-on:click="Search('invoice')">Search</button>
                    </div>
                </div>

                <div class="datatable-form__header atr-header-wrap mb-4">
                    <el-input v-model="studName" type="text" placeholder="Student Name"></el-input>
                    <el-input v-model="studNO"  type="text" placeholder="Student NO"></el-input>
                    <el-input v-model="invName"  type="text" placeholder="Invoice NO"></el-input>
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
                            <div class="pull-right">
                                <el-button type="primary" icon="el-icon-download" v-on:click="downloadAsZip()">Download as zip</el-button>
                            </div>
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
                                <button class="btn btn-success searchbtn" id="btnSendEmail" v-on:click="showBModal()">Send Email</button> &nbsp; &nbsp;
                                <button v-if="currentSchoolID=='SCH201500000054'" class="btn btn-success searchbtn" id="btnSendEmailWithBreakdown" v-on:click="showBModalWithBreakdown()">Send Email With Breakdown</button><br><br>

                                <br><button class="" id="btnTest" v-on:click="showTestBModal()">SEND BATCH EMAIL(TESTING PURPOSES ONLY)</button>
                                <br><button v-if="currentSchoolID=='SCH201500000054'" class="" id="btnTestWithBreakdown" v-on:click="showTestBModalWithBreakdown()">SEND BATCH EMAIL With Breakdown(TESTING PURPOSES ONLY)</button>
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
<!--            //invoicelist: end-->

<!--            //receiptlist: start-->
            <div v-if="ddlReceiptSelected">
                <div class="datatable-form__header atr-header-wrap mb-4">
                    <el-form>
                        <el-form-item label="Receipt Date From-To" label-position="left" >
                            <el-date-picker
                                    v-model="inputFromDate"
                                    type="daterange"
                                    range-separator="To"
                                    start-placeholder="From Date"
                                    end-placeholder="To Date"
                                    format="dd/MM/yyyy"
                                    value-format="dd/MM/yyyy">
                            </el-date-picker>
                        </el-form-item>
                    </el-form>

                    <div class="datatable-form__submit text-center">
                        <button class="btn btn-success searchbtn" id="btnReceiptSearch" v-on:click="Search('receipt')">Search</button>
                    </div>

                </div>

                <div class="datatable-form__header atr-header-wrap mb-4">
                    <el-input v-model="studName" type="text" placeholder="Student Name"></el-input>
                    <el-input v-model="studNO"  type="text" placeholder="Student NO"></el-input>
                    <el-input v-model="recName"  type="text" placeholder="Receipt NO"></el-input>
                </div>

                <div class="admin-wrap">
                    <div class="datatable-form__submit text-right">
                    </div>

                    <div class="pb-5">
                        <div class="empty-list_image"
                             v-if="ReceiptListInt.length<1">
                            <strong>{{startupText}}</strong>
                            <img src="../assets/notfound.png"/>
                        </div>

                        <div v-if="ReceiptListInt.length>0" class="datatable_group">
                            <div class="pull-right">
                                <el-button type="primary" icon="el-icon-download" v-on:click="downloadAsZip()">Download as zip</el-button>
                            </div>
                            <h5 class="text-left mb-3">
                                <p style="color:blue" class="font-weight-bold">Receipt List</p></h5>

                            <data-tables :data="ReceiptListInt"  :action-col="ReceiptListAction"
                                         @selection-change="changeSelection" width="55" stripe tooltip-effect='light' border
                                         ref="ReceiptListTable">
                                <el-table-column type="selection" width="55" :reserve-selection="true">
                                </el-table-column>
                                <el-table-column v-for="item in ReceiptList"
                                                 :prop="item.prop"
                                                 :label="item.label"
                                                 :key="item.prop"
                                                 sortable="custom">
                                </el-table-column>
                            </data-tables>

                            <div class="datatable-form__submit text-center">
                                <button class="btn btn-success searchbtn" id="btnReceiptSendEmail" v-on:click="showBModal()">Send Email</button> &nbsp; &nbsp;
                                <br><button class="" id="btnReceiptTest" v-on:click="showTestBModal()">SEND BATCH EMAIL(TESTING PURPOSES ONLY)</button>
                            </div>
                        </div>
                    </div><hr>

                    <div class="pb-5">
                        <div v-if="ReceiptListWithoutPayeeEmailInt.length>0" class="datatable_group">
                            <h5 class="text-left mb-3">
                                <p style="color:red" class="font-weight-bold">Receipt List Without Email(Please take note)</p></h5>
                            <data-tables :data="ReceiptListWithoutPayeeEmailInt"
                                         width="55" stripe tooltip-effect='light' border
                                         ref="InvoiceListWithoutPayerEmailTable">
                                <el-table-column v-for="item in ReceiptListWithoutPayeeEmail"
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
<!--            //receiptlist: end-->

<!--            //cnlist: start-->
            <div v-if="ddlCNSelected">
                <div class="datatable-form__header atr-header-wrap mb-4">
                    <el-form>
                        <el-form-item label="CreditNote Date From-To">
                            <el-date-picker
                                    v-model="inputFromDate"
                                    type="daterange"
                                    range-separator="To"
                                    start-placeholder="From Date"
                                    end-placeholder="To Date"
                                    format="dd/MM/yyyy"
                                    value-format="dd/MM/yyyy">
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                    <div class="datatable-form__submit text-center">
                        <button class="btn btn-success searchbtn" id="btnCNSearch" v-on:click="Search('cn')">Search</button>
                    </div>
                </div>

                <div class="datatable-form__header atr-header-wrap mb-4">
                    <el-input v-model="studName" type="text" placeholder="Student Name"></el-input>
                    <el-input v-model="studNO"  type="text" placeholder="Student NO"></el-input>
                    <el-input v-model="invName"  type="text" placeholder="Invoice NO"></el-input>
                </div>

                <div class="admin-wrap">
                    <div class="datatable-form__submit text-right">
                    </div>

                    <div class="pb-5">
                        <div class="empty-list_image"
                             v-if="CNListInt.length<1">
                            <strong>{{startupText}}</strong>
                            <img src="../assets/notfound.png"/>
                        </div>

                        <div v-if="CNListInt.length>0" class="datatable_group">
<!--                            <div class="pull-right">-->
<!--                                <el-button type="primary" icon="el-icon-download" v-on:click="downloadAsZip()">Download as zip</el-button>-->
<!--                            </div>-->
                            <h5 class="text-left mb-3">
                                <p style="color:blue" class="font-weight-bold">CN List</p></h5>

                            <data-tables :data="CNListInt"  :action-col="CNListAction"
                                         @selection-change="changeSelection" width="55" stripe tooltip-effect='light' border
                                         ref="CNListTable">
<!--                                <el-table-column type="selection" width="55" :reserve-selection="true">-->
<!--                                </el-table-column>-->
                                <el-table-column v-for="item in CNList"
                                                 :prop="item.prop"
                                                 :label="item.label"
                                                 :key="item.prop"
                                                 sortable="custom">
                                </el-table-column>
                            </data-tables>

<!--                            <div class="datatable-form__submit text-center">-->
<!--                                <button class="btn btn-success searchbtn" id="btnCNSendEmail" v-on:click="showBModal()">Send Email</button> &nbsp; &nbsp;-->
<!--                                <button class="btn btn-success searchbtn" id="btnCNSendEmailWithBreakdown" v-on:click="showBModalWithBreakdown()">Send Email With Breakdown</button><br><br>-->

<!--                                &lt;!&ndash;                                <button class="btn btn-success searchbtn" id="btnSendEmail" v-on:click="btnSendEmail()">Send Email</button><br>&ndash;&gt;-->
<!--                                <br><button class="" id="btnCNTest" v-on:click="showTestBModal()">SEND BATCH EMAIL(TESTING PURPOSES ONLY)</button>-->
<!--                                <br><button class="" id="btnCNTestWithBreakdown" v-on:click="showTestBModalWithBreakdown()">SEND BATCH EMAIL With Breakdown(TESTING PURPOSES ONLY)</button>-->
<!--                            </div>-->
                        </div>
                    </div><hr>

                    <div class="pb-5">
                        <div v-if="CNListWithoutPayeeEmailInt.length>0" class="datatable_group">
                            <h5 class="text-left mb-3">
                                <p style="color:red" class="font-weight-bold">CN List Without Email(Please take note)</p></h5>
                            <data-tables :data="CNListWithoutPayeeEmailInt"
                                         width="55" stripe tooltip-effect='light' border
                                         ref="InvoiceListWithoutPayerEmailTable">
                                <el-table-column v-for="item in CNListWithoutPayeeEmail"
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
<!--            //cnlist: end-->

            <div class="empty-list_image"
                 v-if="InvoiceListInt.length<1&&ReceiptListInt.length<1&&CNListInt.length<1">
                <strong>{{startupText}}</strong>
                <img src="../assets/notfound.png"/>
            </div>

        </div>

        <b-modal id="showBatchEmailConfirmationModal" hide-footer title="Send Email Confirmation" size="sm"
                 ref="showBatchEmailConfirmationModal">
            <data-tables :data="selectedInvoiceListInt" v-if="selectedInvoiceListInt.length>0&&ddlSelectedValue=='Invoice'"
                         width="55" stripe tooltip-effect='light' border
                         ref="selectedListTable">
                <el-table-column v-for="item in selectedInvoiceList"
                                 :prop="item.prop"
                                 :label="item.label"
                                 :key="item.prop"
                                 sortable="custom">
                </el-table-column>
            </data-tables>
            <data-tables :data="selectedReceiptListInt" v-if="selectedReceiptListInt.length>0&&ddlSelectedValue=='Receipt'"
                         width="55" stripe tooltip-effect='light' border
                         ref="selectedListTable">
                <el-table-column v-for="item in selectedReceiptList"
                                 :prop="item.prop"
                                 :label="item.label"
                                 :key="item.prop"
                                 sortable="custom">
                </el-table-column>
            </data-tables>
            <data-tables :data="selectedCNListInt" v-if="selectedCNListInt.length>0&&ddlSelectedValue=='CN'"
                         width="55" stripe tooltip-effect='light' border
                         ref="selectedListTable">
                <el-table-column v-for="item in selectedCNList"
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
        <b-modal id="showBatchEmailConfirmationModalWithBreakdown" hide-footer title="Send Email Confirmation With Breakdown" size="sm"
                 ref="showBatchEmailConfirmationModalWithBreakdown">
            <data-tables :data="selectedInvoiceListInt" v-if="selectedInvoiceListInt.length>0&&ddlSelectedValue=='Invoice'"
                         width="55" stripe tooltip-effect='light' border
                         ref="selectedListTable">
                <el-table-column v-for="item in selectedInvoiceList"
                                 :prop="item.prop"
                                 :label="item.label"
                                 :key="item.prop"
                                 sortable="custom">
                </el-table-column>
            </data-tables>
            <data-tables :data="selectedReceiptListInt" v-if="selectedReceiptListInt.length>0&&ddlSelectedValue=='Receipt'"
                         width="55" stripe tooltip-effect='light' border
                         ref="selectedListTable">
                <el-table-column v-for="item in selectedReceiptList"
                                 :prop="item.prop"
                                 :label="item.label"
                                 :key="item.prop"
                                 sortable="custom">
                </el-table-column>
            </data-tables>
            <data-tables :data="selectedCNListInt" v-if="selectedCNListInt.length>0&&ddlSelectedValue=='CN'"
                         width="55" stripe tooltip-effect='light' border
                         ref="selectedListTable">
                <el-table-column v-for="item in selectedCNList"
                                 :prop="item.prop"
                                 :label="item.label"
                                 :key="item.prop"
                                 sortable="custom">
                </el-table-column>
            </data-tables>
            <div class="d-block text-center">
                <h3>Proceed to send email??</h3>
            </div>
            <b-button class="mt-2" variant="success" block v-on:click="btnSendEmailWithBreakdown()">Yes</b-button>
            <b-button class="mt-2" variant="danger" block v-on:click="btnSendEmailWithBreakdown('No')">No</b-button>
        </b-modal>


<!--        //testing only: start-->
        <b-modal id="showTestingBModal" hide-footer title="Send Email Confirmation(TEST ONLY!)" size="sm"
                 ref="showTestingBModal">
<!--            <data-tables :data="testingSelectedListInt"-->
<!--                         width="55" stripe tooltip-effect='light' border-->
<!--                         ref="selectedListTable">-->
<!--                <el-table-column v-for="item in testingSelectedList"-->
<!--                                 :prop="item.prop"-->
<!--                                 :label="item.label"-->
<!--                                 :key="item.prop"-->
<!--                                 sortable="custom">-->
<!--                </el-table-column>-->
<!--                    <el-table-column label="Email(TEST)" min-width="100px">-->
<!--                        <template slot-scope="scope">-->
<!--                                <el-input v-model="scope.row.newTestEmail" type="text"-->
<!--                                          placeholder="Email(Key in test email)"></el-input>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
<!--            </data-tables>-->
            <data-tables :data="testingSelectedInvoiceListInt" v-if="testingSelectedInvoiceListInt.length>0&&ddlSelectedValue=='Invoice'"
                         width="55" stripe tooltip-effect='light' border
                         ref="selectedListTable">
                <el-table-column v-for="item in testingSelectedInvoiceList"
                                 :prop="item.prop"
                                 :label="item.label"
                                 :key="item.prop"
                                 sortable="custom">
                </el-table-column>
                <el-table-column label="Email(TEST)" min-width="100px">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.newTestEmail" type="text"
                                  placeholder="Email(Key in test email)"></el-input>
                    </template>
                </el-table-column>
            </data-tables>
            <data-tables :data="testingSelectedReceiptListInt" v-if="testingSelectedReceiptListInt.length>0&&ddlSelectedValue=='Receipt'"
                         width="55" stripe tooltip-effect='light' border
                         ref="selectedListTable">
                <el-table-column v-for="item in testingSelectedReceiptList"
                                 :prop="item.prop"
                                 :label="item.label"
                                 :key="item.prop"
                                 sortable="custom">
                </el-table-column>
                <el-table-column label="Email(TEST)" min-width="100px">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.newTestEmail" type="text"
                                  placeholder="Email(Key in test email)"></el-input>
                    </template>
                </el-table-column>
            </data-tables>
            <data-tables :data="testingSelectedCNListInt" v-if="testingSelectedCNListInt.length>0&&ddlSelectedValue=='CN'"
                         width="55" stripe tooltip-effect='light' border
                         ref="selectedListTable">
                <el-table-column v-for="item in testingSelectedCNList"
                                 :prop="item.prop"
                                 :label="item.label"
                                 :key="item.prop"
                                 sortable="custom">
                </el-table-column>
                <el-table-column label="Email(TEST)" min-width="100px">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.newTestEmail" type="text"
                                  placeholder="Email(Key in test email)"></el-input>
                    </template>
                </el-table-column>
            </data-tables>
            <div class="d-block text-center">
                <h3>Proceed to send email??</h3>
            </div>
            <b-button class="mt-2" variant="success" block v-on:click="btnTestingSendEmail()">Yes</b-button>
            <b-button class="mt-2" variant="danger" block v-on:click="btnTestingSendEmail('No')">No</b-button>
        </b-modal>
        <b-modal id="showTestingBModalWithBreakdown" hide-footer title="Send Email Confirmation With Breakdown(TEST ONLY!)" size="sm"
                 ref="showTestingBModalWithBreakdown">
            <data-tables :data="testingSelectedInvoiceListInt"
                         width="55" stripe tooltip-effect='light' border
                         ref="selectedListTable">
                <el-table-column v-for="item in testingSelectedInvoiceList"
                                 :prop="item.prop"
                                 :label="item.label"
                                 :key="item.prop"
                                 sortable="custom">
                </el-table-column>
                <el-table-column label="Email(TEST)" min-width="100px">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.newTestEmail" type="text"
                                  placeholder="Email(Key in test email)"></el-input>
                    </template>
                </el-table-column>
            </data-tables>
            <div class="d-block text-center">
                <h3>Proceed to send email??</h3>
            </div>
            <b-button class="mt-2" variant="success" block v-on:click="btnTestingSendEmailWithBreakdown()">Yes</b-button>
            <b-button class="mt-2" variant="danger" block v-on:click="btnTestingSendEmailWithBreakdown('No')">No</b-button>
        </b-modal>
<!--        //testing only: end-->


    </div>
</template>

<script>
    import DataSource from "../data/datasource";
    import Cookies from "js-cookie";
    export default {
        name: "InvoiceList",
        async created(){
            // await this.Search();
            //await Cookies.get('schoolSession');
        },
        async mounted(){
            this.currentSchoolID = await Cookies.get('schoolSession');
            console.log('this.currentSchoolID=',this.currentSchoolID);
        },
        data(){
            return{
                currentSchoolID:'',
                zipType:'',
                ddlSelection:[
                    { text: 'Invoice', value: 'Invoice' },
                    { text: 'Receipt', value: 'Receipt' },
                    { text: 'CN', value: 'CN' }
                ],
                ddlSelectedValue:[],
                ddlInvoiceSelected:false,
                ddlReceiptSelected:false,
                ddlCNSelected:false,

                //search filter added on
                studName:'',
                studNO:'',
                invName:'',
                recName:'',
                //search filter added on

                spdSelection:[],
                // selectedEmailSenderListInt:[],
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
                        //  e.g return date< Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000));
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
                    prop: "Amount",
                    label: "Amount"
                },{
                    prop: "GstAmount",
                    label: "Gst"
                },{
                    prop: "TotalAmountIncGst",
                    label: "TotalIncGst"
                },{
                    prop: "IH_Invoice_Status",
                    label: "Invoice Status"
                },{
                    prop: "IH_Invoice_No",
                    label: "Invoice NO"
                },{
                    prop: "email",
                    label: "Payee Email"
                },{
                    prop: "sponsor_type",
                    label: "Payee"
                },{
                    prop: "fatherEmail",
                    label: "Father Email"
                },{
                    prop: "motherEmail",
                    label: "Mother Email"
                }],
                InvoiceListAction: {
                    label: 'Info',
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
                        label: ''
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
                    label: 'More info',
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
                        label: 'More info'
                    }]
                },

                //receiptList:start
                ReceiptListInt:[],
                ReceiptList:[{
                    prop: "studentName",
                    label: "Student Name"
                },{
                    prop: "RH_Receipt_Name",
                    label: "Receipt Name"
                },{
                    prop: "RH_Receipt_Status",
                    label: "Status"
                },{
                    prop: "receiptDate",
                    label: "ReceiptDate"
                },{
                    prop: "Amount",
                    label: "Amount"
                },{
                    prop: "GstAmount",
                    label: "Gst"
                },{
                    prop: "TotalAmountIncGst",
                    label: "TotalIncGst"
                },{
                    prop: "sponsor_type",
                    label: "Payee"
                },{
                    prop: "email",
                    label: "Payee Email"
                },{
                    prop: "fatherEmail",
                    label: "Father Email"
                },{
                    prop: "motherEmail",
                    label: "Mother Email"
                }],
                ReceiptListAction: {
                    label: 'Info',
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
                        label: ''
                    }]
                },

                ReceiptListWithoutPayeeEmailInt:[],
                ReceiptListWithoutPayeeEmail:[{
                    prop: "studentName",
                    label: "Student Name"
                }, {
                    prop: "RH_Receipt_Status",
                    label: "Receipt Status"
                },{
                    prop: "RH_Receipt_Name",
                    label: "Receipt Name"
                },{
                    prop: "email",
                    label: "Email"
                },{
                    prop: "sponsor_type",
                    label: "Payee"
                }],
                ReceiptListWithoutPayeeEmailAction: {
                    label: 'More info',
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
                        label: 'More info'
                    }]
                },
                //receiptList:end

                //CNList:start
                CNListAction: {
                    label: 'Info',
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
                        label: ''
                    }]
                },
                CNListInt:[],
                CNList:[{
                    prop: "studentName",
                    label: "Student Name"
                },{
                    prop: "Amount",
                    label: "Amount"
                },{
                    prop: "GstAmount",
                    label: "Gst"
                },{
                    prop: "TotalAmountIncGst",
                    label: "TotalIncGst"
                },{
                    prop: "IH_Invoice_Status",
                    label: "Invoice Status"
                },{
                    prop: "IH_Invoice_No",
                    label: "Invoice NO"
                },{
                    prop: "email",
                    label: "Payee Email"
                },{
                    prop: "sponsor_type",
                    label: "Payee"
                },{
                    prop: "fatherEmail",
                    label: "Father Email"
                },{
                    prop: "motherEmail",
                    label: "Mother Email"
                }],

                CNListWithoutPayeeEmailInt:[],
                CNListWithoutPayeeEmail:[{
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
                CNListWithoutPayeeEmailAction: {
                    label: 'More info',
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
                        label: 'More info'
                    }]
                },
                //CNList:end

                selectedInvoiceListInt:[],
                selectedInvoiceList:[{
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
                },{
                    prop: "fatherEmail",
                    label: "Father Email"
                },{
                    prop: "motherEmail",
                    label: "Mother Email"
                }],

                selectedReceiptListInt:[],
                selectedReceiptList:[{
                    prop: "studentName",
                    label: "Student Name"
                }, {
                    prop: "RH_Receipt_Status",
                    label: "Receipt Status"
                },{
                    prop: "RH_Receipt_Name",
                    label: "Receipt Name"
                },{
                    prop: "email",
                    label: "Email"
                },{
                    prop: "sponsor_type",
                    label: "Payee"
                },{
                    prop: "fatherEmail",
                    label: "Father Email"
                },{
                    prop: "motherEmail",
                    label: "Mother Email"
                }],

                selectedCNListInt:[],
                selectedCNList:[{
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
                },{
                    prop: "fatherEmail",
                    label: "Father Email"
                },{
                    prop: "motherEmail",
                    label: "Mother Email"
                }],
                tempResp:[],

                // //testing only:start
                // testingSelectedListInt:[],
                // testingSelectedList:[{
                //     prop: "studentName",
                //     label: "Student Name"
                // }, {
                //     prop: "IH_Invoice_Status",
                //     label: "Invoice Status"
                // },{
                //     prop: "IH_Invoice_No",
                //     label: "Invoice Name"
                // },{
                //     prop: "email",
                //     label: "Email(Key in your testing email)"
                // },{
                //     prop: "sponsor_type",
                //     label: "Payee"
                // },{
                //     prop: "fatherEmail",
                //     label: "Father Email"
                // },{
                //     prop: "motherEmail",
                //     label: "Mother Email"
                // }],
                // //testing only: end

                //testing only:start
                testingSelectedInvoiceListInt:[],
                testingSelectedInvoiceList:[{
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
                    label: "Email(Key in your testing email)"
                },{
                    prop: "sponsor_type",
                    label: "Payee"
                },{
                    prop: "fatherEmail",
                    label: "Father Email"
                },{
                    prop: "motherEmail",
                    label: "Mother Email"
                }],
                testingSelectedReceiptListInt:[],
                testingSelectedReceiptList:[{
                    prop: "studentName",
                    label: "Student Name"
                }, {
                    prop: "RH_Receipt_Status",
                    label: "Receipt Status"
                },{
                    prop: "RH_Receipt_Name",
                    label: "Receipt Name"
                },{
                    prop: "email",
                    label: "Email"
                },{
                    prop: "sponsor_type",
                    label: "Payee"
                },{
                    prop: "fatherEmail",
                    label: "Father Email"
                },{
                    prop: "motherEmail",
                    label: "Mother Email"
                }],
                testingSelectedCNListInt:[],
                testingSelectedCNList:[{
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
                    label: "Email(Key in your testing email)"
                },{
                    prop: "sponsor_type",
                    label: "Payee"
                },{
                    prop: "fatherEmail",
                    label: "Father Email"
                },{
                    prop: "motherEmail",
                    label: "Mother Email"
                }],
                //testing only: end

            }
        },
        methods:{
            async changeSelection(val) {
                this.spdSelection = val;
            },

            loadList(){
                if(this.ddlSelectedValue=='Invoice')
                {
                    this.zipType = 'invoice';
                    this.ddlInvoiceSelected=true;
                    this.ddlReceiptSelected=false;
                    this.ddlCNSelected=false;
                }
                else if(this.ddlSelectedValue=='Receipt')
                {
                    this.zipType = 'receipt';
                    this.ddlInvoiceSelected=false;
                    this.ddlReceiptSelected=true;
                    this.ddlCNSelected=false;
                }
                else if(this.ddlSelectedValue=='CN')
                {
                    this.zipType = 'cn';
                    this.ddlInvoiceSelected=false;
                    this.ddlReceiptSelected=false;
                    this.ddlCNSelected=true;
                }

            },

            async Search(type){
                try{
                    this.clearTablesList();
                    this.clearBModalList();
                    //todo: to check empty input, force to input at least 1 datetime
                    if(this.inputFromDate.length<1&&this.inputFromDueDate.length<1&&!this.studName&&!this.studNO&&!this.invName&&!this.recName)
                    {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please input at least 1 item!',
                        });
                    }
                    else
                    {
                        this.$vs.loading();
                        if(type=='receipt'){
                            const resp = await DataSource.shared.getReceiptList( this.invName,
                                this.recName,this.inputFromDate[0],
                                this.inputFromDate[1],this.studNO,this.studName);
                            if (resp)
                            {
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
                                }else
                                {
                                    this.tempResp =resp.Table;
                                    // this.ReceiptListInt = this.tempResp;
                                    this.tempResp.forEach(m=>{
                                        if(m.email){
                                            this.ReceiptListInt.push(m);
                                        }
                                        else{
                                            this.ReceiptListWithoutPayeeEmailInt.push(m);
                                            // console.log('this.ReceiptListWithoutPayeeEmailInt=',this.ReceiptListWithoutPayeeEmailInt);
                                        }
                                    });
                                }
                            }

                        }
                        else{
                            const resp = await DataSource.shared.getInvoiceCNList(this.inputFromDate[0],
                                this.inputFromDate[1], this.inputFromDueDate[0],this.inputFromDueDate[1],
                                this.studNO,this.invName,this.studName, type);
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
                                    this.tempResp.forEach(m=>{
                                        if(type=='invoice'){
                                            if(m.email){
                                                this.InvoiceListInt.push(m);
                                            }
                                            else{
                                                this.InvoiceListWithoutPayeeEmailInt.push(m);
                                            }
                                        }
                                        else if(type=='cn')
                                        {
                                            if(m.email){
                                                this.CNListInt.push(m);
                                            }
                                            else{
                                                this.CNListWithoutPayeeEmailInt.push(m);
                                            }
                                        }

                                    });
                                }
                            }
                        }
                    }

                }
                catch (e) {
                        this.results = e;
                    }
                this.$vs.loading.close();
                },

            async downloadAsZip() {
                try{
                    let spdList = [];
                    let selectedObjList=[];
                    spdList = this.spdSelection;
                    if(this.spdSelection.length<1){
                        alert('Please select at least 1 item!');
                    }
                    else{
                        if(this.zipType=='invoice')
                        {
                            spdList.forEach(m=>{
                                let List ={
                                    IH_Invoice_No:m.IH_Invoice_No,
                                }
                                selectedObjList.push(List);
                            });
                        }
                        else if(this.zipType=='cn')
                        {
                            spdList.forEach(m=>{
                                let List ={
                                    IH_Invoice_No:m.IH_Invoice_No,

                                }
                                selectedObjList.push(List);
                            });
                        }
                        else if(this.zipType=='receipt')
                        {
                            spdList.forEach(m=>{
                                let List ={
                                    RH_Receipt_No:m.RH_Receipt_No,
                                }
                                selectedObjList.push(List);
                            });
                        }

                        const resp =  await DataSource.shared.getZipFiles(JSON.stringify(selectedObjList), this.zipType);
                        if(resp.code=='99'){
                            this.$notify.error({
                                title: 'Error',
                                message: 'Cannot download files!'
                            });
                        }
                        else{
                            var byteChar = atob(resp.code);
                            var byteNo = new Array(byteChar.length);
                            for (var i = 0; i < byteChar.length; i++){
                                byteNo[i] = byteChar.charCodeAt(i);
                            }
                            var byteArray = new Uint8Array(byteNo);
                            var file = new Blob([byteArray],{type: 'application/zip;base64'});
                            var fileUrl = URL.createObjectURL(file);
                            window.location.href = fileUrl;
                        }
                    }
                }
                catch (e) {
                    this.results = e;
                }
            },

            async btnSendEmail(value){
                try{
                    if(value==='No'){
                        this.$refs.showBatchEmailConfirmationModal.hide();
                    }
                    else{
                        this.clearTablesList();
                        let selectedObjList=[];
                        this.spdSelection.forEach(m=> {
                            let payeeEmails = m.email;

                            if (payeeEmails !== m.fatherEmail && payeeEmails !== m.motherEmail) {
                                payeeEmails += ','+(m.fatherEmail + ',' + m.motherEmail);
                                payeeEmails += ',';
                            }
                            else {

                                if (payeeEmails == m.fatherEmail && m.motherEmail !== '') {
                                    payeeEmails += ','+m.motherEmail;
                                    payeeEmails += ',';
                                }

                                if (payeeEmails == m.motherEmail && m.fatherEmail !== '') {
                                    payeeEmails += ','+m.fatherEmail;
                                    payeeEmails += ',';
                                    }
                                }

                                payeeEmails = payeeEmails.substring(0, payeeEmails.length - 1);


                            if(this.ddlSelectedValue=='Receipt')
                            {
                                let list={
                                    RH_Receipt_Name:m.RH_Receipt_Name,
                                    studentID:m.FK_Student_ID,
                                    studentName:m.studentName,
                                    email:payeeEmails,
                                    RH_Receipt_No:m.RH_Receipt_Name,
                                    PK_Receipt_ID:m.PK_Receipt_ID,
                                };
                                selectedObjList.push(list);
                            }
                            else
                            {
                                let list={
                                    IH_Invoice_No:m.IH_Invoice_No,
                                    studentID:m.FK_Student_ID,
                                    studentName:m.studentName,
                                    email:payeeEmails,
                                };
                                selectedObjList.push(list);
                            }
                        });

                        var resp={};
                        //todo:
                        if(this.ddlSelectedValue=='Receipt') {
                            const recresp = await DataSource.shared.sendEmailReceipt(JSON.stringify(selectedObjList));
                            resp = recresp;
                        }
                        else
                        {
                            const invresp =await DataSource.shared.sendEmailInvoice(JSON.stringify(selectedObjList));
                            resp = invresp;
                        }

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
                                // this.selectedEmailSenderListInt=resp.Table;
                                this.$refs.showBatchEmailConfirmationModal.hide();
                                // window.location.replace('/invoicelist');
                            }
                        }
                    }
                }
                catch(e){
                    this.results = e;
                }
            },

            async btnSendEmailWithBreakdown(value){
                try{
                    if(value==='No'){
                        this.$refs.showBatchEmailConfirmationModalWithBreakdown.hide();
                    }
                    else{
                        this.clearTablesList();
                        let selectedObjList=[];
                        this.spdSelection.forEach(m=>{

                            let payeeEmails = m.email;

                            if (payeeEmails !== m.fatherEmail && payeeEmails !== m.motherEmail) {
                                payeeEmails += ','+(m.fatherEmail + ',' + m.motherEmail);
                                payeeEmails += ',';
                            }
                            else {

                                if (payeeEmails == m.fatherEmail && m.motherEmail !== '') {
                                    payeeEmails += ','+m.motherEmail;
                                    payeeEmails += ',';
                                }

                                if (payeeEmails == m.motherEmail && m.fatherEmail !== '') {
                                    payeeEmails += ','+m.fatherEmail;
                                    payeeEmails += ',';
                                }
                            }

                            payeeEmails = payeeEmails.substring(0, payeeEmails.length - 1);

                            if(this.ddlSelectedValue=='Receipt')
                            {
                                let list={
                                    RH_Receipt_Name:m.RH_Receipt_Name,
                                    studentID:m.FK_Student_ID,
                                    studentName:m.studentName,
                                    email:payeeEmails,
                                    RH_Receipt_No:m.RH_Receipt_Name,
                                    PK_Receipt_ID:m.PK_Receipt_ID,
                                };
                                selectedObjList.push(list);
                            }
                            else
                            {
                                let list={
                                    IH_Invoice_No:m.IH_Invoice_No,
                                    studentID:m.FK_Student_ID,
                                    studentName:m.studentName,
                                    email:payeeEmails,
                                };
                                selectedObjList.push(list);
                            }
                        });

                        var resp={};
                        //todo:
                        if(this.ddlSelectedValue=='Receipt') {
                            const recresp = await DataSource.shared.sendBreakdownEmail(JSON.stringify(selectedObjList));
                            resp = recresp;
                        }
                        else
                        {
                            const invresp =await DataSource.shared.sendBreakdownEmail(JSON.stringify(selectedObjList));
                            resp = invresp;
                        }

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
                                // this.selectedEmailSenderListInt=resp.Table;
                                this.$refs.showBatchEmailConfirmationModalWithBreakdown.hide();
                            }
                        }
                    }
                }
                catch(e){
                    this.results = e;
                }
            },

            async getSelectedList(){
                try{
                    if(this.ddlSelectedValue=='Invoice')
                    {
                        this.selectedInvoiceListInt=this.spdSelection ;
                    }
                    else if(this.ddlSelectedValue=='Receipt')
                    {
                        this.selectedReceiptListInt=this.spdSelection ;
                    }
                    else if(this.ddlSelectedValue=='CN')
                    {
                        this.selectedCNListInt=this.spdSelection ;
                    }
                }
                catch(e){
                    this.results = e;
                }
            },
            async showBModal(){
                try{
                    //todo: check if no checkbox selected
                    if(this.spdSelection.length<1)
                    {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please select at least 1 item!',
                        });
                    }
                    else{
                        this.$refs.showBatchEmailConfirmationModal.show();
                        await this.getSelectedList();
                    }
                }
                catch(e){
                    this.results=e;
                }
            },
            async showBModalWithBreakdown(){
                try {
                    if (this.spdSelection.length < 1){
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please select at least 1 item!',
                        });
                    }
                    else
                    {
                        this.$refs.showBatchEmailConfirmationModalWithBreakdown.show();
                        await this.getSelectedList();
                    }
                }
                catch(e){
                    this.results=e;
                }
            },
            async clearTablesList(){
               this.InvoiceListInt=[];
               this.InvoiceListWithoutPayeeEmailInt=[];
               this.ReceiptListInt=[];
               this.ReceiptListWithoutPayeeEmailInt=[];
               this.CNListInt=[];
               this.CNListWithoutPayeeEmailInt=[];
               // this.selectedInvoiceListInt=[];
               // this.selectedReceiptListInt=[];
               // this.selectedCNListInt=[];
            },

            async clearBModalList(){
                this.spdSelection=[];
                this.selectedInvoiceListInt=[];
                this.selectedReceiptListInt=[];
                this.selectedCNListInt=[];
            },

            //Testing items only: start
            async showTestBModal(){
                try{
                    //todo: check if no checkbox selected
                    if(this.spdSelection.length<1)
                    {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please select at least 1 item!',
                        });
                    }
                    else{
                        this.$refs.showTestingBModal.show();
                        await this.getTestingSelectedList();
                    }
                }
                catch(e){
                    this.results=e;
                }
            },
            async showTestBModalWithBreakdown(){
                try{
                    //todo: check if no checkbox selected
                    if(this.spdSelection.length<1)
                    {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please select at least 1 item!',
                        });
                    }
                    else{
                        this.$refs.showTestingBModalWithBreakdown.show();
                        await this.getTestingSelectedList();
                    }
                }
                catch(e){
                    this.results=e;
                }
            },
            async getTestingSelectedList() {
                try{
                    // this.testingSelectedListInt=this.spdSelection ;
                    if(this.ddlSelectedValue=='Invoice')
                    {
                        this.testingSelectedInvoiceListInt=this.spdSelection ;
                    }
                    else if(this.ddlSelectedValue=='Receipt')
                    {
                        this.testingSelectedReceiptListInt=this.spdSelection ;
                    }
                    else if(this.ddlSelectedValue=='CN')
                    {
                        this.testingSelectedCNListInt=this.spdSelection ;
                    }
                }
                catch(e){
                    this.results=e;
                }
            },
            async btnTestingSendEmail(value){
                try{
                    if(value==='No'){
                        this.$refs.showTestingBModal.hide();
                    }
                    else{
                        this.clearTablesList();
                        let selectedObjList=[];
                        this.spdSelection.forEach(m=>{
                            let payeeEmails = m.email;

                            if (payeeEmails !== m.fatherEmail && payeeEmails !== m.motherEmail) {
                                payeeEmails += ','+(m.fatherEmail + ',' + m.motherEmail);
                                payeeEmails += ',';
                            }
                            else {

                                if (payeeEmails == m.fatherEmail && m.motherEmail !== '') {
                                    payeeEmails += ','+m.motherEmail;
                                    payeeEmails += ',';
                                }

                                if (payeeEmails == m.motherEmail && m.fatherEmail !== '') {
                                    payeeEmails += ','+m.fatherEmail;
                                    payeeEmails += ',';
                                }
                            }

                            payeeEmails = payeeEmails.substring(0, payeeEmails.length - 1);

                            if(this.ddlSelectedValue=='Receipt')
                            {
                                let list={
                                    RH_Receipt_Name:m.RH_Receipt_Name,
                                    studentID:m.FK_Student_ID,
                                    studentName:m.studentName,
                                    email:m.newTestEmail,
                                    RH_Receipt_No:m.RH_Receipt_Name,
                                    PK_Receipt_ID:m.PK_Receipt_ID,
                                };
                                selectedObjList.push(list);
                            }
                            else
                            {
                                let list={
                                    IH_Invoice_No:m.IH_Invoice_No,
                                    studentID:m.FK_Student_ID,
                                    studentName:m.studentName,
                                    email:m.newTestEmail,
                                };
                                selectedObjList.push(list);
                            }
                        });

                        var resp={};
                        //todo:
                        if(this.ddlSelectedValue=='Receipt') {
                            const recresp = await DataSource.shared.sendEmailReceipt(JSON.stringify(selectedObjList));
                            resp = recresp;
                        }
                        else
                        {
                            const invresp =await DataSource.shared.sendEmailInvoice(JSON.stringify(selectedObjList));
                            resp = invresp;
                        }

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

                                this.$refs.showTestingBModal.hide();
                            }
                        }
                    }
                }
                catch(e){
                    this.results = e;
                }
            },
            async btnTestingSendEmailWithBreakdown(value){
                try{
                    if(value==='No'){
                        this.$refs.showTestingBModalWithBreakdown.hide();
                    }
                    else{
                        let selectedObjList=[];
                        this.spdSelection.forEach(m=>{
                            let list={
                                IH_Invoice_No:m.IH_Invoice_No,
                                studentID:m.FK_Student_ID,
                                studentName:m.studentName,
                                email:m.newTestEmail,
                            };
                            selectedObjList.push(list);
                        });

                        const resp = await DataSource.shared.sendBreakdownEmail(JSON.stringify(selectedObjList));
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

                                this.$refs.showTestingBModalWithBreakdown.hide();
                            }
                        }
                    }
                }
                catch(e){
                    this.results = e;
                }
            },
            //Testing items only: end
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
