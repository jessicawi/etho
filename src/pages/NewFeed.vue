<template>
    <div id="feedList">
        <sideBar/>

        <div class="content-body-container col-md-8">

            <div class="feed-list-header-container">
                <span style="display: inline-block; vertical-align: middle;"><i class="fa fa-user-circle-o fa-2x sidebar-logo" aria-hidden="true"></i></span>
                <label style="display: inline-block!important;">Student Feed</label>

                <!--                <button class="btn btn-primary" style="display: inline-block; float: right;"><i class="fa fa-plus btn-plus-icon" aria-hidden="true"></i>New Post</button>-->
            </div>

            <div class="profile-student" v-if="isParent === 'Parent' ">
                <div class="profile-student__wrapper">
                    <div class="profile-student-cover">
                        <img src="../assets/parent-feed-bg.jpg"/>
                    </div>
                    <div class="container">
                        <div class="myaccount-image_wrap">
                            <img v-bind:src="imgParentProfile" type="file"
                                 class="imgStaffProfile"/>
                            <button v-on:click="showProfileModal" type="button"
                                    class=" text-center"><span>Edit Profile Photo</span>
                            </button>
                        </div>
                        <div class="profile-student-desc">
                    <span class="fatherName">
                        <strong>{{parentInfo.FatherFirstName}} {{parentInfo.FatherMiddleName}} {{parentInfo.FatherLastName}}</strong>
                        <br/>
                        Father
                    </span>
                            <span>.</span>
                            <span class="motherName">
                        <strong>{{parentInfo.MotherFirstName}} {{parentInfo.MotherMiddleName}} {{parentInfo.MotherLastName}}</strong>
                        <br/>
                        Mother
                    </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="parent-feed-menu" v-if="isParent === 'Parent' ">
                <div class="container">
                    <el-menu class="el-menu-demo" mode="horizontal">
                        <el-menu-item index="1">Attendance Report</el-menu-item>
                        <el-submenu index="2">
                            <template slot="title">Result Report</template>
                            <el-menu-item index="2-1">item one</el-menu-item>
                            <el-menu-item index="2-2">item two</el-menu-item>
                            <el-menu-item index="2-3">item three</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </div>
            </div>

            <div class="each-feed-list-container" v-for="(feedList, index) in list" :key="index">
                <singleFeedComponent
                        :parent-post="feedList"
                        @commentitemSubmit="commentitemSubmit"
                        @commentEdit="commentEdit"
                        @commentDelete="commentDelete"
                        :commentPostContent="commentPostContent"
                        :PostID="commentPostID"
                        @loadPosts="loadPosts"
                        ref="pComponent"
                        @showDeleteModal="showDeleteModal"
                        @deletePost="deletePost"
                />
            </div>

            <div class="empty-list_image" v-if="list.length <= 0">
                <strong>{{empty_message}}</strong>
                <img src="../assets/notfound.png"/>
            </div>

            <b-modal class="alert-modal" title="ARE YOU SURE?" ref="modal_DeletePost" @ok="commentDelete()">
                Once you delete a post, you can't undo it.
            </b-modal>
        </div>
    </div>
</template>

<script>
    import DataSource from "../data/datasource";

    import sideBar from "../components/Sidebar";
    import singleFeedComponent from "../components/singleFeedComponent";
    import portfolio from "../components/Post_Portfolio_Component";
    import updates from "../components/Post_Updates_Component.vue";
    import broadcast from "../components/Post_Broadcast_Component.vue";

    import Cookies from "js-cookie";
    import ProfileImg from "../assets/boy.png";
    import {required, minLength} from 'vuelidate/lib/validators';

    export default {
        name: "NewFeed",
        components: {
            singleFeedComponent,
            sideBar,
        },
        data() {
            return {
                modalTitle: null,
                files: [],
                systemmsgError: false,
                isModalOpen: false,
                token: null,
                userType: "",
                list: [],
                error: "",
                staffPostResults: "",
                results: "",
                postContent: "",
                addPostContent: "",
                tagAcademicYearID: "",
                profolio: "No",
                tagClassID: "",
                tagLevelID: "",
                // files: [],
                content: '',
                selectedFile: null,
                success: "",
                isLoading: true,
                saveResponse: "",
                PostItemPath: "",
                tagResponseText: "123",
                academicYearTable: [],
                classesTable: [],
                levelsTable: [],
                studentTable: [],

                PostID: "",
                commentPostContent: "",
                commentPostID: "",
                actionMode: "",
                readonly: true,
                checkidcomment: "",
                toggleDeleteModal: false,
                query: '',
                tag: '',
                tags: [],
                isParent: "",

                obj_SelectedComponent: false,
                int_NumberOfPost: 3,

                arrobj_BroadcastPost: [],
                intervalCheckNew: {},
                bool_ShowRefresh: false,

                tempPost: [],
                deleteCmId: "",
                deleteCmContent: "",
                deleteCmPostId: "",

                parentInfo: [],
                studentsInfo: [],
                studentsAccordion: "",

                imgParentProfile: "",
                tempBroadcastModalPostID: [],
                loading: true,

                feedLoader: false,
                deleteType: "",
                deletePostID: "",
                empty_message: "Feed Not Found",
            };
        },
        filters: {
            stringify(value) {
                return JSON.stringify(value, null, 2);
            }
        },
        computed: {
            items() {
                return this.studentTable.filter(i => {
                    return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
                });
            },
        },
        created() {
            if (Cookies.get('userTypeSession') === 'Parent') {
                this.LoadParentInfo();
                this.LoadProfileImg();
            }
        },
        mounted() {
            var $this = this;

            $this.connectServer();
            const self = this;
            this.loadPosts();
            // this.loadBroadcast();

            $(document).ready(function(){
                $(".content-body-container").css("min-height", window.outerHeight);

                $(window).scroll(function() {
                    if($(window).scrollTop() === ($(document).height() - $(window).height())) {
                        if (self.list.length % 3 === 0) {
                            self.feedLoader = !self.feedLoader;
                            self.isParent = Cookies.get('userTypeSession');
                            let obj_LastPost = !self.isNull(self.list) ? self.list[self.list.length - 1] : "";
                            let promise_GetPosts = self.isParent === "Parent" ? DataSource.shared.getParentPostFeedPage(self.int_NumberOfPost, obj_LastPost.PostID, '', 'Portfolio') : DataSource.shared.getStaffPostFeedPage(self.int_NumberOfPost, obj_LastPost.PostID, '', 'Portfolio');

                            promise_GetPosts.then((response) => {
                                if (response.Table) {
                                    self.list.push.apply(self.list, response.Table);
                                }
                                self.feedLoader = !self.feedLoader;
                            });
                        }
                    }
                });
            });

            /*#region Scroll Loader Functions*/
            // $(window).scroll(self.debounce(() => {
            //     if (self.getScrollPercent() >= 50) {
            //         this.feedLoader = !this.feedLoader;
            //         this.isParent = Cookies.get('userTypeSession');
            //         let obj_LastPost = !this.isNull(this.list) ? this.list[this.list.length - 1] : "";
            //         let promise_GetPosts = this.isParent === "Parent" ? DataSource.shared.getParentPostFeedPage(this.int_NumberOfPost, obj_LastPost.PostID, '', 'Portfolio') : DataSource.shared.getStaffPostFeedPage(this.int_NumberOfPost, obj_LastPost.PostID, '', 'Portfolio');
            //
            //         promise_GetPosts.then((response) => {
            //             if (response.Table) {
            //                 this.list.push.apply(this.list, response.Table);
            //             }
            //             this.feedLoader = !this.feedLoader;
            //         });
            //     }
            // }, 250));
            /*#endregion*/
        },
        methods: {
            loadingclose() {
                this.loading = false;
            },
            showProfileModal() {
                this.$refs.modal_uploadProfile.show();
            },
            async LoadProfileImg() {
                try {
                    const staffProPic = await DataSource.shared.getStaffProfileImage();
                    console.log("11");
                    if (staffProPic) {
                        console.log("22");
                        if (staffProPic.code === '2') {
                            console.log("3");
                            this.imgParentProfile = ProfileImg;
                        } else if (staffProPic.code !== '2' && staffProPic.code !== '88' && staffProPic.code !== '99') {
                            console.log("44");
                            let image64String = this.ConvertBase64StringToImage(staffProPic.Table[0]);
                            image64String !== '' ? this.imgParentProfile = image64String : '';
                            console.log(this.imgParentProfile, "imgParentProfile");
                        }

                    }
                } catch (e) {
                    this.result = e;
                }
            },
            async uploadParentProfileImg() {
                try {
                    this.$refs.file.click();
                } catch (e) {
                    this.results = e;
                }
            },
            previewImgParentProfile: function (event) {
                try {
                    var input = event.target;
                    if (input.files && input.files[0]) {
                        var reader = new FileReader();
                        reader.onload = (e) => {
                            this.imgParentProfile = e.target.result;
                        };
                        reader.readAsDataURL(input.files[0]);
                        this.selectedFile = event.target.files;
                    }
                } catch (e) {
                    this.results = e;
                }
            },
            async SaveParentProfile() {
                const response = await DataSource.shared.saveStaffProfileImage(this.selectedFile);
                if (response) {
                    if (response.code === '88') {
                        window.location.replace('/');
                    } else if (response.code === "1") {
                        this.$notify({
                            title: 'Success',
                            message: 'Records Successfully Saved',
                            type: 'success'
                        });
                        this.$refs.modal_uploadProfile.hide();
                    } else {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Save Parent Error - Please try again later'
                        });
                    }
                }
            },
            ConvertBase64StringToImage(file) {
                if (this.isImage(file))
                    return "data:" + file.UPPImageFileType + ";base64," + file.UPPImage;
                else
                    return '';
            },
            isImage(obj_File) {
                let ext = String(obj_File.UPPImageFileExt).toUpperCase();
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
            showDeleteModal(deleteCmId, deleteCmContent, deleteCmPostId, post) {
                this.$refs.modal_DeletePost.show();
                this.tempPost = post;
                this.deleteCmId = deleteCmId;
                this.deleteCmContent = deleteCmContent;
                this.deleteCmPostId = deleteCmPostId;
                this.deleteType = "comment";
            },
            deletePost(post) {
                this.$refs.modal_DeletePost.show();
                this.deleteType = "post";
                this.deletePostID = post.PostID;
            },
            CheckNew() {
                this.isParent = Cookies.get('userTypeSession');

                let promise_GetPosts = this.isParent === "Parent" ?
                    DataSource.shared.getParentPostFeedPage(1, null, '', 'Portfolio')
                    : DataSource.shared.getStaffPostFeedPage(1, null, '', 'Portfolio');

                promise_GetPosts.then((response) => {
                    if (response.Table && (new Date(response.Table[0].PostCreatedDate)) > (new Date(this.list[0].PostCreatedDate))) {
                        this.bool_ShowRefresh = true;
                        clearInterval(this.intervalCheckNew);
                    }
                });
            },

            showMoreBroadcastModal() {
                this.$refs.modal_ShowMoreBroadcast.show();
            },
            showBroadcastReadMore(Post) {
                this.tempBroadcastModalPostID = Post;
                this.$refs.modal_broadcastReadMore.show();
            },
            isNull(obj) {
                return (obj === null || obj === undefined || obj === "undefined" || obj.length === 0 || obj === "");
            },

            /*#region Scroll Loader Functions*/
            getScrollPercent() {
                //Credits to Phil Ricketts @ stackoverflow
                let height = document.documentElement,
                    body = document.body,
                    scrollTop = 'scrollTop',
                    scrollHeight = 'scrollHeight';

                return (height[scrollTop] || body[scrollTop]) / ((height[scrollHeight] || body[scrollHeight]) - height.clientHeight) * 100;
            },
            isScrollable() {
                return $(document).height() > $(window).height();
            },
            debounce(func, wait, immediate) {
                // Returns a function, that, as long as it continues to be invoked, will not
                // be triggered. The function will be called after it stops being called for
                // N milliseconds. If `immediate` is passed, trigger the function on the
                // leading edge, instead of the trailing.
                let timeout, result;
                let self = this;

                let later = function (context, args) {
                    timeout = null;
                    if (args) result = func.apply(context, args);
                };

                let debounced = self.restArguments(function (args) {
                    if (timeout) clearTimeout(timeout);
                    if (immediate) {
                        let callNow = !timeout;
                        timeout = setTimeout(later, wait);
                        if (callNow) result = func.apply(this, args);
                    } else {
                        timeout = self.delay(later, wait, this, args);
                    }

                    return result;
                });

                debounced.cancel = function () {
                    clearTimeout(timeout);
                    timeout = null;
                };

                return debounced;
            },
            delay(func, wait, ...args) {
                // Lodash Delay
                /**
                 * Invokes `func` after `wait` milliseconds. Any additional arguments are
                 * provided to `func` when it's invoked.
                 *
                 * @since 0.1.0
                 * @category Function
                 * @param {Function} func The function to delay.
                 * @param {number} wait The number of milliseconds to delay invocation.
                 * @param {...*} [args] The arguments to invoke `func` with.
                 * @returns {number} Returns the timer id.
                 * @example
                 *
                 * delay(text => console.log(text), 1000, 'later')
                 * // => Logs 'later' after one second.
                 */
                if (typeof func != 'function') {
                    throw new TypeError('Expected a function');
                }
                return setTimeout(func, +wait || 0, ...args);
            },
            restArguments(func, startIndex) {
                // Some functions take a variable number of arguments, or a few expected
                // arguments at the beginning and then a variable number of values to operate
                // on. This helper accumulates all remaining arguments past the function?s
                // argument length (or an explicit `startIndex`), into an array that becomes
                // the last argument. Similar to ES6?s "rest parameter".
                startIndex = startIndex == null ? func.length - 1 : +startIndex;
                return function () {
                    let length = Math.max(arguments.length - startIndex, 0),
                        rest = Array(length),
                        index = 0;
                    for (; index < length; index++) {
                        rest[index] = arguments[index + startIndex];
                    }
                    switch (startIndex) {
                        case 0:
                            return func.call(this, rest);
                        case 1:
                            return func.call(this, arguments[0], rest);
                        case 2:
                            return func.call(this, arguments[0], arguments[1], rest);
                    }
                    let args = Array(startIndex + 1);
                    for (index = 0; index < startIndex; index++) {
                        args[index] = arguments[index];
                    }
                    args[startIndex] = rest;
                    return func.apply(this, args);
                };
            },
            /*#endregion*/

            loadPosts() {
                // this.showSession()
                // user menu
                this.feedLoader = !this.feedLoader;

                $("html, body").animate({scrollTop: 0}, "fast");
                this.bool_ShowRefresh = false;
                this.isParent = Cookies.get('userTypeSession');
                this.list = [];
                let promise_GetPosts = this.isParent === "Parent" ?
                    DataSource.shared.getParentPostFeedPage(this.int_NumberOfPost, '', '', 'Portfolio')
                    : DataSource.shared.getStaffPostFeedPage(this.int_NumberOfPost, '', '', 'Portfolio');

                promise_GetPosts.then((response) => {
                    if (response.Table)
                        this.list.push.apply(this.list, response.Table);

                    this.isLoading = false;
                    this.feedLoader = !this.feedLoader;

                });
            },
            connectServer() {
                var $this = this;
                var conn = $.hubConnection(process.env.VUE_APP_ROOT_API, {qs: "clientId=1232222"});
                $this.proxy = conn.createHubProxy("PostingHub");
                conn.start({jsonp: true});
                $this.getMsg();
            },
            sendMsg(postId, comment) {
                var $this = this;
                $this.proxy.invoke("Send", postId, comment).done((msg) => {
                });
            },
            getMsg() {
                var $this = this;
                $this.proxy.on("broadcastMessage", (postId, comment) => {
                    var pComp = $this.$refs.pComponent;
                    for (var l = 0; l < pComp.length; l++) {
                        if (pComp[l]._props.parentPost.PostID == postId) {
                            pComp[l].getBCMsg(postId);
                            break;
                        }
                    }
                });
            },

            loadBroadcast() {

                this.isParent = Cookies.get('userTypeSession');
                this.arrobj_BroadcastPost = [];

                let promise_GetPosts = this.isParent === "Parent" ?
                    DataSource.shared.getParentPost(10, null, "BROADCAST")
                    : DataSource.shared.getStaffPost(10, null, "BROADCAST");

                promise_GetPosts.then((response) => {
                    if (response.Table)
                        this.arrobj_BroadcastPost.push.apply(this.arrobj_BroadcastPost, response.Table);
                });


            },
            hideComponentModal() {
                this.obj_SelectedComponent = false;
                this.isModalOpen = false;
                this.modalTitle = null;
            },
            displayResult(value) {
                //TODO: Show Message
                if (value == "TRUE") {
                    this.hideComponentModal();
                }
            },
            showUpdates() {
                this.modalTitle = "Post";
                this.obj_SelectedComponent = updates;
                this.isModalOpen = true;
            },
            showPortfolio() {
                this.modalTitle = "Portfolio";
                this.obj_SelectedComponent = portfolio;
                this.isModalOpen = true;
            },
            showBroadcast() {
                this.modalTitle = "Broadcast";
                this.obj_SelectedComponent = broadcast;
                this.isModalOpen = true;
            },
            inputChange(input) {
                this.postContent = input;
            },
            showModal() {
                this.isModalOpen = true;
            },
            hideModal() {
                this.isModalOpen = false;
            },
            onFileChanged(event) {
                this.selectedFile = event.target.files;
                this.getImagePreviews();
            },
            async onSubmit() {
                this.$v.$touch();
                this.error = "";
                //this.results = "<< Requesting.. >>";
                try {
                    const studentsIds = this.tags.map(d => d.Student_ID);
                    const saveResponse = await DataSource.shared.savePostUpdate(this.selectedFile, this.addPostContent, studentsIds, this.tagClassID, this.tagLevelID);

                    if (saveResponse) {
                        switch (saveResponse.code) {
                            case "1":
                                this.isModalOpen = false;
                                // reset all input filed to blank
                                this.selectedFile = null;
                                this.$refs.fileupload.value = "";
                                this.addPostContent = "";
                                this.tagAcademicYearID = null;

                                this.tagLevelID = null;
                                this.tagClassID = null;
                                this.results = `Post Submitted`;
                                this.success = 'Post Submitted, activity will be active in a while';
                                break;
                            case "88":
                                this.results = `Please Login to submit post`;
                                this.systemmsgError = true;
                                break;
                            case "99":
                                this.results = `Please fill in content`;
                                this.systemmsgError = true;
                                break;
                            // default:
                            //     alert("Please try again later");
                            //     this.results = JSON.stringify(response);
                        }
                    }
                } catch (e) {
                    console.log(e);
                    this.error = e;
                }
            },
            async commentitemSubmit(postId, comment) {
                this.error = "";
                //this.results = "<< Requesting.. >>";
                try {

                    this.commentPostID = postId;
                    const commentResponse = DataSource.shared.saveComment(this.commentPostID, comment);

                    this.sendMsg(this.commentPostID, comment);

                } catch (e) {
                    console.log(e);
                    this.error = e;
                }
            },
            async commentEdit(PoCmID, PoCmContent) {
                this.error = "";
                try {
                    this.actionMode = "Edit";
                    const commentResponse = await DataSource.shared.editComment(PoCmID, PoCmContent, this.actionMode);
                    if (commentResponse) {
                        switch (commentResponse.code) {
                            case "1":
                                // reset all input filed to blank
                                this.commentPostID = null;
                                this.commentPostContent = "";
                                this.readonly = true;

                                // const newComment = await DataSource.shared.getComment(PoCmID);
                                this.list.find(item => {

                                    if (item.PostID === PoCmID) {
                                        item.commentItems = newComment.Table;
                                        this.sendMsg(this.commentPostID, PoCmContent);
                                        return item;
                                    }

                                });
                                break;
                            case "88":
                                this.results = `Please Login to submit post`;
                                this.systemmsgError = true;
                                break;
                            case "99":
                                this.results = `Please fill in content`;
                                this.systemmsgError = true;
                                break;
                        }
                    }
                } catch (e) {
                    console.log(e);
                    this.error = e;
                }
            },
            async commentDelete() {
                if (this.deleteType === "comment") {
                    let PoCmID = this.deleteCmId;
                    let PoCmContent = this.deleteCmContent;
                    let postId = this.deleteCmPostId;
                    this.error = "";
                    try {
                        this.actionMode = "Delete";
                        const deleteCommentResponse = await DataSource.shared.deleteComment(PoCmID, PoCmContent, this.actionMode);
                        if (deleteCommentResponse) {
                            switch (deleteCommentResponse.code) {
                                case "1":
                                    // reset all input filed to blank
                                    this.commentPostID = null;
                                    this.commentPostContent = "";

                                    //     const newComment = await DataSource.shared.getComment(PoCmID);

                                    this.list.find(item => {

                                        if (item.PostID === postId) {
                                            item.commentItems = item.commentItems.filter(comment => comment.PoCmID !== PoCmID);
                                            this.sendMsg(postId, PoCmContent);
                                            return item;
                                        }

                                    });
                                    //  this.$forceUpdate();
                                    break;
                                case "88":
                                    this.results = `Please Login to submit post`;
                                    this.systemmsgError = true;
                                    break;
                                case "99":
                                    this.results = `Please fill in content`;
                                    this.systemmsgError = true;
                                    break;
                            }
                        }
                    } catch (e) {
                        console.log(e);
                        this.error = e;
                    }
                } else if (this.deleteType === "post") {

                    DataSource.shared.softDeletePost(this.deletePostID).then((result) => {
                    });
                    this.loadPosts();
                }
            },
            async disableReadonly(PoCmID) {
                this.error = "";
                try {
                    this.readonly = false;
                    this.checkidcomment = PoCmID;
                } catch (e) {
                    console.log(e);
                    this.error = e;
                }
            },
            getImagePreviews() {
                /*
                  Iterate over all of the files and generate an image preview for each one.
                */
                for (let i = 0; i < this.selectedFile.length; i++) {
                    /*
                      Ensure the file is an image file
                    */
                    if (/\.(jpe?g|png|gif)$/i.test(this.selectedFile[i].name)) {
                        /*
                          Create a new FileReader object
                        */
                        let reader = new FileReader();

                        /*
                          Add an event listener for when the file has been loaded
                          to update the src on the file preview.
                        */
                        reader.addEventListener("load", function () {
                            this.$refs['image' + parseInt(i)][0].src = reader.result;
                        }.bind(this), false);

                        /*
                          Read the data for the file in through the reader. When it has
                          been loaded, we listen to the event propagated and set the image
                          src to what was loaded from the reader.
                        */
                        reader.readAsDataURL(this.selectedFile[i]);
                    }
                }
            },
            clearPreview() {
                this.selectedFile = null;
            },
            async LoadParentInfo() {
                try {
                    if (Cookies.get('userIDSession') !== null || Cookies.get('userIDSession') !== undefined) {

                        const response = await DataSource.shared.getParentStudentsInfo(Cookies.get('userIDSession'));
                        if (response) {
                            if (response.code === "2") {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'No record found'
                                });
                            } else if (response.code === "99") {
                                this.$notify.error({
                                    title: 'Error',
                                    message: 'Please try again later'
                                });
                            } else {
                                this.parentInfo = response.Parent[0];
                                this.studentsInfo = response.Students;
                                console.log(this.parentInfo, "parentInfo");
                                console.log(this.studentsInfo, "studentsInfo");
                            }
                        }
                    }
                } catch (e) {
                    this.results = e;
                }
            },
        },
        validations: {
            updateContent: {
                required
                // minLength: minLength(4)
            }
        },
        computed: {
            filteredBroadcastPost: function () {
                return this.arrobj_BroadcastPost.slice(0, 3);
            },
        },
    }
</script>

<style scoped>
    .content-body-container {
        display: inline-block;
        padding: 20px;
        background: white;
    }

    .feed-list-header-container {
        text-align: left;
        margin-bottom: 20px;
    }

    .feed-list-header-container > span {
        margin-right: 10px;
    }

    .each-feed-list-container {
        margin-bottom: 20px;
    }
</style>