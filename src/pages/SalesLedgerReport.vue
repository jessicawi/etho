<template>
    <div id="Sales-Ledger-Report">
        <div class="container">
            <div>
                <div class="pull-left">
                    <h5 class="text-left mb-3">Sales Ledger</h5>
                    <hr>
                    <div class="row row-no-gutters">
                        <div>
                            <el-form>
                                <el-form-item label="Please select filter/criteria">
                                    <el-select v-on:change="loadSelector()" v-model="ddlSelectedValue"
                                               placeholder="Please select:">
                                        <el-option v-for="items in ddlSelection" :value="items.value">{{items.text}}</el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div v-if="ddlSelectedValue=='dateFrom'">
                            <br><br>
                            <el-form>
                                <el-date-picker
                                        v-model="inputFromDate"
                                        type="daterange"
                                        range-separator="TO"
                                        start-placeholder="From Date"
                                        end-placeholder="To Date"
                                        format="dd/MM/yyyy"
                                        value-format="dd/MM/yyyy">
                                </el-date-picker>
                            </el-form>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" v-if="ddlSelectedValue=='dateRange'">
                            <el-form >
                                <el-form-item label="Select Date Range">
                                    <el-select v-model="ddlSelectedDateRangeValue"
                                               placeholder="Please select:">
                                        <el-option v-for="items in ddlDateRangeSelection" :value="items.value">{{items.text}}</el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div>
                            <br><br>
                            <button class="btn btn-success searchbtn" id="btnSearch" v-on:click="Search()">Search</button>
                        </div>
                    </div>

                </div>
            </div>

            <div class="empty-list_image"
                 v-if="SalesLedgerListInt.length<1">
                <strong>{{startupText}}</strong>
                <img src="../assets/notfound.png"/>
            </div>

        </div>

        <br><br><br><br><br><br><br><br><br>

        <div class="container-fluid">
            <div v-if="SalesLedgerListInt.length>0" class="datatable_group">
                <div class="datatable-form__submit text-right">
                    <button class="btn btn-success" id="btnSalesLedgerDownload" v-on:click="Download()">Download</button><br><br>
                </div>
                <h5 class="text-left mb-3">
                    <p style="color:blue" class="font-weight-bold">Sales Ledger Report</p>
                </h5><hr>

                <data-tables :data="SalesLedgerListInt" :page-size="pageSize"
                             :pagination-props="{ pageSizes: [pageSize,100] }"
                             width="55" stripe tooltip-effect='light' border
                             ref="SalesLedgerListTable">
                    <el-table-column label="#" min-width="25px">
                        <template slot-scope="scope">
<!--                            {{(scope.$index)+1}}-->
                            {{scope.row.Index}}
                        </template>
                    </el-table-column>
                    <el-table-column v-for="item in SalesLedgerList"
                                     :prop="item.prop"
                                     :label="item.label"
                                     :key="item.prop"
                                     sortable="custom">
                    </el-table-column>
                </data-tables>
            </div>
            <br><br>
            <div v-if="CNRefundListInt.length>0" class="datatable_group">
                <h5 class="text-left mb-3">
                    <p style="color:blue" class="font-weight-bold">Credit Note Details</p></h5><hr>

                <data-tables :data="CNRefundListInt" :page-size="pageSize"
                             :pagination-props="{ pageSizes: [pageSize,100] }"
                             width="55" stripe tooltip-effect='light' border
                             ref="SalesLedgerListTable">
                    <el-table-column label="#" min-width="25px">
                        <template slot-scope="scope">
<!--                            {{(scope.$index)+1}}-->
                            {{scope.row.Index}}
                        </template>
                    </el-table-column>
                    <el-table-column v-for="item in CNRefundList"
                                     :prop="item.prop"
                                     :label="item.label"
                                     :key="item.prop"
                                     sortable="custom">
                    </el-table-column>
                </data-tables>
            </div>
        </div>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";
    import XLSX from 'xlsx';
    export default {
        name: "SalesLedgerReport",
        async created(){

        },
        async mounted(){},
        data(){
            return{
                ddlSelection:[
                    { text: 'Date Range', value: 'dateRange' },
                    { text: 'DateFrom/DateTo', value: 'dateFrom' },
                ],
                ddlDateRangeSelection:[
                    { text: 'Week', value: 'week' },
                    { text: 'Month', value: 'month' },
                    { text: 'Year', value: 'year' },
                ],
                SalesLedgerListInt:[],
                SalesLedgerList:[{
                    prop: "IH_Invoice_Date_Convert_Mon",
                    label: "DATE"
                },{
                    prop: "CLS_ClassName",
                    label: "CLASS"
                },{
                    prop: "IH_Invoice_No",
                    label: "INV NO"
                },{
                    prop: "Full_Name",
                    label: "First Name"
                },{
                    prop: "Last_name",
                    label: "Last Name"
                },{
                    prop: "itemTotalAmount",
                    label: "TOTAL"
                },{
                    prop: "itemGstAmount",
                    label: "GST"
                },{
                    prop: "insurance",
                    label: "INSURANCE"
                },{
                    prop: "mealCharges",
                    label: "MEAL CHARGES"
                },{
                    prop: "subsidy",
                    label: "SUBSIDY"
                },{
                    prop: "regFee",
                    label: "Reg.Fee"
                },{
                    prop: "schoolFee",
                    label: "SCHOOL FEES"
                },{
                    prop: "others",
                    label: "OTHERS"
                },{
                    prop: "refundableDeposit",
                    label: "REFUNDABLE DEPOSIT"
                },{
                    prop: "siblingDiscount",
                    label: "SIBLING DISCOUNT"
                }],
                CNRefundListInt:[],
                CNRefundList:[{
                    prop: "IH_Invoice_Date_Convert_Mon",
                    label: "DATE"
                },{
                    prop: "CLS_ClassName",
                    label: "CLASS"
                },{
                    prop: "IH_Invoice_No",
                    label: "CR NO"
                },{
                    prop: "Full_Name",
                    label: "First Name"
                },{
                    prop: "Last_name",
                    label: "Last Name"
                },{
                    prop: "IH_Invoice_Type",
                    label: "Type"
                },{
                    prop: "insurance",
                    label: "INSURANCE"
                },{
                    prop: "refundableDeposit",
                    label: "REFUNDABLE DEPOSIT"
                },{
                    prop: "others",
                    label: "OTHERS"
                },{
                    prop: "mealCharges",
                    label: "MEAL CHARGES"
                },{
                    prop: "schoolFees",
                    label: "SCHOOL FEES"
                },{
                    prop: "siblingDiscount",
                    label: "SIBLING DISCOUNT"
                },{
                    prop: "itemGstAmount",
                    label: "GST"
                },{
                    prop: "itemTotalAmount",
                    label: "TOTAL"
                },{
                    prop: "IH_Invoice_Name",
                    label: "INV NO"
                }],
                ddlSelectedValue:'',
                ddlSelectedDateRangeValue:'',
                inputFromDate:[],
                startupText:'',
                pageSize:50,
            }
        },
        methods:{
            ClearAllList(){
                this.CNRefundListInt=[];
                this.SalesLedgerListInt=[];
            },

            loadSelector(){
                try{
                    console.log(this.ddlSelectedValue);
                }
                catch (e) {
                    this.results = e;
                }
            },
            async Search() {
                try {
                    this.startupText = "No Data Found...";
                    await this.ClearAllList();
                    if (!this.ddlSelectedValue)
                    {
                        this.$notify({
                            title: 'Require',
                            message: '"Please select criteria"'
                        });
                    }
                    else if(this.inputFromDate.length<1&&!this.ddlSelectedDateRangeValue)
                    {
                        this.$notify({
                            title: 'Require',
                            message: '"Please select date"'
                        });
                    }
                    else
                    {
                        this.$vs.loading();

                          if(this.ddlSelectedValue=='dateRange'){
                              this.inputFromDate = [];
                          }
                          else if(this.ddlSelectedValue=='dateFrom'){
                              this.ddlSelectedDateRangeValue='';
                          }
                            if(1==1){
                                const response = await DataSource.shared.getSalesLedger('invoice', this.ddlSelectedDateRangeValue,
                                    this.inputFromDate[0],this.inputFromDate[1]);

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
                                        let cuztomizeList =[];
                                        cuztomizeList=response.Table;
                                        let Index =1;
                                        cuztomizeList.forEach(m=>{
                                            let tempList={
                                                Index:Index,
                                                IH_Invoice_Date_Convert_Mon:m.IH_Invoice_Date_Convert_Mon,
                                                CLS_ClassName:m.CLS_ClassName,
                                                IH_Invoice_No:m.IH_Invoice_No,
                                                studentName:m.studentName,
                                                Full_Name:m.Full_Name,
                                                Last_name:m.Last_name,
                                                itemTotalAmount:m.itemTotalAmount,
                                                itemGstAmount:m.itemGstAmount,
                                                insurance:m.insurance,
                                                mealCharges:m.mealCharges,
                                                subsidy:m.subsidy,
                                                registrationFee:m.registrationFee,
                                                schoolFee:m.schoolFee,
                                                others:m.others,
                                                refundableDeposit:m.refundableDeposit,
                                                siblingDiscount:m.siblingDiscount,
                                            };
                                            Index++;
                                            this.SalesLedgerListInt.push(tempList);
                                        });
                                        // this.SalesLedgerListInt = response.Table;
                                    }
                                }
                            }
                            if(2==2){
                                const response = await DataSource.shared.getSalesLedger('cn', this.ddlSelectedDateRangeValue,
                                    this.inputFromDate[0],this.inputFromDate[1]);

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
                                        let cuztomizeList =[];
                                        cuztomizeList=response.Table;
                                        let Index =1;
                                        cuztomizeList.forEach(m=>{
                                            let tempList={
                                                Index:Index,
                                                IH_Invoice_Date_Convert_Mon:m.IH_Invoice_Date_Convert_Mon,
                                                CLS_ClassName:m.CLS_ClassName,
                                                IH_Invoice_No:m.IH_Invoice_No,
                                                studentName:m.studentName,
                                                Full_Name:m.Full_Name,
                                                Last_name:m.Last_name,
                                                IH_Invoice_Type:m.IH_Invoice_Type,
                                                insurance:m.insurance,
                                                refundableDepoit:m.refundableDepoit,
                                                others:m.others,
                                                mealCharges:m.mealCharges,
                                                schoolFees:m.schoolFees,
                                                siblingDiscount:m.siblingDiscount,
                                                itemGstAmount:m.itemGstAmount,
                                                itemTotalAmount:m.itemTotalAmount,
                                                IH_Invoice_Name:m.IH_Invoice_Name,
                                            };
                                            this.CNRefundListInt.push(tempList);
                                            Index++;
                                        });
                                        // this.CNRefundListInt = response.Table;
                                    }
                                }
                            }

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
                                this.SalesLedgerListInt = response.Table;
                            }
                        }

                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },

            Download(){
                this.exportExcel();
            },

            exportExcel () {
                let exportSLExcelObject = [];
                let exportCNExcelObject = [];

                var currentDateWithFormat = new Date().toJSON().slice(0,10).replace(/-/g,'/');

                if(1==1){
                    this.SalesLedgerListInt.forEach(m=>{
                        let tempList={
                            DATE:m.IH_Invoice_Date_Convert_Mon,
                            CLASS:m.CLS_ClassName,
                            'INV NO':m.IH_Invoice_No,
                            'First Name':m.Full_Name,
                            'Last Name':m.Last_name,
                            TOTAL:m.itemTotalAmount,
                            GST:m.itemGstAmount,
                            INSURANCE:m.insurance,
                            'MEAL CHARGES':m.mealCharges,
                            SUBSIDY:m.subsidy,
                            'Reg.Fee':m.registrationFee,
                            'SCHOOL FEES':m.schoolFee,
                            OTHERS:m.others,
                            'REFUNDABLE DEPOSIT':m.refundableDeposit,
                            'SIBLING DISCOUNT':m.siblingDiscount,
                        };
                        exportSLExcelObject.push(tempList);
                    });
                }
                if(2==2)
                {
                    this.CNRefundListInt.forEach(m=>{
                        let tempList={
                            DATE:m.IH_Invoice_Date_Convert_Mon,
                            CLASS:m.CLS_ClassName,
                            'CR NO':m.IH_Invoice_No,
                            'First Name':m.Full_Name,
                            'Last Name':m.Last_name,
                            Type:m.IH_Invoice_Type,
                            INSURANCE:m.insurance,
                            'REFUNDABLE DEPOSIT':m.refundableDepoit,
                            OTHERS:m.others,
                            'MEAL CHARGES':m.mealCharges,
                            'SCHOOL FEES':m.schoolFees,
                            'SIBLING DISCOUNT':m.siblingDiscount,
                            GST:m.itemGstAmount,
                            TOTAL:m.itemTotalAmount,
                            'INV NO':m.IH_Invoice_Name,
                        };
                        exportCNExcelObject.push(tempList);
                    });
                }

                var sheet1WS = XLSX.utils.json_to_sheet(exportSLExcelObject)
                var wb = XLSX.utils.book_new() // make Workbook of Excel
                XLSX.utils.book_append_sheet(wb, sheet1WS, 'sheet1') // sheetAName is name of Worksheet
                XLSX.writeFile(wb, 'SalesLedger - '+currentDateWithFormat+'.xlsx') // name of the file is 'book.xlsx'

                var sheet2WS = XLSX.utils.json_to_sheet(exportCNExcelObject)
                var wb2 = XLSX.utils.book_new() // make Workbook of Excel
                XLSX.utils.book_append_sheet(wb2, sheet2WS, 'sheet2') // sheetAName is name of Worksheet
                XLSX.writeFile(wb2, 'CN - '+currentDateWithFormat+'.xlsx') // name of the file is 'book.xlsx'
            },
        }
    }
</script>

<style scoped>

</style>