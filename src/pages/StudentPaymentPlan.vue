<template>
    <div id="studentpaymentplan">
        <div class="container">
            <div class="row">
                <div class= "col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h5 class="text-left">Student Payment List</h5>
                    <div v-if="studentPaymentListInt.length>0" class="datatable_group">
                        <data-tables :data="studentPaymentListInt" @selection-change="changeSelection">
                            <el-table-column v-for="studentPaymentItem in studentPaymentList" :prop="studentPaymentItem.prop"
                                             :label="studentPaymentItem.label" :key="studentPaymentItem.prop"
                                             sortable="custom">
                            </el-table-column>
                            <el-table-column label="Action" min-width="100px">
                                <template slot-scope="scope">
                                    <el-button v-for="itemDetails in retrieveItemTransactionDetails(scope.row)"
                                               :key="itemDetails.name" type="primary"
                                               @click="itemDetails.handler">
                                        {{itemDetails.name}}
                                    </el-button>
                                </template>
                            </el-table-column>
                            <el-table-column type="selection" width="55" :reserve-selection="true">
                            </el-table-column>
                        </data-tables>
                    </div>
                </div>

                <div class= "col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h5 class="text-left">Batch Payment</h5>
                    <div class="row form-group__wrapper">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <h5 class="text-left">INVOICING</h5>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Payment Due Date</label>
                            <div class="date">
                                <el-date-picker v-model="inputPaymentDueDate" format="dd/MM/yyyy"
                                                value-format="dd/MM/yyyy" type="date"
                                                placeholder="Pick a day"></el-date-picker>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Letterhead (Hong Kong only):</label>
                            <label>
                                <input type="checkbox" class="form-control" ref="cbPrintMonthlyBreakdown">
                                Print monthly breakdown
                                <span>
                                    <span>
                                        <svg class="checkmark" viewBox="0 0 24 24"><path class="checkmark-path"
                                                                                         fill="none" stroke="white"
                                                                                         d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg>
                                    </span>
                                </span>
                            </label>
                        </div>
                        <div class="buttonArea">
                            <div class="text-center mg-b-pro-edt custom-pro-edt-ds">
                                <button v-on:click="ValidationPreviewInvoice" type="button"
                                        class="btn btn-primary waves-effect waves-light m-r-10">Preview Invoice
                                </button>
                            </div>
                        </div>
                        <!--<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">-->
                            <!--<div >-->
                        <div class="buttonArea">
                            <div class="text-center mg-b-pro-edt custom-pro-edt-ds">
                                <button v-on:click="ValidationGenerateInvoice" type="button"
                                        class="btn btn-primary waves-effect waves-light m-r-10">Generate Invoice
                                </button>
                            </div>
                        </div>

                       <div class="row form-group__wrapper"></div>

                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                            <h5 class="text-left">RECEIPTS</h5>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Payment Mode</label>
                            <select v-model="ddlPaymentMode"
                                    class="form-control pro-edt-select form-control-primary" >
                                <option v-for="item in paymentModeList" v-bind:value="item.OPTvalue.trim()">{{
                                    item.OPTvalue.trim() }}
                                </option>
                            </select>
                            <!--<div class="requiredFieldsMsg" v-if="$v.ddlPaymentMode.$error">Payment Mode-->
                                <!--Require-->
                            <!--</div>-->
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Cheque/DD No & Bank Name</label>
                            <input type="text" class="form-control" v-model="inputChequeNoBankName">
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Receipt Date</label>
                            <div class="date">
                                <el-date-picker v-model="inputReceiptDate" format="dd/MM/yyyy"
                                                value-format="dd/MM/yyyy" type="date"
                                                placeholder="Pick a day"></el-date-picker>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Remarks</label>
                            <input type="text" class="form-control" v-model="inputRemarks">
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                            <label>
                                <input type="checkbox" class="form-control" ref="cbUnderpayment">
                                Underpayment
                                <span>
                                    <span>
                                        <svg class="checkmark" viewBox="0 0 24 24"><path class="checkmark-path"
                                                                                         fill="none" stroke="white"
                                                                                         d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg>
                                    </span>
                                </span>
                            </label>
                            <label>
                                <input type="checkbox" class="form-control" ref="cbRemainder">
                                Remainder
                                <span>
                                    <span>
                                        <svg class="checkmark" viewBox="0 0 24 24"><path class="checkmark-path"
                                                                                         fill="none" stroke="white"
                                                                                         d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg>
                                    </span>
                                </span>
                            </label>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                            <label>
                                <input type="checkbox" class="form-control" ref="cbSubsequent Underpayment">
                                Subsequent Underpayment
                                <span>
                                    <span>
                                        <svg class="checkmark" viewBox="0 0 24 24"><path class="checkmark-path"
                                                                                         fill="none" stroke="white"
                                                                                         d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg>
                                    </span>
                                </span>
                            </label>
                            <label>
                                <input type="checkbox" class="form-control" ref="cbOverpayment">
                                Overpayment
                                <span>
                                    <span>
                                        <svg class="checkmark" viewBox="0 0 24 24"><path class="checkmark-path"
                                                                                         fill="none" stroke="white"
                                                                                         d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg>
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <b-modal id="viewTransactionModal" size="lg" title="All Transactions for Student Payment Item" ok-only ok-variant="secondary" ok-title="Cancel" ref="viewTransactionShowModal">
            <div class="row">
                <div class= "col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div v-if="itemTransDetailsInt.length>0">
                        <data-tables :data="itemTransDetailsInt"  >
                            <el-table-column v-for="itemTransDetailsListItem in itemTransDetailsList" :prop="itemTransDetailsListItem.prop"
                                             :label="itemTransDetailsListItem.label" :key="itemTransDetailsListItem.prop"
                                             sortable="custom">
                            </el-table-column>
                        </data-tables>
                    </div>
                </div>
            </div>
        </b-modal>

        <button v-on:click="Test()">Test</button>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";

    export default {
        name: "StudentPaymentPlan",

        data() {
            return {
                studentPaymentListInt: [],
                studentPaymentList: [{
                    prop: "SPPD_PayerName",
                    label: "Name"
                }, {
                    prop: "SPPD_Status",
                    label: "Invoice Status"
                }, {
                    prop: "SPPD_PaymentDates",
                    label: "Payment Date"
                }, {
                    prop: "SPPD_PaymentAmount",
                    label: "Amount"
                }, {
                    prop: "totalIncludeGst",
                    label: "Incl. GST"
                }, {
                    prop: "RecTotal",
                    label: "Paid Amount"
                // }, {
                //     prop: "InvoiceDate",
                //     label: "Inv Date"
                // }, {
                //     prop: "PaymentItemType",
                //     label: "SPPD_PaymentItemType"
                // }, {
                //     prop: "Status",
                //     label: "SPPD_Status"
                }],

                itemTransDetailsInt: [],
                itemTransDetailsList: [{
                    prop: "DocumentDate",
                    label: "Date"
                }, {
                    prop: "DocumentType",
                    label: "Transaction Type"
                }, {
                    prop: "DocumentNo",
                    label: "Document Number"
                }, {
                    prop: "DocumentStatus",
                    label: "Document Status"
                }, {
                    prop: "TotalIncGst",
                    label: "Total (Incl. GST)"
                }, {
                    prop: "DocumentCreatedBy",
                    label: "Created By"
                }],

                inputPaymentDueDate: '',
                inputReceiptDate: '',
                paymentModeList:[],
                multipleSelection:[],
            };
        },

        async created() {
            this.getStudentPaymentList();
            this.BindPaymentModeDropdown();
        },

        async mounted() {

        },

        methods: {
            async changeSelection(val) {
                this.multipleSelection = val;
            },

            Test()
            {
                console.log(this.multipleSelection);
            },

            async getStudentPaymentList() {
                this.$vs.loading();
                try {
                    const response = await DataSource.shared.getStudentPaymentList('SCR2019190104');
                    if (response) {
                        switch (response.code) {
                            case "2":
                                this.$notify.error({
                                    title: 'No Record Found',
                                    message: 'No Student Payment Record'
                                });
                                break;
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
                                this.studentPaymentListInt = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },

            retrieveItemTransactionDetails(row) {
                return [{
                    name: 'View Trans',
                    handler: _ => {
                        this.viewSPDID =  row.PK_SPD_ID;
                        this.viewSPPDPayerName =  row.SPPD_PayerName;
                        this.getItemTransDetailsList();
                    }
                }];
            },

            async getItemTransDetailsList(){
                this.$vs.loading();
                try {
                    const response = await DataSource.shared.getItemTransDetailsList(this.viewSPDID);
                    if (response) {
                        switch (response.code) {
                            case "2":
                                this.$notify.error({
                                    title: 'No Record Found',
                                    message: 'No Invoice Generated'
                                });
                                break;
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
                                this.itemTransDetailsInt = response.Table;
                                this.$refs.viewTransactionShowModal.show();
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },

            // todo:validation preview invoice
            async ValidationPreviewInvoice() {
                try {
                    this.$v.$touch();

                    if (this.$v.$error) {
                        alert('Please select at least 1 item');
                        return;
                    }
                    // todo: create function for preview invoice
                    // this.PreviewInvoice();
                } catch (e) {
                    this.results = e;
                }
            },
            // todo: validation generate invoice
            async ValidationGenerateInvoice() {
                try {
                    this.$v.$touch();

                    if (this.$v.$error) {
                        alert('Please select at least 1 item');
                        return;
                    }
                    // todo: create function for generate invoice
                    // this.GenerateInvoice();
                } catch (e) {
                    this.results = e;
                }
            },

            async BindPaymentModeDropdown()
            {
                try {
                    let jsonString = '"Pay Type":"Pay Type"';
                    jsonString = "{" + jsonString + "}";

                    const response = await DataSource.shared.getStudentDropDownList(jsonString);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        }
                        else {

                            this.paymentModeListResponse = response.Table;
                            this.paymentModeListResponse.forEach(m => {
                                if (m.OGPname.trim() === 'Pay Type') {
                                    this.paymentModeList.push(m);
                                }
                            });
                        }
                    }
                } catch (e) {
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
</style>