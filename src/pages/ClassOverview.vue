<template>
    <div id="studentpaymentplan">
        <div class="container-fluid">
            <div>
                <el-select v-model="ddlSelectedAcademicYearID" placeholder="Select Academic Year"
                           @change="getSelectedAcademicYearValue()"
                           class="fullwidth">
                    <el-option
                            v-for="item in semesterList"
                            :key="item.PK_Semester_ID"
                            :label="item.SMT_Code"
                            :value="item.PK_Semester_ID">
                    </el-option>
                </el-select>
                <b-card no-body>
                    <b-tabs active-nav-item-class="font-weight-bold text-uppercase text-danger"
                            active-tab-class="font-weight-bold text-success"
                            content-class="mt-3"
                            card>
                        <b-tab v-for="(item,index) in classListInt" :key="index" :title="item.Str_SortBy"
                               @click="getClassTabClick(item.ArrObj_Items)" >
                        </b-tab>
                        <!-- Render this if no tabs -->
<!--                        <div slot="empty" class="text-center text-muted">-->
<!--                            <div class="empty-list_image"-->
<!--                                 v-if="classListInt.length<1">-->
<!--                                <strong>{{startupText}}</strong>-->
<!--                                <img src="../assets/notfound.png"/>-->
<!--                            </div>-->
<!--                        </div>-->
                    </b-tabs>

                    <div v-if="fullListByClassNameObj.length>0" class="datatable_group col-lg-12">
<!--                        <div class="datatable-form__submit text-right" v-if="fullListByClassNameObj.length>0">-->
<!--                            <button class="btn btn-success" id="btnClassOverviewDownload" v-on:click="DownloadClick()">Download</button><br><br>-->
<!--                        </div>-->
                        <div v-for="(classBatchItem,i) in fullListByClassNameObj">
                            <label>Batch: {{classBatchItem[i].CLS_batch}}</label>
                            <data-tables :data="classBatchItem">
                                <el-table-column v-for="studentItem in classBatchItemList" :prop="studentItem.prop"
                                                 :label="studentItem.label" :key="studentItem.prop"
                                                 sortable="custom">
                                </el-table-column>
                            </data-tables>
                        </div>
                    </div>
                    <div class="empty-list_image"
                         v-if="fullListByClassNameObj.length<1">
                        <strong>{{startupText}}</strong>
                        <img src="../assets/notfound.png"/>
                    </div>
                </b-card>

            </div>
        </div>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";
    import XLSX from 'xlsx';
    export default {
        name: "ClassOverview",

        async created(){
            await this.getAcademicYear();
            await this.getLevel();
            await this.getClassType();
        },
        async mounted(){},
        data()
        {
            return{
                classBatch:'',
                classCount:0,
                startupText:'',
                ddlSelectedAcademicYearID:'',
                currentClassProgs: [],
                classListInt:[],
                totalNumberOfStudentAssignedToClass:'',
                semesterList:[],
                ActiveSemesterList:[],
                classListSemesterID:'',
                classListCourseID:'',
                classListClassName:'',
                classListClassID:'',
                levelList:[],
                classTypeList:[],
                tempClassList:[],
                fullListByClassNameObj:[],

                classBatchItemList:[{
                    prop: "Student_Name",
                    label: "Student Name"
                }, {
                    prop: "Index_No",
                    label: "Student Number"
                }, {
                    prop: "1st_CommDate",
                    label: "1st Comm Date"
                },{
                    prop: "Student_Type",
                    label: "Student Type"
                }, {
                    prop: "fatherMobile",
                    label: "Tel NO(Father)"
                }, {
                    prop: "motherMobile",
                    label: "Tel NO(Mother)"
                },{
                    prop: "Sex",
                    label: "Gentle"
                }, {
                    prop: "Nationality",
                    label: "Nationality"
                },{
                    prop: "DOB",
                    label: "DOB"
                },{
                    prop: "Bus_No",
                    label: "Bus No"
                },{
                    prop: "St_Comment",
                    label: "Comment"
                },{
                    prop: "St_House",
                    label: "House No"
                }],
            }

        },
        methods:{
            clearTableList(){
                this.fullListByClassNameObj=[];
            },
            async getAcademicYear() {
                try {
                    const response = await DataSource.shared.getAcademicYear('');
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.semesterList = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async getLevel() {
                try {
                    const response = await DataSource.shared.getLevel('');
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.levelList = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async getClassType() {
                try {
                    const response = await DataSource.shared.getClassType('');
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.classTypeList = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },

            async getClass(semesterID) {
                try {
                    const response = await DataSource.shared.getClass(semesterID);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.tempClassList=response.Table;
                            await this.sortByClassName();
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },

            async getSelectedAcademicYearValue(){
                    try{
                        this.$vs.loading();
                        await this.getClass(this.ddlSelectedAcademicYearID);

                            //todo:To get 1st class list when academic year selected, Start
                                //Reserved
                            //todo:To get 1st class list when academic year selected, End
                    }
                    catch (e) {
                        this.results = e;
                    }
                    this.$vs.loading.close();
                },

            async getStudentListByClassID(value) {
                try{
                    this.$vs.loading();
                    let classValue = this.ddlSelectedAcademicYearID+','+value.PK_Course_ID+','+value.PK_Class_ID;
                    const resp = await DataSource.shared.getClassStudentByClassID(classValue);
                    if (resp){
                        if(resp.Table){
                            this.fullListByClassNameObj.push(resp.Table);
                        }
                    }
                }
                catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },

            async getClassTabClick(objValue){
                try{
                    this.clearTableList();
                    if(objValue){
                        objValue.forEach(m=>{
                            this.getStudentListByClassID(m);
                        });
                    }
                    else{
                        this.$notify.error({
                            title: 'Message',
                            message: 'Class not found!',
                        });
                    }
                }
                catch (e) {
                    this.results = e;
                }
            },

            async sortByClassName(){
                let tempArrList = [];

                //want to slice the value if class name = '---'
                this.tempClassList.forEach(m=>{
                    if(m.Str_SortBy ==='---')
                    {
                        m.slice(m.Str_SortBy, 1);
                    }
                    tempArrList.push(m);
                });
                //slice: to be cont
                let sortedList = this.groupBy(tempArrList,'CLS_ClassName');

                this.classListInt = sortedList;
            },

            groupBy(data, key) {
                //Credits to Ceasar Bautista and Juan Castillo @ stackoverflow
                /*return data.reduce(function(storage, item) {
                    let group = item[key];

                    storage[group] = storage[group] || [];
                    storage[group].push(item);
                    return storage;
                }, {});*/

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

            exportExcel () {
                let exportExcelObject = [];

                var currentDateWithFormat = new Date().toJSON().slice(0,10).replace(/-/g,'/');

                    this.fullListByClassNameObj.forEach(m=>{
                        let templist =[];
                        m.forEach(n=>{
                            let list={
                                Student_Name: n.Student_Name,
                                Index_No: n.Index_No,
                                // First_CommDate : n.First_CommDate,
                                Student_Type: n.Student_Type,
                                fatherMobile: n.fatherMobile,
                                motherMobile: n.motherMobile,
                                Sex: n.Sex,
                                Nationality: n.Nationality,
                                DOB: n.DOB,
                                Bus_No:n.Bus_No,
                                St_Comment:n.St_Comment,
                                St_House:n.St_House,
                            };
                            templist.push(list);
                        });
                        exportExcelObject.push(templist);
                    });
                    console.log('exportExcelObject',exportExcelObject);

                var sheet1WS = XLSX.utils.json_to_sheet(exportExcelObject)
                var wb = XLSX.utils.book_new() // make Workbook of Excel
                XLSX.utils.book_append_sheet(wb, sheet1WS, 'sheet1') // sheetAName is name of Worksheet
                XLSX.writeFile(wb, 'ClassOverview - '+currentDateWithFormat+'.xlsx') // name of the file is 'book.xlsx'
            },

            async DownloadClick(){
                this.exportExcel();
            },
        },
    }
</script>

<style scoped>

</style>