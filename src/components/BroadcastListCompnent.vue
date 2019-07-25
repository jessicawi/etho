<template>
    <div class="">
        <div class="container-fluid row" v-if="result">
            {{result}}
        </div>
        <div class=" broadcast-box" v-bind:class="[post.PostID]" v-if="!isHome">
            <div style="padding: 14px;" class="">
                <strong>{{post.CONname}}</strong><br/>
                <span>{{post.PostContent}}</span>
                <div class="bottom clearfix">
                    <small type="text" class="button">{{post.PostCreatedDate_convert}}</small>
                </div>
            </div>
            <!--<el-row>-->
            <!--<el-col :span="7" v-for="(o, index) in 3" :key="o" :offset="index > 0 ? 0 : 0">-->
            <!--<el-card :body-style="{ padding: '0px' }" shadow="hover">-->
            <!--<div style="padding: 14px;">-->
            <!--<strong>{{post.CONname}}</strong><br/>-->
            <!--<span>{{post.PostContent}}</span>-->
            <!--<div class="bottom clearfix">-->
            <!--<small type="text" class="button">{{post.PostCreatedDate}}</small>-->
            <!--</div>-->
            <!--</div>-->
            <!--</el-card>-->
            <!--</el-col>-->
            <!--</el-row>-->
            <!--<div class="image-wrapper" v-if="!isNull(post.postFiles)">-->
            <!--<b-carousel id="carousel1"-->
            <!--style="text-shadow: 1px 1px 2px #333;"-->
            <!--:controls="post.postFiles.length > 0"-->
            <!--indicators-->
            <!--background="#ababab"-->
            <!--:interval="0"-->
            <!--&gt;-->
            <!--<div>-->
            <!--<b-carousel-slide v-for="obj_Images of post.postFiles" :key="obj_Images.id">-->
            <!--<img slot="img" class="card-img-top d-block img-fluid w-100"-->
            <!--:src="getLowSource(obj_Images)"-->
            <!--:alt="post.PostPorDtlTitle"/>-->
            <!--</b-carousel-slide>-->
            <!--</div>-->
            <!--</b-carousel>-->
            <!--</div>-->
            <!--<div class="postFile" v-if="!isNull(post.postFiles)">-->
            <!--<div class="postFile__item" v-for="postFile in post.postFiles" :key="postFile.ID">-->
            <!--&lt;!&ndash;<img :src="postFile.PostItemPath" :class="{'post-disabled':postFile.PostItemStatus !=='Active'}"/>&ndash;&gt;-->
            <!--<a v-if="!postFile.PostItemFileLow && !checkIfImage(postFile.PostItemPath)"-->
            <!--v-bind:href="[postFile.PostItemPath]"-->
            <!--:class="{'post-disabled':postFile.PostItemStatus !=='Active'}">-->
            <!--<i class="fa fa-file" aria-hidden="true"></i>-->
            <!--{{postFile.PostItemPostID}}-->
            <!--</a>-->
            <!--&lt;!&ndash;{{postFile.PostItemCreatedDate}}&ndash;&gt;-->
            <!--</div>-->
            <!--</div>-->
        </div>
        <!--<div class="comment_wrapper" v-if="!hideComment">-->
        <!--<form class="form-style">-->
        <!--<input type="text" class="form-control d-none" id="commentPostID" v-model="commentPostID">-->
        <!--<vs-input label-placeholder="Write a comment" v-model="commentPostContent"-->
        <!--class="addComment"/>-->
        <!--<div class="btn btn-primary" @click="submitComment(post.commentPostID)"><i-->
        <!--class="fa fa-paper-plane"-->
        <!--aria-hidden="true"></i></div>-->
        <!--</form>-->
        <!--<div class="commentWrap" v-if="post.commentItems"-->
        <!--:class="{'is-collapsed' : post.collapsed }">-->
        <!--<div class="comment__item" v-for="commentItem in post.commentItems"-->
        <!--:key="commentItem.PoCmID">-->
        <!--<div class="commentItem__header">-->
        <!--<div class="comment__name">{{commentItem.CONname}}</div>-->
        <!--<div class="comment__date">{{commentItem.PoCmCreatedDate}}</div>-->
        <!--</div>-->
        <!--<div class="commentPostContent_show" v-if="checkidcomment !== commentItem.PoCmID">-->
        <!--{{commentItem.PoCmContent}}-->
        <!--</div>-->
        <!--<textarea v-if="readonly === false && checkidcomment === commentItem.PoCmID" type="text"-->
        <!--class="comment__content" id="commentPostContent"-->
        <!--v-model="commentItem.PoCmContent" v-bind:readonly="readonly"-->
        <!--:class="{'editable' : readonly === false && checkidcomment === commentItem.PoCmID }"></textarea>-->
        <!--&lt;!&ndash;{{checkidcomment}} ==== {{commentItem.PoCmID}} === {{readonly}}<br/>&ndash;&gt;-->
        <!--<span class="edit" @click="editClick(commentItem.PoCmID)" v-if="showEdit">-->
        <!--Edit .-->
        <!--</span>-->
        <!--<span class="save" @click="saveClick(commentItem.PoCmID, commentItem.PoCmContent)"-->
        <!--:class="{'d-none' : readonly === true || checkidcomment !== commentItem.PoCmID}">Save . </span>-->
        <!--&lt;!&ndash;<span class="delete"&ndash;&gt;-->
        <!--&lt;!&ndash;@click="deleteComment(commentItem.PoCmID, commentItem.PoCmContent, post.PostID)">Delete</span>&ndash;&gt;-->
        <!--<span class="delete"-->
        <!--@click="showDeleteModal(commentItem.PoCmID, commentItem.PoCmContent, post.PostID)">-->
        <!--Delete-->
        <!--</span>-->
        <!--<AlertComponent :showModal="deleteModalShow" @cancelClick="closeDeleteModal"-->
        <!--@okClick="deleteComment"/>-->
        <!--</div>-->
        <!--<button v-on:click=" post.collapsed = !post.collapsed "-->
        <!--:class="{'d-none' : !post.collapsed }" v-if="post.commentItems.length !== 2">Display more-->
        <!--comments-->
        <!--</button>-->
        <!--</div>-->
        <!--</div>-->
        <b-modal class="alert-modal" title="ARE YOU SURE?" ref="modal_DeletePost" @ok="deletePost(post)">
            Once you delete a post, you can't undo it.
        </b-modal>
        <b-modal id="modal_EditComponent" ref="modal_EditComponent" size="lg" hide-footer title="Edit Post"
                 @hidden="hideEditModal">
            <component @result="displayResult" :is="obj_SelectedComponent" :post="obj_Post"></component>
        </b-modal>
    </div>
</template>
<script>
    import isImage from "is-image";
    import DataSource from "../data/datasource";
    import AlertComponent from "./alertComponent";
    import portfolio from "../components/Post_Portfolio_Component";
    import updates from "../components/Post_Updates_Component.vue";

    export default {
        name: 'postComponent',
        components: {AlertComponent, updates, portfolio},
        data() {
            return {
                commentPostContent: "",
                readonly: "",
                checkidcomment: null,
                systemmsgError: null,
                commentPostID: '',
                deleteModalShow: false,
                showEdit: true,
                deleteCmId: null,
                deleteCmContent: null,
                deleteCmPostId: null,
                deletePostModalShow: false,

                obj_SelectedComponent: false,
                obj_Post: null,
                result: "",
                post: [],
            };
        },
        mounted() {
            this.initPost();
        },
        props: ["parentPost", "checkIfImage", "commentitemSubmit", "hideComment", "isHome", "hideSubmenu"],
        methods: {
            /*#region Download Item Functions*/
            downloadItem() {
                let arr_Promises = [];
                this.showLoading();

                for (let obj_SelectedItem of this.arrobj_SelectedItem) {
                    let downloadPromise = new Promise((resolve, reject) => {
                        DataSource.shared.downloadFile(obj_SelectedItem.GalID).then((result) => {
                            let file = (result.Table)[0];
                            let a = document.createElement("a");
                            let contentType = this.getContentType(file);
                            let b64Data = file.GalFile;
                            let blob = this.b64toBlob(b64Data, contentType);

                            a.href = URL.createObjectURL(blob);
                            a.download = (file.GalFileName + file.GalFileExt).toString();
                            a.style.display = "none";
                            document.body.appendChild(a);
                            a.click();
                            a.remove();
                            resolve(result);
                        });
                    });

                    arr_Promises.push(downloadPromise);
                }

                Promise.all(arr_Promises).then((result) => {
                    this.hideLoading();
                });
            }
            ,
            getContentType(e) {
                let contentType = "";

                switch (e.GalFileExt.toUpperCase()) {
                    case ".PDF":
                        contentType += "application/octet-stream";
                        break;
                    default:
                        contentType += e.GalFileType;
                        break;
                }

                return contentType;
            }
            ,
            b64toBlob(b64Data, contentType, sliceSize) {
                //Credit to Jeremy Banks @ stackoverflow
                contentType = contentType || '';
                sliceSize = sliceSize || 512;

                let byteCharacters = atob(b64Data);
                let byteArrays = [];

                for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                    let slice = byteCharacters.slice(offset, offset + sliceSize);

                    let byteNumbers = new Array(slice.length);
                    for (let i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }

                    let byteArray = new Uint8Array(byteNumbers);

                    byteArrays.push(byteArray);
                }

                return new Blob(byteArrays, {type: contentType});
            }
            ,
            /*#endregion*/
            initPost() {
                this.post = this.parentPost;
                /*let tempobj = this.parentPost;
                let promise_GetPostFile = DataSource.shared.getPostFile(tempobj.PostID);
                let promise_GetComment = DataSource.shared.getComment(tempobj.PostID);

                Promise.all([promise_GetPostFile, promise_GetComment]).then((result) => {
                    tempobj.postFiles = result[0].Table;
                    tempobj.commentPostID = tempobj.PostID;
                    tempobj.commentItems = result[1].Table;
                    tempobj.collapsed = true;
                })

                    .then(()=>{
                        this.post=tempobj;
                    });*/
            },
            isNull(obj) {
                return (obj === null || obj === undefined || obj === "undefined" || obj.length === 0 || obj === "");
            },
            isImage(obj_File) {
                let ext = String(obj_File.PostItemFileExt).toUpperCase();
                let isImage = false;

                switch (ext) {
                    case ".PNG":
                    case ".JPG":
                    case ".BMP":
                    case ".GIF":
                        isImage = true;
                        break;
                    default:
                        isImage = false;
                        break;
                }

                return isImage;
            },
            getLowSource(file) {
                if (this.isImage(file))
                    return "data:" + file.PostItemFileType + ";base64," + file.PostItemFileLow;
                else
                    return "";
            },
            submitComment(postId) {
                this.$emit('commentitemSubmit', postId, this.commentPostContent);
                this.commentPostContent = "";
            },
            saveClick(PoCmID, PoCmContent) {
                this.readonly = true;
                this.showEdit = true;
                this.checkidcomment = null;
                this.$emit("commentEdit", PoCmID, PoCmContent);
            },
            showDeleteModal(deleteCmId, deleteCmContent, deleteCmPostId) {
                this.deleteModalShow = true;
                this.deleteCmId = deleteCmId;
                this.deleteCmContent = deleteCmContent;
                this.deleteCmPostId = deleteCmPostId;
            },
            closeDeleteModal() {
                this.deleteModalShow = false;
            },
            editClick(PoCmID) {
                this.showEdit = false;
                this.readonly = false;
                this.checkidcomment = PoCmID;
            },
            deleteComment() {
                this.$emit("commentDelete", this.deleteCmId, this.deleteCmContent, this.deleteCmPostId);
                this.closeDeleteModal();
            },
            removePost() {
                this.$refs.modal_DeletePost.show();
            },
            deletePost(post) {
                DataSource.shared.softDeletePost(post.PostID).then((result) => {
                });
            },
            editPost(post) {
                DataSource.shared.getPostAllTaggingStudentsByPostID(post.PostID)
                    .then((result) => {
                        this.post.arrobj_SelectedStudents = result.Table;
                        this.obj_Post = this.post;

                        switch (this.obj_Post.PostType.toUpperCase()) {
                            case "PORTFOLIO":
                                this.obj_SelectedComponent = portfolio;
                                break;
                            case "UPDATE":
                                this.obj_SelectedComponent = updates;
                                break;
                        }

                        this.showEditModal();
                    });

            },
            showEditModal() {
                this.$refs.modal_EditComponent.show();
            },
            hideEditModal() {
                this.obj_SelectedComponent = false;
                this.$refs.modal_EditComponent.hide();
            },
            displayResult(value) {
                if (value == "TRUE")
                    this.result = "Successfully posted";
                else
                    this.result = "Something went wrong. Please inform the adminstrator";

                this.hideEditModal();
            },
            // checkIfImage(file) {
            //     return isImage(file);
            // },
            // async commentEdit(PoCmID, PoCmContent) {
            //     this.error = "";
            //     //this.results = "<< Requesting.. >>";
            //     try {
            //
            //         this.commentPostID = PoCmID;
            //         this.commentPostContent = PoCmContent;
            //         this.actionMode = "Edit";
            //         const commentResponse = await DataSource.shared.saveClick(this.commentPostID, this.commentPostContent, this.actionMode);
            //         if (commentResponse) {
            //             switch (commentResponse.code) {
            //                 case "1":
            //                     // reset all input filed to blank
            //                     this.commentPostID = null;
            //                     this.commentPostContent = "";
            //                     this.readonly = true;
            //                     // this.results = `Post Submitted`;
            //                     // this.success = 'Post Submitted, activity will be active in a while';
            //                     break;
            //                 case "88":
            //                     this.results = `Please Login to submit post`;
            //                     this.systemmsgError = true;
            //                     break;
            //                 case "99":
            //                     this.results = `Please fill in content`;
            //                     this.systemmsgError = true;
            //                     break;
            //                 // default:
            //                 //     alert("Please try again later");
            //                 //     this.results = JSON.stringify(response);
            //             }
            //         }
            //     } catch (e) {
            //         console.log(e);
            //         this.error = e;
            //     }
            // },
            // async commentEdit(PoCmID, PoCmContent) {
            //     this.error = "";
            //     //this.results = "<< Requesting.. >>";
            //     try {
            //
            //         this.commentPostID = PoCmID;
            //         this.commentPostContent = PoCmContent;
            //         this.actionMode = "Edit";
            //         const commentResponse = await DataSource.shared.saveClick(this.commentPostID, this.commentPostContent, this.actionMode);
            //         if (commentResponse) {
            //             switch (commentResponse.code) {
            //                 case "1":
            //                     // reset all input filed to blank
            //                     this.commentPostID = null;
            //                     this.commentPostContent = "";
            //                     this.readonly = true;
            //                     // this.results = `Post Submitted`;
            //                     // this.success = 'Post Submitted, activity will be active in a while';
            //                     break;
            //                 case "88":
            //                     this.results = `Please Login to submit post`;
            //                     this.systemmsgError = true;
            //                     break;
            //                 case "99":
            //                     this.results = `Please fill in content`;
            //                     this.systemmsgError = true;
            //                     break;
            //                 // default:
            //                 //     alert("Please try again later");
            //                 //     this.results = JSON.stringify(response);
            //             }
            //         }
            //     } catch (e) {
            //         console.log(e);
            //         this.error = e;
            //     }
            // },
        },
    };
</script>
<style scoped>
</style>
<style>
    #modal_EditComponent .modal-lg {
        /*max-width: 95% !important;*/
    }
</style>