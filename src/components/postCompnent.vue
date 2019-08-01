<template>
    <div>
        <div class="container-fluid row" v-if="result">
            {{result}}
        </div>
        <div class="feed-box" v-bind:class="[post.PostID]" v-if="!isHome">
            <div class="author">
                <div class="profile">
                    <!--<img slot="img" class="card-img-top d-block img-fluid w-100"-->
                    <!--:src="getProfileSource(post.ProfileImage)"-->
                    <!--:alt="post.PostPorDtlTitle"/>-->
                    <img src="../assets/boy.png" v-if="post.ProfileImage === ''">
                    <img :src="`data:image/jpg;base64, ${post.ProfileImage}`"
                         v-if="post.ProfileImage"/>
                </div>
                <div class="feed-heading">
                    <span>{{post.CONname}}</span>
                    <small class="date"><i class="fa fa-clock-o" aria-hidden="true"></i>
                        {{post.PostCreatedDate_convert}}
                    </small>
                </div>
                <el-popover
                        placement="bottom"
                        width="100"
                        trigger="click"
                        class="feed-box__dropdown"
                        v-if="approverPostNotShow">
                    <button @click="editPost(post)" class="btn btn-link">Edit Post</button>
                    <button @click="removePost(post)" class="btn btn-link">Delete Post</button>
                    <el-button slot="reference"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></el-button>
                </el-popover>
                <!--<b-dropdown right v-if="!hideSubmenu">-->
                <!--<template slot="button-content">-->
                <!--<i class="fa fa-ellipsis-h" aria-hidden="true"></i>-->
                <!--</template>-->
                <!--<b-dropdown-item @click="editPost(post)">Edit Post</b-dropdown-item>-->
                <!--<b-dropdown-item @click="removePost(post)">Delete Post</b-dropdown-item>-->
                <!--</b-dropdown>-->
            </div>
            <div class="content">
                <p>
                    <!--<strong class="feed-subtitle"> ADD A NOTE</strong>-->
                    <span style="white-space: pre-line;">{{post.PostContent}}</span>
                </p>
            </div>
            <div class="image-wrapper" v-if="!isNull(post.postFiles)">
                <ul v-if="!isMobile()">
                    <li style="height:380px;" class="postFile__item" v-for="(obj_Images, index) in post.postFiles"
                        :key="obj_Images.id"
                        :class="{'isFile':isImageByExt(obj_Images)===false}" v-if="index < 5">
                        <img slot="img" class="nonM card-img-top d-block img-fluid w-100"
                             :src="getMediumSource(obj_Images)"
                             v-if="isImageByExt(obj_Images)"
                             :alt="post.PostPorDtlTitle"/>
                        <div v-else>
                            <a :href="getFile(obj_Images)"
                               :download="`${obj_Images.PostItemID}${obj_Images.PostItemFileExt}`" class="filepath">
                                {{obj_Images.PostItemID}}{{obj_Images.PostItemFileExt}}
                            </a>
                            <!--<span class="filepath" @click="getFile(obj_Images)">{{obj_Images.PostItemID}}{{obj_Images.PostItemFileExt}}</span>-->
                        </div>
                        <button v-if="index === 4 || index === Object.keys(post.postFiles).length-1 && index !== 0 " class="postFile-remainingNumber" @click="showImageModal">
                            <span v-if="index !== Object.keys(post.postFiles).length-1 ">+ {{remainingImage}}</span>
                            <span v-if="index === Object.keys(post.postFiles).length-1 ">+</span>
                        </button>
                        <!--<img :src="getLowSource(obj_Images)"-->
                        <!--:class="{'post-disabled':postFile.PostItemStatus !=='Active'}"-->
                        <!--/>-->
                        <!--<img :src="postFile.PostItemPath"-->
                        <!--:class="{'post-disabled':postFile.PostItemStatus !=='Active'}"-->
                        <!--v-else-if="!checkIfImage(postFile.PostItemPath)"/>-->
                    </li>
                </ul>
                <b-carousel id="carousel1"
                            style="text-shadow: 1px 1px 2px #333;"
                            :controls="post.postFiles.length > 1"
                            indicators
                            background="#fff"
                            :interval="0"
                            v-if="isMobile()">
                    <div>
                        <b-carousel-slide v-for="obj_Images of post.postFiles" :key="obj_Images.id">
                            <img slot="img" class="card-img-top d-block img-fluid w-100"
                                 :src="getMediumSource(obj_Images)"
                                 v-if="isImageByExt(obj_Images)"
                                 :alt="post.PostPorDtlTitle"/>
                        </b-carousel-slide>
                    </div>
                </b-carousel>
            </div>
            <div class="comment_wrapper transition-box" v-if="!hideComment">
                <span class="float-right ml-2 post-icon-btn" ><i
                        class="material-icons commentCount">
                    chat_bubble_outline
                </i>
                    {{commentCount}}
                </span>
                <form class="form-style">
                    <input type="text" class="form-control d-none" id="commentPostID" v-model="commentPostID">
                    <vs-input label-placeholder="Write a comment" v-model="commentPostContent"
                              class="addComment" v-on:keyup.enter="submitComment(post.PostID)"/>
                    <div class="btn btn-primary" @click="submitComment(post.PostID)"><i
                            class="fa fa-paper-plane"
                            aria-hidden="true"></i></div>
                </form>
                <div class="commentWrap" v-if="post.commentItems"
                     :class="{'is-collapsed' : post.collapsed }">
                    <div class="comment__item" v-for="commentItem of post.commentItems"
                         :key="commentItem.PoCmID">
                        <div class="commentItem__header">
                            <div class="comment__name">{{commentItem.CONname}}</div>
                            <div class="comment__date">{{commentItem.PoCmCreatedDate_convert}}</div>
                        </div>
                        <div class="commentPostContent_show" v-if="checkidcomment !== commentItem.PoCmID">
                            {{commentItem.PoCmContent}}
                        </div>
                        <textarea v-if="readonly === false && checkidcomment === commentItem.PoCmID" type="text"
                                  class="comment__content" id="commentPostContent"
                                  v-model="commentItem.PoCmContent" v-bind:readonly="readonly"
                                  :class="{'editable' : readonly === false && checkidcomment === commentItem.PoCmID }"></textarea>
                        <el-button class="save" type="text" slot="reference"
                                   @click="saveClick(commentItem.PoCmID, commentItem.PoCmContent)"
                                   :class="{'d-none' : readonly === true || checkidcomment !== commentItem.PoCmID}">
                            Save
                        </el-button>
                        <el-button class="edit" type="text" slot="reference" @click="editClick(commentItem.PoCmID)"
                                   v-if="showEdit">
                            Edit
                        </el-button>
                        .
                        <el-button class="delete" type="text" slot="reference"
                                   @click="emitShowDeleteModal(commentItem.PoCmID, commentItem.PoCmContent, post.PostID, post)">
                            Delete
                        </el-button>
                        .
                        <AlertComponent :showModal="deleteModalShow" @cancelClick="closeDeleteModal"
                                        @okClick="deleteComment"/>
                    </div>
                    <button v-on:click=" post.collapsed = !post.collapsed "
                            :class="{'d-none' : !post.collapsed }"
                            v-if="post.commentItems&&post.commentItems.length !== 2">
                        More Comment
                    </button>
                </div>
            </div>
            <div class="postFile" v-if="!isNull(post.postFiles)">
                <div class="postFile__item" v-for="postFile in post.postFiles" :key="postFile.ID">
                    <!--<img :src="postFile.PostItemPath" :class="{'post-disabled':postFile.PostItemStatus !=='Active'}"/>-->
                    <a v-if="!postFile.PostItemFileLow && !checkIfImage(postFile.PostItemPath)"
                       v-bind:href="[postFile.PostItemPath]"
                       :class="{'post-disabled':postFile.PostItemStatus !=='Active'}">
                        <i class="fa fa-file" aria-hidden="true"></i>
                        {{postFile.PostItemPostID}}
                    </a>
                    <!--{{postFile.PostItemCreatedDate}}-->
                </div>
            </div>
            <hr/>
            <!--<div class="feed-iconBox" v-if="approverPostNotShow">-->
                <!--<el-button @click="showCommentTransition(post.PostID)" class="float-left ml-2 post-icon-btn"><i-->
                        <!--class="material-icons">-->
                    <!--chat_bubble_outline-->
                <!--</i>-->
                    <!--{{commentCount}}-->
                <!--</el-button>-->
                <!-- el-popover
                        placement="top-start"
                        width="250"
                        trigger="click"
                        class="float-left ml-2 post-icon-btn"
                >
                    <table class="table reaction-table">
                        <tr>
                            <td :class="{checked: getPostReactionCount('LIKE') > 0}">
                                <label>
                                    <input type="checkbox"
                                           :checked="getUserSelectedReaction('LIKE')"
                                           @change="togglePostReaction"
                                           value="LIKE">
                                    <el-tooltip placement="top">
                                        <div slot="content">{{getPostReactionCount('LIKE')}}</div>
                                        <img src="../assets/like.gif" width="30px"/>
                                    </el-tooltip>
                                </label>
                            </td>
                            <td :class="{checked: getPostReactionCount('LOVE') > 0}">
                                <label>
                                    <input type="checkbox"
                                           :checked="getUserSelectedReaction('LOVE')"
                                           @change="togglePostReaction"
                                           value="LOVE">
                                    <el-tooltip placement="top">
                                        <div slot="content">{{getPostReactionCount('LOVE')}}</div>
                                        <img src="../assets/love.gif" width="30px"/>
                                    </el-tooltip>
                                </label>
                            </td>
                            <td :class="{checked: getPostReactionCount('WOW') > 0}">
                                <label>
                                    <input type="checkbox"
                                           :checked="getUserSelectedReaction('WOW')"
                                           @change="togglePostReaction"
                                           value="WOW">
                                    <el-tooltip placement="top">
                                        <div slot="content">{{getPostReactionCount('WOW')}}</div>
                                        <img src="../assets/oo.gif" width="30px"/>
                                    </el-tooltip>
                                </label>
                            </td>
                            <td :class="{checked: getPostReactionCount('HAHA') > 0}">
                                <label>
                                    <input type="checkbox"
                                           :checked="getUserSelectedReaction('HAHA')"
                                           @change="togglePostReaction"
                                           value="HAHA">
                                    <el-tooltip placement="top">
                                        <div slot="content">{{getPostReactionCount('HAHA')}}</div>
                                        <img src="../assets/funny.gif" width="30px"/>
                                    </el-tooltip>
                                </label>
                            </td>
                            <td :class="{checked: getPostReactionCount('SAD') > 0}">
                                <label>
                                    <input type="checkbox"
                                           :checked="getUserSelectedReaction('SAD')"
                                           @change="togglePostReaction"
                                           value="SAD">
                                    <el-tooltip placement="top">
                                        <div slot="content">{{getPostReactionCount('SAD')}}</div>
                                        <img src="../assets/sad.gif" width="30px"/>
                                    </el-tooltip>

                                </label>
                            </td>
                        </tr>
                    </table>
                    <el-button slot="reference"
                               :class="{checked: getPostReactionCount('LIKE') > 0 || getPostReactionCount('LOVE') > 0 || getPostReactionCount('WOW') > 0 || getPostReactionCount('HAHA') > 0 || getPostReactionCount('SAD') > 0}">
                        <i class="material-icons">favorite_border</i>
                        <i class="material-icons show-if-check">favorite</i>
                    </el-button>
                </el-popover -->
            <!--</div>-->
            <!--<div slot="footer">-->
            <!--<vs-row vs-justify="flex-end">-->
            <!--<vs-button color="primary" type="gradient" >View</vs-button>-->
            <!--<vs-button color="danger" type="gradient">Delete</vs-button>-->
            <!--</vs-row>-->
            <!--</div>-->
        </div>
        <ul class="feed-box" v-bind:class="[post.PostID]" v-if="isHome">
            <li>
                <div class="image-wrapper">
                    <ul>
                        <li class="" v-for="postFile in post.postFiles" :key="postFile.ID">
                            <img :src="`data:image/jpg;base64, ${postFile.PostItemFile}`"
                                 :class="{'post-disabled':postFile.PostItemStatus !=='Active'}"
                                 v-if="postFile.PostItemFile"/>
                            <img :src="postFile.PostItemPath"
                                 :class="{'post-disabled':postFile.PostItemStatus !=='Active'}"
                                 v-else-if="checkIfImage(postFile.PostItemPath)"/>
                        </li>
                    </ul>
                </div>
                <span>
                    <strong>{{post.CONname}}</strong>
                    <small class="date">
                        <i class="fa fa-clock-o" aria-hidden="true"></i>
                        {{post.PostCreatedDate}}
                    </small>
                    {{post.PostContent}}
                </span>
            </li>
        </ul>
        <!--el-collapse-transition>
        <div>
        <div class="comment_wrapper transition-box" v-if="!hideComment">
        <form class="form-style">
        <input type="text" class="form-control d-none" id="commentPostID" v-model="commentPostID">
        <vs-input label-placeholder="Write a comment" v-model="commentPostContent"
        class="addComment"/>
        <div class="btn btn-primary" @click="submitComment(post.PostID)"><i
        class="fa fa-paper-plane"
        aria-hidden="true"></i></div>
        </form>
        <div class="commentWrap" v-if="post.commentItems"
        :class="{'is-collapsed' : post.collapsed }">
        <div class="comment__item" v-for="commentItem of post.commentItems"
        :key="commentItem.PoCmID">
        <div class="commentItem__header">
        <div class="comment__name">{{commentItem.CONname}}</div>
        <div class="comment__date">{{commentItem.PoCmCreatedDate}}</div>
        </div>
        <div class="commentPostContent_show" v-if="checkidcomment !== commentItem.PoCmID">
        {{commentItem.PoCmContent}}
        </div>
        <textarea v-if="readonly === false && checkidcomment === commentItem.PoCmID" type="text"
        class="comment__content" id="commentPostContent"
        v-model="commentItem.PoCmContent" v-bind:readonly="readonly"
        :class="{'editable' : readonly === false && checkidcomment === commentItem.PoCmID }"></textarea>
        {{checkidcomment}} ==== {{commentItem.PoCmID}} === {{readonly}}<br/>
        <span class="edit" @click="editClick(commentItem.PoCmID)" v-if="showEdit">
        Edit .
        </span>
        <el-button class="save" type="text" slot="reference"
        @click="saveClick(commentItem.PoCmID, commentItem.PoCmContent)"
        :class="{'d-none' : readonly === true || checkidcomment !== commentItem.PoCmID}">
        Save
        </el-button>
        <el-button class="edit" type="text" slot="reference" @click="editClick(commentItem.PoCmID)"
        v-if="showEdit">
        Edit
        </el-button>
        .
        <span class="save" @click="saveClick(commentItem.PoCmID, commentItem.PoCmContent)"
        :class="{'d-none' : readonly === true || checkidcomment !== commentItem.PoCmID}">Save . </span>
        <span class="delete"
        @click="deleteComment(commentItem.PoCmID, commentItem.PoCmContent, post.PostID)">Delete</span>
        <span class="delete"
        @click="showDeleteModal(commentItem.PoCmID, commentItem.PoCmContent, post.PostID)">
        Delete .

        </span>
        <el-button class="delete" type="text" slot="reference"
        @click="showDeleteModal(commentItem.PoCmID, commentItem.PoCmContent, post.PostID)">
        Delete
        </el-button>
        .
        < span class="like">
        <el-popover
        placement="right"
        width="250"
        trigger="click"
        popper-class="like-popover">
        <table class="table reaction-table">
        <tr>
        <td :class="{checked: getCommentReactionCount('LIKE', commentItem) > 0}"><label><input
        type="checkbox"
        :checked="getUserSelectedCommentReaction('LIKE', commentItem)"
        @change="toggleCommentReaction($event, commentItem)"
        value="LIKE">
        <el-tooltip placement="top">
        <div slot="content">{{getCommentReactionCount('LIKE', commentItem)}}</div>
        <img src="../assets/like.gif" width="30px"/>
        </el-tooltip>
        </label></td>
        <td :class="{checked: getCommentReactionCount('LOVE', commentItem) > 0}"><label><input
        type="checkbox"
        :checked="getUserSelectedCommentReaction('LOVE', commentItem)"
        @change="toggleCommentReaction($event, commentItem)"
        value="LOVE">
        <el-tooltip placement="top">
        <div slot="content">{{getCommentReactionCount('LOVE', commentItem)}}</div>
        <img src="../assets/love.gif" width="30px"/>
        </el-tooltip>
        </label></td>
        <td :class="{checked: getCommentReactionCount('WOW', commentItem) > 0}"><label><input
        type="checkbox"
        :checked="getUserSelectedCommentReaction('WOW', commentItem)"
        @change="toggleCommentReaction($event, commentItem)"
        value="WOW">
        <el-tooltip placement="top">
        <div slot="content">{{getCommentReactionCount('WOW', commentItem)}}</div>
        <img src="../assets/oo.gif" width="30px"/>
        </el-tooltip>
        </label></td>
        <td :class="{checked: getCommentReactionCount('HAHA', commentItem) > 0}"><label><input
        type="checkbox"
        :checked="getUserSelectedCommentReaction('HAHA', commentItem)"
        @change="toggleCommentReaction($event, commentItem)"
        value="HAHA">
        <el-tooltip placement="top">
        <div slot="content">{{getCommentReactionCount('HAHA', commentItem)}}</div>
        <img src="../assets/funny.gif" width="30px"/>
        </el-tooltip>
        </label></td>
        <td :class="{checked: getCommentReactionCount('SAD', commentItem) > 0}"><label><input
        type="checkbox"
        :checked="getUserSelectedCommentReaction('SAD', commentItem)"
        @change="toggleCommentReaction($event, commentItem)"
        value="SAD">
        <el-tooltip placement="top">
        <div slot="content">{{getCommentReactionCount('SAD', commentItem)}}</div>
        <img src="../assets/sad.gif" width="30px"/>
        </el-tooltip>
        </label></td>
        </tr>
        </table>
        <el-button type="text" slot="reference">
        Like
        </el-button>
        </el-popover>
        </span >
        <AlertComponent :showModal="deleteModalShow" @cancelClick="closeDeleteModal"
        @okClick="deleteComment"/>
        </div>
        <button v-on:click=" post.collapsed = !post.collapsed "
        :class="{'d-none' : !post.collapsed }"
        v-if="post.commentItems&&post.commentItems.length !== 2">
        More Comment
        </button>
        </div>
        </div>
        </div>
        </el-collapse-transition-->

        <b-modal id="modal_EditComponent" ref="modal_EditComponent" size="lg" hide-footer title="Edit Post"
                 @hidden="hideEditModal">
            <component @result="displayResult" :is="obj_SelectedComponent" :post="post"></component>
        </b-modal>
        <b-modal id="imageModal" ref="imageModal" hide-footer hide-header>
            <b-carousel id="modal_carousel"
                        style="text-shadow: 1px 1px 2px #333;"
                        :controls="post.postFiles&&post.postFiles.length > 1"
                        indicators
                        background="#fff"
                        :interval="0">
                <div>
                    <b-carousel-slide v-for="obj_Images of post.postFiles" :key="obj_Images.id">
                        <img slot="img" class="card-img-top d-block img-fluid w-100"
                             :src="getMediumSource(obj_Images)"
                             v-if="isImageByExt(obj_Images)"
                             :alt="post.PostPorDtlTitle"/>
                    </b-carousel-slide>
                </div>
            </b-carousel>
        </b-modal>
    </div>
</template>
<script>
    import isImage from "is-image";

    import * as jQuery from "./signalR/jquery-1.6.4";
    import * as signalR from "./signalR/jquery.signalR-2.4.1";

    import DataSource from "../data/datasource";
    import AlertComponent from "./alertComponent";
    import portfolio from "../components/Post_Portfolio_Component";
    import updates from "../components/Post_Updates_Component";
    import broadcast from "../components/Post_Broadcast_Component.vue";
    import Cookies from "js-cookie";


    export default {
        name: 'postComponent',
        components: {AlertComponent, updates, portfolio},
        data() {
            return {
                reactionCount2: "",
                commentCount: "",
                show3: false,
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
                result: "",
                post: [{
                    CONname: "",
                    PostContent: "",
                    PostCreatedBy: "",
                    PostCreatedDate: "",
                    PostID: "",
                    PostType: "",
                    PostUpdDtlDescription: "",
                    ProfileImage: "",
                    RowNumber: "",
                    collapsed: true,
                    commentItems: [],
                    commentPostID: "",
                    postFiles: "",
                    postReaction: [],
                    countImageFile: ""
                }],
                str_TimerID: "",
                likeCount: 0,
                isFile: false,
                approverPostNotShow: true,
                remainingImage: "",
            };
        },
        mounted() {
            if (!this.isNull(this.approverPost) && this.approverPost === 'YES') {
                this.approverPostNotShow = false;
            }
            if (!this.isNull(this.parentPost)) {
                this.initPost();
            }
        },
        props: ["parentPost", "commentitemSubmit", "hideComment", "isHome", "hideSubmenu", "loadPost", "approverPost"],
        methods: {
            sleep(milliseconds) {
                return new Promise(resolve => setTimeout(resolve, milliseconds));
            },
            getBCMsg(postId) {
                this.getComment();
                this.showCommentTransition(postId);
                console.log("i got it!! id:" + postId);
            },
            showImageModal() {
                this.$refs['imageModal'].show();
            },
            hideImageModal() {
                this.$refs['imageModal'].hide();
            },
            checkIfImage(file) {
                return isImage(file);
            },
            isMobile() {
                if (screen.width <= 760) {
                    return true;
                } else {
                    return false;
                }
            },
            showCommentTransition(CommentBtnPostID) {
                this.show3 = CommentBtnPostID;
            },
            getUserSelectedCommentReaction(str_Reaction, commentItem) {
                let isExist = !this.isNull(commentItem.commentReactions) ? commentItem.commentReactions.filter(x => x.PoReaCreatedBy === Cookies.get("userIDSession") && x.PoReaType.toUpperCase() === str_Reaction) : false;
                return isExist;
            },

            getCommentReactionCount(str_Reaction, commentItem) {
                // setInterval(() => {
                //     DataSource.shared.getPostReaction(commentItem.PoCmID).then((result) => {
                //         this.$set(this.post.commentItems, "commentReaction", result.Table)
                //     });
                // }, 2000);


                let int_ReactionCount = !this.isNull(commentItem.commentReactions) ? commentItem.commentReactions.filter(x => x.PoReaType.toUpperCase() === str_Reaction).length : 0;
                return int_ReactionCount;
                /*
                let int_ReactionCount = !this.isNull(commentItem.commentReaction) ? commentItem.commentReaction.filter(x => x.PoReaType.toUpperCase() === str_Reaction).length : 0;

                return int_ReactionCount*/
            },

            toggleCommentReaction(e, commentItem) {
                let reaction = $(e.target).val();
                let isChecked = $(e.target).prop("checked");

                $(e.target).closest("td").siblings("td").find("input[type='checkbox']").prop("checked", false);

                DataSource.shared.updatePostReaction(commentItem.PoCmID, "DELETE")
                    .then(() => {
                        $(e.target).closest("tr").find("td").removeClass("checked");

                        if (isChecked) {
                            $(e.target).closest("td").addClass("checked");
                            return DataSource.shared.savePostReaction(commentItem.PoCmID, reaction, "POST");
                        }
                    });

                /*$(e.target).closest("td").siblings("td").find("input[type='checkbox']").prop("checked", false);
                DataSource.shared.updatePostReaction(commentItem.PoCmID, "DELETE")
                    .then(() => {
                        $(e.target).closest("tr").find("td").removeClass("checked");

                        if (isChecked) {
                            $(e.target).closest("td").addClass("checked");
                            DataSource.shared.savePostReaction(commentItem.PoCmID, reaction, "COMMENT");
                        }
                    });*/
            }
            ,

            getUserSelectedReaction(str_Reaction) {
                let isExist = !this.isNull(this.post.postReaction) ? this.post.postReaction.filter(x => Cookies.get("userIDSession") && x.PoReaType.toUpperCase() === str_Reaction).length : 0;
                return isExist;
            },

            getPostReactionCount(str_Reaction) {
                let isExist = !this.isNull(this.post.postReaction) ? this.post.postReaction.filter(x => x.PoReaCreatedBy === Cookies.get("userIDSession") && x.PoReaType.toUpperCase() === str_Reaction).length : 0;
                return isExist;
                let reactionCount = this.post.postReaction.length;
            }
            ,

            togglePostReaction(e) {
                let reaction = $(e.target).val();
                let isChecked = $(e.target).prop("checked");
                $(e.target).closest("td").siblings("td").find("input[type='checkbox']").prop("checked", false);

                DataSource.shared.updatePostReaction(this.post.PostID, "DELETE")
                    .then(() => {
                        $(e.target).closest("tr").find("td").removeClass("checked");

                        if (isChecked) {
                            $(e.target).closest("td").addClass("checked");
                            return DataSource.shared.savePostReaction(this.post.PostID, reaction, "POST");
                        }
                    })
                    .then(() => {
                        DataSource.shared.getPostReaction(this.post.PostID).then((result) => {
                            this.$set(this.post, "postReaction", result.Table);
                        });
                    });
            }
            ,

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
            async initPost() {

                /*this.resetPost();*/
                // let tempobj = !this.isNull(this.post.PostID) ? this.post : this.parentPost;
                this.post = this.parentPost;
                let promise_GetPostFile = await DataSource.shared.getPostFile(this.post.PostID);
                let promise_GetPostReaction = await DataSource.shared.getPostReaction(this.post.PostID);

                await Promise.all([promise_GetPostFile, promise_GetPostReaction])
                    .then((result) => {
                        this.$set(this.post, "postFiles", result[0].Table);
                        this.$set(this.post, "collapsed", true);
                        this.$set(this.post, "postReaction", result[1].Table);
                        this.getComment();
                        const countImageFile = this.post && this.post.postFiles && this.post.postFiles.length;
                        this.$set(this.post, "countImageFile", countImageFile);

                        this.remainingImage = this.post.countImageFile - 4;
                    });

                await this.sleep(200);

                this.$emit('loadingclose','false');
                // setInterval(() => {
                await this.getComment();

                //     }, 3000);
            },

            initCommentInterval() {
                /* setInterval(() => {
                     this.getComment;
                 },
                    3000);*/

                /*  setTimeout(
                      this.getComment
                      , 3000);*/
                /* if (!this.isNull(comments.Table)) {
                     for (let i = 0; i < comments.Table.length; i++)
                         setInterval(() => {
                             DataSource.shared.getPostReaction(comments.Table[i].PoCmID).then((commentReactions) => {
                                 this.$set(this.post.commentItems[i], "commentReactions", commentReactions.Table);
                             });
                         }, 5000);
                 }*/

                /*this.$set(this.post, "commentPostID", this.post.PostID);
                this.$set(this.post, "commentItems", result[1].Table);*/

                /*for(let comment of this.post.commentItems){
                }*/
            },
            async getComment() {

                await DataSource.shared.getComment(this.post.PostID).then((comments) => {
                    if (comments.Table && comments.Table.length > 0){
                        comments.Table.sort((a, b) => {
                            if (Date.parse(a.PoCmCreatedDate) > Date.parse(b.PoCmCreatedDate)) {
                                return -1;
                            } else if (Date.parse(a.PoCmCreatedDate) < Date.parse(b.PoCmCreatedDate)) {
                                return 1;
                            } else {
                                return 0;
                            }
                        });
                    }

                    this.$set(this.post, "commentItems", comments.Table);

                    if (!this.isNull(this.post.commentItems)) {
                        /*for (let i = 0; i < this.post.commentItems.length; i++) {
                            DataSource.shared.getPostReaction(comments.Table[i].PoCmID).then((commentReactions) => {
                                this.$set(this.post.commentItems[i], "commentReactions", commentReactions.Table);
                            });
                        }*/

                        this.commentCount = this.post.commentItems.length;
                    } else {
                        this.commentCount = "0";
                    }
                });



            },

            isNull(obj) {
                return (obj === null || obj === undefined || obj === "undefined" || obj.length === 0 || obj === "");
            },
            isImageByExt(obj_File) {
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
                return `data:image/jpg;base64, ${file.PostItemFileLow}`;
            },
            getMediumSource(file) {
                let SourceisImage = this.isImageByExt(file);
                if (SourceisImage === true) {
                    return `data:image/jpg;base64, ${file.PostItemFileMedium}`;
                } else {
                    return `data:application/pdf;base64, ${file.PostItemFile}`;
                }
            },
            getFile(file) {
                return `data:${file.PostItemFileType};base64,${file.PostItemFile}`;
            },
            submitComment(commentPostID) {
                this.$emit('commentitemSubmit', commentPostID, this.commentPostContent);
                //        this.sendMsg(commentPostID,this.commentPostContent);
                this.commentPostContent = "";

            },
            saveClick(PoCmID, PoCmContent) {
                this.readonly = true;
                this.showEdit = true;
                this.checkidcomment = null;
                this.$emit("commentEdit", PoCmID, PoCmContent);
            },
            emitShowDeleteModal(deleteCmId, deleteCmContent, deleteCmPostId, post) {
                this.deleteCmId = deleteCmId;
                this.deleteCmContent = deleteCmContent;
                this.deleteCmPostId = deleteCmPostId;
                this.$emit('showDeleteModal', this.deleteCmId,this.deleteCmContent,this.deleteCmPostId, post);
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
            removePost(post) {
                this.$emit("deletePost", post);
            },
            deletePost(post) {
                DataSource.shared.softDeletePost(post.PostID).then((result) => {
                });
                this.$emit("loadPosts");
            },
            editPost(post) {
                DataSource.shared.getPostAllTaggingStudentsByPostID(post.PostID)
                    .then((result) => {
                        this.post.arrobj_SelectedStudents = result.Table;

                        switch (this.post.PostType.toUpperCase()) {
                            case "PORTFOLIO":
                                this.obj_SelectedComponent = portfolio;
                                break;
                            case "UPDATE":
                                this.obj_SelectedComponent = updates;
                                break;
                            case "BROADCAST":
                                this.obj_SelectedComponent = broadcast;
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
    /*.reaction-table td:hover {*/
    /*background-color: #f5f5f5;*/
    /*}*/


    .visible {
        visibility: visible;
        opacity: 1;
    }

    .hidden {
        visibility: hidden;
        opacity: 0;
    }
</style>
<style>
    #modal_EditComponent .modal-lg {
        /*max-width: 95% !important;*/
    }
</style>