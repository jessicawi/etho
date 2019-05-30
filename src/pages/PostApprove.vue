<template>
    <div id="postapprove">
        <div class="container">
            <div class="row header">
                <h3 class="col-lg-8 text-left">POST REQUEST</h3>
                <div class="col-lg-4">
                    <router-link :to="{name: 'Pending Approver'}">
                        <el-button type="primary" round class="float-right"><i class="material-icons">
                            chevron_left
                        </i> BACK</el-button>
                    </router-link>
                </div>
            </div>
            <div class="row post-approve_content">
                <div v-if="approverPostAction" class="action-btn pt-2 pb-2">
                    <el-button type="primary" round v-on:click="approvePost('APPROVED')"
                               class="btn btn-primary waves-effect waves-light m-r-10 btnFamilyIDSearch"><i
                            class="material-icons">
                        check
                    </i> Approve
                    </el-button>
                    <el-button type="info" round v-on:click="approvePost('REJECT')"
                               class="btn btn-info waves-effect waves-light m-r-10 btnFamilyIDSearch"><i
                            class="material-icons">
                        close
                    </i> Reject
                    </el-button>
                </div>
                <label style="display:none !important;">{{ postID }}</label>
                <label style="display:none !important;">{{ postType }}</label>

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" v-for="object of postList">
                    <PostComponent
                            :parent-post="object"
                            @commentitemSubmit="commentitemSubmit"
                            @commentEdit="commentEdit"
                            @commentDelete="commentDelete"
                            :commentPostContent="commentPostContent"
                            :PostID="object"
                            @loadPosts="loadPosts"
                            :approverPost="passTrueToPostComponent"
                    />
                </div>

                <div class="col-lg-12 pt-4">
                    <h6 class="text-left"><i class="material-icons">
                        event_note
                    </i> Remark:</h6>

                    <div v-for="value in postCommentHistoryList" class="preview-comment__list">

                        <label class="preview-comment__commenter">
                            Commenter: {{ value.CONname }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span>Date: {{ value.AppComCreatedDate_convert }}</span>
                        </label>
                        <label>
                            {{ value.AppComValue }}
                        </label>
                    </div>

                    <!--<input type="text" class="form-control" v-model="inputPostComment">-->
                    <el-input
                            type="textarea"
                            autosize
                            v-model="inputPostComment"
                            class="pt-3 custom-textarea">
                    </el-input>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";
    import PostComponent from "../components/postCompnent";

    export default {
        name: "PostApprove",
        components: {
            PostComponent,
        },
        data() {
            return {
                postID: '',
                postType: '',
                postList: [],
                approverPostAction: '',
                postCommentHistoryList: [],
                inputPostComment: '',
                passTrueToPostComponent: 'YES',
            };
        },
        async created() {
            if (this.$route.params.postID === '' || this.$route.params.postID === null || this.$route.params.postID === undefined) { //this is from email link
                if (this.$route.query.id != null || this.$route.query.id !== undefined) {
                    await this.deString(this.$route.query.id);
                } else {
                    this.$router.push('/portfolio');
                }
            } else {
                this.postID = this.$route.params.postID;

                await this.getPost(this.$route.params.postID);
                await this.checkApprover(this.$route.params.postID);
                await this.getPostComment(this.$route.params.postID);
            }
        },
        methods: {
            async deString(inputString) {
                try {
                    const response = await DataSource.shared.deString(inputString);
                    if (response) {
                        switch (response.code) {
                            case "88":
                                this.$router.push('/');
                                break;
                            case "99":
                                this.$router.push('/pendingapprover');
                                break;
                        }
                        this.postID = response.string;

                        await this.getPost(this.postID);
                        await this.checkApprover(this.postID);
                        await this.getPostComment(this.postID);
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async getPost(postID) {
                try {
                    let jsonStringPostID = JSON.stringify([postID]);

                    const response = await DataSource.shared.getPostByPostIDByStatus(jsonStringPostID, 'PENDING');
                    if (response) {
                        if (response.code === '88') {
                            window.location.replace('/');
                        } else if (response.code === '99') {
                            this.$notify.error({
                                title: 'Error',
                                message: 'Error'
                            });
                        } else if (response.code === '2') {
                            const response = await DataSource.shared.getPostByPostID(jsonStringPostID);
                            if (response) {
                                if (response.code === '88') {
                                    window.location.replace('/');
                                } else if (response.code === '99') {
                                    this.$notify.error({
                                        title: 'Error',
                                        message: 'Error'
                                    });
                                } else if (response.code === '2') {
                                    window.location.replace('/pendingapprover');
                                } else {
                                    this.postList = response.Table;
                                    this.postType = 'Posting - ' + response.Table[0].PostType;
                                }
                            }
                        } else {
                            this.postList = response.Table;
                            this.postType = 'Posting - ' + response.Table[0].PostType;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async checkApprover(postID) {
                try {
                    const response = await DataSource.shared.checkApproveStatusByUser(postID, "POSTING");
                    if (response) {
                        if (response.code === '1') {
                            this.approverPostAction = true;
                        } else {
                            this.approverPostAction = false;
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async getPostComment(postID) {
                try {
                    const response = await DataSource.shared.getApproverComment(postID);
                    if (response) {
                        this.postCommentHistoryList = response.Table;
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async approvePost(actionStatus) {
                try {
                    this.$vs.loading();

                    const response = await DataSource.shared.approvePost(this.postID, this.postType, actionStatus, this.inputPostComment);
                    if (response) {
                        this.$vs.loading.close();
                        if (response) {
                            if (response.code === '88') {
                                window.location.replace('/');
                            } else if (response.code === '99') {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Error'
                                });
                            } else {
                                this.$notify({
                                    title: 'Success',
                                    message: 'Done!',
                                    type: 'success'
                                });
                                this.$router.go(-1);
                                // window.location.replace('/');
                            }
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