<template>
    <div id="ecamaster">
        <div class="container ">
            <div class="row header mb-5">
                <div class="col-lg-5 ">
                    <h3 class="text-left ">{{$route.name}}</h3>
                </div>
                <div class="col-lg-7">
                    <div class=" searchingArea attendance-search">
                        <el-button type="primary" round
                                   class="float-right large-btn classManage-filter" v-on:click="createNewECA()">
                            <i class="fa fa-futbol-o" aria-hidden="true"></i>
                            New ECA
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div v-if="ecaListInt.length > 0" class="col-lg-12">
                    <div class="busMaster-wrap col-lg-12">
                        <div class="busMaster-item mb-4" v-for="(ecaListInfo, index) in ecaListInt">
                            <div class="busMaster-heading row">
                                <div class="busMaster-item_title col-lg-10">
                                    <i class="fa fa-futbol-o" aria-hidden="true"></i>
                                    <span>ECA Name: {{ecaListInfo.EcaName}}</span>
                                </div>
                                <div class="busMaster-item_close col-lg-2">
                                    <el-button icon="el-icon-close" circle
                                               @click="deleteEca(ecaListInfo.EcaID)"></el-button>
                                    <el-button icon="el-icon-plus" circle
                                               @click="newECAAssign(ecaListInfo.EcaID)"></el-button>
                                    <el-button icon="el-icon-upload" circle
                                               @click="importNewECAWithDateStudentIndex(ecaListInfo.EcaID, ecaListInfo.EcaName)"></el-button>
                                </div>
                            </div>
                            <div @click="getECASummary(ecaListInfo.EcaID)" class="busListCLick">
                                <i class="material-icons">
                                    assignment
                                </i>
                                View Assigned Students
                            </div>
                            <div v-show="ecaCurrentID===ecaListInfo.EcaID">
                                <div class=""
                                     v-if="ecaAssignStudentSummaryListInt&&ecaAssignStudentSummaryListInt.length<1">
                                    <el-alert
                                            title="No Record..."
                                            type="info"
                                            :closable="false">
                                    </el-alert>
                                </div>

                                <div v-if="ecaAssignStudentSummaryListInt&&ecaAssignStudentSummaryListInt.length>0"
                                     class="datatable_group">
                                    <data-tables :data="ecaAssignStudentSummaryListInt"
                                                 :actionCol="ecaAssignStudentSummaryListEdit">
                                        <el-table-column
                                                v-for="ecaAssignStudentSummaryListInfo in ecaAssignStudentSummaryList"
                                                :prop="ecaAssignStudentSummaryListInfo.prop"
                                                :label="ecaAssignStudentSummaryListInfo.label"
                                                :key="ecaAssignStudentSummaryListInfo.prop"
                                                sortable="custom">
                                        </el-table-column>
                                    </data-tables>
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--<div v-if="ecaListInt.length < 1" class="col-lg-12">-->
                    <!--No Records-->
                <!--</div>-->
                <div class="empty-list_image" v-if="ecaListInt.length<1">
                    <strong>No Data Found...</strong>
                    <img src="../assets/notfound.png"/>
                </div>
            </div>
        </div>
        <b-modal size="lg" title="New ECA" ok-only ok-variant="secondary" hide-footer ref="newECAModal">
            <div class="row ml-2 mr-2">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label>ECA Name</label>
                    <input type="text" class="form-control" v-model="inputNewECAName">
                </div>
                <div class="col-lg-12">
                    <button v-on:click="saveNewEca()"
                            class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch">Save
                    </button>
                </div>
            </div>
        </b-modal>
        <b-modal size="lg" title="Assign Students" ok-only ok-variant="secondary" hide-footer ref="assignStudentsModal">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div style="display: none;">{{ assignStudentEcaID }} - {{ assignStudentEcaNewOrUpdate }} - {{
                    assignStudentEcaUpdateAttendDate }}
                </div>
                <div class=" " v-if="assignStudentDate">
                    <div class="date style-info-date">
                        <el-date-picker v-model="inputNewStuedntAssignDate" format="dd/MM/yyyy"
                                        value-format="dd/MM/yyyy" type="date" placeholder="Pick a day"></el-date-picker>
                        <label>Date Attend</label>
                    </div>
                    <div :class="{'d-none' :ddlCopyAttendDateList&&ddlCopyAttendDateList.length<1}">
                        <label class="style-button-checkbox">
                            <input type="checkbox" class="form-control" ref="cbCopyDateAttend" @change="copyDateAttend">
                            Copy Date Attend
                            <span class="checkIcon">
                                <span>
                                    <svg class="checkmark" viewBox="0 0 24 24">
                                        <path class="checkmark-path"
                                              fill="none" stroke="white"
                                              d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
                                    </svg>
                                </span>
                            </span>
                        </label>
                    </div>
                    <div v-if="copyAttendDate" class="attendanceRadio">
                        <!--<select v-model="ddlCopyAttendDate"-->
                        <!--class="form-control pro-edt-select form-control-primary">-->
                        <!--<option v-for="item in ddlCopyAttendDateList"-->
                        <!--v-bind:value="item.EcaDtlDateAttend_convert">{{ item.EcaDtlDateAttend_convert }}-->
                        <!--</option>-->
                        <!--</select>-->
                        <el-radio v-model="ddlCopyAttendDate" v-for="item in ddlCopyAttendDateList"
                                  v-bind:value="item.EcaDtlDateAttend_convert" :label="item.EcaDtlDateAttend_convert">
                            {{item.EcaDtlDateAttend_convert}}
                        </el-radio>
                    </div>
                </div>
                <div v-if="intAssignStudentsList.length>0 && !copyAttendDate" class="datatable_group">
                    <el-row style="margin-bottom: 10px">
                        <el-input v-model="assignStudentsListSearchFilter">
                            <template slot="prepend">Search by First Name</template>
                        </el-input>
                    </el-row>
                    <el-table
                            :data="intAssignStudentsList.filter(data => !assignStudentsListSearchFilter || data.Full_Name.toLowerCase().includes(assignStudentsListSearchFilter.toLowerCase())).slice((assignStudentsListCurrentPage-1)*assignStudentsListPageSize,assignStudentsListCurrentPage*assignStudentsListPageSize)"
                            @selection-change="changeSelection" :row-key="getRowKey" ref="articleTable">
                        <el-table-column type="selection" width="55" :reserve-selection="true">
                        </el-table-column>
                        <el-table-column v-for="assignStudentsListInfo in assignStudentsList"
                                         :prop="assignStudentsListInfo.prop"
                                         :label="assignStudentsListInfo.label" :key="assignStudentsListInfo.prop"
                                         sortable="custom">
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            @current-change="assignStudentsListChangePage"
                            @size-change="assignStudentsListChangePageSize"
                            :page-sizes="[20, 40, 60, 80]"
                            :page-size=assignStudentsListPageSize
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="assignStudentsListTotal">
                    </el-pagination>
                </div>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <button v-on:click="assignStudent()" class="btn btn-primary waves-effect waves-light m-r-10">
                    Assign
                </button>
            </div>
        </b-modal>
        <b-modal size="lg" title="Edit Assign Students" ok-only ok-variant="secondary" hide-footer
                 ref="editAssignStudentsModal">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div style="display:none;">{{editAssignedECAID}}</div>
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-6 col-8">
                        <h4 class="text-left">
                            {{editAssignedECAName}} : {{editAssignedECAAttendDate}}
                        </h4>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-4 icon-round-button" style="text-align:right;">
                        <el-button icon="el-icon-plus" circle @click="updateAssignedStudent()"></el-button>
                    </div>
                </div>
                <div v-if="intAssignedStudentsList.length>0" class="datatable_group">
                    <data-tables :data="intAssignedStudentsList" :actionCol="assignedStudentsListDelete">
                        <el-table-column v-for="assignedStudentsListInfo in assignedStudentsList"
                                         :prop="assignedStudentsListInfo.prop"
                                         :label="assignedStudentsListInfo.label"
                                         :key="assignedStudentsListInfo.prop"
                                         sortable="custom">
                        </el-table-column>
                    </data-tables>
                </div>
                <div v-if="intAssignedStudentsList.length<1" class="datatable_group">
                    No Records...
                </div>
            </div>
        </b-modal>
        <b-modal size="lg" title="Import New ECA with Date & Student ID" ok-only ok-variant="secondary" hide-footer
                 ref="importNewEcaWithDateStudentIndex">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div style="display:none;">{{importNewEcaWithDateStudentIndexECAID}}</div>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h3>{{importNewEcaWithDateStudentIndexECAName}}</h3>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label>
                        Note: Successfully imported will auto download a report status
                    </label>
                </div>
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="upload-box">
                            <label><i class="material-icons">
                                attachment
                            </i> Select File</label>
                            <div class="file-upload-wrapper" :data-text="importNewEcaWithDateStudentIndexFileName">
                                <input name="file-upload-field" type="file" class="file-upload-field" value=""
                                       ref="inputImportNewEcaWithDateStudentIndexFile" @change="importNewEcaWithDateStudentIndexFileNameShow">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <button class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch"
                                v-on:click="importNewEcaWithDateStudentIndexTemplate()">
                            Template
                        </button>

                        <button class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch"
                                v-on:click="importNewEcaWithDateStudentIndexSave()">
                            Import
                        </button>
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>
<script>
    import DataSource from "../data/datasource";
    import moment from 'moment';
    import Export_CSV from "../components/Export_CSV";
    import XLSX from 'xlsx';

    export default {
        name: "EcaMaster",
        async created() {
            this.getECAList();
        },
        data() {
            return {
                inputNewECAName: '',
                ecaCurrentID: null,
                assignStudentEcaID: '',
                assignStudentEcaNewOrUpdate: '',
                assignStudentsListSearchFilter: '',
                inputNewStuedntAssignDate: '',
                editAssignedECAName: '',
                editAssignedECAAttendDate: '',
                editAssignedECAID: '',
                assignStudentDate: false,
                assignStudentEcaUpdateAttendDate: '',
                copyAttendDate: false,
                ddlCopyAttendDate: '',
                importNewEcaWithDateStudentIndexECAID: '',
                importNewEcaWithDateStudentIndexFileName: '',
                importNewEcaWithDateStudentIndexECAName: '',

                ecaListInt: [],
                multipleSelection: [],
                ddlCopyAttendDateList: [],

                ecaAssignStudentSummaryListInt: [],
                ecaAssignStudentSummaryList: [{
                    prop: "EcaDtlDateAttend_convert",
                    label: "ECA Date",
                }, {
                    prop: "TotalStudentAttend",
                    label: "Total Student Attend"
                }],
                ecaAssignStudentSummaryListEdit: {
                    label: 'Edit',
                    props: {
                        align: 'center',
                    },
                    buttons: [{
                        props: {
                            type: 'primary',
                            icon: 'el-icon-edit'
                        },
                        handler: row => {
                            this.getEcaDetailsAction(row);
                        },
                        label: 'Edit'
                    }]
                },

                intAssignStudentsList: [],
                assignStudentsListPageSize: 20,
                assignStudentsListTotal: 0,
                assignStudentsListCurrentPage: 1,
                assignStudentsList: [{
                    prop: "Index_No",
                    label: "Student ID"
                }, {
                    prop: "Full_Name",
                    label: "First Name"
                }, {
                    prop: "Middle_name",
                    label: "Middle Name"
                }, {
                    prop: "Last_name",
                    label: "Last Name"
                }, {
                    prop: "Bus_No",
                    label: "Bus No"
                }],

                intAssignedStudentsList: [],
                assignedStudentsList: [{
                    prop: "EcaDtlStudentIndexNo",
                    label: "Student ID"
                }, {
                    prop: "StudentFirstName",
                    label: "First Name"
                }, {
                    prop: "StudentMiddleName",
                    label: "Middle Name"
                }, {
                    prop: "StudentLastName",
                    label: "Last Name"
                }],
                assignedStudentsListDelete: {
                    label: 'Delete',
                    props: {
                        align: 'center',
                    },
                    buttons: [{
                        props: {
                            type: 'primary',
                            icon: 'el-icon-edit'
                        },
                        handler: row => {
                            this.deleteEcaDtl(row);
                        },
                        label: 'Delete'
                    }]
                },
                tempEcaID: ""
            };
        },
        async mounted() {
            this.inputNewStuedntAssignDate = moment().format("DD/MM/YYYY");
        },
        methods: {
            changeSelection(val) {
                this.multipleSelection = val;
            },
            async getECAList() {
                this.$vs.loading();
                try {
                    const response = await DataSource.shared.getEcaMasterList();
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Get ECA Error!'
                            });
                        } else if (response.code === '2') {
                            this.ecaListInt = [];
                        } else {
                            this.ecaListInt = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },
            createNewECA() {
                this.inputNewECAName = '';
                this.$refs.newECAModal.show();
            },
            assignStudentsListChangePage(currentPage) {
                this.assignStudentsListCurrentPage = currentPage;
            },
            assignStudentsListChangePageSize(currentPageSize) {
                this.assignStudentsListPageSize = currentPageSize;
            },
            async saveNewEca() {
                try {
                    if (this.inputNewECAName === '') {
                        this.$notify.error({
                            title: 'Require',
                            message: 'Please fill in ECA Name'
                        });
                    } else {
                        this.$vs.loading();
                        const response = await DataSource.shared.saveEcaMasterList(this.inputNewECAName);
                        if (response) {
                            if (response.code === '88') {
                                window.location.replace('/');
                            } else if (response.code === '99') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Save New ECA Error!'
                                });
                            } else if (response.code === '2') {
                                this.$notify.error({
                                    title: 'Duplicated',
                                    message: 'ECA Name Existing'
                                });
                            } else {
                                this.$notify({
                                    title: 'Success',
                                    message: 'Successfully Added!',
                                    type: 'success'
                                });
                                this.getECAList();
                                this.$refs.newECAModal.hide();
                            }
                        }
                        this.$vs.loading.close();
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async deleteEca(EcaID) {
                try {
                    this.$vs.loading();
                    const response = await DataSource.shared.updateEcaMasterList(EcaID, "VOID");
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Delete New ECA Error!'
                            });
                        } else {
                            this.$notify({
                                title: 'Success',
                                message: 'Successfully Deleted!',
                                type: 'success'
                            });
                            this.getECAList();
                        }
                    }
                    this.$vs.loading.close();
                } catch (e) {
                    this.results = e;
                }
            },
            async getECASummary(EcaID) {
                try {
                    this.ecaCurrentID = EcaID;
                    const response = await DataSource.shared.getEcaSummaryGroupByEcaID(EcaID);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Get ECA Summary Error!'
                            });
                        } else if (response.code === '2') {
                            this.ecaAssignStudentSummaryListInt = [];
                        } else {
                            this.ecaAssignStudentSummaryListInt = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            newECAAssign(ecaID) {
                try {
                    this.assignStudentsListSearchFilter = '';
                    this.assignStudentDate = true;
                    this.assignStudentEcaNewOrUpdate = "NEW";
                    this.assignStudentEcaID = ecaID;
                    this.copyAttendDate = false;
                    this.ddlCopyAttendDate = '';
                    this.$refs.assignStudentsModal.show();
                    this.getAllActiveStudent();
                    this.getAssignedECADate();
                } catch (e) {
                    this.results = e;
                }
            },
            async getAllActiveStudent() {
                try {
                    const response = await DataSource.shared.getStudentWithStatus('', '', '', '', '', 'Active');
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Get All Students Error!'
                            });
                        } else if (response.code === '2') {
                            this.intAssignStudentsList = [];
                        } else {
                            this.intAssignStudentsList = response.Table;

                            this.assignStudentsListTotal = this.intAssignStudentsList.length;
                            this.assignStudentsListCurrentPage = 1;
                            this.assignStudentsListPageSize = 20;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async assignStudent() {
                try {
                    var toSave = false;
                    var toCopySave = false;
                    let studentsListFinal = [];

                    if (this.assignStudentEcaNewOrUpdate === 'NEW' && this.$refs.cbCopyDateAttend.checked === true) {

                        if (this.inputNewStuedntAssignDate === '' || this.inputNewStuedntAssignDate === null) {
                            this.$notify.error({
                                title: 'Require',
                                message: 'Select Date'
                            });
                        } else if (this.ddlCopyAttendDate === '' || this.ddlCopyAttendDate === null) {
                            this.$notify.error({
                                title: 'Require',
                                message: 'Select Copy Date'
                            });

                        } else {

                            studentsListFinal = [];

                            let studentsListFinalTemp = {
                                ecaID: this.assignStudentEcaID,
                                dateAssign: this.inputNewStuedntAssignDate,
                                copyDate: this.ddlCopyAttendDate,
                            };

                            studentsListFinal.push(studentsListFinalTemp);

                            toSave = true;
                            toCopySave = true;

                        }
                    } else if (this.assignStudentEcaNewOrUpdate === 'NEW' && this.$refs.cbCopyDateAttend.checked === false) {

                        if (this.inputNewStuedntAssignDate === '' || this.inputNewStuedntAssignDate === null) {
                            this.$notify.error({
                                title: 'Require',
                                message: 'Select Date'
                            });
                        } else if (this.multipleSelection.length < 1) {
                            this.$notify.error({
                                title: 'Require',
                                message: 'Select Student'
                            });
                        } else {
                            let studentsList = [];

                            this.multipleSelection.forEach((m, index) => {
                                let studentsListTemp = {
                                    studentIndexNo: m.Index_No
                                };

                                studentsList.push(studentsListTemp);
                            });

                            studentsListFinal = [];

                            let studentsListFinalTemp = {
                                ecaID: this.assignStudentEcaID,
                                dateAssign: this.inputNewStuedntAssignDate,
                                studentList: studentsList,
                            };

                            studentsListFinal.push(studentsListFinalTemp);

                            toSave = true;
                        }
                    } else if (this.assignStudentEcaNewOrUpdate === 'UPDATE') {
                        if (this.multipleSelection.length < 1) {
                            this.$notify.error({
                                title: 'Require',
                                message: 'Select Student'
                            });
                        } else {
                            let studentsList = [];

                            this.multipleSelection.forEach((m, index) => {
                                let studentsListTemp = {
                                    studentIndexNo: m.Index_No
                                };

                                studentsList.push(studentsListTemp);
                            });

                            studentsListFinal = [];

                            let studentsListFinalTemp = {
                                ecaID: this.assignStudentEcaID,
                                dateAssign: this.assignStudentEcaUpdateAttendDate,
                                studentList: studentsList,
                            };

                            studentsListFinal.push(studentsListFinalTemp);

                            toSave = true;
                        }
                    }

                    if (toSave === true) {
                        var status = '';

                        if (toCopySave === true) {
                            status = 'COPY';
                        } else {
                            status = this.assignStudentEcaNewOrUpdate;
                        }

                        const response = await DataSource.shared.saveEcaDetails(JSON.stringify(studentsListFinal), status);
                        if (response) {
                            if (response.code === '88') {
                                window.location.replace('/');
                            } else if (response.code === '99') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Assign Student New Error!'
                                });
                            } else if (response.code === '2') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Duplicated Date with ECA'
                                });
                            } else {
                                this.$notify({
                                    title: 'Saved',
                                    message: 'Save Successfully!',
                                    type: 'success'
                                });

                                this.inputNewStuedntAssignDate = '';
                                this.$refs.assignStudentsModal.hide();
                                this.$refs.editAssignStudentsModal.hide();
                            }
                        }
                    }
                    if (this.ecaCurrentID !== null) {
                        this.getECASummary(this.ecaCurrentID);
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            getEcaDetailsAction(value) {
                this.editAssignedECAID = value.EcaDtlEcaID;
                this.editAssignedECAName = value.EcaName;
                this.editAssignedECAAttendDate = value.EcaDtlDateAttend_convert;

                this.getEcaDetails();
            },
            async getEcaDetails(value) {
                try {
                    const response = await DataSource.shared.getEcaDetails(this.editAssignedECAID, this.editAssignedECAAttendDate);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Get Assigned Student Error!'
                            });
                        } else if (response.code === '2') {
                            // this.$notify({
                            //     title: 'No Record',
                            //     message: 'No Student Assign Yet'
                            // });

                            this.$refs.editAssignStudentsModal.hide();
                        } else {
                            this.intAssignedStudentsList = response.Table;

                            this.$refs.editAssignStudentsModal.show();
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async deleteEcaDtl(value) {
                try {
                    this.$vs.loading();
                    const response = await DataSource.shared.updateEcaDetails(value.EcaDtlID, "VOID");
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Delete Delete ECA Dtl Error!'
                            });
                        } else {
                            this.$notify({
                                title: 'Success',
                                message: 'Successfully Delete!',
                                type: 'success'
                            });
                            this.getEcaDetails();
                        }
                    }
                    this.$vs.loading.close();
                    if (this.ecaCurrentID !== null) {
                        this.getECASummary(this.ecaCurrentID);
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            updateAssignedStudent() {
                this.assignStudentsListSearchFilter = '';
                this.assignStudentDate = false;
                this.intAssignStudentsList = [];
                this.assignStudentEcaNewOrUpdate = "UPDATE";
                this.assignStudentEcaID = this.editAssignedECAID;
                this.assignStudentEcaUpdateAttendDate = this.editAssignedECAAttendDate;
                this.copyAttendDate = false;
                this.$refs.assignStudentsModal.show();
                this.getECAUnassignStudent();
            },
            async getECAUnassignStudent() {
                try {
                    const response = await DataSource.shared.getEcaDetailsUnAssignStudent(this.editAssignedECAID, this.editAssignedECAAttendDate);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Get ECA Unassign Student Error!'
                            });
                        } else if (response.code === '2') {
                            this.intAssignStudentsList = [];
                        } else {
                            this.intAssignStudentsList = response.Table;

                            this.assignStudentsListTotal = this.intAssignStudentsList.length;
                            this.assignStudentsListCurrentPage = 1;
                            this.assignStudentsListPageSize = 20;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            copyDateAttend() {
                if (this.$refs.cbCopyDateAttend.checked === true) {
                    this.copyAttendDate = true;
                } else {
                    this.copyAttendDate = false;
                }
            },
            async getAssignedECADate() {
                try {
                    const response = await DataSource.shared.getEcaSummaryGroupByEcaID(this.assignStudentEcaID);
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Get ECA Summary Error!'
                            });
                        } else if (response.code === '2') {
                            this.ddlCopyAttendDateList = [];
                        } else {
                            this.ddlCopyAttendDateList = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            importNewECAWithDateStudentIndex(ecaID , ecaName) {
                try {
                    this.importNewEcaWithDateStudentIndexECAID = ecaID;
                    this.importNewEcaWithDateStudentIndexECAName = ecaName;
                    this.$refs.importNewEcaWithDateStudentIndex.show();
                } catch (e) {
                    this.results = e;
                }
            },
            importNewEcaWithDateStudentIndexFileNameShow (event) {
                for (let file of event.target.files) {
                    this.importNewEcaWithDateStudentIndexFileName = file.name;
                }
            },
            async importNewEcaWithDateStudentIndexSave () {
                try {
                    if (this.$refs.inputImportNewEcaWithDateStudentIndexFile.files.length === 0) {
                        this.$notify({
                            title: 'Require',
                            message: 'Please select File'
                        });
                    } else {
                        this.$vs.loading();

                        await this.sleep(500);
                        const response = await DataSource.shared.importECADetailsByCSVExcel(this.$refs.inputImportNewEcaWithDateStudentIndexFile.files, this.importNewEcaWithDateStudentIndexECAID);
                        if (response) {
                            if (response.code === '88') {
                                window.location.replace('/');
                            } else if (response.code === '99') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Import New ECA Error!'
                                });
                            } else {
                                this.$notify({
                                    title: 'Success',
                                    message: 'Successfully Added!',
                                    type: 'success'
                                });

                                if (this.ecaCurrentID !== null) {
                                    this.getECASummary(this.ecaCurrentID);
                                }

                                Export_CSV.CsvExport(response.Table, '', '', 'Report Import ECA');
                            }
                        }

                        this.importNewEcaWithDateStudentIndexFileName = '';
                        this.$refs.inputImportNewEcaWithDateStudentIndexFile.value = '';
                        this.$refs.importNewEcaWithDateStudentIndex.hide();

                        this.$vs.loading.close();
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            importNewEcaWithDateStudentIndexTemplate () {
                let templateList = [];

                let tempTemplate = {
                    'Date of Attend': '25/5/2019',
                    'Student ID': 'SG-016-19-000',
                };

                templateList.push(tempTemplate);

                // https://lovemewithoutall.github.io/it/json-to-excel/
                var sheet1WS = XLSX.utils.json_to_sheet(templateList)
                var wb = XLSX.utils.book_new() // make Workbook of Excel
                XLSX.utils.book_append_sheet(wb, sheet1WS, 'sheet1') // sheetAName is name of Worksheet
                XLSX.writeFile(wb, 'Template Import ECA.xlsx') // name of the file is 'book.xlsx'
            },
            sleep(milliseconds) {
                return new Promise(resolve => setTimeout(resolve, milliseconds));
            },
        },
    };
</script>

<style scoped>
    .btnFamilyIDSearch {
        display:inline;
        margin-left:10px;
    }
</style>