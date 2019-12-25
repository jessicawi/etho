<template>
    <div id="broadcastList">
        <sideBar/>

        <div class="content-body-container col-md-8">
            <div class="broadcast-list-header-container">
                <span style="display: inline-block; vertical-align: middle;"><i class="fa fa-user-circle-o fa-2x sidebar-logo" aria-hidden="true"></i></span>
                <label style="display: inline-block!important;">Student Broadcast</label>

                <!--                <button class="btn btn-primary" @click="createNew" v-if="isParent !== 'Parent'"><i class="fa fa-plus btn-plus-icon" aria-hidden="true"></i>New Broadcast</button>-->
                <button class="btn btn-primary btn-create-new-broadcast" @click="showBroadcast" v-if="isParent !== 'Parent'"><i class="fa fa-plus btn-plus-icon" aria-hidden="true"></i>Broadcast</button>
            </div>

            <div class="broadcast-list-content-container" style="text-align: left;">
                <div class="filter-container">
                    <select class="form-control" style="width: 30%;" v-model="selected">
                        <option v-for="(item, index) in filter_array" :key="index" :value="item" :disabled="index === 0">{{item}}</option>
                    </select>
                </div>

                <div class="empty-list_image" v-if="arrobj_BroadcastPost.length <= 0">
                    <strong>{{empty_message}}</strong>
                    <img src="../assets/notfound.png"/>
                </div>

                <!--                display single broadcast list-->
                <div class="single-broadcast-container col-md-4" v-for="(each_broadcast, index) in arrobj_BroadcastPost" :key="index">
                    <div class="single-broadcast" @click="showBroadcastReadMore(each_broadcast)">
                        <div class="single-broadcast-image-container">
                            <img class="single-broadcast-image" :src="each_broadcast.hasCover ? getMediumSource(each_broadcast.eachBroadcastDetails[0]) : defaultBgImage" />
                        </div>

                        <div style="padding: 10px;">
                            <p class="single-broadcast-post-content">{{each_broadcast.PostContent}}</p>
                            <hr/>
                            <span class="single-broadcast-created-by">By {{each_broadcast.CONname}}</span>
                            <small class="single-broadcast-created-date">
                                <i data-v-7193e01c="" aria-hidden="true" class="fa fa-clock-o"></i>
                                {{each_broadcast.PostCreatedDate_convert}}
                            </small>
                        </div>
                    </div>
                </div>

                <!--                show create broadcast modal-->
                <b-modal id="modal1" size="lg" hide-footer :title="modalTitle ? modalTitle : 'Post'" v-model="isModalOpen"
                         @hidden="hideComponentModal">
                    <el-button-group class="mb-4 modal-quicklink">
                        <el-button type="primary" @click="showBroadcast" :class="{'active':modalTitle === 'Broadcast'}"><i
                                class="fa fa-bullhorn" aria-hidden="true"></i> <span> Broadcast</span></el-button>
                        <el-button type="primary" @click="showUpdates" :class="{'active':modalTitle === 'Post'}"><i
                                class="fa fa-newspaper-o" aria-hidden="true"></i> <span> Updates</span></el-button>
                        <el-button type="primary" @click="showPortfolio" :class="{'active':modalTitle === 'Portfolio'}"><i
                                class="fa fa-book" aria-hidden="true"></i> <span> Portfolio</span></el-button>
                    </el-button-group>
                    <component
                            @result="displayResult"
                            :is="obj_SelectedComponent"
                            @loadPosts="loadPosts"
                            @loadBroadcast="loadBroadcast"
                    ></component>

                </b-modal>

                <b-modal id="modal2" hide-footer :title="modalTitle ? modalTitle : 'Post'" size="lg" @hidden="hideComponentModal" v-model="isCreateModalOpen">
                    <template v-slot:modal-header="">
                        <h4>CREATE BROADCAST</h4>
                        <button class="btn btn-default btn-import-image">Import Image</button>

                        <input type="file" multiple class="" id="uploadImage" hidden="hidden"/>
                    </template>

                    <component :is="selectedComponent"></component>
                </b-modal>

                <!--                show each broadcast more details-->
                <b-modal id="modal_broadcastReadMore" ref="modal_broadcastReadMore" centered hide-footer hide-header>
                    <div>
                        <h5>Broadcast Details</h5>
                    </div>

                    <div v-loading="loading">
                        <singleFeedComponent
                                :parent-post="tempBroadcastModalPostID"
                                @loadPosts="loadPosts"
                                ref="pComponent"
                                :hideComment="true"
                                @loadingclose="loadingclose"
                        />
                    </div>
                </b-modal>
            </div>
        </div>
    </div>
</template>

<script>
    "use strict";
    import DataSource from "../data/datasource";

    import sideBar from "../components/Sidebar";
    import singleFeedComponent from "../components/singleFeedComponent";
    // import broadcast from "../components/Post_Broadcast_Component.vue";
    // import createBroadcast from "../components/createBroadcastComponent";

    // import PostComponent from "../components/postCompnent";
    // import BroadcastList from "../components/BroadcastListCompnent";
    // import VueTagsInput from '@johmun/vue-tags-input';
    import portfolio from "../components/Post_Portfolio_Component";
    import updates from "../components/Post_Updates_Component.vue";
    import broadcast from "../components/Post_Broadcast_Component.vue";
    // import ProfileImg from "../assets/boy.png";

    import defaultBgImage from "../assets/kagami.jpg";

    import $ from 'jquery';
    import Cookies from "js-cookie";

    export default {
        name: "NewBroadcast",
        components: {
            sideBar,
            singleFeedComponent,
            // eventCom,
        },
        data() {
            return {
                modalTitle: null,
                lastPostID: null,

                filter_array: ["Filter", "All", "Unread"],
                arrobj_BroadcastPost: [],
                tempBroadcastModalPostID: [],
                list: [],

                selected: "Filter",
                isParent: "",
                defaultBgImage: defaultBgImage,
                selectedComponent: "",
                empty_message: "Broadcast Not Found",

                int_NumberOfPost: 3,

                bool_ShowRefresh: false,
                feedLoader: false,
                isModalOpen: false,
                isLoading: true,
                loading: true,
                obj_SelectedComponent: false,
                isCreateModalOpen: false,
            };
        },
        methods: {
            loadingclose() {
                this.loading = false;
            },
            loadBroadcast() {
                this.isParent = Cookies.get('userTypeSession');
                this.arrobj_BroadcastPost = [];

                let promise_GetPosts = this.isParent === "Parent" ?
                    DataSource.shared.getParentPost(10, null, "BROADCAST")
                    : DataSource.shared.getStaffPost(10, null, "BROADCAST");

                promise_GetPosts.then((response) => {
                    if (response.Table){
                        response.Table.forEach((object, index) => {
                            object.hasCover = false;

                            if (index === (response.Table.length -1)) {
                                this.lastPostID = object.PostID;
                            }

                            let promise_GetCoverImage = DataSource.shared.getPostFile(object.PostID);

                            promise_GetCoverImage.then((postResponse) => {
                                if (postResponse.Table) {
                                    object.hasCover = true;
                                    object.eachBroadcastDetails = postResponse.Table;
                                }
                            });
                        });

                        return response;
                    }
                }).then((result) => {
                    if (result.Table) {
                        this.arrobj_BroadcastPost.push.apply(this.arrobj_BroadcastPost, result.Table);
                    }
                });
            },
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
            // load more broadcast result
            loadMoreBroadcast() {
                this.isParent = Cookies.get('userTypeSession');

                let promise_GetPosts = this.isParent === "Parent" ?
                    DataSource.shared.getParentPost(10, this.lastPostID, "BROADCAST")
                    : DataSource.shared.getStaffPost(10, this.lastPostID, "BROADCAST");

                promise_GetPosts.then((response) => {
                    if (response.Table){
                        this.arrobj_BroadcastPost.push.apply(this.arrobj_BroadcastPost, response.Table);

                        response.Table.forEach((object, index) => {
                            if (index === (response.Table.length -1)) {
                                this.lastPostID = object.PostID;
                            }
                            let promise_GetCoverImage = DataSource.shared.getPostFile(object.PostID);

                            promise_GetCoverImage.then((postResponse) => {
                                if (postResponse.Table)
                                    object.eachBroadcastDetails = postResponse.Table;
                            });
                        });
                    }
                });
            },

            showBroadcastReadMore(Post) {
                this.tempBroadcastModalPostID = Post;
                this.$refs.modal_broadcastReadMore.show();
            },
            showBroadcast() {
                this.modalTitle = "Broadcast";
                this.obj_SelectedComponent = broadcast;
                this.isModalOpen = true;
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
            showModal() {
                this.isModalOpen = true;
            },
            hideModal() {
                this.isModalOpen = false;
            },

            getMediumSource(file) {
                let SourceisImage = this.isImageByExt(file);
                if (SourceisImage === true) {
                    return `data:image/jpg;base64, ${file.PostItemFileMedium}`;
                } else {
                    return `data:application/pdf;base64, ${file.PostItemFile}`;
                }
            },

            createNew() {
                this.modalTitle = "CREATE BROADCAST";
                // this.obj_SelectedComponent = broadcast;
                this.selectedComponent = createBroadcast;
                this.isCreateModalOpen = true;
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

            // scroll load more
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
            // scroll load more

            displayResult(value) {
                //TODO: Show Message
                if (value == "TRUE") {
                    this.hideComponentModal();
                }
            },
            hideComponentModal() {
                this.obj_SelectedComponent = false;
                this.isModalOpen = false;
                this.modalTitle = null;
            },
        },
        mounted() {
            const self = this;

            this.lastPostID = null;
            this.arrobj_BroadcastPost = [];
            this.loadBroadcast();

            $(document).ready(function(){
                $(".content-body-container").css("min-height", window.outerHeight);

                // self.arrobj_BroadcastPost = [];
                // self.lastPostID = null;
                // self.loadBroadcast();

                $(window).scroll(function() {
                    if($(window).scrollTop() === ($(document).height() - $(window).height())) {
                        if (self.arrobj_BroadcastPost.length % 10 === 0) {
                            self.loadMoreBroadcast();
                        }
                    }
                });
            });
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

    .broadcast-list-header-container {
        text-align: left;
        margin-bottom: 20px;
        /*#eee*/
        border-bottom: 1px solid lightgrey;
    }

    .broadcast-list-header-container > span {
        margin-right: 10px;
    }

    .btn-create-new-broadcast {
        display: inline-block;
        float: right;
        padding: 0px 15px;
    }

    .btn-create-new-broadcast > i {
        margin-right: 10px;
    }

    .single-broadcast-container {
        display: inline-block;
        margin-bottom: 20px;
    }

    .single-broadcast-image-container {
        /*height: 150px;*/
        border-bottom: 1px solid #ccc;
        border-radius: 8px;
    }

    .single-broadcast {
        background: #f7f7f7;
        text-align: left;
        border: 1px solid #eee;
        border-radius: 8px;
        padding: 0px;
        cursor: pointer;
    }

    .single-broadcast-image {
        height: 150px;
        width: 100%;
        border-radius: 8px;
    }

    .single-broadcast-created-by {
        margin: 0px;
    }

    .single-broadcast-created-date,
    .single-broadcast-post-content {
        display: block;
        color: #9a9a9a;
        margin: 0px;
    }

    .btn-import-image {
        border: 1px solid #eee;
        background: white;
    }
</style>