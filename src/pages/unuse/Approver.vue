<template>
    <div id="approver" class="mt-3 container">
        <div>

            <div class="datatable-header">
                <h4 class="title text-left">Approver</h4>
                <div class="addPost">
                    <b-btn v-b-modal.saveApprovalModal @click="showApproverModal">ADD APPROVER</b-btn>
                </div>
            </div>
            <div class="whitespace-30"></div>
            <div class="sucess-table" :class="{'d-none':successHide===true}">{{approverUpdateResults}}{{approverSaveResults}}</div>
            <div v-if="list && list.length>0" class="datatable_group">
                <el-row style="margin-bottom: 10px" class="data-top">
                    <el-dropdown @command="handleClick" class="float-right">
                        <el-button type="primary">Actions<i class="el-icon-caret-bottom el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="disable">Disable</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-row>
                <data-tables :data="list" @selection-change="handleSelectionChange" :fit="false"
                             :action-col="actionCol" :table-props="tableProps.defaultSort">
                    <el-table-column type="selection" width="55"></el-table-column>

                    <el-table-column v-for="title in titles" :prop="title.prop" :label="title.label" :key="title.prop"
                                     :width="title.width"
                                     sortable="custom">
                    </el-table-column>

                </data-tables>
            </div>
            <div v-else-if="results==='No Record Found'">
                No Record Found
            </div>
            <div v-else>
                {{results}}
                Loading...
            </div>
        </div>

        <b-modal id="viewMoreModal" hide-footer title="Post Details" v-model="isModalOpen">
            <form class="needs-validation form-style" novalidate @submit.prevent="onSubmit">

                <div class="mb-2">
                    <label for="approverID">Approver ID</label>
                    <input type="text" class="form-control" id="approverID" v-model="approverID"
                           placeholder="Approver ID"
                           required>
                </div>
                <div class="mb-3">
                    <label for="approverLevel">Approver Level</label>
                    <select class="form-control" id="approverLevel" v-model="approverLevel">
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

                <div class="mb-2">
                    <label for="approverUserID">Approver User ID</label>
                    <input type="text" class="form-control" id="approverUserID" v-model="approverUserID"
                           placeholder="Approver User ID"
                           required>
                </div>

                <div class="mb-3">
                    <label for="status">Status</label>
                    <select class="form-control" id="status" v-model="status">
                        <option selected value="Active">Active</option>
                        <option value="Void">Disable</option>
                    </select>
                    <div class="invalid-feedback" style="width: 100%;">
                        Please select a status.
                    </div>
                </div>

                <div class="system-msg" v-bind:class="{'bg-danger': systemmsgError===true}"><p>{{approverUpdateResults}}</p>
                    <p v-if="error" style="color: red">{{error}}</p></div>
                <div class="row d-flex submit-wrap">
                    <div class="col-md-6"></div>
                    <div class="col-md-6">
                        <button class="btn btn-primary login-btn" type="submit">Update
                        </button>
                    </div>
                </div>
            </form>
        </b-modal>

        <b-modal id="saveApprovalModal" hide-footer title="Post Details" v-model="isApproverOpen">
            <form class="needs-validation" novalidate @submit.prevent="onSave">
                <div class="mb-3">
                    <label for="approverLevel">Approver Level</label>
                    <select class="form-control" id="approverLevel" v-model="approverLevel">
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

                <div class="mb-2">
                    <label for="approverUserID">Approver User ID</label>
                    <input type="text" class="form-control" id="approverUserID" v-model="approverUserID"
                           required>
                </div>

                <div class="system-msg" :class="{'d-none':successHide===true}"><p>{{approverSaveResults}}</p>
                    <p v-if="error" style="color: red">{{error}}</p></div>
                <div class="row d-flex submit-wrap">
                    <div class="col-md-6"></div>
                    <div class="col-md-6">
                        <button class="btn btn-primary login-btn" type="submit">Save
                        </button>
                    </div>
                </div>
            </form>
        </b-modal>

        <b-modal id="modaldisable" hide-footer title="CONFIRM APPROVE?" v-model="showConfirmModal">
            Are you sure to disable approver?
            <br/>
            <div class="row d-flex submit-wrap">
                <div class="col-md-6">
                    <b-btn class="float-left" @click="disableCancelClick">Cancel</b-btn>
                </div>
                <div class="col-md-6">
                    <b-btn class="float-right" @click="disableOkClick">OK</b-btn>
                </div>
            </div>
        </b-modal>
    </div>

</template>

<script>
    import DataSource from "../../data/datasource";

    export default {
        name: 'parentPost',
        data() {
            return {
                results: "",
                list: [],
                isModalOpen: false,
                isApproverOpen: false,
                approverUpdateResults: "",
                approverSaveResults:"",
                approverID: "",
                approverLevel: "",
                approverUserID: "",
                status:"",
                error: "",
                systemmsgError: "",
                successHide: false,
                showConfirmModal: false,
                titles: [{
                    prop: "ID",
                    label: "ID"
                }, {
                    prop: "PostApproverMasterID",
                    label: "Post Approver Master ID"
                }, {
                    prop: "PostApproverMasterSchoolID",
                    label: "School ID"
                }, {
                    prop: "PostApproverMasterLevel",
                    label: "Level"
                }, {
                    prop: "PostApproverMasterUserID",
                    label: "User ID"
                }, {
                    prop: "PostApproverMasterStatus",
                    label: "Status"
                }, {
                    prop: "PostApproverMasterModifiedDate",
                    label: "Modified Date"
                }, {
                    prop: "PostApproverMasterModifiedBy",
                    label: "Modified By"
                }, {
                    prop: "PostApproverMasterCreatedDate",
                    label: "Created Date"
                }, {
                    prop: "PostApproverMasterCreatedBy",
                    label: "Created By"
                }],
                actionCol: {
                    label: 'actions',
                    class: 'actions',
                    props: {
                        align: 'center',
                    },
                    buttons: [ {
                        props: {
                            type: 'text',
                            icon: 'el-icon-edit'
                        },
                        handler: async row => {
                            // console.log(row, ' ss');
                            try {

                                this.isModalOpen = true;
                                this.approverID = row.PostApproverMasterID;
                                this.approverLevel = row.PostApproverMasterLevel;
                                this.approverUserID = row.PostApproverMasterUserID;
                                this.status = row.PostApproverMasterStatus;
                            } catch (error) {
                                // log error
                                console.log(error);
                            }

                        },
                        label: ''
                    }
                    ]
                },
                tableProps: {
                    defaultSort: {
                        prop: 'PostApproverMasterID',
                        order: 'descending'
                    }
                },
                selectedRow: null,
            }
        },
        methods: {
            handleSelectionChange(rows) {
                // console.log(rows);
                this.selectedRows = rows;
            },
            showModal() {
                this.isModalOpen = true;
            },
            showApproverModal() {
                this.isApproverOpen = true;
            },
            async getApprover() {
                try {
                    const response = await DataSource.shared.getApproverMaster();
                    // console.log(response);
                    if (response) {
                        this.list = response.Table;
                        switch (response.code) {
                            case "2":
                                this.results = `No Record Found`;
                                //this.results = `Invalid User Name - sample 1:${JSON.stringify(response)}`;
                                break;
                            case "88":
                                this.results = `Please login`;
                                //this.results = `Invalid password - sample 2: code: ${response.code}`;
                                break;
                            case "99":
                                this.results = `Please try again later`;
                                //this.results = `Please fill in all field - sample 3: code: ${response.code}`;
                                break;
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            async onSubmit() {
                try {
                    const response = await DataSource.shared.updateApproverMaster(this.approverID, this.approverLevel, this.approverUserID,this.status);
                    console.log(response);
                    if (response) {
                        switch (response.code) {
                            case "1":
                                this.approverUpdateResults = `Approver updated`;
                                this.isModalOpen = false;
                                this.getApprover();
                                setTimeout(this.hideSuccessBox, 5000);
                                //this.results = `Invalid User Name - sample 1:${JSON.stringify(response)}`;
                                break;
                            case "2":
                                this.approverUpdateResults = `Duplicated approver`;
                                //this.results = `Invalid User Name - sample 1:${JSON.stringify(response)}`;
                                break;
                            case "88":
                                this.approverUpdateResults = `Please Login`;
                                //this.results = `Invalid password - sample 2: code: ${response.code}`;
                                break;
                            case "99":
                                this.approverUpdateResults = `Please try again later`;
                                //this.results = `Please fill in all field - sample 3: code: ${response.code}`;
                                break;
                        }
                    }
                } catch (e) {
                    this.approverSaveResults = e;
                }
            },
            async onSave() {
                try {
                    const response = await DataSource.shared.saveApproverMaster(this.approverLevel, this.approverUserID);
                    console.log(response);
                    if (response) {
                        switch (response.code) {
                            case "1":
                                this.approverSaveResults = `Approver created`;
                                this.isApproverOpen = false;
                                this.getApprover();
                                setTimeout(this.hideSuccessBox, 5000);
                                this.approverLevel = null;
                                this.approverUserID = null;
                                //this.results = `Invalid User Name - sample 1:${JSON.stringify(response)}`;
                                break;
                            case "2":
                                this.approverSaveResults = `Duplicated approver`;
                                //this.results = `Invalid User Name - sample 1:${JSON.stringify(response)}`;
                                break;
                            case "88":
                                this.approverSaveResults = `Please Login`;
                                //this.results = `Invalid password - sample 2: code: ${response.code}`;
                                break;
                            case "99":
                                this.approverSaveResults = `Please try again later`;
                                //this.results = `Please fill in all field - sample 3: code: ${response.code}`;
                                break;
                        }
                    }
                } catch (e) {
                    this.approverSaveResults = e;
                    this.isLoading = false;
                }
            },
            async handleClick(command) {

                // if clicked dropdown button is approve
                if (command === "disable") {
                    try {
                        if (this.selectedRows.length !== 0) {
                            this.showConfirmModal = true;
                        }
                    } catch (error) {
                        // log error
                        console.log(error);
                    }
                }
            },
            async disableCancelClick() {
                this.showConfirmModal = false;
            },
            async disableOkClick() {
                try {
                    let response;
                    // loop selected rows and call approve api one by one, lol
                    for (const row of this.selectedRows) {
                        console.log(this.selectedRows);
                        row.PostApproverMasterStatus = "Void";
                        response = await DataSource.shared.updateApproverMaster(row.PostApproverMasterID, row.PostApproverMasterLevel, row.PostApproverMasterUserID, row.PostApproverMasterStatus);
                    }
                    // update pending post view on success
                    if (response && response.code === "1") {
                        this.showConfirmModal = false;
                        this.getApprover();
                    }
                } catch (e) {
                    console.log("error ", e);
                }
            },
            hideSuccessBox() {
                this.successHide = true;
            },
        },
        async mounted() {
            this.getApprover();
            // this.showSession()
            // user menu
            // this.results = response;
            // const response = await DataSource.shared.getApproverMaster();
            // this.list = response.Table;
            // console.log(response);
            // if (response) {
            //     switch (response.code) {
            //         case "2":
            //             this.results = `No Record Found`;
            //             //this.results = `Invalid User Name - sample 1:${JSON.stringify(response)}`;
            //             break;
            //         case "88":
            //             this.results = `Please login`;
            //             //this.results = `Invalid password - sample 2: code: ${response.code}`;
            //             break;
            //         case "99":
            //             this.results = `Please try again later`;
            //             //this.results = `Please fill in all field - sample 3: code: ${response.code}`;
            //             break;
            //     }
            // }
        }
    };
</script>

<style scoped>
</style>