<template>
    <div id="studentpaymentplan">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h5 class="text-left student-form__title" id="StudentInformation">
                       <b>Student Information</b></h5>
                </div>

                <div class="row form-group__wrapper">
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Student Name</label>
                        <input type="text" class="form-control form__input" v-model="inputStudentName" disabled>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Student NO</label>
                        <input type="text" class="form-control form__input" v-model="inputStudentNO" disabled>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Meal Preferences</label>
                        <input type="text" class="form-control" v-model="inputMealPreferences" disabled>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>Payee Name</label>
                        <input type="text" class="form-control" v-model="inputPayeeName" disabled>
                    </div>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h5 class="text-left student-form__title" id="StudentSibling">
                        <b>Siblings</b></h5>
                    <div v-if="siblingListTableInt.length>0">
                        <data-tables :data="siblingListTableInt">
                            <el-table-column v-for="siblingItem in siblingListTableList" :prop="siblingItem.prop"
                                             :label="siblingItem.label" :key="siblingItem.prop">
                            </el-table-column>
                        </data-tables>
                    </div>
                    <div v-else class="siblingNoRecordArea">
                        <label>No Sibling...</label>
                    </div>
                </div>

                <div class= "col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h5 class="text-left student-form__title" id="Payment_List">
                        <b>Payment List</b></h5>
                    <div v-if="PaymentListInt.length>0" class="datatable_group">
                        <data-tables :data="PaymentListInt" :filters="PaymentListFilters" >
                            <el-table-column v-for="PaymentItem in PaymentList" :prop="PaymentItem.prop"
                                             :label="PaymentItem.label" :key="PaymentItem.prop">
                            </el-table-column>
                            <el-table-column label="CN/Receipt" min-width="70px">
                                <template slot-scope="scope">
                                    <div class="receiptScope" v-for="item in splitReceiptList(scope.row.recNameList)"
                                                              v-bind:key="item.ID">
<!--                                        <a href="#" id="link">{{item}}</a>-->
                                       {{item}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="Action" min-width="70px">
                                <template slot-scope="scope">
                                    <div>
                                        <a href="#" style="color:red" @click="showTransaction(scope.row)">
                                            <i class="fa fa-list-alt" aria-hidden="true" style='font-size:24px'
                                               title="Show Transaction" ></i></a>&nbsp

                                        <a href="#" v-if="scope.row.generateReceiptFlag =='Yes'&&btnDisabled==false"
                                           style="color:green"
                                           @click="showGenerateReceiptByHistory(scope.row)">
                                            <i class="fa fa-btc" aria-hidden="true" style='font-size:24px'
                                               title="Generate Receipt"></i></a>&nbsp

                                        <a href="#" v-if="scope.row.generateCNFlag=='Yes'&&btnDisabled==false"
                                           style="color:blue" @click="showGenerateCreditNote(scope.row)">
                                            <i class="fa fa-money" aria-hidden="true" style='font-size:24px'
                                            title="Generate CreditNote"></i></a>&nbsp

                                        <a href="#" v-if="scope.row.reInvoiceFlag=='Yes'&&btnDisabled==false"
                                           style="color:rebeccapurple" @click="showReInvoice(scope.row)">
                                            <i class="fa fa-files-o" aria-hidden="true" style='font-size:24px'
                                               title="Re-Invoice"></i></a>&nbsp
                                    </div>

                                </template>
                            </el-table-column>
                        </data-tables>
                    </div>
                </div>

                <div class= "col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="row form-group__wrapper">
                        <div class="buttonArea col-lg-3 col-md-3 col-sm-3 col-xs-12">
                            <div class="text-center mg-b-pro-edt custom-pro-edt-ds">
                                <button v-on:click="showGenerateInvoice" type="button" :disabled="btnDisabled"
                                        class="btn btn-primary waves-effect waves-light m-r-10">Generate/Preview Invoice
                                </button>
                            </div>
                        </div>
                        <div class="buttonArea col-lg-3 col-md-3 col-sm-3 col-xs-12">
                            <div class="text-center mg-b-pro-edt custom-pro-edt-ds">
                                <button v-on:click="showGenerateReceipt" type="button" :disabled="btnDisabled"
                                        class="btn btn-primary waves-effect waves-light m-r-10">Generate/Preview Receipt
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <b-modal id="viewTransactionModal" size="lg" title="Transactions History" ok-only ok-variant="secondary" ok-title="Cancel" ref="viewTransactionShowModal">
<!--            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">-->
<!--                <label>Payment Item Name: {{this.viewSPPDPayerName}}</label>-->
<!--            </div>-->
            <div class="row">
                <div class= "col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div v-if="studentReceiptGenerationByTransactionHistoryListInt.length>0">
                        <data-tables :data="studentReceiptGenerationByTransactionHistoryListInt">
                            <el-table-column label="Document Number" min-width="70px">
                                <template slot-scope="scope">
                                    <a href="#" style="color:blue" @click="getTransactionDocumentPdf(scope.row)">{{scope.row.DocumentNo}}</a>
                                </template>
                            </el-table-column>
                            <el-table-column v-for="item in studentReceiptGenerationByTransactionHistoryList" :prop="item.prop"
                                             :label="item.label" :key="item.prop"
                                             sortable="custom">
                            </el-table-column>
                        </data-tables>

                    </div>
                </div>
            </div>
        </b-modal>

        <b-modal id="newApplyPaymentPlanModal" size="lg" title="Apply Payment Plan" ok-only ok-variant="secondary" hide-footer ref="newApplyPaymentPlanShowModal">
            <div class="row ml-2 mr-2">

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>* Payment Plan</label>
                        <el-select class="float-left fullwidth" v-model="ddlPaymentPlan">
                            <el-option
                                    v-for="item in paymentPlanList"
                                    :key="item.PK_Course_Fee_Scheme_ID"
                                    :label="item.PPM_Fee_Scheme_Name"
                                    :value="item.PK_Course_Fee_Scheme_ID">
                            </el-option>
                        </el-select>
                        <button v-on:click="viewPaymentPlan()"
                                class="btn btn-primary waves-effect waves-light float-right">View Payment Plan
                        </button>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Start Date</label>
                    <input type="text" class="form-control" v-model="inputPaymentPlanStartDate" readonly="readonly">
                </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <label>
                            <input type="checkbox" class="form-control" v-model="cbProRateFees" :disabled="disabledCbProRateFees" @change="cbProRateFeesClick()">
                            Pro-Rate Fees
                            <span>
                            <span>
                                <svg class="checkmark" viewBox="0 0 24 24"><path class="checkmark-path"
                                                                                 fill="none" stroke="white"
                                                                                 d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg>
                            </span>
                        </span>
                        </label>
                        <input type="text" class="form-control EligibleColor" v-model="inputEligible" v-show="isProRateFeesEligible" readonly="readonly">
                        <input type="text" class="form-control NotEligibleColor" v-model="inputNotEligible" v-show="isProRateFeesNotEligible" readonly="readonly">

                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>
                        <input type="checkbox" class="form-control" v-model="cbPostRateFees" :disabled="disabledCbPostRateFees" @change="cbPostRateFeesClick()">
                        Post-Rate Fees
                        <span>
                            <span>
                                <svg class="checkmark" viewBox="0 0 24 24"><path class="checkmark-path"
                                                                                 fill="none" stroke="white"
                                                                                 d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg>
                            </span>
                        </span>
                    </label>
                    <input type="text" class="form-control EligibleColor" v-model="inputEligible" v-show="isPostRateFeesEligible" readonly="readonly">
                    <input type="text" class="form-control NotEligibleColor" v-model="inputNotEligible" v-show="isPostRateFeesNotEligible" readonly="readonly">
                </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 mb3">
                    <label><span v-show="isDdlProRateFeesRequired">* </span>Rule to Apply</label>
                    <el-select v-model="ddlPaymentPlanRuleApplyProRateFees" ref="ddlPaymentPlanRuleApplyProRateFees" class="fullwidth" :disabled="disablePaymentPlanRuleProRateFees" @change="onchangePaymentPlanRuleProRateFees()">
                        <el-option
                                v-for="item in paymentPlanRuleApplyProRateFeesList"
                                :key="item.PK_PPR_ID"
                                :label="item.PPR_Name"
                                :value="item.PK_PPR_ID">
                        </el-option>
                    </el-select>
                    <input type="text" class="form-control" v-model="inputPaymentPlanRuleProRateAmount" v-show="isInputPaymentPlanRuleProRateAmount" readonly="readonly">
                </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 mb3">
                    <label>Rule to Apply</label>
                    <el-select v-model="ddlPaymentPlanRuleApplyPostRateFees" class="fullwidth" :disabled="disablePaymentPlanRulePostRateFees">
                        <el-option
                                v-for="item in paymentPlanRuleApplyPostRateFeesList"
                                :key="item.PK_PPR_ID"
                                :label="item.PPR_Name"
                                :value="item.PK_PPR_ID">
                        </el-option>
                    </el-select>
                </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Level Start Date</label>
                    <input type="text" class="form-control" v-model="inputPaymentPlanLevelStartDate" readonly="readonly">
                </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <!--todo: to check what value for level end date-->
                        <label>Level End Date</label>
                        <!--existing ems no assign value for level end date-->
                        <input type="text" class="form-control" v-model="inputPaymentPlanLevelEndDate" readonly="readonly">
                    </div>

                <hr class="custom-hr"/>
                <div class="col-lg-6">
                    <button v-on:click="savePaymentPlanClick()"
                            class="btn btn-primary waves-effect waves-light">Add Payment Plan
                    </button>
                </div>
            </div>
        </b-modal>

        <b-modal id="newApplyDiscountPlanModal" size="lg" title="Add Discount Plan" ok-only ok-variant="secondary" hide-footer ref="newApplyDiscountPlanShowModal">
            <div class="row ml-2 mr-2">

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>
                        <input type="checkbox" class="form-control" v-model="cbSiblingDiscount" :disabled="disabledCbSiblingDiscount" @change="cbSiblingDiscountClick()">
                        Sibling Discount
                        <span>
                            <span>
                                <svg class="checkmark" viewBox="0 0 24 24"><path class="checkmark-path"
                                                                                 fill="none" stroke="white"
                                                                                 d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg>
                            </span>
                        </span>
                    </label>
                    <input type="text" class="form-control EligibleColor" v-model="inputEligible" v-show="isSiblingDiscountEligible" readonly="readonly">
                    <input type="text" class="form-control NotEligibleColor" v-model="inputNotEligible" v-show="isSiblingDiscountNotEligible" readonly="readonly">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div><label>List of Siblings</label></div>
                        <div>
                            <div v-if="siblingList">
                                <label v-for="(item, index) in siblingListInfo">{{index + 1}}. {{item.Full_Name}} {{item.Middle_name}} {{item.Last_name}} ({{item.Status}})</label>
                            </div>
                            <div v-if="!siblingList">
                                No Siblings....
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb3">
                        <label><span v-show="isDdlSiblingDiscRequired">* </span>Rule to Apply</label>
                        <el-select v-model="ddlPaymentPlanRuleApplySiblings" class="fullwidth" :disabled="disablePaymentPlanRuleApplySiblings" @change="onchangePaymentPlanRuleSiblings()">
                            <el-option
                                    v-for="item in paymentPlanRuleApplySiblingsList"
                                    :key="item.PK_PPR_ID"
                                    :label="item.PPR_Name"
                                    :value="item.PK_PPR_ID">
                            </el-option>
                        </el-select>
                        <input type="text" class="form-control" v-model="inputPaymentPlanRuleSiblingsAmount" v-show="isInputPaymentPlanRuleSiblingsAmount" readonly="readonly">
                    </div>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>
                        <input type="checkbox" class="form-control" v-model="cbStaffDiscount" :disabled="disabledCbStaffDiscount" @change="cbStaffDiscountClick()">
                        Staff Discount
                        <span>
                            <span>
                                <svg class="checkmark" viewBox="0 0 24 24"><path class="checkmark-path"
                                                                                 fill="none" stroke="white"
                                                                                 d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg>
                            </span>
                        </span>
                    </label>
                    <input type="text" class="form-control EligibleColor" v-model="inputEligible" v-show="isStaffDiscountEligible" readonly="readonly">
                    <input type="text" class="form-control NotEligibleColor" v-model="inputNotEligible" v-show="isStaffDiscountNotEligible" readonly="readonly">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb3">
                        <label><span v-show="isDdlStaffDiscRequired">* </span>Rule to Apply</label>
                        <el-select v-model="ddlPaymentPlanRuleApplyStaff" class="fullwidth" :disabled="disablePaymentPlanRuleApplyStaff" @change="onchangePaymentPlanRuleStaff()">
                            <el-option
                                    v-for="item in ddlPaymentPlanRuleApplyStaffList"
                                    :key="item.staffContactID"
                                    :label="item.staffName"
                                    :value="item.staffContactID">
                            </el-option>
                        </el-select>
                        <input type="text" class="form-control" v-model="inputPaymentPlanRuleStaffAmount" v-show="isInputPaymentPlanRuleStaffAmount" readonly="readonly">
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb3">
                        <label>Staff Name</label>
                        <input type="text" class="form-control" v-model="inputStaffName" readonly="readonly">
                    </div>
                </div>

                <hr class="custom-hr"/>
                <div class="col-lg-6">
                    <button v-on:click="addDiscountPlanClick()"
                            class="btn btn-primary waves-effect waves-light">Add Discount Plan
                    </button>
                </div>

            </div>
        </b-modal>

        <b-modal id="viewPaymentPlanModal" size="lg" title="View Payment Plan" ok-only ok-variant="secondary" hide-footer ref="viewPaymentPlanShowModal">
            <div class="row ml-2 mr-2">
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Creation Date</label>
                    <input type="text" class="form-control" v-model="inputViewPaymentPlanCreationDate" readonly="readonly">
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Creation By</label>
                    <input type="text" class="form-control" v-model="inputViewPaymentPlanCreationBy" readonly="readonly">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Level</label>
                    <input type="text" class="form-control" v-model="inputViewPaymentPlanLevel" readonly="readonly">
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Fee Scheme Name</label>
                    <input type="text" class="form-control" v-model="inputViewPaymentPlanFeeSchemeName" readonly="readonly">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Validity Starts On</label>
                    <input type="text" class="form-control" v-model="inputViewPaymentPlanValidityStart" readonly="readonly">
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Validity Ends On</label>
                    <input type="text" class="form-control" v-model="inputViewPaymentPlanValidityEnd" readonly="readonly">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Tax Applicable</label>
                    <input type="text" class="form-control" v-model="inputViewPaymentPlanTaxApplicable" readonly="readonly">
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Tax</label>
                    <input type="text" class="form-control" v-model="inputViewPaymentPlanTax" readonly="readonly">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Center</label>
                    <input type="text" class="form-control" v-model="inputViewPaymentPlanCenter" readonly="readonly">
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Currency</label>
                    <input type="text" class="form-control" v-model="inputViewPaymentPlanCurrency" readonly="readonly">
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Status</label>
                    <input type="text" class="form-control" v-model="inputViewPaymentPlanStatus" readonly="readonly">
                </div>
            </div>
            <div class="row">
                <div class= "col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div v-if="itemPaymentPlanDetailsInt.length>0">
                        <data-tables :data="itemPaymentPlanDetailsInt"  >
                            <el-table-column v-for="itemPaymentPlanDetailsListItem in itemPaymentPlanDetailsList" :prop="itemPaymentPlanDetailsListItem.prop"
                                             :label="itemPaymentPlanDetailsListItem.label" :key="itemPaymentPlanDetailsListItem.prop"
                                             sortable="custom">
                            </el-table-column>
                        </data-tables>
                    </div>
                </div>
            </div>
        </b-modal>

        <b-modal id="newAddItemModal" size="lg" title="Add Item" ok-only ok-variant="secondary" hide-footer ref="newAddItemShowModal">
            <div class="row ml-2 mr-2">
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 mb3">
                    <label>* Item</label>
                    <el-select v-model="ddlAddItem" class="fullwidth" @change="onchangeAddItem()">
                        <el-option v-for="item in addItemList" v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}</el-option>
                    </el-select>
                    <div><label></label></div>
                    <input type="text" v-show="isInputAddItemDirect" class="form-control" v-model="inputAddItemDirect">
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>* Payment Date</label>
                    <div class="date">
                        <el-date-picker v-model="inputAddItemPaymentDate" format="dd/MM/yyyy"
                                        value-format="dd/MM/yyyy" type="date"
                                        placeholder="Pick a day" ></el-date-picker>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>* Amount</label>
                    <input type="text" class="form-control" v-model="inputAddItemAmount" @keypress="onlyNumber">
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Currency</label>
                    <el-select v-model="ddlAddItemCurrency" class="fullwidth">
                        <el-option v-for="item in addItemCurrencyList" v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}</el-option>
                    </el-select>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>* Payment Schedule</label>
                    <el-select v-model="ddlAddItemPaymentSchedule" class="fullwidth"  @change="onchangeAddItemPaymentSchedule()">
                        <el-option v-for="item in addItemPaymentScheduleList" v-bind:value=" item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}</el-option>
                    </el-select>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>* Payment Item Type</label>
                    <el-select v-model="ddlAddItemPaymentItemType" class="fullwidth" >
                        <el-option v-for="item in addItemPaymentItemTypeList" v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}</el-option>
                    </el-select>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label><span v-show="isRecurringRequired">* </span>Recurring</label>
                    <el-select v-model="ddlAddItemRecurring" class="fullwidth" :disabled="disabledRecurring">
                        <el-option v-for="item in addItemRecurringList" v-bind:value="item.OPTvalue.trim()">{{ item.OPTvalue.trim() }}</el-option>
                    </el-select>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Description</label>
                    <input type="text" class="form-control" v-model="inputAddItemDescription" :disabled="disableOneTime">
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>From Date</label>
                    <div class="date">
                        <el-date-picker v-model="inputAddItemFromDate" format="dd/MM/yyyy"
                                        value-format="dd/MM/yyyy" type="date"
                                        placeholder="Pick a day" :disabled="disableOneTime"></el-date-picker>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>To Date</label>
                    <div class="date">
                        <el-date-picker v-model="inputAddItemToDate" format="dd/MM/yyyy"
                                        value-format="dd/MM/yyyy" type="date"
                                        placeholder="Pick a day" :disabled="disableOneTime"></el-date-picker>
                    </div>
                </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"></div>
                <hr class="custom-hr"/>
                <div class="col-lg-6">
                    <button v-on:click="closeAddItemModalClick()"
                            class="btn btn-secondary close-modal-btn float-left">Close
                    </button>
                </div>
                <div class="col-lg-6">
                    <button v-on:click="saveItemClick()"
                            class="btn btn-primary waves-effect waves-light float-right">Add
                    </button>
                </div>
            </div>
        </b-modal>

        <b-modal id="creditNoteModal" size="lg" title="Credit Note" ok-only ok-variant="secondary" hide-footer ref="creditNoteModal">
            <div class="row ml-2 mr-2">

                <div><h5>History Detail</h5></div>

                    <div class= "col-lg-12">
                        <div v-if="studentReceiptGenerationByTransactionHistoryListInt.length>0" class="datatable_group">
                            <data-tables :data="studentReceiptGenerationByTransactionHistoryListInt">
                                <el-table-column v-for="item in studentReceiptGenerationByTransactionHistoryList" :prop="item.prop"
                                                 :label="item.label" :key="item.prop">
                                </el-table-column>
                            </data-tables>
                        </div><br>

                        <div v-if="studentReceiptLeftOverPaymentListInt.length>0" class="datatable_group">
                            <data-tables :data="studentReceiptLeftOverPaymentListInt" @selection-change="changeSelection"
                                         ref="ReceiptGenerationByTransactionHistoryTable">
                                <el-table-column type="selection" width="55" :reserve-selection="false">
                                </el-table-column>
                                <el-table-column v-for="item in studentReceiptLeftOverPaymentList" :prop="item.prop"
                                                 :label="item.label" :key="item.prop">
                                </el-table-column>
<!--                                <el-table-column label="Pay Amount" min-width="100px">-->
<!--                                    <template slot-scope="scope">-->
<!--                                        <el-input v-model="scope.row.newPayAmount" type="number" placeholder="Amount"></el-input>-->
<!--                                    </template>-->
<!--                                </el-table-column>-->
                            </data-tables>
                        </div><br>
                    </div>

                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 mb3">
                    <label>Remarks *</label>
                    <b-form-textarea rows="3" class="textArea" v-model="taCnRemarks" placeholder="Please enter comment"
                    :state="taCnRemarks.length >=1"></b-form-textarea>

                </div>
                <div class="col-lg-12">
                    <button v-on:click="generateCNClick()"
                            class="btn btn-primary waves-effect waves-light float-right">Generate CN
                    </button>
                </div>
            </div>
        </b-modal>

        <b-modal id="generateReceiptModal" size="xl" title="Generate Receipt" ok-only ok-variant="secondary" hide-footer ref="generateReceiptModal">
            <div class= "col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="col-lg-12 actionDiv">
                    <el-button-group>
                        <el-button type="primary" variant="primary" v-on:click="addItemClick()">
                            Add Item
                        </el-button>
                    </el-button-group>
                </div>

                <div v-if="studentReceiptGenerationListInt.length>0" class="datatable_group">
                    <data-tables :data="studentReceiptGenerationListInt" @selection-change="changeSelection" :action-col="studentReceiptItemListAction"
                                 ref="receiptGenerationTable">
                        <el-table-column type="selection" width="55" >
                        </el-table-column>
                        <el-table-column v-for="item in studentReceiptGenerationList" :prop="item.prop"
                                         :label="item.label" :key="item.prop">
                        </el-table-column>
                        <el-table-column label="Pay Amount" min-width="100px">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.newPayAmount" type="number" placeholder="Amount"></el-input>
                            </template>
                        </el-table-column>
                    </data-tables>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                    <h5 class="text-left">RECEIPTS</h5>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Payment Mode</label>
                    <select v-model="ddlPaymentMode" v-on:click="validatePaymentMode()"
                            class="form-control pro-edt-select form-control-primary" >
                        <option v-for="item in paymentModeList" v-bind:value="item.OPTvalue.trim()">{{
                            item.OPTvalue.trim() }}
                        </option>
                    </select>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" v-if="this.ddlPaymentMode!='CASH'">
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

                <div class="col-lg-12 actionDiv">
                    <el-button-group>
                        <el-button type="primary" variant="primary" v-on:click="previewReceiptClick()">
                            <b><h5>Preview</h5></b>
                        </el-button>
                    </el-button-group>
                    <el-button-group>
                        <el-button type="primary" variant="primary" v-on:click="generateReceiptClick()">
                           <b><h5>Generate</h5></b>
                        </el-button>
                    </el-button-group>
                </div>
            </div>
        </b-modal>

        <b-modal id="generateInvoiceModal" size="xl" title="Generate Invoice" ok-only ok-variant="secondary" hide-footer ref="generateInvoiceModal">
            <div class= "col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="col-lg-12 actionDiv">
                    <el-button-group>
                        <el-button type="primary" variant="primary" v-on:click="showDiscountPlanClick()">
                            Apply Discount plan
                        </el-button>
                        <el-button type="primary" variant="primary" v-on:click="applyPaymentPlanClick()">
                            Apply Payment Plan
                        </el-button>
                        <el-button type="primary" variant="primary" v-on:click="addItemClick()">
                            Add Item
                        </el-button>
                    </el-button-group>
                </div>
                <div v-if="studentInvoiceGenerationListInt.length>0" class="datatable_group">
                    <data-tables :data="studentInvoiceGenerationListInt" @selection-change="changeSelection" :action-col="studentInvoiceItemListAction"
                                 ref="invoiceGenerationTable">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column v-for="item in studentInvoiceGenerationList" :prop="item.prop"
                                         :label="item.label" :key="item.prop">
                        </el-table-column>
                    </data-tables>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                    <h5 class="text-left">INVOICING</h5>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>* Payment Due Date</label>
                    <div class="date">
                        <el-date-picker v-model="inputPaymentDueDate" format="dd/MM/yyyy"
                                        value-format="dd/MM/yyyy" type="date"
                                        placeholder="Pick a day" ></el-date-picker>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <!--<label>Letterhead (Hong Kong only):</label>-->
                    <label>
                        <input type="checkbox" class="form-control" v-model="cbPrintMonthlyBreakdown">
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
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Remarks</label>
                    <input type="text" class="form-control" v-model="inputRemarks">
                </div>

                <div class="col-lg-12 actionDiv">
                    <el-button-group>
                        <el-button type="primary" variant="primary" v-on:click="previewInvoiceClick()">
                            <b><h5>Preview</h5></b>
                        </el-button>
                    </el-button-group>
                    <el-button-group>
                        <el-button type="primary" variant="primary" v-on:click="generateInvoiceClick('')">
                            <b><h5>Generate</h5></b>
                        </el-button>
                    </el-button-group>
                </div>

            </div>
        </b-modal>

        <b-modal id="showGenerateReceiptByHistoryModal" size="xl" title="Generate Receipt Detail(With Transaction History)" ok-only ok-variant="secondary" hide-footer ref="showGenerateReceiptByHistoryModal">
            <div class= "col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div><h5>Transaction History Detail</h5></div>
                <div v-if="studentReceiptGenerationByTransactionHistoryListInt.length>0" class="datatable_group">
                    <data-tables :data="studentReceiptGenerationByTransactionHistoryListInt"
                    ref="ReceiptGenerationByTransactionHistoryTable">
                        <el-table-column v-for="item in studentReceiptGenerationByTransactionHistoryList" :prop="item.prop"
                                         :label="item.label" :key="item.prop">
                        </el-table-column>
                    </data-tables>
                </div><br>

                <div><h5>Left Over Payment</h5></div>
                <div v-if="studentReceiptLeftOverPaymentListInt.length>0" class="datatable_group">
                    <data-tables :data="studentReceiptLeftOverPaymentListInt" @selection-change="changeSelection"
                    ref="ReceiptLeftOverPaymentTable">
                        <el-table-column type="selection" width="55" :reserve-selection="false">
                        </el-table-column>
                        <el-table-column v-for="item in studentReceiptLeftOverPaymentList" :prop="item.prop"
                                         :label="item.label" :key="item.prop">
                        </el-table-column>
                        <el-table-column label="Pay Amount" min-width="100px">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.newPayAmount" type="number" placeholder="Amount"></el-input>
                            </template>
                        </el-table-column>
                    </data-tables>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                    <h5 class="text-left">RECEIPTS</h5>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Payment Mode *</label>
                    <select v-model="ddlPaymentMode" v-on:click="validatePaymentMode()"
                            class="form-control pro-edt-select form-control-primary" >
                        <option v-for="item in paymentModeList" v-bind:value="item.OPTvalue.trim()">{{
                            item.OPTvalue.trim() }}
                        </option>
                    </select>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" v-if="this.ddlPaymentMode!='CASH'">
                    <label>Cheque/DD No & Bank Name</label>
                    <input type="text" class="form-control" v-model="inputChequeNoBankName">
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Receipt Date *</label>
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

                <div class="col-lg-12 actionDiv">
                    <el-button-group>
                        <el-button type="primary" variant="primary" v-on:click="previewLeftOverReceiptClick()">
                            <b><h5>Preview</h5></b>
                        </el-button>
                    </el-button-group>
                    <el-button-group>
                        <el-button type="primary" variant="primary" v-on:click="generateLeftOverReceiptClick()">
                            <b><h5>Generate</h5></b>
                        </el-button>
                    </el-button-group>
                </div>
            </div>
        </b-modal>

        <b-modal id="showReInvoiceModal" size="lg" title="Re-Invoice" ok-only ok-variant="secondary" ok-title="Cancel" ref="showReInvoiceModal">
            <div class="row">
                <div class= "col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="col-lg-12 actionDiv">
                        <el-button-group>
                            <el-button type="primary" variant="primary" v-on:click="addItemClick()">
                                Add Item
                            </el-button>
                        </el-button-group>
                    </div>

                    <div v-if="ReInvoiceListInt.length>0">
                        <data-tables :data="ReInvoiceListInt" @selection-change="changeSelection">
                            <el-table-column type="selection" width="55" >
                            </el-table-column>
                            <el-table-column v-for="item in ReInvoiceList" :prop="item.prop"
                                             :label="item.label" :key="item.prop"
                                             sortable="custom">
                            </el-table-column>
                            <el-table-column label="Pay Amount(Included GST)" min-width="100px">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.newPayAmount" type="number" placeholder="Amount"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="isReivoiceItem" min-width="80px">
                                <template slot-scope="scope">
                                   <el-input v-model="scope.row.isReinvoiceItem" type="text" disabled></el-input>
                                </template>
                            </el-table-column>

                        </data-tables>
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                            <h5 class="text-left">INVOICING</h5>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>* Payment Due Date</label>
                            <div class="date">
                                <el-date-picker v-model="inputPaymentDueDate" format="dd/MM/yyyy"
                                                value-format="dd/MM/yyyy" type="date"
                                                placeholder="Pick a day" ></el-date-picker>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <!--<label>Letterhead (Hong Kong only):</label>-->
                            <label>
                                <input type="checkbox" class="form-control" v-model="cbPrintMonthlyBreakdown">
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
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Remarks</label>
                            <input type="text" class="form-control" v-model="inputRemarks">
                        </div>

                        <div class="col-lg-12 actionDiv">
                            <el-button-group>
                                <el-button type="primary" variant="primary" v-on:click="previewInvoiceClick('reinvoice')">
                                    <b><h5>Preview</h5></b>
                                </el-button>
                            </el-button-group>
                            <el-button-group>
                                <el-button type="primary" variant="primary" v-on:click="generateInvoiceClick('reinvoice')">
                                    <b><h5>Generate</h5></b>
                                </el-button>
                            </el-button-group>
                        </div>

                    </div>
                </div>
            </div>
        </b-modal>

    </div>
</template>

<script>
    import DataSource from "../data/datasource";

    export default {
        name: "StudentPaymentPlan",

        data() {
            return {
                //For Sibling data-table
                siblingListTableInt: [],
                siblingListTableList: [{
                    prop: "Index_No",
                    label: "Student No"
                }, {
                    prop: "Full_Name",
                    label: "First Name"
                }, {
                    prop: "Last_name",
                    label: "Last Name"
                }, {
                    prop: "Regst_date_convert",
                    label: "Regisration Date"
                }, {
                    prop: "SiblingLevelName",
                    label: "Level"
                }, {
                    prop: "Status",
                    label: "Status"
                }, {
                    prop: "SCH_Name",
                    label: "Center Name"
                }],
                //

                //student info
                test:'',
                ReceiptList:[],

                inputStudentName:'',
                inputCreatedBy:'',
                inputCreationDate:'',
                inputStudentStatus:'',
                inputStudentLevel:'',
                inputIntake:'',
                inputFromDate:'',
                inputToDate:'',
                inputStudentNO:'',
                inputPayeeName:'',
                inputMealPreferences:'',
                sponsor_type:'',
                studentDetail:[],
                //

                //temp
                tempList:'',
                btnDisabled:true,
                courseStatus:false,
                //

                //For Credit Note
                cnInvoiceName:'',
                inputCNRemark:'',
                isChecked:true,
                //

                //For Reinvoice
                customizeReInvoiceResponce:[],
                isSelectable:false,
                reInvoiceName:'',
                Re_InvoiceName:'',
                //

                viewTransactionFlag: '',
                generateReceiptFlag: '',
                generateCNFlag: '',
                reinvoiceFlag: '',

                transactionObj:[],
                //Receipt
                payValue:'',
                inputNewPayAmount:'',
                respTempReceipt:[],
                customizeReceiptResponse:[],

                studentReceiptGenerationListInt:[],
                studentReceiptGenerationList: [{
                    prop: "SPPD_PayerName",
                    label: "Name"
                }, {
                    prop: "paymentDate",
                    label: "Payment Date"
                }, {
                    prop: "SPPD_PaymentAmount",
                    label: "Amount"
                }, {
                    prop: "SPPD_GstValue",
                    label: "GST Value"
                }, {
                    prop: "SPPD_TotalValue",
                    label: "Total Amount"
                }],

                //Invoice
                inputInvoiceDate: '',
                respTempInvoice:[],
                customizeInvoiceResponse:[],
                studentInvoiceGenerationListInt:[],
                studentInvoiceGenerationList: [{
                    prop: "SPPD_PayerName",
                    label: "Name"
                }, {
                    prop: "paymentDate",
                    label: "Payment Date"
                }, {
                    prop: "SPPD_PaymentAmount",
                    label: "Amount"
                }, {
                    prop: "SPPD_GstValue",
                    label: "GST Value"
                }, {
                    prop: "SPPD_TotalValue",
                    label: "Total Amount"
                }],
                //Invoice End

                studentReceiptLeftOverPaymentListInt:[],
                studentReceiptLeftOverPaymentList:[{
                    prop: "Item_Description",
                    label: "Item Description"
                }, {
                    prop: "GST_Applicable",
                    label: "GST Applicable"
                }, {
                    prop: "gstValue",
                    label: "GST Value"
                }, {
                    prop: "itemAmount",
                    label: "Amount"
                }, {
                    prop: "totalValue",
                    label: "Total Amount"
                }],

                studentReceiptGenerationByTransactionHistoryListInt:[],
                studentReceiptGenerationByTransactionHistoryList: [{
                    prop: "DocumentStatus",
                    label: "Document Status"
                }, {
                    prop: "DocumentType",
                    label: "Document Type"
                }, {
                    prop: "DocumentDate",
                    label: "Document Date"
                }, {
                    prop: "TotalIncGst",
                    label: "Total(IncludedGst)"
                }],
                //End:Receipt

                PaymentListInt: [],
                PaymentList: [{
                    prop: "IH_Invoice_Name",
                    label: "Invoice Name"
                }, {
                    prop: "invoiceDate",
                    label: "Invoice Date"
                }, {
                    prop: "invoiceAmount",
                    label: "Invoice Amount"
                }, {
                    prop: "invoiceRemarks",
                    label: "Remarks"
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

                itemPaymentPlanDetailsInt: [],
                itemPaymentPlanDetailsList: [{
                    prop: "PPD_PaymentSchedule",
                    label: "Payment Schedule"
                },{
                    prop: "Timeline",
                    label: "Timeline"
                },{
                    prop: "PPD_PaymentItemType",
                    label: "Item Type"
                },{
                    prop: "PPD_Payee_Name",
                    label: "Item Name"
                },{
                    prop: "PPD_Amount",
                    label: "Amount"
                },{
                    prop: "PPD_CalCategory",
                    label: "Calculation category"
                }],

                invoiceDetailsListInt: [],
                invoiceDetailsList: [{
                    prop: "ID_Item_Description",
                    label: "Item Desciption"
                },{
                    prop: "ID_Item_Amount",
                    label: "Amount"

                }],

                ReInvoiceListInt:[],
                ReInvoiceList:[{
                    prop: "SPPD_PayerName",
                    label: "Name"
                }, {
                    prop: "paymentDate",
                    label: "Payment Date"
                }, {
                    prop: "SPPD_PaymentAmount",
                    label: "Amount"
                }, {
                    prop: "SPPD_GstValue",
                    label: "GST Value"
                }, {
                    prop: "SPPD_TotalValue",
                    label: "Total Amount"
                }],

                inputPaymentDueDate: '',
                inputReceiptDate: '',
                inputChequeNoBankName:'',
                inputRemarks:'',
                ddlPaymentMode:'',
                viewSPPDPayerName:'',
                ddlAddItem:'',
                inputAddItemPaymentDate:'',
                ddlAddItemCurrency:'',
                inputAddItemAmount:'',
                ddlAddItemPaymentSchedule:'',
                ddlAddItemPaymentItemType:'',
                inputAddItemDescription:'',
                inputAddItemFromDate:'',
                inputAddItemToDate:'',
                ddlAddItemRecurring:'',
                inputAddItemDirect:'',
                disabledRecurring: true,
                isRecurringRequired: false,
                isInputAddItemDirect: false,
                disableOneTime: true,
                ddlPaymentPlan: '',
                inputStaffDiscount:'',
                inputPaymentPlanStartDate:'',
                inputStaffName:'',
                ddlPaymentPlanRuleApplyProRateFees:'',
                ddlPaymentPlanRuleApplySiblings:'',
                ddlPaymentPlanRuleApplyPostRateFees:'',
                ddlPaymentPlanRuleApplyStaff: '',
                cbProRateFees:'',
                cbPostRateFees:'',
                cbSiblingDiscount:'',
                cbStaffDiscount:'',
                disabledCbProRateFees: true,
                disabledCbPostRateFees: true,
                disabledCbSiblingDiscount: true,
                disabledCbStaffDiscount: true,
                disablePaymentPlanRuleProRateFees: true,
                disablePaymentPlanRulePostRateFees: true,
                disablePaymentPlanRuleApplySiblings: true,
                disablePaymentPlanRuleApplyStaff: true,
                inputEligible: 'Eligible',
                inputNotEligible: 'Not Eligible',
                isProRateFeesEligible: false,
                isProRateFeesNotEligible: false,
                isPostRateFeesEligible: false,
                isPostRateFeesNotEligible: false,
                isSiblingDiscountEligible: false,
                isSiblingDiscountNotEligible: false,
                isStaffDiscountEligible: false,
                isStaffDiscountNotEligible: false,
                isDdlProRateFeesRequired: false,
                isDdlStaffDiscRequired: false,
                isDdlSiblingDiscRequired: false,

                inputPaymentPlanLevelStartDate:'',

                inputPaymentPlanRuleProRateAmount:'',
                isInputPaymentPlanRuleProRateAmount: false,
                inputPaymentPlanLevelEndDate:'',

                siblingList:'',
                inputPaymentPlanRuleSiblingsAmount:'',
                isInputPaymentPlanRuleSiblingsAmount: false,
                inputViewPaymentPlanCreationDate:'',
                inputViewPaymentPlanCreationBy:'',
                inputViewPaymentPlanLevel:'',
                inputViewPaymentPlanFeeSchemeName:'',
                inputViewPaymentPlanValidityStart:'',
                inputViewPaymentPlanValidityEnd:'',
                inputViewPaymentPlanTaxApplicable:'',
                inputViewPaymentPlanTax:'',
                inputViewPaymentPlanCenter:'',
                inputViewPaymentPlanCurrency:'',
                inputViewPaymentPlanStatus:'',

                inputPaymentPlanRuleStaffAmount: '',
                isInputPaymentPlanRuleStaffAmount: false,

                //test start --to remove
                inputSchoolName: '',
                schoolAddress1: '',
                //test end --to remove

                siblingListInfo:[],
                paymentModeList:[],
                spdSelection:[],
                addItemList:[],
                addItemCurrencyList: [],
                addItemPaymentScheduleList:[],
                addItemPaymentItemTypeList: [],
                addItemRecurringList:[],
                paymentPlanList:[],
                paymentPlanRuleApplyProRateFeesList:[],
                paymentPlanRuleApplySiblingsList:[],
                paymentPlanRuleApplyPostRateFeesList: [],
                ddlPaymentPlanRuleApplyStaffList: [],

                //start CN
                allowCN: '',
                inputCnInvoiceName: '',
                inputCnInvoiceDate: '',
                inputCnPaymentDueDate: '',
                inputCnInvoiceStatus: '',
                inputCnStudentNo: '',
                inputCnStudentName: '',
                taCnRemarks: '',
                //end CN

                cbPrintMonthlyBreakdown: '',

                PaymentListAction: {
                    label: 'Delete',
                    props: {
                        align: 'center',
                    },
                    buttons: [{

                        props: {
                            type: 'primary',
                            icon: 'el-icon-delete'

                        },

                        handler: row => {
                            this.status =  row.SPPD_Status;

                            if(this.status == 'Active'){
                                this.deleteSPDID =  row.PK_SPD_ID;
                                this.paymentPlanDetailID = row.SPPD_FK_Payment_Plan_Detail_ID;
                                this.studentCourseID = row.SPPD_FK_Student_Course_ID;

                                this.deletePaymentItem();
                            }
                            else{
                                this.$notify.error({
                                    title: 'Message',
                                    message: 'Payment item cannot be deleted'
                                });
                            }
                        },
                        label: 'Delete'
                    }]
                },

                studentInvoiceItemListAction:{
                    label: 'Delete',
                    props: {
                        align: 'center',
                    },
                    buttons: [{
                        props: {
                            type: 'primary',
                            icon: 'el-icon-delete'

                        },

                        handler: row => {
                            this.status =  row.SPPD_Status;

                            if(this.status == 'Active'){
                                this.deleteSPDID =  row.PK_SPD_ID;
                                this.paymentPlanDetailID = row.SPPD_FK_Payment_Plan_Detail_ID;
                                this.studentCourseID = row.SPPD_FK_Student_Course_ID;

                                this.deletePaymentItem();
                            }
                            else{
                                this.$notify.error({
                                    title: 'Message',
                                    message: 'Payment item cannot be deleted'
                                });
                            }
                        },
                        label: 'Delete'
                    }]
                },

                studentReceiptItemListAction: {
                    label: 'Delete',
                    props: {
                        align: 'center',
                    },
                    buttons: [{
                        props: {
                            type: 'primary',
                            icon: 'el-icon-delete'

                        },

                        handler: row => {
                            this.status =  row.SPPD_Status;

                            if(this.status == 'Active'){
                                this.deleteSPDID =  row.PK_SPD_ID;
                                this.paymentPlanDetailID = row.SPPD_FK_Payment_Plan_Detail_ID;
                                this.studentCourseID = row.SPPD_FK_Student_Course_ID;

                                this.deletePaymentItem();
                            }
                            else{
                                this.$notify.error({
                                    title: 'Message',
                                    message: 'Payment item cannot be deleted'
                                });
                            }
                        },
                        label: 'Delete'
                    }]
                },

                PaymentListFilters: [
                    {
                        value: '',
                        prop: 'SPPD_PayerName',
                    },{
                        value: '',
                        prop: 'SPPD_Status',
                    },{
                        value: '',
                        prop: 'SPPD_PaymentDates',
                    },{
                        value: '',
                        prop: 'SPPD_PaymentAmount',
                    },{
                        value: '',
                        prop: 'totalIncludeGst',
                    },{
                        value: '',
                        prop: 'RecTotal',
                    },{
                        value: [],
                        prop: ['SPPD_PayerName', 'SPPD_Status','SPPD_PaymentDates','SPPD_PaymentAmount','totalIncludeGst','RecTotal']
                    }],
                filters: [{
                        value: '',
                        prop: 'SPPD_PayerName',
                    },{
                        value: '',
                        prop: 'SPPD_Status',
                    },{
                        value: '',
                        prop: 'SPPD_PaymentDates',
                    },{
                        value: '',
                        prop: 'SPPD_PaymentAmount',
                    },{
                        value: '',
                        prop: 'totalIncludeGst',
                    },{
                        value: '',
                        prop: 'RecTotal',
                    },
                ],

            };
        },

        async created() {
            await this.BindStudentInfo();
            await this.BindStudentSibling();
            await this.getPaymentList();
            await this.BindPaymentModeDropdown();
            await this.BindPaymentTermPrintBreakdown();

            this.inputReceiptDate = new Date().getDate()+ '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();
            this.inputAddItemPaymentDate = new Date().getDate()+ '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();

            await this.BindAddItemDropdown();
            await this.BindApplyPaymentPlanDropdown();
            await this.BindCheckboxEligibility();
            await this.getApplyPaymentPlanStartDate();

        },

        async mounted() {
            //For receipt
        },

        methods: {

            async changeSelection(val) {
                this.spdSelection = val;
            },

            canSelectRow(row, index){
                if(row.isReinvoiceItem==='Yes'){
                    console.log(row.isReinvoiceItem,'Yes', index);
                    this.isSelectable = false;
                }else if(row.isReinvoiceItem==='No'){
                    console.log(row.isReinvoiceItem,'No', index);
                    this.isSelectable = true;
                }
                return this.isSelectable;
            },

            async BindStudentInfo(){
                try{
                    const resp = await DataSource.shared.getStudent(this.$route.query.sid, '', '', '', '');

                    this.studentDetail = resp.Table;
                    this.studentDetail.forEach(m=>{
                        this.inputStudentName=m.Full_Name;
                        this.inputStudentNO =m.Index_No;
                        this.inputStudentStatus=m.Status;
                        this.sponsor_type= m.sponsor_type;
                        this.inputCreationDate=m.Created_On_convert;
                        if(m.St_Meal_Preferences)
                        {this.inputMealPreferences= m.St_Meal_Preferences;}
                        else
                        {this.inputMealPreferences='N/A'}
                    })

                    const PayeeResp = await DataSource.shared.getPayee(this.inputStudentNO);
                    this.inputPayeeName = PayeeResp.PAR_Father_FirstName+' '+PayeeResp.PAR_Father_MiddleName+' '+PayeeResp.PAR_Father_LastName;

                }
                catch (e) {
                    this.results = e;
                }
            },

            clearSelect (){
                this.$refs.receiptGenerationTable.clearSelection();
                this.$refs.invoiceGenerationTable.clearSelection();
                this.$refs.ReceiptGenerationByTransactionHistoryTable.clearSelection();
                this.$refs.ReceiptLeftOverPaymentTable.clearSelection();
                this.inputRemarks='';
                this.ddlPaymentMode='';
                this.inputReceiptDate=new Date().getDate()+ '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();
                this.this.inputChequeNoBankName='';
                //clear generate invoice
                this.reInvoiceName='';
                this.inputInvoiceDate = new Date().getDate()+ '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();
                this.Re_InvoiceName='';
            },

            async BindPaymentModeDropdown(){
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

            async BindPaymentTermPrintBreakdown()
            {
                try {
                    const response = await DataSource.shared.getPaymentPlanLevelStartDate(this.studentCourseID);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        }
                        else {
                            var SCH_TermsOfPayment = 0;
                            var SCH_ToPrintSpecial = '';
                            this.paymentDueDateResponse = response.Table;
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

            async BindAddItemDropdown(){
                try {
                    let jsonString = '"Payment Item Names":"Payment Item Names"';
                    jsonString = jsonString + ',"Currency List":"Currency List"';
                    jsonString = jsonString + ',"Payment Schedule":"Payment Schedule"';
                    jsonString = jsonString + ',"Payment Item Type":"Payment Item Type"';
                    jsonString = jsonString + ',"Recurring":"Recurring"';

                    jsonString = "{" + jsonString + "}";

                    const response = await DataSource.shared.getStudentDropDownList(jsonString);

                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        }
                        else {

                            this.addItemListResponse = response.Table;
                            this.addItemListResponse.forEach(m => {
                                if (m.OGPname.trim() === 'Payment Item Names') {
                                    this.addItemList.push(m);
                                }
                                else if (m.OGPname.trim() === 'Currency List') {
                                    this.addItemCurrencyList.push(m);
                                }
                                else if (m.OGPname.trim() === 'Payment Schedule') {
                                    this.addItemPaymentScheduleList.push(m);
                                }
                                else if (m.OGPname.trim() === 'Payment Item Type'){
                                    this.addItemPaymentItemTypeList.push(m);
                                }
                                else if(m.OGPname.trim() === 'Recurring'){
                                    this.addItemRecurringList.push(m);
                                }
                            });

                            const currencyResponse = await DataSource.shared.getCurrencyValueDropdownlist();
                            currencyResponse.Table.forEach(m => {
                                this.ddlAddItemCurrency = m.CFGvalue;
                            });
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },

            async BindApplyPaymentPlanDropdown() {
                try {
                    const paymentPlanResponse = await DataSource.shared.getPaymentPlanMasterList(this.studentCourseID);
                    if (paymentPlanResponse) {
                        if (paymentPlanResponse.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.paymentPlanListResponse = paymentPlanResponse.Table;
                            this.paymentPlanListResponse.forEach(m => {
                                this.paymentPlanList.push(m);
                            });
                        }
                    }

                    let jsonString = '"Pro-Rate Discount":"Pro-Rate Discount"';
                    jsonString = jsonString + ',"Sibling Discount":"Sibling Discount"';
                    jsonString = jsonString + ',"Post-Rated Discounts":"Post-Rated Discounts"';
                    jsonString = "{" + jsonString + "}";

                    const ruleResponse = await DataSource.shared.getPaymentPlanRules(this.studentCourseID, jsonString);
                    if (ruleResponse) {
                        this.paymentPlanRuleResponse = ruleResponse.Table;
                        this.paymentPlanRuleResponse.forEach(m => {
                            if (m.PPR_Category.trim() === 'Pro-Rate Discount') {
                                this.paymentPlanRuleApplyProRateFeesList.push(m);
                            } else if (m.PPR_Category.trim() === 'Sibling Discount') {
                                this.paymentPlanRuleApplySiblingsList.push(m);
                            } else if (m.PPR_Category.trim() === 'Post-Rated Discounts') {
                                this.paymentPlanRuleApplyPostRateFeesList.push(m);
                            }
                        });
                    }

                    const staffRuleResponse = await DataSource.shared.getPaymentPlanStaffRules(this.studentID);
                    if (staffRuleResponse) {
                        this.ddlPaymentPlanRuleApplyStaffList = staffRuleResponse.Table;
                    }


                } catch (e) {
                    this.results = e;
                }
            },

            async BindCheckboxEligibility(){
                try {
                    const proRateFeeEligibleResponse = await DataSource.shared.checkRateFeeEligible(this.studentID, this.studentCourseID, 'pro');
                    if (proRateFeeEligibleResponse) {
                        if (proRateFeeEligibleResponse.code === '88') {
                            window.location.replace('/');
                        } else if (proRateFeeEligibleResponse.code === '1') {
                            this.disabledCbProRateFees = false;
                            this.isProRateFeesEligible = true;
                            this.isProRateFeesNotEligible = false;

                            const levelResponse = await DataSource.shared.getPaymentPlanLevelStartDate(this.studentCourseID)

                            if (levelResponse) {
                                this.paymentPlanLevelResponse = levelResponse.Table;
                                this.paymentPlanLevelResponse.forEach(m => {
                                    this.inputPaymentPlanLevelStartDate = m.SCRS_From_Date_convert + ' (Week ' + m.noOfWeek + ')';
                                });
                            }
                        } else if (proRateFeeEligibleResponse.code === '2') {
                            this.disabledCbProRateFees = true;
                            this.isProRateFeesEligible = false;
                            this.isProRateFeesNotEligible = true;
                            this.inputPaymentPlanLevelStartDate = '';
                        }
                    }

                    const postRateFeeEligibleResponse = await DataSource.shared.checkRateFeeEligible(this.studentID, this.studentCourseID, 'post');
                    if (postRateFeeEligibleResponse) {
                        if (postRateFeeEligibleResponse.code === '88') {
                            window.location.replace('/');
                        }
                        else if (postRateFeeEligibleResponse.code === '1') {
                            this.disabledCbPostRateFees = false;
                            this.isPostRateFeesEligible = true;
                            this.isPostRateFeesNotEligible = false;
                        } else if (postRateFeeEligibleResponse.code === '2') {
                            this.disabledCbPostRateFees = true;
                            this.isPostRateFeesEligible = false;
                            this.isPostRateFeesNotEligible = true;
                        }
                    }

                    const siblingDiscEligibleResponse = await DataSource.shared.checkSiblingDiscountEligible(this.studentID);
                    if(siblingDiscEligibleResponse){
                        if (siblingDiscEligibleResponse.code === '88') {
                            window.location.replace('/');
                        }
                        else if (siblingDiscEligibleResponse.code === '1') {
                            this.disabledCbSiblingDiscount = false;
                            this.isSiblingDiscountEligible = true;
                            this.isSiblingDiscountNotEligible = false;

                            const siblingListResponse = await DataSource.shared.getSiblingList(this.studentID);
                            if(siblingListResponse.Table.length > 0)
                            {
                                this.siblingListInfo = siblingListResponse.Table;
                                this.siblingList = true;
                            }
                        } else if (siblingDiscEligibleResponse.code === '2') {
                            this.disabledCbSiblingDiscount = true;
                            this.isSiblingDiscountEligible = false;
                            this.isSiblingDiscountNotEligible = true;
                        }
                    }

                    const staffDiscEligibleResponse = await DataSource.shared.checkStaffDiscountEligible(this.studentID);
                    if(staffDiscEligibleResponse){
                        if (staffDiscEligibleResponse.code === '88') {
                            window.location.replace('/');
                        }
                        else if (staffDiscEligibleResponse.code === '1') {
                            this.disabledCbStaffDiscount = false;
                            this.isStaffDiscountEligible = true;
                            this.isStaffDiscountNotEligible = false;
                        } else if (staffDiscEligibleResponse.code === '2') {
                            this.disabledCbStaffDiscount = true;
                            this.isStaffDiscountEligible = false;
                            this.isStaffDiscountNotEligible = true;
                        }
                    }
                } catch(e) {
                    this.results = e;
                }
            },

            async cbProRateFeesClick(){
                if(this.cbProRateFees == true){
                    this.disablePaymentPlanRuleProRateFees = false;
                    this.isDdlProRateFeesRequired = true;
                }
                else {
                    this.disablePaymentPlanRuleProRateFees = true;
                    this.isDdlProRateFeesRequired = false;
                    this.isInputPaymentPlanRuleProRateAmount = false;
                    this.inputPaymentPlanRuleProRateAmount = '';
                    this.ddlPaymentPlanRuleApplyProRateFees = '';
                }
            },

            async cbPostRateFeesClick(){
                if(this.cbPostRateFees == true){
                    this.disablePaymentPlanRulePostRateFees = false;
                }
                else {
                    this.disablePaymentPlanRulePostRateFees = true;
                    this.ddlPaymentPlanRuleApplyPostRateFees = '';
                }
            },

            async cbSiblingDiscountClick(){
                if(this.cbSiblingDiscount == true){
                    this.disablePaymentPlanRuleApplySiblings = false;
                    this.isDdlSiblingDiscRequired = true;
                }
                else {
                    this.disablePaymentPlanRuleApplySiblings = true;
                    this.isDdlSiblingDiscRequired = false;
                    this.isInputPaymentPlanRuleSiblingsAmount = false;
                    this.inputPaymentPlanRuleSiblingsAmount = '';
                    this.ddlPaymentPlanRuleApplySiblings = '';
                }
            },

            async cbStaffDiscountClick(){
                if(this.cbStaffDiscount == true)
                {
                    this.disablePaymentPlanRuleApplyStaff = false;
                    this.isDdlStaffDiscRequired = true;
                }
                else {
                    this.disablePaymentPlanRuleApplyStaff = true;
                    this.isDdlStaffDiscRequired = false;
                    this.isInputPaymentPlanRuleStaffAmount = false;
                    this.ddlPaymentPlanRuleApplyStaff = '';
                    this.inputStaffName = '';
                }
            },

            async BindStudentSibling() {
                try {
                    const response = await DataSource.shared.getSibling('', this.$route.query.sid);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            if (response.Table.length > 0) {
                                this.siblingListTableInt = response.Table;
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },

            async onchangePaymentPlanRuleProRateFees(){
                const response = await DataSource.shared.getPaymentPlanRuleDetails(this.ddlPaymentPlanRuleApplyProRateFees);
                if (response) {
                    if (response.code === '88') {
                        window.location.replace('/');
                    } else if (response.code === '99' || response.code === '2') {
                        this.isInputPaymentPlanRuleProRateAmount = false;
                        this.inputPaymentPlanRuleProRateAmount = '';
                    }else{
                        this.isInputPaymentPlanRuleProRateAmount = true;
                        this.paymentPlanRateResponse = response.Table;
                        this.paymentPlanRateResponse.forEach(m => {
                            if(m.PPR_Unit == 'Amount'){
                                this.inputPaymentPlanRuleProRateAmount = '($ ' + m.PPR_Value + ' - ' + m.SCH_Currency + ')';
                            }
                            else if(m.PPR_Unit == 'Percentage'){
                                this.inputPaymentPlanRuleProRateAmount = '(% ' + m.PPR_Value + ' - ' + m.SCH_Currency + ')';
                            }
                        });
                    }
                }
            },

            async onchangePaymentPlanRuleSiblings(){
                const response = await DataSource.shared.getPaymentPlanRuleDetails(this.ddlPaymentPlanRuleApplySiblings);
                if (response) {
                    if (response.code === '88') {
                        window.location.replace('/');
                    } else if (response.code === '99' || response.code === '2') {
                        this.isInputPaymentPlanRuleSiblingsAmount = false;
                        this.inputPaymentPlanRuleSiblingsAmount = '';
                    }else{
                        this.isInputPaymentPlanRuleSiblingsAmount = true;
                        this.paymentPlanRateResponse = response.Table;
                        this.paymentPlanRateResponse.forEach(m => {
                            if(m.PPR_Unit == 'Amount'){
                                this.inputPaymentPlanRuleSiblingsAmount = '($ ' + m.PPR_Value + ' - ' + m.SCH_Currency + ')';
                            }
                            else if(m.PPR_Unit == 'Percentage'){
                                this.inputPaymentPlanRuleSiblingsAmount = '(% ' + m.PPR_Value + ' - ' + m.SCH_Currency + ')';
                            }
                        });
                    }
                }
            },

            async onchangePaymentPlanRuleStaff(){
                const curRes = await DataSource.shared.getPaymentPlanLevelStartDate(this.studentCourseID);
                curRes.Table.forEach(e => {
                    this.currency = e.SCH_Currency;
                });

                const response = await DataSource.shared.getUserDetails(this.ddlPaymentPlanRuleApplyStaff);
                if (response) {
                    if (response.code === '88') {
                        window.location.replace('/');
                    } else if (response.code === '99') {
                        this.isInputPaymentPlanRuleStaffAmount = false;
                        this.inputPaymentPlanRuleStaffAmount = '';
                    }else{
                        this.isInputPaymentPlanRuleStaffAmount = true;
                        this.paymentPlanStaffRateResponse = response.Table;
                        this.paymentPlanStaffRateResponse.forEach(m => {
                            if(m.CONPerSalesCommisionUnit.toUpperCase() == 'AMOUNT'){
                                this.inputPaymentPlanRuleStaffAmount = '($ ' + m.CONPerSalesCommision + ' - ' + this.currency + ')';
                            }
                            else{
                                this.inputPaymentPlanRuleStaffAmount = '(% ' + m.CONPerSalesCommision + ' - ' + this.currency + ')';
                            }
                        });
                    }
                }

                const staffNameFilter = this.ddlPaymentPlanRuleApplyStaffList.filter(d => {
                    return d.staffContactID === this.ddlPaymentPlanRuleApplyStaff;
                });
                this.inputStaffName = staffNameFilter[0].staffName;
            },

            async getApplyPaymentPlanStartDate(){
                const response = await DataSource.shared.getStudentCourseSemesterInfo('',this.studentCourseID);

                if (response) {
                    if (response.code === '88') {
                        window.location.replace('/');
                    } else if (response.code === '99') {
                        this.inputPaymentPlanStartDate = '';
                    }else{

                        this.paymentPlanStartDateResponse = response.Table;
                        this.paymentPlanStartDateResponse.forEach(m => {
                            this.inputPaymentPlanStartDate = m.SCRS_From_Date_convert;
                        });
                    }
                }
            },

            async getPaymentList(){
                this.$vs.loading();
                try {
                        this.studentCourseID = this.$route.query.scid;
                        this.studentID = this.$route.query.sid;
                        this.courseStatus = this.$route.query.crsStatus;
                        //todo: To disabled the generate invoice and receipt button if course status = 'closed'
                        if(this.$route.query.crsStatus ==='Closed')
                        {
                            this.btnDisabled=true;
                        }
                        else
                        {
                            this.btnDisabled=false;
                        }

                    const response = await DataSource.shared.getPaymentList(this.studentCourseID, this.studentID);
                    if (response) {
                        switch (response.code) {
                            case "2":
                                this.btnDisabled = true;
                                this.$notify.error({
                                    title: 'No Record Found',
                                    message: 'No Student Payment Record'
                                });
                                break;
                            case "88":
                                this.btnDisabled = true;
                                this.$router.push('/');
                                break;
                            case "99":
                                this.btnDisabled = true;
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Error'
                                });
                                break;

                            default:
                                // this.PaymentListInt = response.Table;
                                // let recList = [];
                                // response.Table.forEach(m => {
                                //     recList.push(m.recNameList.split(','));
                                // });
                                // //todo:To split out the receipt for display purpose
                                // this.ReceiptList = recList;

                                let pList = [];
                                response.Table.forEach(m => {
                                    if(!m.IH_Invoice_Name){
                                        m.IH_Invoice_Name='-';
                                    }
                                    if(!m.invoiceDate){
                                        m.invoiceDate='-';
                                    }
                                    if(!m.invoiceAmount){
                                        m.invoiceAmount='-';
                                    }else{
                                        m.invoiceAmount='$'+ m.invoiceAmount;
                                    }
                                    if(!m.invoiceRemarks){
                                        m.invoiceRemarks='';
                                    }
                                    pList.push(m);
                                });

                                this.PaymentListInt = response.Table;
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
                    handler: _ =>{
                        this.viewSPDID =  row.PK_SPD_ID;
                        this.viewSPPDPayerName =  row.SPPD_PayerName;
                        this.getItemTransDetailsList();
                    }
                }];
            },

            async getItemTransDetailsList(value){
                this.$vs.loading();

                this.transactionObj = value;

                try {
                    const response = await DataSource.shared.getItemTransDetailsList(this.transactionObj.PK_SPD_ID);

                    if (response) {
                        switch (response.code) {
                            case "2":
                                this.$notify.error({
                                    title: 'No Record Found',
                                    message: 'No invoice generated'
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
                                //TODO: check if allow CN, if yes then enable CN button
                                this.itemTransDetailsInt.forEach(m => {
                                    if (m.cnFlag == '0') {
                                        this.allowCN = false;
                                    }
                                    else
                                    {
                                        this.allowCN = true;
                                    }
                                });
                                this.$refs.viewTransactionShowModal.show();

                        }
                    }


                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },

            async deletePaymentItem(){
               this.$vs.loading();
                try {
                    const response = await DataSource.shared.deletePaymentItem(this.deleteSPDID, this.paymentPlanDetailID, this.studentCourseID);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99' || response.code === '2') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Delete Payment Item Error!'
                            });
                        } else {
                            //For main screen- refresh list
                            const responsePaymentList = await DataSource.shared.getPaymentList(this.studentCourseID, this.studentID);
                            this.PaymentListInt = responsePaymentList.Table;

                            //For receipt b-modal - refresh list
                            await this.getStudentReceiptGenerationList();

                            //For invoice b-modal - refresh list
                            await this.getStudentInvoiceGenerationList();

                            this.clearSelect();

                            this.$notify({
                                title: 'Success',
                                message: 'Successfully Deleted!',
                                type: 'success'
                            });
                        }
                    }
                }catch (e) {
                    this.results = e;
                }
               this.$vs.loading.close();
            },

            addItemClick(){
                this.$refs.newAddItemShowModal.show();
            },

            closeAddItemModalClick() {
                this.$refs.newAddItemShowModal.hide();
            },

            onlyNumber($event) {
                let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
                if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
                    $event.preventDefault();
                }
            },

            async onchangeAddItemPaymentSchedule(){
                if(this.ddlAddItemPaymentSchedule === 'Recurring'){
                    this.disabledRecurring = false;
                    this.isRecurringRequired = true;
                    this.disableOneTime = true;

                }
                else{
                    this.disabledRecurring = true;
                    this.isRecurringRequired = false;
                    this.disableOneTime = false;
                }
            },

            async onchangeAddItem(){
              if(this.ddlAddItem === 'Others'){
                  this.isInputAddItemDirect = true;
              }
              else{
                  this.isInputAddItemDirect = false;
              }
            },

            async saveItemClick(){
                try {
                    let btnAddItemObject = [];
                    btnAddItemObject.SPPD_FK_Student_Course_ID = this.studentCourseID;

                    if(this.ddlAddItem === 'Others')
                    {
                        btnAddItemObject.SPPD_PayerName = this.inputAddItemDirect;
                    }
                    else
                    {
                        btnAddItemObject.SPPD_PayerName = this.ddlAddItem;
                    }
                    btnAddItemObject.SPPD_PaymentSchedule = this.ddlAddItemPaymentSchedule;
                    btnAddItemObject.SPPD_PaymentItemType = this.ddlAddItemPaymentItemType;
                    btnAddItemObject.SPPD_Currency = this.ddlAddItemCurrency;
                    btnAddItemObject.SPPD_PaymentAmount = this.inputAddItemAmount;
                    btnAddItemObject.SPPD_PaymentDate = this.inputAddItemPaymentDate;
                    btnAddItemObject.noOfRecurring = this.ddlAddItemRecurring;
                    btnAddItemObject.itemDescription = this.inputAddItemDescription;
                    btnAddItemObject.itemFromDate = this.inputAddItemFromDate;
                    btnAddItemObject.itemToDate = this.inputAddItemToDate;

                    if (this.ddlAddItem === '' || this.inputAddItemAmount === '' || this.inputAddItemPaymentDate === '' || this.ddlAddItemPaymentSchedule === '' ||
                        this.ddlAddItemPaymentItemType === '' || (this.ddlAddItemPaymentSchedule === 'Recurring' && this.ddlAddItemRecurring === '') ||
                        (this.ddlAddItem === 'Others' && this.inputAddItemDirect === '')) {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please fill in all * fields'
                        });
                    } else {
                        const response = await DataSource.shared.saveItem(btnAddItemObject);
                        if (response) {
                            if (response.code === '88') {
                                window.location.replace('/');
                            } else if (response.code === '99' || response.code === '2') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Save Item Error!'
                                });
                            } else {
                                //main screen
                                await this.getPaymentList();

                                //To refresh receipt preview and generate b-modal
                                await this.getStudentReceiptGenerationList();

                                //To refresh invoice preview and generate b-modal
                                await this.getStudentInvoiceGenerationList();

                                //To refresh reinvoice b-modal
                                if(this.Re_InvoiceName){
                                    await this.getReInvoice(this.Re_InvoiceName);
                                }

                                this.$notify({
                                    title: 'Success',
                                    message: 'Successfully Added!',
                                    type: 'success'
                                });
                                this.$refs.newAddItemShowModal.hide();
                                this.clearAddItemField();
                                this.clearSelect();
                            }
                        }
                    }
                }
                catch(e) {
                this.results = e;
                 }
            },

            async clearAddItemField(){
                this.ddlAddItem = '';
                this.isInputAddItemDirect = false;
                this.disabledRecurring = true;
                this.isRecurringRequired = false;
                this.disableOneTime = true;
                const currencyResponse = await DataSource.shared.getCurrencyValueDropdownlist();
                currencyResponse.Table.forEach(m => {
                    this.ddlAddItemCurrency = m.CFGvalue;
                });

                this.inputAddItemPaymentDate = new Date().getDate()+ '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();

                this.inputAddItemDirect = '';
                this.inputAddItemAmount = '';
                this.ddlAddItemPaymentSchedule = '';
                this.ddlAddItemRecurring = '';
                this.inputAddItemFromDate = '';
                this.ddlAddItemPaymentItemType = '';
                this.inputAddItemDescription = '';
                this.inputAddItemToDate = '';
            },

            applyPaymentPlanClick(){
                this.$refs.newApplyPaymentPlanShowModal.show();
            },

            showDiscountPlanClick(){
                this.$refs.newApplyDiscountPlanShowModal.show();
            },

            async viewPaymentPlan(){
                if(this.ddlPaymentPlan != ''){

                    const response = await DataSource.shared.getPaymentPlanMasterDetails(this.ddlPaymentPlan);
                    const paymentPlanDetailsRes = await DataSource.shared.getPaymentPlanMasterDetailsList(this.ddlPaymentPlan);

                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99' || response.code === '2') {
                            this.$notify({
                                title: 'Error',
                                message: 'No record',
                                type: 'error'
                            });
                        }
                        else{
                            this.paymentPlanDetailsResponse = response.Table;
                            this.paymentPlanDetailsResponse.forEach(m => {
                               this.inputViewPaymentPlanCreationDate = m.createdOn;
                               this.inputViewPaymentPlanCreationBy = m.CONname;
                               this.inputViewPaymentPlanLevel = m.CRS_Course_Name;
                               this.inputViewPaymentPlanFeeSchemeName = m.PPM_Fee_Scheme_Name;
                               this.inputViewPaymentPlanValidityStart = m.validityStartDate;
                               this.inputViewPaymentPlanValidityEnd = m.validityEndDate;
                               this.inputViewPaymentPlanTaxApplicable = m.PPM_GST_Applicable;
                               this.inputViewPaymentPlanTax = m.FK_GST;
                               this.inputViewPaymentPlanCenter = m.SCH_Name;
                               this.inputViewPaymentPlanCurrency = m.PPM_Currency;
                               this.inputViewPaymentPlanStatus = m.PPM_Status;
                            });

                            if(paymentPlanDetailsRes)
                            {
                                if (paymentPlanDetailsRes.code === '88') {
                                    window.location.replace('/');
                                }else{
                                    this.itemPaymentPlanDetailsInt = paymentPlanDetailsRes.Table;
                                }
                            }
                        }
                    }
                    this.$refs.viewPaymentPlanShowModal.show();
                }
                else {
                    this.$notify({
                        title: 'Error',
                        message: 'No payment plan selected',
                        type: 'error'
                    });
                }
            },

            async savePaymentPlanClick(){

                var btnAddPaymentPlanObject = {
                SPPD_FK_Student_Course_ID: this.studentCourseID,
                SPPD_FK_PaymentMaster_ID: this.ddlPaymentPlan,
                startDate: this.inputPaymentPlanStartDate,
                PK_PPR_ID: this.ddlPaymentPlanRuleApplyProRateFees,
                proRateFeesChecked: this.cbProRateFees,
                SPPD_PayerName: this.$refs.ddlPaymentPlanRuleApplyProRateFees.selected.label,
                };

                try {
                    if (this.ddlPaymentPlan === '' || (this.cbProRateFees === true && this.ddlPaymentPlanRuleApplyProRateFees === '')) {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please fill in all * fields'
                        });
                    } else {

                        const response = await DataSource.shared.savePaymentPlan(JSON.stringify(btnAddPaymentPlanObject));

                        if (response) {
                            if (response.code === '88') {
                                window.location.replace('/');
                            } else if (response.code === '99' || response.code === '2') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Add Payment Plan Error!'
                                });
                            } else {

                                await this.getStudentReceiptGenerationList();

                                await this.getStudentInvoiceGenerationList();

                                this.$notify({
                                    title: 'Success',
                                    message: 'Successfully Added!',
                                    type: 'success'
                                });

                                this.$refs.newApplyPaymentPlanShowModal.hide();
                                this.clearAddPaymentPlanField();
                            }
                        }
                    }
                }
                catch(e) {
                    this.results = e;
                }
            },

            clearAddPaymentPlanField(){
                this.ddlPaymentPlan = '';

                //prorate
                this.cbProRateFees = '';
                this.disablePaymentPlanRuleProRateFees = true;
                this.isDdlProRateFeesRequired = false;
                this.isInputPaymentPlanRuleProRateAmount = false;
                this.inputPaymentPlanRuleProRateAmount = '';
                this.ddlPaymentPlanRuleApplyProRateFees = '';

                //post rate
                this.cbPostRateFees = '';
                this.disablePaymentPlanRulePostRateFees = true;
                this.ddlPaymentPlanRuleApplyPostRateFees = '';

                //siblings
                this.cbSiblingDiscount = '';
                this.disablePaymentPlanRuleApplySiblings = true;
                this.isDdlSiblingDiscRequired = false;
                this.isInputPaymentPlanRuleSiblingsAmount = false;
                this.inputPaymentPlanRuleSiblingsAmount = '';
                this.ddlPaymentPlanRuleApplySiblings = '';

                //staff
                this.cbStaffDiscount = '';
                this.disablePaymentPlanRuleApplyStaff = true;
                this.isDdlStaffDiscRequired = false;
                this.isInputPaymentPlanRuleStaffAmount = false;
                this.ddlPaymentPlanRuleApplyStaff = '';
                this.inputStaffName = '';

                //To refresh receipt preview and generate b-modal
                this.getStudentReceiptGenerationList();
            },

            async addDiscountPlanClick(){
                var btnAddDiscountObject = {
                    SPPD_FK_Student_Course_ID: this.studentCourseID,
                    PK_PPR_ID: this.ddlPaymentPlanRuleApplySiblings,
                    conID: this.ddlPaymentPlanRuleApplyStaff,
                    siblingDiscountChecked: this.cbSiblingDiscount,
                    staffDiscountChecked: this.cbStaffDiscount,
                    staffName: this.inputStaffName,
                };

                try {
                    if ((this.cbSiblingDiscount === '' && this.cbStaffDiscount === '') || (this.cbSiblingDiscount === false && this.cbStaffDiscount === false)) {
                        this.$notify.error({
                            title: 'Error',
                            message: 'No discount selected'
                        });
                    }
                    else if((this.cbSiblingDiscount === true && this.ddlPaymentPlanRuleApplySiblings === '') || (this.cbStaffDiscount === true && this.ddlPaymentPlanRuleApplyStaff === ''))
                    {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please fill in all * fields'
                        });
                    }
                    else {
                        const response = await DataSource.shared.checkStudentPaymentPlan(this.studentCourseID);

                        if(response){
                            if (response.code === '88') {
                                window.location.replace('/');
                            }
                            else if (response.code === '1') {
                                const saveDiscountResponse = await DataSource.shared.savePaymentPlanDiscount(JSON.stringify(btnAddDiscountObject));
                                if (saveDiscountResponse) {
                                    if (saveDiscountResponse.code === '88') {
                                        window.location.replace('/');
                                    } else if (saveDiscountResponse.code === '99') {
                                        this.$notify.error({
                                            title: 'Error',
                                            message: 'Add Discount Error!'
                                        });
                                    } else if (saveDiscountResponse.code === '2'){
                                        this.$notify.error({
                                            title: 'Error',
                                            message: 'Discount already added before'
                                        });
                                    }
                                    else {
                                        await this.getPaymentList();

                                        await this.getStudentReceiptGenerationList();

                                        await this.getStudentInvoiceGenerationList();

                                        this.$notify({
                                            title: 'Success',
                                            message: 'Successfully Added!',
                                            type: 'success'
                                        });

                                        this.$refs.newApplyDiscountPlanShowModal.hide();
                                        this.clearAddPaymentPlanField();
                                    }
                                }
                            }
                            else if (response.code === '2') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Please add payment plan before add discount'
                                });
                            }
                        }
                    }
                }
                catch(e) {
                    this.results = e;
                }
            },

            displayPdf(base64string)
            {
                var byteChar = atob(base64string);
                var byteNo = new Array(byteChar.length);
                for(var i=0; i< byteChar.length; i++)
                {
                    byteNo[i] = byteChar.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNo);
                var file = new Blob([byteArray], { type: 'application/pdf;base64'});
                var fileUrl = URL.createObjectURL(file);
                // window.openBrowser(fileUrl);
                window.open(fileUrl, '_blank', 'width=500, height=500');
            },

            //todo - For receipt generation
            async getStudentReceiptGenerationList(){
                this.$vs.loading();
                try {
                        this.studentCourseID = this.$route.query.scid;
                        this.studentID = this.$route.query.sid;

                    const resp = await DataSource.shared.getActivePaymentNoTransactionHistoryList(this.studentCourseID, 'receipt');

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

                                this.respTempReceipt = resp.Table;
                                this.respTempReceipt.forEach(m => {
                                    if(m.RecTotal==null)
                                    {
                                        m.RecTotal=0;
                                    }
                                    else{
                                        m.RecTotal=m.SPPD_TotalValue;
                                    }
                                    m.newPayAmount=m.SPPD_TotalValue;
                                    m.IsCheck = false;
                                    this.customizeReceiptResponse.push(m);
                                });
                                this.studentReceiptGenerationListInt = this.customizeReceiptResponse;
                                this.customizeReceiptResponse=[];
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },

            async previewReceiptClick()
            {
                try{
                    if(!this.ddlPaymentMode)
                    {
                        alert('Please select payment mode.');
                    }
                    else{
                        let SPD_List = [];
                        this.spdSelection.forEach(item => {

                            let spdDetail = {
                                PK_SPD_ID: item.PK_SPD_ID,
                                paymentMode:this.ddlPaymentMode,
                                remarks:this.inputRemarks,
                                receiptDate:this.inputReceiptDate,
                                RD_Cheque_No:this.inputChequeNoBankName,
                                RD_Item_Description:item.SPPD_PayerName,
                                RD_GST_Applicable:item.SPPD_PaymentItemType,
                                newAmount:item.newPayAmount,
                                RD_Item_Amount:item.SPPD_PaymentAmount,
                                RD_GSTValue:item.SPPD_GstValue,

                            };
                            SPD_List.push(spdDetail);
                        });

                        if (this.spdSelection.length === 0) {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Please select at least 1 payment item'
                            });
                        } else {

                            //to preview receipt
                            const receiptResp = await DataSource.shared.generateReceipt(JSON.stringify(SPD_List), this.studentID, this.studentCourseID,'Preview');

                            if (receiptResp.code === '88') {
                                window.location.replace('/');
                            } else if (receiptResp.code === '99' || receiptResp.code === '2') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Failed to preview receipt!'
                                });
                            } else {

                                this.displayPdf(receiptResp.code);
                                this.clearSelect();
                            }
                        }

                    }

                }catch (e) {
                    this.results = e;
                }
            },

            async generateReceiptClick()
            {
                this.$vs.loading();
                try{
                    if(!this.ddlPaymentMode)
                    {
                        alert('Please select payment mode.');
                    }
                    else{

                        let SPD_List = [];
                        this.spdSelection.forEach(item => {

                            let spdDetail = {
                                PK_SPD_ID: item.PK_SPD_ID,
                                paymentMode:this.ddlPaymentMode,
                                receiptDate:this.inputReceiptDate,
                                remarks:this.inputRemarks,
                                RD_Cheque_No:this.inputChequeNoBankName,
                                RD_Item_Description:item.SPPD_PayerName,
                                RD_GST_Applicable:item.SPPD_PaymentItemType,
                                newAmount:item.newPayAmount,
                                RD_Item_Amount:item.SPPD_PaymentAmount,
                                RD_GSTValue:item.SPPD_GstValue,
                            };

                            SPD_List.push(spdDetail);

                        });

                        if (this.spdSelection.length === 0) {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Please select at least 1 payment item'
                            });
                        } else {
                            //to get receipt detail
                            const receiptResponse = await DataSource.shared.generateReceipt(JSON.stringify(SPD_List), this.studentID, this.studentCourseID,'Generate');

                                if (receiptResponse.code === '88') {
                                    window.location.replace('/');
                                } else if (receiptResponse.code === '99' || receiptResponse.code === '2') {
                                    this.$notify.error({
                                        title: 'Error',
                                        message: 'Failed to generate receipt!'
                                    });
                                } else {

                                    this.displayPdf(receiptResponse.code);
                                    await this.getStudentReceiptGenerationList();
                                    await this.getPaymentList();
                                    this.$refs.generateReceiptModal.hide();
                                    this.clearSelect();

                                }
                        }

                    }

                }catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },

            async previewLeftOverReceiptClick()
            {
                try{
                    if(!this.ddlPaymentMode)
                    {
                        alert('Please select payment mode.');
                    }
                    else{
                        let SPD_List = [];
                        this.spdSelection.forEach(item => {
                            let spdDetail = {
                                paymentMode:this.ddlPaymentMode,
                                remarks:this.inputRemarks,
                                receiptDate:this.inputReceiptDate,
                                RD_Cheque_No:this.inputChequeNoBankName,

                                //left Over Payment
                                RD_GST_Applicable: item.GST_Applicable,
                                RD_Item_Description: item.Item_Description,
                                PK_SPD_ID: item.SPD_ID,
                                RD_GSTValue: item.gstValue,
                                RD_Item_Amount: item.itemAmount,
                                totalValue: item.totalValue,
                                newAmount:item.newPayAmount,
                            };
                            SPD_List.push(spdDetail);
                        });

                        if (this.spdSelection.length === 0) {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Please select at least 1 payment item'
                            });
                        } else {

                            //to preview receipt
                            const receiptResp = await DataSource.shared.generateReceipt(JSON.stringify(SPD_List), this.studentID, this.studentCourseID,'Preview');

                            if (receiptResp.code === '88') {
                                window.location.replace('/');
                            } else if (receiptResp.code === '99' || receiptResp.code === '2') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Failed to preview receipt!'
                                });
                            } else {
                                this.displayPdf(receiptResp.code);
                                this.clearSelect();
                            }
                        }

                    }

                }catch (e) {
                    this.results = e;
                }
            },

            async generateLeftOverReceiptClick()
            {
                // this.$vs.loading();
                try{
                    if(!this.ddlPaymentMode)
                    {
                        alert('Please select payment mode.');
                    }
                    else{

                        let SPD_List = [];

                        this.spdSelection.forEach(item => {
                            let spdDetail = {
                                paymentMode:this.ddlPaymentMode,
                                remarks:this.inputRemarks,
                                receiptDate:this.inputReceiptDate,
                                RD_Cheque_No:this.inputChequeNoBankName,

                                //left Over Payment
                                RD_GST_Applicable: item.GST_Applicable,
                                RD_Item_Description: item.Item_Description,
                                PK_SPD_ID: item.SPD_ID,
                                RD_GSTValue: item.gstValue,
                                RD_Item_Amount: item.itemAmount,
                                totalValue: item.totalValue,
                                newAmount:item.newPayAmount,

                            };
                            SPD_List.push(spdDetail);
                        });

                        if (this.spdSelection.length === 0) {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Please select at least 1 payment item'
                            });
                        } else {
                            //to get receipt detail
                            const receiptResponse = await DataSource.shared.generateReceipt(JSON.stringify(SPD_List), this.studentID, this.studentCourseID,'Generate');

                            if (receiptResponse.code === '88') {
                                window.location.replace('/');
                            } else if (receiptResponse.code === '99' || receiptResponse.code === '2') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Failed to generate receipt!'
                                });
                            } else {

                                this.displayPdf(receiptResponse.code);
                                await this.getStudentReceiptGenerationList();

                                await this.getPaymentList();
                                await this.getleftOverPaymentReceipt();
                                this.$refs.showGenerateReceiptByHistoryModal.hide();
                                this.ddlPaymentMode='';
                                this.inputRemarks='';
                                this.inputChequeNoBankName='';
                                this.inputReceiptDate=new Date().getDate()+ '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();
                            }
                        }

                    }

                }catch (e) {
                    this.results = e;
                }
                // this.$vs.loading.close();
            },

            //todo: for CN generation
            async generateCNClick()
            {
                try {
                    if (this.spdSelection.length === 0) {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please select at least 1 payment item'
                        });
                    }
                    else if(this.taCnRemarks.length<1){
                        alert('Remark required');
                    }
                    else
                     {

                        let SPD_List = [];
                        this.spdSelection.forEach(item => {
                            let spdDetail = {
                                //left Over Payment
                                ID_GST_Applicable: item.GST_Applicable,
                                ID_Item_Description: item.Item_Description,
                                SPD_ID: item.SPD_ID,
                                ID_GSTValue: item.gstValue,
                                ID_Item_Amount: item.itemAmount,
                                // totalValue: item.totalValue,
                                // newAmount:item.newPayAmount,

                                InvHeaderID: this.InvHeaderID,
                                IH_Invoice_Name: this.cnInvoiceName,
                                studentCourseID: this.studentCourseID,
                                studentID: this.studentID,
                                cnRemarks: this.taCnRemarks,
                                newAmount: item.newPayAmount,
                            };
                            SPD_List.push(spdDetail);
                        });

                        const response = await DataSource.shared.generateCN(JSON.stringify(SPD_List));

                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99' || response.code === '2') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Failed to generate credit note!'
                            });
                        } else {
                            this.displayPdf(response.code);
                            await this.getPaymentList();
                            this.$refs.creditNoteModal.hide();
                            this.$refs.viewTransactionShowModal.hide();
                            this.taCnRemarks ='';
                        }
                    }
                }catch (e) {
                    this.results = e;
                }

            },

            //todo - For invoice generation
            async getStudentInvoiceGenerationList(){
                this.$vs.loading();
                try {
                        this.studentCourseID = this.$route.query.scid;
                        this.studentID = this.$route.query.sid;

                    const resp = await DataSource.shared.getActivePaymentNoTransactionHistoryList(this.studentCourseID, 'invoice');

                    if (resp) {
                        switch (resp.code) {
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
                                this.respTempInvoice = resp.Table;
                                this.respTempInvoice.forEach(m => {
                                    if(m.RecTotal==null)
                                    {
                                        m.RecTotal=0;
                                    }
                                    else{
                                        m.RecTotal=m.SPPD_TotalValue;
                                    }
                                    // m.newPayAmount=m.SPPD_TotalValue;
                                    m.IsCheck = false;
                                    this.customizeInvoiceResponse.push(m);
                                });
                                this.studentInvoiceGenerationListInt = this.customizeInvoiceResponse;
                                this.customizeInvoiceResponse=[];
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },

            async previewInvoiceClick(value) {
                // this.$vs.loading();
                try{
                    let SPD_List = [];
                    let InvoiceType = '';
                    if(value=='reinvoice'){
                        InvoiceType = 'PreviewReInvoice';
                        this.spdSelection.forEach(item => {
                            let spdDetail = {
                                PK_SPD_ID: item.PK_SPD_ID,
                                SPPD_Status: item.SPPD_Status,
                                SPPD_PayerName: item.SPPD_PayerName,
                                SPPD_FK_Payment_Plan_Detail_ID: item.SPPD_FK_Payment_Plan_Detail_ID,
                                SPPD_FK_PaymentMaster_ID: item.SPPD_FK_PaymentMaster_ID,
                                SPPD_PaymentItemType: item.SPPD_PaymentItemType,
                                SPPD_GstValue:item.SPPD_GstValue,
                                SPPD_PaymentAmount: item.SPPD_PaymentAmount,
                                SPPD_NewPaymentAmount :item.newPayAmount,
                                inputPaymentDueDate:this.inputPaymentDueDate,
                                printBreakdownChecked: this.cbPrintMonthlyBreakdown,
                            };
                            SPD_List.push(spdDetail);
                            this.reInvoiceName=item.invoiceName;
                        });
                    }
                    else
                    {
                        InvoiceType = 'Preview';
                        this.spdSelection.forEach(item => {
                            let spdDetail = {
                                PK_SPD_ID: item.PK_SPD_ID,
                                SPPD_Status: item.SPPD_Status,
                                SPPD_PayerName: item.SPPD_PayerName,
                                SPPD_FK_Payment_Plan_Detail_ID: item.SPPD_FK_Payment_Plan_Detail_ID,
                                SPPD_FK_PaymentMaster_ID: item.SPPD_FK_PaymentMaster_ID,
                                SPPD_PaymentAmount: item.SPPD_PaymentAmount,
                                SPPD_PaymentItemType: item.SPPD_PaymentItemType,
                                SPPD_GstValue:item.SPPD_GstValue,
                                inputPaymentDueDate:this.inputPaymentDueDate,
                                printBreakdownChecked: this.cbPrintMonthlyBreakdown,
                            };
                            SPD_List.push(spdDetail);
                        });
                    }

                    //to prompt item closed
                    var bool = false;   var payerName = '';
                    SPD_List.forEach(m => {
                        if(m.SPPD_Status === 'Closed')
                        {
                            bool = true;
                            payerName += m.SPPD_PayerName;
                            payerName += ', ';
                        }
                    });
                    payerName = payerName.substring(0, payerName.length - 2);

                    if(bool)
                    {
                        this.$notify.error({
                            title: 'Error',
                            message: payerName + ' is closed, invoice cannot be preview!'
                        });
                    }
                    else {
                        if ((this.inputPaymentDueDate === '')) {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Please select payment due date'
                            });
                        } else if (this.spdSelection.length === 0) {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Please select at least 1 payment item'
                            });
                        } else {

                            var amountPositiveCount = 0;
                            SPD_List.forEach(m => {
                                if (m.SPPD_PaymentAmount > 0) {
                                    amountPositiveCount += 1;
                                }
                            });
                            if (amountPositiveCount === 0) {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Invoice cannot be generated for discount item only. Please choose fee item along and do invoice.'
                                });
                            } else {
                                //to preview invoice
                                const invoiceResponse = await DataSource.shared.generateInvoice(JSON.stringify(SPD_List), this.studentID, this.studentCourseID, this.inputPaymentDueDate, this.inputRemarks, InvoiceType,this.reInvoiceName);

                                if (invoiceResponse.code === '88') {
                                    window.location.replace('/');
                                } else if (invoiceResponse.code === '99' || invoiceResponse.code === '2') {
                                    this.$notify.error({
                                        title: 'Error',
                                        message: 'Failed to preview invoice!'
                                    });
                                } else {

                                    this.displayPdf(invoiceResponse.code);
                                    this.clearSelect();
                                    this.reInvoiceName ='';
                                }
                            }
                        }
                    }
                }catch (e) {
                    this.results = e;
                }

            },

            async generateInvoiceClick(value) {
                // this.$vs.loading();
                try {
                    let SPD_List = [];
                    let InvoiceType = '';
                    if(value=='reinvoice'){
                        InvoiceType = value;
                        this.spdSelection.forEach(item => {
                            let spdDetail = {
                                PK_SPD_ID: item.PK_SPD_ID,
                                SPPD_Status: item.SPPD_Status,
                                SPPD_PayerName: item.SPPD_PayerName,
                                SPPD_FK_Payment_Plan_Detail_ID: item.SPPD_FK_Payment_Plan_Detail_ID,
                                SPPD_FK_PaymentMaster_ID: item.SPPD_FK_PaymentMaster_ID,
                                SPPD_PaymentItemType: item.SPPD_PaymentItemType,
                                SPPD_GstValue:item.SPPD_GstValue,
                                printBreakdownChecked: this.cbPrintMonthlyBreakdown,
                                inputPaymentDueDate:this.inputPaymentDueDate,
                                SPPD_NewPaymentAmount: item.newPayAmount,
                            };
                            SPD_List.push(spdDetail);
                            this.reInvoiceName=item.invoiceName;
                        });
                    }
                    else{
                        InvoiceType = 'Generate';
                        this.spdSelection.forEach(item => {
                            let spdDetail = {
                                PK_SPD_ID: item.PK_SPD_ID,
                                SPPD_Status: item.SPPD_Status,
                                SPPD_PayerName: item.SPPD_PayerName,
                                SPPD_FK_Payment_Plan_Detail_ID: item.SPPD_FK_Payment_Plan_Detail_ID,
                                SPPD_FK_PaymentMaster_ID: item.SPPD_FK_PaymentMaster_ID,
                                SPPD_PaymentAmount: item.SPPD_PaymentAmount,
                                SPPD_PaymentItemType: item.SPPD_PaymentItemType,
                                SPPD_GstValue:item.SPPD_GstValue,
                                inputPaymentDueDate:this.inputPaymentDueDate,
                                printBreakdownChecked: this.cbPrintMonthlyBreakdown,
                            };
                            SPD_List.push(spdDetail);
                        });
                    }

                    //to prompt item closed
                    var bool = false;   var payerName = '';
                    SPD_List.forEach(m => {
                        if(m.SPPD_Status === 'Closed')
                        {
                            bool = true;
                            payerName += m.SPPD_PayerName;
                            payerName += ', ';
                        }
                    });
                    payerName = payerName.substring(0, payerName.length - 2);

                    if(bool)
                    {
                        this.$notify.error({
                            title: 'Error',
                            message: payerName + ' is closed, invoice cannot be generated!'
                        });
                    }
                    else
                    {
                        if ((this.inputPaymentDueDate === '')) {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Please select payment due date'
                            });
                        }
                        else if(this.spdSelection.length === 0)
                        {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Please select at least 1 payment item'
                            });
                        }
                        else
                        {
                            var amountPositiveCount = 0;
                            if(value==='reinvoice'){
                                SPD_List.forEach(m => {
                                    if (m.SPPD_NewPaymentAmount > 0) {
                                        amountPositiveCount += 1;
                                    }
                                });
                            }else{
                                SPD_List.forEach(m => {
                                    if (m.SPPD_PaymentAmount > 0) {
                                        amountPositiveCount += 1;
                                    }
                                });
                            }

                            if (amountPositiveCount === 0) {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Invoice cannot be generated for discount item only. Please choose fee item along and do invoice.'
                                });
                            }
                            else
                            {
                                //to generate invoice
                                const invoiceResponse = await DataSource.shared.generateInvoice(JSON.stringify(SPD_List), this.studentID, this.studentCourseID, this.inputPaymentDueDate, this.inputRemarks, InvoiceType, this.reInvoiceName);

                                if (invoiceResponse.code === '88') {
                                    window.location.replace('/');
                                } else if (invoiceResponse.code === '99' || invoiceResponse.code === '2') {
                                    this.$notify.error({
                                        title: 'Error',
                                        message: 'Failed to generate invoice!'
                                    });
                                } else {
                                    this.displayPdf(invoiceResponse.code);
                                    await this.getPaymentList();
                                    await this.getStudentInvoiceGenerationList();
                                    this.$refs.generateInvoiceModal.hide();
                                    this.clearSelect();
                                }
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
                // this.$vs.loading.close();
            },

            validatePaymentMode(){
               if(this.ddlPaymentMode=='CASH'){
                   this.inputChequeNoBankName ='';
               }
            },

            async getleftOverPaymentReceipt(objValue){
                try{
                    let obj_List = [];
                    if(objValue.recNameList){
                        this.tempList=objValue.recNameList.split(',');
                        this.tempList.forEach(m => {

                            let objDetail = {
                                receiptName: m,
                            };
                            obj_List.push(objDetail);
                        });
                    }
                    else{
                        let objDetail = {
                            receiptName:'',
                        };
                        obj_List.push(objDetail);
                    }

                    const resp = await DataSource.shared.getLeftOverPaymentReceipt(JSON.stringify(obj_List),this.studentID, objValue.IH_Invoice_Name, this.studentCourseID);

                    if (resp) {
                        switch (resp.code) {
                            case "2":
                              console.log('no record found');
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
                                this.studentReceiptLeftOverPaymentListInt = resp.Table;
                        }
                    }
                }
                catch(e){
                    this.results = e;
                }
            },

            // todo: CALL b-modal link only
            async showTransaction(value){
                await this.getReceiptWithTransactionHistory(value);
                this.$refs.viewTransactionShowModal.show();
            },

            async getTransactionDocumentPdf(objValue){
                try
                {
                    const resp = await DataSource.shared.getTransactionDocumentPdf(objValue.DocumentType,objValue.InvRecID);

                    if (resp.code === '88') {
                        window.location.replace('/');
                    } else if (resp.code === '99') {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Failed to preview!'
                        });
                    } else {

                        this.displayPdf(resp.code);
                        this.clearSelect();
                    }
                }
                catch (e) {
                    this.results = e;
                }
            },

            async getReceiptWithTransactionHistory(objValue){
                try{
                        let obj_List = [];
                        if(objValue.recNameList){
                            this.tempList=objValue.recNameList.split(',');
                            this.tempList.forEach(m => {

                                let objDetail = {
                                    receiptName: m,
                                };
                                obj_List.push(objDetail);
                            });
                        }
                        else{
                            let objDetail = {
                                receiptName:'',
                            };
                            obj_List.push(objDetail);
                        }

                    let invoiceName = objValue.IH_Invoice_Name;
                    //For credit note
                    this.cnInvoiceName=objValue.IH_Invoice_Name;

                    const resp = await DataSource.shared.getReceiptWithTransactionHistory(JSON.stringify(obj_List),this.studentID,invoiceName);

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
                                this.studentReceiptGenerationByTransactionHistoryListInt = resp.Table;;
                        }
                    }
                }
                catch(e){
                    this.results = e;
                }
            },

            async getReInvoice(objValue){
                try {
                        this.studentCourseID = this.$route.query.scid; //
                        this.studentID = this.$route.query.sid;

                        if(objValue.IH_Invoice_Name){
                            const resp = await DataSource.shared.getReInvoice(this.studentID, this.studentCourseID,objValue.IH_Invoice_Name);
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

                                        this.tempReInvoiceResp = resp.Table;
                                        this.tempReInvoiceResp.forEach(m=>{
                                            m.newPayAmount=m.SPPD_TotalValue;
                                            this.customizeReInvoiceResponce.push(m);
                                        });
                                        this.ReInvoiceListInt = this.customizeReInvoiceResponce;
                                        this.customizeReInvoiceResponce=[];
                                }
                            }
                        }
                        else{
                            const resp = await DataSource.shared.getReInvoice(this.studentID, this.studentCourseID,this.Re_InvoiceName);
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

                                        this.tempReInvoiceResp = resp.Table;
                                        this.tempReInvoiceResp.forEach(m=>{
                                            m.newPayAmount=m.SPPD_TotalValue;
                                            this.customizeReInvoiceResponce.push(m);
                                        });
                                        this.ReInvoiceListInt = this.customizeReInvoiceResponce;
                                        this.customizeReInvoiceResponce=[];
                                }
                            }
                        }

                } catch (e) {
                    this.results = e;
                }
            },

            async showGenerateReceiptByHistory(value){
                try {

                    await this.getReceiptWithTransactionHistory(value);
                    await this.getleftOverPaymentReceipt(value);
                    this.$refs.showGenerateReceiptByHistoryModal.show();

                }
                catch (e) {
                    this.results = e;
                }
            },

            async showGenerateCreditNote(value){

                await this.getReceiptWithTransactionHistory(value);
                await this.getleftOverPaymentReceipt(value);
                this.$refs.creditNoteModal.show();

            },

            async showReInvoice(value){
                await this.getReInvoice(value);
                this.Re_InvoiceName=value.IH_Invoice_Name;
                this.$refs.showReInvoiceModal.show();
            },

            // todo: generate receipt
            async showGenerateReceipt()
            {
                try {
                    await this.getStudentReceiptGenerationList();
                    this.$refs.generateReceiptModal.show();

                } catch (e) {
                    this.results = e;
                }
            },

            //todo: call preview/generate invoice b-modal
            async showGenerateInvoice()
            {
                try
                {
                    await this.getStudentInvoiceGenerationList();
                    this.$refs.generateInvoiceModal.show();
                }
                catch (e) {
                    this.results = e;
                }
            },

            splitReceiptList(value){
                try{
                    var splitList =[];

                    splitList = value;

                    return splitList.split(',');
                }
                catch (e) {
                    this.results = e;
                }
            }

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

    .requiredFieldsMsg {
        color: red;
        font-weight: bold;
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