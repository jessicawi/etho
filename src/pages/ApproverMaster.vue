<template>
    <div id="approvermaster">
        <div class="container admin-wrap">
            <div class="row header">
                <div class="col-lg-12 ">
                    <h3 class="text-left"> APPROVER MASTER</h3>
                </div>
            </div>
            <el-tabs v-model="tabForm">
                <!--<el-tabs v-model="tabForm" @tab-click="handleClick">-->
                <el-tab-pane label="Approver Master" name="approver_master">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="datatable_group">
                            <div class="toolbar">
                                <el-button-group class="float-right mb-3">
                                    <el-tooltip class="item" effect="dark" content="Add Approver Master"
                                                placement="top-start">
                                        <el-button type="primary" icon="el-icon-plus"
                                                   @click="showApproverMaster"></el-button>
                                    </el-tooltip>
                                    <el-tooltip class="item" effect="dark" content="Delete" placement="top-start">
                                        <el-button type="primary" icon="el-icon-delete"
                                                   :disabled="selectedRow&&selectedRow.length<1"
                                                   @click="deleteSelectedApproverMaster()"></el-button>
                                    </el-tooltip>
                                </el-button-group>
                            </div>
                            <div class="empty-list_image"
                                 v-if="approverListInt&&approverListInt.length<1">
                                <strong>No Data Found...</strong>
                                <img src="../assets/notfound.png"/>
                            </div>
                            <data-tables :data="approverListInt" :action-col="approverListDeleteButton"
                                         @selection-change="handleSelectionChange"
                                         v-if="approverListInt&&approverListInt.length>0">
                                <el-table-column type="selection" width="55">
                                </el-table-column>
                                <el-table-column v-for="approverListInfo in approverList" :prop="approverListInfo.prop"
                                                 :label="approverListInfo.label" :key="approverListInfo.prop"
                                                 sortable="custom">
                                </el-table-column>
                            </data-tables>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="Specific User To Approve" name="SpecificUser_approver">
                    <div class="row">
                        <div class="col-lg-12">
                            <div
                                 class="datatable_group">
                                <div class="toolbar">
                                    <el-button-group class="float-right mb-3">
                                        <el-tooltip class="item" effect="dark" content="Add Approver Master"
                                                    placement="top-start">
                                            <el-button type="primary" icon="el-icon-plus"
                                                       @click="showSpecificApproverMaster"></el-button>
                                        </el-tooltip>
                                        <el-tooltip class="item" effect="dark" content="Delete" placement="top-start">
                                            <el-button type="primary" icon="el-icon-delete"
                                                       :disabled="selectedRow&&selectedRow.length<1"
                                                       @click="deleteSelectedApproverMaster()"></el-button>
                                        </el-tooltip>
                                    </el-button-group>
                                </div>
                                <div class="empty-list_image"
                                     v-if="approverSpecificUserInt&&approverSpecificUserInt.length<1">
                                    <strong>No Data Found...</strong>
                                    <img src="../assets/notfound.png"/>
                                </div>
                                <data-tables :data="approverSpecificUserInt"
                                             :action-col="approverSpecificUserListDeleteButton"
                                             @selection-change="handleSelectionChange" v-if="approverSpecificUserInt&&approverSpecificUserInt.length>0">
                                    <el-table-column type="selection" width="55">
                                    </el-table-column>
                                    <el-table-column v-for="approverSpecificUserListInfo in approverSpecificUserList"
                                                     :prop="approverSpecificUserListInfo.prop"
                                                     :label="approverSpecificUserListInfo.label"
                                                     :key="approverSpecificUserListInfo.prop"
                                                     sortable="custom">
                                    </el-table-column>
                                </data-tables>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <!--<div class="row">-->
            <!--<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">-->
            <!--<b-btn v-b-modal.specificUserToApprove variant="primary">-->
            <!--Specific User To Approve-->
            <!--</b-btn>-->
            <!--</div>-->
            <!--</div>-->
        </div>
        <b-modal id="addApproverMaster" title="Add Approver Master" hide-footer v-model="showAddApproverMaster">
            <div class="col-lg-12 mb-3">
                <label>Approver Type</label>
                <el-select
                        v-model="ddlApproverType"
                        class="w-100">
                    <el-option
                            v-for="item in approverTypeList"
                            :key="item"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
                <!--<select v-model="ddlApproverType" class="form-control pro-edt-select form-control-primary">-->
                <!--<option v-for="item in approverTypeList" v-bind:value="item">-->
                <!--{{ item }}-->
                <!--</option>-->
                <!--</select>-->
            </div>
            <div class="col-lg-12 mb-3">
                <label>Approver Level</label>
                <el-select
                        v-model="ddlApproverLevel"
                        filterable
                        reserve-keyword
                        class="w-100">
                    <el-option
                            v-for="item in approverLevelList"
                            :key="item"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
                <!--<select v-model="ddlApproverLevel" class="form-control pro-edt-select form-control-primary">-->
                <!--<option v-for="item in approverLevelList" v-bind:value="item">-->
                <!--{{ item }}-->
                <!--</option>-->
                <!--</select>-->
            </div>
            <div class="col-lg-12 mb-3">
                <label>Approver</label>
                <el-select
                        v-model="ddlStaffList"
                        filterable
                        reserve-keyword
                        class="w-100">
                    <el-option
                            v-for="item in staffList"
                            :key="item.CONid"
                            :label="item.CONname"
                            :value="item.CONid">
                    </el-option>
                </el-select>
                <!--<select v-model="ddlStaffList" class="form-control pro-edt-select form-control-primary">-->
                <!--<option v-for="item in staffList" v-bind:value="item.CONid">-->
                <!--{{ item.CONname }}-->
                <!--</option>-->
                <!--</select>-->
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <button v-on:click="saveApproverMaster()" class="btn btn-primary waves-effect waves-light m-r-10">
                    Save
                </button>
            </div>
        </b-modal>
        <b-modal id="addSpecificApproverMaster" title="Specific Needed Approver" hide-footer v-model="showAddSpecific">
            <div class="col-lg-12 mb-3">
                <label>Approver Type</label>
                <el-select
                        v-model="ddlApproverTypeSpecificUser"
                        class="w-100">
                    <el-option
                            v-for="item in approverTypeList"
                            :key="item"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
                <!--<select v-model="ddlApproverTypeSpecificUser"-->
                <!--class="form-control pro-edt-select form-control-primary">-->
                <!--<option v-for="item in approverTypeList" v-bind:value="item">-->
                <!--{{ item }}-->
                <!--</option>-->
                <!--</select>-->
            </div>
            <div class="col-lg-12 mb-3">
                <label>Specific Needed Approve User</label>
                <el-select
                        v-model="ddlStaffListSpecificUser"
                        filterable
                        reserve-keyword
                        class="w-100">
                    <el-option
                            v-for="item in staffListSpecificUser"
                            :key="item.CONid"
                            :label="item.CONname"
                            :value="item.CONid">
                    </el-option>
                </el-select>
                <!--<select v-model="ddlStaffListSpecificUser"-->
                <!--class="form-control pro-edt-select form-control-primary">-->
                <!--<option v-for="item in staffListSpecificUser" v-bind:value="item.CONid">-->
                <!--{{ item.CONname }}-->
                <!--</option>-->
                <!--</select>-->
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <button v-on:click="saveApproveSpecificUser()"
                        class="btn btn-primary waves-effect waves-light m-r-10">
                    Save
                </button>
            </div>
        </b-modal>
        <!--<b-modal id="specificUserToApprove" size="lg" title="Specific User To Approve" ok-only-->
        <!--ok-variant="secondary" ok-title="Cancel" ref="familyModalShowModal">-->
        <!--<div class="row">-->
        <!--<div class= "col-lg-12 col-md-12 col-sm-12 col-xs-12">-->
        <!--<div v-if="approverSpecificUserInt.length>0" class="datatable_group">-->
        <!--<data-tables :data="approverSpecificUserInt" :action-col="approverSpecificUserListDeleteButton" @selection-change="handleSelectionChange">-->
        <!--<el-table-column v-for="approverSpecificUserListInfo in approverSpecificUserList" :prop="approverSpecificUserListInfo.prop"-->
        <!--:label="approverSpecificUserListInfo.label" :key="approverSpecificUserListInfo.prop"-->
        <!--sortable="custom">-->
        <!--</el-table-column>-->
        <!--</data-tables>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">-->
        <!--<label>Approver Type</label>-->
        <!--<select v-model="ddlApproverTypeSpecificUser" class="form-control pro-edt-select form-control-primary">-->
        <!--<option v-for="item in approverTypeList" v-bind:value="item">-->
        <!--{{ item }}-->
        <!--</option>-->
        <!--</select>-->
        <!--</div>-->
        <!--<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">-->
        <!--<label>Specific Needed Approve User</label>-->
        <!--<select v-model="ddlStaffListSpecificUser" class="form-control pro-edt-select form-control-primary">-->
        <!--<option v-for="item in staffListSpecificUser" v-bind:value="item.CONid">-->
        <!--{{ item.CONname }}-->
        <!--</option>-->
        <!--</select>-->
        <!--</div>-->
        <!--<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">-->
        <!--<button v-on:click="saveApproveSpecificUser()" class="btn btn-primary waves-effect waves-light m-r-10">-->
        <!--Save-->
        <!--</button>-->
        <!--</div>-->
        <!--</div>-->
        <!--</b-modal>-->
    </div>
</template>
<script>
    import DataSource from "../data/datasource";

    export default {
        name: "ApproverMaster",
        data() {
            return {
                showAddSpecific: false,
                showAddApproverMaster: false,
                tabForm: 'approver_master',
                ddlStaffList: '',
                staffList: [],
                ddlStaffListSpecificUser: '',
                staffListSpecificUser: [],
                approverTypeList: ['Portfolio', 'Documentation_Posting', 'Update_Posting', 'Portfolio_Posting', 'Report_Posting', 'Broadcast_Posting'],
                ddlApproverType: '',
                ddlApproverTypeSpecificUser: '',
                approverLevelList: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                ddlApproverLevel: '',
                selectedRow: [],

                approverListInt: [],
                approverList: [{
                    prop: "ApproverMasterType",
                    label: "Type"
                }, {
                    prop: "ApproverMasterLevel",
                    label: "Approval Level"
                }, {
                    prop: "CONname",
                    label: "Approver"
                }, {
                    prop: "ContainAnySpecificUser",
                    label: "Specific User To Approve"
                }],
                approverListDeleteButton: {
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
                            this.deleteApproverMaster(row.ApproverMasterID);
                        },
                        label: 'Delete'
                    }]
                },

                approverSpecificUserInt: [],
                approverSpecificUserList: [{
                    prop: "AppMacSpeType",
                    label: "Type"
                }, {
                    prop: "CONname",
                    label: "Specific Needed Approve User Name"
                }],
                approverSpecificUserListDeleteButton: {
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
                            this.deleteApproverMasterSpecificUser(row.AppMasSpeID);
                        },
                        label: 'Delete'
                    }]
                },
                showEmpty: false,
            };
        },
        async created() {
            this.getStaffList();
            this.getStaffListBySchool();
        },
        async mounted() {
            this.getApproverMaster();
            this.getApproverMasterSpecificUser();
        },
        methods: {
            showSpecificApproverMaster() {
                this.showAddSpecific = true;
            },
            showApproverMaster() {
                this.showAddApproverMaster = true;
            },
            handleSelectionChange(val) {
                this.selectedRow = val;
            },
            async getStaffList() {
                this.$vs.loading();
                try {
                    const response = await DataSource.shared.getAllStaffList();
                    if (response) {
                        switch (response.code) {
                            case "88":
                                this.$router.push('/');
                                break;
                            case "99":
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Error'
                                });
                                break;
                        }

                        this.staffList = response.Table;
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },
            async getStaffListBySchool() {
                this.$vs.loading();
                try {
                    const response = await DataSource.shared.getAllStaffListBySchool();
                    if (response) {
                        switch (response.code) {
                            case "88":
                                this.$router.push('/');
                                break;
                            case "99":
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Error'
                                });
                                break;
                        }

                        this.staffListSpecificUser = response.Table;
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },
            async getApproverMaster() {
                this.$vs.loading();
                try {
                    const response = await DataSource.shared.getApproverMaster();
                    if (response) {
                        switch (response.code) {
                            case "2":
                                // this.$notify.error({
                                //     title: 'Error',
                                //     message: 'no record found'
                                // });
                                    this.showEmpty = true;
                                break;
                            case "88":
                                this.$router.push('/');
                                break;
                            case "99":
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Get list Error'
                                });
                                break;
                        }

                        this.approverListInt = response.Table;
                        if (this.approverListInt === undefined){
                            this.approverListInt= [];
                        }
                        if (this.approverListInt && this.approverListInt.length > 0){
                            this.showEmpty = false;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },
            async deleteApproverMaster(approverMasterID) {
                this.$vs.loading();
                try {
                    const response = await DataSource.shared.updateApproverMaster(approverMasterID, "VOID");
                    if (response) {
                        switch (response.code) {
                            case "1":
                                this.$notify({
                                    title: 'Successful Delete',
                                    message: 'Successful Delete',
                                    type: 'success'
                                });
                                this.getApproverMaster();
                                // window.location.replace('/ApproverMaster');
                                break;
                            case "2":
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Higher Approver Level Is Existing, Not Able To Empty Lower Approver Level'
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
                        }

                        this.approverListInt = response.Table;
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },
            async deleteSelectedApproverMaster() {
                this.$vs.loading();
                try {
                    const approverMasterID = JSON.stringify(this.selectedRow.map(m => m.ApproverMasterID));
                    const response = await DataSource.shared.updateApproverMaster(approverMasterID, "VOID");
                    if (response) {
                        switch (response.code) {
                            case "1":
                                this.$notify({
                                    title: 'Successful Delete',
                                    message: 'Successful Delete',
                                    type: 'success'
                                });
                                this.getApproverMaster();
                                // window.location.replace('/ApproverMaster');
                                break;
                            case "2":
                                // this.$notify.error({
                                //     title: 'Error',
                                //     message: 'Higher Approver Level Is Existing, Not Able To Empty Lower Approver Level'
                                // });
                                    this.showEmpty = true;
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
                        }

                        this.approverListInt = response.Table;
                    }
                } catch (e) {
                    this.results = e;
                }
                this.$vs.loading.close();
            },
            async saveApproverMaster() {
                try {
                    if (this.ddlApproverType === '' || this.ddlApproverLevel === '' || this.ddlStaffList === '') {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please fill in all fields'
                        });
                    } else {
                        this.$vs.loading();

                        const response = await DataSource.shared.saveApproverMaster(this.ddlApproverLevel, this.ddlStaffList, this.ddlApproverType);
                        if (response) {
                            switch (response.code) {
                                case "1":
                                    this.showAddApproverMaster = false;
                                    this.$notify({
                                        title: 'Successful',
                                        message: 'Successful added.',
                                        type: 'success'
                                    });
                                    this.getApproverMaster();
                                    // window.location.replace('/ApproverMaster');
                                    break;
                                case "2":
                                    this.$notify.error({
                                        title: 'Duplicated',
                                        message: 'Approver duplicated'
                                    });
                                    this.getApproverMaster();
                                    break;
                                case "3":
                                    this.$notify.error({
                                        title: 'Fail to Add',
                                        message: 'Lower approver level is not existed, please follow the correct sequence of approver level'
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
                            }

                            this.approverListInt = response.Table;
                        }

                        this.$vs.loading.close();
                    }
                } catch (e) {
                    this.results = e;
                }

            },
            async getApproverMasterSpecificUser() {
                try {
                    const response = await DataSource.shared.getApproverMasterSpecificUser();
                    if (response) {
                        switch (response.code) {
                            case "88":
                                this.$router.push('/');
                                break;
                            case "99":
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Error'
                                });
                                break;
                        }

                        this.approverSpecificUserInt = response.Table;

                        if(this.approverSpecificUserInt === undefined){
                            this.approverSpecificUserInt = [];
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async deleteApproverMasterSpecificUser(value) {
                try {
                    this.$vs.loading();

                    const response = await DataSource.shared.updateApproverMasterSpecificUser(value, "VOID");
                    if (response) {
                        switch (response.code) {
                            case "1":
                                this.$notify({
                                    title: 'Successful',
                                    message: 'Successful Added',
                                    type: 'success'
                                });
                                this.getApproverMasterSpecificUser();
                                // window.location.replace('/ApproverMaster');
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
                        }
                    }

                    this.$vs.loading.close();
                } catch (e) {
                    this.results = e;
                }
            },
            async saveApproveSpecificUser() {
                try {
                    if (this.ddlApproverTypeSpecificUser === '' || this.ddlStaffListSpecificUser === '') {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Please fill in all fields'
                        });
                    } else {
                        this.$vs.loading();

                        const response = await DataSource.shared.saveApproverMasterSpecificUser(this.ddlStaffListSpecificUser, this.ddlApproverTypeSpecificUser);
                        if (response) {
                            switch (response.code) {
                                case "1":
                                    this.showAddSpecific = false;
                                    this.$notify({
                                        title: 'Successful',
                                        message: 'Successful Added',
                                        type: 'success'
                                    });

                                    this.getApproverMasterSpecificUser();
                                    // window.location.replace('/ApproverMaster');
                                    break;
                                case "2":
                                    this.$notify.error({
                                        title: 'Duplicated',
                                        message: 'Approver duplicated'
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
                            }
                        }

                        this.$vs.loading.close();
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