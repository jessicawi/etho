<template>
    <div id="attendance-list" class=" ">
        <div class="container admin-wrap">
            <div class="row header mb-5">
                <div class="col-lg-5 ">
                    <h3 class="text-left mb-3">ATTENDANCE ( {{currentDateWithAlphabet}} )</h3>
                </div>
                <div class="col-lg-7">
                    <div class="row searchingArea attendance-search">
                        <!--<label class="lblClass">Class</label>-->
                        <button type="button" class="btn btn-primary" v-on:click="showTempImportModal()">Thermal Scanner
                            Import
                        </button>
                        <el-select v-model="ddlClass" placeholder="Select Class" class="pro-edt-select"
                                   @change="Load()">
                            <el-option
                                    v-for="item in ddlClassList"
                                    :key="item.PK_Class_ID"
                                    :label="item.CLS_ClassName.trim() + ' ' +item.CLS_Batch.trim()"
                                    :value="item.PK_Semester_ID.trim() + ',' + item.SC_FK_CourseID.trim() + ',' + item.PK_Class_ID.trim()">
                            </el-option>
                        </el-select>
                        <!--<select v-model="ddlClass" class="form-control pro-edt-select form-control-primary ddlClass"-->
                        <!--@change="Load()" placeholder="Class">-->
                        <!--<option v-for="item in ddlClassList"-->
                        <!--v-bind:value="item.PK_Semester_ID.trim() + ',' + item.SC_FK_CourseID.trim() + ',' + item.PK_Class_ID.trim()">-->
                        <!--{{ item.CLS_ClassName.trim() }}-->
                        <!--</option>-->
                        <!--</select>-->
                    </div>
                </div>
            </div>
            <div class="pb-5">
                <div class="empty-list_image" v-if="studentList.length<1">
                    <strong v-if="hideStudentList===false">Please select Class...</strong>
                    <strong v-if="hideStudentList===true">No Student Found...</strong>
                    <!--<router-link :to="{name: 'Class Management'}">-->
                    <!--<el-button type="primary" round v-if="hideStudentList===true" class="d-table" @click="">Assign Student to Class</el-button>-->
                    <!--</router-link>-->
                    <img src="../assets/attendance.jpg"/>
                </div>
                <div v-if="studentList.length>0" class="responsive-table">
                    <!--<div class="row actionBar">-->
                    <!--<data-tables :data="studentList" @selection-change="handleSelectionChange">-->
                    <!--<el-table-column type="selection" width="55">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column v-for="item in studentCheckList" :prop="item.prop"-->
                    <!--:label="item.label" :key="item.prop"-->
                    <!--sortable="custom">-->
                    <!--</el-table-column>-->
                    <!--</data-tables>-->
                    <!--<div class="col-lg-10 ">-->
                    <!--<router-link :to="{name: 'Class Management'}">-->
                    <!--<el-button type="primary"  class="float-right mr-3" @click="">Add New Student</el-button>-->
                    <!--</router-link>-->
                    <!--</div>-->
                    <!--</div>-->
                    <table class="attTable">
                        <tr>
                            <th>
                                <vs-checkbox ref="isCheckAll" v-model="selectallStudent"
                                             @change="(e)=>checkAllStudent(e)">
                                </vs-checkbox>
                            </th>
                            <!--<th>Student ID</th>-->
                            <th>Student Name</th>
                            <!--<th>Attendance <br> <input type="checkbox" @click="checkAll()" ref="checkAllBox"></th>-->
                            <th>
                                <span v-if="bundleAttendance === false">Attendance</span>
                                <el-select placeholder="Select Attendance For All" v-model="studentCheck"
                                           @change="selectedAttendance()" class="" v-if="selectallStudent === true">
                                    <el-option
                                            v-for="itemCheckList in checkListSelect"
                                            :key="itemCheckList"
                                            :label="itemCheckList"
                                            :value="itemCheckList"
                                    >
                                    </el-option>
                                </el-select>
                            </th>
                            <th>Remarks</th>
                            <th>Parents Contact</th>
                            <th>Pickup Mode</th>
                            <th>ECA</th>
                        </tr>
                        <tr v-for="(item,i) in studentList" ref="studentList_Update"
                            :key="item.Student_ID + item.markingStatus">
                            <td style="display:none;"><input type="text" class="form-control" :value="item.Index_No"
                                                             ref="studentIndexNo"></td>
                            <td>
                                <vs-checkbox ref="chkitems" v-model="item.checked"
                                             @change="showBundleAttendance(item)" :value="item.checked"></vs-checkbox>
                            </td>
                            <td style="display:none;">{{item.checked}}</td>
                            <!--<td><label>{{item.AttDtlStudentIndexNo}}</label></td>-->
                            <td><label class="lblStudentName">{{item.Student_Name}}</label></td>
                            <!--<td><input type="checkbox" :id="item.AttDtlID" :value="item.AttDtlID" :checked="item.AttDtlMark.includes('Yes')" ref="studentCheckList"></td>-->
                            <!--<td>-->
                            <!--<div class="form-group__wrapper row">-->
                            <!--<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 checkbox_wrapper">-->
                            <!--<label class="lblCheckBox">-->
                            <!--<input class="form-control" type="checkbox" :id="item.AttDtlID" :value="item.AttDtlID" :checked="item.AttDtlMark.includes('Yes')" ref="studentCheckList">-->
                            <!--<span>-->
                            <!--<span>-->
                            <!--<svg class="checkmark" viewBox="0 0 24 24"><path class="checkmark-path" fill="none" stroke="white"-->
                            <!--d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg>-->
                            <!--</span>-->
                            <!--</span>-->
                            <!--</label>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--</td>-->
                            <td class="">
                                <!--<select ref="studentCheckList"-->
                                <!--class="form-control pro-edt-select form-control-primary">-->
                                <!--<option v-for="itemCheckList in checkListSelect" :value="itemCheckList"-->
                                <!--:selected="itemCheckList === item.AttDtlMark">-->
                                <!--{{ itemCheckList }}-->
                                <!--</option>-->
                                <!--</select>-->
                                <el-select ref="studentCheckList" placeholder="Select" v-model="item.markingStatus"
                                           @change="(e)=>AttendanceByStudent(e,item)"
                                           :class="[{attend: item.markingStatus === 'Present'},{late: item.markingStatus === 'Late'},{absent: item.markingStatus === 'Absent'},{sick: item.markingStatus === 'Sick'},{holiday: item.markingStatus === 'On Holiday'},{home: item.markingStatus === 'Sent Home'}]">
                                    <el-option
                                            v-for="itemCheckList in checkListSelect"
                                            :key="itemCheckList"
                                            :label="itemCheckList"
                                            :value="itemCheckList"
                                    >
                                    </el-option>
                                    <!--<el-option-->
                                    <!--v-for="itemCheckList in checkListSelect"-->
                                    <!--:key="itemCheckList"-->
                                    <!--:label="itemCheckList"-->
                                    <!--:value="itemCheckList"-->
                                    <!--:selected="itemCheckList === item.AttDtlMark">-->
                                    <!--</el-option>-->
                                </el-select>
                            </td>
                            <td><input type="text" class="form-control" v-model="item.remarks"
                                       ref="studentRemark">
                            </td>
                            <td>
                                <select class="parentsMobileNo">
                                    <option v-if="item.fatherMobile !== ''">Father - {{ item.fatherMobile }}</option>
                                    <option v-if="item.fatherMobile === ''">Father - Nil</option>
                                    <option v-if="item.motherMobile !== ''">Mother - {{ item.motherMobile }}</option>
                                    <option v-if="item.motherMobile === ''">Mother - Nil</option>
                                </select>
                                <!--<el-select>-->
                                <!--<el-option-->
                                <!--:label="item.fatherMobile">-->
                                <!--</el-option>-->
                                <!--</el-select>-->
                            </td>
                            <td v-if="item.Bus_No"><label class="lblBusNo">{{item.Bus_No}}</label></td>
                            <td v-if="!item.Bus_No"><label class="lblBusNo">-</label></td>
                            <td><label class="lblEcaName">{{item.ecaName}}</label></td>
                        </tr>
                    </table>
                </div>
                <div class=" text-center form-group col-lg-12" style="margin-top:20px;" v-if="studentList.length>0">
                    <button type="button" class="btn btn-primary float-right" v-on:click="Save">Save</button>
                </div>
            </div>
            <b-modal size="lg" title="Thermal Scanner Import" ok-only ok-variant="secondary" hide-footer
                     ref="tempImportModal">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <textarea rows="4" v-model="tempDeviceOutput" class="taTempImport">

                    </textarea>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 tempImportButtonArea">
                    <button v-on:click="tempImportSave()" class="btn btn-primary waves-effect waves-light m-r-10">
                        Import
                    </button>
                </div>
            </b-modal>
        </div>
    </div>
</template>
<script>
    import DataSource from "../data/datasource";
    import moment from 'moment';

    export default {
        name: "AttendanceList",
        data() {
            return {
                checkListSelect: ['Present', 'Absent', 'Late', 'Sick', 'On Holiday', 'Sent Home'],
                ddlClassList: [],
                ddlClass: '',
                studentList: [],
                studentClass: [],
                studentCheck: [],
                selectedStudent: [],
                selectallStudent: false,
                bundleAttendance: false,
                hideStudentList: false,
                tempDeviceOutput: '',
            };
        },
        async created() {
            await this.bindClasses();
        },
        async mounted() {
        },
        computed: {
            currentDateWithAlphabet() {
                return moment().format("DD MMM YYYY");
            },
        },
        methods: {
            showBundleAttendance(item) {

                this.selectallStudent = false;

                const isCheck = this.studentList.find(m => m.checked === true);
                if (isCheck) {
                    this.bundleAttendance = true;
                } else {
                    this.bundleAttendance = false;
                }

                // if (item.checked === true){
                //     item.checked = false;
                // }else {
                //     item.checked = true;
                // }
            },
            checkAllStudent(e) {
                // if (e.target.value === true) {
                //     this.selectallStudent = true;
                //
                //     this.bundleAttendance = true;
                //     this.studentList = this.studentList.map(m => {
                //         m.checked = true;
                //         return m;
                //     });
                // } else {
                //     this.selectallStudent = false;
                //
                //     this.studentList = this.studentList.map(m => {
                //         m.checked = false;
                //         return m;
                //     });
                // }


                if (this.selectallStudent === true) {
                    this.bundleAttendance = true;
                    this.studentList.forEach(m => {
                        m.checked = true;
                    });

                } else {
                    this.bundleAttendance = false;

                    this.studentList.forEach(m => {
                        m.checked = false;
                    });

                }
            },
            selectedAttendance() {
                this.studentList.forEach(m => {

                    if (m.checked === true) {
                        m.markingStatus = this.studentCheck;
                    }
                });
            },
            AttendanceByStudent(value, item) {
                item.markingStatus = value;
                this.$forceUpdate();


                // if (this.selectallStudent === true) {
                // this.studentList = this.studentList.map(d => {
                //     d.markingStatus = item.markingStatus;
                //     return d;
                // });
                // this.selectallStudent = false;
                // this.studentList.forEach(m => {
                //     m.checked = false;
                // });
                // item.checked = true;
                // item.markingStatus = item.markingStatus;
                // } else {
                // const selected = this.studentList.find(d => d.STU201500013396 === item.STU201500013396);
                // selected.markingStatus = item.markingStatus;
                // this.studentList.forEach(m => {
                //     m.checked = false;
                // });
                // item.checked = true;
                // item.markingStatus = item.markingStatus;

                // <!--}-->
            },
            async bindClasses() {
                try {
                    const response = await DataSource.shared.getAttendanceClass();
                    if (response) {
                        this.class = response.Table;
                        this.class.forEach(m => {
                            this.ddlClassList.push(m);
                        });
                    }
                    // const response = await DataSource.shared.getAttendanceClass();
                    // if (response) {
                    //     this.class = response.Table;
                    //     let classValue;
                    //     this.class.forEach(m => {
                    //         // item.PK_Semester_ID.trim() + ',' + item.SC_FK_CourseID.trim() + ',' + item.PK_Class_ID.trim()">{{ item.CLS_ClassName.trim()
                    //         classValue = m.PK_Semester_ID.trim() + ',' + m.SC_FK_CourseID.trim() + ',' + m.PK_Class_ID.trim();
                    //
                    //         DataSource.shared.LoadAttendanceList(classValue).then((AttendResponse) => {
                    //             if (AttendResponse.code === "2") {
                    //                 return;
                    //
                    //             } else {
                    //                 // this.studentclass = AttendResponse.Table;
                    //                 this.ddlClassList.push(m);
                    //             }
                    //         });
                    //     });
                    //
                    //
                    // }
                } catch (e) {
                    this.results = e;
                }
            },
            async Load() {

                try {
                    if (this.ddlClass === '') {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please select class'
                        });
                    } else {
                        this.$vs.loading();
                        const response = await DataSource.shared.LoadAttendanceList(this.ddlClass);
                        if (response) {

                            if (response.code === '2') {
                                this.studentList = [];
                                this.hideStudentList = true;
                                // this.$notify.error({
                                //     title: 'Error',
                                //     message: 'No student found'
                                // });
                            } else if (response.code === '99') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Error! Please try again later'
                                });
                            } else {

                                this.studentList.forEach(m => {
                                    m.checked = false;
                                });
                                // response.Table.forEach(x => {
                                //     if (x.AttDtlMark === "No") {
                                //         x.AttDtlMark = null;
                                //     }
                                // });
                                this.studentList = response.Table;

                                this.studentListResponse = response.Table;
                                // this.studentListResponse.forEach(m => {
                                //     this.lblAttID = m.AttDtlAttID;
                                // });
                            }
                        }
                        this.$vs.loading.close();
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async Save() {
                try {
                    // let jsonString = '';
                    //
                    // this.$refs.studentList_Update.forEach((m, index) => {
                    //     if (jsonString === '') {
                    //         jsonString = '"' + this.$refs.studentCheckList[index].value + '":"' + this.$refs.studentCheckList[index].checked + ',' + this.$refs.studentRemark[index].value + '"';
                    //     }
                    //     else {
                    //         jsonString = jsonString + ',"' + this.$refs.studentCheckList[index].value + '":"' + this.$refs.studentCheckList[index].checked + ',' + this.$refs.studentRemark[index].value + '"';
                    //     }
                    // });
                    //
                    // jsonString = '{ ' + jsonString + ' }';

                    // const response = await DataSource.shared.updateAttendanceList(this.lblAttID, jsonString);
                    // if (response) {
                    //     if (response.code == '1') {
                    //         alert('Successfully saved');
                    //         window.location.replace('/attendancelist');
                    //     } else {
                    //         alert('Error! Please try again later');
                    //         window.location.replace('/attendancelist');
                    //     }
                    // }
                    let attendanceList = [];

                    this.$refs.studentList_Update.forEach((m, index) => {
                        let attendanceDetials = {
                            status: this.$refs.studentCheckList[index].value,
                            remark: this.$refs.studentRemark[index].value
                        };

                        let attendanceListTemp = {
                            studentIndexNo: this.$refs.studentIndexNo[index].value,
                            attDetails: attendanceDetials
                        };
                        if (this.$refs.chkitems[index].value === true) {
                            attendanceList.push(attendanceListTemp);

                        }
                    });

                    if (attendanceList.length < 1) {
                        this.$notify.error({
                            title: 'Require',
                            message: 'Please at least tick at least one row to update'
                        });
                    } else {
                        const response = await DataSource.shared.updateAttendanceList(JSON.stringify(attendanceList));
                        if (response) {
                            if (response.code == '1') {
                                this.$notify({
                                    title: 'Success',
                                    message: 'Successfully saved',
                                    type: 'success'
                                });
                                this.Load();

                                this.selectallStudent = false;
                                this.studentCheck = "";
                                // window.location.replace('/attendancelist');
                            } else {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Error! Please try again later'
                                });
                                window.location.replace('/attendancelist');
                            }
                        }
                    }

                } catch (e) {
                    this.results = e;
                }
            },
            async checkAll() {
                try {
                    if (this.$refs.checkAllBox.checked == true) {
                        this.$refs.studentCheckList.forEach(m => {
                            m.checked = true;
                        });
                    } else {
                        this.$refs.studentCheckList.forEach(m => {
                            m.checked = false;
                        });
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            showTempImportModal() {
                this.tempDeviceOutput = '';
                this.$refs.tempImportModal.show();
            },
            async tempImportSave() {
                this.$vs.loading();
                try {
                    const response = await DataSource.shared.updateAttendanceListWithTemperature(this.tempDeviceOutput);
                    if (response) {
                        if (response.code === '1') {
                            this.$notify({
                                title: 'Success',
                                message: 'Successfully saved',
                                type: 'success'
                            });
                        } else {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Error! Please try again later'
                            });
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },
        },
    };
</script>
<style scoped>
    .attTable {
        width: 100%;
        margin-top: 20px;
    }

    .attTable td, .attTable th, .attTable label {
        text-align: center;
        padding: 10px;
    }

    .attTable tr:nth-child(even) {
        background: #fff;
    }

    .ddlClass {
        display: inline;
        width: auto;
    }

    .lblClass {
        display: inline !important;
        padding: 20px;
    }

    input[type='checkbox'] {
        width: 30px;
        height: 30px;
        background: white;
        border-radius: 5px;
        border: 2px solid #555;
    }

    .searchingArea {
        text-align: left;
    }

    .checkbox_wrapper {
        min-width: 100%;
    }

    .lblCheckBox {
        width: 100%;
    }

    .parentsMobileNo {
        background-color: #FFF;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #DCDFE6;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: 0;
        padding: 0 15px;
    }

    .attendance-search .el-select {
        margin-left: 10px !important;
    }

    .taTempImport {
        width: 100%;
        border-radius: 5px;
        /* box-shadow: 10px 10px 5px grey; */
        border: 0px;
        background: #ededed;
    }

    .tempImportButtonArea {
        margin: 10px 0 0 0;
    }

    .lblBusNo, .lblStudentName, .lblEcaName {
        font-weight: normal !important;
    }
</style>