<template>
    <div id="invoice-list">
        <div class="container">
            <div>
                <div class="pull-left">
                    <el-select v-on:change="loadList()" v-model="ddlSelectedValue"
                               placeholder="Please select:" filterable>
                        <el-option v-for="items in ddlSelection" :value="items.value">{{items.text}}</el-option>
                    </el-select>
                </div>

<!--                <div>-->
<!--                    <h3 class="text-left mb-12"><p class="font-weight-bold">{{ddlSelectedValue}}</p></h3>-->
<!--                </div>-->
            </div>

            <div v-if="ddlInvoiceSelected">

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
                        <button class="btn btn-success searchbtn" id="btnSearch" v-on:click="Search('invoice')">Search</button>
                    </div>
                </div>

                <div class="datatable-form__header atr-header-wrap mb-4">
                    <!--                <label>Student Name:</label>-->
                    <el-input v-model="studName" type="text" placeholder="Student Name"></el-input>
                    <!--                <label>Student NO:</label>-->
                    <el-input v-model="studNO"  type="text" placeholder="Student NO"></el-input>
                    <!--                <label>Invoice NO:</label>-->
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
                                <button class="btn btn-success searchbtn" id="btnSendEmailWithBreakdown" v-on:click="showBModalWithBreakdown()">Send Email With Breakdown</button><br><br>

                                <!--                                <button class="btn btn-success searchbtn" id="btnSendEmail" v-on:click="btnSendEmail()">Send Email</button><br>-->
                                <br><button class="" id="btnTest" v-on:click="showTestBModal()">SEND BATCH EMAIL(TESTING PURPOSES ONLY)</button>
                                <br><button class="" id="btnTestWithBreakdown" v-on:click="showTestBModalWithBreakdown()">SEND BATCH EMAIL With Breakdown(TESTING PURPOSES ONLY)</button>
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

            <div v-if="ddlReceiptSelected">
                <div class="datatable-form__header atr-header-wrap mb-4">
                    <label>Receipt Date From-To(Optional)</label>
                    <el-date-picker
                            v-model="inputFromDate"
                            type="daterange"
                            range-separator="To"
                            start-placeholder="From Date"
                            end-placeholder="To Date"
                            format="dd/MM/yyyy"
                            value-format="dd/MM/yyyy">
                    </el-date-picker>

                    <label>Receipt DUE Date From-To(Optional)</label>
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
                        <button class="btn btn-success searchbtn" id="btnReceiptSearch" v-on:click="Search('receipt')">Search</button>
                    </div>
                </div>

                <div class="datatable-form__header atr-header-wrap mb-4">
                    <!--                <label>Student Name:</label>-->
                    <el-input v-model="studName" type="text" placeholder="Student Name"></el-input>
                    <!--                <label>Student NO:</label>-->
                    <el-input v-model="studNO"  type="text" placeholder="Student NO"></el-input>
                    <!--                <label>Invoice NO:</label>-->
                    <el-input v-model="invName"  type="text" placeholder="Invoice NO"></el-input>
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
                                <button class="btn btn-success searchbtn" id="btnReceiptSendEmailWithBreakdown" v-on:click="showBModalWithBreakdown()">Send Email With Breakdown</button><br><br>

                                <!--                                <button class="btn btn-success searchbtn" id="btnSendEmail" v-on:click="btnSendEmail()">Send Email</button><br>-->
                                <br><button class="" id="btnReceiptTest" v-on:click="showTestBModal()">SEND BATCH EMAIL(TESTING PURPOSES ONLY)</button>
                                <br><button class="" id="btnReceiptTestWithBreakdown" v-on:click="showTestBModalWithBreakdown()">SEND BATCH EMAIL With Breakdown(TESTING PURPOSES ONLY)</button>
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

            <div v-if="ddlCNSelected">
                <div class="datatable-form__header atr-header-wrap mb-4">
                    <label>CreditNote Date From-To(Optional)</label>
                    <el-date-picker
                            v-model="inputFromDate"
                            type="daterange"
                            range-separator="To"
                            start-placeholder="From Date"
                            end-placeholder="To Date"
                            format="dd/MM/yyyy"
                            value-format="dd/MM/yyyy">
                    </el-date-picker>

                    <div class="datatable-form__submit text-center">
                        <button class="btn btn-success searchbtn" id="btnCNSearch" v-on:click="Search('cn')">Search</button>
                    </div>
                </div>

                <div class="datatable-form__header atr-header-wrap mb-4">
                    <!--                <label>Student Name:</label>-->
                    <el-input v-model="studName" type="text" placeholder="Student Name"></el-input>
                    <!--                <label>Student NO:</label>-->
                    <el-input v-model="studNO"  type="text" placeholder="Student NO"></el-input>
                    <!--                <label>Invoice NO:</label>-->
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
                            <h5 class="text-left mb-3">
                                <p style="color:blue" class="font-weight-bold">CN List</p></h5>

                            <data-tables :data="CNListInt"  :action-col="CNListAction"
                                         @selection-change="changeSelection" width="55" stripe tooltip-effect='light' border
                                         ref="CNListTable">
                                <el-table-column type="selection" width="55" :reserve-selection="true">
                                </el-table-column>
                                <el-table-column v-for="item in CNList"
                                                 :prop="item.prop"
                                                 :label="item.label"
                                                 :key="item.prop"
                                                 sortable="custom">
                                </el-table-column>
                            </data-tables>

                            <div class="datatable-form__submit text-center">
                                <button class="btn btn-success searchbtn" id="btnCNSendEmail" v-on:click="showBModal()">Send Email</button> &nbsp; &nbsp;
                                <button class="btn btn-success searchbtn" id="btnCNSendEmailWithBreakdown" v-on:click="showBModalWithBreakdown()">Send Email With Breakdown</button><br><br>

                                <!--                                <button class="btn btn-success searchbtn" id="btnSendEmail" v-on:click="btnSendEmail()">Send Email</button><br>-->
                                <br><button class="" id="btnCNTest" v-on:click="showTestBModal()">SEND BATCH EMAIL(TESTING PURPOSES ONLY)</button>
                                <br><button class="" id="btnCNTestWithBreakdown" v-on:click="showTestBModalWithBreakdown()">SEND BATCH EMAIL With Breakdown(TESTING PURPOSES ONLY)</button>
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
        <b-modal id="showBatchEmailConfirmationModalWithBreakdown" hide-footer title="Send Email Confirmation With Breakdown" size="sm"
                 ref="showBatchEmailConfirmationModalWithBreakdown">
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
            <b-button class="mt-2" variant="success" block v-on:click="btnSendEmailWithBreakdown()">Yes</b-button>
            <b-button class="mt-2" variant="danger" block v-on:click="btnSendEmailWithBreakdown('No')">No</b-button>
        </b-modal>


<!--        //testing only: start-->
        <b-modal id="showTestingBModal" hide-footer title="Send Email Confirmation(TEST ONLY!)" size="sm"
                 ref="showTestingBModal">
            <data-tables :data="testingSelectedListInt"
                         width="55" stripe tooltip-effect='light' border
                         ref="selectedListTable">
                <el-table-column v-for="item in testingSelectedList"
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
            <data-tables :data="testingSelectedListInt"
                         width="55" stripe tooltip-effect='light' border
                         ref="selectedListTable">
                <el-table-column v-for="item in testingSelectedList"
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
    //import Cookies from "js-cookie";
    export default {
        name: "InvoiceList",
        async created(){
            // await this.Search();
        },
        async mounted(){},
        data(){
            return{
                ddlSelection:[
                    { text: 'Invoice', value: 'Invoice' },
                    // { text: 'Receipt', value: 'Receipt' },
                    // { text: 'CN', value: 'CN' }
                ],
                ddlSelectedValue:[],
                ddlInvoiceSelected:false,
                ddlReceiptSelected:false,
                ddlCNSelected:false,

                //search filter added on
                studName:'',
                studNO:'',
                invName:'',
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
                }, {
                    prop: "IH_Invoice_Status",
                    label: "Invoice Status"
                },{
                    prop: "IH_Invoice_No",
                    label: "Invoice Name"
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
                }, {
                    prop: "IH_Invoice_Status",
                    label: "Invoice Status"
                },{
                    prop: "IH_Invoice_No",
                    label: "Invoice Name"
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
                },{
                    prop: "fatherEmail",
                    label: "Father Email"
                },{
                    prop: "motherEmail",
                    label: "Mother Email"
                }],

                tempResp:[],

                //testing only:start
                testingSelectedListInt:[],
                testingSelectedList:[{
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
                rules: {
                    studentName:{ type:"string",required:true,message:"必填字段",trigger:"change"},
                    input:{ type:"string",required:true,message:"必填字段",trigger:"change"},
                    supplier:{ type:"string",required:true,message:"必填字段",trigger:"change"},
                    newTestEmail:{ type:"string",required:true,message:"必填字段",trigger:"change"},
                },
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
                    this.ddlInvoiceSelected=true;
                    this.ddlReceiptSelected=false;
                    this.ddlCNSelected=false;
                }
                else if(this.ddlSelectedValue=='Receipt')
                {
                    this.ddlInvoiceSelected=false;
                    this.ddlReceiptSelected=true;
                    this.ddlCNSelected=false;
                }
                else if(this.ddlSelectedValue=='CN')
                {
                    this.ddlInvoiceSelected=false;
                    this.ddlReceiptSelected=false;
                    this.ddlCNSelected=true;
                }

                console.log('this.ddlSelection=',this.ddlSelection,
                    'this.ddlSelectedValu=',this.ddlSelectedValue,this.ddlInvoiceSelected,this.ddlReceiptSelected,this.ddlCNSelected);
            },

            async Search(type){
                this.$vs.loading();
                try{
                    this.clearTablesList();
                    const resp = await DataSource.shared.getInvoiceList(this.inputFromDate[0],
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
                                else if(type=='receipt'){
                                    if(m.email){
                                        this.ReceiptListInt.push(m);
                                    }
                                    else{
                                        this.ReceiptListWithoutPayeeEmailInt.push(m);
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


                            let list={
                                IH_Invoice_No:m.IH_Invoice_No,
                                studentID:m.FK_Student_ID,
                                studentName:m.studentName,
                                email:payeeEmails,
                            };
                            selectedObjList.push(list);
                        });

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
                                // this.selectedEmailSenderListInt=resp.Table;
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

            async btnSendEmailWithBreakdown(value){
                try{
                    if(value==='No'){
                        this.$refs.showBatchEmailConfirmationModalWithBreakdown.hide();
                    }
                    else{
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

                            let list={
                                IH_Invoice_No:m.IH_Invoice_No,
                                studentID:m.FK_Student_ID,
                                studentName:m.studentName,
                                email:payeeEmails,
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
                                // this.selectedEmailSenderListInt=resp.Table;
                                this.$refs.showBatchEmailConfirmationModalWithBreakdown.hide();
                                window.location.replace('/invoicelist');
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
                    this.selectedListInt=this.spdSelection ;
                }
                catch(e){
                    this.results = e;
                }
            },
            async showBModal(){
                try{
                    this.$refs.showBatchEmailConfirmationModal.show();
                    await this.getSelectedList();
                }
                catch(e){
                    this.results=e;
                }
            },
            async showBModalWithBreakdown(){
                try{
                    this.$refs.showBatchEmailConfirmationModalWithBreakdown.show();
                    await this.getSelectedList();
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
            },

            //Testing items only: start
            async showTestBModal(){
                try{
                    this.$refs.showTestingBModal.show();
                    await this.getTestingSelectedList();
                }
                catch(e){
                    this.results=e;
                }
            },
            async showTestBModalWithBreakdown(){
                try{
                    this.$refs.showTestingBModalWithBreakdown.show();
                    await this.getTestingSelectedList();
                }
                catch(e){
                    this.results=e;
                }
            },
            async getTestingSelectedList()
            {
                try{
                    this.testingSelectedListInt=this.spdSelection ;
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

                                this.$refs.showTestingBModal.hide();
                                window.location.replace('/invoicelist');
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
                                window.location.replace('/invoicelist');
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
