<template>
    <div id="cancelschedule">
        <div class="container admin-wrap">
            <div class="row header mb-5">
                <div class="col-lg-5 ">
                    <h3 class="text-left mb-3">CANCEL SCHEDULE</h3>
                </div>
                <div class="col-lg-7">
                    <div class=" attendance-search">
                        <el-select v-model="cancelScheduleType" placeholder="Select Type" class="pro-edt-select"
                                   @change="Load()">
                            <el-option
                                    v-for="item in cancelScheduleTypeList"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="pb-5">
                <div class="empty-list_image" v-if="pendingListInt.length < 1 && pendingListWGInt.length < 1">
                    <img src="../assets/attendance.jpg"/>
                </div>
                <div v-if="pendingListInt.length > 0">
                    <el-row>
                        <el-col :span="6">
                            <el-input v-model="pendingListFilters[0].value" placeholder="search student name"></el-input>
                        </el-col>
                    </el-row>
                    <data-tables :data="pendingListInt" :action-col="pendingListActionCol" :filters="pendingListFilters">
                        <el-table-column v-for="pendingListInfo in pendingList" :prop="pendingListInfo.prop"
                                         :label="pendingListInfo.label" :key="pendingListInfo.prop"
                                         sortable="custom">
                        </el-table-column>
                    </data-tables>
                </div>
                <div v-if="pendingListWGInt.length > 0">
                    <el-row>
                        <el-col :span="12">
                            <el-input v-model="pendingListWGFilters[0].value" placeholder="search student name / class name"></el-input>
                        </el-col>
                        <el-col :span="12">
                            <button v-on:click="RemoveWithdrawGraduatePendingSchedule()"
                                    class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch float-right">
                                Delete
                            </button>
                        </el-col>
                    </el-row>
                    <data-tables :data="pendingListWGInt" :filters="pendingListWGFilters" @selection-change="changeSelection" >
                        <el-table-column type="selection" width="55" :reserve-selection="true">
                        </el-table-column>
                        <el-table-column v-for="pendingListWGInfo in pendingListWG" :prop="pendingListWGInfo.prop"
                                         :label="pendingListWGInfo.label" :key="pendingListWGInfo.prop"
                                         sortable="custom">
                        </el-table-column>
                    </data-tables>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";

    export default {
        name: "CancelSchedule",
        data() {
            return {
                multipleSelection: [],
                cancelScheduleTypeList: ['Transfer', 'Withdraw', 'Graduate'],
                cancelScheduleType: '',

                pendingListInt: [],
                pendingList: [{
                    prop: "Index_No",
                    label: "Student ID"
                }, {
                    prop: "StudentFullName",
                    label: "Student Name"
                }, {
                    prop: "SchoolNameThatGoingToTransfer",
                    label: "Transfer To"
                }, {
                    prop: "STUSCH_EffectiveDate_convert",
                    label: "Effective Date"
                }, {
                    prop: "TrasnferCreatedBy",
                    label: "Created By"
                }],
                pendingListActionCol: {
                    label: 'Delete',
                    props: {
                        align: 'center',
                    },
                    buttons: [
                        {
                            props: {
                                type: 'primary',
                                icon: 'el-icon-edit'
                            },
                            handler: row => {
                                this.RemoveTransferPendingSchedule(row.PK_STUSCH_ID);
                            },
                            label: 'Delete'
                        },
                    ]
                },
                pendingListFilters: [
                    {
                        prop: 'StudentFullName',
                        value: ''
                    }
                ],

                pendingListWGInt: [],
                pendingListWG: [{
                    prop: "Index_No",
                    label: "Student ID"
                }, {
                    prop: "StudentFullName",
                    label: "Student Name"
                }, {
                    prop: "CRS_Course_Name",
                    label: "Level"
                }, {
                    prop: "CLS_ClassName",
                    label: "Class"
                }, {
                    prop: "WithdrawnGraduatedDate",
                    label: "Effective Date"
                }, {
                    prop: "WithdrawnGraduatedCreatedBy",
                    label: "Created By"
                }],
                pendingListWGFilters: [
                    {
                        prop: ['StudentFullName', 'CLS_ClassName'],
                        value: ''
                    }
                ],
            };
        },
        async created() {
        },
        async mounted() {
        },
        methods: {
            changeSelection(val) {
                this.multipleSelection = val;
            },
            Load() {
                this.pendingListInt = [];
                this.pendingListWGInt = [];
                this.pendingListFilters[0].value = '';
                this.pendingListWGFilters[0].value = '';

                if (this.cancelScheduleType === 'Transfer') {
                    this.GetTransferPendingList();
                } else if (this.cancelScheduleType === 'Withdraw') {
                    this.GetWithdrawGraduatePendingList('Withdrawn');
                } else if (this.cancelScheduleType === 'Graduate') {
                    this.GetWithdrawGraduatePendingList('Graduated');
                }
            },
            async GetTransferPendingList () {
                try {
                    const response = await DataSource.shared.getTransferPendingScheduleList();
                    if (response) {
                        if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Error on Finding Data',
                            });
                        } else if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '2') {
                            this.$notify({
                                title: 'No Record',
                                message: 'No Record Found',
                            });
                        } else {
                            this.pendingListInt = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async RemoveTransferPendingSchedule(studentSchoolID) {
                try {
                    const response = await DataSource.shared.updateTransferPendingScheduleList(studentSchoolID, 'Void');
                    if (response) {
                        if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Error on Delete Schedule',
                            });
                        } else if (response.code === '88') {
                            window.location.replace('/');
                        } else {
                            this.Load();
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async GetWithdrawGraduatePendingList (changeType) {
                try {
                    const response = await DataSource.shared.getWithdrawGraduatePendingScheduleList(changeType);
                    if (response) {
                        if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Error on Finding Data',
                            });
                        } else if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '2') {
                            this.$notify({
                                title: 'No Record',
                                message: 'No Record Found',
                            });
                        } else {
                            this.pendingListWGInt = response.Table;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async RemoveWithdrawGraduatePendingSchedule() {
                try {
                    if (this.multipleSelection.length < 1) {
                        this.$notify.error({
                            title: 'Require',
                            message: 'Please select student',
                        });
                    } else {
                        let studentGraduationDatesID = [];
                        this.multipleSelection.forEach(item => {
                            studentGraduationDatesID.push(item.PK_GRD_ID);
                        });

                        const response = await DataSource.shared.updateWithdrawGraduatePendingScheduleList(JSON.stringify(studentGraduationDatesID), 'Void');
                        if (response) {
                            if (response.code === '99') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Error on Delete Schedule',
                                });
                            } else if (response.code === '88') {
                                window.location.replace('/');
                            } else {
                                this.Load();
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
        },
    }
</script>

<style scoped>

</style>