<template>
    <div id="studentpaymentplan">
        <div class="col-lg-12">
<!--            pp = student payment plan-->
<!--            sd = student/staff discount-->
<!--            items =  add items-->
<!--            gi = generate invoice-->
<!--            gr =  generate receipt-->
<!--            cn = generate credit note-->
<!--            rf = refund-->
            <div>
                <template>
                    <el-select v-on:change="studentPaymentPlanTourStart(tourPageControl)" v-model="tourPageControl" clearable placeholder="Select Tour">
                        <el-option  v-for="item in TourOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </template>
<!--                <button @click="studentPaymentPlanTourStart('pp')">apply payment plan tour</button>-->
<!--                <button @click="studentPaymentPlanTourStart('sd')">sibling/staff discount tour</button><br>-->
<!--                <button @click="studentPaymentPlanTourStart('items')">add items tour</button>-->
<!--                <button @click="studentPaymentPlanTourStart('gi')">generate invoice tour</button><br>-->
<!--                <button @click="studentPaymentPlanTourStart('gr')">generate receipt tour</button>-->
<!--                <button @click="studentPaymentPlanTourStart('cn')">generate credit note tour</button><br>-->
<!--                <button @click="studentPaymentPlanTourStart('rf')">Refund Tour</button>-->
            </div>
            <div class="payment-title-wrap container mt-2">
                <h5 class="text-left payment-title" id="StudentInformation">
                    <b>Student Information</b></h5>
            </div>
            <div class="payment-header">
                <div class="container">
                    <div class="payment-student-info">
                        <div class="payment-student-object">
                            <h4>{{inputStudentName}}</h4>
                            <span>Student Name</span>
                        </div>
                        <div class="payment-student-object">
                            <h4>{{inputStudentNO}}</h4>
                            <span>Student NO</span>
                        </div>
                        <div class="payment-student-object">
                            <h4>{{inputMealPreferences}}</h4>
                            <span>Meal Preferences</span>
                        </div>
                        <div class="payment-student-object">
                            <h4>{{inputStudentClassBatch}}</h4>
                            <span>Class/Programme</span>
                        </div>
                        <div class="payment-student-object">
                            <h4>{{inputPayeeName}}</h4>
                            <span>Payee Name</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="student-course-list container mt-5">

                <template>
                    <div>
                        <b-card no-body>
                            <b-tabs content-class="mt-3">
                                <b-tab title="Siblings" active>
                                    <div v-if="siblingListTableInt.length>0" class="datatable_group">
                                        <data-tables :data="siblingListTableInt" :action-col="siblingListAction">
                                            <el-table-column v-for="siblingItem in siblingListTableList" :prop="siblingItem.prop"
                                                             :label="siblingItem.label" :key="siblingItem.prop">
                                            </el-table-column>
                                        </data-tables>
                                    </div>
                                    <div v-else class="siblingNoRecordArea">
                                        <label>No Sibling...</label>
                                    </div>
                                </b-tab>
                                <b-tab title="Parent Info">
                                    <div v-if="parentListTableInt.length>0" class="datatable_group">
                                        <b>Family Number: {{familyNumber}}</b>
                                        <data-tables :data="parentListTableInt">
                                            <el-table-column v-for="Item in parentListTable" :prop="Item.prop"
                                                             :label="Item.label" :key="Item.prop">
                                            </el-table-column>
                                        </data-tables>
                                    </div>
                                    <div v-else class="parentNoRecordArea">
                                        <label>Parent info not found...</label>
                                    </div>
                                </b-tab>
                            </b-tabs>
                        </b-card>
                    </div>
                </template>

                <div class="row payment-list-header">
                    <div class="col-lg-6"><h5 class="text-left payment-title" id="Payment_List">
                       <b>Payment List</b>
                    </h5></div>
                    <div class="col-lg-6 text-right">
                        <div class="paymentList-button-group" >
                            <span>Generate / Preview</span>
                            <el-button-group v-if="PaymentListInt.length>0">
                                <el-button data-v-step="app01"
                                           v-on:click="showGenerateInvoice" :disabled="btnDisabled" type="primary"
                                           size="small">
                                    <i class="material-icons">
                                        attach_money
                                    </i> Invoice
                                </el-button>

                                <el-button  data-v-step="gr01"
                                            v-on:click="showGenerateReceipt" :disabled="btnDisabled" type="primary"
                                           size="small">
                                    <i class="material-icons">
                                        receipt
                                    </i> Receipt
                                </el-button>
                            </el-button-group>
                        </div>

                    </div>
                </div>
                <div class="empty-list_icon" v-if="PaymentListInt&&PaymentListInt.length<1">
                    <div class="mb-3">
                        <img src="../assets/notfound-icon.png"/>
                        <strong class="">No Data Found...</strong>
                    </div>
                    <el-button-group>
                        <el-button v-on:click="showGenerateInvoice" :disabled="btnDisabled" type="primary" size="small">
                            Generate/Preview Invoice
                        </el-button>
                        <el-button v-on:click="showGenerateReceipt" :disabled="btnDisabled" type="primary" size="small">
                            Generate/Preview Receipt
                        </el-button>
                    </el-button-group>
                </div>
                <div v-if="PaymentListInt.length>0" class="datatable_group">
                    <data-tables :data="PaymentListInt" :filters="PaymentListFilters">
                        <el-table-column v-for="PaymentItem in PaymentList" :prop="PaymentItem.prop"
                                         :label="PaymentItem.label" :key="PaymentItem.prop">
                        </el-table-column>
                        <el-table-column label="CN/Receipt" min-width="70px">
                            <template slot-scope="scope">
                                <div class="receiptScope"
                                     v-for="item in splitReceiptList(scope.row.recNameList)"
                                     v-bind:key="item.ID">
                                    {{item}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="Action" min-width="70px">
                            <template slot-scope="scope">
                                <div>
                                    <a href="#" class="payment-icon paymentIcon-transaction"
                                       @click="showTransaction(scope.row)">
                                        <el-tooltip class="item" effect="dark" content="Show Transaction"
                                                    placement="top-start">
                                            <i class="el-icon-sort"></i>
                                        </el-tooltip>
                                    </a>
                                    <a href="#" class="payment-icon paymentIcon-transaction"
                                       data-v-step="rfMaster01"
                                       @click="showRefund(scope.row)"  v-if="scope.row.refundFlag =='Yes'">
                                        <el-tooltip class="item" effect="dark" content="Show Refund"
                                                    placement="top-start">
                                            <i class="material-icons" style="color:darkcyan">
                                                payment
                                            </i>
                                        </el-tooltip>
                                    </a>
                                    <a href="#" v-if="scope.row.generateReceiptFlag =='Yes'&&btnDisabled==false"
                                       class="payment-icon paymentIcon-receipt"
                                       @click="showGenerateReceiptByHistory(scope.row)">
                                        <el-tooltip class="item" effect="dark" content="Generate Receipt"
                                                placement="top-start">
                                            <i class="material-icons">
                                                receipt
                                            </i>
                                        </el-tooltip>
                                    </a>
                                    <a href="#" v-if="scope.row.generateCNFlag=='Yes'&&btnDisabled==false"
                                       class="payment-icon paymentIcon-CreditNote"
                                       @click="showGenerateCreditNote(scope.row)"
                                       data-v-step="gcn01">
                                        <el-tooltip class="item" effect="dark" content="Generate CreditNote"
                                                    placement="top-start">
                                            <i class="fa fa-money" aria-hidden="true"></i>
                                        </el-tooltip>
                                    </a>
                                    <a href="#" v-if="scope.row.reInvoiceFlag=='Yes'&&btnDisabled==false"
                                       class="payment-icon paymentIcon-Invoice"
                                       @click="showReInvoice(scope.row)">
                                        <el-tooltip class="item" effect="dark" content="Re-Invoice"
                                                    placement="top-start">
                                            <i class="material-icons">
                                                attach_money
                                            </i>
                                        </el-tooltip>
                                    </a>
                                </div>
                            </template>
                        </el-table-column>
                    </data-tables>
                </div>
            </div>
        </div>
        <b-modal id="viewTransactionModal" size="xl" title="Transactions History" ok-only ok-variant="secondary"
                 ok-title="Cancel" ref="viewTransactionShowModal">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div v-if="studentReceiptGenerationByTransactionHistoryListInt.length>0">
                        <data-tables :data="studentReceiptGenerationByTransactionHistoryListInt">
                            <el-table-column label="Document Number" min-width="70px">
                                <template slot-scope="scope">
                                    <a href="#" style="color:blue" @click="getTransactionDocumentPdf(scope.row)">{{scope.row.DocumentNo}}</a>
                                </template>
                            </el-table-column>
                            <el-table-column v-for="item in studentReceiptGenerationByTransactionHistoryList" min-width="50px"
                                             :prop="item.prop"
                                             :label="item.label" :key="item.prop"
                                             sortable="custom">
                            </el-table-column>
                            <el-table-column label="Payment Reminder" min-width="80px">
                                <template slot-scope="scope">
                                    <div class="paymentList-button-group" v-if="scope.row.DocumentType=='Invoice'">
                                        <el-button-group v-if="PaymentListInt.length>0">
                                            <el-button v-on:click="showPaymentReminder('1st',scope.row.DocumentNo)" :disabled="btnDisabled" type="primary"
                                                       size="small">
                                                <i class="tiny material-icons" style="color:red">
                                                    add_alert
                                                </i> 1
                                            </el-button>

                                            <el-button v-on:click="showPaymentReminder('2nd',scope.row.DocumentNo)" :disabled="btnDisabled" type="primary"
                                                       size="small">
                                                <i class="tiny material-icons" style="color:red">
                                                    add_alert
                                                </i> 2
                                            </el-button>

                                            <el-button v-on:click="showPaymentReminder('3rd',scope.row.DocumentNo)" :disabled="btnDisabled" type="primary"
                                                       size="small">
                                                <i class="tiny material-icons" style="color:red">
                                                    add_alert
                                                </i> 3

                                            </el-button>
                                        </el-button-group>
                                    </div>
                                </template>
                            </el-table-column>
                        </data-tables>
                    </div>
                </div>

            </div>
        </b-modal>
        <b-modal id="newApplyPaymentPlanModal" size="lg" title="Apply Payment Plan" ok-only ok-variant="secondary"
                 hide-footer ref="newApplyPaymentPlanShowModal">
            <div class="row ml-2 mr-2">
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div class="row">
                        <div class="col-lg-6"><label>* Payment Plan</label></div>
                        <div class="col-lg-6" data-v-step="ppBmodal02">
                            <!--<button v-on:click="viewPaymentPlan()"-->
                            <!--class="btn btn-primary waves-effect waves-light float-right">View Payment Plan-->
                            <!--</button>-->
                            <el-button @click="viewPaymentPlan" type="info" rounded size="mini"
                                       class="custom-info-elbutton float-right" v-if="ddlPaymentPlan !== null">View
                                Payment Plan <i class="fa fa-eye" aria-hidden="true"></i></el-button>
                        </div>
                    </div>
                    <el-select class="float-left fullwidth" v-model="ddlPaymentPlan" data-v-step="ppBmodal01">
                        <el-option
                                v-for="item in paymentPlanList"
                                :key="item.PK_Course_Fee_Scheme_ID"
                                :label="item.PPM_Fee_Scheme_Name"
                                :value="item.PK_Course_Fee_Scheme_ID">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Start Date</label>
                    <input type="text" class="form-control" v-model="inputPaymentPlanStartDate" readonly="readonly">
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" v-show="isProRateFeesEligible">
                    <label>
                        <input type="checkbox" class="form-control" v-model="cbProRateFees"
                               :disabled="disabledCbProRateFees" @change="cbProRateFeesClick()">
                        Pro-Rate Fees
                        <span>
                            <span>
                                <svg class="checkmark" viewBox="0 0 24 24"><path class="checkmark-path"
                                                                                 fill="none" stroke="white"
                                                                                 d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg>
                            </span>
                        </span>
                    </label>
                    <input type="text" class="form-control EligibleColor" v-model="inputEligible"
                           v-show="isProRateFeesEligible" readonly="readonly">
                    <!--<input type="text" class="form-control NotEligibleColor" v-model="inputNotEligible"-->
                    <!--v-show="isProRateFeesNotEligible" readonly="readonly">-->
                    <label><span v-show="isDdlProRateFeesRequired">* </span>Rule to Apply</label>
                    <el-select v-model="ddlPaymentPlanRuleApplyProRateFees" ref="ddlPaymentPlanRuleApplyProRateFees"
                               class="fullwidth" :disabled="disablePaymentPlanRuleProRateFees"
                               @change="onchangePaymentPlanRuleProRateFees()">
                        <el-option
                                v-for="item in paymentPlanRuleApplyProRateFeesList"
                                :key="item.PK_PPR_ID"
                                :label="item.PPR_Name"
                                :value="item.PK_PPR_ID">
                        </el-option>
                    </el-select>
                    <input type="text" class="form-control" v-model="inputPaymentPlanRuleProRateAmount"
                           v-show="isInputPaymentPlanRuleProRateAmount" readonly="readonly">
                    <label>Level Start Date</label>
                    <input type="text" class="form-control" v-model="inputPaymentPlanLevelStartDate"
                           readonly="readonly">
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" v-if="isPostRateFeesEligible">
                    <label>
                        <input type="checkbox" class="form-control" v-model="cbPostRateFees"
                               :disabled="disabledCbPostRateFees" @change="cbPostRateFeesClick()">
                        Post-Rate Fees
                        <span>
                            <span>
                                <svg class="checkmark" viewBox="0 0 24 24"><path class="checkmark-path"
                                                                                 fill="none" stroke="white"
                                                                                 d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg>
                            </span>
                        </span>
                    </label>
                    <input type="text" class="form-control EligibleColor" v-model="inputEligible"
                           v-show="isPostRateFeesEligible" readonly="readonly">
                    <!--<input type="text" class="form-control NotEligibleColor" v-model="inputNotEligible"-->
                    <!--v-show="isPostRateFeesNotEligible" readonly="readonly">-->
                    <label>Rule to Apply</label>
                    <el-select v-model="ddlPaymentPlanRuleApplyPostRateFees" class="fullwidth"
                               :disabled="disablePaymentPlanRulePostRateFees">
                        <el-option
                                v-for="item in paymentPlanRuleApplyPostRateFeesList"
                                :key="item.PK_PPR_ID"
                                :label="item.PPR_Name"
                                :value="item.PK_PPR_ID">
                        </el-option>
                    </el-select>
                    <!--todo: to check what value for level end date-->
                    <label>Level End Date</label>
                    <!--existing ems no assign value for level end date-->
                    <input type="text" class="form-control" v-model="inputPaymentPlanLevelEndDate" readonly="readonly">
                </div>
                <hr class="custom-hr"/>
                <div class="col-lg-6">
                    <b-btn @click="closePaymentPlanModal()" class="float-left btn-secondary">Cancel</b-btn>
                </div>
                <div class="col-lg-6">
                    <button v-on:click="savePaymentPlanClick()" data-v-step="ppBmodal03"
                            class="btn btn-primary waves-effect waves-light float-right">Add Payment Plan
                    </button>
                </div>

                <v-tour name="ppModalTourName" :steps="ppModalTourSteps"
                        :options="MasterPageTourOptions" :callbacks="ppModalTourCallbacks">
                    <template slot-scope="tour">
                        <transition name="fade">
                            <v-step
                                    v-if="tour.currentStep === index"
                                    v-for="(step, index) of tour.steps"
                                    :key="index"
                                    :step="step"
                                    :previous-step="tour.previousStep"
                                    :next-step="tour.nextStep"
                                    :stop="tour.stop"
                                    :is-first="tour.isFirst"
                                    :is-last="tour.isLast"
                                    :labels="tour.labels"
                            >
                                <template v-if="tour.currentStep === 0">
                                    <div slot="actions">
                                        <button @click="backToInvModalPPTour()" class="v-step__button">Previous step</button>
                                        <button @click="tour.nextStep" class="v-step__button">Next step</button>
                                    </div>
                                </template>

                                <template v-if="tour.currentStep === 2">
                                    <div slot="actions">
                                        <button @click="tour.previousStep" class="v-step__button">Previous</button>
                                        <button @click="ppModalTourStop()" class="v-step__button">Finish</button>
                                    </div>
                                </template>
                            </v-step>
                        </transition>
                    </template>
                </v-tour>

            </div>
        </b-modal>
        <b-modal id="newApplyDiscountPlanModal" size="lg" title="Add Discount Plan" ok-only ok-variant="secondary"
                 hide-footer ref="newApplyDiscountPlanShowModal">
            <div class="row ml-2 mr-2">
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div v-if="isSiblingDiscountEligible">
                        <label>
                            <input type="checkbox" class="form-control" v-model="cbSiblingDiscount"
                                   :disabled="disabledCbSiblingDiscount" @change="cbSiblingDiscountClick()">
                            Sibling Discount
                            <span>
                            <span>
                                <svg class="checkmark" viewBox="0 0 24 24"><path class="checkmark-path"
                                                                                 fill="none" stroke="white"
                                                                                 d="M1.73,12.91 8.1,19.28 22.79,4.59" data-v-step="sdmodal02"></path></svg>
                            </span>
                        </span>
                        </label>

                        <input type="text" class="form-control EligibleColor" v-model="inputEligible"
                               readonly="readonly" data-v-step="sdmodal01">
                        <!--<input type="text" class="form-control NotEligibleColor" v-model="inputNotEligible"-->
                        <!--v-show="isSiblingDiscountNotEligible" readonly="readonly">-->
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label><span v-show="isDdlSiblingDiscRequired">* </span>Rule to Apply</label>
                    <el-select v-model="ddlPaymentPlanRuleApplySiblings" class="fullwidth"
                               data-v-step="sdmodal03"
                               :disabled="disablePaymentPlanRuleApplySiblings"
                               @change="onchangePaymentPlanRuleSiblings()">
                        <el-option
                                v-for="item in paymentPlanRuleApplySiblingsList"
                                :key="item.PK_PPR_ID"
                                :label="item.PPR_Name"
                                :value="item.PK_PPR_ID">
                        </el-option>
                    </el-select>
                    <input type="text" class="form-control" v-model="inputPaymentPlanRuleSiblingsAmount"
                           v-show="isInputPaymentPlanRuleSiblingsAmount" readonly="readonly">
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div><label>List of Siblings</label></div>
                    <div>
                        <!--                                <div v-if="siblingList">-->
                        <!--                                    <label v-for="(item, index) in siblingListInfo">{{index + 1}}. {{item.Full_Name}}-->
                        <!--                                        {{item.Middle_name}} {{item.Last_name}} ({{item.Status}})</label>-->
                        <!--                                </div>-->
                        <div v-if="siblingListTableInt.length>0" class="datatable_group">
                            <data-tables :data="siblingListTableInt">
                                <el-table-column v-for="siblingItem in siblingListTableList" :prop="siblingItem.prop"
                                                 :label="siblingItem.label" :key="siblingItem.prop">
                                </el-table-column>
                            </data-tables>
                        </div>
                        <!--                                <div v-if="!siblingList">-->
                        <!--                                    No Siblings....-->
                        <!--                                </div>-->
                        <div v-else class="siblingNoRecordArea">
                            <label>No Sibling...</label>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div v-if="isStaffDiscountEligible">
                        <label>
                            <input type="checkbox" class="form-control" v-model="cbStaffDiscount"
                                   :disabled="disabledCbStaffDiscount" @change="cbStaffDiscountClick()">
                            Staff Discount
                            <span>
                            <span>
                                <svg class="checkmark" viewBox="0 0 24 24"><path class="checkmark-path"
                                                                                 fill="none" stroke="white"
                                                                                 d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg>
                            </span>
                        </span>
                        </label>
                        <input type="text" class="form-control EligibleColor" v-model="inputEligible"
                               readonly="readonly">
                        <!--<input type="text" class="form-control NotEligibleColor" v-model="inputNotEligible"-->
                        <!--v-show="isStaffDiscountNotEligible" readonly="readonly">-->
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb3">
                            <label><span v-show="isDdlStaffDiscRequired">* </span>Rule to Apply</label>
                            <el-select v-model="ddlPaymentPlanRuleApplyStaff" class="fullwidth"
                                       :disabled="disablePaymentPlanRuleApplyStaff"
                                       @change="onchangePaymentPlanRuleStaff()">
                                <el-option
                                        v-for="item in ddlPaymentPlanRuleApplyStaffList"
                                        :key="item.staffContactID"
                                        :label="item.staffName"
                                        :value="item.staffContactID">
                                </el-option>
                            </el-select>
                            <input type="text" class="form-control" v-model="inputPaymentPlanRuleStaffAmount"
                                   v-show="isInputPaymentPlanRuleStaffAmount" readonly="readonly">
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb3">
                            <label>Staff Name</label>
                            <input type="text" class="form-control" v-model="inputStaffName" readonly="readonly">
                        </div>
                    </div>
                </div>
                <hr class="custom-hr"/>
                <div class="col-lg-6">
                    <button v-on:click="addDiscountPlanClick()" data-v-step="sdmodal04"
                            class="btn btn-primary waves-effect waves-light">Add Discount Plan
                    </button>
                </div>
                <v-tour name="sdModalTourName" :steps="sdModalTourSteps" :options="MasterPageTourOptions"
                        :callbacks="sdModalTourCallbacks">
                    <template slot-scope="tour">
                        <transition name="fade">
                            <v-step
                                    v-if="tour.currentStep === index"
                                    v-for="(step, index) of tour.steps"
                                    :key="index"
                                    :step="step"
                                    :previous-step="tour.previousStep"
                                    :next-step="tour.nextStep"
                                    :stop="tour.stop"
                                    :is-first="tour.isFirst"
                                    :is-last="tour.isLast"
                                    :labels="tour.labels"
                            >
                                <template v-if="tour.currentStep === 0">
                                    <div slot="actions">
                                        <button @click="backToInvModalSDTour()" class="v-step__button">Previous</button>
                                        <button @click="tour.nextStep" class="v-step__button">Next</button>
                                    </div>
                                </template>
                                <template v-if="tour.currentStep === 3">
                                    <div slot="actions">
                                        <button class="v-step__button" @click="tour.previousStep">Previous</button>
                                        <button class="v-step__button" @click="sdModalTourStop()">Finish</button>
                                    </div>
                                </template>
                            </v-step>
                        </transition>
                    </template>
                </v-tour>
            </div>
        </b-modal>
        <b-modal id="viewPaymentPlanModal" size="lg" title="View Payment Plan" ok-only ok-variant="secondary"
                 hide-footer ref="viewPaymentPlanShowModal">
            <h5 class="text-left payment-title mt-2">Payment Plan Details</h5>
            <small class="small-grey-text">Creation Date: {{inputViewPaymentPlanCreationDate}}</small>
            <small class="small-grey-text">Creation By: {{inputViewPaymentPlanCreationBy}}</small>
            <div class="payment-modal-info">
                <div class="payment-modal-object">
                    <h4>Level</h4>
                    <span>{{inputViewPaymentPlanLevel}}</span>
                </div>
                <div class="payment-modal-object">
                    <h4>Fee Scheme Name</h4>
                    <span>{{inputViewPaymentPlanFeeSchemeName}}</span>
                </div>
                <div class="payment-modal-object">
                    <h4>Validity Starts On</h4>
                    <span>{{inputViewPaymentPlanValidityStart}}</span>
                </div>
                <div class="payment-modal-object">
                    <h4>Validity Ends On</h4>
                    <span>{{inputViewPaymentPlanValidityEnd}}</span>
                </div>
                <div class="payment-modal-object">
                    <h4>Tax Applicable</h4>
                    <span>{{inputViewPaymentPlanTaxApplicable}}</span>
                </div>
                <div class="payment-modal-object">
                    <h4>Tax</h4>
                    <span>{{inputViewPaymentPlanTax}}</span>
                </div>
                <div class="payment-modal-object">
                    <h4>Center</h4>
                    <span>{{inputViewPaymentPlanCenter}}</span>
                </div>
                <div class="payment-modal-object">
                    <h4>Currency</h4>
                    <span>{{inputViewPaymentPlanCurrency}}</span>
                </div>
                <div class="payment-modal-object">
                    <h4>Status</h4>
                    <span>{{inputViewPaymentPlanStatus}}</span>
                </div>
            </div>
            <!--div class="row ml-2 mr-2">
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Creation Date</label>
                    <input type="text" class="form-control" v-model="inputViewPaymentPlanCreationDate"
                           readonly="readonly">
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Creation By</label>
                    <input type="text" class="form-control" v-model="inputViewPaymentPlanCreationBy"
                           readonly="readonly">
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Level</label>
                    <input type="text" class="form-control" v-model="inputViewPaymentPlanLevel" readonly="readonly">
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Fee Scheme Name</label>
                    <input type="text" class="form-control" v-model="inputViewPaymentPlanFeeSchemeName"
                           readonly="readonly">
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Validity Starts On</label>
                    <input type="text" class="form-control" v-model="inputViewPaymentPlanValidityStart"
                           readonly="readonly">
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Validity Ends On</label>
                    <input type="text" class="form-control" v-model="inputViewPaymentPlanValidityEnd"
                           readonly="readonly">
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Tax Applicable</label>
                    <input type="text" class="form-control" v-model="inputViewPaymentPlanTaxApplicable"
                           readonly="readonly">
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
            </div-->
            <div v-if="itemPaymentPlanDetailsInt.length>0">
                <data-tables :data="itemPaymentPlanDetailsInt">
                    <el-table-column v-for="itemPaymentPlanDetailsListItem in itemPaymentPlanDetailsList"
                                     :prop="itemPaymentPlanDetailsListItem.prop"
                                     :label="itemPaymentPlanDetailsListItem.label"
                                     :key="itemPaymentPlanDetailsListItem.prop"
                                     sortable="custom">
                    </el-table-column>
                </data-tables>
            </div>
        </b-modal>
        <b-modal id="newAddItemModal" size="lg" title="Add Item" ok-only ok-variant="secondary"
                 hide-footer ref="newAddItemShowModal">
            <div class="row ml-2 mr-2">
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 mb3">
                    <label>* Item</label>
                    <el-select v-model="ddlAddItem" class="fullwidth" @change="onchangeAddItem()" data-v-step="aimodal01">
                        <el-option v-for="item in addItemList" v-bind:value="item.OPTvalue.trim()">{{
                            item.OPTvalue.trim() }}
                        </el-option>
                    </el-select>
                    <div><label></label></div>
                    <input type="text" v-show="isInputAddItemDirect" class="form-control" v-model="inputAddItemDirect">
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>* Payment Date</label>
                    <div class="date">
                        <el-date-picker v-model="inputAddItemPaymentDate" format="dd/MM/yyyy" data-v-step="aimodal02"
                                        value-format="dd/MM/yyyy" type="date"
                                        placeholder="Pick a day"></el-date-picker>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>* Amount</label>
                    <input type="text" class="form-control" v-model="inputAddItemAmount" @keypress="onlyNumber" data-v-step="aimodal03">
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Currency</label>
                    <el-select v-model="ddlAddItemCurrency" class="fullwidth">
                        <el-option v-for="item in addItemCurrencyList" v-bind:value="item.OPTvalue.trim()">{{
                            item.OPTvalue.trim() }}
                        </el-option>
                    </el-select>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>* Payment Schedule</label>
                    <el-select v-model="ddlAddItemPaymentSchedule" class="fullwidth"
                               @change="onchangeAddItemPaymentSchedule()" data-v-step="aimodal04">
                        <el-option v-for="item in addItemPaymentScheduleList" v-bind:value=" item.OPTvalue.trim()">{{
                            item.OPTvalue.trim() }}
                        </el-option>
                    </el-select>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>* Payment Item Type</label>
                    <el-select v-model="ddlAddItemPaymentItemType" class="fullwidth" data-v-step="aimodal05">
                        <el-option v-for="item in addItemPaymentItemTypeList" v-bind:value="item.OPTvalue.trim()">{{
                            item.OPTvalue.trim() }}
                        </el-option>
                    </el-select>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label><span v-show="isRecurringRequired">* </span>Recurring</label>
                    <el-select v-model="ddlAddItemRecurring" class="fullwidth" :disabled="disabledRecurring">
                        <el-option v-for="item in addItemRecurringList" v-bind:value="item.OPTvalue.trim()">{{
                            item.OPTvalue.trim() }}
                        </el-option>
                    </el-select>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Description</label>
                    <input type="text" class="form-control" v-model="inputAddItemDescription"
                           :disabled="disableOneTime">
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
                <div class="col-lg-6" data-v-step="aimodal06">
                    <button v-on:click="saveItemClick()"
                            class="btn btn-primary waves-effect waves-light float-right">Add
                    </button>
                </div>

                <v-tour name="aiModalTourName" :steps="aiModalTourSteps" :options="MasterPageTourOptions"
                        :callbacks="aiModalTourCallbacks">
                    <template slot-scope="tour">
                        <transition name="fade">
                            <v-step
                                    v-if="tour.currentStep === index"
                                    v-for="(step, index) of tour.steps"
                                    :key="index"
                                    :step="step"
                                    :previous-step="tour.previousStep"
                                    :next-step="tour.nextStep"
                                    :stop="tour.stop"
                                    :is-first="tour.isFirst"
                                    :is-last="tour.isLast"
                                    :labels="tour.labels"
                            >
                                <template v-if="tour.currentStep === 0">
                                    <div slot="actions">
                                        <button @click="backToInvModalAITour()" class="v-step__button">Previous</button>
                                        <button @click="tour.nextStep" class="v-step__button">Next</button>
                                    </div>
                                </template>
                                <template v-if="tour.currentStep === 5">
                                    <div slot="actions">
                                        <button class="v-step__button" @click="tour.previousStep">Previous</button>
                                        <button class="v-step__button" @click="aiModalTourStop()">Finish</button>
                                    </div>
                                </template>
                            </v-step>
                        </transition>
                    </template>
                </v-tour>

            </div>
        </b-modal>
        <b-modal id="creditNoteModal" size="lg" title="Credit Note" ok-only ok-variant="secondary" hide-footer
                 ref="creditNoteModal">
            <div class="row ml-2 mr-2">
                <div><h5>History Detail</h5></div>
                <div class="col-lg-12">
                    <div v-if="studentReceiptGenerationByTransactionHistoryListInt.length>0" class="datatable_group">
                        <data-tables :data="studentReceiptGenerationByTransactionHistoryListInt">
                            <el-table-column v-for="item in studentReceiptGenerationByTransactionHistoryList"
                                             :prop="item.prop"
                                             :label="item.label" :key="item.prop">
                            </el-table-column>
                        </data-tables>
                    </div>
                    <br>
                    <div v-if="studentReceiptLeftOverPaymentListInt.length>0" class="datatable_group">
                        <data-tables :data="studentReceiptLeftOverPaymentListInt" @selection-change="changeSelection"
                                     data-v-step="cr01" v-bind:class="{divBorderClass:studentCreditNoteListAreaBorder}">
                                     ref="ReceiptGenerationByTransactionHistoryTable">
                            <el-table-column type="selection" width="55" :reserve-selection="false">
                            </el-table-column>
                            <el-table-column v-for="item in studentReceiptLeftOverPaymentList" :prop="item.prop"
                                             :label="item.label" :key="item.prop">
                            </el-table-column>
                        </data-tables>
                    </div>
                    <br>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 mb3">
                    <label>Remarks *</label>
                    <b-form-textarea rows="3" class="textArea" v-model="taCnRemarks" placeholder="Please enter comment"
                                     :state="taCnRemarks.length >=1" data-v-step="cr02"></b-form-textarea>
                </div>
                <div class="col-lg-12">
                    <button v-on:click="generateCNClick()" data-v-step="cr03"
                            class="btn btn-primary waves-effect waves-light float-right">Generate CN
                    </button>
                </div>

                <v-tour name="cnModalTourName" :steps="CnModalTourSteps" :options="MasterPageTourOptions"
                        :callbacks="CnModalTourCallbacks">
                    <template slot-scope="tour">
                        <transition name="fade">
                            <v-step
                                    v-if="tour.currentStep === index"
                                    v-for="(step, index) of tour.steps"
                                    :key="index"
                                    :step="step"
                                    :previous-step="tour.previousStep"
                                    :next-step="tour.nextStep"
                                    :stop="tour.stop"
                                    :is-first="tour.isFirst"
                                    :is-last="tour.isLast"
                                    :labels="tour.labels"
                            >
                                <template v-if="tour.currentStep === 0">
                                    <div slot="actions">
                                        <button @click="backToMasterCNPageTour()" class="v-step__button">Previous</button>
                                        <button @click="tour.nextStep" class="v-step__button">Next</button>
                                    </div>
                                </template>
                                <template v-if="tour.currentStep === 2">
                                    <div slot="actions">
                                        <div slot="actions">
                                            <button @click="tour.previousStep" class="v-step__button">Previous</button>
                                            <button @click="cnModalTourStop()" class="v-step__button">Finish</button>
                                        </div>
                                    </div>
                                </template>
                            </v-step>
                        </transition>
                    </template>
                </v-tour>

            </div>
        </b-modal>
        <b-modal id="generateReceiptModal" size="xl" title="Generate Receipt" ok-only ok-variant="secondary" hide-footer
                 ref="generateReceiptModal">
            <h5 class="text-left payment-title">RECEIPTS</h5>
            <div class="row mt-3">
                <div class="col-lg-6 ">
                    <label>Payment Mode</label>
                    <select v-model="ddlPaymentMode" v-on:click="validatePaymentMode()" data-v-step="grmodal01"
                            class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in paymentModeList" v-bind:value="item.OPTvalue.trim()">{{
                            item.OPTvalue.trim() }}
                        </option>
                    </select>
                </div>
                <div class="col-lg-6" v-if="this.ddlPaymentMode!='CASH'">
                    <label>Cheque/DD No & Bank Name</label>
                    <input type="text" class="form-control" v-model="inputChequeNoBankName" data-v-step="grmodal02">
                </div>
                <div class="col-lg-6">
                    <label>Receipt Date</label>
                    <div class="date">
                        <el-date-picker v-model="inputReceiptDate" format="dd/MM/yyyy"
                                        value-format="dd/MM/yyyy" type="date"
                                        placeholder="Pick a day" disabled></el-date-picker>
                    </div>
                </div>
                <div class="col-lg-6">
                    <label>Remarks</label>
                    <input type="text" class="form-control" v-model="inputRemarks" data-v-step="grmodal03">
                </div>
                <div class="col-lg-6">
                    <el-checkbox v-model="requiredInvoice" label="Does this receipt required Invoice??"
                                 class="float-left" data-v-step="grmodal04"></el-checkbox>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12 actionDiv mb-3">
                    <el-button-group>
                        <el-button type="primary" variant="primary" v-on:click="addItemClick()">
                            Add Item
                        </el-button>
                    </el-button-group>
                </div>
                <div v-if="studentReceiptGenerationListInt.length>0" class="datatable_group col-lg-12"
                     v-bind:class="{divBorderClass:studentReceiptListAreaBorder}">
                    <data-tables :data="studentReceiptGenerationListInt" @selection-change="changeSelection" data-v-step="grmodal05"
                                 :action-col="studentReceiptItemListAction"
                                 ref="receiptGenerationTable">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column v-for="item in studentReceiptGenerationList" :prop="item.prop"
                                         :label="item.label" :key="item.prop">
                        </el-table-column>
                        <el-table-column label="Pay Amount" min-width="100px">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.newPayAmount" type="number"
                                          placeholder="Amount"></el-input>
                            </template>
                        </el-table-column>
                    </data-tables>
                </div>
            </div>
            <div class="row actionDiv">
                <div class="col-lg-6">
                    <b-btn @click="closeModal" class="float-left btn-secondary">Cancel</b-btn>
                </div>
                <div class="col-lg-6">
                    <el-button-group>
                        <el-button type="primary" v-on:click="previewReceiptClick()">
                            <span data-v-step="grmodal06">Preview</span>
                        </el-button>
                        <el-button type="primary" v-on:click="generateReceiptClick('AdhocReceipt')">
                            <span data-v-step="grmodal07">Generate</span>
                        </el-button>
                    </el-button-group>
                </div>

                <v-tour name="grModalTourName" :steps="grModalTourSteps"
                        :options="MasterPageTourOptions" :callbacks="grModalTourCallbacks">
                    <template slot-scope="tour">
                        <transition name="fade">
                            <v-step
                                    v-if="tour.currentStep === index"
                                    v-for="(step, index) of tour.steps"
                                    :key="index"
                                    :step="step"
                                    :previous-step="tour.previousStep"
                                    :next-step="tour.nextStep"
                                    :stop="tour.stop"
                                    :is-first="tour.isFirst"
                                    :is-last="tour.isLast"
                                    :labels="tour.labels"
                            >
                                <template v-if="tour.currentStep === 0">
                                    <div slot="actions">
                                        <button @click="backToMasterPageTour()" class="v-step__button">Previous</button>
                                        <button v-if="ddlPaymentMode!=='CASH'" @click="tour.nextStep" class="v-step__button">Next</button>
                                        <button v-else @click="RecModalGRTourNextSteps()" class="v-step__button">Next</button>
                                    </div>
                                </template>

                                <template v-if="tour.currentStep === 6">
                                    <div slot="actions">
                                        <button @click="tour.previousStep" class="v-step__button">Previous</button>
                                        <button @click="grModalTourStop()" class="v-step__button">Finish</button>
                                    </div>
                                </template>

                            </v-step>
                        </transition>
                    </template>
                </v-tour>
                <v-tour name="grModalTourCuztomizeName" :steps="grModalTourCuztomizeSteps"
                        :options="MasterPageTourOptions" :callbacks="grModalTourCuztomizeCallbacks">
                    <template slot-scope="tour">
                        <transition name="fade">
                            <v-step
                                    v-if="tour.currentStep === index"
                                    v-for="(step, index) of tour.steps"
                                    :key="index"
                                    :step="step"
                                    :previous-step="tour.previousStep"
                                    :next-step="tour.nextStep"
                                    :stop="tour.stop"
                                    :is-first="tour.isFirst"
                                    :is-last="tour.isLast"
                                    :labels="tour.labels"
                            >
                                <template v-if="tour.currentStep === 0">
                                    <div slot="actions">
                                        <button @click="backToMasterPageTour()" class="v-step__button">Previous</button>
                                        <button @click="tour.nextStep" class="v-step__button">Next</button>
                                    </div>
                                </template>

                                <template v-if="tour.currentStep === 5">
                                    <div slot="actions">
                                        <button @click="tour.previousStep" class="v-step__button">Previous</button>
                                        <button @click="grModalTourStop()" class="v-step__button">Finish</button>
                                    </div>
                                </template>

                            </v-step>
                        </transition>
                    </template>
                </v-tour>

            </div>
        </b-modal>
        <b-modal id="generateInvoiceModal" size="xl" title="Generate Invoice" ok-only ok-variant="secondary" hide-footer
                 ref="generateInvoiceModal">
            <div class="row">
                <div class="col-lg-6">
                    <h5 class="text-left payment-title">INVOICING</h5>
                </div>

                <v-tour name="InvModalPPTourName" :steps="InvModalPPTourSteps" :options="MasterPageTourOptions"
                        :callbacks="InvModalPPTourCallbacks">
                    <template slot-scope="tour">
                        <transition name="fade">
                            <v-step
                                    v-if="tour.currentStep === index"
                                    v-for="(step, index) of tour.steps"
                                    :key="index"
                                    :step="step"
                                    :previous-step="tour.previousStep"
                                    :next-step="tour.nextStep"
                                    :stop="tour.stop"
                                    :is-first="tour.isFirst"
                                    :is-last="tour.isLast"
                                    :labels="tour.labels"
                            >
                                <template v-if="tour.currentStep === 0">
                                    <div slot="actions">
                                        <button @click="backToMasterPageTour()" class="v-step__button">Previous step</button>
                                        <button @click="tour.nextStep" class="v-step__button">Next step</button>
                                    </div>
                                </template>
                            </v-step>
                        </transition>
                    </template>
                </v-tour>
                <v-tour name="InvModalSDTourName" :steps="InvModalSDTourSteps" :options="MasterPageTourOptions"
                        :callbacks="InvModalSDTourCallbacks">
                    <template slot-scope="tour">
                        <transition name="fade">
                            <v-step
                                    v-if="tour.currentStep === index"
                                    v-for="(step, index) of tour.steps"
                                    :key="index"
                                    :step="step"
                                    :previous-step="tour.previousStep"
                                    :next-step="tour.nextStep"
                                    :stop="tour.stop"
                                    :is-first="tour.isFirst"
                                    :is-last="tour.isLast"
                                    :labels="tour.labels"
                            >
                                <template v-if="tour.currentStep === 0">
                                    <div slot="actions">
                                        <button @click="backToMasterPageTour()" class="v-step__button">Previous step</button>
                                        <button @click="tour.nextStep" class="v-step__button">Next step</button>
                                    </div>
                                </template>
                            </v-step>
                        </transition>
                    </template>
                </v-tour>
                <v-tour name="InvModalAITourName" :steps="InvModalAITourSteps" :options="MasterPageTourOptions"
                                 :callbacks="InvModalAITourCallbacks">
                <template slot-scope="tour">
                    <transition name="fade">
                        <v-step
                                v-if="tour.currentStep === index"
                                v-for="(step, index) of tour.steps"
                                :key="index"
                                :step="step"
                                :previous-step="tour.previousStep"
                                :next-step="tour.nextStep"
                                :stop="tour.stop"
                                :is-first="tour.isFirst"
                                :is-last="tour.isLast"
                                :labels="tour.labels"
                        >
                            <template v-if="tour.currentStep === 0">
                                <div slot="actions">
                                    <button @click="backToMasterPageTour()" class="v-step__button">Previous step</button>
                                    <button @click="tour.nextStep" class="v-step__button">Next step</button>
                                </div>
                            </template>
                        </v-step>
                    </transition>
                </template>
            </v-tour>
                <v-tour name="InvModalGITourName" :steps="InvModalGITourSteps" :options="MasterPageTourOptions"
                        :callbacks="InvModalGITourCallbacks">
                    <template slot-scope="tour">
                        <transition name="fade">
                            <v-step
                                    v-if="tour.currentStep === index"
                                    v-for="(step, index) of tour.steps"
                                    :key="index"
                                    :step="step"
                                    :previous-step="tour.previousStep"
                                    :next-step="tour.nextStep"
                                    :stop="tour.stop"
                                    :is-first="tour.isFirst"
                                    :is-last="tour.isLast"
                                    :labels="tour.labels"
                            >
                                <template v-if="tour.currentStep === 0">
                                    <div slot="actions">
                                        <button @click="backToMasterPageTour()" class="v-step__button">Previous</button>
                                        <button @click="tour.nextStep" class="v-step__button">Next</button>
                                    </div>
                                </template>
                                <template v-if="tour.currentStep === 2">
                                    <div slot="actions">
                                        <div slot="actions">
                                            <button @click="tour.previousStep" class="v-step__button">Previous</button>
                                            <button @click="tour.nextStep" class="v-step__button">Next</button>
                                        </div>
                                    </div>
                                </template>
                                <template v-if="tour.currentStep === 3">
                                    <div slot="actions">
                                        <div slot="actions">
                                            <button @click="tour.previousStep" class="v-step__button">Previous</button>
                                            <button @click="giModalTourStop()" class="v-step__button">Finish</button>
                                        </div>
                                    </div>
                                </template>
                            </v-step>
                        </transition>
                    </template>
                </v-tour>

<!--                dummy-->
                <div data-v-step="InvApp03"></div>
                <div data-v-step="InvSd04"></div>
                <div data-v-step="InvAi02"></div>
                <div data-v-step="InvGi05"></div>
<!--                dummy-->

                <div class="col-lg-6">
                    <el-checkbox v-model="cbPrintMonthlyBreakdown" label="Print monthly breakdown" border
                                 data-v-step="InvGi01" class="float-right"></el-checkbox>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-lg-6">
                    <div class="date">
                        <label>* Payment Due Date</label>
                        <el-date-picker data-v-step="InvApp01"
                                        v-model="inputPaymentDueDate" format="dd/MM/yyyy"
                                        value-format="dd/MM/yyyy" type="date"
                                        placeholder="Pick a day"></el-date-picker>
                    </div>

                </div>
                <div class="col-lg-6 ">
                    <label>Remarks</label>
                    <input data-v-step="InvSd02" type="text" class="form-control" v-model="inputRemarks">
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12 actionDiv mb-3">
                    <el-button-group>
                        <el-button type="primary" variant="primary" v-on:click="showDiscountPlanClick()" data-v-step="InvSd03"
                                   v-if="isSiblingDiscountEligible||isStaffDiscountEligible">
                            Apply Discount plan
                        </el-button>
                        <el-button type="primary" variant="primary" v-on:click="applyPaymentPlanClick()" data-v-step="InvApp02">
                            Apply Payment Plan
                        </el-button>
                        <el-button type="primary" variant="primary" v-on:click="addItemClick()" data-v-step="InvAi01">
                            Add Item
                        </el-button>
                    </el-button-group>
                </div>
                <div v-if="InvoiceOverPaymentItemInt.length>0" class="datatable_group col-lg-12">
                    <label>Over Payment</label>
                    <data-tables :data="InvoiceOverPaymentItemInt">
                        <el-table-column v-for="item in InvoiceOverPaymentItemList" :prop="item.prop"
                                         :label="item.label" :key="item.prop">
                        </el-table-column>
                    </data-tables>
                </div>
                    <div v-if="studentInvoiceGenerationListInt.length>0" class="datatable_group col-lg-12" data-v-step="InvGi02"
                         v-bind:class="{divBorderClass:studentInvoiceListAreaBorder}">
                    <data-tables :data="studentInvoiceGenerationListInt" @selection-change="changeSelection"
                                 :action-col="studentInvoiceItemListAction"
                                 ref="invoiceGenerationTable">
                        <el-table-column type="selection" width="55" :selectable="canSelectRow">
                        </el-table-column>
                        <el-table-column v-for="item in studentInvoiceGenerationList" :prop="item.prop"
                                         :label="item.label" :key="item.prop" >
                        </el-table-column>
                        <el-table-column label="GST Value" min-width="80px">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.newGSTAmount" type="number"
                                          v-on:change="updateTotalClick(scope.row.newGSTAmount,scope.row.SPPD_PaymentAmount,scope.row)"
                                          :min="adjustmentMin(scope.row.SPPD_GstValue)"
                                          :max="adjustmentMax(scope.row.SPPD_GstValue)"
                                          :step="0.01" placeholder="GST"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="Total Amount" min-width="80px">
                            <template slot-scope="scope">
                                {{scope.row.SPPD_TotalValue}}
                            </template>
                        </el-table-column>
                    </data-tables>
                </div>
            </div>
            <div class="row actionDiv">
                <div class="col-lg-6">
                    <b-btn @click="closeModal" class="float-left btn-secondary">Cancel</b-btn>
                </div>
                <div class="col-lg-6">
                    <el-button-group>
                        <el-button type="primary" v-on:click="previewInvoiceClick()" data-v-step="InvGi03">
                            <span>Preview</span>
                        </el-button>
                        <el-button type="primary" v-on:click="generateInvoiceClick('')" data-v-step="InvGi04">
                            <span>Generate</span>
                        </el-button>
                    </el-button-group>
                </div>
            </div>
        </b-modal>
        <b-modal id="showGenerateReceiptByHistoryModal" size="xl"
                 title="Generate Receipt Detail(With Transaction History)" ok-only ok-variant="secondary" hide-footer
                 ref="showGenerateReceiptByHistoryModal">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div><h5>Transaction History Detail</h5></div>
                <div v-if="studentReceiptGenerationByTransactionHistoryListInt.length>0" class="datatable_group">
                    <data-tables :data="studentReceiptGenerationByTransactionHistoryListInt"
                                 ref="ReceiptGenerationByTransactionHistoryTable">
                        <el-table-column v-for="item in studentReceiptGenerationByTransactionHistoryList"
                                         :prop="item.prop"
                                         :label="item.label" :key="item.prop">
                        </el-table-column>
                    </data-tables>
                </div>
                <br>
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
                                <el-input v-model="scope.row.newPayAmount" type="number"
                                          placeholder="Amount"></el-input>
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
                            class="form-control pro-edt-select form-control-primary">
                        <option v-for="item in paymentModeList" v-bind:value="item.OPTvalue.trim()">{{
                            item.OPTvalue.trim() }}
                        </option>
                    </select>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" v-if="ddlPaymentMode!='CASH'">
                    <label>Cheque/DD No & Bank Name</label>
                    <input type="text" class="form-control" v-model="inputChequeNoBankName">
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>Receipt Date *</label>
                    <div class="date">
                        <el-date-picker v-model="inputReceiptDate" format="dd/MM/yyyy"
                                        value-format="dd/MM/yyyy" type="date"
                                        placeholder="Pick a day" disabled></el-date-picker>
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
        <b-modal id="showReInvoiceModal" size="lg" title="Re-Invoice" ok-only ok-variant="secondary" ok-title="Cancel"
                 ref="showReInvoiceModal">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="col-lg-12 actionDiv">
                        <el-button-group>
                            <el-button type="primary" variant="primary" v-on:click="addItemClick()">
                                Add Item
                            </el-button>
                        </el-button-group>
                    </div>
                    <div v-if="ReInvoiceListInt.length>0">
                        <data-tables :data="ReInvoiceListInt" @selection-change="changeSelection">
                            <el-table-column type="selection" width="55">
                            </el-table-column>
                            <el-table-column v-for="item in ReInvoiceList" :prop="item.prop"
                                             :label="item.label" :key="item.prop"
                                             sortable="custom">
                            </el-table-column>
                            <el-table-column label="Pay Amount(Included GST)" min-width="100px">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.newPayAmount" type="number"
                                              placeholder="Amount"></el-input>
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
                                                placeholder="Pick a day"></el-date-picker>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <!--<label>Letterhead (Hong Kong only):</label>-->
                            <!--                            <label>-->
                            <!--                                <input type="checkbox" class="form-control" v-model="cbPrintMonthlyBreakdown">-->
                            <!--                                Print monthly breakdown-->
                            <!--                                <span>-->
                            <!--                                    <span>-->
                            <!--                                        <svg class="checkmark" viewBox="0 0 24 24"><path class="checkmark-path"-->
                            <!--                                                                                         fill="none" stroke="white"-->
                            <!--                                                                                         d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg>-->
                            <!--                                    </span>-->
                            <!--                                </span>-->
                            <!--                            </label>-->
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label>Remarks</label>
                            <input type="text" class="form-control" v-model="inputRemarks">
                        </div>
                        <div class="col-lg-12 actionDiv">
                            <el-button-group>
                                <el-button type="primary" variant="primary"
                                           v-on:click="previewInvoiceClick('reinvoice')">
                                    <b><h5>Preview</h5></b>
                                </el-button>
                            </el-button-group>
                            <el-button-group>
                                <el-button type="primary" variant="primary"
                                           v-on:click="generateInvoiceClick('reinvoice')">
                                    <b><h5>Generate</h5></b>
                                </el-button>
                            </el-button-group>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>
        <b-modal id="showOverPaymentConfirmationModal" size="sm" hide-footer title="OVERPAYMENT"
                 ref="showOverPaymentConfirmationModal">
            <div class="d-block text-center">
                <h3>There are {{overPaymentItemsCount}} overpayment items in your selection! Proceed?</h3>
            </div>
            <b-button class="mt-2" variant="success" block v-on:click="overPaymentClick('Yes')">Yes</b-button>
            <b-button class="mt-2" variant="danger" block v-on:click="overPaymentClick('No')">No</b-button>
        </b-modal>
        <b-modal id="showPaymentReminderModal" size="lg" title="" ok-only ok-variant="secondary" ok-title="Cancel"
                 ref="showPaymentReminderModal">
            <label>{{ lblPaymentReminder }} Payment Reminder</label> <br>

            <div class="row ml-1 mr-1">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label>Email To:</label>
                    <input type="text" class="form-control" v-model="inputEmailTo">
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label>Title</label>
                    <input type="text" class="form-control" v-model="inputEmailSubject">
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label>Description</label>
                    <textarea rows="12" class="form-control" v-model="inputEmailMessage" placeholder="Enter something..."></textarea>
                </div>
            </div>

            <div>
                <button v-on:click="sendEmailReminderClick()"
                        class="btn btn-primary waves-effect waves-light float-right">Send
                </button>
            </div>

        </b-modal>
        <b-modal id="viewRefundModal" size="xl" title="Refund" ok-only ok-variant="secondary"
                 ok-title="Cancel" ref="viewRefundModal">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div v-if="refundListInt.length>0" class="datatable_group col-lg-12">
                        <data-tables :data="refundListInt" ref="refundGenerationTable"
                                     data-v-step="rf01"
                                     v-bind:class="{divBorderClass:studentRefundListAreaBorder}"
                                     @selection-change="changeSelection">
                            <el-table-column type="selection" width="55">
                            </el-table-column>
                            <el-table-column v-for="item in refundList" min-width="50px"
                                             :prop="item.prop"
                                             :label="item.label" :key="item.prop"
                                             sortable="custom">
                            </el-table-column>
                            <el-table-column label="Refund Amount" min-width="35px">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.newRefundAmount" type="number"
                                              placeholder="Amount"></el-input>
                                </template>
                            </el-table-column>
                        </data-tables>

                        <div class="row">
                            <div class="col-lg-1">*Remarks</div>
                            <div class="col-lg-12"><el-input data-v-step="rf02" type="text" v-model="inputRefundRemarks"></el-input></div>
                            <div class="col-lg-2">
                                <el-button-group>
                                    <el-button type="primary" v-on:click="generateRefundClick()">
                                        <span data-v-step="rf03">Refund!</span>
                                    </el-button>
                                </el-button-group>
                            </div>
                        </div>
                    </div>
                </div>

                <v-tour name="rfModalTourName" :steps="rfModalTourSteps"
                        :options="MasterPageTourOptions" :callbacks="rfModalTourCallbacks">
                    <template slot-scope="tour">
                        <transition name="fade">
                            <v-step
                                    v-if="tour.currentStep === index"
                                    v-for="(step, index) of tour.steps"
                                    :key="index"
                                    :step="step"
                                    :previous-step="tour.previousStep"
                                    :next-step="tour.nextStep"
                                    :stop="tour.stop"
                                    :is-first="tour.isFirst"
                                    :is-last="tour.isLast"
                                    :labels="tour.labels"
                            >
                                <template v-if="tour.currentStep === 0">
                                <div slot="actions">
                                    <button @click="backToMasterPageTour()" class="v-step__button">Previous</button>
                                    <button @click="tour.nextStep" class="v-step__button">Next</button>
                                </div>
                                </template>

                                <template v-if="tour.currentStep === 2">
                                    <div slot="actions">
                                        <button @click="tour.previousStep" class="v-step__button">Previous</button>
                                        <button @click="rfModalTourStop()" class="v-step__button">Finish</button>
                                    </div>
                                </template>

                            </v-step>
                        </transition>
                    </template>
                </v-tour>

            </div>
        </b-modal>
        <b-modal id="showSiblingConfirmationModal" hide-footer title="Sibling Found" size="sm"
                 ref="showSiblingConfirmationModal">
            <div class="d-block text-center">
                <h3>There are {{siblingItemsCount}} siblings items in your selection! Proceed?</h3>
            </div>
            <b-button class="mt-2" variant="success" block v-on:click="SiblingConfirmationClick('Yes')">Yes</b-button>
            <b-button class="mt-2" variant="danger" block v-on:click="SiblingConfirmationClick('No')">No</b-button>
        </b-modal>

        <v-tour name="MasterPageTourName" :steps="MasterPageTourSteps" :options="MasterPageTourOptions" :callbacks="MasterPageTourCallbacks">
            <template slot-scope="tour">
                <transition name="fade">
                    <v-step
                            v-if="tour.currentStep === index"
                            v-for="(step, index) of tour.steps"
                            :key="index"
                            :step="step"
                            :previous-step="tour.previousStep"
                            :next-step="tour.nextStep"
                            :stop="tour.stop"
                            :is-first="tour.isFirst"
                            :is-last="tour.isLast"
                            :labels="tour.labels"
                    >
                        <template v-if="tour.currentStep === 0">
                            <div slot="actions">
                                <button @click="stopTour()" class="v-step__button">Skip Tour</button>
                                <button @click="sppTourNextSteps()" class="v-step__button">Next step</button>
                            </div>
                        </template>
                    </v-step>
                </transition>
            </template>
        </v-tour>
        <v-tour name="MasterPageGRTourName" :steps="MasterPageGRTourSteps" :options="MasterPageTourOptions" :callbacks="MasterPageGRTourCallbacks">
            <template slot-scope="tour">
                <transition name="fade">
                    <v-step
                            v-if="tour.currentStep === index"
                            v-for="(step, index) of tour.steps"
                            :key="index"
                            :step="step"
                            :previous-step="tour.previousStep"
                            :next-step="tour.nextStep"
                            :stop="tour.stop"
                            :is-first="tour.isFirst"
                            :is-last="tour.isLast"
                            :labels="tour.labels"
                    >
                        <template v-if="tour.currentStep === 0">
                            <div slot="actions">
                                <button @click="stopTour()" class="v-step__button">Skip Tour</button>
                                <button @click="sppTourNextSteps()" class="v-step__button">Next step</button>
                            </div>
                        </template>
                    </v-step>
                </transition>
            </template>
        </v-tour>
        <v-tour name="MasterPageCNTourName" :steps="MasterPageCNTourSteps" :options="MasterPageTourOptions" :callbacks="MasterPageCNTourCallbacks">
            <template slot-scope="tour">
                <transition name="fade">
                    <v-step
                            v-if="tour.currentStep === index"
                            v-for="(step, index) of tour.steps"
                            :key="index"
                            :step="step"
                            :previous-step="tour.previousStep"
                            :next-step="tour.nextStep"
                            :stop="tour.stop"
                            :is-first="tour.isFirst"
                            :is-last="tour.isLast"
                            :labels="tour.labels"
                    >
                        <template v-if="tour.currentStep === 0">
                            <div slot="actions">
                                <button @click="stopTour()" class="v-step__button">Skip Tour</button>
                                <button @click="MasterPageCNTourNextSteps()" class="v-step__button">Next step</button>
                            </div>
                        </template>
                    </v-step>
                </transition>
            </template>
        </v-tour>
        <v-tour name="MasterPageRFTourName" :steps="MasterPageRFTourSteps" :options="MasterPageTourOptions" :callbacks="MasterPageRFTourCallbacks">
            <template slot-scope="tour">
                <transition name="fade">
                    <v-step
                            v-if="tour.currentStep === index"
                            v-for="(step, index) of tour.steps"
                            :key="index"
                            :step="step"
                            :previous-step="tour.previousStep"
                            :next-step="tour.nextStep"
                            :stop="tour.stop"
                            :is-first="tour.isFirst"
                            :is-last="tour.isLast"
                            :labels="tour.labels"
                    >
                        <template v-if="tour.currentStep === 0">
                            <div slot="actions">
                                <button @click="tour.stop" class="v-step__button">Skip Tour</button>
                                <button @click="MasterPageRFTourNextSteps()" class="v-step__button">Next step</button>
                            </div>
                        </template>
                    </v-step>
                </transition>
            </template>
        </v-tour>
        <div data-v-step="app02"></div>
        <div data-v-step="gr02"></div>

    </div>
</template>
<script>
    import $ from 'jquery';
    import DataSource from "../data/datasource";
    import VueTour from 'vue-tour';
    import Vue from 'vue';
    require('vue-tour/dist/vue-tour.css');
    Vue.use(VueTour);

    export default {
        name: "StudentPaymentPlan",
        data() {
            return {
                familyNumber:'',
                parentListTableInt:[],
                parentListTable:[{
                    prop: "PAR_Father_FirstName",
                    label: "Father Name"
                }, {
                    prop: "PAR_Father_Email",
                    label: "Father Email"
                }, {
                    prop: "PAR_Mother_FirstName",
                    label: "Mother Name"
                },{
                    prop: "PAR_Mother_Email",
                    label: "Mother Email"
                }],
                //Tour Guide: start
                TourOptions: [{
                    value: 'pp',
                    label: 'apply payment plan tour'
                }, {
                    value: 'sd',
                    label: 'sibling/staff discount tour'
                }, {
                    value: 'items',
                    label: 'add items tour'
                }, {
                    value: 'gi',
                    label: 'generate invoice tour'
                }, {
                    value: 'gr',
                    label: 'generate receipt tour'
                },{
                    value: 'cn',
                    label: 'generate credit note tour'
                },{
                    value: 'rf',
                    label: 'Refund Tour'
                 }],
                TourRefundFlag:[],
                TourGenerateCNFlag:[],
                studentInvoiceListAreaBorder: false,
                studentReceiptListAreaBorder: false,
                studentLeftOverPaymentListAreaBorder: false,
                studentCreditNoteListAreaBorder: false,
                studentRefundListAreaBorder: false,
                tourPageControl:'',

                MasterPageTourOptions: {
                    useKeyboardNavigation: true,
                    labels: {
                        buttonSkip: 'Skip tour',
                        buttonPrevious: 'Previous',
                        buttonNext: 'Next',
                        buttonStop: 'Finish'
                    }
                },

                MasterPageTourCallbacks: {
                    onNextStep: this.sppTourNextSteps,
                    onPreviousStep: this.sppTourPreviousSteps
                },
                MasterPageGRTourCallbacks: {
                    onNextStep: this.sppTourNextSteps,
                    onPreviousStep: this.sppTourPreviousSteps
                },
                MasterPageTourSteps:[{
                    target: '[data-v-step="app01"]',
                    content: `<div>Click invoice button</div>`,
                    params: {
                        placement: 'top'
                    }
                }],
                MasterPageGRTourSteps:[{
                    target: '[data-v-step="gr01"]',
                    content: `<div>Click receipt button</div>`,
                    params: {
                        placement: 'top'
                    }
                }],

                MasterPageCNTourSteps:[{
                    target: '[data-v-step="gcn01"]',
                    content: `<div>Click generate credit note button</div>`,
                    params: {
                        placement: 'top'
                    }
                }],
                MasterPageCNTourCallbacks:{
                    onNextStep: this.MasterPageCNTourNextSteps,
                    onPreviousStep: this.InvModalPPTourPreviousSteps,
                },

                CnModalTourSteps:[{
                    target: '[data-v-step="cr01"]',
                    content: `<div>Step 1 / 3 <br>Select at least 1 items in list above</div>`,
                    params: {
                        placement: 'bottom'
                    }
                }, {
                    target: '[data-v-step="cr02"]',
                    content: `<div>Step 2 / 3 <br>enter remark</div>`,
                    params: {
                        placement: 'bottom'
                    }
                },{
                    target: '[data-v-step="cr03"]',
                    content: `<div>Step 2 / 3 <br>Click CN button</div>`,
                    params: {
                        placement: 'bottom'
                    }
                }],
                CnModalTourCallbacks:{
                    onNextStep: this.CNModalTourNextSteps,
                    onPreviousStep: this.CNModalTourPreviousSteps,
                },

                InvModalPPTourSteps:[
                    {
                    target: '[data-v-step="InvApp02"]',
                    content:  `<div>Step 2 <br> Click apply payment plan</div>`,
                    params: {
                        placement: 'top'
                    }
                },{
                    target: '[data-v-step="InvApp03"]',
                    content: 'OK',
                    params: {
                        placement: 'top'
                    }
                }],
                InvModalPPTourCallbacks:{
                    onNextStep: this.InvModalPPTourNextSteps,
                    onPreviousStep: this.InvModalPPTourPreviousSteps,
                },
                InvModalSDTourSteps:[
                    {
                    target: '[data-v-step="InvSd03"]',
                    content: 'Click on Apply discount plan',
                    params: {
                        placement: 'bottom'
                    }
                }, {
                    target: '[data-v-step="InvSd04"]',
                    content: 'OK',
                    params: {
                        placement: 'top'
                    }
                }],
                InvModalSDTourCallbacks:{
                    onNextStep: this.InvModalSDTourNextSteps,
                    onPreviousStep: this.InvModalSDTourPreviousSteps,
                },
                InvModalAITourSteps:[{
                    target: '[data-v-step="InvAi01"]',
                    content: 'Click on Add Item button',
                    params: {
                        placement: 'bottom'
                    }
                }, {
                    target: '[data-v-step="InvAi02"]',
                    content: 'OK',
                    params: {
                        placement: 'top'
                    }
                }],
                InvModalAITourCallbacks:{
                    onNextStep: this.InvModalAITourNextSteps,
                    onPreviousStep: this.InvModalAITourPreviousSteps,
                },
                InvModalGITourSteps:[
                    {
                        target: '[data-v-step="InvGi01"]',
                        content: 'If you need the invoice breakdown, please check here. *****Only eligible for course fees item*****',
                        params: {
                            placement: 'bottom'
                        }
                    }, {
                        target: '[data-v-step="InvGi02"]',
                        content: 'Please check at least 1 items in table below, you can adjust $0.01 up/down to overcome the rounding issue',
                        params: {
                            placement: 'top'
                        }
                    },{
                        target: '[data-v-step="InvGi03"]',
                        content: 'Preview the items before generate invoice',
                        params: {
                            placement: 'top'
                        }
                    },{
                        target: '[data-v-step="InvGi04"]',
                        content: 'Click on generate invoice',
                        params: {
                            placement: 'top'
                        }
                    }],
                InvModalGITourCallbacks:{
                    onNextStep: this.InvModalGITourNextSteps,
                    onPreviousStep: this.InvModaGITourPreviousSteps,
                    },
                ppModalTourSteps:[{
                    target: '[data-v-step="ppBmodal01"]',
                    content: 'Select payment plan',
                    params: {
                        placement: 'bottom'
                    }
                },{
                    target: '[data-v-step="ppBmodal02"]',
                    content: 'Check/View payment plan',
                    params: {
                        placement: 'top'
                    }
                },{
                    target: '[data-v-step="ppBmodal03"]',
                    content: 'Here you go!',
                    params: {
                        placement: 'bottom'
                    }
                }],

                grModalTourSteps:[{
                    target: '[data-v-step="grmodal01"]',
                    content: `<div>Step 1 / 7 <br> Select payment mode</div>`,
                    params: {
                        placement: 'right'
                    }
                },{
                    target: '[data-v-step="grmodal02"]',
                    content: `<div>Step 2 / 7 <br> Please update your cheque detail here if available</div>`,
                    params: {
                        placement: 'top'
                    }
                },{
                    target: '[data-v-step="grmodal03"]',
                    content: `<div>Step 3 / 7 <br> Enter remark(Optional)</div>`,
                    params: {
                        placement: 'bottom'
                    }
                },{
                    target: '[data-v-step="grmodal04"]',
                    content: `<div>Step 4 / 7 <br> Select this checkbox, if you need to generate invoice together with your receipt.</div>`,
                    params: {
                        placement: 'top'
                    }
                },{
                    target: '[data-v-step="grmodal05"]',
                    content: `<div>Step 5 / 7 <br> Select items to generate/preview receipt and key in your pay amount according.</div>`,
                    params: {
                        placement: 'left'
                    }
                },{
                    target: '[data-v-step="grmodal06"]',
                    content: `<div>Step 6 / 7 <br> Preview receipt</div>`,
                    params: {
                        placement: 'right'
                    }
                },{
                    target: '[data-v-step="grmodal07"]',
                    content: `<div>Step 7 / 7 <br> Click on generate, OK </div>`,
                    params: {
                        placement: 'right'
                    }
                }],
                grModalTourCuztomizeSteps:[{
                    target: '[data-v-step="grmodal03"]',
                    content: `<div>Step 3 / 7 <br> Enter remark(Optional)</div>`,
                    params: {
                        placement: 'bottom'
                    }
                },{
                    target: '[data-v-step="grmodal04"]',
                    content: `<div>Step 4 / 7 <br> Select this checkbox, if you need to generate invoice together with your receipt.</div>`,
                    params: {
                        placement: 'top'
                    }
                },{
                    target: '[data-v-step="grmodal05"]',
                    content: `<div>Step 5 / 7 <br> Select items to generate/preview receipt and key in your pay amount according.</div>`,
                    params: {
                        placement: 'right'
                    }
                },{
                    target: '[data-v-step="grmodal06"]',
                    content: `<div>Step 6 / 7 <br> Preview receipt</div>`,
                    params: {
                        placement: 'right'
                    }
                },{
                    target: '[data-v-step="grmodal07"]',
                    content: `<div>Step 7 / 7 <br> Click on generate, OK </div>`,
                    params: {
                        placement: 'left'
                    }
                }],
                grModalTourCallbacks:{
                    onNextStep: this.RecModalGRTourNextSteps,
                    onPreviousStep: this.RecModalGRTourPreviousSteps,
                },

                sdModalTourSteps:[{
                    target: '[data-v-step="sdmodal01"]',
                    content: 'Check sibling discount eligibility, else you cant apply discount',
                    params: {
                        placement: 'right'
                    }
                },{
                    target: '[data-v-step="sdmodal02"]',
                    content: 'Click here.',
                    params: {
                        placement: 'top'
                    }
                },{
                    target: '[data-v-step="sdmodal03"]',
                    content: 'Select rules',
                    params: {
                        placement: 'bottom'
                    }
                },{
                    target: '[data-v-step="sdmodal04"]',
                    content: 'Add Discount plan. Done!',
                    params: {
                        placement: 'top'
                    }
                }],

                aiModalTourSteps:[{
                    target: '[data-v-step="aimodal01"]',
                    content: 'Select items',
                    params: {
                        placement: 'top'
                    }
                },{
                    target: '[data-v-step="aimodal02"]',
                    content: 'Check payment date',
                    params: {
                        placement: 'top'
                    }
                },{
                    target: '[data-v-step="aimodal03"]',
                    content: 'Enter Amount',
                    params: {
                        placement: 'bottom'
                    }
                },{
                    target: '[data-v-step="aimodal04"]',
                    content: 'Select Payment Schedule',
                    params: {
                        placement: 'bottom'
                    }
                },{
                    target: '[data-v-step="aimodal05"]',
                    content: 'Select Payment Item Type',
                    params: {
                        placement: 'bottom'
                    }
                },{
                    target: '[data-v-step="aimodal06"]',
                    content: 'Click on Add button',
                    params: {
                        placement: 'right'
                    }
                }],
                aiModalTourCallbacks:{

                },
                ppModalTourCallbacks:{

                },
                sdModalTourCallbacks:{

                },
                grModalTourCuztomizeCallbacks:{
                    onNextStep: this.RecModalGRTourCuztomizeNextSteps,
                    onPreviousStep: this.RecModalGRTourCuztomizePreviousSteps,
                },

                MasterPageRFTourSteps:[{
                    target: '[data-v-step="rfMaster01"]',
                    content: 'Click on refund button',
                    params: {
                        placement: 'bottom'
                    }
                }],
                MasterPageRFTourCallbacks:{
                    onNextStep: this.MasterPageRFTourNextSteps,
                    onPreviousStep: this.MasterPageRFTourPreviousSteps,
                },
                rfModalTourSteps:[{
                    target: '[data-v-step="rf01"]',
                    content: 'Select at least 1 items below and check your refund amount',
                    params: {
                                placement: 'bottom'
                            }
                    },{
                    target: '[data-v-step="rf02"]',
                    content: 'Remark(Mandatory)',
                    params: {
                                placement: 'left'
                            }
                    },{
                    target: '[data-v-step="rf03"]',
                    content: 'Click on refund button',
                    params: {
                                placement: 'bottom'
                            }
                    }],
                rfModalTourCallbacks:{
                    onNextStep: this.rfModalTourNextSteps,
                    onPreviousStep: this.rfModalTourPreviousSteps,
                },
                //Tour Guide:end

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
                    label: "Registration Date"
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
                siblingListAction:{
                    label: 'Details',
                    props: {
                        align: 'center',
                    },
                    buttons: [{
                        props: {
                            type: 'primary',
                            icon: 'el-icon-more'
                        },
                        handler: row => {
                            this.$router.push('studentCourse-List?id=' + row.Student_ID);
                        },
                        label: 'More'
                    },]
                },

                //start:InvoiceOverPaymentItemInt
                invoiceOverPaymentResponse:[],
                InvoiceOverPaymentItemInt:[],
                InvoiceOverPaymentItemList:[{
                    prop: "SPPD_PayerName",
                    label: "Name"
                }, {
                    prop: "paymentDate",
                    label: "Payment Date"
                }, {
                    prop: "SPPD_PaymentAmount",
                    label: "Amount"
                },{
                    prop: "SPPD_TotalValue",
                    label: "Total Amount"
                }],
                //End:InvoiceOverPaymentItemInt

                //student info
                leftOverListCount: '',
                receiptListCount: '',
                countLeftOverTotalAmount: '',
                countReceiptTotalAmount: '',
                ReceiptList: [],

                inputStudentName: '-',
                inputCreatedBy: '',
                inputCreationDate: '',
                inputStudentStatus: '',
                inputStudentLevel: '',
                inputIntake: '',
                inputFromDate: '',
                inputToDate: '',
                inputStudentNO: '-',
                inputPayeeName: '-',
                inputMealPreferences: '-',
                sponsor_type: '',
                studentDetail: [],
                inputStudentClassBatch:'',
                //

                //Email
                invoiceNoForEmailReminder:'',
                emailReminderList:[],
                inputEmailTo:'',
                inputEmailSubject:'',
                inputEmailMessage:'',
                //Email End

                //temp
                lblPaymentReminder:'',
                readonly:'',
                tempList: '',
                btnDisabled: true,
                courseStatus: false,
                leftOverTemp: [],
                leftOverTempResp: [],
                overPaymentItemsCount: 0,
                isInvoiceLineItemDisabled:false,
                //Preview OR Generate
                overPaymentFlag: '',
                leftOverActionFlag:'',

                //For Credit Note
                cnInvoiceName: '',
                inputCNRemark: '',
                isChecked: true,
                //

                //get invoice name for receipt generation
                receiptInvoiceName:'',

                //For Reinvoice
                customizeReInvoiceResponce: [],
                isSelectable: false,
                reInvoiceName: '',
                Re_InvoiceName: '',
                //

                viewTransactionFlag: '',
                generateReceiptFlag: '',
                generateCNFlag: '',
                reinvoiceFlag: '',

                transactionObj: [],
                //Receipt
                payValue: '',
                inputNewPayAmount: '',
                respTempReceipt: [],
                customizeReceiptResponse: [],

                studentReceiptGenerationListInt: [],
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
                respTempInvoice: [],
                customizeInvoiceResponse: [],
                studentInvoiceGenerationListInt: [],
                studentInvoiceGenerationList: [{
                    prop: "SPPD_PayerName",
                    label: "Name"
                }, {
                    prop: "paymentDate",
                    label: "Payment Date"
                }, {
                    prop: "SPPD_PaymentAmount",
                    label: "Amount"
                }],
                //Invoice End

                studentReceiptLeftOverPaymentListInt: [],
                studentReceiptLeftOverPaymentList: [{
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

                studentReceiptGenerationByTransactionHistoryListInt: [],
                studentReceiptGenerationByTransactionHistoryList: [{
                    prop: "DocumentStatus",
                    label: "Docs Status"
                }, {
                    prop: "DocumentType",
                    label: "Docs Type"
                }, {
                    prop: "DocumentDate",
                    label: "Docs Date"
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
                    prop: "outstandingAmount",
                    label: "Outstanding Amount"
                }, {
                    prop: "invoiceDueDate",
                    label: "Invoice Due Date"
                },{
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
                }, {
                    prop: "Timeline",
                    label: "Timeline"
                }, {
                    prop: "PPD_PaymentItemType",
                    label: "Item Type"
                }, {
                    prop: "PPD_Payee_Name",
                    label: "Item Name"
                }, {
                    prop: "PPD_Amount",
                    label: "Amount"
                }, {
                    prop: "PPD_CalCategory",
                    label: "Calculation category"
                }],

                invoiceDetailsListInt: [],
                invoiceDetailsList: [{
                    prop: "ID_Item_Description",
                    label: "Item Desciption"
                }, {
                    prop: "ID_Item_Amount",
                    label: "Amount"

                }],

                ReInvoiceListInt: [],
                ReInvoiceList: [{
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
                inputChequeNoBankName: '',
                inputRemarks: '',
                ddlPaymentMode: '',
                viewSPPDPayerName: '',
                ddlAddItem: '',
                inputAddItemPaymentDate: '',
                ddlAddItemCurrency: '',
                inputAddItemAmount: '',
                ddlAddItemPaymentSchedule: '',
                ddlAddItemPaymentItemType: '',
                inputAddItemDescription: '',
                inputAddItemFromDate: '',
                inputAddItemToDate: '',
                ddlAddItemRecurring: '',
                inputAddItemDirect: '',
                disabledRecurring: true,
                isRecurringRequired: false,
                isInputAddItemDirect: false,
                disableOneTime: true,
                ddlPaymentPlan: null,
                inputStaffDiscount: '',
                inputPaymentPlanStartDate: '',
                inputStaffName: '',
                ddlPaymentPlanRuleApplyProRateFees: '',
                ddlPaymentPlanRuleApplySiblings: '',
                ddlPaymentPlanRuleApplyPostRateFees: '',
                ddlPaymentPlanRuleApplyStaff: '',
                cbProRateFees: '',
                cbPostRateFees: '',
                cbSiblingDiscount: '',
                cbStaffDiscount: '',
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

                inputPaymentPlanLevelStartDate: '',

                inputPaymentPlanRuleProRateAmount: '',
                isInputPaymentPlanRuleProRateAmount: false,
                inputPaymentPlanLevelEndDate: '',

                siblingList: '',
                inputPaymentPlanRuleSiblingsAmount: '',
                isInputPaymentPlanRuleSiblingsAmount: false,
                inputViewPaymentPlanCreationDate: '',
                inputViewPaymentPlanCreationBy: '',
                inputViewPaymentPlanLevel: '',
                inputViewPaymentPlanFeeSchemeName: '',
                inputViewPaymentPlanValidityStart: '',
                inputViewPaymentPlanValidityEnd: '',
                inputViewPaymentPlanTaxApplicable: '',
                inputViewPaymentPlanTax: '',
                inputViewPaymentPlanCenter: '',
                inputViewPaymentPlanCurrency: '',
                inputViewPaymentPlanStatus: '',

                inputPaymentPlanRuleStaffAmount: '',
                isInputPaymentPlanRuleStaffAmount: false,

                //test start --to remove
                inputSchoolName: '',
                schoolAddress1: '',
                //test end --to remove

                siblingListInfo: [],
                paymentModeList: [],
                spdSelection: [],
                addItemList: [],
                addItemCurrencyList: [],
                addItemPaymentScheduleList: [],
                addItemPaymentItemTypeList: [],
                addItemRecurringList: [],
                paymentPlanList: [],
                paymentPlanRuleApplyProRateFeesList: [],
                paymentPlanRuleApplySiblingsList: [],
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
                breakdownFlag:'',

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
                            this.status = row.SPPD_Status;

                            if (this.status == 'Active') {
                                this.deleteSPDID = row.PK_SPD_ID;
                                this.paymentPlanDetailID = row.SPPD_FK_Payment_Plan_Detail_ID;
                                this.studentCourseID = row.SPPD_FK_Student_Course_ID;

                                this.deletePaymentItem();
                            } else {
                                this.$notify.error({
                                    title: 'Message',
                                    message: 'Payment item cannot be deleted'
                                });
                            }
                        },
                        label: 'Delete'
                    }]
                },

                studentInvoiceItemListAction: {
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
                            this.status = row.SPPD_Status;

                            if (this.status == 'Active') {
                                this.deleteSPDID = row.PK_SPD_ID;
                                this.paymentPlanDetailID = row.SPPD_FK_Payment_Plan_Detail_ID;
                                this.studentCourseID = row.SPPD_FK_Student_Course_ID;

                                this.deletePaymentItem();
                            } else {
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
                            this.status = row.SPPD_Status;

                            if (this.status == 'Active') {
                                this.deleteSPDID = row.PK_SPD_ID;
                                this.paymentPlanDetailID = row.SPPD_FK_Payment_Plan_Detail_ID;
                                this.studentCourseID = row.SPPD_FK_Student_Course_ID;

                                this.deletePaymentItem();
                            } else {
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
                    }, {
                        value: '',
                        prop: 'SPPD_Status',
                    }, {
                        value: '',
                        prop: 'SPPD_PaymentDates',
                    }, {
                        value: '',
                        prop: 'SPPD_PaymentAmount',
                    }, {
                        value: '',
                        prop: 'totalIncludeGst',
                    }, {
                        value: '',
                        prop: 'RecTotal',
                    }, {
                        value: [],
                        prop: ['SPPD_PayerName', 'SPPD_Status', 'SPPD_PaymentDates', 'SPPD_PaymentAmount', 'totalIncludeGst', 'RecTotal']
                    }],
                filters: [{
                    value: '',
                    prop: 'SPPD_PayerName',
                }, {
                    value: '',
                    prop: 'SPPD_Status',
                }, {
                    value: '',
                    prop: 'SPPD_PaymentDates',
                }, {
                    value: '',
                    prop: 'SPPD_PaymentAmount',
                }, {
                    value: '',
                    prop: 'totalIncludeGst',
                }, {
                    value: '',
                    prop: 'RecTotal',
                }],

                refundListInt:[],
                refundList:[{
                    prop: "RD_Item_Description",
                    label: "Item Description"
                },{
                    prop: "itemAmount",
                    label: "Amount"
                },{
                    prop: "gstValue",
                    label: "GST"
                },{
                    prop: "totalAmount",
                    label: "Total"
                }],
                tempRefundList:[],
                inputRefundNewPayAmount:'',
                tempRefundResp:[],
                refundInvoiceName:'',
                inputRefundRemarks:'',

                //adhoc receipt generation
                adhocPaymentDueDateResponse:[],
                adhocPaymentDueDate:'',
                requiredInvoice:'',
                //adhoc receipt generation
                siblingItemsCount:'',
                siblingConfirmationFlag:'',

            };
        },

        async created() {
            await this.BindStudentInfo();
            await this.BindStudentSibling();
            await this.BindParentInfo();
            await this.getPaymentList();
            await this.BindPaymentModeDropdown();
            await this.BindPaymentTermPrintBreakdown();

            this.inputReceiptDate = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();
            this.inputAddItemPaymentDate = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();

            await this.BindAddItemDropdown();
            await this.BindApplyPaymentPlanDropdown();
            await this.BindCheckboxEligibility();
            await this.getApplyPaymentPlanStartDate();

        },

        async mounted() {

        },

        methods: {
            closeModal() {
                this.$refs.generateReceiptModal.hide();
                this.$refs.generateInvoiceModal.hide();
                this.$refs.viewRefundModal.hide();
            },

            closePaymentPlanModal() {
                this.$refs.newApplyPaymentPlanShowModal.hide();
            },

            async changeSelection(val) {
                this.spdSelection = val;
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

                this.studentInvoiceGenerationListInt.forEach(m => {

                    if(m.PK_SPD_ID==rowData.PK_SPD_ID)
                    {
                        m.SPPD_TotalValue = total.toFixed(2);
                    }
                });
            },

            async overPaymentClick(value) {

                if (value == 'Yes') {
                    this.$vs.loading();

                    const receiptResp = await DataSource.shared.generateReceipt(JSON.stringify(this.overPaymentSPDList), this.studentID, this.studentCourseID, this.overPaymentFlag);

                    if (receiptResp.code === '88') {
                        window.location.replace('/');
                    }
                    else if (receiptResp.code === '99' || receiptResp.code === '2')
                    {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Failed to preview receipt!'
                        });
                    }
                    else {

                        this.$refs.showOverPaymentConfirmationModal.hide();
                        this.displayPdf(receiptResp.code);

                        if (this.overPaymentFlag == 'Generate') {
                            await this.getStudentReceiptGenerationList();
                            await this.getPaymentList();
                            await this.getleftOverPaymentReceipt();
                            this.$refs.generateReceiptModal.hide();
                            this.$refs.showGenerateReceiptByHistoryModal.hide();
                            this.ddlPaymentMode = '';
                            this.inputRemarks = '';
                            this.inputChequeNoBankName = '';
                            this.inputReceiptDate = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();

                        }
                        // this.clearSelect();

                    }

                } else {

                    this.$refs.showOverPaymentConfirmationModal.hide();

                }

                this.$vs.loading.close();

            },

            //Start: To disabled el-table-column "selectable"
            canSelectRow(row, index) {

                if (row.SPPD_IsAutoOverpay === 'Y') {
                    this.isInvoiceLineItemDisabled = false;
                }
                else{
                    this.isInvoiceLineItemDisabled = true;
                }
                return this.isInvoiceLineItemDisabled;

            },
            //End: To disabled el-table-column "selectable"

            async BindStudentInfo() {
                try {
                    const resp = await DataSource.shared.getStudent(this.$route.query.sid, '', '', '', '');

                    this.studentDetail = resp.Table;
                    this.studentDetail.forEach(m => {
                        this.inputStudentName = m.Full_Name+" "+m.Last_name;
                        this.inputStudentNO = m.Index_No;
                        this.inputStudentStatus = m.Status;
                        this.sponsor_type = m.sponsor_type;
                        this.inputCreationDate = m.Created_On_convert;
                        if (m.St_Meal_Preferences) {
                            this.inputMealPreferences = m.St_Meal_Preferences;
                        } else {
                            this.inputMealPreferences = 'N/A';
                        }
                    });

                    const PayeeResp = await DataSource.shared.getPayee(this.inputStudentNO);
                    if(this.sponsor_type==="Father")
                    {
                        this.inputPayeeName = PayeeResp.PAR_Father_FirstName + ' ' + PayeeResp.PAR_Father_LastName;
                    }
                    else if(this.sponsor_type==="Mother")
                    {
                        this.inputPayeeName = PayeeResp.PAR_Mother_FirstName + ' ' + PayeeResp.PAR_Mother_LastName;
                    }
                    else if(this.sponsor_type==="Father Company")
                    {
                        this.inputPayeeName = PayeeResp.PAR_Father_CompanyName;
                    }
                    else if(this.sponsor_type==="Mother Company")
                    {
                        this.inputPayeeName = PayeeResp.PAR_Mother_CompanyName;
                    }
                    else
                    {
                        this.inputPayeeName = '';
                    }

                } catch (e) {
                    this.results = e;
                }
            },

            async clearSelect() {

                this.inputRemarks = '';
                this.ddlPaymentMode = '';
                this.inputReceiptDate = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();
                this.inputChequeNoBankName = '';
                //clear generate invoice
                this.reInvoiceName = '';
                this.inputInvoiceDate = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();
                this.Re_InvoiceName = '';

            },

            async BindPaymentModeDropdown() {
                try {
                    let jsonString = '"Pay Type":"Pay Type"';
                    jsonString = "{" + jsonString + "}";

                    const response = await DataSource.shared.getStudentDropDownList(jsonString);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {

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

            async BindPaymentTermPrintBreakdown() {
                try {
                    const response = await DataSource.shared.getPaymentPlanLevelStartDate(this.studentCourseID);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            var SCH_TermsOfPayment = 0;
                            var SCH_ToPrintSpecial = '';
                            this.paymentDueDateResponse = response.Table;
                            this.paymentDueDateResponse.forEach(m => {
                                SCH_TermsOfPayment = m.SCH_TermsOfPayment;
                                SCH_ToPrintSpecial = m.SCH_ToPrintSpecial;
                            });

                            let addDaysPaymentDue;
                            if (SCH_TermsOfPayment || parseInt(SCH_TermsOfPayment) === 0) {
                                addDaysPaymentDue = new Date(new Date().setDate(new Date().getDate() + parseInt(SCH_TermsOfPayment)));
                            } else {
                                addDaysPaymentDue = new Date(new Date().setDate(new Date().getDate() + 15));
                            }
                            this.inputPaymentDueDate = addDaysPaymentDue.getDate() + '/' + (addDaysPaymentDue.getMonth() + 1) + '/' + addDaysPaymentDue.getFullYear();


                            if (SCH_ToPrintSpecial !== 'No') {
                                this.cbPrintMonthlyBreakdown = true;
                            } else {
                                this.cbPrintMonthlyBreakdown = false;
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },

            async BindAddItemDropdown() {
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
                        } else {

                            this.addItemListResponse = response.Table;
                            this.addItemListResponse.forEach(m => {
                                if (m.OGPname.trim() === 'Payment Item Names') {
                                    this.addItemList.push(m);
                                } else if (m.OGPname.trim() === 'Currency List') {
                                    this.addItemCurrencyList.push(m);
                                } else if (m.OGPname.trim() === 'Payment Schedule') {
                                    this.addItemPaymentScheduleList.push(m);
                                } else if (m.OGPname.trim() === 'Payment Item Type') {
                                    this.addItemPaymentItemTypeList.push(m);
                                } else if (m.OGPname.trim() === 'Recurring') {
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

            async BindCheckboxEligibility() {
                try {
                    const proRateFeeEligibleResponse = await DataSource.shared.checkRateFeeEligible(this.studentID, this.studentCourseID, 'pro');
                    if (proRateFeeEligibleResponse) {
                        if (proRateFeeEligibleResponse.code === '88') {
                            window.location.replace('/');
                        } else if (proRateFeeEligibleResponse.code === '1') {
                            this.disabledCbProRateFees = false;
                            this.isProRateFeesEligible = true;
                            this.isProRateFeesNotEligible = false;

                            const levelResponse = await DataSource.shared.getPaymentPlanLevelStartDate(this.studentCourseID);

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
                        } else if (postRateFeeEligibleResponse.code === '1') {
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
                    if (siblingDiscEligibleResponse) {
                        if (siblingDiscEligibleResponse.code === '88') {
                            window.location.replace('/');
                        } else if (siblingDiscEligibleResponse.code === '1') {
                            this.disabledCbSiblingDiscount = false;
                            this.isSiblingDiscountEligible = true;
                            this.isSiblingDiscountNotEligible = false;

                            const siblingListResponse = await DataSource.shared.getSiblingList(this.studentID);
                            if (siblingListResponse.Table.length > 0) {
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
                    if (staffDiscEligibleResponse) {
                        if (staffDiscEligibleResponse.code === '88') {
                            window.location.replace('/');
                        } else if (staffDiscEligibleResponse.code === '1') {
                            this.disabledCbStaffDiscount = false;
                            this.isStaffDiscountEligible = true;
                            this.isStaffDiscountNotEligible = false;
                        } else if (staffDiscEligibleResponse.code === '2') {
                            this.disabledCbStaffDiscount = true;
                            this.isStaffDiscountEligible = false;
                            this.isStaffDiscountNotEligible = true;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },

            async cbProRateFeesClick() {
                if (this.cbProRateFees == true) {
                    this.disablePaymentPlanRuleProRateFees = false;
                    this.isDdlProRateFeesRequired = true;
                } else {
                    this.disablePaymentPlanRuleProRateFees = true;
                    this.isDdlProRateFeesRequired = false;
                    this.isInputPaymentPlanRuleProRateAmount = false;
                    this.inputPaymentPlanRuleProRateAmount = '';
                    this.ddlPaymentPlanRuleApplyProRateFees = '';
                }
            },

            async cbPostRateFeesClick() {
                if (this.cbPostRateFees == true) {
                    this.disablePaymentPlanRulePostRateFees = false;
                } else {
                    this.disablePaymentPlanRulePostRateFees = true;
                    this.ddlPaymentPlanRuleApplyPostRateFees = '';
                }
            },

            async cbSiblingDiscountClick() {
                if (this.cbSiblingDiscount == true) {
                    this.disablePaymentPlanRuleApplySiblings = false;
                    this.isDdlSiblingDiscRequired = true;
                } else {
                    this.disablePaymentPlanRuleApplySiblings = true;
                    this.isDdlSiblingDiscRequired = false;
                    this.isInputPaymentPlanRuleSiblingsAmount = false;
                    this.inputPaymentPlanRuleSiblingsAmount = '';
                    this.ddlPaymentPlanRuleApplySiblings = '';
                }
            },

            async cbStaffDiscountClick() {
                if (this.cbStaffDiscount == true) {
                    this.disablePaymentPlanRuleApplyStaff = false;
                    this.isDdlStaffDiscRequired = true;
                } else {
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
                                this.familyNumber = this.siblingListTableInt[0].PAR_Family_Number;
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },

            async BindParentInfo(){
                try{
                    const resp = await DataSource.shared.getParentList(this.familyNumber,'','');
                    this.parentListTableInt = resp.Table;
                }
                catch (e) {
                    this.results = e;
                }
            },

            async onchangePaymentPlanRuleProRateFees() {
                const response = await DataSource.shared.getPaymentPlanRuleDetails(this.ddlPaymentPlanRuleApplyProRateFees);
                if (response) {
                    if (response.code === '88') {
                        window.location.replace('/');
                    } else if (response.code === '99' || response.code === '2') {
                        this.isInputPaymentPlanRuleProRateAmount = false;
                        this.inputPaymentPlanRuleProRateAmount = '';
                    } else {
                        this.isInputPaymentPlanRuleProRateAmount = true;
                        this.paymentPlanRateResponse = response.Table;
                        this.paymentPlanRateResponse.forEach(m => {
                            if (m.PPR_Unit == 'Amount') {
                                this.inputPaymentPlanRuleProRateAmount = '($ ' + m.PPR_Value + ' - ' + m.SCH_Currency + ')';
                            } else if (m.PPR_Unit == 'Percentage') {
                                this.inputPaymentPlanRuleProRateAmount = '(% ' + m.PPR_Value + ' - ' + m.SCH_Currency + ')';
                            }
                        });
                    }
                }
            },

            async onchangePaymentPlanRuleSiblings() {
                const response = await DataSource.shared.getPaymentPlanRuleDetails(this.ddlPaymentPlanRuleApplySiblings);
                if (response) {
                    if (response.code === '88') {
                        window.location.replace('/');
                    } else if (response.code === '99' || response.code === '2') {
                        this.isInputPaymentPlanRuleSiblingsAmount = false;
                        this.inputPaymentPlanRuleSiblingsAmount = '';
                    } else {
                        this.isInputPaymentPlanRuleSiblingsAmount = true;
                        this.paymentPlanRateResponse = response.Table;
                        this.paymentPlanRateResponse.forEach(m => {
                            if (m.PPR_Unit == 'Amount') {
                                this.inputPaymentPlanRuleSiblingsAmount = '($ ' + m.PPR_Value + ' - ' + m.SCH_Currency + ')';
                            } else if (m.PPR_Unit == 'Percentage') {
                                this.inputPaymentPlanRuleSiblingsAmount = '(% ' + m.PPR_Value + ' - ' + m.SCH_Currency + ')';
                            }
                        });
                    }
                }
            },

            async onchangePaymentPlanRuleStaff() {
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
                    } else {
                        this.isInputPaymentPlanRuleStaffAmount = true;
                        this.paymentPlanStaffRateResponse = response.Table;
                        this.paymentPlanStaffRateResponse.forEach(m => {
                            if (m.CONPerSalesCommisionUnit.toUpperCase() == 'AMOUNT') {
                                this.inputPaymentPlanRuleStaffAmount = '($ ' + m.CONPerSalesCommision + ' - ' + this.currency + ')';
                            } else {
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

            async getApplyPaymentPlanStartDate() {
                const response = await DataSource.shared.getStudentCourseSemesterInfo('', this.studentCourseID);

                if (response) {
                    if (response.code === '88') {
                        window.location.replace('/');
                    } else if (response.code === '99') {
                        this.inputPaymentPlanStartDate = '';
                    } else {

                        this.paymentPlanStartDateResponse = response.Table;
                        this.paymentPlanStartDateResponse.forEach(m => {
                            this.inputPaymentPlanStartDate = m.SCRS_From_Date_convert;
                            this.inputStudentClassBatch = m.ClassName+'-'+m.Batch;
                        });
                    }
                }
            },

            async getPaymentList() {
                this.$vs.loading();
                try {
                    this.studentCourseID = this.$route.query.scid;
                    this.studentID = this.$route.query.sid;
                    this.courseStatus = this.$route.query.crsStatus;
                    //todo: To disabled the generate invoice and receipt button if course status = 'closed'
                    if (this.$route.query.crsStatus === 'Closed') {
                        this.btnDisabled = true;
                    } else {
                        this.btnDisabled = false;
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
                                    if (!m.IH_Invoice_Name) {
                                        m.IH_Invoice_Name = '-';
                                    }
                                    if (!m.invoiceDate) {
                                        m.invoiceDate = '-';
                                    }
                                    if (!m.invoiceAmount) {
                                        m.invoiceAmount = '-';
                                    } else {
                                        m.invoiceAmount = '$' + m.invoiceAmount;
                                    }
                                    if (!m.invoiceRemarks) {
                                        m.invoiceRemarks = '';
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
                    handler: _ => {
                        this.viewSPDID = row.PK_SPD_ID;
                        this.viewSPPDPayerName = row.SPPD_PayerName;
                        this.getItemTransDetailsList();
                    }
                }];
            },

            async getItemTransDetailsList(value) {
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
                                    } else {
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

            async deletePaymentItem() {
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
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },

            addItemClick() {
                this.$refs.newAddItemShowModal.show();
            },

            closeAddItemModalClick() {
                this.$refs.newAddItemShowModal.hide();
            },

            onlyNumber($event) {
                let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
                // Allow the minus sign (-) if the user enters it first
                if (keyCode === 45 && (this.inputAddItemAmount === '' || this.inputAddItemAmount === null)) { // code 45 is "-"
                    return;
                } else if (keyCode === 46 && !this.inputAddItemAmount.includes('.') && this.inputAddItemAmount !== '') { // code 46 is "."
                    if (this.inputAddItemAmount.includes('-') && this.inputAddItemAmount.length === 1) {
                        $event.preventDefault();
                    } else {
                        return;
                    }
                } else if (keyCode < 48 || keyCode > 57){
                    $event.preventDefault();
                }
            },

            async onchangeAddItemPaymentSchedule() {
                if (this.ddlAddItemPaymentSchedule === 'Recurring') {
                    this.disabledRecurring = false;
                    this.isRecurringRequired = true;
                    this.disableOneTime = true;

                } else {
                    this.disabledRecurring = true;
                    this.isRecurringRequired = false;
                    this.disableOneTime = false;
                }
            },

            async onchangeAddItem() {
                if (this.ddlAddItem === 'Others') {
                    this.isInputAddItemDirect = true;
                } else {
                    this.isInputAddItemDirect = false;
                }
            },

            async saveItemClick() {
                try {
                    let btnAddItemObject = [];
                    btnAddItemObject.SPPD_FK_Student_Course_ID = this.studentCourseID;

                    if (this.ddlAddItem === 'Others') {
                        btnAddItemObject.SPPD_PayerName = this.inputAddItemDirect;
                    } else {
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
                                if (this.Re_InvoiceName) {
                                    await this.getReInvoice(this.Re_InvoiceName);
                                }

                                this.$notify({
                                    title: 'Success',
                                    message: 'Successfully Added!',
                                    type: 'success'
                                });
                                this.$refs.newAddItemShowModal.hide();
                                this.clearAddItemField();
                                // this.clearSelect();
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },

            async clearAddItemField() {
                this.ddlAddItem = '';
                this.isInputAddItemDirect = false;
                this.disabledRecurring = true;
                this.isRecurringRequired = false;
                this.disableOneTime = true;
                const currencyResponse = await DataSource.shared.getCurrencyValueDropdownlist();
                currencyResponse.Table.forEach(m => {
                    this.ddlAddItemCurrency = m.CFGvalue;
                });

                this.inputAddItemPaymentDate = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();

                this.inputAddItemDirect = '';
                this.inputAddItemAmount = '';
                this.ddlAddItemPaymentSchedule = '';
                this.ddlAddItemRecurring = '';
                this.inputAddItemFromDate = '';
                this.ddlAddItemPaymentItemType = '';
                this.inputAddItemDescription = '';
                this.inputAddItemToDate = '';
            },

            applyPaymentPlanClick() {
                this.$refs.newApplyPaymentPlanShowModal.show();
            },

            showDiscountPlanClick() {
                this.$refs.newApplyDiscountPlanShowModal.show();
            },

            async viewPaymentPlan() {
                if (this.ddlPaymentPlan != '') {

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
                        } else {
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

                            if (paymentPlanDetailsRes) {
                                if (paymentPlanDetailsRes.code === '88') {
                                    window.location.replace('/');
                                } else {
                                    this.itemPaymentPlanDetailsInt = paymentPlanDetailsRes.Table;
                                }
                            }
                        }
                    }
                    this.$refs.viewPaymentPlanShowModal.show();
                } else {
                    this.$notify({
                        title: 'Error',
                        message: 'No payment plan selected',
                        type: 'error'
                    });
                }
            },

            async savePaymentPlanClick() {

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
                                this.showGenerateInvoice();
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },

            clearAddPaymentPlanField() {
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

            async addDiscountPlanClick() {
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
                    } else if ((this.cbSiblingDiscount === true && this.ddlPaymentPlanRuleApplySiblings === '') || (this.cbStaffDiscount === true && this.ddlPaymentPlanRuleApplyStaff === '')) {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please fill in all * fields'
                        });
                    } else {
                        const response = await DataSource.shared.checkStudentPaymentPlan(this.studentCourseID);

                        if (response) {
                            if (response.code === '88') {
                                window.location.replace('/');
                            } else if (response.code === '1') {
                                const saveDiscountResponse = await DataSource.shared.savePaymentPlanDiscount(JSON.stringify(btnAddDiscountObject));
                                if (saveDiscountResponse) {
                                    if (saveDiscountResponse.code === '88') {
                                        window.location.replace('/');
                                    } else if (saveDiscountResponse.code === '99') {
                                        this.$notify.error({
                                            title: 'Error',
                                            message: 'Add Discount Error!'
                                        });
                                    } else if (saveDiscountResponse.code === '2') {
                                        this.$notify.error({
                                            title: 'Error',
                                            message: 'Discount already added before'
                                        });
                                    } else {
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
                                        this.showGenerateInvoice();
                                    }
                                }
                            } else if (response.code === '2') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Please add payment plan before add discount'
                                });
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
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

            //todo - For receipt generation
            async getStudentReceiptGenerationList() {
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
                                var countTotal = 0;
                                //pass to value for overpayment "confirmation" pop-up.
                                this.receiptListCount = resp.Table.length;
                                //
                                this.respTempReceipt = resp.Table;
                                this.respTempReceipt.forEach(m => {
                                    if (m.RecTotal == null) {
                                        m.RecTotal = 0;
                                    } else {
                                        m.RecTotal = m.SPPD_TotalValue;
                                        countTotal += parseFloat(m.SPPD_TotalValue);
                                    }
                                    m.newPayAmount = m.SPPD_TotalValue;
                                    m.IsCheck = false;
                                    this.customizeReceiptResponse.push(m);
                                });
                                countTotal = countTotal.toFixed(2);
                                this.countReceiptTotalAmount = countTotal;
                                this.studentReceiptGenerationListInt = this.customizeReceiptResponse;
                                this.customizeReceiptResponse = [];

                        }
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },

            async previewReceiptClick() {
                this.overPaymentFlag = 'Preview';
                try {
                    if (!this.ddlPaymentMode) {
                        alert('Please select payment mode.');
                    } else {
                        let SPD_List = [];
                        let countOverPaymentItems = 0;
                        let selectedItemCount = 0;
                        let countTotalPaidAmount = 0;
                        let countTotalNewPayAmount = 0;

                        let countNegativeItem = 0;
                        let countNegativeValue = 0;

                        this.spdSelection.forEach(item => {
                            selectedItemCount++;
                            countTotalPaidAmount += parseFloat(item.SPPD_TotalValue);
                            countTotalNewPayAmount += parseFloat(item.newPayAmount);

                            if(parseFloat(item.SPPD_TotalValue)<0)
                            {
                                countNegativeItem++;
                                countNegativeValue+=parseFloat(item.SPPD_TotalValue);
                            }

                            let spdDetail = {
                                PK_SPD_ID: item.PK_SPD_ID,
                                paymentMode: this.ddlPaymentMode,
                                remarks: this.inputRemarks,
                                receiptDate: this.inputReceiptDate,
                                RD_Cheque_No: this.inputChequeNoBankName,
                                RD_Item_Description: item.SPPD_PayerName,
                                RD_GST_Applicable: item.SPPD_PaymentItemType,
                                newAmount: item.newPayAmount,
                                RD_Item_Amount: item.SPPD_PaymentAmount,
                                RD_GSTValue: item.SPPD_GstValue,
                                IH_Invoice_Name:'',
                            };
                            //Todo: overpayment confirmation checking START
                            if (parseFloat(item.SPPD_TotalValue) < parseFloat(item.newPayAmount)){
                                countOverPaymentItems++;
                            }
                            //Todo: overpayment confirmation checking END
                            SPD_List.push(spdDetail);
                        });

                        this.overPaymentSPDList = SPD_List;
                        countTotalPaidAmount = countTotalPaidAmount.toFixed(2);
                        countTotalNewPayAmount = countTotalNewPayAmount.toFixed(2);

                        if (this.spdSelection.length === 0) {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Please select at least 1 payment item'
                            });
                        }
                        else if(countNegativeItem>0&&(parseFloat(countNegativeValue)+parseFloat(countTotalPaidAmount)<0)){
                            this.$notify.error({
                                title: 'Error',
                                message: 'Please check your overpayment items!!'
                            });
                        }
                        else if (countTotalPaidAmount < countTotalNewPayAmount) {
                            if (this.receiptListCount === selectedItemCount) {
                                this.overPaymentItemsCount = countOverPaymentItems;
                                this.$refs.showOverPaymentConfirmationModal.show();

                            } else if (this.receiptListCount > selectedItemCount) {
                                this.overPaymentItemsCount = countOverPaymentItems;
                                this.$refs.showOverPaymentConfirmationModal.show();
                            }
                        }
                        else
                        {

                            if (countOverPaymentItems > 0) {
                                this.overPaymentItemsCount = countOverPaymentItems;
                                this.$refs.showOverPaymentConfirmationModal.show();
                            } else {
                                this.$vs.loading();
                                //to preview receipt
                                const receiptResp = await DataSource.shared.generateReceipt(JSON.stringify(SPD_List), this.studentID, this.studentCourseID, 'Preview');

                                if (receiptResp.code === '88') {
                                    window.location.replace('/');
                                } else if (receiptResp.code === '99' || receiptResp.code === '2') {
                                    this.$notify.error({
                                        title: 'Error',
                                        message: 'Failed to preview receipt!'
                                    });
                                } else {

                                    this.displayPdf(receiptResp.code);
                                    // this.clearSelect();
                                }

                            }

                        }

                    }

                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },

            async generateReceiptClick(value) {
                this.overPaymentFlag = 'Generate';
                try {
                    if (!this.ddlPaymentMode) {
                        alert('Please select payment mode.');
                    } else {

                        let SPD_List = [];
                        let countOverPaymentItems = 0;
                        let selectedItemCount = 0;
                        let countTotalPaidAmount = 0;
                        let countTotalNewPayAmount = 0;

                        let countNegativeItem = 0;
                        let countNegativeValue = 0;

                        this.spdSelection.forEach(item => {
                            //to assign invoiceName='' for adhoc receipt without invoice generated
                            if(value==='AdhocReceipt')
                            {
                                this.receiptInvoiceName='';
                            }
                            selectedItemCount++;
                            countTotalPaidAmount += parseFloat(item.SPPD_TotalValue);
                            countTotalNewPayAmount += parseFloat(item.newPayAmount);

                            if(parseFloat(item.SPPD_TotalValue)<0)
                            {
                                countNegativeItem++;
                                countNegativeValue+=parseFloat(item.SPPD_TotalValue);
                            }

                            let spdDetail = {
                                PK_SPD_ID: item.PK_SPD_ID,
                                paymentMode: this.ddlPaymentMode,
                                receiptDate: this.inputReceiptDate,
                                remarks: this.inputRemarks,
                                RD_Cheque_No: this.inputChequeNoBankName,
                                RD_Item_Description: item.SPPD_PayerName,
                                RD_GST_Applicable: item.SPPD_PaymentItemType,
                                newAmount: item.newPayAmount,
                                RD_Item_Amount: item.SPPD_PaymentAmount,
                                RD_GSTValue: item.SPPD_GstValue,
                                IH_Invoice_Name:this.receiptInvoiceName,
                            };
                            //Todo: overpayment confirmation checking START
                            if (parseFloat(item.SPPD_TotalValue) < parseFloat(item.newPayAmount)) {
                                countOverPaymentItems++;
                            }
                            //Todo: overpayment confirmation checking END
                            SPD_List.push(spdDetail);

                        });

                        this.overPaymentSPDList = SPD_List;
                        countTotalPaidAmount = countTotalPaidAmount.toFixed(2);
                        countTotalNewPayAmount = countTotalNewPayAmount.toFixed(2);

                        if (this.spdSelection.length === 0) {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Please select at least 1 payment item'
                            });
                        }
                        else if(countNegativeItem>0&&(parseFloat(countNegativeValue)+parseFloat(countTotalPaidAmount)<0)){
                            this.$notify.error({
                                title: 'Error',
                                message: 'Please check your overpayment items!!'
                            });
                        }
                        else if(countTotalPaidAmount < countTotalNewPayAmount) {
                            if (this.receiptListCount === selectedItemCount||this.receiptListCount > selectedItemCount) {
                                this.overPaymentItemsCount = countOverPaymentItems;
                                this.$refs.showOverPaymentConfirmationModal.show();
                            }
                        } else
                        {
                            if (countOverPaymentItems > 0) {
                                this.overPaymentItemsCount = countOverPaymentItems;
                                this.$refs.showOverPaymentConfirmationModal.show();
                            }
                            else
                            {
                                if(value==='AdhocReceipt'&&this.requiredInvoice==true)
                                {
                                    //todo:get payment due date start
                                    const dueDateResp = await DataSource.shared.getPaymentPlanLevelStartDate(this.studentCourseID);
                                    if (dueDateResp) {
                                        if (dueDateResp.code === '88'){
                                            window.location.replace('/');
                                        }
                                        else if(dueDateResp.code === '99'){
                                            console.log('99');
                                        }
                                        else{
                                            //payment terms(get how many day)
                                            var SCH_TermsOfPayment = 0;

                                            this.adhocPaymentDueDateResponse = dueDateResp.Table;
                                            this.adhocPaymentDueDateResponse.forEach(m => {
                                                SCH_TermsOfPayment = m.SCH_TermsOfPayment;
                                            });
                                            let addDaysPaymentDue;
                                            if (SCH_TermsOfPayment || parseInt(SCH_TermsOfPayment) === 0) {
                                                addDaysPaymentDue = new Date(new Date().setDate(new Date().getDate() + parseInt(SCH_TermsOfPayment)));
                                            } else {
                                                addDaysPaymentDue = new Date(new Date().setDate(new Date().getDate() + 15));
                                            }
                                            this.adhocPaymentDueDate = addDaysPaymentDue.getDate() + '/' + (addDaysPaymentDue.getMonth() + 1) + '/' + addDaysPaymentDue.getFullYear();

                                        }
                                    }
                                    //todo:get payment due date end

                                    let adhocSPD_List = [];
                                    this.spdSelection.forEach(item => {
                                        let adhocSpdDetail = {
                                            PK_SPD_ID: item.PK_SPD_ID,
                                            SPPD_Status: item.SPPD_Status,
                                            SPPD_PayerName: item.SPPD_PayerName,
                                            SPPD_FK_Payment_Plan_Detail_ID: item.SPPD_FK_Payment_Plan_Detail_ID,
                                            SPPD_FK_PaymentMaster_ID: item.SPPD_FK_PaymentMaster_ID,
                                            SPPD_PaymentAmount: item.SPPD_PaymentAmount,
                                            SPPD_PaymentItemType: item.SPPD_PaymentItemType,
                                            SPPD_GstValue: item.SPPD_GstValue,
                                            //get adhoc payment due date
                                            inputPaymentDueDate: this.adhocPaymentDueDate,
                                            IH_Invoice_Name:this.receiptInvoiceName,
                                            breakdownFlag:'N',
                                            AdhocReceipt:'Yes'
                                            //get adhoc payment due date
                                        };
                                        adhocSPD_List.push(adhocSpdDetail);
                                    });

                                    //to generate invoice
                                    this.$vs.loading();
                                    const invoiceResponse = await DataSource.shared.generateInvoice(JSON.stringify(adhocSPD_List), this.studentID, this.studentCourseID, this.adhocPaymentDueDate, this.inputRemarks,'Generate', '');

                                    if (invoiceResponse.code === '88') {
                                        window.location.replace('/');
                                    } else if (invoiceResponse.code === '99' || invoiceResponse.code === '2') {
                                        this.$notify.error({
                                            title: 'Error',
                                            message: 'Failed to generate invoice!'
                                        });
                                    } else {
                                        this.$notify({
                                            title: 'Success',
                                            message: 'Adhoc Invoice generated successful!',
                                            type: 'success'
                                        });

                                        //to get receipt detail
                                        let ListToGetInvoiceName=[];
                                        SPD_List.forEach(m=>{

                                            m.IH_Invoice_Name=invoiceResponse.code;

                                            ListToGetInvoiceName.push(m);
                                        });
                                        const receiptResponse = await DataSource.shared.generateReceipt(JSON.stringify(SPD_List), this.studentID, this.studentCourseID, 'Generate');

                                        if (receiptResponse.code === '88') {
                                            window.location.replace('/');
                                        }
                                        else if (receiptResponse.code === '99' || receiptResponse.code === '2')
                                        {
                                            this.$notify.error({
                                                title: 'Error',
                                                message: 'Failed to generate receipt!'
                                            });
                                        }
                                        else
                                        {
                                            this.displayPdf(receiptResponse.code);
                                            await this.getStudentReceiptGenerationList();
                                            await this.getPaymentList();
                                            await this.getleftOverPaymentReceipt();
                                            this.$refs.generateReceiptModal.hide();
                                            this.ddlPaymentMode = '';
                                            this.inputRemarks = '';
                                            this.inputChequeNoBankName = '';
                                            this.requiredInvoice=false;
                                            this.inputReceiptDate = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();
                                            this.clearSelect();
                                        }
                                    }
                                }
                                else
                                {
                                    //to get receipt detail
                                    this.$vs.loading();
                                    const receiptResponse = await DataSource.shared.generateReceipt(JSON.stringify(SPD_List), this.studentID, this.studentCourseID, 'Generate');

                                    if (receiptResponse.code === '88') {
                                        window.location.replace('/');
                                    }
                                    else if (receiptResponse.code === '99' || receiptResponse.code === '2')
                                    {
                                        this.$notify.error({
                                            title: 'Error',
                                            message: 'Failed to generate receipt!'
                                        });
                                    }
                                    else
                                    {
                                        this.displayPdf(receiptResponse.code);
                                        await this.clearSelect();
                                        await this.getStudentReceiptGenerationList();
                                        await this.getPaymentList();
                                        await this.getleftOverPaymentReceipt();
                                        this.$refs.generateReceiptModal.hide();
                                        this.ddlPaymentMode = '';
                                        this.inputRemarks = '';
                                        this.inputChequeNoBankName = '';
                                        this.inputReceiptDate = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();
                                    }

                                }

                            }

                        }

                    }

                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();

            },

            async previewLeftOverReceiptClick() {
                try {
                    this.overPaymentFlag = 'Preview';
                    if (!this.ddlPaymentMode) {
                        alert('Please select payment mode.');
                    } else {
                        let SPD_List = [];
                        let countOverPaymentItems = 0;
                        let selectedItemCount = 0;
                        let countTotalPaidAmount = 0;
                        let countTotalNewPayAmount = 0;
                        this.spdSelection.forEach(item => {
                            selectedItemCount++;
                            countTotalPaidAmount += parseFloat(item.totalValue);
                            countTotalNewPayAmount += parseFloat(item.newPayAmount);
                            let spdDetail = {
                                paymentMode: this.ddlPaymentMode,
                                remarks: this.inputRemarks,
                                receiptDate: this.inputReceiptDate,
                                RD_Cheque_No: this.inputChequeNoBankName,

                                //left Over Payment
                                RD_GST_Applicable: item.GST_Applicable,
                                RD_Item_Description: item.Item_Description,
                                PK_SPD_ID: item.SPD_ID,
                                RD_GSTValue: item.gstValue,
                                RD_Item_Amount: item.itemAmount,
                                totalValue: item.totalValue,
                                newAmount: item.newPayAmount,
                                IH_Invoice_Name:this.receiptInvoiceName,
                            };
                            //Todo: overpayment confirmation checking START
                            if (parseFloat(item.totalValue) < parseFloat(item.newPayAmount)) {
                                countOverPaymentItems++;
                            }
                            //Todo: overpayment confirmation checking END
                            SPD_List.push(spdDetail);
                        });

                        this.overPaymentSPDList = SPD_List;
                        countTotalPaidAmount = countTotalPaidAmount.toFixed(2);
                        countTotalNewPayAmount = countTotalNewPayAmount.toFixed(2);

                        if (this.spdSelection.length === 0) {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Please select at least 1 payment item'
                            });
                        }

                        else if (countTotalPaidAmount < countTotalNewPayAmount) {
                            if (this.leftOverListCount === selectedItemCount) {
                                this.overPaymentItemsCount = countOverPaymentItems;
                                this.$refs.showOverPaymentConfirmationModal.show();

                            } else if (this.leftOverListCount > selectedItemCount) {
                                this.overPaymentItemsCount = countOverPaymentItems;
                                this.$refs.showOverPaymentConfirmationModal.show();

                            }
                        } else {
                            if (countOverPaymentItems > 0) {
                                this.overPaymentItemsCount = countOverPaymentItems;
                                this.$refs.showOverPaymentConfirmationModal.show();
                            } else {
                                this.$vs.loading();
                                //to preview receipt
                                const receiptResp = await DataSource.shared.generateReceipt(JSON.stringify(SPD_List), this.studentID, this.studentCourseID, 'Preview');

                                if (receiptResp.code === '88') {
                                    window.location.replace('/');
                                } else if (receiptResp.code === '99' || receiptResp.code === '2') {
                                    this.$notify.error({
                                        title: 'Error',
                                        message: 'Failed to preview receipt!'
                                    });
                                } else {
                                    this.displayPdf(receiptResp.code);
                                    // this.clearSelect();
                                }
                            }
                        }

                    }

                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },

            async generateLeftOverReceiptClick(){
                try {
                    this.overPaymentFlag = 'Generate';
                    if (!this.ddlPaymentMode) {
                        alert('Please select payment mode.');
                    } else {
                        let SPD_List = [];
                        let countOverPaymentItems = 0;
                        let selectedItemCount = 0;
                        let countTotalPaidAmount = 0;
                        let countTotalNewPayAmount = 0;
                        this.spdSelection.forEach(item =>{
                            selectedItemCount++;
                            countTotalPaidAmount += parseFloat(item.totalValue);
                            countTotalNewPayAmount += parseFloat(item.newPayAmount);
                            let spdDetail = {
                                paymentMode: this.ddlPaymentMode,
                                remarks: this.inputRemarks,
                                receiptDate: this.inputReceiptDate,
                                RD_Cheque_No: this.inputChequeNoBankName,
                                //left Over Payment
                                RD_GST_Applicable: item.GST_Applicable,
                                RD_Item_Description: item.Item_Description,
                                PK_SPD_ID: item.SPD_ID,
                                RD_GSTValue: item.gstValue,
                                RD_Item_Amount: item.itemAmount,
                                totalValue: item.totalValue,
                                newAmount: item.newPayAmount,
                                IH_Invoice_Name:this.receiptInvoiceName,
                            };
                            //Todo: overpayment confirmation checking START
                            if (parseFloat(item.totalValue) < parseFloat(item.newPayAmount)) {
                                countOverPaymentItems++;
                            }
                            //Todo: overpayment confirmation checking END
                            SPD_List.push(spdDetail);
                        });
                        this.overPaymentSPDList = SPD_List;
                        countTotalPaidAmount = countTotalPaidAmount.toFixed(2);
                        countTotalNewPayAmount = countTotalNewPayAmount.toFixed(2);

                        if (this.spdSelection.length === 0) {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Please select at least 1 payment item'
                            });
                        }
                        else if (countTotalPaidAmount < countTotalNewPayAmount) {
                            if (this.leftOverListCount === selectedItemCount) {
                                this.overPaymentItemsCount = countOverPaymentItems;
                                this.$refs.showOverPaymentConfirmationModal.show();

                            } else if (this.leftOverListCount > selectedItemCount) {
                                this.overPaymentItemsCount = countOverPaymentItems;
                                this.$refs.showOverPaymentConfirmationModal.show();
                            }
                        } else {
                            //
                            if (countOverPaymentItems > 0) {
                                this.overPaymentItemsCount = countOverPaymentItems;
                                this.$refs.showOverPaymentConfirmationModal.show();
                            } else {
                                this.$vs.loading();
                                //to get receipt detail
                                const receiptResponse = await DataSource.shared.generateReceipt(JSON.stringify(SPD_List), this.studentID, this.studentCourseID, 'Generate');

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
                                    await this.clearSelect();
                                    this.$refs.showGenerateReceiptByHistoryModal.hide();
                                    this.ddlPaymentMode = '';
                                    this.inputRemarks = '';
                                    this.inputChequeNoBankName = '';
                                    this.inputReceiptDate = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();
                                }
                            }
                            //
                        }

                    }

                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },

            //todo: for CN generation
            async generateCNClick() {
                try {
                    if (this.spdSelection.length === 0) {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please select at least 1 payment item'
                        });
                    } else if (this.taCnRemarks.length < 1) {
                        alert('Remark required');
                    } else {

                        let SPD_List = [];
                        this.spdSelection.forEach(item => {
                            let spdDetail = {
                                //left Over Payment
                                ID_GST_Applicable: item.GST_Applicable,
                                ID_Item_Description: item.Item_Description,
                                SPD_ID: item.SPD_ID,
                                ID_GSTValue: item.gstValue,
                                ID_Item_Amount: item.itemAmount,
                                InvHeaderID: this.InvHeaderID,
                                IH_Invoice_Name: this.cnInvoiceName,
                                studentCourseID: this.studentCourseID,
                                studentID: this.studentID,
                                cnRemarks: this.taCnRemarks,
                                newAmount: item.newPayAmount,
                            };
                            SPD_List.push(spdDetail);
                        });

                        this.$vs.loading();
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
                            this.taCnRemarks = '';
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },

            //todo - For invoice generation
            async getStudentInvoiceGenerationList() {
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
                                    if (m.RecTotal == null) {
                                        m.RecTotal = 0;
                                    }
                                    else {
                                        m.RecTotal = m.SPPD_TotalValue;
                                    }
                                    //InvoiceOverPaymentItemInt
                                    if(m.SPPD_IsAutoOverpay=='Y'){
                                        this.invoiceOverPaymentResponse.push(m);

                                    }
                                    else{
                                        m.IsCheck = false;
                                        m.newGSTAmount=m.SPPD_GstValue;
                                        this.customizeInvoiceResponse.push(m);
                                    }
                                });
                                this.studentInvoiceGenerationListInt = this.customizeInvoiceResponse;
                                this.InvoiceOverPaymentItemInt = this.invoiceOverPaymentResponse;
                                this.customizeInvoiceResponse = [];
                                this.invoiceOverPaymentResponse =[];
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },

            //reserved:start
            async invoicePreviewValidateChecking()
            {

            },
            async invoiceGenerateValidateChecking()
            {

            },
            //reserved:end

            checkPaymentBreakdownEligible(){
                if(this.cbPrintMonthlyBreakdown){
                    let breakdownCounter = 0;
                    this.spdSelection.forEach(m=>{
                        if(m.PPD_CalCategory==="Course Fees")
                        {
                            breakdownCounter++;
                        }
                    });

                    if(breakdownCounter===0){
                        this.cbPrintMonthlyBreakdown = true;
                        this.breakdownFlag='N';
                        this.$notify.error({
                            title: 'Message',
                            message: 'Please select at least 1 course fees item!'
                        });
                    }
                    else{
                        this.breakdownFlag='Y';
                    }
                }
                return this.breakdownFlag;
            },

            async previewInvoiceClick(value) {
                try {
                    let SPD_List = [];
                    let InvoiceType = '';
                    if (value == 'reinvoice') {
                        InvoiceType = 'PreviewReInvoice';
                        this.spdSelection.forEach(item => {
                            let spdDetail = {
                                PK_SPD_ID: item.PK_SPD_ID,
                                SPPD_Status: item.SPPD_Status,
                                SPPD_PayerName: item.SPPD_PayerName,
                                SPPD_FK_Payment_Plan_Detail_ID: item.SPPD_FK_Payment_Plan_Detail_ID,
                                SPPD_FK_PaymentMaster_ID: item.SPPD_FK_PaymentMaster_ID,
                                SPPD_PaymentItemType: item.SPPD_PaymentItemType,
                                SPPD_GstValue: item.SPPD_GstValue,
                                SPPD_PaymentAmount: item.SPPD_PaymentAmount,
                                SPPD_NewPaymentAmount: item.newPayAmount,
                                inputPaymentDueDate: this.inputPaymentDueDate,
                                printBreakdownChecked: this.cbPrintMonthlyBreakdown,
                                breakdownFlag:this.breakdownFlag,
                                AdhocReceipt:'No',
                            };
                            SPD_List.push(spdDetail);
                            this.reInvoiceName = item.invoiceName;
                        });
                    }
                    else
                    {
                        //check breakdown
                        if(this.cbPrintMonthlyBreakdown){
                            var breakdownflag = await this.checkPaymentBreakdownEligible();

                            if(breakdownflag=='N')
                            {
                                this.breakdownFlag='N';
                                return;
                            }
                            else
                            {
                                this.breakdownFlag='Y';
                            }
                        }else{

                            this.breakdownFlag='N';
                        }
                        //check breakdown

                        InvoiceType = 'Preview';
                        // let countSiblingKeyWord = 0;
                        this.spdSelection.forEach(item => {
                            // if(item.SPPD_PayerName.toUpperCase().includes('SIBLING')){
                            //     countSiblingKeyWord++;
                            // }
                            let spdDetail = {
                                PK_SPD_ID: item.PK_SPD_ID,
                                SPPD_Status: item.SPPD_Status,
                                SPPD_PayerName: item.SPPD_PayerName,
                                SPPD_FK_Payment_Plan_Detail_ID: item.SPPD_FK_Payment_Plan_Detail_ID,
                                SPPD_FK_PaymentMaster_ID: item.SPPD_FK_PaymentMaster_ID,
                                SPPD_PaymentAmount: item.SPPD_PaymentAmount,
                                SPPD_PaymentItemType: item.SPPD_PaymentItemType,
                                SPPD_GstValue: item.newGSTAmount,
                                inputPaymentDueDate: this.inputPaymentDueDate,
                                printBreakdownChecked: this.cbPrintMonthlyBreakdown,
                                breakdownFlag:this.breakdownFlag,
                                AdhocReceipt:'No',
                            };
                            SPD_List.push(spdDetail);
                        });
                        // console.log(parseInt(countSiblingKeyWord));
                        // this.siblingItemsCount=countSiblingKeyWord;
                        // if(parseInt(countSiblingKeyWord)>0){
                        //     // this.siblingConfirmationFlag = true;
                        //     this.$refs.showSiblingConfirmationModal.show();
                        // }
                    }

                    //to prompt item closed
                    var bool = false;
                    var payerName = '';
                    SPD_List.forEach(m => {
                        if (m.SPPD_Status === 'Closed') {
                            bool = true;
                            payerName += m.SPPD_PayerName;
                            payerName += ', ';
                        }
                    });
                    payerName = payerName.substring(0, payerName.length - 2);

                    if (bool) {
                        this.$notify.error({
                            title: 'Error',
                            message: payerName + ' is closed, invoice cannot be preview!'
                        });
                    } else {
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

                                this.$vs.loading();
                                //to preview invoice
                                const invoiceResponse = await DataSource.shared.generateInvoice(JSON.stringify(SPD_List), this.studentID, this.studentCourseID, this.inputPaymentDueDate, this.inputRemarks, InvoiceType, this.reInvoiceName);

                                if (invoiceResponse.code === '88') {
                                    window.location.replace('/');
                                } else if (invoiceResponse.code === '99' || invoiceResponse.code === '2') {
                                    this.$notify.error({
                                        title: 'Error',
                                        message: 'Failed to preview invoice!'
                                    });
                                } else {
                                    this.displayPdf(invoiceResponse.code);
                                    // await this.clearSelect();
                                }
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },

            async generateInvoiceClick(value) {
                try {
                    let SPD_List = [];
                    let InvoiceType = '';
                    if (value == 'reinvoice') {
                        InvoiceType = value;
                        this.spdSelection.forEach(item => {
                            let spdDetail = {
                                PK_SPD_ID: item.PK_SPD_ID,
                                SPPD_Status: item.SPPD_Status,
                                SPPD_PayerName: item.SPPD_PayerName,
                                SPPD_FK_Payment_Plan_Detail_ID: item.SPPD_FK_Payment_Plan_Detail_ID,
                                SPPD_FK_PaymentMaster_ID: item.SPPD_FK_PaymentMaster_ID,
                                SPPD_PaymentItemType: item.SPPD_PaymentItemType,
                                SPPD_GstValue: item.SPPD_GstValue,
                                printBreakdownChecked: this.cbPrintMonthlyBreakdown,
                                inputPaymentDueDate: this.inputPaymentDueDate,
                                SPPD_NewPaymentAmount: item.newPayAmount,
                                breakdownFlag:this.breakdownFlag,
                                AdhocReceipt:'No',
                            };
                            SPD_List.push(spdDetail);
                            this.reInvoiceName = item.invoiceName;
                        });
                    } else {

                        //check breakdown
                        if(this.cbPrintMonthlyBreakdown){
                            var breakdownflag = await this.checkPaymentBreakdownEligible();

                            if(breakdownflag=='N')
                            {
                                this.breakdownFlag='N';
                                return;
                            }
                            else
                            {
                                this.breakdownFlag='Y';
                            }
                        }else{

                            this.breakdownFlag='N';
                        }
                        //check breakdown

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
                                SPPD_GstValue: item.newGSTAmount,
                                inputPaymentDueDate: this.inputPaymentDueDate,
                                printBreakdownChecked: this.cbPrintMonthlyBreakdown,
                                breakdownFlag:this.breakdownFlag,
                                AdhocReceipt:'No',
                            };
                            SPD_List.push(spdDetail);
                        });
                    }

                    //to prompt item closed
                    var bool = false;
                    var payerName = '';
                    SPD_List.forEach(m => {
                        if (m.SPPD_Status === 'Closed') {
                            bool = true;
                            payerName += m.SPPD_PayerName;
                            payerName += ', ';
                        }
                    });
                    payerName = payerName.substring(0, payerName.length - 2);

                    if (bool) {
                        this.$notify.error({
                            title: 'Error',
                            message: payerName + ' is closed, invoice cannot be generated!'
                        });
                    } else {
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
                            if (value === 'reinvoice') {
                                SPD_List.forEach(m => {
                                    if (m.SPPD_NewPaymentAmount > 0) {
                                        amountPositiveCount += 1;
                                    }
                                });
                            } else {
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
                            } else {
                                //to generate invoice
                                this.$vs.loading();
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
                                    this.$refs.showReInvoiceModal.hide();
                                    await this.clearSelect();
                                    this.cbPrintMonthlyBreakdown = false;
                                }
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },

            validatePaymentMode() {
                if (this.ddlPaymentMode == 'CASH') {
                    this.inputChequeNoBankName = '';
                }
            },

            async getleftOverPaymentReceipt(objValue) {
                try {
                    let obj_List = [];
                    if (objValue.recNameList) {
                        this.tempList = objValue.recNameList.split(',');
                        this.tempList.forEach(m => {

                            let objDetail = {
                                receiptName: m,
                            };
                            obj_List.push(objDetail);
                        });
                    } else {
                        let objDetail = {
                            receiptName: '',
                        };
                        obj_List.push(objDetail);
                    }

                    const resp = await DataSource.shared.getLeftOverPaymentReceipt(JSON.stringify(obj_List), this.studentID, (objValue.IH_Invoice_Name == "-" ? "" : objValue.IH_Invoice_Name), this.studentCourseID, this.leftOverActionFlag);

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

                                var countTotal = 0;
                                this.leftOverTemp = resp.Table;
                                this.leftOverListCount = resp.Table.length;

                                this.leftOverTemp.forEach(m => {

                                    m.newPayAmount = m.totalValue;
                                    countTotal += parseFloat(m.totalValue);
                                    this.leftOverTempResp.push(m);

                                });
                                countTotal = countTotal.toFixed(2);
                                this.countLeftOverTotalAmount = countTotal;
                                this.studentReceiptLeftOverPaymentListInt = this.leftOverTempResp;
                                this.leftOverTempResp = [];
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },

            // todo: CALL b-modal link only
            async showTransaction(value) {
                await this.getReceiptWithTransactionHistory(value);
                this.$refs.viewTransactionShowModal.show();
            },

            async showRefund(value) {
                await this.getRefund(value);
                this.$refs.viewRefundModal.show();
            },

            async getRefund(objValue){
                try {
                    //get refund invoice name
                    this.refundInvoiceName = objValue.IH_Invoice_Name;
                    //
                    let obj_List = [];

                    if (objValue.recNameList) {
                        //assign '-' to ''
                        let emptyInvoiceValue='';
                        if(this.refundInvoiceName=='-'){
                            emptyInvoiceValue = '';
                        }
                        else{
                            emptyInvoiceValue = this.refundInvoiceName;
                        }
                        //assign '-' to ''
                        this.tempRefundList = objValue.recNameList.split(',');
                        this.tempRefundList.forEach(m => {

                            let objDetail = {
                                receiptName: m,
                                invoiceName:emptyInvoiceValue,
                            };
                            obj_List.push(objDetail);
                        });
                    } else {
                        let objDetail = {
                            receiptName:'',
                            invoiceName:'',
                        };
                        obj_List.push(objDetail);
                    }

                    const resp = await DataSource.shared.getItemTotalReceipt(JSON.stringify(obj_List));

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
                                this.tempRefundResp = resp.Table;
                                let SPList=[];
                                this.tempRefundResp.forEach(m=>{
                                    let spdDetail = {
                                        FK_RD_SPD_ID: m.FK_RD_SPD_ID,
                                        RD_GST_Applicable: m.RD_GST_Applicable,
                                        RD_Item_Description: m.RD_Item_Description,
                                        newRefundAmount: m.totalAmount,
                                        totalAmount: m.totalAmount,
                                        itemAmount: m.itemAmount,
                                        gstValue: m.gstValue,
                                        IH_Currency:m.RH_Receipt_Currency,
                                    };
                                    SPList.push(spdDetail);
                                });
                                this.refundListInt=SPList;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },

            async generateRefundClick(){
                try{
                    if (this.spdSelection.length === 0) {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please select at least 1 refund item'
                        });
                    }
                    else
                    {
                        this.$vs.loading();
                        let refundInvName ='';

                        if(this.refundInvoiceName==='-'){
                            refundInvName='';
                        }
                        else{
                            refundInvName=this.refundInvoiceName;
                        }

                        let Obj_List = [];
                        this.spdSelection.forEach(m => {
                            let spdDetail = {
                                IH_Invoice_Name: refundInvName,
                                studentID: this.studentID,
                                SPD_ID: m.FK_RD_SPD_ID,
                                refundAmount: m.newRefundAmount,
                                totalAmount: m.totalAmount,
                                //refundDate:m.refundDate,
                                // refundDate:"06/08/2019",
                                refundRemarks:this.inputRefundRemarks,
                                ID_Item_Description:m.RD_Item_Description,
                                ID_GST_Applicable:m.RD_GST_Applicable,
                                RH_Receipt_Currency:m.RH_Receipt_Currency,
                            };
                            Obj_List.push(spdDetail);
                        });
                        const resp = await DataSource.shared.generateRefund(JSON.stringify(Obj_List));
                        if (resp) {
                            switch (resp.code) {
                                case "88":
                                    this.$router.push('/');
                                    break;
                                case "99":
                                    this.$notify.error({
                                        title: 'Error',
                                        message: 'Failed to refund'
                                    });
                                    break;

                                default:
                                    this.$notify({
                                        title: 'Success',
                                        message: 'Refund Success!',
                                        type: 'success'
                                    });
                                    this.inputRefundRemarks='';
                                    await this.getPaymentList();
                                    this.$refs.viewRefundModal.hide();
                                    break;
                            }
                        }
                    }
                }
                catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();

            },

            async getTransactionDocumentPdf(objValue) {
                try {
                    const resp = await DataSource.shared.getTransactionDocumentPdf(objValue.DocumentType, objValue.InvRecID);

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
                } catch (e) {
                    this.results = e;
                }
            },

            async getReceiptWithTransactionHistory(objValue) {
                try {
                    let obj_List = [];
                    if (objValue.recNameList) {
                        this.tempList = objValue.recNameList.split(',');
                        this.tempList.forEach(m => {
                            let objDetail = {
                                receiptName: m,
                            };
                            obj_List.push(objDetail);
                        });
                    } else {
                        let objDetail = {
                            receiptName: '',
                        };
                        obj_List.push(objDetail);
                    }

                    let invoiceName = objValue.IH_Invoice_Name;
                    //For credit note
                    this.cnInvoiceName = objValue.IH_Invoice_Name;
                    this.receiptInvoiceName = objValue.IH_Invoice_Name;

                    const resp = await DataSource.shared.getReceiptWithTransactionHistory(JSON.stringify(obj_List), this.studentID, invoiceName);

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
                                this.studentReceiptGenerationByTransactionHistoryListInt = resp.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },

            async getReInvoice(objValue) {
                try {
                    this.studentCourseID = this.$route.query.scid; //
                    this.studentID = this.$route.query.sid;

                    if (objValue.IH_Invoice_Name) {
                        const resp = await DataSource.shared.getReInvoice(this.studentID, this.studentCourseID, objValue.IH_Invoice_Name);
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
                                    this.tempReInvoiceResp.forEach(m => {
                                        m.newPayAmount = m.SPPD_TotalValue;
                                        this.customizeReInvoiceResponce.push(m);
                                    });
                                    this.ReInvoiceListInt = this.customizeReInvoiceResponce;
                                    this.customizeReInvoiceResponce = [];
                            }
                        }
                    } else {
                        const resp = await DataSource.shared.getReInvoice(this.studentID, this.studentCourseID, this.Re_InvoiceName);
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
                                    this.tempReInvoiceResp.forEach(m => {
                                        m.newPayAmount = m.SPPD_TotalValue;
                                        this.customizeReInvoiceResponce.push(m);
                                    });
                                    this.ReInvoiceListInt = this.customizeReInvoiceResponce;
                                    this.customizeReInvoiceResponce = [];
                            }
                        }
                    }

                } catch (e) {
                    this.results = e;
                }
            },

            async showGenerateReceiptByHistory(value) {
                try {
                    this.leftOverActionFlag = 'receipt';
                    await this.getReceiptWithTransactionHistory(value);
                    await this.getleftOverPaymentReceipt(value);
                    await this.clearSelect();
                    this.spdSelection = [];
                    this.$refs.showGenerateReceiptByHistoryModal.show();
                } catch (e) {
                    this.results = e;
                }
            },

            async showGenerateCreditNote(value) {
                this.spdSelection = [];
                this.leftOverActionFlag = 'cn';
                await this.getReceiptWithTransactionHistory(value);
                await this.getleftOverPaymentReceipt(value);
                this.$refs.creditNoteModal.show();

            },

            async showReInvoice(value) {
                await this.getReInvoice(value);
                this.Re_InvoiceName = value.IH_Invoice_Name;
                this.spdSelection = [];
                this.$refs.showReInvoiceModal.show();
            },

            // todo: generate receipt
            async showGenerateReceipt() {
                try {
                    await this.getStudentReceiptGenerationList();
                    this.spdSelection = [];
                    this.$refs.generateReceiptModal.show();
                    await this.clearSelect();
                } catch (e) {
                    this.results = e;
                }
            },

            //todo: call preview/generate invoice b-modal
            async showGenerateInvoice() {
                try {
                    await this.getStudentInvoiceGenerationList();
                    this.spdSelection = [];
                    this.$refs.generateInvoiceModal.show();
                    await this.clearSelect();
                } catch (e) {
                    this.results = e;
                }
            },

            showPaymentReminder(reminderValue, invoiceValue){
                this.getReminderEmail(reminderValue,invoiceValue);
                this.$refs.showPaymentReminderModal.show();
            },

            async getReminderEmail(reminderValue,invoiceValue){
                try{
                    this.lblPaymentReminder = reminderValue;
                    let noOfReminder = '';
                    if(reminderValue=='1st')
                    { noOfReminder = 1; }
                    else if(reminderValue=='2nd')
                    { noOfReminder = 2; }
                    else if(reminderValue=='3rd')
                    { noOfReminder = 3;}
                    //pass invoice number value for email "sendEmailReminderClick"
                    this.invoiceNoForEmailReminder= invoiceValue;
                    //End:pass invoice number value for email "sendEmailReminderClick"
                    const resp = await DataSource.shared.getReminderEmail(noOfReminder,invoiceValue,this.studentCourseID,this.studentID);
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

                                this.emailReminderList = resp.Table;

                                this.emailReminderList.forEach(m=>{
                                    this.inputEmailTo=m.toEmail;
                                    this.inputEmailSubject=m.emailSubject;
                                    this.inputEmailMessage=m.emailMessage;
                                })
                        }
                    }
                }
                catch (e) {
                    this.results = e;
                }
            },

            async sendEmailReminderClick(){
                try{
                    const resp = await DataSource.shared.sendReminderEmail(this.inputEmailTo,this.inputEmailSubject,JSON.stringify(this.inputEmailMessage),this.invoiceNoForEmailReminder);
                    switch (resp.code) {
                        case "2":
                            console.log('Cannot Send Email, Please check with IT');
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
                            this.$notify({
                                title: 'Success',
                                message: 'Successfully Sent!',
                                type: 'success'
                            });
                            this.$refs.showPaymentReminderModal.hide();
                            break;
                    }

                }
                catch (e) {
                    this.results = e;
                }
            },

            splitReceiptList(value) {
                try {
                    var splitList = [];

                    splitList = value;

                    return splitList.split(',');
                } catch (e) {
                    this.results = e;
                }
            },

            SiblingConfirmationClick(value){
                try{

                    if(value==='Yes'){
                        //cont
                    }
                    else{
                        this.$refs.showSiblingConfirmationModal.hide();
                    }
                    return value;
                }
                catch (e) {
                    this.results = e;
                }
            },

            //Vue Tour :Start
            //todo:Apply payment plan Tour guide:start
            studentPaymentPlanTourStart(value) {
                this.tourPageControl = value ;
                if(value=='pp')
                {
                    this.$tours['MasterPageTourName'].start();
                }
                else if(value=='sd')
                {
                    if(this.isSiblingDiscountEligible){
                        this.$tours['MasterPageTourName'].start();
                    }
                    else{

                        alert('No sibling/staff discount!!');
                    }
                }
                else if(value=='items')
                {
                    this.$tours['MasterPageTourName'].start();
                }
                else if(value=='gi')
                {
                    this.$tours['MasterPageTourName'].start();
                }
                else if(value=='gr')
                {
                    this.$tours['MasterPageGRTourName'].start();
                }
                else if(value=='cn')
                {
                    this.TourGenerateCNFlag = [];
                    let list =[];
                    let CNFlagCount = 0;
                    this.PaymentListInt.forEach(m=>{
                        if(m.generateCNFlag=='Yes')
                        {
                            list.push(m);
                            CNFlagCount++;
                        }
                    });

                    this.TourGenerateCNFlag = list[0];

                    if(CNFlagCount<1)
                    {
                        alert('No credit note available');
                    }
                    else
                    {
                        this.$tours['MasterPageCNTourName'].start();
                    }
                }
                else if(value=='rf')
                {
                    this.TourRefundFlag = [];
                    let list =[];
                    let RefundFlagCount = 0;
                    this.PaymentListInt.forEach(m=>{
                        if(m.refundFlag=='Yes')
                        {
                            list.push(m);
                            RefundFlagCount++;
                        }
                    });

                    this.TourRefundFlag = list[0];

                    if(RefundFlagCount<1)
                    {
                        alert('No refund available');
                    }
                    else
                    {
                        this.$tours['MasterPageRFTourName'].start();
                    }
                }
            },
            sppTourPreviousSteps (currentStep) {
                let finalSteps = currentStep - 1;
                this.tourCallBackStepsFunc(finalSteps);
            },
            sppTourNextSteps (currentStep) {
                try{
                    if(this.tourPageControl=='pp')
                    {
                        setTimeout(() =>{
                            this.$tours['MasterPageTourName'].stop();
                        },500);
                        this.showGenerateInvoice();
                        setTimeout(() =>{
                            this.$tours['InvModalPPTourName'].start()
                        },500);
                    }
                    else if(this.tourPageControl=='sd')
                    {
                        setTimeout(() =>{
                            this.$tours['MasterPageTourName'].stop();
                        },500);
                        this.showGenerateInvoice();
                        setTimeout(() =>{
                            this.$tours['InvModalSDTourName'].start()
                        },500);
                    }
                    else if(this.tourPageControl=='items')
                    {
                        setTimeout(() =>{
                            this.$tours['MasterPageTourName'].stop();
                        },500);
                        this.showGenerateInvoice();
                        setTimeout(() =>{
                            this.$tours['InvModalAITourName'].start()
                        },500);
                    }
                    else if(this.tourPageControl=='gi')
                    {
                        this.studentInvoiceListAreaBorder = false;
                        setTimeout(() =>{
                            this.$tours['MasterPageTourName'].stop();
                        },500);
                        this.showGenerateInvoice();
                        setTimeout(() =>{
                            if(this.studentInvoiceGenerationListInt.length>0)
                            {
                                this.$tours['InvModalGITourName'].start();
                            }
                            else
                            {
                                alert('Not invoice items to generate!,please add items/payment plan');
                                this.$refs.generateInvoiceModal.hide();
                            }
                        },500);
                    }
                    else if(this.tourPageControl=='gr')
                    {
                        this.studentReceiptListAreaBorder = false;
                        setTimeout(() =>{
                            this.$tours['MasterPageGRTourName'].stop();
                        },500);
                        this.showGenerateReceipt();
                        setTimeout(() =>{
                            this.$tours['grModalTourName'].start();
                            this.ddlPaymentMode = '';
                        },500);
                    }
                    else if(this.tourPageControl=='cn')
                    {
                        setTimeout(() =>{
                            this.getleftOverPaymentReceipt(objValue);
                            this.$tours['MasterPageCNTourName'].start();
                        },500);
                    }
                    else if(this.tourPageControl=='rf')
                    {
                        setTimeout(() =>{
                            this.showRefund(objValue);
                            this.$tours['MasterPageRFTourName'].start();
                        },500);
                    }
                }
                catch (e) {
                    this.results = e;
                }
            },
            InvModalPPTourPreviousSteps (currentStep){
                setTimeout(() =>{
                },500);
                // let finalSteps = currentStep - 1;
                // this.tourCallBackStepsFunc(finalSteps);
            },
            InvModalPPTourNextSteps(currentStep){
                let finalSteps = currentStep + 1;
                if(currentStep==0)
                {
                    setTimeout(() =>{
                        this.$tours['InvModalPPTourName'].stop()
                    },500);
                    this.$refs.generateInvoiceModal.hide();
                    this.applyPaymentPlanClick();
                    setTimeout(() =>{
                        this.$tours['ppModalTourName'].start();
                    },500);
                }

            },
            InvModalSDTourPreviousSteps (currentStep){
                setTimeout(() =>{
                },500);
            },
            InvModalSDTourNextSteps(currentStep){
                let finalSteps = currentStep + 1;
                if(currentStep==0)
                {
                    setTimeout(() =>{
                        this.$tours['InvModalSDTourName'].stop()
                    },500);
                    this.$refs.generateInvoiceModal.hide();
                    this.showDiscountPlanClick();
                    setTimeout(() =>{
                        this.$tours['sdModalTourName'].start();
                    },500);
                }
            },
            InvModalAITourPreviousSteps (currentStep){
                setTimeout(() =>{
                },500);
            },
            InvModalAITourNextSteps(currentStep){
                let finalSteps = currentStep + 1;
                if(currentStep==0)
                {
                    setTimeout(() =>{
                        this.$tours['InvModalAITourName'].stop()
                    },500);
                    this.$refs.generateInvoiceModal.hide();
                    this.addItemClick();
                    setTimeout(() =>{
                        this.$tours['aiModalTourName'].start();
                    },500);
                }
            },
            InvModaGITourPreviousSteps(currentStep){
                if(currentStep==0)
                {
                    this.studentInvoiceListAreaBorder = true;
                }
                else{
                    this.studentInvoiceListAreaBorder = false;
                }
            },
            InvModalGITourNextSteps(currentStep){
                if(currentStep==0)
                {
                    this.studentInvoiceListAreaBorder = true;
                }
                else{
                    this.studentInvoiceListAreaBorder = false;
                }
            },
            RecModalGRTourNextSteps(currentStep){
                let ddlPaymentModeValue = this.ddlPaymentMode;
                if(ddlPaymentModeValue=='CASH'){
                        setTimeout(() =>{
                            this.$tours['grModalTourName'].stop();
                            this.$tours['grModalTourCuztomizeName'].start();
                        },500);
                    if(currentStep==2)
                    {
                        this.studentReceiptListAreaBorder = true;
                    }
                    else{
                        this.studentReceiptListAreaBorder = false;
                    }
                }
                else{
                    if(currentStep==3)
                    {
                        this.studentReceiptListAreaBorder = true;
                    }
                    else{
                        this.studentReceiptListAreaBorder = false;
                    }
                }
            },
            RecModalGRTourPreviousSteps(currentStep){
                    if(currentStep==4)
                    {
                        this.studentReceiptListAreaBorder = false;
                    }
                    else if(currentStep==5){
                        this.studentReceiptListAreaBorder = true;
                    }
                    else{
                        this.studentReceiptListAreaBorder = false;
                    }

            },
            RecModalGRTourCuztomizePreviousSteps(currentStep){
                if(currentStep==2)
                {
                    this.studentReceiptListAreaBorder = false;
                }
                else if(currentStep==3){
                    this.studentReceiptListAreaBorder = true;
                }
                else{
                    this.studentReceiptListAreaBorder = false;
                }
            },
            RecModalGRTourCuztomizeNextSteps(currentStep){
                    if(currentStep==1)
                    {
                        this.studentReceiptListAreaBorder = true;
                    }
                    else{
                        this.studentReceiptListAreaBorder = false;
                    }
            },
            MasterPageCNTourNextSteps(){
                setTimeout(() =>{
                    this.$tours['MasterPageCNTourName'].stop();
                },500);
                setTimeout(() =>{
                    this.showGenerateCreditNote(this.TourGenerateCNFlag);
                },500);
                setTimeout(() =>{
                    this.$tours['cnModalTourName'].start();
                    this.studentCreditNoteListAreaBorder = true;
                },1500);
            },
            MasterPageRFTourNextSteps(){
                setTimeout(() =>{
                    this.$tours['MasterPageRFTourName'].stop();
                },500);
                setTimeout(() =>{
                    this.showRefund(this.TourRefundFlag);
                },500);
                setTimeout(() =>{
                    this.$tours['rfModalTourName'].start();
                    this.studentRefundListAreaBorder = true;
                },1500);
            },
            MasterPageRFTourPreviousSteps(){},
            rfModalTourNextSteps(currentStep){
                    this.studentRefundListAreaBorder = false;
            },
            rfModalTourPreviousSteps(currentStep){
                if(currentStep==1){
                    this.studentRefundListAreaBorder = true;
                }
                else {
                    this.studentRefundListAreaBorder = false;
                }
            },
            CNModalTourNextSteps(currentStep){
                this.studentCreditNoteListAreaBorder = false;
            },
            CNModalTourPreviousSteps(currentStep){
                if(currentStep==1){
                    this.studentCreditNoteListAreaBorder = true;
                }
                else{
                    this.studentCreditNoteListAreaBorder = false;
                }

            },
            tourCallBackStepsFunc (finalSteps) {

            },
            backToMasterPageTour()
            {
                this.$refs.generateInvoiceModal.hide();
                this.$refs.generateReceiptModal.hide();
                this.$refs.viewRefundModal.hide();
                if(this.tourPageControl=='gr'){
                    setTimeout(() =>{
                        this.$tours['grModalTourName'].stop();
                        this.$tours['MasterPageGRTourName'].start();
                    },500);
                }
                else if(this.tourPageControl=='rf')
                {
                    setTimeout(() =>{
                        this.$tours['rfModalTourName'].stop();
                        this.$tours['MasterPageRFTourName'].start();
                    },500);
                }
                else{
                    setTimeout(() =>{
                        this.$tours['InvModalPPTourName'].stop();
                        this.$tours['MasterPageTourName'].start();
                    },500);
                }

            },
            backToInvModalPPTour()
            {
                this.$refs.newApplyPaymentPlanShowModal.hide();
                this.$refs.generateInvoiceModal.show();
                setTimeout(() =>{
                    this.$tours['ppModalTourName'].stop();
                    this.$tours['InvModalPPTourName'].start();
                },500);
            },
            backToInvModalSDTour()
            {
                this.$refs.newApplyDiscountPlanShowModal.hide();
                this.$refs.generateInvoiceModal.show();
                setTimeout(() =>{
                    this.$tours['sdModalTourName'].stop();
                    this.$tours['InvModalSDTourName'].start();
                },500);
            },
            backToInvModalAITour()
            {
                setTimeout(() =>{
                    this.$refs.newAddItemShowModal.hide();
                    this.$refs.generateInvoiceModal.show();
                },500);

                setTimeout(() =>{
                    this.$tours['aiModalTourName'].stop();
                    this.$tours['InvModalAITourName'].start();
                },500);
            },
            backToMasterCNPageTour()
            {
                this.studentCreditNoteListAreaBorder = false;
                setTimeout(() =>{
                    this.$tours['cnModalTourName'].stop();
                },500);

                setTimeout(() =>{
                    this.$refs.creditNoteModal.hide();
                    this.$tours['MasterPageCNTourName'].start();
                },600);
            },
            sdModalTourStop(){
                setTimeout(() =>{
                    this.$tours['sdModalTourName'].stop();
                    // this.$refs.generateInvoiceModal.show();
                },500);
                this.$refs.newApplyDiscountPlanShowModal.hide();
            },
            ppModalTourStop(){
                setTimeout(() =>{
                    this.$tours['ppModalTourName'].stop();
                    // this.$refs.generateInvoiceModal.show();
                },500);
                this.$refs.newApplyPaymentPlanShowModal.hide();
            },
            aiModalTourStop(){
                setTimeout(() =>{
                    this.$tours['aiModalTourName'].stop();
                },500);
                this.$refs.newAddItemShowModal.hide();
            },
            giModalTourStop(){
                setTimeout(() =>{
                    this.$tours['InvModalGITourName'].stop();
                },500);
                this.$refs.generateInvoiceModal.hide();
            },
            grModalTourStop(){
                setTimeout(() =>{
                    this.$tours['grModalTourName'].stop();
                    },500);
                    this.$refs.generateReceiptModal.hide();
            },
            cnModalTourStop(){
                setTimeout(() =>{
                this.$tours['cnModalTourName'].stop();
                },500);
                this.$refs.creditNoteModal.hide();
            },
            rfModalTourStop(){
                setTimeout(() =>{
                    this.$tours['rfModalTourName'].stop();
                },500);
                this.$refs.viewRefundModal.hide();
            },
            stopTour()
            {
                if(this.tourPageControl=='gr')
                {
                    this.$tours['MasterPageGRTourName'].stop();
                }
                else
                {
                    this.$tours['MasterPageTourName'].stop();
                    this.$tours['MasterPageCNTourName'].stop();
                }
            }
            //todo:Apply payment plan Tour guide:end
            //Vue Tour :End
        },
    };
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

    .EligibleColor {
        color: green !important;
    }

    .NotEligibleColor {
        color: red !important;
    }

    .textArea {
        width: 100%;
        resize: none;
    }
    .divBorderClass {
        border-style: solid;
        border-color: red;
    }
</style>