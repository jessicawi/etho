<template>
    <div id="Transaction-listing">

        <div class="container">
            <div>
                <h5 class="text-left mb-3"><b>Transaction Listing: </b></h5><hr>
            </div>

            <div class="row row-no-gutters">

            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">*
                <el-select v-on:change="loadSelector()" v-model="ddlDocSelectedValue"
                           placeholder="Select Document Type:">
                    <el-option v-for="items in DocsTypeSelection" :label="items.text"
                               v-bind:value="items.value">{{items.text}}</el-option>
                </el-select>
            </div>

            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">*
                <el-select v-model="ddlSelectedValue"
                           placeholder="Filter By: ">
                    <el-option v-for="items in ddlSelection" :value="items.value">{{items.text}}</el-option>
                </el-select>
            </div>

            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                <el-date-picker
                        v-model="inputFromDate"
                        v-if="ddlSelectedValue=='DateFrom'"
                        type="daterange"
                        range-separator="TO"
                        start-placeholder="From Date"
                        end-placeholder="To Date"
                        format="dd/MM/yyyy"
                        value-format="dd/MM/yyyy">
                </el-date-picker>

                <el-select v-model="inputDateRange" placeholder="Please select Date Range"  v-if="ddlSelectedValue=='DateRange'">
                    <el-option v-for="item in DateRangeOptions" :key="item.value"
                               :label="item.label" :value="item.value">
                    </el-option>
                </el-select>

            </div>

            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                <el-button class="pull-left" v-if="ddlSelectedValue.length>0"
                           v-on:click="Search()">Search</el-button>
            </div>

            </div>
        </div>

        <div class="container-fluid">
            <div>
                <div class="empty-list_image"
                     v-if="TranInvoiceListInt.length<1&&TranReceiptListInt.length<1&&TranCNListInt.length<1">
                    <strong>{{startupText}}</strong>
                    <img src="../assets/notfound.png"/>
                </div>

                <div class="admin-wrap" v-if="ddlDocSelectedValue=='Invoice'">
                    <div class="pb-5">
                        <div class="datatable-form__submit text-right" v-if="TranInvoiceListInt.length>0">
                            <button class="btn btn-success" id="btnInvoiceDownload" v-on:click="Download()">Download</button><br><br>
                        </div>
                        <div class="empty-list_image"
                             v-if="TranInvoiceListInt.length<1">
                            <strong>{{startupText}}</strong>
                            <img src="../assets/notfound.png"/>
                        </div>

                        <div v-if="TranInvoiceListInt.length>0" class="datatable_group">
                            <h5 class="text-left mb-3">
                                <p style="color:blue" class="font-weight-bold">Transaction List(Invoice)</p></h5>

                            <data-tables :data="TranInvoiceListInt" :page-size="pageSize"
                                         :pagination-props="{ pageSizes: [pageSize,100] }"
                                         width="55" stripe tooltip-effect='light' border
                                         ref="TransactionListTable">
                                <el-table-column label="#" min-width="20px">
                                    <template slot-scope="scope">
                                        {{(scope.$index)+1}}
                                    </template>
                                </el-table-column>
                                <el-table-column v-for="item in TranInvoiceList"
                                                 :prop="item.prop"
                                                 :label="item.label"
                                                 :key="item.prop"
                                                 sortable="custom">
                                </el-table-column>
                            </data-tables>
                        </div>
                    </div><hr>
                </div>

                <div class="admin-wrap" v-if="ddlDocSelectedValue=='Receipt'">
                    <div class="pb-5">

                        <div class="datatable-form__submit text-right" v-if="TranReceiptListInt.length>0">
                            <button class="btn btn-success" id="btnReceiptDownload" v-on:click="Download()">Download</button><br><br>
                        </div>

                        <div class="empty-list_image"
                             v-if="TranReceiptListInt.length<1">
                            <strong>{{startupText}}</strong>
                            <img src="../assets/notfound.png"/>
                        </div>

                        <div v-if="TranReceiptListInt.length>0" class="datatable_group">
                            <h5 class="text-left mb-3">
                                <p style="color:blue" class="font-weight-bold">Transaction List(Receipt)</p></h5>

                            <data-tables :data="TranReceiptListInt" :page-size="pageSize"
                                         :pagination-props="{ pageSizes: [pageSize,100] }"
                                         width="55" stripe tooltip-effect='light' border
                                         ref="TransactionListTable">
                                <el-table-column label="#" min-width="20px">
                                    <template slot-scope="scope">
                                        {{(scope.$index)+1}}
                                    </template>
                                </el-table-column>
                                <el-table-column v-for="item in TranReceiptList"
                                                 :prop="item.prop"
                                                 :label="item.label"
                                                 :key="item.prop"
                                                 sortable="custom">
                                </el-table-column>
                            </data-tables>

                        </div>
                    </div><hr>
                </div>

                <div class="admin-wrap" v-if="ddlDocSelectedValue=='cn'">
                    <div class="pb-5">

                        <div class="datatable-form__submit text-right" v-if="TranCNListInt.length>0">&nbsp;
                            <button class="btn btn-success" id="btnCNDownload" v-on:click="Download()">Download</button><br><br>
                        </div>

                        <div class="empty-list_image"
                             v-if="TranCNListInt.length<1">
                            <strong>{{startupText}}</strong>
                            <img src="../assets/notfound.png"/>
                        </div>

                        <div v-if="TranCNListInt.length>0" class="datatable_group">
                            <h5 class="text-left mb-3">
                                <p style="color:blue" class="font-weight-bold">Transaction List(Credit Note)</p></h5>

                            <data-tables :data="TranCNListInt" :page-size="pageSize"
                                         :pagination-props="{ pageSizes: [pageSize,100] }"
                                         width="55" stripe tooltip-effect='light' border
                                         ref="TransactionListTable">
                                <el-table-column label="#" min-width="20px">
                                    <template slot-scope="scope">
                                        {{(scope.$index)+1}}
                                    </template>
                                </el-table-column>
                                <el-table-column v-for="item in TranCNList"
                                                 :prop="item.prop"
                                                 :label="item.label"
                                                 :key="item.prop"
                                                 sortable="custom">
                                </el-table-column>
                            </data-tables>
                        </div>
                    </div><hr>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import DataSource from "../data/datasource";
    import XLSX from 'xlsx';
    export default {
        name: "TransactionListing",
        async created(){
            // await this.Search();
        },
        async mounted(){},
        data(){
            return{
                ddlSelection:[
                    { text: 'Date Range', value: 'DateRange' },
                    { text: 'Select Date From/To', value: 'DateFrom' },
                ],
                ddlSelectedValue:'',
                //select option
                DateRangeOptions:[{
                    value: 'week',
                    label: 'Week'
                }, {
                    value: 'month',
                    label: 'Month'
                }, {
                    value: 'year',
                    label: 'Year'
                }],
                ddlDocSelectedValue:'',
                DocsTypeSelection:[
                    { text: 'Invoice', value: 'Invoice' },
                    { text: 'Receipt', value: 'Receipt' },
                    { text: 'Credit Note', value: 'cn' },
                ],
                //select options
                currentMonthYear: '',
                pageSize:50,
                startupText:'',
                inputFromDate:[],
                inputDateRange:'',
                inputType:'',
                inputInvoiceDate:[],
                TranInvoiceListInt:[],
                TranInvoiceList:[{
                    prop: "Full_Name",
                    label: "First Name"
                }, {
                    prop: "Last_name",
                    label: "Last Name"
                },{
                    prop: "Index_No",
                    label: "Student ID"
                }, {
                    prop: "IH_Invoice_No",
                    label: "Invoice No"
                }, {
                    prop: "IH_Invoice_Date_Convert",
                    label: "Invoice Date"
                }, {
                    prop: "itemTotalAmount",
                    label: "Invoice Amount"
                }, {
                    prop: "CRS_Course_Name",
                    label: "Level"
                }, {
                    prop: "classNameBatch",
                    label: "Class"
                }, {
                    prop: "ID_Item_Description",
                    label: "Fee Item Name"
                }, {
                    prop: "INV_Invoice_DueDate_Convert",
                    label: "Invoice Due Date"
                }],

                TranReceiptListInt:[],
                TranReceiptList:[{
                    prop: "Full_Name",
                    label: "First Name"
                }, {
                    prop: "Last_name",
                    label: "Last Name"
                },{
                    prop: "Index_No",
                    label: "Student ID"
                }, {
                    prop: "RH_Receipt_Name",
                    label: "Receipt NO"
                },{
                    prop: "RH_Receipt_Date_Convert",
                    label: "Receipt Date"
                },{
                    prop: "itemTotalAmount",
                    label: "Receipt Amount"
                },{
                    prop: "CRS_Course_Name",
                    label: "Level"
                },{
                    prop: "classNameBatch",
                    label: "Class"
                },{
                    prop: "RD_Item_Description",
                    label: "Fee Item Name"
                }],

                TranCNListInt:[],
                TranCNList:[{
                    prop: "Full_Name",
                    label: "First Name"
                }, {
                    prop: "Last_name",
                    label: "Last Name"
                },{
                    prop: "Index_No",
                    label: "Student ID"
                }, {
                    prop: "IH_Invoice_No",
                    label: "Invoice No"
                }, {
                    prop: "IH_Invoice_Date_Convert",
                    label: "Invoice Date"
                }, {
                    prop: "itemTotalAmount",
                    label: "Total Amount"
                }, {
                    prop: "CRS_Course_Name",
                    label: "Level"
                }, {
                    prop: "classNameBatch",
                    label: "Class"
                }, {
                    prop: "ID_Item_Description",
                    label: "Fee Item Name"
                }, {
                    prop: "INV_Invoice_DueDate_Convert",
                    label: "Invoice Due Date"
                }],
            }
        },
        methods: {
            loadSelector(){
                try{
                    this.ClearSelectionValue();
                    this.ClearAllList();
                }
                catch (e) {
                    this.results = e;
                }
            },

            ClearAllList(){
                this.TranInvoiceListInt = [];
                this.TranReceiptListInt = [];
                this.TranCNListInt = [];
            },

            async Search(){
                try{
                    console.log(this.inputFromDate[0],this.inputFromDate[1],
                        this.inputDateRange,this.ddlDocSelectedValue,'this.ddlSelection=',this.ddlSelection);

                        if(this.inputFromDate.length<1&&!this.inputDateRange)
                        {
                            this.$notify({
                                title: 'Require',
                                message: '"Please select date."'
                            });
                        }
                        else{
                            this.$vs.loading();

                            if(this.ddlSelectedValue=='DateRange'){
                                this.inputFromDate = [];
                            }
                            else if(this.ddlSelectedValue=='DateFrom'){
                                this.inputDateRange='';
                            }
                            const resp = await DataSource.shared.getTransactionListing(this.inputFromDate[0],this.inputFromDate[1],
                                this.inputDateRange,this.ddlDocSelectedValue);
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
                                }
                                else
                                {
                                    if(this.ddlDocSelectedValue=='Invoice')
                                    {
                                        this.TranInvoiceListInt = resp.Table;
                                    }
                                    else if(this.ddlDocSelectedValue=='Receipt')
                                    {
                                        this.TranReceiptListInt = resp.Table;
                                    }
                                    else if(this.ddlDocSelectedValue=='cn')
                                    {
                                        this.TranCNListInt = resp.Table;
                                    }

                                }
                                this.$vs.loading.close();
                            }
                        }
                }
                catch (e) {
                    this.results = e;
                }

            },

            async Download(){
                this.exportExcel();
            },

            async ClearSelectionValue(){
                this.inputFromDate = [];
                this.inputDateRange = '';
                this.ddlSelectedValue = '';
            },

            exportExcel () {
                let exportExcelObject = [];

                var currentDateWithFormat = new Date().toJSON().slice(0,10).replace(/-/g,'/');

                if(this.ddlDocSelectedValue=='Invoice')
                {
                    this.TranInvoiceListInt.forEach(m=>{
                        let tempList={
                            // Student_Name:m.studentName,
                            First_Name:m.Full_Name,
                            Last_Name:m.Last_name,
                            Student_NO:m.Index_No,
                            Invoice_NO:m.IH_Invoice_No,
                            Invoice_Date:m.IH_Invoice_Date_Convert,
                            Invoice_Amount:m.itemTotalAmount,
                            Level:m.CRS_Course_Name,
                            Class:m.classNameBatch,
                            Fee_Item_Name:m.ID_Item_Description,
                            Invoice_Due_Date:m.INV_Invoice_DueDate_Convert
                        };
                        exportExcelObject.push(tempList);
                    });
                }
                else if(this.ddlDocSelectedValue=='Receipt')
                {

                    this.TranReceiptListInt.forEach(m=>{
                        let tempList={
                            First_Name:m.Full_Name,
                            Last_Name:m.Last_name,
                            Student_NO:m.Index_No,
                            Receipt_NO:m.RH_Receipt_Name,
                            Receipt_Date:m.RH_Receipt_Date_Convert,
                            Receipt_Amount:m.itemTotalAmount,
                            Level:m.CRS_Course_Name,
                            Class:m.classNameBatch,
                            Fee_Item_Name:m.RD_Item_Description,
                        };
                        exportExcelObject.push(tempList);
                    });
                }
                else if(this.ddlDocSelectedValue=='cn')
                {
                    this.TranCNListInt.forEach(m=>{
                        let tempList={
                            // Student_Name:m.studentName,
                            First_Name:m.Full_Name,
                            Last_Name:m.Last_name,
                            Student_NO:m.Index_No,
                            Invoice_NO:m.IH_Invoice_No,
                            Invoice_Date:m.IH_Invoice_Date_Convert,
                            Invoice_Amount:m.itemTotalAmount,
                            Level:m.CRS_Course_Name,
                            Class:m.classNameBatch,
                            Fee_Item_Name:m.ID_Item_Description,
                            Invoice_Due_Date:m.INV_Invoice_DueDate_Convert
                        };
                        exportExcelObject.push(tempList);
                    });
                }

                var sheet1WS = XLSX.utils.json_to_sheet(exportExcelObject)
                var wb = XLSX.utils.book_new() // make Workbook of Excel
                XLSX.utils.book_append_sheet(wb, sheet1WS, 'sheet1') // sheetAName is name of Worksheet
                XLSX.writeFile(wb, 'TransactionReport - '+this.inputType+currentDateWithFormat+'.xlsx') // name of the file is 'book.xlsx'
            },
        },
    }
</script>

<style scoped>
    /*.datatable-form__header{*/
    /*    background: #eb4245;*/
    /*    border-color: #a1a1a1;*/
    /*    height: 57px;*/
    /*    position:absolute;*/
    /*    top: 3px;*/
    /*}*/
    /*.SearchDiv{*/
    /*    width: 925px;*/
    /*    padding: 10px;*/
    /*    !*border: 0px solid green;*!*/
    /*    margin: auto;*/
    /*}*/
</style>