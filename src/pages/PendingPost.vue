<template>
    <div id="staff-post" class="mt-3 container">
        <div>
            <h4 class="title">Pending Post</h4>
            <div v-if="list && list.length>0" class="datatable_group">
                <el-row style="margin-bottom: 10px" class="data-top">
                    <el-dropdown @command="handleClick" class="float-right">
                        <el-button type="primary">Actions<i class="el-icon-caret-bottom el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="approve">Approve</el-dropdown-item>
                            <el-dropdown-item command="delete">Delete</el-dropdown-item>
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
                    <label for="actionStatus">Status</label>
                    <select class="form-control" id="actionStatus" v-model="actionStatus">
                        <option selected value="Void">Disable</option>
                        <option value="Edit">Edit</option>
                    </select>
                </div>

                <div class="mb-2 d-none">
                    <input type="text" class="form-control" id="postID" v-model="postID"
                           placeholder="Post ID"
                           required>
                    <div class="invalid-feedback" style="width: 100%;">
                        Your Post ID is required.
                    </div>
                </div>

                <div class="mb-3">
                    <label for="UpdateContent">Content</label>
                    <!--<label for="username">Username</label>-->
                    <textarea type="text" class="form-control" id="UpdateContent" v-model="UpdateContent"
                              placeholder="CONTENT"
                              required></textarea>
                    <div class="invalid-feedback" style="width: 100%;">
                        Your content is required.
                    </div>
                </div>


                <div class="mb-2">
                    <label for="profolio">Profolio</label>
                    <select class="form-control" id="profolio" v-model="profolio">
                        <option selected value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                <div class="mb-2">
                    <label for="tagUserID">Tag User ID</label>
                    <input type="text" class="form-control" id="tagUserID" v-model="tagUserID"
                           placeholder="Tag User ID"
                           required>
                    <small class="text-left d-blk">separate ID by comma</small>
                    <div class="invalid-feedback" style="width: 100%;">
                        Your Tag User ID is required.
                    </div>
                </div>

                <div class="mb-2">
                    <label for="tagClassID">Tag Class ID</label>
                    <input type="text" class="form-control" id="tagClassID" v-model="tagClassID"
                           placeholder="Tag Class ID"
                           required>
                    <div class="invalid-feedback" style="width: 100%;">
                        Your Tag Class ID is required.
                    </div>
                </div>

                <div class="mb-2">
                    <label for="tagLevelID">Tag Level ID</label>
                    <input type="text" class="form-control" id="tagLevelID" v-model="tagLevelID"
                           placeholder="Tag Level ID"
                           required>
                    <div class="invalid-feedback" style="width: 100%;">
                        Your Tag Level ID is required.
                    </div>
                </div>
                <div class="view-details text-left">
                    <table class="table table-striped">
                        <tr class="">
                            <th>PostSchoolID</th>
                            <td>{{PostSchoolID}}</td>
                        </tr>
                        <tr class="">
                            <th>PostCreatedDate</th>
                            <td>{{PostCreatedDate}}</td>
                        </tr>
                        <tr class="">
                            <th>PostCreatedBy</th>
                            <td>{{PostCreatedBy}}</td>
                        </tr>
                    </table>
                    <div class="post-image-wrapper">
                        <ul>
                            <li class="postFile__item col-md-4" v-for="postFile in currentFiles" :key="postFile.ID">
                                <span @click="handleImageRemove(postFile.ID)" class="remove"><i class="fa fa-times"
                                                                                                aria-hidden="true"></i></span>
                                <img :src="postFile.PostItemPath"
                                     :class="{'post-disabled':postFile.PostItemStatus !=='Active'}"/>
                            </li>
                        </ul>
                    </div>

                </div>

                <div class="system-msg" v-bind:class="{'bg-danger': systemmsgError===true}"><p>{{results}}</p>
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
        <b-modal id="modalDelete" hide-footer title="ARE YOU SURE?" v-model="showDeleteModal">
            Once you delete a post, you can't undo it.
            <br/>
            <div class="row d-flex submit-wrap">
                <div class="col-md-6">
                    <b-btn class="float-left" @click="cancelClick">Cancel</b-btn>
                </div>
                <div class="col-md-6">
                    <b-btn class="float-right" @click="okClick">OK</b-btn>
                </div>
            </div>
        </b-modal>
        <b-modal id="modalApprove" hide-footer title="CONFIRM APPROVE?" v-model="showConfirmModal">
            Approve post Now?
            <br/>
            <div class="row d-flex submit-wrap">
                <div class="col-md-6">
                    <b-btn class="float-left" @click="approveCancelClick">Cancel</b-btn>
                </div>
                <div class="col-md-6">
                    <b-btn class="float-right" @click="approveOkClick">OK</b-btn>
                </div>
            </div>
        </b-modal>
    </div>

</template>

<script>
    import DataSource from "../data/datasource";

    export default {
        name: 'PendingPost',
        data() {
            return {
                error: null,
                selectedRows: [],
                isModalOpen: false,
                list: [],
                currentFiles: [],
                fileRes: "",
                postID: "",
                titles: [{
                    prop: "ID",
                    label: "ID"
                }, {
                    prop: "PostID",
                    label: "Post ID"
                }, {
                    prop: "PostCreatedDate",
                    label: "Created At"
                }, {
                    prop: "PostStatus",
                    label: "Post Status"
                }],
                actionCol: {
                    label: '',
                    class: 'actions',
                    props: {
                        align: 'center',
                    },
                    buttons: [{
                        props: {
                            type: 'text',
                            // icon: 'el-icon-edit'
                        },
                        handler: async row => {
                            try {
                                // console.log("clicked row data: ", row);
                                // this will call when modal open right?
                                // await this.getPostFile();


                                // call approve post api
                                const response = await DataSource.shared.approvePost(row.PostApproverID, "Approved");
                                // console.log('approve response: ', response);

                                // update pending post view on success
                                if (response && response.code==="1"){
                                    this.getPendingPost();


                                }
                            } catch (error) {
                                // log error
                                console.log(error);
                            }

                        },
                        label: 'Approve'
                    }, {
                        props: {
                            type: 'text',
                            icon: 'el-icon-edit'
                        },
                        handler: async row => {
                            // console.log(row, ' ss');
                            try {

                                const fileRes = await DataSource.shared.getPostFile(row.PostID);
                                // console.log(fileRes);
                                if (fileRes.Table) {
                                    this.currentFiles = fileRes.Table;
                                } else {
                                    this.currentFiles = null;
                                }

                                this.isModalOpen = true;
                                this.postID = row.PostID;
                                this.UpdateContent = row.PostContent;
                                this.profolio = row.PostProfolio;
                                this.tagUserID = row.tagUserID;
                                this.PostSchoolID = row.PostSchoolID;
                                this.PostCreatedDate = row.PostCreatedDate;
                                this.PostCreatedBy = row.PostCreatedBy;
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
                        prop: 'PostID',
                        order: 'descending'
                    }
                },
                selectedRow: null,
                results: null,
                actionStatus: "",
                UpdateContent: "",
                profolio: "",
                PostSchoolID: "",
                PostCreatedDate: "",
                PostCreatedBy: "",
                systemmsgError: false,
                tagLevelID: "",
                tagUserID: "",
                tagClassID: "",
                PostItemPath: "",
                showDeleteModal: false,
                showConfirmModal: false,
            };
        },
        methods: {
            handleImageRemove(fileId) {
                // console.log(fileId);
                this.currentFiles = this.currentFiles.filter(d => d.ID !== fileId);
            },
            handleSelectionChange(rows) {
                // console.log(rows);
                this.selectedRows = rows;
            },
            showModal() {
                this.isModalOpen = true;
            },
            async getPendingPost() {
                try {
                    const response = await DataSource.shared.pendingPost();
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
                this.error = "";
                //this.results = "<< Requesting.. >>";
                try {
                    const saveResponse = await DataSource.shared.updatePost(this.currentFiles, this.actionStatus, this.postID, this.postContent, this.profolio, this.tagUserID, this.tagClassID, this.tagLevelID,);
                    // console.log(saveResponse);
                    if (saveResponse) {
                        switch (saveResponse.code) {
                            case "1":
                                this.results = `Post updated`;
                                this.getPendingPost();
                                break;
                            case "88":
                                this.results = `Request Rejected / Post has been approved`;
                                this.systemmsgError = true;
                                break;
                            case "99":
                                this.results = `Please try again later`;
                                this.systemmsgError = true;
                                break;
                            // default:
                            //     alert("Please try again later");
                            //     this.results = JSON.stringify(response);
                        }
                    }
                } catch (e) {
                    this.error = e;
                }

            },
            async handleClick(command) {

                // if clicked dropdown button is approve
                if (command === "approve") {
                    try {
                        if (this.selectedRows.length !== 0) {
                            this.showConfirmModal = true;
                        }
                    } catch (error) {
                        // log error
                        console.log(error);
                    }
                }

                if (command === "delete") {
                    try {
                        if (this.selectedRows.length !== 0) {
                            this.showDeleteModal = true;
                        }
                    } catch (error) {
                        // log error
                        console.log(error);
                    }
                }
            },
            async cancelClick() {
                this.showDeleteModal = false;
            },
            async okClick() {
                try {
                    let deleteResponse;
                    for (const row of this.selectedRows) {
                        deleteResponse = await DataSource.shared.softDeletePost(row.PostID, row.profolio);
                    }
                    if (deleteResponse && deleteResponse.code === "1") {
                        this.showDeleteModal = false;
                        this.getPendingPost();
                    }
                } catch (e) {
                    console.log("error ", e);
                }
            },
            async approveCancelClick() {
                this.showConfirmModal = false;
            },
            async approveOkClick() {
                try {
                    let response;
                    // loop selected rows and call approve api one by one, lol
                    for (const row of this.selectedRows) {
                        response = await DataSource.shared.approvePost(row.PostApproverID, "Approved");
                    }
                    // update pending post view on success
                    if (response && response.code === "1") {
                        this.showConfirmModal = false;
                        this.getPendingPost();
                    }
                } catch (e) {
                    console.log("error ", e);
                }
            },
        },
        async mounted() {
            this.getPendingPost();
        },
    };
</script>

<style scoped>
</style>
<style>


</style>