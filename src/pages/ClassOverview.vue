<template>
    <div id="studentpaymentplan">
        <div class="container">
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
                        <b-tab v-for="(item,index) in classListInt" :key="index" :title="item.ArrObj_Items.length+' '+item.Str_SortBy"
                               @click="getClassTabClick(item.ArrObj_Items,item.ArrObj_Items.length,item.Str_SortBy)" >
                        </b-tab>
                        <!-- Render this if no tabs -->
                        <div slot="empty" class="text-center text-muted">
                            <h1>There are no open tabs</h1><br>
                        </div>
                    </b-tabs>
                    <div v-if="selectedClassListInt.length>0" class="datatable_group col-lg-12">
                        <data-tables :data="selectedClassListInt"
                                     ref="selectedClassListTable">
                            <el-table-column v-for="item in selectedClassList" :prop="item.prop"
                                             :label="item.label" :key="item.prop">
                            </el-table-column>
                        </data-tables>
                    </div>
                </b-card>

            </div>
        </div>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";
    export default {
        name: "ClassOverview",

        async created(){
            await this.getAcademicYear();
            // await this.getParentClassList();
            await this.getLevel();
            await this.getClassType();
           // await this.getClass();
        },
        async mounted(){},
        data()
        {
            return{
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
                selectedClassListInt:[],
                selectedClassList:[{
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
                selectedClassListAction:[],
            }

        },
        methods:{
            async getSelectedAcademicYearValue(){
                    try{
                        await this.getClass(this.ddlSelectedAcademicYearID);
                        //todo:To get 1st class list when academic year selected, Start
                        let className='';
                        className=this.ddlSelectedAcademicYearID+','+this.classListInt[0].ArrObj_Items[0].PK_Course_ID+','+this.classListInt[0].Str_SortBy;
                        const totalStudentsInClassResponse = await DataSource.shared.getClassStudentByClassName(className);
                        if(totalStudentsInClassResponse){
                            if(totalStudentsInClassResponse.code==='2'){
                                this.$notify.error({
                                    title: 'Message',
                                    message: 'No student in this class'
                                });
                            }
                            else if(totalStudentsInClassResponse.code==='99'){
                                this.$notify.error({
                                    title: 'Message',
                                    message: 'Error 99'
                                });
                            }
                            else{
                                this.selectedClassListInt=totalStudentsInClassResponse.Table;
                                //todo:To get 1st class list when academic year selected, End
                            }
                        }

                    }
                    catch (e) {
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

            async getClassStudentListByClassName(){
                try{
                    let classValue = '';
                    classValue = this.ddlSelectedAcademicYearID+','+this.classListCourseID+','+this.classListClassName;
                    const totalStudentsInClassResponse = await DataSource.shared.getClassStudentByClassName(classValue);
                   if (totalStudentsInClassResponse) {
                       if (totalStudentsInClassResponse.code === '88') {
                           window.location.replace('/');
                       } else if (totalStudentsInClassResponse.code === '99') {
                           console.log('Error! in getClassStudentList');
                           this.selectedClassListInt = [];
                           this.$notify.error({
                               title: 'Message',
                               message: 'Error! in getClassStudentList'
                           });
                       } else if (totalStudentsInClassResponse.code === '2') {
                           console.log('No student in this class');
                           this.selectedClassListInt = [];
                           this.$notify.error({
                               title: 'Message',
                               message: 'No student in this class'
                           });
                       } else {
                           this.totalNumberOfStudentAssignedToClass = totalStudentsInClassResponse.Table.length;
                           this.selectedClassListInt = totalStudentsInClassResponse.Table;
                       }
                   }

                } catch (e) {
                    this.results = e;
                }
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

            async getClassTabClick(objValue,lengthValue,classNameValue){
                if(lengthValue>1){
                    this.classListClassName=classNameValue;
                    this.classListClassID=objValue[0].PK_Class_ID;
                    this.classListCourseID=objValue[0].PK_Course_ID;
                }
                else{
                    this.classListClassName=classNameValue;
                    this.classListClassID=objValue[0].PK_Class_ID;
                    this.classListCourseID=objValue[0].PK_Course_ID;
                }
                await this.getClassStudentListByClassName(this.classListClassName);
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
        },
    }
</script>

<style scoped>

</style>