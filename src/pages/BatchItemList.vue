<template>
    <div id="batch-item-list">
        <div class="col">
            <h3><b>Please select Batch Payment Plan or Batch Item..</b></h3><br>
                <template>
                    <el-select v-model="mainSelectedValue"
                               v-on:change="loadSelectionPage()"
                               clearable placeholder="Please select">
                        <el-option v-for="item in mainSelectionList"
                                   :label="item.label" :key="item.value"
                                   :value="item.value">
                            {{item.label}}
                        </el-option>
                    </el-select>
                </template>
            <br><hr>
            <div class="empty-list_image"
                 v-if="mainSelectedValue===''">
                <strong>{{startupText}}</strong>
                <img src="../assets/notfound.png"/>
            </div>
        </div>
        <div class="container" v-if="mainSelectedValue==='items'">
           <h3><b>Batch Items</b></h3>
           <el-row>
               <el-button v-on:click="setupAddItem('item')">Set up Add Item</el-button>
           </el-row>
            <div class="pb-5">
                <div class="empty-list_image"
                     v-if="itemsListHasValue==false">
                    <strong>{{startupText}}</strong>
                    <img src="../assets/notfound.png"/>
                </div>

                <div v-if="itemsListHasValue==true" class="datatable_group">
                    <data-tables :page-size="pageSize" ref="selectableTable"
                                 :pagination-props="{Pagination:false,showPaginationBottom:false}"
                                 :data="AddedItemsListInt" @selection-change="changeSelection"
                                 width="55" stripe tooltip-effect='light' border>

                        <el-table-column v-for="item in AddedItemsList"
                                         :prop="item.prop" :label="item.label" :key="item.prop" sortable="custom">
                        </el-table-column>
                    </data-tables>
                    <el-button-group class="pull-right">
                        <el-button v-if="AddedItemsListInt.length>0" @click="AddItemsClick()">Add items for selected students</el-button>
                        <el-button @click="ClearItemsList()">Clear Added Items List</el-button>
                    </el-button-group>
                </div>
                <br><br><hr>

                <div class="container" v-if="(AddedItemsListInt.length>0&&itemsListHasValue==true)||btnSelectedItem==='paymentplan'">
                    <div class="row">
                        <div class="col">
                            <template>
                                <el-select v-model="selectedSemID" class="fullwidth"
                                           v-on:change="BindAcademicYear()"
                                           clearable placeholder="AcademicYear">
                                    <el-option v-for="item in academicYearList" :label="item.SMT_Code"
                                               :value="item.PK_Semester_ID">
                                        {{item.SMT_Code}}
                                    </el-option>
                                </el-select>
                            </template>
                        </div>
                        <div class="col">
                            <template>
                                <el-select v-model="selectedLevelID" class="fullwidth"
                                           v-on:change="loadCourses()"
                                           clearable placeholder="Course">
                                    <el-option v-for="item in courseList"
                                               :label="item.CRS_Course_Name"
                                               :value="item.PK_Course_ID">
                                        {{item.CRS_Course_Name}}
                                    </el-option>
                                </el-select>
                            </template>
                        </div>
                        <div class="col">
                            <template>
                                <el-select v-model="selectedClassID" class="fullwidth"
                                           v-on:change="loadClasses()"
                                           clearable placeholder="Class">
                                    <el-option v-for="item in classesList"
                                               :label="item.CLS_ClassName+'-'+item.CLS_Batch"
                                               :value="item.PK_Class_ID">
                                        {{item.CLS_ClassName+'-'+item.CLS_Batch}}
                                    </el-option>
                                </el-select>
                            </template>
                        </div>
                        <div class="col">
                            <template>
                                <el-select v-model="selectedStuCourseStatus" class="fullwidth"
                                           clearable placeholder="Status">
                                    <el-option v-for="item in StuCourseStatusList"
                                               :label="item.label" :key="item.value"
                                               :value="item.value">
                                        {{item.label}}</el-option>
                                </el-select>
                            </template>
                        </div>
                        <div class="col">
                            <template>
                                <el-button @click="SearchStudent()">
                                    Search
                                </el-button>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="empty-list_image"
                     v-if="itemsListHasValue==true&&studentListInt.length==0">
                    <strong>{{startupText}}</strong>
                    <img src="../assets/notfound.png"/>
                </div>
                <div v-if="studentListInt.length>0">
                    <data-tables ref="studentListTable" :page-size="pageSize"
                                 :pagination-props="{ pageSizes: [pageSize,100] }"
                                 :data="studentListInt" @selection-change="changeSelection"
                                 width="55" stripe tooltip-effect='light' border>
                        <el-table-column type="selection" width="55" :reserve-selection="true">
                        </el-table-column>
                        <el-table-column v-for="item in studentList"
                                         :prop="item.prop"
                                         :label="item.label"
                                         :key="item.prop"
                                         sortable="custom">
                        </el-table-column>
                    </data-tables>
                </div>

            </div>
        </div>

        <div class="container" v-if="mainSelectedValue==='paymentplan'">
            <h3><b>Batch Payment Plan</b></h3>
            <div class="container">
                <div class="row">
                    <div class="col">
                        <template>
                            <el-select v-model="selectedSemID" class="fullwidth"
                                       v-on:change="BindAcademicYear()"
                                       clearable placeholder="AcademicYear">
                                <el-option v-for="item in academicYearList" :label="item.SMT_Code"
                                           :value="item.PK_Semester_ID">
                                    {{item.SMT_Code}}
                                </el-option>
                            </el-select>
                        </template>
                    </div>
                    <div class="col">
                        <template>
                            <el-select v-model="selectedLevelID" class="fullwidth"
                                       v-on:change="loadCourses()"
                                       clearable placeholder="Course">
                                <el-option v-for="item in courseList"
                                           :label="item.CRS_Course_Name"
                                           :value="item.PK_Course_ID">
                                    {{item.CRS_Course_Name}}
                                </el-option>
                            </el-select>
                        </template>
                    </div>
                    <div class="col">
                        <template>
                            <el-select v-model="selectedClassID" class="fullwidth"
                                       v-on:change="loadClasses()"
                                       clearable placeholder="Class">
                                <el-option v-for="item in classesList"
                                           :label="item.CLS_ClassName+'-'+item.CLS_Batch"
                                           :value="item.PK_Class_ID">
                                    {{item.CLS_ClassName+'-'+item.CLS_Batch}}
                                </el-option>
                            </el-select>
                        </template>
                    </div>
                    <div class="col">
                        <template>
                            <el-select v-model="selectedStuCourseStatus" class="fullwidth"
                                       clearable placeholder="Status">
                                <el-option v-for="item in StuCourseStatusList"
                                           :label="item.label" :key="item.value"
                                           :value="item.value">
                                    {{item.label}}</el-option>
                            </el-select>
                        </template>
                    </div>
                    <div class="col">
                        <template>
                            <el-button @click="SearchStudent('paymentplan')">
                                Search
                            </el-button>
                        </template>
                    </div>
                </div>
            </div><br><hr>
            <div class="empty-list_image"
                 v-if="studentListInt.length==0">
                <strong>{{startupText}}</strong>
                <img src="../assets/notfound.png"/>
            </div>
            <div v-if="studentListInt.length>0">
                <div class="row ml-2 mr-2">
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div class="row">
                            <div class="col-lg-6"><label>* Payment Plan</label></div>
                            <div class="col-lg-6">
                                <el-button @click="viewPaymentPlan" type="info" rounded size="mini"
                                           class="custom-info-elbutton float-right" v-if="selectedPaymentPlanID!== null">View
                                    Payment Plan <i class="fa fa-eye" aria-hidden="true"></i></el-button>
                            </div>
                        </div>
                        <el-select class="float-left fullwidth" v-model="selectedPaymentPlanID">
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
                        <el-select class="float-left fullwidth" v-model="ddlPaymentPlanStartDate"
                                   v-on:change="loadStudentListFilterByStartDate()" placeholder="Payment Plan Start Date">
                            <el-option
                                    v-for="item in paymentPlanStartDateList"
                                    :key="item.SCRS_From_Date"
                                    :label="item.SCRS_From_Date_convert"
                                    :value="item.SCRS_From_Date">
                            </el-option>
                        </el-select>
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
<!--                        <b-btn @click="closePaymentPlanModal()" class="float-left btn-secondary">Cancel</b-btn>-->
                    </div>
                    <div class="col-lg-6">
                        <button v-on:click="saveBatchPaymentPlanClick()"
                                class="btn btn-primary waves-effect waves-light float-right">Add Batch Payment Plan
                        </button>
                    </div>
                </div>
                <data-tables ref="studentListTable" :page-size="pageSize"
                             :pagination-props="{ pageSizes: [pageSize,100] }"
                             :data="studentListInt" @selection-change="changeSelection"
                             width="55" stripe tooltip-effect='light' border>
                    <el-table-column type="selection" width="55" :reserve-selection="true">
                    </el-table-column>
                    <el-table-column v-for="item in studentList"
                                     :prop="item.prop"
                                     :label="item.label"
                                     :key="item.prop"
                                     sortable="custom">
                    </el-table-column>
                </data-tables>
            </div>
        </div>

        <b-modal id="newAddItemModal" size="lg" title="Add Item" ok-only ok-variant="secondary"
                 hide-footer ref="newAddItemShowModal">
            <div class="row ml-2 mr-2">
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 mb3">
                    <label>* Item</label>
                    <el-select v-model="ddlAddItem" class="fullwidth" @change="onchangeAddItem()">
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
                        <el-date-picker v-model="inputAddItemPaymentDate" format="dd/MM/yyyy"
                                        value-format="dd/MM/yyyy" type="date"
                                        placeholder="Pick a day"></el-date-picker>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>* Amount</label>
                    <input type="text" class="form-control" v-model="inputAddItemAmount" @keypress="onlyNumber">
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
                               @change="onchangeAddItemPaymentSchedule()">
                        <el-option v-for="item in addItemPaymentScheduleList" v-bind:value=" item.OPTvalue.trim()">{{
                            item.OPTvalue.trim() }}
                        </el-option>
                    </el-select>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label>* Payment Item Type</label>
                    <el-select v-model="ddlAddItemPaymentItemType" class="fullwidth">
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
                <div class="col-lg-6">
                    <button v-on:click="addItemClick()"
                            class="btn btn-primary waves-effect waves-light float-right">Add
                    </button>
                </div>
            </div>
        </b-modal>
        <b-modal id="newApplyPaymentPlanModal" size="lg" title="Apply Payment Plan" ok-only ok-variant="secondary"
                 hide-footer ref="newApplyPaymentPlanShowModal">
            <div></div>
            <div class="row ml-2 mr-2">
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div class="row">
                        <div class="col-lg-6"><label>* Payment Plan</label></div>
                        <div class="col-lg-6">
                            <!--<button v-on:click="viewPaymentPlan()"-->
                            <!--class="btn btn-primary waves-effect waves-light float-right">View Payment Plan-->
                            <!--</button>-->
                            <el-button @click="viewPaymentPlan" type="info" rounded size="mini"
                                       class="custom-info-elbutton float-right" v-if="ddlPaymentPlan !== null">View
                                Payment Plan <i class="fa fa-eye" aria-hidden="true"></i></el-button>
                        </div>
                    </div>
                    <el-select class="float-left fullwidth" v-model="ddlPaymentPlan">
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
                    <button v-on:click="savePaymentPlanClick()"
                            class="btn btn-primary waves-effect waves-light float-right">Add Payment Plan
                    </button>
                </div>
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

    </div>
</template>

<script>
    import DataSource from "../data/datasource";
    import Cookies from "js-cookie";

    export default {
        name: "BatchItemList",
        data(){
            return{
                //todo: dropdown start
                paymentPlanConvertedDate:'',
                selectedPaymentPlanID:'',
                paymentPlanStartDateList:[],
                ddlPaymentPlanStartDate:'',
                mainSelectedValue:'',
                mainSelectionList:[{
                    value:'items',
                    label:'Add Payment items',
                },{
                    value:'paymentplan',
                    label:'Add Payment Plan',
                }],
                StuCourseStatusList:[{
                    value:'Active',
                    label:'Active',
                },{
                    value:'Pending',
                    label:'Pending',
                }],
                selectedSemID:'',
                selectedLevelID:'',
                selectedClassID:'',
                selectedStuCourseStatus:'',
                //todo: dropdown end

                // todo:add items start
                cuztomizeItemsList:[],
                itemsListHasValue:false,
                btnSelectedItem:'',
                AddedItemsListInt:[],
                AddedItemsList:[{
                    prop: "SPPD_PayerName",
                    label: "Item Name"
                }, {
                    prop: "SPPD_PaymentAmount",
                    label: "Amount"
                }, {
                    prop: "SPPD_PaymentDate",
                    label: "Payment Date"
                },{
                    prop: "SPPD_Currency",
                    label: "Currency"
                },{
                    prop: "SPPD_PaymentSchedule",
                    label: "Payment Schedule"
                }],
                addItemList: [],
                addItemCurrencyList: [],
                addItemPaymentScheduleList: [],
                addItemPaymentItemTypeList: [],
                addItemRecurringList: [],
                inputAddItemPaymentDate: '',
                inputAddItemAmount: '',
                ddlAddItemCurrency:'',
                inputAddItemToDate: '',
                disabledRecurring: true,
                disableOneTime: true,
                inputAddItemFromDate:'',
                inputAddItemDescription: '',
                ddlAddItemPaymentSchedule: '',
                ddlAddItemPaymentItemType: '',
                isRecurringRequired: false,

                inputAddItemDirect:'',
                ddlAddItemRecurring: '',
                ddlAddItem:'',
                isInputAddItemDirect: false,
                studentListInt:[],
                studentList:[{
                    prop: "Full_Name",
                    label: "First Name"
                },{
                    prop: "Last_name",
                    label: "Last Name"
                },{
                    prop: "Index_No",
                    label: "Index NO"
                },{
                    prop: "sponsor_type",
                    label: "Payee"
                },{
                    prop: "CLS_ClassName",
                    label: "Class"
                },{
                    prop: "SCRS_Status",
                    label: "Course Status"
                }
                // ,{
                //     prop: "SCRS_From_Date",
                //     label: "Course Date"
                // }
                ],
                //todo:add items end

                //todo:add payment plan: start
                cuztomizePaymentPlanList:[],
                setUpPaymentPlanClick: false,
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
                paymentPlanList: [],
                paymentPlanRuleApplyProRateFeesList: [],
                paymentPlanRuleApplySiblingsList: [],
                paymentPlanRuleApplyPostRateFeesList: [],
                ddlPaymentPlanRuleApplyStaffList: [],
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
                //todo:add payment plan: end

                statusSelected:'',
                pageSize:50,
                readonly:true,
                spdSelection:[],
                arrobj_selectedSPD:[],
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
                startupText:'No item added',

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
            this.inputAddItemPaymentDate = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();
            await this.BindAcademicYear();
            await this.BindAddItemDropdown();
        },
        async created(){
            // await this.BindCheckboxEligibility();
        },

        methods:{
            //todo: mainpage selection
            loadSelectionPage(){
                try
                {
                    this.studentListInt = [];
                }
                catch (e)
                {
                    this.results = e;
                }
            },
            //todo: mainpage selection
            ClearPaymentPlanList(){
                this.paymentPlanStartDateList = [];
                this.studentListInt = [];
                this.paymentPlanList = [];
                this.selectedPaymentPlanID = '';
            },

            ClearAllList()
            {
                this.academicYearList = [] ;
                this.courseList = [];
                this.ClearPaymentPlanList();
                this.ClearAllList();
            },

            //todo: For ADD ITEM ONLY
            ClearItemsList()
            {
                try{
                    this.studentListInt = [];
                    this.AddedItemsListInt =[];
                    this.itemsListHasValue = false;
                }
                catch (e)
                {
                    this.results = e;
                }
            },
            async AddItemsClick()
            {
                try
                {
                    let selectedlist = [];
                    this.spdSelection.forEach(m=>{
                        let spdlist={
                            SPPD_FK_Student_Course_ID:m.PK_Student_Course_ID,
                        };
                        selectedlist.push(spdlist);
                    });
                    if(this.spdSelection.length===0){
                        this.$notify.error({
                            title: 'Error!',
                            message: 'Please select at least 1 student!'
                        });
                    }
                    else{
                            const resp = await DataSource.shared.saveBatchItem(JSON.stringify(selectedlist),JSON.stringify(this.cuztomizeItemsList[0][0]));
                                if(resp.code==='99')
                                {
                                    this.$notify({
                                        title: 'Error!',
                                        message: 'Cannot save items!'
                                    });
                                }
                                else if(resp.code==='2'){
                                    this.$notify({
                                        title: 'Error!',
                                        message: 'Failed to save items!'
                                    });
                                }
                                else if(resp.code==='1'){
                                    this.$notify({
                                        title: 'Success!',
                                        message: 'Success!'
                                    });
                                    this.spdSelection = [];
                                    this.studentListInt = [];
                                }
                    }
                }
                catch (e)
                {
                    this.results = e;
                }
            },
            setupAddItem(value)
            {
                try{
                    if(value) {
                        this.clearAddItemField();
                        this.btnSelectedItem = value;
                        if(value=='item')
                        {
                            this.$refs.newAddItemShowModal.show();
                        }
                    }
                    else{
                        this.btnSelectedItem = '';
                    }
                }
                catch (e) {
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
            async onchangeAddItem() {
                if (this.ddlAddItem === 'Others') {
                    this.isInputAddItemDirect = true;
                } else {
                    this.isInputAddItemDirect = false;
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
            async addItemClick(){
                try{
                    let btnAddItemObject = {};

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
                        (this.ddlAddItem === 'Others' && this.inputAddItemDirect === '')){
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please fill in all * fields'
                        });
                    }
                    else
                    {
                        //close b-modal and add item list to temp table
                        let itemsObj = [];
                        itemsObj.push(btnAddItemObject);
                        this.cuztomizeItemsList[0] = itemsObj;
                        this.AddedItemsListInt.push(this.cuztomizeItemsList[0][0]);

                        if(this.AddedItemsListInt) {this.itemsListHasValue = true;}

                        this.$refs.newAddItemShowModal.hide();
                    }
                }
                catch (e) {
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
            //todo: For ADD ITEM ONLY

            getRowKeys(row){
                return row.PK_SPD_ID;
            },
            async changeSelection(val) {
                this.spdSelection=val;
            },
            async BindAcademicYear(){
                try{
                    this.academicYearList=[];
                    this.selectedLevelID = '';
                    this.selectedClassID = '';
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
                    this.selectedClassID = '';
                    this.semesterID = this.selectedSemID;
                    let coursePList =[];
                    if(this.schoolID.length>0){
                        const response = await DataSource.shared.getCourseBySemesterID(this.schoolID,this.semesterID);
                        this.courseListResponse=response.Table;
                        this.courseListResponse.forEach(m => {
                            coursePList.push(m);
                        });
                        this.courseList=coursePList;
                        this.courseListResponse=[];
                        this.classesList = [];
                        if(this.semesterID){
                            await this.loadClasses();
                        }

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
                        const response = await DataSource.shared.getClassBySemesterAndCourseID(this.semesterID,this.selectedLevelID);
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
            async SearchStudent(value){
                try{
                    this.ClearPaymentPlanList();
                          if(!this.selectedSemID)
                            {
                                this.$notify({
                                    title: 'Require',
                                    message: '"Please select academic year"'
                                });
                            }
                            else if(!this.selectedLevelID)
                            {
                                this.$notify({
                                    title: 'Require',
                                    message: '"Please select course"'
                                });
                            }
                            else{
                              const resp = await DataSource.shared.getActiveStudentsBySemSchool(this.selectedSemID,this.selectedLevelID,this.selectedClassID,this.selectedStuCourseStatus);
                              if(resp){
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
                                  }
                                  else{
                                      this.studentListInt=resp.Table;
                                  }
                              }
                              if(value=='paymentplan'){
                                  if(!this.selectedClassID)
                                  {
                                      this.$notify({
                                          title: 'Require',
                                          message: '"Please select Class "'
                                      });
                                      this.studentListInt = [];
                                  }
                                  else{
                                      await this.BindBatchPaymentPlanDropdown();
                                      await this.BindBatchPaymentStartDateDropdown();
                                  }
                              }
                          }

                }
                catch (e) {
                    this.results = e;
                }
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

            //todo: payment plan method start
            async viewPaymentPlan() {
                if (this.selectedPaymentPlanID != '') {
                    const response = await DataSource.shared.getPaymentPlanMasterDetails(this.selectedPaymentPlanID);
                    const paymentPlanDetailsRes = await DataSource.shared.getPaymentPlanMasterDetailsList(this.selectedPaymentPlanID);

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
            async saveBatchPaymentPlanClick(){
                try {
                    let selectedlist = [];
                    this.spdSelection.forEach(m=>{
                        let spdlist={
                            SPPD_FK_Student_Course_ID:m.PK_Student_Course_ID,
                        };
                        selectedlist.push(spdlist);
                    });
                    if(this.spdSelection.length===0){
                        this.$notify.error({
                            title: 'Error!',
                            message: 'Please select at least 1 student!'
                        });
                    }
                    else if(this.selectedPaymentPlanID===''){
                        this.$notify.error({
                            title: 'Error!',
                            message: 'Please select payment plan!'
                        });
                    }
                    else{
                        //todo:paymentPlanList object
                        let AddPaymentPlanObject = {};
                        AddPaymentPlanObject.PK_Course_Fee_Scheme_ID = this.selectedPaymentPlanID;
                        AddPaymentPlanObject.startDate = this.paymentPlanConvertedDate;

                        let itemsObj = [];
                            itemsObj.push(AddPaymentPlanObject);
                        this.cuztomizePaymentPlanList[0] = itemsObj;
                        //todo
                        const resp = await DataSource.shared.saveBatchPaymentPlan(JSON.stringify(selectedlist),JSON.stringify(this.cuztomizePaymentPlanList[0][0]));
                        if(resp.code==='99')
                        {
                            this.$notify({
                                title: 'Error!',
                                message: 'Cannot save batch payment plan!'
                            });
                        }
                        else if(resp.code==='2'){
                            this.$notify({
                                title: 'Error!',
                                message: 'Failed to batch payment plan!'
                            });
                        }
                        else if(resp.code==='1'){
                            this.$notify({
                                title: 'Success!',
                                message: 'Success!'
                            });
                            this.spdSelection = [];
                            this.studentListInt = [];
                            this.clearAddPaymentPlanField();
                        }

                    }

                    }
                catch (e)
                {
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
            async BindBatchPaymentStartDateDropdown() {
                const response = await DataSource.shared.getBatchPaymentStartDate(this.selectedSemID,this.selectedLevelID,this.selectedClassID,this.selectedStuCourseStatus);
                if (response) {
                    if (response.code === '88') {
                        window.location.replace('/');
                    } else if (response.code === '99') {
                        this.paymentPlanStartDateList = '';
                    } else {
                        this.paymentPlanStartDateResponse = response.Table;
                        this.paymentPlanStartDateResponse.forEach(m => {
                            this.paymentPlanStartDateList.push(m);
                        });
                    }
                }
            },
            async BindBatchPaymentPlanDropdown() {
                try {
                    const paymentPlanResponse = await DataSource.shared.getBatchPaymentPlanMasterList(this.schoolID,this.selectedLevelID,this.selectedClassID);
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

                    const ruleResponse = await DataSource.shared.getPaymentPlanRules(this.selectedLevelID, jsonString);
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
            async loadStudentListFilterByStartDate()
            {
                try{
                    await this.SearchStudent('paymentplan');
                    let mainList = [];
                    let count = 0;
                    this.studentListInt.forEach(m=>{
                        if(m.SCRS_From_Date===this.ddlPaymentPlanStartDate)
                        {
                            mainList.push(m);
                            count++;
                        }
                    });
                    this.paymentPlanStartDateList.forEach(n=>{
                        if(this.ddlPaymentPlanStartDate==n.SCRS_From_Date){
                            this.paymentPlanConvertedDate = n.SCRS_From_Date_convert;
                        }
                    });

                    this.studentListInt = mainList;
                }
                catch (e) {
                    this.results = e;
                }
            },
            //todo: payment plan method end
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