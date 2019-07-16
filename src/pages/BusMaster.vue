<template>
    <div id="busmaster">
        <div class="container ">
            <div class="row header mb-5">
                <div class="col-lg-5  ">
                    <h3 class="text-left ">{{$route.name}}</h3>
                </div>
                <div class="col-lg-7 ">
                    <div class=" searchingArea attendance-search">
                        <!--<button v-on:click="createNewBus()"-->
                                <!--class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch">New Bus-->
                        <!--</button>-->

                        <el-button type="primary" round
                                   class="float-right large-btn classManage-filter"  v-on:click="createNewBus()">
                            <i class="material-icons">
                            directions_bus
                        </i> New Bus
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="row">
                <!--<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">-->
                    <!--<div v-if="intBusList.length>0" class="datatable_group">-->
                        <!--<data-tables :data="intBusList" :action-col="busListActionCol">-->
                            <!--<el-table-column v-for="busListInfo in busList" :prop="busListInfo.prop"-->
                                             <!--:label="busListInfo.label" :key="busListInfo.prop"-->
                                             <!--sortable="custom">-->
                            <!--</el-table-column>-->
                            <!--<el-table-column label="Assigned Students" min-width="100px">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-button v-for="busListViewStudent in studentListByBusID(scope.row)"-->
                                               <!--:key="busListViewStudent.name" type="primary"-->
                                               <!--@click="busListViewStudent.handler">-->
                                        <!--{{ busListViewStudent.name }}-->
                                    <!--</el-button>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column label="Assign Students" min-width="100px">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<el-button v-for="busListAssignStudent in assignStudentToBus(scope.row)"-->
                                               <!--:key="busListAssignStudent.name" type="primary"-->
                                               <!--@click="busListAssignStudent.handler">-->
                                        <!--{{ busListAssignStudent.name }}-->
                                    <!--</el-button>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                        <!--</data-tables>-->
                    <!--</div>-->
                <!--</div>-->
                <div class="busMaster-wrap col-lg-12">
                    <div class="busMaster-item mb-4" v-for="(busListInfo, index) in intBusList">
                        <div class="busMaster-heading row">
                            <div class="busMaster-item_title col-lg-10 col-8">
                                <i class="material-icons">
                                    directions_bus
                                </i>
                                <span>Bus No: {{busListInfo.BusNo}}</span>
                            </div>
                            <div class="busMaster-item_close col-lg-2 col-4">
                                <el-button icon="el-icon-close" circle @click="updateBus(busListInfo.BusID)"></el-button>
                                <el-button icon="el-icon-plus" circle @click="assignStudentToBus(busListInfo.BusNo)"></el-button>
                            </div>
                        </div>
                        <div @click="busListClick(busListInfo.ID,busListInfo.BusNo)" class="busListCLick">
                            <i class="material-icons">
                                assignment
                            </i>
                            View Assigned Students
                        </div>

                        <div v-show="currentBusList===busListInfo.ID">
                            <div style="display: none;">{{ currentAssignedBusNo }}</div>
                            <div class="" v-if="intAssignedStudentsList&&intAssignedStudentsList.length<1">
                                <el-alert
                                        title="No Record..."
                                        type="info"
                                        :closable="false">
                                </el-alert>
                            </div>
                            <div v-if="intAssignedStudentsList&&intAssignedStudentsList.length>0" class="datatable_group">
                                <data-tables :data="intAssignedStudentsList"
                                             :action-col="AssignedStudentsListActionCol">
                                    <el-table-column v-for="assignedStudentsListInfo in assignedStudentsListInt"
                                                     :prop="assignedStudentsListInfo.prop"
                                                     :label="assignedStudentsListInfo.label"
                                                     :key="assignedStudentsListInfo.prop"
                                                     sortable="custom">
                                    </el-table-column>
                                </data-tables>
                            </div>
                        </div>
                        <!--<el-collapse v-model="activeNames" accordion @change="handleChange(busListInfo.BusNo)">-->
                            <!--<el-collapse-item name="1" >-->
                                <!--<template slot="title">-->
                                    <!--<i class="material-icons">-->
                                        <!--assignment-->
                                    <!--</i>-->
                                    <!--View Assigned Student-->
                                <!--</template>-->
                                <!--<div style="display: none;">{{ currentAssignedBusNo }}</div>-->
                                <!--<div v-if="intAssignedStudentsList.length>0" class="datatable_group">-->
                                    <!--<data-tables :data="intAssignedStudentsList"-->
                                                 <!--:action-col="AssignedStudentsListActionCol">-->
                                        <!--<el-table-column v-for="assignedStudentsListInfo in assignedStudentsListInt"-->
                                                         <!--:prop="assignedStudentsListInfo.prop"-->
                                                         <!--:label="assignedStudentsListInfo.label"-->
                                                         <!--:key="assignedStudentsListInfo.prop"-->
                                                         <!--sortable="custom">-->
                                        <!--</el-table-column>-->
                                    <!--</data-tables>-->
                                <!--</div>-->
                            <!--</el-collapse-item>-->
                            <!--<el-collapse-item name="2">-->
                                <!--<template slot="title">-->
                                    <!--<i class="material-icons">-->
                                        <!--assignment_returned-->
                                    <!--</i>-->
                                    <!--Assign Student-->
                                <!--</template>-->
                            <!--</el-collapse-item>-->
                        <!--</el-collapse>-->
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-modal size="lg" title="New Bus" ok-only ok-variant="secondary" hide-footer ref="newBusModal">
            <div class="row ml-2 mr-2">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label>Bus No</label>
                    <input type="text" class="form-control" v-model="inputNewBusNo">
                </div>
                <div class="col-lg-12">
                    <button v-on:click="saveNewBus()"
                            class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch">Save
                    </button>
                </div>
            </div>
        </b-modal>
        <b-modal size="lg" title="Assigned Students" ok-only ok-variant="secondary" hide-footer
                 ref="assignedStudentsModal">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div style="display: none;">{{ currentAssignedBusNo }}</div>
                <div v-if="intAssignedStudentsList.length>0" class="datatable_group">
                    <data-tables :data="intAssignedStudentsList" :action-col="AssignedStudentsListActionCol">
                        <el-table-column v-for="assignedStudentsListInfo in assignedStudentsListInt"
                                         :prop="assignedStudentsListInfo.prop"
                                         :label="assignedStudentsListInfo.label" :key="assignedStudentsListInfo.prop"
                                         sortable="custom">
                        </el-table-column>
                    </data-tables>
                </div>
            </div>
        </b-modal>
        <b-modal size="lg" title="Assign Students" ok-only ok-variant="secondary" hide-footer ref="assignStudentsModal">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div style="display: none;">{{ currentBusNo }}</div>
                <div v-if="intAssignStudentsList.length>0" class="datatable_group">
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
                <button v-on:click="assignToBus()" class="btn btn-primary waves-effect waves-light m-r-10">
                    Assign
                </button>
            </div>
        </b-modal>
    </div>
</template>
<script>
    import DataSource from "../data/datasource";

    export default {
        name: "BusMaster",
        async created() {
            this.getBusList();
        },
        data() {
            return {
                inputNewBusNo: '',
                currentBusNo: '',
                currentAssignedBusNo: '',
                assignStudentsListSearchFilter: '',
                multipleSelection: [],

                intBusList: [],
                busList: [{
                    prop: "BusNo",
                    label: "Bus No"
                }],
                busListActionCol: {
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
                            this.updateBus(row.BusID);
                        },
                        label: 'Delete'
                    }]
                },

                intAssignedStudentsList: [],
                assignedStudentsListInt: [{
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
                AssignedStudentsListActionCol: {
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
                            this.deleteFromBusNo(row.Student_ID);
                        },
                        label: 'Delete'
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
                activeNames: "",
                currentBusList: null,
                deleteFromBus: false,
            };
        },
        methods: {
            busListClick(id,BusNo) {
                this.currentBusList = id;
                this.getActiveStudentListBySchoolIDOfBusNo(BusNo)
            },
            handleChange(BusNo) {
                if (this.activeNames === "1") {
                    this.currentAssignedBusNo = BusNo;
                    this.getActiveStudentListBySchoolIDOfBusNo(BusNo);
                } else if (this.activeNames === "2") {
                    this.currentBusNo = BusNo;
                    this.getActiveStudentListBySchoolIDOfBusNo('');
                }
            },
            changeSelection(val) {
                this.multipleSelection = val;
            },
            async getBusList() {
                this.$vs.loading();
                try {
                    const response = await DataSource.shared.getBusMasterList();
                    if (response) {
                        this.intBusList = response.Table;
                        console.log("xxxxx", this.intBusList);
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },
            createNewBus() {
                this.inputNewBusNo = '';
                this.$refs.newBusModal.show();
            },
            async saveNewBus() {
                this.$vs.loading();
                try {
                    if (this.inputNewBusNo === '') {
                        this.$notify.error({
                            title: 'Require',
                            message: 'Please fill in bus no'
                        });
                    } else {
                        const response = await DataSource.shared.saveBusMasterList(this.inputNewBusNo);
                        if (response) {
                            if (response.code === '88') {
                                window.location.replace('/');
                            } else if (response.code === '99') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Save New Bus Error!'
                                });
                            } else if (response.code === '2') {
                                this.$notify.error({
                                    title: 'Duplicated',
                                    message: 'Bus No Existing'
                                });
                            } else {
                                this.$notify({
                                    title: 'Success',
                                    message: 'Successfully Saved!',
                                    type: 'success'
                                });
                                this.getBusList();
                                this.$refs.newBusModal.hide();
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },
            async updateBus(busID) {
                console.log(busID)
                this.$vs.loading();
                try {
                    const response = await DataSource.shared.updateBusMasterList(busID, 'VOID');
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Save New Bus Error!'
                            });
                        } else {
                            this.$notify({
                                title: 'Success',
                                message: 'Successfully Update!',
                                type: 'success'
                            });
                            this.getBusList();
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },
            studentListByBusID(row) {
                return [{
                    name: 'View',
                    handler: _ => {
                        this.currentAssignedBusNo = row.BusNo;
                        this.getActiveStudentListBySchoolIDOfBusNo(row.BusNo);
                    }
                }];
            },
            // assignStudentToBus(row) {
            //     return [{
            //         name: 'Assign',
            //         handler: _ => {
            //             this.currentBusNo = row.BusNo;
            //             this.getActiveStudentListBySchoolIDOfBusNo('');
            //         }
            //     }];
            // },
            assignStudentToBus(busNo){
                this.currentBusList = "";
                this.currentBusNo = busNo;
                this.getActiveStudentListBySchoolIDOfBusNo('');
            },
            async getActiveStudentListBySchoolIDOfBusNo(busNo) {
                this.$vs.loading();
                try {
                    console.log(busNo,"busno")
                    console.log("222")

                    this.intAssignedStudentsList = [];
                    const response = await DataSource.shared.getActiveStudentListBySchoolIDOfBusNo(busNo);

                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Get Student List By Bus No Error!'
                            });
                        } else {
                            if (busNo !== '') {
                                console.log("333")

                                this.intAssignedStudentsList = response.Table;
                                // this.$refs.assignedStudentsModal.show();
                            } else {
                                console.log("111")
                                let resultTable = response.Table;
                                this.intAssignStudentsList = [];
                                this.intAssignStudentsList = resultTable.filter(d => {
                                    return d.Bus_No !== this.currentBusNo;
                                });

                                this.assignStudentsListTotal = this.intAssignStudentsList.length;
                                this.assignStudentsListCurrentPage = 1;
                                this.assignStudentsListPageSize = 20;
                                if (this.deleteFromBus === false){
                                    this.$refs.assignStudentsModal.show();
                                }else{
                                    this.deleteFromBus = false;
                                }
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },
            assignStudentsListChangePage(currentPage) {
                this.assignStudentsListCurrentPage = currentPage;
            },
            assignStudentsListChangePageSize(currentPageSize) {
                this.assignStudentsListPageSize = currentPageSize;
            },
            async assignToBus() {
                try {
                    let studentsList = [];

                    this.multipleSelection.forEach((m, index) => {
                        let studentsListTemp = {
                            busNo: this.currentBusNo,
                            studentID: m.Student_ID
                        };

                        studentsList.push(studentsListTemp);
                    });

                    const response = await DataSource.shared.updateStudentBusNo(JSON.stringify(studentsList), 'UPDATE');
                    if (response) {
                        if (response.code === '1') {
                            this.$notify({
                                title: 'Success',
                                message: 'Successfully saved',
                                type: 'success'
                            });
                            this.$refs.assignStudentsModal.hide();
                            this.currentBusList = "";
                            // window.location.replace('/BusMaster');
                        } else if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Assign student to bus no Error!'
                            });
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async deleteFromBusNo(studentID) {
                try {
                    let studentsList = [];
                    let studentsListTemp = {
                        studentID: studentID,
                    };
                    this.deleteFromBus = true;
                    studentsList.push(studentsListTemp);

                    const response = await DataSource.shared.updateStudentBusNo(JSON.stringify(studentsList), 'DELETE');
                    if (response) {
                        if (response.code === '1') {
                            this.$notify({
                                title: 'Success',
                                message: 'Successfully saved',
                                type: 'success'
                            });

                            this.getActiveStudentListBySchoolIDOfBusNo(this.currentAssignedBusNo);
                            this.currentBusList = "";
                            // this.getActiveStudentListBySchoolIDOfBusNo(this.currentAssignedBusNo);
                        } else if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Remove student from bus no Error!'
                            });
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
        },
    };
</script>
<style scoped>
</style>